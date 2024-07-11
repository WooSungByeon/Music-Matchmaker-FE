<template>
  <div class="header">
    <!-- Search Input -->
    <input type="text" placeholder="Search" v-model="searchWord" @focus="showSearchResult" @input="handleInput">

    <!-- div for changing order-->
    <div class="warp-div"></div>

    <!-- Search results will be displayed here -->
    <div class="search-results">
      <ul v-if="showDropdown">
        <li v-for="trackInfo in trackList" :key="trackInfo.track_id" class="datalist-item" @click="goToSearchResults(trackInfo)">
          <img :src="trackInfo.track_img" :alt="trackInfo.track">
          <div class="song-info">
            <p class="song-title">{{ trackInfo.track }}</p>
            <p class="artist">{{ trackInfo.artist }}</p>
          </div>
        </li>
      </ul>
    </div>

    <select v-model="selectedCountry" class="country-select" @change="selectCountry">
        <option v-for="country in countries" :key="country.code" :value="country.code">{{country.name}}</option>
    </select>

    <button class="refresh-button" @click="refreshList" @mouseover="isHover = true"  @mouseleave="isHover = false" >
      <font-awesome-icon icon="fa-solid fa-rotate-right" :class="{ 'fa-spin': isHover }" />
    </button>
  </div>
</template>

<script>
import axios from 'axios';
import debounce from 'lodash/debounce';

export default {
  name: 'SearchHeader',
  data() {
    return {
      searchWord: ''
      , isHover : false
      , selected: null
      , trackList: []
      , showDropdown: false
      , selectedCountry: 'KR'
      , countries: [
        { "code": "KR",  "name": "South Korea",  "flag": "https://upload.wikimedia.org/wikipedia/commons/0/09/Flag_of_South_Korea.svg" },
        { "code": "JP",  "name": "Japan",  "flag": "https://upload.wikimedia.org/wikipedia/en/9/9e/Flag_of_Japan.svg" },
        { "code": "US", "name": "United States", "flag": "https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg" },
        { "code": "GB",  "name": "United Kingdom", "flag": "https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg" }
      ]
    };
  },
  methods: {
    handleInput(event) {
      this.searchWord = event.target.value;
      this.trackOptions();
      this.showDropdown = this.searchWord.length > 0;
    },
    trackOptions: debounce(function() {
      if(this.searchWord.trim() !== '') {
        axios.post(process.env.VUE_APP_MUSIC_API_URL + '/spotify/searchTrackList', {
          searchWord: this.searchWord,
          type: 'track',
          market: this.selectedCountry,
          limit: 10,
          offset: 0
       }).then(response => {
          this.trackList = response.data;
       }).catch(error => {
         alert("An error has occurred. Please use it again later.")
          console.error(error);
       });
      }
    }, 200),
    showSearchResult() {
      this.showDropdown = this.searchWord.length > 0;
    },
    goToSearchResults(trackInfo) {
      this.showDropdown = false;
      this.$emit('trackInfo', trackInfo);
    },
    selectCountry() {
      this.$emit('countryCode', this.selectedCountry);
    },
    refreshList() {
      this.$emit('refresh');
    }
  },
}
</script>