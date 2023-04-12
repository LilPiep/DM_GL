import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { ICommercant } from '@/shared/model/commercant.model';

import CommercantService from './commercant.service';
import AlertService from '@/shared/alert/alert.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Commercant extends Vue {
  @Inject('commercantService') private commercantService: () => CommercantService;
  @Inject('alertService') private alertService: () => AlertService;

  private removeId: number = null;

  public commercants: ICommercant[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllCommercants();
  }

  public clear(): void {
    this.retrieveAllCommercants();
  }

  public retrieveAllCommercants(): void {
    this.isFetching = true;
    this.commercantService()
      .retrieve()
      .then(
        res => {
          this.commercants = res.data;
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

  public prepareRemove(instance: ICommercant): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeCommercant(): void {
    this.commercantService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('blogApp.commercant.deleted', { param: this.removeId });
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllCommercants();
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
