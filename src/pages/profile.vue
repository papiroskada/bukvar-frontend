<template>
  <div class="content">
    <div class="container">
      <h2 class="m-lg-3 text-center">Hello, name surname!</h2>
      <hr />
      <ul class="info">
        <li>Name:</li>
        <li>Surname:</li>
        <li>Email:</li>
        <li>Password:</li>
        <li>Cellphone:</li>
        <li>Birth date:</li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "UserProfile",
  };
</script>

<style scoped>
.container {
  margin: 20px auto;
  padding: 30px 50px;
  background-color: #ffffff;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
    rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
  min-height: 82vh;
  overflow-y: auto;
}
.info {
  list-style-type: none;
  font-size: 20px;
}
.info li {
  margin: 10px;
}
</style>
