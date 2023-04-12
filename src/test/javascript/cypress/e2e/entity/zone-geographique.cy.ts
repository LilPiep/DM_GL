import {
  entityTableSelector,
  entityDetailsButtonSelector,
  entityDetailsBackButtonSelector,
  entityCreateButtonSelector,
  entityCreateSaveButtonSelector,
  entityCreateCancelButtonSelector,
  entityEditButtonSelector,
  entityDeleteButtonSelector,
  entityConfirmDeleteButtonSelector,
} from '../../support/entity';

describe('ZoneGeographique e2e test', () => {
  const zoneGeographiquePageUrl = '/zone-geographique';
  const zoneGeographiquePageUrlPattern = new RegExp('/zone-geographique(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const zoneGeographiqueSample = {};

  let zoneGeographique;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/zone-geographiques+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/zone-geographiques').as('postEntityRequest');
    cy.intercept('DELETE', '/api/zone-geographiques/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (zoneGeographique) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/zone-geographiques/${zoneGeographique.id}`,
      }).then(() => {
        zoneGeographique = undefined;
      });
    }
  });

  it('ZoneGeographiques menu should load ZoneGeographiques page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('zone-geographique');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('ZoneGeographique').should('exist');
    cy.url().should('match', zoneGeographiquePageUrlPattern);
  });

  describe('ZoneGeographique page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(zoneGeographiquePageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create ZoneGeographique page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/zone-geographique/new$'));
        cy.getEntityCreateUpdateHeading('ZoneGeographique');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', zoneGeographiquePageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/zone-geographiques',
          body: zoneGeographiqueSample,
        }).then(({ body }) => {
          zoneGeographique = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/zone-geographiques+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [zoneGeographique],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(zoneGeographiquePageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details ZoneGeographique page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('zoneGeographique');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', zoneGeographiquePageUrlPattern);
      });

      it('edit button click should load edit ZoneGeographique page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('ZoneGeographique');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', zoneGeographiquePageUrlPattern);
      });

      it('edit button click should load edit ZoneGeographique page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('ZoneGeographique');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', zoneGeographiquePageUrlPattern);
      });

      it('last delete button click should delete instance of ZoneGeographique', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('zoneGeographique').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', zoneGeographiquePageUrlPattern);

        zoneGeographique = undefined;
      });
    });
  });

  describe('new ZoneGeographique page', () => {
    beforeEach(() => {
      cy.visit(`${zoneGeographiquePageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('ZoneGeographique');
    });

    it('should create an instance of ZoneGeographique', () => {
      cy.get(`[data-cy="zoneAddress"]`).type('parse Rufiyaa').should('have.value', 'parse Rufiyaa');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        zoneGeographique = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', zoneGeographiquePageUrlPattern);
    });
  });
});
