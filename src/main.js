import { createApp } from 'vue';
import App from './App.vue';
import apiUtility from './SketchfabAPIUtility.js';
// 'https://rawgit.com/shaderbytes/Sketchfab-Viewer-API-Utility/master/SketchfabAPIUtility.js';


createApp(App).mount('#app');

let sketchfab;

const app = new window.Vue({
  el: '#main',
  data() {
    return {
      sketchfab: null,
      modelId: 'e6dbb7fbd93e476eab81bdd21e482dc1',
    };
  },
  methods: {
    viewerLoaded() {
      console.log('Loaded'); // never called
    },
  },
  mounted() {
    const iframe = this.$refs.viewer;

    const clientInitObject = {
      autostart: 1,
    };

    sketchfab = new apiUtility.SketchfabAPIUtility(
      this.modelId,
      iframe,
      clientInitObject,
    );

    //   this.sketchfab = new SketchfabAPIUtility(
    //       this.modelId,
    //       iframe,
    //       clientInitObject
    //   );
    //   this.sketchfab.addEventListener(
    //       this.sketchfab.EVENT_INITIALIZED,
    //       // this.viewerLoaded
    //       app.viewerLoaded
    //   );
    //   this.sketchfab.create();

    sketchfab.addEventListener(
      sketchfab.EVENT_INITIALIZED,
      app.viewerLoaded,
    );
    sketchfab.create();
  },
});
