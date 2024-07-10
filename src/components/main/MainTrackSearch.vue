<template>
  <div class="container">
    <!-- side container -->
    <div class="sidebar">
      <div class="logo">
        <h1>MusicMatcher</h1>
      </div>
      <ul class="nav">
          <li :class="{ 'selected': menuType === 'main' }" @click="moveMenu('main')">Home</li>
          <li :class="{ 'selected': menuType === 'history' }" @click="moveMenu('history')">Search History</li>
      </ul>
      <ul class="playlist">
        <li v-if="showTrackInfo">
            <img :src="trackInfo.track_img" alt="../../assets/image/no_image.png">
            <div class="song-info">
                <p class="song-title">{{ trackInfo.track }}</p>
                <p class="artist">{{ trackInfo.artist }}</p>
            </div>
        </li>
      </ul>
    </div>

    <!-- main container -->
    <div class="main-view">
      <!-- header -->
      <SearchHeader @trackInfo="changeSelectedTrack" @countryCode="changeSelectedCountry" @refresh="refreshRecommendContent" />

      <!-- content result -->
      <RecommendContent v-if="showRecommendList && menuType === 'main'" @youtubeSearchWord="openYoutubePopup" :parentCountryCode="this.countryCode" :parentTrackInfo="this.trackInfo" />

      <!-- search History -->
      <SearchHistoryContent v-if="menuType === 'history'" />
    </div>

    <!-- popup list -->
    <YoutubePopupList v-if="showPopupYn" :parentYoutubeSearchWord="this.youtubeSearchWord" @close="closeYoutubeListPopup"/>
  </div>

</template>

<script>
import SearchHeader from '../sub/SearchHeader.vue';
import RecommendContent from '../sub/RecommendContent.vue';
import SearchHistoryContent from '../sub/SearchHistoryContent.vue';
import YoutubePopupList from '../sub/popup/YoutubePopupList.vue';

export default {
  name: 'MainContainer',
  components: {
    SearchHeader,
    RecommendContent,
    SearchHistoryContent,
    YoutubePopupList
  },
  data() {
    return {
      trackInfo : null
      , showRecommendList : false
      , countryCode : 'KR'
      , showTrackInfo : false
      , youtubeSearchWord : ''
      , showPopupYn : false
      , menuType : 'main'
    };
  },
  methods: {
    refreshRecommendContent() {
      if(this.trackInfo != null) {
        this.menuType = "main";
        this.showRecommendList = false;
        setTimeout(() => {
          this.showRecommendList = true;
        }, 0);
      }
    },
    changeSelectedTrack(trackInfo) {
      this.trackInfo = trackInfo;
      this.refreshRecommendContent();
      this.showTrackInfo = true;
    },
    changeSelectedCountry(countryCode) {
      this.countryCode = countryCode;
      this.refreshRecommendContent();
    },
    openYoutubePopup(youtubeSearchWord) {
      this.youtubeSearchWord = youtubeSearchWord;
      this.showPopupYn = true;
    },
    closeYoutubeListPopup() {
      this.showPopupYn = false;
    },
    moveMenu(menuId) {
      this.menuType = menuId;
    },
  }
}
</script>

<style>
@import "../../assets/css/main.css";
</style>
