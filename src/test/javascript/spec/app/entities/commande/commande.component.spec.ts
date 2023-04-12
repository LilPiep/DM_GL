/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import CommandeComponent from '@/entities/commande/commande.vue';
import CommandeClass from '@/entities/commande/commande.component';
import CommandeService from '@/entities/commande/commande.service';
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
  describe('Commande Management Component', () => {
    let wrapper: Wrapper<CommandeClass>;
    let comp: CommandeClass;
    let commandeServiceStub: SinonStubbedInstance<CommandeService>;

    beforeEach(() => {
      commandeServiceStub = sinon.createStubInstance<CommandeService>(CommandeService);
      commandeServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<CommandeClass>(CommandeComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          commandeService: () => commandeServiceStub,
          alertService: () => new AlertService(),
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      commandeServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllCommandes();
      await comp.$nextTick();

      // THEN
      expect(commandeServiceStub.retrieve.called).toBeTruthy();
      expect(comp.commandes[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      commandeServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      expect(commandeServiceStub.retrieve.callCount).toEqual(1);

      comp.removeCommande();
      await comp.$nextTick();

      // THEN
      expect(commandeServiceStub.delete.called).toBeTruthy();
      expect(commandeServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
