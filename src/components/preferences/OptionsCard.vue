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
    <div class="row mt-2 pt-4">
      <label class="text-secondary small mb-1 col-12">Export or Import your Kanbanity data</label>
      <b-link :download="filename" :href="downloadLink" class="ml-3">
        <b-button @click="exportJson">Export</b-button>
      </b-link>
      <b-button
        v-b-toggle.import
        class="ml-2"
        variant="warning"
        :disabled="!edit"
      >
        Import
      </b-button>
    </div>
    <div class="row mt-2">
      <b-collapse id="import" class="ml-3">
        <b-form-file
          :disabled="!edit"
          accept=".json"
          v-model="importFile"
          @input="handleImport"
        ></b-form-file>
      </b-collapse>
    </div>
  </b-card>
</template>

<script lang="ts">
import { mapActions, mapGetters } from "vuex";

export default {
  name: "OptionsCard",
  data() {
    return {
      edit: false,
      filename: "kanbanity-export_" + new Date().toLocaleDateString().replaceAll("/", "-") + ".json",
      downloadLink: "",
      importFile: null,
      jsonType: "application/json",
    };
  },
  computed: {
    ...mapGetters({ exportJsonString: "getStorageToExport" }),
  },
  methods: {
    ...mapActions({
      importStorage: "importStorage",
    }),
    deleteAll(): void {
      this.$store.commit("deleteAll");
    },
    exportJson(): void {
      this.$store.commit("setStorageToExport");
      let blob = new Blob([this.exportJsonString], {
        type: this.jsonType,
      });
      this.downloadLink = URL.createObjectURL(blob);
    },
    handleImport(): void {
      const content = new Blob([this.importFile], {
        type: this.importFile.type,
      });
      if (content.type === this.jsonType) {
        content.text().then((res) => this.importStorage(JSON.parse(res)));
      } else {
        this.$store.dispatch("errorToaster", {
          title: "Invalid File Type",
          message: "Please upload a valid JSON file!",
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
