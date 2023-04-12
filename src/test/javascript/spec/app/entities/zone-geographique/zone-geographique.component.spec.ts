/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import ZoneGeographiqueComponent from '@/entities/zone-geographique/zone-geographique.vue';
import ZoneGeographiqueClass from '@/entities/zone-geographique/zone-geographique.component';
import ZoneGeographiqueService from '@/entities/zone-geographique/zone-geographique.service';
import AlertService from '@/shared/alert/alert.service';

const localVue = createLocalVue();
localVue.use(ToastPlugin);

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('b-badge', {});
localVue.directive('b-modal', {});
localVue.component('b-button', {});
localVue.component('router-link', {});

const bModalStub = {
  render: () => {},
  methods: {
    hide: () => {},
    show: () => {},
  },
};

describe('Component Tests', () => {
  describe('ZoneGeographique Management Component', () => {
    let wrapper: Wrapper<ZoneGeographiqueClass>;
    let comp: ZoneGeographiqueClass;
    let zoneGeographiqueServiceStub: SinonStubbedInstance<ZoneGeographiqueService>;

    beforeEach(() => {
      zoneGeographiqueServiceStub = sinon.createStubInstance<ZoneGeographiqueService>(ZoneGeographiqueService);
      zoneGeographiqueServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<ZoneGeographiqueClass>(ZoneGeographiqueComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          zoneGeographiqueService: () => zoneGeographiqueServiceStub,
          alertService: () => new AlertService(),
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      zoneGeographiqueServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllZoneGeographiques();
      await comp.$nextTick();

      // THEN
      expect(zoneGeographiqueServiceStub.retrieve.called).toBeTruthy();
      expect(comp.zoneGeographiques[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      zoneGeographiqueServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      expect(zoneGeographiqueServiceStub.retrieve.callCount).toEqual(1);

      comp.removeZoneGeographique();
      await comp.$nextTick();

      // THEN
      expect(zoneGeographiqueServiceStub.delete.called).toBeTruthy();
      expect(zoneGeographiqueServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
