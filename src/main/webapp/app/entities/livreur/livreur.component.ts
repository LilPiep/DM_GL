import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { ILivreur } from '@/shared/model/livreur.model';

import LivreurService from './livreur.service';
import AlertService from '@/shared/alert/alert.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Livreur extends Vue {
  @Inject('livreurService') private livreurService: () => LivreurService;
  @Inject('alertService') private alertService: () => AlertService;

  private removeId: number = null;

  public livreurs: ILivreur[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllLivreurs();
  }

  public clear(): void {
    this.retrieveAllLivreurs();
  }

  public retrieveAllLivreurs(): void {
    this.isFetching = true;
    this.livreurService()
      .retrieve()
      .then(
        res => {
          this.livreurs = res.data;
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

  public prepareRemove(instance: ILivreur): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeLivreur(): void {
    this.livreurService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('blogApp.livreur.deleted', { param: this.removeId });
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllLivreurs();
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
