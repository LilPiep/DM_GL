<template>
  <div>
    <h2 id="page-heading" data-cy="CommercantHeading">
      <span v-text="$t('blogApp.commercant.home.title')" id="commercant-heading">Commercants</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="$t('blogApp.commercant.home.refreshListLabel')">Refresh List</span>
        </button>
        <router-link :to="{ name: 'CommercantCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-commercant"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span v-text="$t('blogApp.commercant.home.createLabel')"> Create a new Commercant </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && commercants && commercants.length === 0">
      <span v-text="$t('blogApp.commercant.home.notFound')">No commercants found</span>
    </div>
    <div class="table-responsive" v-if="commercants && commercants.length > 0">
      <table class="table table-striped" aria-describedby="commercants">
        <thead>
          <tr>
            <th scope="row"><span v-text="$t('global.field.id')">ID</span></th>
            <th scope="row"><span v-text="$t('blogApp.commercant.commercantID')">Commercant ID</span></th>
            <th scope="row"><span v-text="$t('blogApp.commercant.commercantType')">Commercant Type</span></th>
            <th scope="row"><span v-text="$t('blogApp.commercant.shopUrl')">Shop Url</span></th>
            <th scope="row"><span v-text="$t('blogApp.commercant.cooperative')">Cooperative</span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="commercant in commercants" :key="commercant.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'CommercantView', params: { commercantId: commercant.id } }">{{ commercant.id }}</router-link>
            </td>
            <td>{{ commercant.commercantID }}</td>
            <td>{{ commercant.commercantType }}</td>
            <td>{{ commercant.shopUrl }}</td>
            <td>
              <div v-if="commercant.cooperative">
                <router-link :to="{ name: 'CooperativeView', params: { cooperativeId: commercant.cooperative.id } }">{{
                  commercant.cooperative.id
                }}</router-link>
              </div>
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'CommercantView', params: { commercantId: commercant.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'CommercantEdit', params: { commercantId: commercant.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(commercant)"
                  variant="danger"
                  class="btn btn-sm"
                  data-cy="entityDeleteButton"
                  v-b-modal.removeEntity
                >
                  <font-awesome-icon icon="times"></font-awesome-icon>
                  <span class="d-none d-md-inline" v-text="$t('entity.action.delete')">Delete</span>
                </b-button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <b-modal ref="removeEntity" id="removeEntity">
      <span slot="modal-title"
        ><span id="blogApp.commercant.delete.question" data-cy="commercantDeleteDialogHeading" v-text="$t('entity.delete.title')"
          >Confirm delete operation</span
        ></span
      >
      <div class="modal-body">
        <p id="jhi-delete-commercant-heading" v-text="$t('blogApp.commercant.delete.question', { id: removeId })">
          Are you sure you want to delete this Commercant?
        </p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-commercant"
          data-cy="entityConfirmDeleteButton"
          v-text="$t('entity.action.delete')"
          v-on:click="removeCommercant()"
        >
          Delete
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./commercant.component.ts"></script>
