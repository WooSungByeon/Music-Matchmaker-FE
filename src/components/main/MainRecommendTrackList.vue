<template>
  <div class="main-container">
    <RecommendTrackList @open-youtube="openYoutubeListPopup"/>
    <ListPoup v-if="showPopupYn" :searchWord="searchWord" @close="closeYoutubeListPopup"/>
  </div>
</template>

<script>
import RecommendTrackList from '../sub/recommendPage/RecommendTrackList.vue'
import ListPoup from '@/components/sub/recommendPage/popup/listPoup.vue'

export default {
  name: 'MainContainer',
  components: {
    RecommendTrackList
    , ListPoup
  },
  data() {
    return {
      showPopupYn: false,
      searchWord: '',
       youtubeList : [
       ]
    };
  },
  methods: {
    openYoutubeListPopup(searchWord) {
      this.searchWord = searchWord;
      this.showPopupYn = true;
    },
    closeYoutubeListPopup() {
      this.showPopupYn = false;
    }
  }
}
</script>

<style>
@import "../../../src/assets/css/main_v1.css";

</style>
