import { addDays, differenceInCalendarDays, format } from 'date-fns';

export const CAREER_START_DATE = '2026-05-18';
export const CAREER_TOTAL_DAYS = 60;

export const CAREER_ROUTES = [
  {
    id: 'qa',
    label: 'Main',
    title: 'QA Automation / SDET',
    detail: 'SQL, API testing, QA fundamentals, Playwright, GitHub proof.',
  },
  {
    id: 'support',
    label: 'Backup',
    title: 'Application / Product Support',
    detail: 'Troubleshooting, logs, SQL investigation, tickets, customer-facing technical support.',
  },
  {
    id: 'servicenow',
    label: 'Hidden',
    title: 'ServiceNow / ITSM',
    detail: 'Incidents, requests, catalog, Flow Designer, tables, basic JavaScript.',
  },
];

export const CAREER_PHASES = [
  { start: 1, end: 14, title: 'Foundation', focus: 'SQL, Postman, QA basics, GitHub cleanup', targetApps: 10 },
  { start: 15, end: 30, title: 'Portfolio', focus: 'SupportDesk project, API evidence, SQL validation, documentation', targetApps: 15 },
  { start: 31, end: 45, title: 'Automation + Support', focus: 'Playwright tests, logs, tickets, production issue practice', targetApps: 25 },
  { start: 46, end: 60, title: 'Interview Mode', focus: 'Mock interviews, high-volume applications, behavioral stories', targetApps: 35 },
];

