<template>
  <div class="content">
    <div style="display: flex">
      <h2 style="flex-basis: 100%">Search History List</h2>
      <button class="trash-button" @click="deleteLocalHistory">
        <font-awesome-icon icon="fa-solid fa-trash" />
      </button>
    </div>
    <div class="albums">
      <div v-if="results.length < 1" class="no-items">
          <p>No search history</p>
      </div>
      <div class="album" v-for="(trackInfo, index) in results" :key="index">
          <img :src="trackInfo.track_img" alt="../../assets/image/no_image.png">
          <div class="song-info">
              <p class="song-title">{{ trackInfo.track }}</p>
              <p class="artist">{{ trackInfo.artist }}</p>
          </div>
      </div>
    </div>
  </div>
  <div class="pagination">
    <v-pagination v-model="pageNumber" active-color="#DCEDFF"  :pages="totalPage" :range-size="1" @update:model-value="movePage" />
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";

export default {
  components: {
    VPagination
  },
  data() {
    return {
      tempResult: [],
      results: [],
      pageNumber: 1,
      pageSize: 10,
      totalPage : 1
    };
  },
  mounted() {
    const searchHistory = localStorage.getItem('searchHistory');
    this.tempResult = searchHistory != null ? JSON.parse(searchHistory) : [];
    this.results = this.tempResult.slice(0, this.pageSize);

    this.totalPage = Math.ceil((this.tempResult.length / this.pageSize));
  },
  methods: {
    movePage() {
      const startIndex = (this.pageNumber - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      this.results = this.tempResult;
      this.results = this.results.slice(startIndex, endIndex)
    },
    deleteLocalHistory() {
      Swal.fire({
        title: 'Do you want to delete your search history?',
        text: "This action cannot be undone!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Search history has been deleted.',
            '',
            'success'
          )
          localStorage.removeItem('searchHistory');
          this.results = [];
        }
      })

    }
  }
};
</script>