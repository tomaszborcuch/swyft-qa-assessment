
-- Assume PostgreSQL.
-- Task: daily avg download speed and p95 latency for last 7 days.
-- Table: measurements(ts timestamptz, download_mbps numeric, upload_mbps numeric, latency_ms numeric)
-- Write your query below.

SELECT
    DATE_TRUNC('day', ts) AS day,
    AVG(download_mbps) AS avg_download_speed,
    PERCENTILE_CONT(0.95) WITHIN GROUP (ORDER BY latency_ms) AS p95_latency
FROM
    measurements
WHERE
    ts >= NOW() - INTERVAL '7 days'
GROUP BY
    day
ORDER BY
    day;
