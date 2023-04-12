/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import LivreurUpdateComponent from '@/entities/livreur/livreur-update.vue';
import LivreurClass from '@/entities/livreur/livreur-update.component';
import LivreurService from '@/entities/livreur/livreur.service';

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
  describe('Livreur Management Update Component', () => {
    let wrapper: Wrapper<LivreurClass>;
    let comp: LivreurClass;
    let livreurServiceStub: SinonStubbedInstance<LivreurService>;

    beforeEach(() => {
      livreurServiceStub = sinon.createStubInstance<LivreurService>(LivreurService);

      wrapper = shallowMount<LivreurClass>(LivreurUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          livreurService: () => livreurServiceStub,
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
        comp.livreur = entity;
        livreurServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(livreurServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.livreur = entity;
        livreurServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(livreurServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundLivreur = { id: 123 };
        livreurServiceStub.find.resolves(foundLivreur);
        livreurServiceStub.retrieve.resolves([foundLivreur]);

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
