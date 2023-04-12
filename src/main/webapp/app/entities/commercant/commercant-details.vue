<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="commercant">
        <h2 class="jh-entity-heading" data-cy="commercantDetailsHeading">
          <span v-text="$t('blogApp.commercant.detail.title')">Commercant</span> {{ commercant.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('blogApp.commercant.commercantID')">Commercant ID</span>
          </dt>
          <dd>
            <span>{{ commercant.commercantID }}</span>
          </dd>
          <dt>
            <span v-text="$t('blogApp.commercant.commercantType')">Commercant Type</span>
          </dt>
          <dd>
            <span>{{ commercant.commercantType }}</span>
          </dd>
          <dt>
            <span v-text="$t('blogApp.commercant.shopUrl')">Shop Url</span>
          </dt>
          <dd>
            <span>{{ commercant.shopUrl }}</span>
          </dd>
          <dt>
            <span v-text="$t('blogApp.commercant.cooperative')">Cooperative</span>
          </dt>
          <dd>
            <div v-if="commercant.cooperative">
              <router-link :to="{ name: 'CooperativeView', params: { cooperativeId: commercant.cooperative.id } }">{{
                commercant.cooperative.id
              }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link
          v-if="commercant.id"
          :to="{ name: 'CommercantEdit', params: { commercantId: commercant.id } }"
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

<script lang="ts" src="./commercant-details.component.ts"></script>
