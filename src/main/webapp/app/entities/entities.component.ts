import { Component, Provide, Vue } from 'vue-property-decorator';

import UserService from '@/entities/user/user.service';
import CooperativeService from './cooperative/cooperative.service';
import ZoneGeographiqueService from './zone-geographique/zone-geographique.service';
import LivreurService from './livreur/livreur.service';
import CommercantService from './commercant/commercant.service';
import ClientService from './client/client.service';
import CommandeService from './commande/commande.service';
// jhipster-needle-add-entity-service-to-entities-component-import - JHipster will import entities services here

@Component
export default class Entities extends Vue {
  @Provide('userService') private userService = () => new UserService();
  @Provide('cooperativeService') private cooperativeService = () => new CooperativeService();
  @Provide('zoneGeographiqueService') private zoneGeographiqueService = () => new ZoneGeographiqueService();
  @Provide('livreurService') private livreurService = () => new LivreurService();
  @Provide('commercantService') private commercantService = () => new CommercantService();
  @Provide('clientService') private clientService = () => new ClientService();
  @Provide('commandeService') private commandeService = () => new CommandeService();
  // jhipster-needle-add-entity-service-to-entities-component - JHipster will import entities services here
}
