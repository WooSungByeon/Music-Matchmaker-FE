<template>
  <div class="page">
    <div class="fh5co-cover">
      <div class="overlay"></div>
      <div class="container">
        <div class="col-md-8 col-md-offset-2 text-center">
          <div class="display-t">
            <div class="display-tc" >
              <h1>Enter your favorite song</h1>
              <div class="container-box form-inline fh5co-header-subscribe" >
                <CountrySelect @country-selected="handleCountrySelected" />
                <TrackSearch ref="trackSearch" :countryCode="selectedCountryCode" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CountrySelect from '../sub/searchPage/CountrySelect.vue'
import TrackSearch from '../sub/searchPage/TrackSearch.vue'

export default {
  name: 'MainContainer',
  components: {
    CountrySelect
    , TrackSearch
  },
  data() {
    return {
      selectedCountryCode: ''
    };
  },
  mounted() {
    document.body.style.backgroundColor = '#f5f5f5';
  },
  methods: {
    handleCountrySelected(countryCode) {
      this.selectedCountryCode = countryCode;
      this.$refs.trackSearch.trackOptions();
    }
  }
}
</script>

<style>
@import "../../assets/css/search.css";
@import "../../../src/assets/css/animate.css";
@import "../../../src/assets/css/icomoon.css";
@import "../../../src/assets/css/bootstrap.css";
@import "../../../src/assets/css/style.css";
</style>
