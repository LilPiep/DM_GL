<template>
  <div>
    <h2 id="page-heading" data-cy="LivreurHeading">
      <span v-text="$t('blogApp.livreur.home.title')" id="livreur-heading">Livreurs</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="$t('blogApp.livreur.home.refreshListLabel')">Refresh List</span>
        </button>
        <router-link :to="{ name: 'LivreurCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-livreur"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span v-text="$t('blogApp.livreur.home.createLabel')"> Create a new Livreur </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && livreurs && livreurs.length === 0">
      <span v-text="$t('blogApp.livreur.home.notFound')">No livreurs found</span>
    </div>
    <div class="table-responsive" v-if="livreurs && livreurs.length > 0">
      <table class="table table-striped" aria-describedby="livreurs">
        <thead>
          <tr>
            <th scope="row"><span v-text="$t('global.field.id')">ID</span></th>
            <th scope="row"><span v-text="$t('blogApp.livreur.livreurName')">Livreur Name</span></th>
            <th scope="row"><span v-text="$t('blogApp.livreur.livreurID')">Livreur ID</span></th>
            <th scope="row"><span v-text="$t('blogApp.livreur.cooperative')">Cooperative</span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="livreur in livreurs" :key="livreur.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'LivreurView', params: { livreurId: livreur.id } }">{{ livreur.id }}</router-link>
            </td>
            <td>{{ livreur.livreurName }}</td>
            <td>{{ livreur.livreurID }}</td>
            <td>
              <div v-if="livreur.cooperative">
                <router-link :to="{ name: 'CooperativeView', params: { cooperativeId: livreur.cooperative.id } }">{{
                  livreur.cooperative.id
                }}</router-link>
              </div>
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'LivreurView', params: { livreurId: livreur.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'LivreurEdit', params: { livreurId: livreur.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(livreur)"
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
        ><span id="blogApp.livreur.delete.question" data-cy="livreurDeleteDialogHeading" v-text="$t('entity.delete.title')"
          >Confirm delete operation</span
        ></span
      >
      <div class="modal-body">
        <p id="jhi-delete-livreur-heading" v-text="$t('blogApp.livreur.delete.question', { id: removeId })">
          Are you sure you want to delete this Livreur?
        </p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-livreur"
          data-cy="entityConfirmDeleteButton"
          v-text="$t('entity.action.delete')"
          v-on:click="removeLivreur()"
        >
          Delete
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./livreur.component.ts"></script>
