<template>
  <b-card class="col-md-6 col-xl-6 p-2 m-2">
    <b-card-title class="d-flex">
      <span>Options</span>

      <b-button variant="outline-primary" class="ml-auto" :pressed="edit" @click="edit = !edit">
        <b-icon-pencil-fill />
      </b-button>
    </b-card-title>

    <div class="row">
      <label class="text-secondary small mb-1 col-12">Delete all Board related data</label>
      <b-button
        variant="danger"
        class="ml-3"
        :disabled="!edit"
        @click="deleteAll"
      >
        <b-icon-trash-fill />
        Delete All
      </b-button>
    </div>
  </b-card>
</template>

<script lang="ts">
export default {
  name: "OptionsCard",
  data() {
    return {
      edit: false,
    };
  },
  methods: {
    deleteAll(): void {
      this.$store.commit("deleteAll");
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  max-width: 48.5%;
}
</style>
