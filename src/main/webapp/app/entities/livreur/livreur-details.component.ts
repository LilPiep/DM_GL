import { Component, Vue, Inject } from 'vue-property-decorator';

import { ILivreur } from '@/shared/model/livreur.model';
import LivreurService from './livreur.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class LivreurDetails extends Vue {
  @Inject('livreurService') private livreurService: () => LivreurService;
  @Inject('alertService') private alertService: () => AlertService;

  public livreur: ILivreur = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.livreurId) {
        vm.retrieveLivreur(to.params.livreurId);
      }
    });
  }

  public retrieveLivreur(livreurId) {
    this.livreurService()
      .find(livreurId)
      .then(res => {
        this.livreur = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
