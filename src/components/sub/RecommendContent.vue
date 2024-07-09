<template>

  <h2>Recommend List</h2>
  <div class="albums">
    <!-- loading -->
    <div class="loading-spinner" v-if="isLoading"></div>

    <div class="album" v-for="(result, index) in results" :key="index">
        <img :src="result.track_img" alt="../../assets/image/no_image.png">
        <div class="song-info">
            <p class="song-title">{{ result.track }}</p>
            <p class="artist">{{ result.artist }}</p>
        </div>
        <div class="buttons">
          <button class="spotify-btn" @click="openSpotify(result.track_url)">
            <font-awesome-icon icon="fa-brands fa-spotify" /> Spotify
          </button>
          <button class="youtube-btn" @click="openYouTube(result.track, result.artist)">
              <font-awesome-icon icon="fa-brands fa-youtube" /> Youtube
            </button>
        </div>
    </div>
  </div>

</template>

<script>
import axios from "axios";

export default {
  props: {
    parentCountryCode: { type: String,  required: true },
    parentTrackInfo: { type: Object, required: true },
  },
  setup(props) {
    return {
      countryCode: props.parentCountryCode
      , trackInfo : props.parentTrackInfo
    };
  },
  data() {
    return {
      results: [],
      isLoading : false
    };
  },
  mounted() {
    this.recommendTrackSearchResults();
  },
  methods: {
    recommendTrackSearchResults() {
      this.results = [];
      this.isLoading = true;
      axios.post(process.env.VUE_APP_MUSIC_API_URL + '/spotify/recommendTrackList', {
        artistsId: this.trackInfo.artist_id,
        trackId: this.trackInfo.track_id,
        artistsName: this.trackInfo.artist,
        trackTitle: this.trackInfo.track,
        market: this.countryCode,
        limit: 10
     }).then(response => {
        this.isLoading = false;
        this.results = response.data;
     }).catch(error => {
        alert("An error has occurred. Please use it again later.")
        console.error(error);
     });
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