describe('teapot page', () => {
  context('page load', () => {
    it('refuses to brew coffee', () => {
      cy.request({
        url: '/teapot',
        failOnStatusCode: false,
      }).then((resp) => {
        expect(resp.status).to.equal(418)
        expect(resp.redirectedToUrl).to.equal(undefined)
      })
    })
  })

  context('visual regression', () => {
    if (Cypress.env('NODE_ENV') !== 'production') return

    it('looks as before', () => {
      cy.visit({ url: '/teapot', failOnStatusCode: false })
      cy.compareSnapshot('teapot')
    })
  })
})
