describe('KPI Dashboard', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/metrics?metric=download', {
      statusCode: 200,
      body: {
        metric: 'download',
        description: '<b>download</b> metric',
        points: Array.from({ length: 12 }).map((_, i) => ({ t: i, v: 50 + i * 3 })),
      },
    }).as('getDownloadMetrics');

    cy.intercept('GET', '/api/metrics?metric=upload', {
      statusCode: 200,
      body: {
        metric: 'upload',
        description: '<b>upload</b> metric',
        points: Array.from({ length: 12 }).map((_, i) => ({ t: i, v: 20 + i * 2 })),
      },
    }).as('getUploadMetrics');
  });

  it('renders correctly with default data', () => {
    cy.visit('/');
    cy.get('h1').contains('Network KPI Dashboard');
    cy.wait('@getDownloadMetrics');
    cy.get('canvas').should('be.visible');
  });

  it('updates the chart when selecting another metric', () => {
    cy.visit('/');
    cy.wait('@getDownloadMetrics');
    cy.get('#metric').select('Upload');
    cy.wait('@getUploadMetrics');
    cy.get('canvas').should('be.visible');
  });

  it('retries and successfully loads data if the request fails once', () => {
    let requestCount = 0;
    cy.intercept('GET', '/api/metrics?metric=download', (req) => {
      requestCount++;
      if (requestCount === 1) {
        req.reply({ statusCode: 500, body: { error: 'Intermittent failure' } });
      } else {
        req.reply({
          statusCode: 200,
          body: {
            metric: 'download',
            description: '<b>download</b> metric',
            points: Array.from({ length: 12 }).map((_, i) => ({ t: i, v: 50 + i * 3 })),
          },
        });
      }
    }).as('getDownloadMetricsWithRetry');

    cy.visit('/');
    cy.wait('@getDownloadMetricsWithRetry');
    cy.wait('@getDownloadMetricsWithRetry');
    cy.get('canvas').should('be.visible');
  });

  it('detects XSS vulnerability', () => {
    const maliciousDescription = '<script>window.xssDetected = true;</script>';
    cy.intercept('GET', '/api/metrics?metric=download', {
      statusCode: 200,
      body: {
        metric: 'download',
        description: maliciousDescription,
        points: Array.from({ length: 12 }).map((_, i) => ({ t: i, v: 50 + i * 3 })),
      },
    }).as('getXssMetric');

    cy.visit('/');
    cy.wait('@getXssMetric');

    cy.window().should('have.property', 'xssDetected', true);
  });
});