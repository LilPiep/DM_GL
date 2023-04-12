import { Component, Vue, Inject } from 'vue-property-decorator';

import { ICommercant } from '@/shared/model/commercant.model';
import CommercantService from './commercant.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class CommercantDetails extends Vue {
  @Inject('commercantService') private commercantService: () => CommercantService;
  @Inject('alertService') private alertService: () => AlertService;

  public commercant: ICommercant = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.commercantId) {
        vm.retrieveCommercant(to.params.commercantId);
      }
    });
  }

  public retrieveCommercant(commercantId) {
    this.commercantService()
      .find(commercantId)
      .then(res => {
        this.commercant = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
