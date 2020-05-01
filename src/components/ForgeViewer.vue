<template>
  <div id="forge-viewer-container">
    <div id="forge-viewer"></div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";
const R = require("ramda");
const base64 = require("base-64");

@Component
export default class ForgeViewer extends Vue {
  data() {
    return {
      viewer: null
    };
  }

  /**
   * LOADING THE MODEL
   */
  async mounted() {
    const token = await this.$store.dispatch("getToken");

    // predefined model target. This can be found through the Forge
    // model derivatives API. The viewer uses the 'svf' derivative
    const documentId =
      "urn:dXJuOmFkc2sud2lwcHJvZDpmcy5maWxlOnZmLkZmWGFrc2ZXUlVhMERPRGR2SkN6cWc_dmVyc2lvbj0y";

    const options = {
      env: "AutodeskProduction",
      accessToken: token.access_token
    };

    // initialize the viewer
    await Autodesk.Viewing.Initializer(options, () => {
      //@ts-ignore
      this.viewer = new Autodesk.Viewing.GuiViewer3D(
        //@ts-ignore
        //mount the viewer
        document.getElementById("forge-viewer"),
        { extensions: ["Autodesk.DocumentBrowser"] }
      );

      //@ts-ignore
      this.viewer.start();
    });

    // load the model derivative
    Autodesk.Viewing.Document.load(
      documentId,
      this.onDocumentLoadSuccess,
      this.onDocumentLoadFailure
    );
  }

  onDocumentLoadSuccess(doc: Autodesk.Viewing.Document) {
    var viewables = doc.getRoot().getDefaultGeometry();
    // @ts-ignore
    this.viewer.loadDocumentNode(doc, viewables).then(async i => {
      // @ts-ignore
      const modelElements = await this.viewer.model
        .getPropertyDb()
        // userFunction is loaded into global
        // see dbQuery in public/db/dbQuery.js
        // the function must be named 'userFunction'
        // according to the Forge API docs
        // @ts-ignore
        .executeUserFunction(userFunction);

      // load the elements into Vuex store
      this.$store.dispatch("loadModelElements", modelElements);
    });
  }

  onDocumentLoadFailure(error: any) {
    console.log(error);
  }

  /**
   * INTERACTING WITH THE MODEL
   *
   */
  get selectedElements() {
    return this.$store.getters.selectedIds;
  }

  /**
   * triggered on any change to element selection
   */
  @Watch("selectedElements")
  selectElements() {
    this.highlightElements(this.selectedElements);
  }

  /**
   * Highlights (through isolate) and fits the viewer camera to isolated elements
   */
  highlightElements(elements: number[]) {
    //@ts-ignore
    this.viewer.select(elements, Autodesk.Viewing.SelectionMode.REGULAR);
    //@ts-ignore
    this.viewer.select([]);
    this.isolate(elements);
    //@ts-ignore
    this.viewer.fitToView(elements);
  }

  /**
   * uses the isolate function as a way to "highlight"
   * the selected model portion
   */
  isolate(elements: number[]) {
    //@ts-ignore
    const model = this.viewer.getVisibleModels()[0];
    //@ts-ignore
    this.viewer.impl.visibilityManager.isolate(elements, model);
    //@ts-ignore
    const DBids = this.viewer.impl.selector.getAggregateSelection();
  }
}
</script>

<style>
#forge-viewer {
  position: absolute;
  width: 100%;
  height: 500px;
}
#guiviewer3d-toolbar {
  visibility: hidden;
}

#forge-viewer-container {
  height: 500px;
}
.viewcubeWrapper {
  visibility: hidden;
}
</style>