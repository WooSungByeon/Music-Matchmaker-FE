<template>
  <div class="main-container">
    <CountrySelect @country-selected="handleCountrySelected" />
    <TrackSearch ref="trackSearch" :countryCode="selectedCountryCode" />
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
  methods: {
    handleCountrySelected(countryCode) {
      this.selectedCountryCode = countryCode;
      this.$refs.trackSearch.trackOptions();
    }
  }
}
</script>

<style>
@import "../../../src/assets/css/main_v1.css";

</style>
