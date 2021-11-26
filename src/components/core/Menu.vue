<template>
  <v-navigation-drawer
    id="Menu"
    v-if="$store.state.navActive"
    app
    permanent
    dark
    color="#313131"
  >
    <v-divider></v-divider>
    <v-list shaped nav dense>
      <v-list-item-group v-model="selectMenu" mandatory :color="page_color">
        <v-list-item
          v-for="([icon, title, route], index) in $store.state.menus"
          :key="index"
          link
          @click="onClickMenu(route, index)"
        >
          <v-list-item-icon>
            <v-icon>{{ icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <div class="white--text">{{ title }}</div>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      selectMenu: 0,
      page_color: "#EC7531",
    };
  },
  mounted() {
    this.$store.dispatch("UPDATE_NAVACTIVE", true);
  },
  methods: {},
};
</script>

<style></style>
