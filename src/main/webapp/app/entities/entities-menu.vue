<template>
  <div>
    <b-dropdown-item to="/cooperative">
      <font-awesome-icon icon="asterisk" />
      <span v-text="$t('global.menu.entities.cooperative')">Cooperative</span>
    </b-dropdown-item>
    <b-dropdown-item to="/zone-geographique">
      <font-awesome-icon icon="asterisk" />
      <span v-text="$t('global.menu.entities.zoneGeographique')">Zone Geographique</span>
    </b-dropdown-item>
    <b-dropdown-item to="/livreur">
      <font-awesome-icon icon="asterisk" />
      <span v-text="$t('global.menu.entities.livreur')">Livreur</span>
    </b-dropdown-item>
    <b-dropdown-item to="/commercant">
      <font-awesome-icon icon="asterisk" />
      <span v-text="$t('global.menu.entities.commercant')">Commercant</span>
    </b-dropdown-item>
    <b-dropdown-item to="/client">
      <font-awesome-icon icon="asterisk" />
      <span v-text="$t('global.menu.entities.client')">Client</span>
    </b-dropdown-item>
    <b-dropdown-item to="/commande">
      <font-awesome-icon icon="asterisk" />
      <span v-text="$t('global.menu.entities.commande')">Commande</span>
    </b-dropdown-item>
    <!-- jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here -->
  </div>
</template>

<script lang="ts" src="./entities-menu.component.ts"></script>
