<template>
  <div class="coutry-select">
      <div class="selected" @click="toggleDropdown">
        <img :src="selectedCountry.flag" :alt="selectedCountry.name" />
        <i class="arrow"></i>
      </div>
      <div v-if="dropdownOpen" class="dropdown">
        <div
          v-for="country in countries"
          :key="country.code"
          class="dropdown-item"
          @click="selectCountry(country)"
        >
          <img :src="country.flag" :alt="country.name" />
        </div>
      </div>
    </div>
</template>

<script>

export default {
  name: 'CountrySelector',
  data() {
    return {
      selectedCountry: { "code": "KR",  "name": "South Korea",  "flag": "https://upload.wikimedia.org/wikipedia/commons/0/09/Flag_of_South_Korea.svg" }
      , countries: [
        { "code": "KR",  "name": "South Korea",  "flag": "https://upload.wikimedia.org/wikipedia/commons/0/09/Flag_of_South_Korea.svg" },
        { "code": "JP",  "name": "Japan",  "flag": "https://upload.wikimedia.org/wikipedia/en/9/9e/Flag_of_Japan.svg" },
        { "code": "US", "name": "United States", "flag": "https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg" },
        { "code": "GB",  "name": "United Kingdom", "flag": "https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg" }
      ]
      , dropdownOpen: false
    };
  },
  methods: {
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
    selectCountry(country) {
      this.selectedCountry = country;
      this.dropdownOpen = false;
      this.$emit('country-selected', country.code);
    }
  }
}
</script>
