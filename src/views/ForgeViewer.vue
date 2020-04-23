<template>
  <div class="">
    <div>
      <a @click="selectElements"  class="button">select elements</a>
    </div>
    <div id="forge-viewer"></div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Watch } from 'vue-property-decorator';
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

  get elements(){
    //@ts-ignore
    return this.$store.getters.selectedIds
  }

  get unselected(){
    //@ts-ignore
    return this.$store.getters.unSelectedIds
  }
  
  selectElements(){
    console.log('call')
    //@ts-ignore
    this.viewer.select(this.elements, Autodesk.Viewing.SelectionMode.REGULAR)

    //@ts-ignore
    this.viewer.fitToView(this.elements)

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
        //@ts-ignore
        document.getElementById("forge-viewer"),
        { extensions: ["Autodesk.DocumentBrowser"] }
      );
      //@ts-ignore
      this.viewer.start();
      var documentId = target
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
        .executeUserFunction(userFunction);

      this.$store.dispatch('loadModelElements', property)
    });
  }

  onDocumentLoadFailure(error: any) {
    console.log(error);
  }

  // @Watch(path: )
}

//TODO: move into wrapper
// https://forge.autodesk.com/en/docs/viewer/v7/developers_guide/advanced_options/propdb-queries/
// FUNCTION HAS TO BE NAMED USERFUNCTION
function userFunction(pdb: any) {
  
  const attributes: any = [];
  pdb.enumAttributes((index: number, attrDef: any, attrRaw: any) => {
    attributes.push({
      index,
      attrDef,
      attrRaw
    });
  });

  const elements: any[] = [];
  //enumerate through all the objects
  pdb.enumObjects((dbId: number) => {
    // create a blank element
    const element: any = {};
    //enumerate through the map of the object properties
    pdb.enumObjectProperties(dbId, (attrId: any, valId: any) => {
      //TODO: types
      // find the attribute who's index matches the attrId of the object property
      const attributeName = //then retrive the name from the attribute definition
      attributes.find((e: any) => e.index === attrId).attrDef["name"];
      //then find the value through pdb query
      const attributeValue = pdb.getAttrValue(attrId, valId);
      //assign value to the key in the element
      element[attributeName] = attributeValue;
    });
    element['Id'] = dbId;
    // add element to the array
    elements.push(element);
  });

  return elements;
}
</script>

<style scoped>
#forge-viewer {
  position: absolute;
  width: 500px;
  height: 500px;
}
</style>