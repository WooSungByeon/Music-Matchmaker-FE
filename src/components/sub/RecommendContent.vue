<template>
  <div class="content">
    <h2>Recommend List</h2>
    <div class="albums">
      <!-- loading -->
      <div class="loading-spinner" v-if="isLoading"></div>
      <!-- list -->
      <div class="album" v-for="trackInfo in results" :key="trackInfo.track">
          <img :src="trackInfo.track_img" alt="../../assets/image/no_image.png">
          <div class="song-info">
              <p class="song-title">{{ trackInfo.track }}</p>
              <p class="artist">{{ trackInfo.artist }}</p>
          </div>
          <div class="buttons">
            <PreviewButton :preview-url="trackInfo.preview_url"/>
            <button class="spotify-btn" @click="openSpotify(trackInfo.track_url)">
              <font-awesome-icon icon="fa-brands fa-spotify" /> Spotify
            </button>
            <button class="youtube-btn" @click="openYouTube(trackInfo.track, trackInfo.artist)">
                <font-awesome-icon icon="fa-brands fa-youtube" /> Youtube
              </button>
          </div>
      </div>
    </div>
  </div>

</template>

<script>
import axios from "axios";
import PreviewButton from './PreviewButton.vue';

export default {
  components: {
    PreviewButton
  },
  data() {
    return {
      results: [],
      isLoading : false
    };
  },
  methods: {
    recommendTrackSearchResults(trackInfo, countryCode) {
      if(trackInfo != null) {
        this.isLoading = true;
        axios.post(process.env.VUE_APP_MUSIC_API_URL + '/spotify/recommendTrackList', {
          artistsId: trackInfo.artist_id,
          trackId: trackInfo.track_id,
          artistsName: trackInfo.artist,
          trackTitle: trackInfo.track,
          market: countryCode,
          limit: 10
       }).then(response => {
          this.isLoading = false;
          this.results = response.data;
        }).catch(error => {
          alert("An error has occurred. Please use it again later.")
          console.error(error);
        });
      }
    },
    openSpotify(url) {
      window.open(url, "_blank");
    },
    openYouTube(track, artists) {
      const searchWord = track + " " + artists;
      this.$emit('youtubeSearchWord', searchWord);
    }
  }
};
</script>