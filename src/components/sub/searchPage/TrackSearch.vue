<template>

  <div class="col-md-offset-1">
    <!-- Track Search Input -->
    <div class="form-group" @focusout="onBlur" tabindex="0">
      <input type="text" class="form-control search-input" v-model="searchWord" @focus="onInput" @input="handleInput" placeholder="Search for a song">
    </div>

    <!-- Track Item List -->
    <div v-if="showDropdown" class="datalist-results scrollbar_style1">
      <div v-for="(item) in trackList" :key="item.track_id" class="datalist-item" @click="goToSearchResults(item)">
        <img :src="item.track_img" :alt="item.track">
        <div class="item-text">
          {{ item.track }}
          <div class="item-subtext">{{ item.artists }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import debounce from 'lodash/debounce';
import router from "@/router";

export default {
  name: 'TrackSearch',
  props: {
    countryCode: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      searchWord: ''
      , selected: null
      , trackList: []
      , showDropdown: false
      , internalCountryCode: this.countryCode
    };
  },
  watch: {
    countryCode(newVal) {
      this.internalCountryCode = newVal;
    }
  },
  methods: {
    handleInput(event) {
      this.searchWord = event.target.value;
      this.trackOptions();
      this.showDropdown = this.searchWord.length > 0;
    },
    trackOptions: debounce(function() {
      if(this.internalCountryCode === '') { this.internalCountryCode = "KR"; }
      if(this.searchWord.trim() !== '') {
        axios.post(process.env.VUE_APP_MUSIC_API_URL + '/spotify/searchTrackList', {
          searchWord: this.searchWord,
          type: 'track',
          market: this.internalCountryCode,
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
    onBlur() {
      setTimeout(() => {
        this.showDropdown = false;
      }, 100);
    },
    onInput() {
      this.showDropdown = this.searchWord.length > 0;
    },
    goToSearchResults(trackInfo) {
      router.push({ path: '/music-match/result', state : { trackInfo : JSON.stringify(trackInfo), internalCountryCode : this.internalCountryCode } });
    }
  },
}
</script>
