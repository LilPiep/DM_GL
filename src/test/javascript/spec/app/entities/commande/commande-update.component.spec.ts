/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';
import { ToastPlugin } from 'bootstrap-vue';

import dayjs from 'dayjs';
import { DATE_TIME_LONG_FORMAT } from '@/shared/date/filters';

import * as config from '@/shared/config/config';
import CommandeUpdateComponent from '@/entities/commande/commande-update.vue';
import CommandeClass from '@/entities/commande/commande-update.component';
import CommandeService from '@/entities/commande/commande.service';

import ZoneGeographiqueService from '@/entities/zone-geographique/zone-geographique.service';

import ClientService from '@/entities/client/client.service';

import LivreurService from '@/entities/livreur/livreur.service';

import CommercantService from '@/entities/commercant/commercant.service';
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
  describe('Commande Management Update Component', () => {
    let wrapper: Wrapper<CommandeClass>;
    let comp: CommandeClass;
    let commandeServiceStub: SinonStubbedInstance<CommandeService>;

    beforeEach(() => {
      commandeServiceStub = sinon.createStubInstance<CommandeService>(CommandeService);

      wrapper = shallowMount<CommandeClass>(CommandeUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          commandeService: () => commandeServiceStub,
          alertService: () => new AlertService(),

          zoneGeographiqueService: () =>
            sinon.createStubInstance<ZoneGeographiqueService>(ZoneGeographiqueService, {
              retrieve: sinon.stub().resolves({}),
            } as any),

          clientService: () =>
            sinon.createStubInstance<ClientService>(ClientService, {
              retrieve: sinon.stub().resolves({}),
            } as any),

          livreurService: () =>
            sinon.createStubInstance<LivreurService>(LivreurService, {
              retrieve: sinon.stub().resolves({}),
            } as any),

          commercantService: () =>
            sinon.createStubInstance<CommercantService>(CommercantService, {
              retrieve: sinon.stub().resolves({}),
            } as any),
        },
      });
      comp = wrapper.vm;
    });

    describe('load', () => {
      it('Should convert date from string', () => {
        // GIVEN
        const date = new Date('2019-10-15T11:42:02Z');

        // WHEN
        const convertedDate = comp.convertDateTimeFromServer(date);

        // THEN
        expect(convertedDate).toEqual(dayjs(date).format(DATE_TIME_LONG_FORMAT));
      });

      it('Should not convert date if date is not present', () => {
        expect(comp.convertDateTimeFromServer(null)).toBeNull();
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.commande = entity;
        commandeServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(commandeServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.commande = entity;
        commandeServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(commandeServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundCommande = { id: 123 };
        commandeServiceStub.find.resolves(foundCommande);
        commandeServiceStub.retrieve.resolves([foundCommande]);

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
