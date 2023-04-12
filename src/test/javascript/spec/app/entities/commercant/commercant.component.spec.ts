/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import CommercantComponent from '@/entities/commercant/commercant.vue';
import CommercantClass from '@/entities/commercant/commercant.component';
import CommercantService from '@/entities/commercant/commercant.service';
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
  describe('Commercant Management Component', () => {
    let wrapper: Wrapper<CommercantClass>;
    let comp: CommercantClass;
    let commercantServiceStub: SinonStubbedInstance<CommercantService>;

    beforeEach(() => {
      commercantServiceStub = sinon.createStubInstance<CommercantService>(CommercantService);
      commercantServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<CommercantClass>(CommercantComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          commercantService: () => commercantServiceStub,
          alertService: () => new AlertService(),
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      commercantServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllCommercants();
      await comp.$nextTick();

      // THEN
      expect(commercantServiceStub.retrieve.called).toBeTruthy();
      expect(comp.commercants[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      commercantServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      expect(commercantServiceStub.retrieve.callCount).toEqual(1);

      comp.removeCommercant();
      await comp.$nextTick();

      // THEN
      expect(commercantServiceStub.delete.called).toBeTruthy();
      expect(commercantServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
