import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required } from 'vuelidate/lib/validators';
import dayjs from 'dayjs';
import { DATE_TIME_LONG_FORMAT } from '@/shared/date/filters';

import AlertService from '@/shared/alert/alert.service';

import ZoneGeographiqueService from '@/entities/zone-geographique/zone-geographique.service';
import { IZoneGeographique } from '@/shared/model/zone-geographique.model';

import ClientService from '@/entities/client/client.service';
import { IClient } from '@/shared/model/client.model';

import LivreurService from '@/entities/livreur/livreur.service';
import { ILivreur } from '@/shared/model/livreur.model';

import CommercantService from '@/entities/commercant/commercant.service';
import { ICommercant } from '@/shared/model/commercant.model';

import { ICommande, Commande } from '@/shared/model/commande.model';
import CommandeService from './commande.service';
import { Paiement } from '@/shared/model/enumerations/paiement.model';

const validations: any = {
  commande: {
    commandeID: {
      required,
      numeric,
    },
    meansOfPayment: {
      required,
    },
    deadline: {},
    price: {},
  },
};

@Component({
  validations,
})
export default class CommandeUpdate extends Vue {
  @Inject('commandeService') private commandeService: () => CommandeService;
  @Inject('alertService') private alertService: () => AlertService;

  public commande: ICommande = new Commande();

  @Inject('zoneGeographiqueService') private zoneGeographiqueService: () => ZoneGeographiqueService;

  public zoneGeographiques: IZoneGeographique[] = [];

  @Inject('clientService') private clientService: () => ClientService;

  public clients: IClient[] = [];

  @Inject('livreurService') private livreurService: () => LivreurService;

  public livreurs: ILivreur[] = [];

  @Inject('commercantService') private commercantService: () => CommercantService;

  public commercants: ICommercant[] = [];
  public paiementValues: string[] = Object.keys(Paiement);
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.commandeId) {
        vm.retrieveCommande(to.params.commandeId);
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
    if (this.commande.id) {
      this.commandeService()
        .update(this.commande)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('blogApp.commande.updated', { param: param.id });
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
      this.commandeService()
        .create(this.commande)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('blogApp.commande.created', { param: param.id });
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

  public convertDateTimeFromServer(date: Date): string {
    if (date && dayjs(date).isValid()) {
      return dayjs(date).format(DATE_TIME_LONG_FORMAT);
    }
    return null;
  }

  public updateInstantField(field, event) {
    if (event.target.value) {
      this.commande[field] = dayjs(event.target.value, DATE_TIME_LONG_FORMAT);
    } else {
      this.commande[field] = null;
    }
  }

  public updateZonedDateTimeField(field, event) {
    if (event.target.value) {
      this.commande[field] = dayjs(event.target.value, DATE_TIME_LONG_FORMAT);
    } else {
      this.commande[field] = null;
    }
  }

  public retrieveCommande(commandeId): void {
    this.commandeService()
      .find(commandeId)
      .then(res => {
        res.deadline = new Date(res.deadline);
        this.commande = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.zoneGeographiqueService()
      .retrieve()
      .then(res => {
        this.zoneGeographiques = res.data;
      });
    this.clientService()
      .retrieve()
      .then(res => {
        this.clients = res.data;
      });
    this.livreurService()
      .retrieve()
      .then(res => {
        this.livreurs = res.data;
      });
    this.commercantService()
      .retrieve()
      .then(res => {
        this.commercants = res.data;
      });
  }
}
