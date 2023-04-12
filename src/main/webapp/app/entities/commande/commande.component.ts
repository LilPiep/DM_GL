import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { ICommande } from '@/shared/model/commande.model';

import CommandeService from './commande.service';
import AlertService from '@/shared/alert/alert.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Commande extends Vue {
  @Inject('commandeService') private commandeService: () => CommandeService;
  @Inject('alertService') private alertService: () => AlertService;

  private removeId: number = null;

  public commandes: ICommande[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllCommandes();
  }

  public clear(): void {
    this.retrieveAllCommandes();
  }

  public retrieveAllCommandes(): void {
    this.isFetching = true;
    this.commandeService()
      .retrieve()
      .then(
        res => {
          this.commandes = res.data;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
          this.alertService().showHttpError(this, err.response);
        }
      );
  }

  public handleSyncList(): void {
    this.clear();
  }

  public prepareRemove(instance: ICommande): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeCommande(): void {
    this.commandeService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('blogApp.commande.deleted', { param: this.removeId });
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllCommandes();
        this.closeDialog();
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
