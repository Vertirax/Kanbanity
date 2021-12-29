<template>
  <b-card class="col-md-6 col-xl-6 p-2 m-2">
    <b-card-title class="d-flex">
      <span>Options</span>

      <GeneralButton
        variant="outline-primary"
        class="ml-auto"
        :pressed="edit"
        @click="edit = !edit"
        icon="pencil-fill"
      />
    </b-card-title>

    <GeneralButton
      variant="danger"
      :disabled="!edit"
      @click="openConfirmationPopup"
      text="Delete All"
      icon="trash-fill"
      title="Delete all Board related data"
    />
    <ConfirmationPopup
      :id="popupId"
      title="Delete Data"
      text="Are you sure you want to delete all board related data?"
      @confirm="deleteAll"
    />
    <div class="row mt-2 pt-4">
      <Title class="col-12" text="Export or Import your Kanbanity data" />
      <b-link :download="filename" :href="downloadLink" class="ml-3">
        <GeneralButton text="Export" @click="exportJson" variant="secondary" />
      </b-link>
      <GeneralButton
        v-b-toggle:import
        variant="warning"
        class="ml-2"
        :disabled="!edit"
        text="Import"
      />
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
import ConfirmationPopup from "@/components/popups/ConfirmationPopup.vue";
import GeneralButton from "@/components/form/GeneralButton.vue";
import Title from "@/components/form/Title.vue";

export default {
  name: "OptionsCard",
  components: {
    ConfirmationPopup,
    GeneralButton,
    Title,
  },
  data() {
    return {
      edit: false,
      filename: "kanbanity-export_" + new Date().toLocaleDateString().replaceAll("/", "-") + ".json",
      downloadLink: "",
      importFile: null,
      jsonType: "application/json",
      popupId: "confirmation-popup",
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
    openConfirmationPopup(): void {
      this.$bvModal.show(this.popupId);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
