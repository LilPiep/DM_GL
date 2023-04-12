<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="blogApp.zoneGeographique.home.createOrEditLabel"
          data-cy="ZoneGeographiqueCreateUpdateHeading"
          v-text="$t('blogApp.zoneGeographique.home.createOrEditLabel')"
        >
          Create or edit a ZoneGeographique
        </h2>
        <div>
          <div class="form-group" v-if="zoneGeographique.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="zoneGeographique.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('blogApp.zoneGeographique.zoneAddress')" for="zone-geographique-zoneAddress"
              >Zone Address</label
            >
            <input
              type="text"
              class="form-control"
              name="zoneAddress"
              id="zone-geographique-zoneAddress"
              data-cy="zoneAddress"
              :class="{ valid: !$v.zoneGeographique.zoneAddress.$invalid, invalid: $v.zoneGeographique.zoneAddress.$invalid }"
              v-model="$v.zoneGeographique.zoneAddress.$model"
            />
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
            :disabled="$v.zoneGeographique.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./zone-geographique-update.component.ts"></script>
