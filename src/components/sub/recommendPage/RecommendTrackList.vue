<template>
  <div class="search-results">
    <h1>검색 결과</h1>
    <ul>
      <li v-for="(result, index) in results" :key="index" class="track-item">
        <img :src="result.track_img" alt="앨범 커버" class="track-img" />
        <div class="track-info">
          <h2>{{ result.track }}</h2>
          <p>{{ result.artists }}</p>
          <div class="track-buttons">
              <a :href="result.track_url" target="_blank">
                <button class="spotify-button">
                  <font-awesome-icon icon="fa-brands fa-spotify" />
                  Spotify
                </button>
              </a>
              <button class="youtube-button" @click="openYouTube(result.track, result.artists)">
                <font-awesome-icon icon="fa-brands fa-youtube" />
                YouTube
              </button>
            </div>
          </div>
      </li>
    </ul>
    <div>
      <button class="back-button" @click="goSearchPage">돌아가기</button>
    </div>
  </div>
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
        market: this.internalCountryCode,
        limit: 10
     }).then(response => {
        this.results = response.data;
     }).catch(error => {
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

<style>

.back-button {
    padding: 15px 30px;
    font-size: 16px;
    color: white;
    background: linear-gradient(135deg, #6b8ce3, #1e3c72);
    border: none;
    border-radius: 50px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: all 0.3s ease;
}

.back-button:hover {
    background: linear-gradient(135deg, #1e3c72, #6b8ce3);
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
}

.back-button:active {
    transform: translateY(0);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

</style>