<template>
  <div>
    <footer class="footer custom-footer text-center py-3">
      <div class="container">
        <a href="viber://chat?number=+380509431722" class="contact-icon"
          ><i class="fa-brands fa-viber"></i
        ></a>
        <a href="mailto:dunchasid@gmail.com" class="contact-icon"
          ><i class="fa-regular fa-envelope"></i
        ></a>
        <a href="https://t.me/dashushak" class="contact-icon"
          ><i class="fa-brands fa-telegram"></i
        ></a>
      </div>
    </footer>
  </div>
</template>
<style>
.custom-footer {
  background-color: rgb(193, 136, 80);
}
.contact-icon {
  color: rgb(50, 31, 12);
  font-size: 30px;
  padding: 5px;
}
.contact-icon:hover {
  color: rgb(78, 47, 17);
}
</style>
<script>
export default {
  name: "FooterItem",
};
</script>
