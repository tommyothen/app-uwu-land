<template>
  <div>
    <b-nav-item-dropdown text="🌙" class="style-dropdown">
      <b-dropdown-item
        v-for="color of colors"
        :key="color"
        @click="$colorMode.preference = color"
      >
        {{ color }}
      </b-dropdown-item>
    </b-nav-item-dropdown>
  </div>
</template>

<style scoped>
.style-dropdown {
  height: 2em;
  color: var(--color);
}

b-dropdown-item,
b-nav-item-dropdown {
  list-style-type: none;
}
</style>

<script>
export default {
  data() {
    return {
      colors: ['light', 'dark', 'sepia'],
    };
  },
};
</script>
