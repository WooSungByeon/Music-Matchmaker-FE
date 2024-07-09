<template>
  <div class="container">
    <!-- side container -->
    <div class="sidebar">
      <div class="logo">
        <h1>MusicMatcher</h1>
      </div>
      <ul v-if="showTrackInfo" class="playlist">
        <li>
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
      <div class="header">
          <SearchHeader @trackInfo="changeSelectedTrack" @countryCode="changeSelectedCountry" />
      </div>

      <!-- content result -->
      <div class="content" v-if="showRecommendList">
        <RecommendContent @youtubeSearchWord="openYoutubePopup" :parentCountryCode="this.countryCode" :parentTrackInfo="this.trackInfo" />
      </div>
    </div>

    <!-- popup list -->
    <YoutubePopupList v-if="showPopupYn" :parentYoutubeSearchWord="this.youtubeSearchWord" @close="closeYoutubeListPopup"/>
  </div>

</template>

<script>
import SearchHeader from '../sub/SearchHeader.vue';
import RecommendContent from '../sub/RecommendContent.vue';
import YoutubePopupList from '../sub/popup/YoutubePopupList.vue';

export default {
  name: 'MainContainer',
  components: {
    SearchHeader,
    RecommendContent,
    YoutubePopupList
  },
  data() {
    return {
      trackInfo : ''
      , showRecommendList : false
      , countryCode : 'KR'
      , showTrackInfo : false
      , youtubeSearchWord : ''
      , showPopupYn : false
    };
  },
  methods: {
    changeSelectedTrack(trackInfo) {
      this.showRecommendList = true;
      this.trackInfo = trackInfo;
      this.showTrackInfo = true;
    },
    changeSelectedCountry(countryCode) {
      this.countryCode = countryCode;
    },
    openYoutubePopup(youtubeSearchWord) {
      this.youtubeSearchWord = youtubeSearchWord;
      this.showPopupYn = true;
    },
    closeYoutubeListPopup() {
      this.showPopupYn = false;
    }
  }
}
</script>

<style>
@import "../../assets/css/main.css";
</style>
