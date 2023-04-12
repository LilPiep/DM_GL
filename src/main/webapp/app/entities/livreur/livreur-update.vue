<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="blogApp.livreur.home.createOrEditLabel"
          data-cy="LivreurCreateUpdateHeading"
          v-text="$t('blogApp.livreur.home.createOrEditLabel')"
        >
          Create or edit a Livreur
        </h2>
        <div>
          <div class="form-group" v-if="livreur.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="livreur.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('blogApp.livreur.livreurName')" for="livreur-livreurName">Livreur Name</label>
            <input
              type="text"
              class="form-control"
              name="livreurName"
              id="livreur-livreurName"
              data-cy="livreurName"
              :class="{ valid: !$v.livreur.livreurName.$invalid, invalid: $v.livreur.livreurName.$invalid }"
              v-model="$v.livreur.livreurName.$model"
              required
            />
            <div v-if="$v.livreur.livreurName.$anyDirty && $v.livreur.livreurName.$invalid">
              <small class="form-text text-danger" v-if="!$v.livreur.livreurName.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('blogApp.livreur.livreurID')" for="livreur-livreurID">Livreur ID</label>
            <input
              type="number"
              class="form-control"
              name="livreurID"
              id="livreur-livreurID"
              data-cy="livreurID"
              :class="{ valid: !$v.livreur.livreurID.$invalid, invalid: $v.livreur.livreurID.$invalid }"
              v-model.number="$v.livreur.livreurID.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('blogApp.livreur.cooperative')" for="livreur-cooperative">Cooperative</label>
            <select class="form-control" id="livreur-cooperative" data-cy="cooperative" name="cooperative" v-model="livreur.cooperative">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="
                  livreur.cooperative && cooperativeOption.id === livreur.cooperative.id ? livreur.cooperative : cooperativeOption
                "
                v-for="cooperativeOption in cooperatives"
                :key="cooperativeOption.id"
              >
                {{ cooperativeOption.id }}
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
            :disabled="$v.livreur.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./livreur-update.component.ts"></script>
