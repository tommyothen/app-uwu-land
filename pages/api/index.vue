<template>
  <div class="container">
    <div>
      <Logo />
      <h1 class="title">
        API
      </h1>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'API',
    };
  },
  head() {
    return {
      title: `${this.title} - uwu land`,
      meta: [],
    };
  },
};
</script>

<style>
.container {
  margin: 0 auto;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}
</style>
