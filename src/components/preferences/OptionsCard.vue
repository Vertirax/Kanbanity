<template>
  <b-card class="col-md-6 col-xl-6 p-2 m-2">
    <b-card-title class="d-flex">
      <span>{{ $t("preferences.options.title") }}</span>
      <GeneralButton
        variant="outline-primary"
        class="ml-auto"
        :pressed="edit"
        @click="edit = !edit"
        icon="pencil-fill"
      />
    </b-card-title>
    <div class="py-2">
      <CheckBox
        :title="$t('preferences.options.titles.helper-alert')"
        :disabled="!edit"
        oneRow
        noPadding
        :value="preferences.showHelperAlert"
        @change="changeShowHelperAlert"
      />
      <!--
      <CheckBox
        class="mt-1"
        :title="$t('preferences.options.titles.confirmation-popup')"
        :disabled="!edit"
        oneRow
        noPadding
        :value="preferences.showConfirmationPopup"
        @change="changeShowConfirmationPopup"
      />
      -->
    </div>
    <GeneralButton
      variant="danger"
      :disabled="!edit"
      @click="openConfirmationPopup"
      :text="$t('preferences.options.buttons.delete-all')"
      icon="trash-fill"
      :title="$t('preferences.options.titles.delete-all')"
    />
    <ConfirmationPopup
      :id="popupId"
      :title="$t('preferences.options.confirmation-popup.title')"
      :text="$t('preferences.options.confirmation-popup.text')"
      @confirm="deleteAll"
    />
    <div class="row mt-2 pt-4">
      <Title
        class="col-12"
        :text="$t('preferences.options.titles.export-import')"
      />
      <b-link :download="filename" :href="downloadLink" class="ml-3">
        <GeneralButton
          :text="$t('preferences.options.buttons.export')"
          @click="exportJson"
          variant="secondary"
        />
      </b-link>
      <GeneralButton
        v-b-toggle:import
        variant="warning"
        class="ml-2"
        :disabled="!edit"
        :text="$t('preferences.options.buttons.import')"
      />
    </div>
    <div class="row mt-2">
      <b-collapse id="import" class="ml-3">
        <Title :text="$t('preferences.options.titles.import')" italic />
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
import Toast from "@/classes/Toast";
import CheckBox from "@/components/form/CheckBox.vue";

export default {
  name: "OptionsCard",
  components: {
    ConfirmationPopup,
    GeneralButton,
    Title,
    CheckBox,
  },
  data() {
    return {
      edit: false,
      filename: `kanbanity-export_${new Date().toISOString().slice(0, 10)}.json`,
      downloadLink: "",
      importFile: null,
      jsonType: "application/json",
      popupId: "confirmation-popup",
    };
  },
  computed: {
    ...mapGetters({
      exportJsonString: "getStorageToExport",
      preferences: "getPreferences",
    }),
  },
  methods: {
    ...mapActions({
      importStorage: "importStorage",
      changeShowHelperAlert: "changeShowHelperAlert",
      changeShowConfirmationPopup: "changeShowConfirmationPopup",
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
        this.$store.dispatch(
          "errorToaster",
          new Toast(
            "preferences.options.toaster.upload-error.title",
            "preferences.options.toaster.upload-error.message"
          )
        );
      }
    },
    openConfirmationPopup(): void {
      this.$bvModal.show(this.popupId);
    },
  },
};
</script>
