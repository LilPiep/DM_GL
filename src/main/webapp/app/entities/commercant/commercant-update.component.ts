import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required } from 'vuelidate/lib/validators';

import AlertService from '@/shared/alert/alert.service';

import CooperativeService from '@/entities/cooperative/cooperative.service';
import { ICooperative } from '@/shared/model/cooperative.model';

import CommandeService from '@/entities/commande/commande.service';
import { ICommande } from '@/shared/model/commande.model';

import { ICommercant, Commercant } from '@/shared/model/commercant.model';
import CommercantService from './commercant.service';

const validations: any = {
  commercant: {
    commercantID: {
      required,
      numeric,
    },
    commercantType: {},
    shopUrl: {},
  },
};

@Component({
  validations,
})
export default class CommercantUpdate extends Vue {
  @Inject('commercantService') private commercantService: () => CommercantService;
  @Inject('alertService') private alertService: () => AlertService;

  public commercant: ICommercant = new Commercant();

  @Inject('cooperativeService') private cooperativeService: () => CooperativeService;

  public cooperatives: ICooperative[] = [];

  @Inject('commandeService') private commandeService: () => CommandeService;

  public commandes: ICommande[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.commercantId) {
        vm.retrieveCommercant(to.params.commercantId);
      }
      vm.initRelationships();
    });
  }

  created(): void {
    this.currentLanguage = this.$store.getters.currentLanguage;
    this.$store.watch(
      () => this.$store.getters.currentLanguage,
      () => {
        this.currentLanguage = this.$store.getters.currentLanguage;
      }
    );
  }

  public save(): void {
    this.isSaving = true;
    if (this.commercant.id) {
      this.commercantService()
        .update(this.commercant)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('blogApp.commercant.updated', { param: param.id });
          return (this.$root as any).$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Info',
            variant: 'info',
            solid: true,
            autoHideDelay: 5000,
          });
        })
        .catch(error => {
          this.isSaving = false;
          this.alertService().showHttpError(this, error.response);
        });
    } else {
      this.commercantService()
        .create(this.commercant)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('blogApp.commercant.created', { param: param.id });
          (this.$root as any).$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Success',
            variant: 'success',
            solid: true,
            autoHideDelay: 5000,
          });
        })
        .catch(error => {
          this.isSaving = false;
          this.alertService().showHttpError(this, error.response);
        });
    }
  }

  public retrieveCommercant(commercantId): void {
    this.commercantService()
      .find(commercantId)
      .then(res => {
        this.commercant = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.cooperativeService()
      .retrieve()
      .then(res => {
        this.cooperatives = res.data;
      });
    this.commandeService()
      .retrieve()
      .then(res => {
        this.commandes = res.data;
      });
  }
}
