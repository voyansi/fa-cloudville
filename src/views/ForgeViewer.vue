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
      "urn:dXJuOmFkc2sud2lwcHJvZDpmcy5maWxlOnZmLkZmWGFrc2ZXUlVhMERPRGR2SkN6cWc_dmVyc2lvbj0y";

    const options = {
      env: "AutodeskProduction",
      accessToken: token.access_token
    };

    const documentId = base64.encode(target);

    Autodesk.Viewing.Initializer(options, () => {
      //@ts-ignore
      this.viewer = new Autodesk.Viewing.GuiViewer3D(
        document.getElementById("forge-viewer"),
        { extensions: ["Autodesk.DocumentBrowser"] }
      );
      //@ts-ignore
      this.viewer.start();
      var documentId = target;
      Autodesk.Viewing.Document.load(
        documentId,
        this.onDocumentLoadSuccess,
        this.onDocumentLoadFailure
      );
    });
  }

  onDocumentLoadSuccess(doc: Autodesk.Viewing.Document) {
    // console.log("success");
    // console.log(doc);
    var viewables = doc.getRoot().getDefaultGeometry();
    //@ts-ignore
    this.viewer.loadDocumentNode(doc, viewables).then(i => {
      // documented loaded, any action?
    });
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