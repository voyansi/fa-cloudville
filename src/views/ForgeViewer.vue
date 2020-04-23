<template>
  <div class="section">
    <div id="forge-viewer"></div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
const base64 = require("base-64");

const ViewerProps = Vue.extend({
  props: {
    urn: String
  }
});

@Component
export default class ForgeViewer extends ViewerProps {
  data() {
    return {
      viewer: null
    };
  }

  async mounted() {
    const token = await this.$store.dispatch("getToken");
    const target =
      "urn:adsk.viewing:fs.file:dXJuOmFkc2sud2lwcHJvZDpmcy5maWxlOnZmLlFmNEFhTXdjUTJxU2lFWVpIU25jUEE_dmVyc2lvbj0y/output/Resource/3D View/3D/3D.svf";

    const options = {
      env: "AutodeskProduction",
      accessToken: token.access_token
    };

    console.log(options)
    const documentId = base64.encode(target)
    Autodesk.Viewing.Initializer(options, () => {
      Autodesk.Viewing.Document.load(
        documentId,
        this.onDocumentLoadSuccess,
        this.onDocumentLoadFailure
      );
    });
  }

  onDocumentLoadSuccess(doc: Autodesk.Viewing.Document) {
    console.log("success");
    console.log(doc);
  }

  onDocumentLoadFailure(error: any) {
    console.log(error);
  }

  async getHubs() {
    await this.$store.dispatch("loadData");
  }
}
</script>

<style scoped>
</style>