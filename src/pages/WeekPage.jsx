import { useState, useEffect } from 'react';
import { getAllData } from '../utils/storage';
import { getWeekDates, getWeekNumber, formatDate, formatDisplayDate, isWorkoutDay, getDayOfWeek } from '../utils/helpers';
import { format, parseISO, startOfWeek, addWeeks, subWeeks } from 'date-fns';

export default function WeekPage({ date, streak, onSelectDay }) {
  const [allDays, setAllDays] = useState([]);
  const [allWorkouts, setAllWorkouts] = useState([]);
  const [allWeights, setAllWeights] = useState([]);
  const [weekOffset, setWeekOffset] = useState(0);

  const viewDate = weekOffset === 0
    ? date
    : (weekOffset > 0
      ? addWeeks(startOfWeek(date, { weekStartsOn: 1 }), weekOffset)
      : subWeeks(startOfWeek(date, { weekStartsOn: 1 }), Math.abs(weekOffset)));

  const weekDates = getWeekDates(formatDate(viewDate));
  const weekNum = getWeekNumber(weekDates[0]);

  useEffect(() => {
    Promise.all([
      getAllData('days'),
      getAllData('workouts'),
      getAllData('weights'),
    ]).then(([days, workouts, weights]) => {
      setAllDays(days);
      setAllWorkouts(workouts);
      setAllWeights(weights);
    });
  }, []);

  const weekDays = weekDates.map((d) => {
    const dayData = allDays.find((dd) => dd.id === d);
    const workoutData = allWorkouts.find((w) => w.id === d);
    return { date: d, dayData, workoutData };
  });

  // Stats
  const workoutDays = weekDays.filter(d => isWorkoutDay(d.date));
  const workoutsCompleted = workoutDays.filter(d => {
    if (!d.workoutData) return false;
    return Object.values(d.workoutData.exercises).every(ex =>
      ex.sets.every(s => s.done)
    );
  }).length;

  const daysWithMealData = weekDays.filter(d => d.dayData);
  const avgCalories = daysWithMealData.length > 0
    ? Math.round(daysWithMealData.reduce((sum, d) => {
        const meals = d.dayData?.meals || {};
        // Simple estimate based on checked meals
        let cal = 0;
        if (meals.meal1) cal += 565;
        if (meals.meal2) cal += 723;
        if (meals.meal3) cal += 828;
        if (meals.meal4) cal += 120;
        return sum + cal;
      }, 0) / daysWithMealData.length)
    : 0;

  const avgProtein = daysWithMealData.length > 0
    ? Math.round(daysWithMealData.reduce((sum, d) => {
        const meals = d.dayData?.meals || {};
        let prot = 0;
        if (meals.meal1) prot += 51;
        if (meals.meal2) prot += 76;
        if (meals.meal3) prot += 78;
        if (meals.meal4) prot += 24;
        return sum + prot;
      }, 0) / daysWithMealData.length)
    : 0;

  const stepsCompleted = weekDays.filter(d => d.dayData?.steps).length;

  const weekWeights = allWeights.filter(w => weekDates.includes(w.id));
  const weightChange = weekWeights.length >= 2
    ? (weekWeights[weekWeights.length - 1].weight - weekWeights[0].weight).toFixed(1)
    : null;

  const completeDays = weekDays.filter(d => d.dayData?.allComplete).length;

  return (
    <div className="page week-page">
      <div className="week-nav">
        <button className="btn-icon" onClick={() => setWeekOffset(w => w - 1)}>&larr;</button>
        <h2>Week {weekNum > 0 ? weekNum : '—'}</h2>
        <button className="btn-icon" onClick={() => setWeekOffset(w => w + 1)}>&rarr;</button>
      </div>

      <div className="card stats-grid">
        <div className="stat-item">
          <span className="stat-number">{workoutsCompleted}/{workoutDays.length}</span>
          <span className="stat-label">Workouts</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{avgCalories}</span>
          <span className="stat-label">Avg Calories</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{avgProtein}g</span>
          <span className="stat-label">Avg Protein</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{stepsCompleted}/7</span>
          <span className="stat-label">Steps Days</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{weightChange !== null ? `${weightChange > 0 ? '+' : ''}${weightChange}` : '—'}</span>
          <span className="stat-label">Weight &Delta;</span>
        </div>
        <div className="stat-item">
          <span className="stat-number fire">{streak}</span>
          <span className="stat-label">Streak</span>
        </div>
      </div>

      <div className="card">
        <h3>Calendar</h3>
        <div className="calendar-grid">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => (
            <span key={d} className="cal-header">{d}</span>
          ))}
          {weekDays.map((d) => {
            const complete = d.dayData?.allComplete;
            const hasData = d.dayData && (Object.values(d.dayData.meals).some(Boolean) || d.dayData.steps);
            const isToday = d.date === formatDate(date);
            return (
              <button
                key={d.date}
                className={`cal-day ${complete ? 'cal-complete' : hasData ? 'cal-partial' : ''} ${isToday ? 'cal-today' : ''}`}
                onClick={() => onSelectDay(parseISO(d.date))}
              >
                {format(parseISO(d.date), 'd')}
              </button>
            );
          })}
        </div>
      </div>

      <div className="card">
        <h3>Daily Breakdown</h3>
        {weekDays.map((d) => {
          const day = getDayOfWeek(d.date);
          const isWk = isWorkoutDay(d.date);
          const mealCount = d.dayData ? Object.values(d.dayData.meals).filter(Boolean).length : 0;
          return (
            <div
              key={d.date}
              className={`day-breakdown-row ${d.dayData?.allComplete ? 'row-complete' : ''}`}
              onClick={() => onSelectDay(parseISO(d.date))}
            >
              <span className="day-name">{day.charAt(0).toUpperCase() + day.slice(1, 3)}</span>
              <span className="day-date">{format(parseISO(d.date), 'MMM d')}</span>
              <div className="day-indicators">
                {isWk && <span className={`indicator ${d.workoutData ? 'ind-done' : 'ind-pending'}`}>W</span>}
                <span className={`indicator ${mealCount === 4 ? 'ind-done' : mealCount > 0 ? 'ind-partial' : 'ind-pending'}`}>M{mealCount}/4</span>
                <span className={`indicator ${d.dayData?.steps ? 'ind-done' : 'ind-pending'}`}>S</span>
              </div>
              <span className={`day-status ${d.dayData?.allComplete ? 'status-done' : ''}`}>
                {d.dayData?.allComplete ? '\u2713' : ''}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
