import { Component, Vue, Inject } from 'vue-property-decorator';

import { ICommande } from '@/shared/model/commande.model';
import CommandeService from './commande.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class CommandeDetails extends Vue {
  @Inject('commandeService') private commandeService: () => CommandeService;
  @Inject('alertService') private alertService: () => AlertService;

  public commande: ICommande = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.commandeId) {
        vm.retrieveCommande(to.params.commandeId);
      }
    });
  }

  public retrieveCommande(commandeId) {
    this.commandeService()
      .find(commandeId)
      .then(res => {
        this.commande = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
