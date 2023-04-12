import { Component, Vue, Inject } from 'vue-property-decorator';

import { IZoneGeographique } from '@/shared/model/zone-geographique.model';
import ZoneGeographiqueService from './zone-geographique.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class ZoneGeographiqueDetails extends Vue {
  @Inject('zoneGeographiqueService') private zoneGeographiqueService: () => ZoneGeographiqueService;
  @Inject('alertService') private alertService: () => AlertService;

  public zoneGeographique: IZoneGeographique = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.zoneGeographiqueId) {
        vm.retrieveZoneGeographique(to.params.zoneGeographiqueId);
      }
    });
  }

  public retrieveZoneGeographique(zoneGeographiqueId) {
    this.zoneGeographiqueService()
      .find(zoneGeographiqueId)
      .then(res => {
        this.zoneGeographique = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
