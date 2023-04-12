/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import CommandeDetailComponent from '@/entities/commande/commande-details.vue';
import CommandeClass from '@/entities/commande/commande-details.component';
import CommandeService from '@/entities/commande/commande.service';
import router from '@/router';
import AlertService from '@/shared/alert/alert.service';

const localVue = createLocalVue();
localVue.use(VueRouter);

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('Commande Management Detail Component', () => {
    let wrapper: Wrapper<CommandeClass>;
    let comp: CommandeClass;
    let commandeServiceStub: SinonStubbedInstance<CommandeService>;

    beforeEach(() => {
      commandeServiceStub = sinon.createStubInstance<CommandeService>(CommandeService);

      wrapper = shallowMount<CommandeClass>(CommandeDetailComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: { commandeService: () => commandeServiceStub, alertService: () => new AlertService() },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundCommande = { id: 123 };
        commandeServiceStub.find.resolves(foundCommande);

        // WHEN
        comp.retrieveCommande(123);
        await comp.$nextTick();

        // THEN
        expect(comp.commande).toBe(foundCommande);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundCommande = { id: 123 };
        commandeServiceStub.find.resolves(foundCommande);

        // WHEN
        comp.beforeRouteEnter({ params: { commandeId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.commande).toBe(foundCommande);
      });
    });

    describe('Previous state', () => {
      it('Should go previous state', async () => {
        comp.previousState();
        await comp.$nextTick();

        expect(comp.$router.currentRoute.fullPath).toContain('/');
      });
    });
  });
});
