import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IZoneGeographique } from '@/shared/model/zone-geographique.model';

import ZoneGeographiqueService from './zone-geographique.service';
import AlertService from '@/shared/alert/alert.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class ZoneGeographique extends Vue {
  @Inject('zoneGeographiqueService') private zoneGeographiqueService: () => ZoneGeographiqueService;
  @Inject('alertService') private alertService: () => AlertService;

  private removeId: number = null;

  public zoneGeographiques: IZoneGeographique[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllZoneGeographiques();
  }

  public clear(): void {
    this.retrieveAllZoneGeographiques();
  }

  public retrieveAllZoneGeographiques(): void {
    this.isFetching = true;
    this.zoneGeographiqueService()
      .retrieve()
      .then(
        res => {
          this.zoneGeographiques = res.data;
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

  public prepareRemove(instance: IZoneGeographique): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeZoneGeographique(): void {
    this.zoneGeographiqueService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('blogApp.zoneGeographique.deleted', { param: this.removeId });
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllZoneGeographiques();
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
