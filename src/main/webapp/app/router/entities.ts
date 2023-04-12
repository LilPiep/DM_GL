import { Authority } from '@/shared/security/authority';
/* tslint:disable */
// prettier-ignore
const Entities = () => import('@/entities/entities.vue');

// prettier-ignore
const Cooperative = () => import('@/entities/cooperative/cooperative.vue');
// prettier-ignore
const CooperativeUpdate = () => import('@/entities/cooperative/cooperative-update.vue');
// prettier-ignore
const CooperativeDetails = () => import('@/entities/cooperative/cooperative-details.vue');
// prettier-ignore
const ZoneGeographique = () => import('@/entities/zone-geographique/zone-geographique.vue');
// prettier-ignore
const ZoneGeographiqueUpdate = () => import('@/entities/zone-geographique/zone-geographique-update.vue');
// prettier-ignore
const ZoneGeographiqueDetails = () => import('@/entities/zone-geographique/zone-geographique-details.vue');
// prettier-ignore
const Livreur = () => import('@/entities/livreur/livreur.vue');
// prettier-ignore
const LivreurUpdate = () => import('@/entities/livreur/livreur-update.vue');
// prettier-ignore
const LivreurDetails = () => import('@/entities/livreur/livreur-details.vue');
// prettier-ignore
const Commercant = () => import('@/entities/commercant/commercant.vue');
// prettier-ignore
const CommercantUpdate = () => import('@/entities/commercant/commercant-update.vue');
// prettier-ignore
const CommercantDetails = () => import('@/entities/commercant/commercant-details.vue');
// prettier-ignore
const Client = () => import('@/entities/client/client.vue');
// prettier-ignore
const ClientUpdate = () => import('@/entities/client/client-update.vue');
// prettier-ignore
const ClientDetails = () => import('@/entities/client/client-details.vue');
// prettier-ignore
const Commande = () => import('@/entities/commande/commande.vue');
// prettier-ignore
const CommandeUpdate = () => import('@/entities/commande/commande-update.vue');
// prettier-ignore
const CommandeDetails = () => import('@/entities/commande/commande-details.vue');
// jhipster-needle-add-entity-to-router-import - JHipster will import entities to the router here

export default {
  path: '/',
  component: Entities,
  children: [
    {
      path: 'cooperative',
      name: 'Cooperative',
      component: Cooperative,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'cooperative/new',
      name: 'CooperativeCreate',
      component: CooperativeUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'cooperative/:cooperativeId/edit',
      name: 'CooperativeEdit',
      component: CooperativeUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'cooperative/:cooperativeId/view',
      name: 'CooperativeView',
      component: CooperativeDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'zone-geographique',
      name: 'ZoneGeographique',
      component: ZoneGeographique,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'zone-geographique/new',
      name: 'ZoneGeographiqueCreate',
      component: ZoneGeographiqueUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'zone-geographique/:zoneGeographiqueId/edit',
      name: 'ZoneGeographiqueEdit',
      component: ZoneGeographiqueUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'zone-geographique/:zoneGeographiqueId/view',
      name: 'ZoneGeographiqueView',
      component: ZoneGeographiqueDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'livreur',
      name: 'Livreur',
      component: Livreur,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'livreur/new',
      name: 'LivreurCreate',
      component: LivreurUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'livreur/:livreurId/edit',
      name: 'LivreurEdit',
      component: LivreurUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'livreur/:livreurId/view',
      name: 'LivreurView',
      component: LivreurDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'commercant',
      name: 'Commercant',
      component: Commercant,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'commercant/new',
      name: 'CommercantCreate',
      component: CommercantUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'commercant/:commercantId/edit',
      name: 'CommercantEdit',
      component: CommercantUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'commercant/:commercantId/view',
      name: 'CommercantView',
      component: CommercantDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'client',
      name: 'Client',
      component: Client,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'client/new',
      name: 'ClientCreate',
      component: ClientUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'client/:clientId/edit',
      name: 'ClientEdit',
      component: ClientUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'client/:clientId/view',
      name: 'ClientView',
      component: ClientDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'commande',
      name: 'Commande',
      component: Commande,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'commande/new',
      name: 'CommandeCreate',
      component: CommandeUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'commande/:commandeId/edit',
      name: 'CommandeEdit',
      component: CommandeUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'commande/:commandeId/view',
      name: 'CommandeView',
      component: CommandeDetails,
      meta: { authorities: [Authority.USER] },
    },
    // jhipster-needle-add-entity-to-router - JHipster will add entities to the router here
  ],
};
