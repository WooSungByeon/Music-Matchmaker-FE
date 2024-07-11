<template>
  <button  v-if="previewUrl !== 'null'" class="preview-btn" @click="openPreview">
    <font-awesome-icon v-if="!isPlaying" icon="fa-solid fa-play" />
    <font-awesome-icon v-if="isPlaying" icon="fa-solid fa-stop" />
    Preview
  </button>
  <button  v-if="previewUrl === 'null'" class="preview-btn" disabled >
    Not supported
  </button>
</template>

<script>
export default {
  props: {
    previewUrl: { type: String, required: true },
  },
  data() {
    return {
      audio: null,
      isPlaying: false
    };
  },
  mounted() {
    if(this.previewUrl !== 'null') {
      this.audio = new Audio(this.previewUrl);
      this.audio.addEventListener('ended', this.endPreview);
    }
  },
  beforeUnmount() {
    if(this.audio != null) {
      this.audio.pause();
    }
  },
  methods: {
    openPreview() {
      if (this.isPlaying) {
        this.audio.pause();
      } else {
        this.audio.play();
      }
      this.isPlaying = !this.isPlaying;
    },
    endPreview() {
      this.isPlaying=false;
    }
  }
};
</script>