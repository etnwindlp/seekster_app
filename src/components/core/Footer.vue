<template>
  <v-footer app padless color="#313131" dark>
    <v-col class="text-center" cols="12">
      copyright © 2021
      <small>Version V.{{ version }}</small>
    </v-col>
  </v-footer>
</template>

<script>
export default {
  computed: {
    version() {
      return "1.0.0";
    }
  }
};
</script>

<style></style>
