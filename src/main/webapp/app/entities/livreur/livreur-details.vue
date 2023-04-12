<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="livreur">
        <h2 class="jh-entity-heading" data-cy="livreurDetailsHeading">
          <span v-text="$t('blogApp.livreur.detail.title')">Livreur</span> {{ livreur.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('blogApp.livreur.livreurName')">Livreur Name</span>
          </dt>
          <dd>
            <span>{{ livreur.livreurName }}</span>
          </dd>
          <dt>
            <span v-text="$t('blogApp.livreur.livreurID')">Livreur ID</span>
          </dt>
          <dd>
            <span>{{ livreur.livreurID }}</span>
          </dd>
          <dt>
            <span v-text="$t('blogApp.livreur.cooperative')">Cooperative</span>
          </dt>
          <dd>
            <div v-if="livreur.cooperative">
              <router-link :to="{ name: 'CooperativeView', params: { cooperativeId: livreur.cooperative.id } }">{{
                livreur.cooperative.id
              }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link v-if="livreur.id" :to="{ name: 'LivreurEdit', params: { livreurId: livreur.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./livreur-details.component.ts"></script>
