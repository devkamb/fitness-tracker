import { useState } from 'react';
import { formatDisplayDate, getMealsForDay, isWorkoutDay, isSaturday, isSunday, getWeekNumber, formatDate } from '../utils/helpers';
import { SUPPLEMENTS, MORNING_ROUTINE_WORKOUT, MORNING_ROUTINE_REST, GROCERY_LIST, MILESTONE_MESSAGES } from '../utils/constants';
import { useDay } from '../hooks/useDay';
import ProgressBar from '../components/ProgressBar';
import Checkbox from '../components/Checkbox';

export default function TodayPage({ date, streak, onNavigateWorkout }) {
  const dateStr = formatDate(date);
  const { day, loading, toggleMeal, toggleSupplement, toggleRoutine, toggleSteps, toggleBedtime, setMeal3Manual, getCalories, getProtein } = useDay(dateStr);

  if (loading || !day) return <div className="loading">Loading...</div>;

  const meals = getMealsForDay(dateStr);
  const cal = getCalories();
  const prot = getProtein();
  const isWorkout = isWorkoutDay(dateStr);
  const sat = isSaturday(dateStr);
  const sun = isSunday(dateStr);
  const week = getWeekNumber(dateStr);
  const morningRoutine = isWorkout ? MORNING_ROUTINE_WORKOUT : MORNING_ROUTINE_REST;
  const milestone = MILESTONE_MESSAGES[streak];

  const allMealsComplete = Object.values(day.meals).every(Boolean);

  return (
    <div className="page today-page">
      <div className="day-header">
        <div className="day-header-top">
          <h1>{formatDisplayDate(date)}</h1>
          <span className="week-badge">Week {week}</span>
        </div>
        {streak > 0 && (
          <div className="streak-banner">
            <span className="streak-fire">&#x1F525;</span> {streak} day streak
            {milestone && <div className="milestone-msg">{milestone}</div>}
          </div>
        )}
      </div>

      {sun && (
        <div className="card reminder-card">
          <h3>&#x1F6D2; Meal Prep Reminder</h3>
          <ul>
            {GROCERY_LIST.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="card totals-card">
        <h3>&#x1F4CA; Today's Totals</h3>
        <ProgressBar label="Calories" current={cal.consumed} target={cal.target} unit="cal" />
        <ProgressBar label="Protein" current={prot.consumed} target={prot.target} unit="g" />
      </div>

      <div className="card">
        <h3>&#x23F0; Morning Routine</h3>
        {morningRoutine.map((item) => (
          <Checkbox
            key={item.id}
            checked={day.morningRoutine[item.id] || false}
            onChange={() => toggleRoutine(item.id)}
            label={`${item.time} - ${item.name}`}
          />
        ))}
      </div>

      {isWorkout && (
        <div className="card">
          <h3>&#x1F4AA; Workout</h3>
          <button className="btn btn-workout" onClick={onNavigateWorkout}>
            Log Today's Workout &rarr;
          </button>
        </div>
      )}

      <div className="card">
        <h3>&#x1F37D;&#xFE0F; Meals</h3>
        {meals.map((meal) => (
          <div key={meal.id} className="meal-row">
            <Checkbox
              checked={day.meals[meal.id] || false}
              onChange={() => toggleMeal(meal.id)}
              label={
                <div className="meal-info">
                  <span className="meal-time">{meal.time}</span>
                  <span className="meal-name">{meal.name}</span>
                  {meal.calories !== null ? (
                    <span className="meal-macros">{meal.calories} cal, {meal.protein}g protein</span>
                  ) : (
                    <span className="meal-macros">Manual entry</span>
                  )}
                  <span className="meal-desc">{meal.description}</span>
                </div>
              }
            />
            {meal.calories === null && sat && day.meals[meal.id] && (
              <div className="manual-entry">
                <input
                  type="number"
                  placeholder="Calories"
                  value={day.meal3Manual.calories}
                  onChange={(e) => setMeal3Manual('calories', e.target.value)}
                  className="input-small"
                />
                <input
                  type="number"
                  placeholder="Protein (g)"
                  value={day.meal3Manual.protein}
                  onChange={(e) => setMeal3Manual('protein', e.target.value)}
                  className="input-small"
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="card">
        <h3>&#x1F48A; Supplements</h3>
        {SUPPLEMENTS.map((supp) => (
          <Checkbox
            key={supp.id}
            checked={day.supplements[supp.id] || false}
            onChange={() => toggleSupplement(supp.id)}
            label={`${supp.time} - ${supp.name}`}
          />
        ))}
      </div>

      <div className="card">
        <h3>&#x1F3AF; Daily Goals</h3>
        <Checkbox
          checked={day.steps}
          onChange={toggleSteps}
          label="10,000 steps completed"
        />
        <Checkbox
          checked={day.bedtime}
          onChange={toggleBedtime}
          label="Bed by 11:00 PM"
        />
        <Checkbox
          checked={allMealsComplete}
          onChange={() => {}}
          label="All meals consumed"
          disabled
        />
        {isWorkout && (
          <Checkbox
            checked={false}
            onChange={onNavigateWorkout}
            label="Workout completed"
            disabled
          />
        )}
      </div>
    </div>
  );
}
