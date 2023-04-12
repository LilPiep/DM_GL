<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="commande">
        <h2 class="jh-entity-heading" data-cy="commandeDetailsHeading">
          <span v-text="$t('blogApp.commande.detail.title')">Commande</span> {{ commande.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('blogApp.commande.commandeID')">Commande ID</span>
          </dt>
          <dd>
            <span>{{ commande.commandeID }}</span>
          </dd>
          <dt>
            <span v-text="$t('blogApp.commande.meansOfPayment')">Means Of Payment</span>
          </dt>
          <dd>
            <span v-text="$t('blogApp.Paiement.' + commande.meansOfPayment)">{{ commande.meansOfPayment }}</span>
          </dd>
          <dt>
            <span v-text="$t('blogApp.commande.deadline')">Deadline</span>
          </dt>
          <dd>
            <span v-if="commande.deadline">{{ $d(Date.parse(commande.deadline), 'long') }}</span>
          </dd>
          <dt>
            <span v-text="$t('blogApp.commande.price')">Price</span>
          </dt>
          <dd>
            <span>{{ commande.price }}</span>
          </dd>
          <dt>
            <span v-text="$t('blogApp.commande.zoneGeographique')">Zone Geographique</span>
          </dt>
          <dd>
            <div v-if="commande.zoneGeographique">
              <router-link :to="{ name: 'ZoneGeographiqueView', params: { zoneGeographiqueId: commande.zoneGeographique.id } }">{{
                commande.zoneGeographique.id
              }}</router-link>
            </div>
          </dd>
          <dt>
            <span v-text="$t('blogApp.commande.client')">Client</span>
          </dt>
          <dd>
            <div v-if="commande.client">
              <router-link :to="{ name: 'ClientView', params: { clientId: commande.client.id } }">{{ commande.client.id }}</router-link>
            </div>
          </dd>
          <dt>
            <span v-text="$t('blogApp.commande.livreur')">Livreur</span>
          </dt>
          <dd>
            <div v-if="commande.livreur">
              <router-link :to="{ name: 'LivreurView', params: { livreurId: commande.livreur.id } }">{{ commande.livreur.id }}</router-link>
            </div>
          </dd>
          <dt>
            <span v-text="$t('blogApp.commande.commercant')">Commercant</span>
          </dt>
          <dd>
            <div v-if="commande.commercant">
              <router-link :to="{ name: 'CommercantView', params: { commercantId: commande.commercant.id } }">{{
                commande.commercant.id
              }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link v-if="commande.id" :to="{ name: 'CommandeEdit', params: { commandeId: commande.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./commande-details.component.ts"></script>
