<template>
  <div class="u-body u-xl-mode">
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
@import "https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i|Open+Sans:300,300i,400,400i,500,500i,600,600i,700,700i,800,800i";
@import "https://fonts.googleapis.com/css?family=Gloria+Hallelujah:400";
@import "../../assets/css/list.css";
@import "../../assets/css/nicepage.css";

</style>
