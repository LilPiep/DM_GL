/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import ZoneGeographiqueUpdateComponent from '@/entities/zone-geographique/zone-geographique-update.vue';
import ZoneGeographiqueClass from '@/entities/zone-geographique/zone-geographique-update.component';
import ZoneGeographiqueService from '@/entities/zone-geographique/zone-geographique.service';

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
  describe('ZoneGeographique Management Update Component', () => {
    let wrapper: Wrapper<ZoneGeographiqueClass>;
    let comp: ZoneGeographiqueClass;
    let zoneGeographiqueServiceStub: SinonStubbedInstance<ZoneGeographiqueService>;

    beforeEach(() => {
      zoneGeographiqueServiceStub = sinon.createStubInstance<ZoneGeographiqueService>(ZoneGeographiqueService);

      wrapper = shallowMount<ZoneGeographiqueClass>(ZoneGeographiqueUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          zoneGeographiqueService: () => zoneGeographiqueServiceStub,
          alertService: () => new AlertService(),

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
        comp.zoneGeographique = entity;
        zoneGeographiqueServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(zoneGeographiqueServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.zoneGeographique = entity;
        zoneGeographiqueServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(zoneGeographiqueServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundZoneGeographique = { id: 123 };
        zoneGeographiqueServiceStub.find.resolves(foundZoneGeographique);
        zoneGeographiqueServiceStub.retrieve.resolves([foundZoneGeographique]);

        // WHEN
        comp.beforeRouteEnter({ params: { zoneGeographiqueId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.zoneGeographique).toBe(foundZoneGeographique);
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
