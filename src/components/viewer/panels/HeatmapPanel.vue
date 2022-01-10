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

    <button class="is-fullwidth button is-small" @click="createAnnotations()">{{ $t('create-annotations') }}</button>
  </div>
</template>

<script>
import {get} from '@/utils/store-helpers';

import {Job, JobParameter} from 'cytomine-client';
import CytomineSlider from '@/components/form/CytomineSlider';

import constants from '@/utils/constants.js';

export default {
  name: 'heatmap-panel',
  components: {CytomineSlider},
  props: {
    index: String
  },
  computed: {
    project: get('currentProject/project'),
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
  },
  methods: {
    async createAnnotations() {
      try {
        let parameters = [
          new JobParameter({softwareParameter: 10328, value: '2688'}),
          new JobParameter({softwareParameter: 10334, value: constants.IMAGE_DEMO_ID}),
          new JobParameter({softwareParameter: 10340, value: constants.HEATMAP_ID}),
          new JobParameter({softwareParameter: 10346, value: this.threshold}),
          new JobParameter({softwareParameter: 10352, value: '1000'}),
        ];
        let job = new Job({
          software: constants.SOFTWARE_ANNOT_CREATION_ID,
          project: this.project.id,
          jobParameters: parameters
        });
        await job.save();
        this.$emit('add', job);
        await job.execute();
        this.$notify({type: 'success', text: this.$t('notif-success-analysis-launch')});
      }
      catch (error) {
        console.log(error);
        this.$notify({type: 'error', text: this.$t('notif-error-analysis-launch')});
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
