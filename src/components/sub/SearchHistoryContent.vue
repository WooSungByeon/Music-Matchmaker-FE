<template>
  <div class="content">
    <h2>Search History List</h2>
    <div class="albums">
      <!-- loading -->
      <div class="loading-spinner" v-if="isLoading"></div>

      <div class="album" v-for="(result, index) in results" :key="index">
          <img :src="result.track_img" alt="../../assets/image/no_image.png">
          <div class="song-info">
              <p class="song-title">{{ result.track }}</p>
              <p class="artist">{{ result.artist }}</p>
          </div>
      </div>
    </div>
  </div>

</template>

<script>

export default {
  data() {
    return {
      results: [],
      isLoading : false
    };
  },
  mounted() {
    this.isLoading = true;
    const searchHistory = localStorage.getItem('searchHistory');
    this.results = searchHistory != null ? JSON.parse(searchHistory) : [];
    this.isLoading = false;
  },
  methods: {
  }
};
</script>