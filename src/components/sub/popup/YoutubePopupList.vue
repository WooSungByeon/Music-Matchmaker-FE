<template>

  <div class="popup">
    <div class="popup-content">
      <span class="close-btn" @click="$emit('close')">&times;</span>
      <h2 class="popup-title">YouTube Videos</h2>
      <ul class="youtube-list">
        <li v-for="youtubeInfo in youtubeList" :key="youtubeInfo.videoLink">
          <img :src="youtubeInfo.thumbnailsLink" :alt="youtubeInfo.title">
          <div class="video-info">
            <a :href="youtubeInfo.videoLink" target='_blank' class="video-title">{{ youtubeInfo.title }}</a>
          </div>
        </li>
      </ul>
    </div>
  </div>

</template>

<script>
import axios from "axios";
import lodash from "lodash";

export default {
  name : 'ListPopup',
  props: {
    parentYoutubeSearchWord: { type: String, required: true }
  },
  setup(props) {
    return {
      searchWord: props.parentYoutubeSearchWord
    };
  },
  data() {
    return {
      youtubeList: []
      , showPopup : false
    };
  },
  mounted() {
    if(this.searchWord !== '') {
      this.youtubeTrackList();
    }
  },
  methods: {
    youtubeTrackList() {
      this.showPopup = true;
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
        this.showPopup = false;
        console.error(error);
     });
    },
  }
};
</script>