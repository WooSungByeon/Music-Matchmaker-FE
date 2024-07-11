<template>
  <div class="content">
    <div style="display: flex">
      <h2 style="flex-basis: 100%">Search History List</h2>
      <button class="trash-button" @click="deleteLocalHistory">
        <font-awesome-icon icon="fa-solid fa-trash" />
      </button>
    </div>
    <div class="albums">
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
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

export default {
  data() {
    return {
      results: [],
    };
  },
  mounted() {
    const searchHistory = localStorage.getItem('searchHistory');
    this.results = searchHistory != null ? JSON.parse(searchHistory) : [];
  },
  methods: {
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