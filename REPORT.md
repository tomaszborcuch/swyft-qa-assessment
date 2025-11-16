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

### Intermittent 500 Error for `metric=upload`

Błąd 500 dla metryki `upload` jest celowo wprowadzony w pliku `server.js`. Serwer sprawdza, czy aktualna minuta jest parzysta czy nieparzysta. Jeśli jest nieparzysta, celowo zwraca błąd 500.
