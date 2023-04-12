<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="blogApp.commande.home.createOrEditLabel"
          data-cy="CommandeCreateUpdateHeading"
          v-text="$t('blogApp.commande.home.createOrEditLabel')"
        >
          Create or edit a Commande
        </h2>
        <div>
          <div class="form-group" v-if="commande.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="commande.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('blogApp.commande.commandeID')" for="commande-commandeID">Commande ID</label>
            <input
              type="number"
              class="form-control"
              name="commandeID"
              id="commande-commandeID"
              data-cy="commandeID"
              :class="{ valid: !$v.commande.commandeID.$invalid, invalid: $v.commande.commandeID.$invalid }"
              v-model.number="$v.commande.commandeID.$model"
              required
            />
            <div v-if="$v.commande.commandeID.$anyDirty && $v.commande.commandeID.$invalid">
              <small class="form-text text-danger" v-if="!$v.commande.commandeID.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
              <small class="form-text text-danger" v-if="!$v.commande.commandeID.numeric" v-text="$t('entity.validation.number')">
                This field should be a number.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('blogApp.commande.meansOfPayment')" for="commande-meansOfPayment"
              >Means Of Payment</label
            >
            <select
              class="form-control"
              name="meansOfPayment"
              :class="{ valid: !$v.commande.meansOfPayment.$invalid, invalid: $v.commande.meansOfPayment.$invalid }"
              v-model="$v.commande.meansOfPayment.$model"
              id="commande-meansOfPayment"
              data-cy="meansOfPayment"
              required
            >
              <option
                v-for="paiement in paiementValues"
                :key="paiement"
                v-bind:value="paiement"
                v-bind:label="$t('blogApp.Paiement.' + paiement)"
              >
                {{ paiement }}
              </option>
            </select>
            <div v-if="$v.commande.meansOfPayment.$anyDirty && $v.commande.meansOfPayment.$invalid">
              <small class="form-text text-danger" v-if="!$v.commande.meansOfPayment.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('blogApp.commande.deadline')" for="commande-deadline">Deadline</label>
            <div class="d-flex">
              <input
                id="commande-deadline"
                data-cy="deadline"
                type="datetime-local"
                class="form-control"
                name="deadline"
                :class="{ valid: !$v.commande.deadline.$invalid, invalid: $v.commande.deadline.$invalid }"
                :value="convertDateTimeFromServer($v.commande.deadline.$model)"
                @change="updateInstantField('deadline', $event)"
              />
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('blogApp.commande.price')" for="commande-price">Price</label>
            <input
              type="number"
              class="form-control"
              name="price"
              id="commande-price"
              data-cy="price"
              :class="{ valid: !$v.commande.price.$invalid, invalid: $v.commande.price.$invalid }"
              v-model.number="$v.commande.price.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('blogApp.commande.zoneGeographique')" for="commande-zoneGeographique"
              >Zone Geographique</label
            >
            <select
              class="form-control"
              id="commande-zoneGeographique"
              data-cy="zoneGeographique"
              name="zoneGeographique"
              v-model="commande.zoneGeographique"
            >
              <option v-bind:value="null"></option>
              <option
                v-bind:value="
                  commande.zoneGeographique && zoneGeographiqueOption.id === commande.zoneGeographique.id
                    ? commande.zoneGeographique
                    : zoneGeographiqueOption
                "
                v-for="zoneGeographiqueOption in zoneGeographiques"
                :key="zoneGeographiqueOption.id"
              >
                {{ zoneGeographiqueOption.id }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('blogApp.commande.client')" for="commande-client">Client</label>
            <select class="form-control" id="commande-client" data-cy="client" name="client" v-model="commande.client">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="commande.client && clientOption.id === commande.client.id ? commande.client : clientOption"
                v-for="clientOption in clients"
                :key="clientOption.id"
              >
                {{ clientOption.id }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('blogApp.commande.livreur')" for="commande-livreur">Livreur</label>
            <select class="form-control" id="commande-livreur" data-cy="livreur" name="livreur" v-model="commande.livreur">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="commande.livreur && livreurOption.id === commande.livreur.id ? commande.livreur : livreurOption"
                v-for="livreurOption in livreurs"
                :key="livreurOption.id"
              >
                {{ livreurOption.id }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('blogApp.commande.commercant')" for="commande-commercant">Commercant</label>
            <select class="form-control" id="commande-commercant" data-cy="commercant" name="commercant" v-model="commande.commercant">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="
                  commande.commercant && commercantOption.id === commande.commercant.id ? commande.commercant : commercantOption
                "
                v-for="commercantOption in commercants"
                :key="commercantOption.id"
              >
                {{ commercantOption.id }}
              </option>
            </select>
          </div>
        </div>
        <div>
          <button type="button" id="cancel-save" data-cy="entityCreateCancelButton" class="btn btn-secondary" v-on:click="previousState()">
            <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
          </button>
          <button
            type="submit"
            id="save-entity"
            data-cy="entityCreateSaveButton"
            :disabled="$v.commande.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./commande-update.component.ts"></script>
