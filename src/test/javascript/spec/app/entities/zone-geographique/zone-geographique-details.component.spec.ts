/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import ZoneGeographiqueDetailComponent from '@/entities/zone-geographique/zone-geographique-details.vue';
import ZoneGeographiqueClass from '@/entities/zone-geographique/zone-geographique-details.component';
import ZoneGeographiqueService from '@/entities/zone-geographique/zone-geographique.service';
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
  describe('ZoneGeographique Management Detail Component', () => {
    let wrapper: Wrapper<ZoneGeographiqueClass>;
    let comp: ZoneGeographiqueClass;
    let zoneGeographiqueServiceStub: SinonStubbedInstance<ZoneGeographiqueService>;

    beforeEach(() => {
      zoneGeographiqueServiceStub = sinon.createStubInstance<ZoneGeographiqueService>(ZoneGeographiqueService);

      wrapper = shallowMount<ZoneGeographiqueClass>(ZoneGeographiqueDetailComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: { zoneGeographiqueService: () => zoneGeographiqueServiceStub, alertService: () => new AlertService() },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundZoneGeographique = { id: 123 };
        zoneGeographiqueServiceStub.find.resolves(foundZoneGeographique);

        // WHEN
        comp.retrieveZoneGeographique(123);
        await comp.$nextTick();

        // THEN
        expect(comp.zoneGeographique).toBe(foundZoneGeographique);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundZoneGeographique = { id: 123 };
        zoneGeographiqueServiceStub.find.resolves(foundZoneGeographique);

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
