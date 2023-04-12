/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import LivreurComponent from '@/entities/livreur/livreur.vue';
import LivreurClass from '@/entities/livreur/livreur.component';
import LivreurService from '@/entities/livreur/livreur.service';
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
  describe('Livreur Management Component', () => {
    let wrapper: Wrapper<LivreurClass>;
    let comp: LivreurClass;
    let livreurServiceStub: SinonStubbedInstance<LivreurService>;

    beforeEach(() => {
      livreurServiceStub = sinon.createStubInstance<LivreurService>(LivreurService);
      livreurServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<LivreurClass>(LivreurComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          livreurService: () => livreurServiceStub,
          alertService: () => new AlertService(),
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      livreurServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllLivreurs();
      await comp.$nextTick();

      // THEN
      expect(livreurServiceStub.retrieve.called).toBeTruthy();
      expect(comp.livreurs[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      livreurServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      expect(livreurServiceStub.retrieve.callCount).toEqual(1);

      comp.removeLivreur();
      await comp.$nextTick();

      // THEN
      expect(livreurServiceStub.delete.called).toBeTruthy();
      expect(livreurServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