const DAY_PLANS = [
  ['Testing foundations', 'SDLC, STLC, QA role, why companies hire QA', 'Write test cases for login, signup, logout, password reset', 'Create GitHub repo qa-automation-portfolio with /manual-test-cases', 'Draft 2-line QA/Application Support summary'],
  ['Testing types', 'Functional, non-functional, smoke, sanity, regression, severity vs priority', 'Convert Day 1 tests into a regression suite and add 5 negative tests', 'Add manual test cases as markdown or spreadsheet', 'Explain severity vs priority out loud'],
  ['Bug reporting', 'Bug lifecycle, reproducibility, expected vs actual, attachments', 'Write 5 bug reports from sample defects', 'Create /bug-reports with clean bug templates', 'Add Manual Testing to resume skills'],
  ['Agile QA', 'Agile, Scrum roles, sprint planning, standups, acceptance criteria', 'Write a fake Jira board with backlog, in progress, blocked, done', 'Document how QA fits into the sprint', 'Answer: how does QA work in Agile?'],
  ['Test planning', 'Test plan, strategy, scope, entry criteria, exit criteria', 'Write a test plan for a simple SaaS support app', 'Create /test-plan/test-plan.md', 'Explain smoke vs regression vs UAT'],
  ['SQL basics 1', 'SELECT, WHERE, ORDER BY, COUNT, SUM, AVG', 'Complete 10 SQL queries against a practice dataset', 'Add /sql-practice/day-06.md', 'Explain how SQL helps QA and support'],
  ['SQL basics 2', 'GROUP BY, HAVING, CASE WHEN, basic subqueries', 'Complete 10 more SQL queries with aggregations', 'Commit SQL answers and notes', 'Review week 1 gaps and fix repo README'],
  ['API basics', 'REST, GET, POST, PUT, DELETE, JSON, status codes', 'Send GET and POST requests in Postman', 'Create /postman and save screenshots/collection notes', 'Explain 200, 201, 400, 401, 403, 404, 500'],
  ['Postman workflows', 'Headers, auth token, request body, query params, environments', 'Build a Postman collection with GET/POST/PUT/DELETE', 'Export collection into portfolio repo', 'Explain API troubleshooting steps'],
  ['Postman tests', 'Basic JavaScript tests in Postman, assertions, variables', 'Add status-code and response-body checks', 'Document collection setup in README', 'Practice explaining request/response flow'],
  ['QA documentation', 'Traceability, test evidence, screenshots, test data', 'Create 10 manual test cases for a ticket app', 'Add evidence folder structure', 'Apply lightly to QA Analyst/Application Support roles'],
  ['GitHub cleanup', 'Repo structure, commits, README quality, screenshots', 'Clean folder names and write a portfolio README outline', 'Commit all foundation artifacts', 'Update LinkedIn headline draft'],
  ['Resume v1', 'Entry-level positioning for QA/SDET and support roles', 'Write resume bullets for SQL, API testing, bug reports, QA docs', 'Create resume-v1 notes', 'Apply to 10 recent roles'],
  ['Foundation review', 'Review SQL, API, QA definitions, weak spots', 'Redo missed SQL/API exercises and tighten docs', 'Create week-1-2 summary in README', 'Record a 60-second intro'],
  ['Project kickoff', 'SupportDesk QA project scope: tickets, users, priorities, statuses', 'Create project requirements and user stories', 'Add /supportdesk-project/requirements.md', 'Apply to QA/Application Support roles'],
  ['Test design', 'Equivalence classes, boundary values, negative testing', 'Write SupportDesk test cases for create ticket and required fields', 'Add /supportdesk-project/test-cases.md', 'Explain test design choices'],
  ['API test design', 'API contracts, payload validation, auth, error handling', 'Create API test checklist for SupportDesk endpoints', 'Add /supportdesk-project/api-test-plan.md', 'Practice API defect explanation'],
  ['SQL validation', 'JOIN, LEFT JOIN, data validation, orphan records', 'Write SQL checks for users, tickets, statuses, comments', 'Add /supportdesk-project/sql-validation.md', 'Apply to 15 roles'],
  ['Build option', 'Choose simple app or tested demo app and lock scope', 'Set up the target app/demo and document environment', 'Add setup instructions', 'Explain the app workflow end to end'],
  ['Manual execution', 'Test execution, pass/fail evidence, retesting', 'Run 15 manual test cases and record results', 'Add screenshots or notes as evidence', 'Update project status in README'],
  ['Bug evidence', 'Clear repro steps, impact, severity, priority', 'Write 5 realistic SupportDesk bug reports', 'Add screenshots or logs if available', 'Practice bug triage explanation'],
  ['Playwright setup', 'Node, npm, Playwright install, test runner basics', 'Install Playwright and run first browser test', 'Create /playwright-tests', 'Explain why Playwright for QA automation'],
  ['Selectors', 'Locators, roles, text selectors, stable test ids', 'Automate navigation and basic page checks', 'Commit first Playwright tests', 'Apply to 15 roles'],
  ['Form testing', 'Fill inputs, click buttons, assert validation messages', 'Automate create-ticket happy path and invalid form path', 'Add notes about form test data', 'Practice test walkthrough'],
  ['Search/filter testing', 'Filtering, sorting, state assertions', 'Automate search and status filter tests', 'Add test evidence screenshots/report notes', 'Update resume project bullet draft'],
  ['API automation', 'APIRequestContext or Postman/Newman concept, response assertions', 'Automate one API smoke test or document Postman run deeply', 'Update API evidence section', 'Apply to 15 roles'],
  ['GitHub Actions', 'CI basics, run tests on push, build status', 'Add GitHub Actions workflow if repo supports it', 'Document CI commands', 'Explain CI value in interviews'],
  ['Reports', 'HTML report, traces, screenshots, debugging failed tests', 'Generate Playwright report or capture test evidence', 'Add report screenshots/notes', 'Mock: explain a failed test'],
  ['Portfolio polish', 'README story, screenshots, project value, how to run', 'Make portfolio repo readable for recruiters', 'Finish SupportDesk proof checklist', 'Apply to 20 roles'],
  ['Midpoint audit', 'Identify weak skills and application gaps', 'Fix top 3 project/documentation gaps', 'Create 30-day progress summary', 'Refresh LinkedIn and resume headline'],
  ['Support fundamentals', 'Application support responsibilities, SLAs, ticket queues', 'Write incident/ticket workflow notes', 'Add /support-case-study', 'Apply to support and QA roles'],
  ['Logs 1', 'Log levels, timestamps, stack traces, correlation IDs', 'Analyze sample logs and identify likely root cause', 'Write support case study 1', 'Explain log triage steps'],
  ['Logs 2', 'Browser console, network tab, server errors', 'Use DevTools on a demo app and document findings', 'Add screenshots/notes', 'Practice support troubleshooting answer'],
  ['Incident handling', 'Severity, impact, workaround, escalation', 'Write incident report with timeline and customer update', 'Add incident-report.md', 'Apply to 25 roles'],
  ['SQL troubleshooting', 'Find bad records, missing joins, duplicate rows', 'Write 10 production-style SQL investigation queries', 'Add support-sql.md', 'Explain data validation under pressure'],
  ['API troubleshooting', 'Auth failures, bad payloads, 4xx vs 5xx, timeout symptoms', 'Debug 5 API scenarios in Postman', 'Add API troubleshooting notes', 'Mock support interview question'],
  ['Customer communication', 'Clear updates, asking for logs, setting expectations', 'Write 3 customer-facing support responses', 'Add support-communications.md', 'Practice concise updates'],
  ['Monitoring basics', 'Uptime, alerts, dashboards, error rate, latency', 'Write a simple alert response checklist', 'Add monitoring-checklist.md', 'Apply to 25 roles'],
  ['ServiceNow basics', 'ITSM, incidents, requests, service catalog, forms/tables', 'Write ServiceNow glossary and basic workflow', 'Add /servicenow-basics', 'Apply selectively to ITSM roles'],
  ['ServiceNow workflow', 'Flow Designer concept, assignment groups, states', 'Document incident lifecycle in ServiceNow style', 'Add ServiceNow case notes', 'Practice ITSM explanation'],
  ['JavaScript refresh', 'Variables, functions, arrays, objects, async basics', 'Write small JS exercises useful for Playwright/ServiceNow', 'Add /javascript-refresh', 'Review Playwright syntax'],
  ['Automation hardening', 'Avoid flaky waits, isolate test data, readable assertions', 'Refactor Playwright tests for stability', 'Update README test commands', 'Apply to 25 roles'],
  ['Project story', 'Problem, tools, tests, bugs found, business value', 'Write interview project script', 'Add project-explanation.md', 'Record yourself explaining it'],
  ['Resume v2', 'Tailor for QA Automation, Application Support, Technical Support', 'Create 3 resume versions', 'Store bullets and keywords', 'Apply using tailored version'],
  ['LinkedIn/networking', 'Recruiter messages, alumni messages, referral requests', 'Send 10 LinkedIn messages', 'Track responses and follow-ups', 'Practice 60-second intro'],
  ['SQL interview 1', 'Joins, group by, having, case, subqueries', 'Solve 15 SQL interview questions', 'Log mistakes and corrections', 'Apply to 30 roles'],
  ['SQL interview 2', 'CTEs, duplicates, nulls, top N, data validation', 'Solve 15 production-style SQL problems', 'Add interview-sql.md', 'Explain 3 queries out loud'],
  ['QA interview 1', 'Testing types, bug reports, test cases, test plan', 'Answer 20 QA questions in writing', 'Add qa-interview.md', 'Mock interview 30 minutes'],
  ['QA interview 2', 'Automation strategy, flaky tests, POM, CI, test data', 'Answer 15 automation questions', 'Add automation-interview.md', 'Mock project deep dive'],
  ['API interview', 'Status codes, auth, headers, JSON, debugging', 'Answer 20 API troubleshooting questions', 'Add api-interview.md', 'Apply to 35 roles'],
  ['Support interview', 'Incidents, logs, escalation, customer communication', 'Answer 20 support scenarios', 'Add support-interview.md', 'Mock support call'],
  ['Behavioral stories', 'STAR format, conflict, failure, learning, ownership', 'Write 10 STAR stories', 'Add behavioral-stories.md', 'Practice 5 out loud'],
  ['Mock interview 1', 'Full QA screen: intro, project, SQL, testing', 'Run a 45-minute mock and score weak areas', 'Fix top 2 answer gaps', 'Apply to 35 roles'],
  ['Mock interview 2', 'Support screen: logs, customer issue, SQL, escalation', 'Run a 45-minute mock and improve answers', 'Update support resume bullets', 'Follow up on applications'],
  ['High-volume apply', 'Recent postings, realistic titles, OPT-safe filtering', 'Apply to 40 roles posted recently', 'Track every application', 'Send 10 networking messages'],
  ['Portfolio final pass', 'Recruiter readability, screenshots, setup, proof', 'Clean final README and pinned repo description', 'Check links from resume/LinkedIn', 'Practice project pitch'],
  ['Role broadening', 'Implementation analyst, technical support, QA analyst, product support', 'Add broader role keywords to search list', 'Apply to 40 roles', 'Prepare honest learning statement'],
  ['Emergency backup map', 'Contract roles, staffing firms, university leads, referrals', 'Build backup employer/source list', 'Send referral requests', 'Practice availability/OPT answer'],
  ['Offer pipeline audit', 'Application tracker, recruiter responses, interview stages, follow-up timing', 'Review every application and mark status, next action, and follow-up date', 'Create a weekly pipeline dashboard with hot, warm, and cold leads', 'Practice explaining your availability, OPT timing, and strongest project proof'],
  ['Final readiness', 'End-to-end review of SQL/API/QA/automation/support', 'Redo weakest 10 questions and rerun tests', 'Write final action plan for next 30 days', 'Apply and follow up aggressively'],
];

