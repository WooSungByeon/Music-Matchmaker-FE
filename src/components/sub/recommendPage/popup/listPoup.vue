<template>
  <div class="popup-overlay" @click.self="$emit('close')">
    <div class="popup-content">
      <div class="top-bar">
        <div class="close-btn" @click="$emit('close')">
          <font-awesome-icon icon="fa-solid fa-xmark" />
        </div>
      </div>
      <div class="list-container">
        <ul>
          <li v-for="item in youtubeList" :key="item.videoLink">
            <img :src="item.thumbnailsLink" :alt="item.title" />
            <a :href="item.videoLink" target='_blank'>{{ item.title }}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import lodash from "lodash";

export default {
  name : 'ListPopup',
  props: {
    searchWord: {
      type: String,
      required: true
    }
  },
  emits: ['close'],
  data() {
    return {
      youtubeList: []
      , youtubeSearchWord: this.searchWord
    };
  },
  watch: {
    searchWord(newVal) {
      this.youtubeSearchWord = newVal;
    }
  },
  mounted() {
    this.youtubeTrackList();
  },
  methods: {
    youtubeTrackList() {
      axios.post(process.env.VUE_APP_MUSIC_API_URL + '/youtube/searchYoutubeList', {
        searchWord: this.searchWord,
        part : 'snippet',
     }).then(response => {
        this.youtubeList  = response.data.map(item => ({
          title: lodash.unescape(item.title),
          videoLink: item.videoLink,
          thumbnailsLink: item.thumbnailsLink
        }));
     }).catch(error => {
        alert("An error has occurred. Please use it again later.")
        this.$emit('close');
        console.error(error);
     });
    },
  }
};
</script>