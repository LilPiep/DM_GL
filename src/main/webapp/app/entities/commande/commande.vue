<template>
  <div>
    <h2 id="page-heading" data-cy="CommandeHeading">
      <span v-text="$t('blogApp.commande.home.title')" id="commande-heading">Commandes</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="$t('blogApp.commande.home.refreshListLabel')">Refresh List</span>
        </button>
        <router-link :to="{ name: 'CommandeCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-commande"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span v-text="$t('blogApp.commande.home.createLabel')"> Create a new Commande </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && commandes && commandes.length === 0">
      <span v-text="$t('blogApp.commande.home.notFound')">No commandes found</span>
    </div>
    <div class="table-responsive" v-if="commandes && commandes.length > 0">
      <table class="table table-striped" aria-describedby="commandes">
        <thead>
          <tr>
            <th scope="row"><span v-text="$t('global.field.id')">ID</span></th>
            <th scope="row"><span v-text="$t('blogApp.commande.commandeID')">Commande ID</span></th>
            <th scope="row"><span v-text="$t('blogApp.commande.meansOfPayment')">Means Of Payment</span></th>
            <th scope="row"><span v-text="$t('blogApp.commande.deadline')">Deadline</span></th>
            <th scope="row"><span v-text="$t('blogApp.commande.price')">Price</span></th>
            <th scope="row"><span v-text="$t('blogApp.commande.zoneGeographique')">Zone Geographique</span></th>
            <th scope="row"><span v-text="$t('blogApp.commande.client')">Client</span></th>
            <th scope="row"><span v-text="$t('blogApp.commande.livreur')">Livreur</span></th>
            <th scope="row"><span v-text="$t('blogApp.commande.commercant')">Commercant</span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="commande in commandes" :key="commande.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'CommandeView', params: { commandeId: commande.id } }">{{ commande.id }}</router-link>
            </td>
            <td>{{ commande.commandeID }}</td>
            <td v-text="$t('blogApp.Paiement.' + commande.meansOfPayment)">{{ commande.meansOfPayment }}</td>
            <td>{{ commande.deadline ? $d(Date.parse(commande.deadline), 'short') : '' }}</td>
            <td>{{ commande.price }}</td>
            <td>
              <div v-if="commande.zoneGeographique">
                <router-link :to="{ name: 'ZoneGeographiqueView', params: { zoneGeographiqueId: commande.zoneGeographique.id } }">{{
                  commande.zoneGeographique.id
                }}</router-link>
              </div>
            </td>
            <td>
              <div v-if="commande.client">
                <router-link :to="{ name: 'ClientView', params: { clientId: commande.client.id } }">{{ commande.client.id }}</router-link>
              </div>
            </td>
            <td>
              <div v-if="commande.livreur">
                <router-link :to="{ name: 'LivreurView', params: { livreurId: commande.livreur.id } }">{{
                  commande.livreur.id
                }}</router-link>
              </div>
            </td>
            <td>
              <div v-if="commande.commercant">
                <router-link :to="{ name: 'CommercantView', params: { commercantId: commande.commercant.id } }">{{
                  commande.commercant.id
                }}</router-link>
              </div>
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'CommandeView', params: { commandeId: commande.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'CommandeEdit', params: { commandeId: commande.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(commande)"
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
        ><span id="blogApp.commande.delete.question" data-cy="commandeDeleteDialogHeading" v-text="$t('entity.delete.title')"
          >Confirm delete operation</span
        ></span
      >
      <div class="modal-body">
        <p id="jhi-delete-commande-heading" v-text="$t('blogApp.commande.delete.question', { id: removeId })">
          Are you sure you want to delete this Commande?
        </p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-commande"
          data-cy="entityConfirmDeleteButton"
          v-text="$t('entity.action.delete')"
          v-on:click="removeCommande()"
        >
          Delete
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./commande.component.ts"></script>
