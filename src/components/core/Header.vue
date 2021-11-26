<template>
  <div id="Header">
    <v-app-bar app color="#313131" dense dark>
      <v-tooltip right>
        <template v-slot:activator="{ on, attrs }">
          <v-hover v-slot="{ hover }">
            <v-app-bar-nav-icon
              @click="navAction"
              :color="hover ? 'blue' : 'white'"
              v-bind="attrs"
              v-on="on"
            ></v-app-bar-nav-icon>
          </v-hover>
        </template>
        <span>Menu</span>
      </v-tooltip>
    </v-app-bar>
  </div>
</template>

<script>
//import Axios from "axios";
export default {
  computed: {},
  methods: {
    navAction() {
      let active = !this.$store.state.navActive;
      this.$store.dispatch("UPDATE_NAVACTIVE", active);
    },
  },
};
</script>

<style></style>
