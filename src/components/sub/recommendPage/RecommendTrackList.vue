<template>
  <section class="u-clearfix u-section-1">
    <div class="u-clearfix u-sheet u-sheet-1">
      <h1 class="u-align-center u-custom-font u-text u-text-default u-text-1">search result</h1>
    </div>
  </section>
  <section class="u-clearfix u-grey-10 u-section-2" >
    <div class="u-clearfix u-sheet u-valign-middle u-sheet-1">
      <div class="u-expanded-width u-list u-list-1">
        <div class="u-repeater u-repeater-1">
          <div class="u-container-style u-list-item u-repeater-item u-video-cover u-white" v-for="(result, index) in results" :key="index">
            <div class="u-container-layout u-similar-container u-container-layout-1">
              <h3 class="u-text u-text-default u-text-1">{{ result.track }}</h3>
              <div class="u-border-4 u-border-palette-3-base u-expanded-width u-line u-line-horizontal u-line-1"></div>
              <img class="u-expanded-width u-image u-image-default u-image-1"
                   data-image-width="2000" data-image-height="1333" :src="result.track_img" alt="album cover">
              <p class="u-text u-text-default u-text-2">{{ result.artists }}</p>
              <a :href="result.track_url" target="_blank" class="u-btn u-button-style u-custom-color-1 u-btn-1">
                <font-awesome-icon icon="fa-brands fa-spotify" /> Spotify
              </a>
              <a @click="openYouTube(result.track, result.artists)" class="u-border-none u-btn u-button-style u-palette-2-base u-btn-2">
                <font-awesome-icon icon="fa-brands fa-youtube" /> Youtube
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

</template>

<script>
import axios from "axios";
import router from "@/router";

export default {
  data() {
    return {
      results: [],
      trackInfo: JSON.parse(history.state.trackInfo),
      internalCountryCode: history.state.internalCountryCode,
    };
  },
  mounted() {
    this.recommendTrackSearchResults();
  },
  methods: {
    recommendTrackSearchResults() {
      axios.post(process.env.VUE_APP_MUSIC_API_URL + '/spotify/recommendTrackList', {
        artistsId: this.trackInfo.artists_id,
        trackId: this.trackInfo.track_id,
        artistsName: this.trackInfo.artists,
        trackTitle: this.trackInfo.track,
        market: this.internalCountryCode,
        limit: 8
     }).then(response => {
        this.results = response.data;
     }).catch(error => {
        alert("An error has occurred. Please use it again later.")
        console.error(error);
     });
    },
    openYouTube(track, artists) {
      const searchWord = track + " " + artists;
      this.$emit('open-youtube', searchWord);
    },
    goSearchPage() {
      router.push({ path: '/'})
    }
  }
};
</script>