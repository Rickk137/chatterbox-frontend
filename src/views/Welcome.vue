<template>
  <div class="welcome-screen">
    <h1
      class="text-center mb-5"
      v-t="'welcome'"
    ></h1>

    <h3
      class="text-center"
      v-t="'welcomeText'"
    ></h3>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.welcome-screen {
  background: #1e1e1e !important;
  height: 100%;
  width: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-direction: column;
  h1 {
    font-size: 56px;
    font-weight: 800;
  }
}
</style>