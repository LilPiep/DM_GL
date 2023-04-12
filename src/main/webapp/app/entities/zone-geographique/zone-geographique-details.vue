<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="zoneGeographique">
        <h2 class="jh-entity-heading" data-cy="zoneGeographiqueDetailsHeading">
          <span v-text="$t('blogApp.zoneGeographique.detail.title')">ZoneGeographique</span> {{ zoneGeographique.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('blogApp.zoneGeographique.zoneAddress')">Zone Address</span>
          </dt>
          <dd>
            <span>{{ zoneGeographique.zoneAddress }}</span>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link
          v-if="zoneGeographique.id"
          :to="{ name: 'ZoneGeographiqueEdit', params: { zoneGeographiqueId: zoneGeographique.id } }"
          custom
          v-slot="{ navigate }"
        >
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./zone-geographique-details.component.ts"></script>
