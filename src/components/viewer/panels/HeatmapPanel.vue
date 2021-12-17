<template>
  <div>
    <h1>{{ $t('heatmap') }}</h1>
    <table>
      <tr>
        <td>{{ $t('threshold') }}</td>
        <td>
          <cytomine-slider v-model="threshold" :min="0.0" :max="1" :interval="0.01" :integer-only="false"/>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import CytomineSlider from '@/components/form/CytomineSlider';

export default {
  name: 'heatmap-panel',
  components: {CytomineSlider},
  props: {
    index: String
  },
  computed: {
    imageModule() {
      return this.$store.getters['currentProject/imageModule'](this.index);
    },
    viewerWrapper() {
      return this.$store.getters['currentProject/currentViewer'];
    },
    imageWrapper() {
      return this.viewerWrapper.images[this.index];
    },
    threshold: {
      get() {
        return this.imageWrapper.style.threshold;
      },
      set(value) {
        this.$store.commit(this.imageModule + 'setThreshold', Number(value));
      }
    }
  }
};
</script>

<style scoped>
td, tr {
  vertical-align: middle !important;
}

td:first-child {
  font-weight: 600;
  text-align: left;
  padding: 0.35em 0.5em;
}

td:last-child {
  width: 100%;
}

>>> .vue-slider {
  margin-left: 0.75em;
  margin-right: 1em;
}
</style>
