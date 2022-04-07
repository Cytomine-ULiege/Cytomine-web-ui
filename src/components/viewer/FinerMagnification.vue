<!-- Copyright (c) 2009-2022. Authors: see NOTICE file.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.-->

<template>
  <div class="finer-magnification-wrapper" :class="{expanded}">
    <div class="ol-rotate ol-unselectable ol-control custom">
      <button type="button" @click="expanded = true">
        <i class="fas fa-magnifying-glass"></i>
      </button>
    </div>
    <div v-show="expanded">
      <div class="top">
        <div class="magnification-controls">
          Finer Magnification
        </div>
        <button class="delete is-small" @click="expanded=false"></button>
      </div>
      <cytomine-slider :max="100" :integerOnly="false"/>
    </div>
  </div>
</template>

<script>
import CytomineSlider from '@/components/form/CytomineSlider';

export default {
  name: 'finer-magnification',
  components: {CytomineSlider},
  props: {
    index: String
  },
  data() {
    return {
      expanded: false
    };
  },
};
</script>

<style scoped>
.finer-magnification-wrapper {
  border-radius: 2px;
  box-shadow: 0 0 1px #777;
  background: white;
  margin-left: 2px;
}

.finer-magnification-wrapper.expanded {
  min-width: 16.5em;
  padding-top: 0.4em;
  min-height: 5em;
}

.finer-magnification-wrapper.expanded .ol-control button {
  cursor: initial;
}

.finer-magnification-wrapper .ol-control {
  padding: 0;
}

.finer-magnification-wrapper.expanded .ol-control button {
  box-shadow: none;
}

.finer-magnification-wrapper .vue-slider {
  margin-left: 1em;
  margin-right: 1em;
}

.ol-rotate.ol-control {
  left: 0 !important;
  top: 0 !important;
}

.top {
  margin: 0em 0.4em 0.75em 1.8em;
  display: flex;
}

.top .magnification-controls {
  flex: 1;
  display: flex;
  justify-content: center;
  margin-left: 1em;
  margin-right: 1em;
  margin-top: 0.5em;
}

.top .delete {
  z-index: 30 !important;
}
</style>
