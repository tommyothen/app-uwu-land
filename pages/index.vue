<template>
  <div class="container">
    <div>
      <h1 class="title">
        uwu
      </h1>
      <ShortenLink />
      <div class="links">
        <nuxt-link class="button--green" to="/api">
          Documentation
        </nuxt-link>
        <a
          href="https://github.com/DaSushiAsian/uwu-land"
          target="_blank"
          rel="noopener noreferrer"
          class="button--grey"
        >
          GitHub
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'Home',
    };
  },
  head() {
    return {
      title: `${this.title} - uwu land`,
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
  color: var(--color-secondary);
  letter-spacing: 1px;
}

.links {
  padding-top: 15px;
}
</style>
