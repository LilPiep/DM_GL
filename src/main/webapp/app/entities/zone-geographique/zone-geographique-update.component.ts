import { Component, Vue, Inject } from 'vue-property-decorator';

import AlertService from '@/shared/alert/alert.service';

import CommandeService from '@/entities/commande/commande.service';
import { ICommande } from '@/shared/model/commande.model';

import { IZoneGeographique, ZoneGeographique } from '@/shared/model/zone-geographique.model';
import ZoneGeographiqueService from './zone-geographique.service';

const validations: any = {
  zoneGeographique: {
    zoneAddress: {},
  },
};

@Component({
  validations,
})
export default class ZoneGeographiqueUpdate extends Vue {
  @Inject('zoneGeographiqueService') private zoneGeographiqueService: () => ZoneGeographiqueService;
  @Inject('alertService') private alertService: () => AlertService;

  public zoneGeographique: IZoneGeographique = new ZoneGeographique();

  @Inject('commandeService') private commandeService: () => CommandeService;

  public commandes: ICommande[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.zoneGeographiqueId) {
        vm.retrieveZoneGeographique(to.params.zoneGeographiqueId);
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
    if (this.zoneGeographique.id) {
      this.zoneGeographiqueService()
        .update(this.zoneGeographique)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('blogApp.zoneGeographique.updated', { param: param.id });
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
      this.zoneGeographiqueService()
        .create(this.zoneGeographique)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('blogApp.zoneGeographique.created', { param: param.id });
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

  public retrieveZoneGeographique(zoneGeographiqueId): void {
    this.zoneGeographiqueService()
      .find(zoneGeographiqueId)
      .then(res => {
        this.zoneGeographique = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.commandeService()
      .retrieve()
      .then(res => {
        this.commandes = res.data;
      });
  }
}
