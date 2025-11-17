# REPORT

Use this file to briefly document what you did, what you skipped, and why.
Include notes for:
- E2E scenarios & flakiness controls
- API findings (incl. intermittent 500 root cause)
- Performance (Lighthouse) results & 1 improvement
- Security: XSS vector & mitigation
- SQL query reasoning
- Optional: AI feature test strategy

## API Findings

The 500 error for the 'upload' metric is intentionally introduced in the 'server.js' file. The server checks whether the current minute is even or odd. If it is odd, it intentionally returns a 500 error.
The 'TEST2: should handle intermittent 500 for REST 'upload' metric' test in 'cypress/e2e/api.cy.ts' is designed to occasionally fail when the server returns a 500 error.

## Security: XSS Vector & how to fix

The app has an XSS vulnerability because it uses `innerHTML` to display a description from the server. A malicious server could send a `<script>` tag in the description, which would then be executed by the browser.

**How to fix:**
The fix is to use `textContent` instead of `innerHTML`. This treats the description as plain text and prevents any scripts from running.

## AI Feature Test Strategy

My idea for testing an AI feature would be to create a testing agent.

I would install a MCP test case management tool to have a clear overview of all the test cases. I would also integrate this tool with Playwright also installed MCP.

The agent would be designed to:
1.  Read test cases from a test case management tool (e.g., TestRail).
2.  Automatically launch Playwright to execute these tests on the application.
3.  All the commands and instructions for the agent would be stored in a .md file, which the agent would read and execute.

This would create a system where the AI can dynamically run and validate test cases based on a set of instructions, making the testing process more automated and flexible.

## Performance

**Results:**
*   Performance: 60
*   Accessibility: 88
*   Best Practices: 100
*   SEO: 100

**My observation:**
The main performance hit comes from loading the Chart.js library too early. It's quite large and delays the page from becoming interactive.

**Suggested improvement:**
Implement lazy-loading for Chart.js. This means loading the library only when it's actually needed to display the chart. By doing so, the initial page load will be faster, as the browser won't be blocked by downloading and executing a large script upfront.