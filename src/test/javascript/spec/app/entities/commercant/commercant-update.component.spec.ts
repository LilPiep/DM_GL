/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import CommercantUpdateComponent from '@/entities/commercant/commercant-update.vue';
import CommercantClass from '@/entities/commercant/commercant-update.component';
import CommercantService from '@/entities/commercant/commercant.service';

import CooperativeService from '@/entities/cooperative/cooperative.service';

import CommandeService from '@/entities/commande/commande.service';
import AlertService from '@/shared/alert/alert.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
const router = new Router();
localVue.use(Router);
localVue.use(ToastPlugin);
localVue.component('font-awesome-icon', {});
localVue.component('b-input-group', {});
localVue.component('b-input-group-prepend', {});
localVue.component('b-form-datepicker', {});
localVue.component('b-form-input', {});

describe('Component Tests', () => {
  describe('Commercant Management Update Component', () => {
    let wrapper: Wrapper<CommercantClass>;
    let comp: CommercantClass;
    let commercantServiceStub: SinonStubbedInstance<CommercantService>;

    beforeEach(() => {
      commercantServiceStub = sinon.createStubInstance<CommercantService>(CommercantService);

      wrapper = shallowMount<CommercantClass>(CommercantUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          commercantService: () => commercantServiceStub,
          alertService: () => new AlertService(),

          cooperativeService: () =>
            sinon.createStubInstance<CooperativeService>(CooperativeService, {
              retrieve: sinon.stub().resolves({}),
            } as any),

          commandeService: () =>
            sinon.createStubInstance<CommandeService>(CommandeService, {
              retrieve: sinon.stub().resolves({}),
            } as any),
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.commercant = entity;
        commercantServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(commercantServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.commercant = entity;
        commercantServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(commercantServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundCommercant = { id: 123 };
        commercantServiceStub.find.resolves(foundCommercant);
        commercantServiceStub.retrieve.resolves([foundCommercant]);

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
