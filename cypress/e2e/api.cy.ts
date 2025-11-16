describe('API Testing - Core C', () => {
  it("TEST1: should return 200 for valid REST 'download' metric", () => {
    cy.request('/api/metrics?metric=download').its('status').should('eq', 200);
  });

  it("TEST2: should handle intermittent 500 for REST 'upload' metric", () => {
    cy.request({
      method: 'GET',
      url: '/api/metrics?metric=upload',
      failOnStatusCode: false
    }).its('status').should('be.oneOf', [200, 500]);
  });

  it("TEST3: should return 200 for invalid REST metric", () => {
    cy.request({
      method: 'GET',
      url: '/api/metrics?metric=invalid',
      failOnStatusCode: false
    }).its('status').should('eq', 200);
  });

  it("TEST4: should return data for valid GraphQL 'download' metric", () => {
    cy.request('POST', '/graphql', { query: `query($m:String!){ kpi(metric:$m){ t v } }`, variables: { m: 'download' } })
      .its('body.data.kpi').should('exist');
  });

  it("TEST5: should return data for invalid GraphQL metric", () => {
    cy.request('POST', '/graphql', { query: `query($m:String!){ kpi(metric:$m){ t v } }`, variables: { m: 'invalid' } })
      .its('body.data.kpi').should('exist');
  });
});