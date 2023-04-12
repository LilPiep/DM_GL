<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="blogApp.commercant.home.createOrEditLabel"
          data-cy="CommercantCreateUpdateHeading"
          v-text="$t('blogApp.commercant.home.createOrEditLabel')"
        >
          Create or edit a Commercant
        </h2>
        <div>
          <div class="form-group" v-if="commercant.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="commercant.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('blogApp.commercant.commercantID')" for="commercant-commercantID"
              >Commercant ID</label
            >
            <input
              type="number"
              class="form-control"
              name="commercantID"
              id="commercant-commercantID"
              data-cy="commercantID"
              :class="{ valid: !$v.commercant.commercantID.$invalid, invalid: $v.commercant.commercantID.$invalid }"
              v-model.number="$v.commercant.commercantID.$model"
              required
            />
            <div v-if="$v.commercant.commercantID.$anyDirty && $v.commercant.commercantID.$invalid">
              <small class="form-text text-danger" v-if="!$v.commercant.commercantID.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
              <small class="form-text text-danger" v-if="!$v.commercant.commercantID.numeric" v-text="$t('entity.validation.number')">
                This field should be a number.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('blogApp.commercant.commercantType')" for="commercant-commercantType"
              >Commercant Type</label
            >
            <input
              type="text"
              class="form-control"
              name="commercantType"
              id="commercant-commercantType"
              data-cy="commercantType"
              :class="{ valid: !$v.commercant.commercantType.$invalid, invalid: $v.commercant.commercantType.$invalid }"
              v-model="$v.commercant.commercantType.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('blogApp.commercant.shopUrl')" for="commercant-shopUrl">Shop Url</label>
            <input
              type="text"
              class="form-control"
              name="shopUrl"
              id="commercant-shopUrl"
              data-cy="shopUrl"
              :class="{ valid: !$v.commercant.shopUrl.$invalid, invalid: $v.commercant.shopUrl.$invalid }"
              v-model="$v.commercant.shopUrl.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('blogApp.commercant.cooperative')" for="commercant-cooperative">Cooperative</label>
            <select
              class="form-control"
              id="commercant-cooperative"
              data-cy="cooperative"
              name="cooperative"
              v-model="commercant.cooperative"
            >
              <option v-bind:value="null"></option>
              <option
                v-bind:value="
                  commercant.cooperative && cooperativeOption.id === commercant.cooperative.id ? commercant.cooperative : cooperativeOption
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
            :disabled="$v.commercant.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./commercant-update.component.ts"></script>
