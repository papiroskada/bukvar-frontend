<template>
  <div>
    <footer class="footer custom-footer fixed-bottom text-center py-3">
      <div class="container">
        <a href="" class="contact-icon"><i class="fa-brands fa-viber"></i></a>
        <a href="" class="contact-icon"
          ><i class="fa-regular fa-envelope"></i
        ></a>
        <a href="" class="contact-icon"
          ><i class="fa-brands fa-telegram"></i
        ></a>
      </div>
    </footer>
  </div>
</template>
<style>
.custom-footer {
  background-color: #e4fff8;
}
.contact-icon {
  color: #007a93;
  font-size: 30px;
  padding: 5px;
}
.contact-icon:hover {
  color: #006074;
}
</style>
<script>
export default {
  name: "FooterItem",
};
</script>
