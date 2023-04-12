/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import CommercantDetailComponent from '@/entities/commercant/commercant-details.vue';
import CommercantClass from '@/entities/commercant/commercant-details.component';
import CommercantService from '@/entities/commercant/commercant.service';
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
  describe('Commercant Management Detail Component', () => {
    let wrapper: Wrapper<CommercantClass>;
    let comp: CommercantClass;
    let commercantServiceStub: SinonStubbedInstance<CommercantService>;

    beforeEach(() => {
      commercantServiceStub = sinon.createStubInstance<CommercantService>(CommercantService);

      wrapper = shallowMount<CommercantClass>(CommercantDetailComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: { commercantService: () => commercantServiceStub, alertService: () => new AlertService() },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundCommercant = { id: 123 };
        commercantServiceStub.find.resolves(foundCommercant);

        // WHEN
        comp.retrieveCommercant(123);
        await comp.$nextTick();

        // THEN
        expect(comp.commercant).toBe(foundCommercant);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundCommercant = { id: 123 };
        commercantServiceStub.find.resolves(foundCommercant);

        // WHEN
        comp.beforeRouteEnter({ params: { commercantId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.commercant).toBe(foundCommercant);
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
