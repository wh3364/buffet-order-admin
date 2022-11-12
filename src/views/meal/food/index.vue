<template>
  <div class="food-container">
    <router-view />
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
  .food {
    &-container {
      margin: 30px;
      display: flex;
      flex-direction: column;
    }
  }
</style>

