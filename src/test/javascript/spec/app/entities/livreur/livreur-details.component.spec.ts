/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import LivreurDetailComponent from '@/entities/livreur/livreur-details.vue';
import LivreurClass from '@/entities/livreur/livreur-details.component';
import LivreurService from '@/entities/livreur/livreur.service';
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
  describe('Livreur Management Detail Component', () => {
    let wrapper: Wrapper<LivreurClass>;
    let comp: LivreurClass;
    let livreurServiceStub: SinonStubbedInstance<LivreurService>;

    beforeEach(() => {
      livreurServiceStub = sinon.createStubInstance<LivreurService>(LivreurService);

      wrapper = shallowMount<LivreurClass>(LivreurDetailComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: { livreurService: () => livreurServiceStub, alertService: () => new AlertService() },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundLivreur = { id: 123 };
        livreurServiceStub.find.resolves(foundLivreur);

        // WHEN
        comp.retrieveLivreur(123);
        await comp.$nextTick();

        // THEN
        expect(comp.livreur).toBe(foundLivreur);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundLivreur = { id: 123 };
        livreurServiceStub.find.resolves(foundLivreur);

        // WHEN
        comp.beforeRouteEnter({ params: { livreurId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.livreur).toBe(foundLivreur);
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
