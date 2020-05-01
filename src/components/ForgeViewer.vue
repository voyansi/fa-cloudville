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

  get elements() {
    //@ts-ignore
    return this.$store.getters.selectedIds;
  }

  get unselected() {
    //@ts-ignore
    return this.$store.getters.unselectedIds;
  }

  highlightElements(elements: number[]) {
    //@ts-ignore
    this.viewer.select(elements, Autodesk.Viewing.SelectionMode.REGULAR);
    //@ts-ignore
    this.viewer.select([]);
    this.isolate(elements);
    //@ts-ignore
    this.viewer.fitToView(elements);
  }


  @Watch("elements")
  selectElements() {
    this.highlightElements(this.elements);
  }

  isolate(elements: number[]) {
    //@ts-ignore
    const model = this.viewer.getVisibleModels()[0];
    //@ts-ignore
    this.viewer.impl.visibilityManager.isolate(elements, model);
    //@ts-ignore
    const DBids = this.viewer.impl.selector.getAggregateSelection();
  }

  async mounted() {
    const token = await this.$store.dispatch("getToken");
    const target =
      "urn:dXJuOmFkc2sud2lwcHJvZDpmcy5maWxlOnZmLkZmWGFrc2ZXUlVhMERPRGR2SkN6cWc_dmVyc2lvbj0y";

    const options = {
      env: "AutodeskProduction",
      accessToken: token.access_token
    };

    console.log(options)

    const documentId = base64.encode(target);

    Autodesk.Viewing.Initializer(options, () => {
      //@ts-ignore
      this.viewer = new Autodesk.Viewing.GuiViewer3D(
        //@ts-ignore
        document.getElementById("forge-viewer"),
        { extensions: ["Autodesk.DocumentBrowser"] }
      );
      //@ts-ignore
      this.viewer.start();
      var documentId = target;
      // "urn:" +
      // base64.encode(
      //   "urn:adsk.wipprod:fs.file:vf.Qf4AaMwcQ2qSiEYZHSncPA?version=2"
      // );

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
    this.viewer.loadDocumentNode(doc, viewables).then(async i => {
      // load data?
      //@ts-ignore
      const property = await this.viewer.model
        .getPropertyDb()
        //@ts-ignore
        .executeUserFunction(userFunction);

      //settings

      this.$store.dispatch("loadModelElements", property);
    });
  }

  onDocumentLoadFailure(error: any) {
    console.log(error);
  }

}

//TODO: move into wrapper
// https://forge.autodesk.com/en/docs/viewer/v7/developers_guide/advanced_options/propdb-queries/
// FUNCTION HAS TO BE NAMED USERFUNCTION
// function userFunction(pdb: any) {
//   const attributes: any = [];
//   pdb.enumAttributes((index: number, attrDef: any, attrRaw: any) => {
//     attributes.push({
//       index,
//       attrDef,
//       attrRaw
//     });
//   });

//   const elements: any[] = [];
//   //enumerate through all the objects
//   pdb.enumObjects((dbId: number) => {
//     // create a blank element
//     const element: any = {};
//     //enumerate through the map of the object properties
//     pdb.enumObjectProperties(dbId, (attrId: any, valId: any) => {
//       //TODO: types
//       // find the attribute who's index matches the attrId of the object property
//       const attributeName = attributes.find((e: any) => e.index === attrId) //then retrive the name from the attribute definition
//         .attrDef["name"];
//       //then find the value through pdb query
//       const attributeValue = pdb.getAttrValue(attrId, valId);
//       //assign value to the key in the element
//       element[attributeName] = attributeValue;
//     });
//     element["Id"] = dbId;
//     // add element to the array
//     elements.push(element);
//   });

//   return elements;
// }
</script>

<style>
#forge-viewer {
  position: absolute;
  width: 100%;
  height: 300px;
}
#guiviewer3d-toolbar {
  visibility: hidden;
}

#forge-viewer-container {
  height: 300px;
}
.viewcubeWrapper {
  visibility: hidden;
}
</style>