function getPhase(dayNumber) {
  return CAREER_PHASES.find((phase) => dayNumber >= phase.start && dayNumber <= phase.end) || CAREER_PHASES[0];
}

export function getCareerDayNumber(dateStr) {
  return differenceInCalendarDays(new Date(`${dateStr}T00:00:00`), new Date(`${CAREER_START_DATE}T00:00:00`)) + 1;
}

export function getCareerPlanForDate(dateStr) {
  const dayNumber = getCareerDayNumber(dateStr);
  if (dayNumber < 1 || dayNumber > CAREER_TOTAL_DAYS) return null;
  const [title, learn, handsOn, project, interview] = DAY_PLANS[dayNumber - 1] || [
    'Catch-up and repair',
    'Review the weakest skill from the previous three days and rewrite notes in plain English',
    'Redo the unfinished hands-on task until it produces visible proof',
    'Commit the fixed artifact and update the README/application tracker',
    'Practice explaining what was blocked, how you debugged it, and what you fixed',
  ];
  const phase = getPhase(dayNumber);
  return {
    id: dateStr,
    date: dateStr,
    dayNumber,
    title,
    phase,
    targetApps: phase.targetApps,
    tasks: [
      { id: 'learn', label: 'Learn', detail: learn, block: '09:00-10:30' },
      { id: 'hands_on', label: 'Hands-on', detail: handsOn, block: '10:45-12:45' },
      { id: 'project', label: 'Portfolio', detail: project, block: '13:30-14:30' },
      { id: 'applications', label: 'Applications', detail: `Apply to ${phase.targetApps}+ recent roles: QA, SDET, Application Support, Technical Support, Implementation Analyst.`, block: '14:30-15:30' },
      { id: 'profile', label: 'Resume/LinkedIn', detail: 'Update resume, LinkedIn, GitHub, or application tracker with today\'s proof.', block: '15:30-16:30' },
      { id: 'interview', label: 'Interview', detail: interview, block: '16:30-17:00' },
    ],
  };
}

export function getCareerPlans() {
  return Array.from({ length: CAREER_TOTAL_DAYS }, (_, i) => {
    const date = addDays(new Date(`${CAREER_START_DATE}T00:00:00`), i);
    return getCareerPlanForDate(format(date, 'yyyy-MM-dd'));
  });
}
