<template>
  <div class="content">
    <RegForm class="reg-form" />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import RegForm from "@/components/reg-form.vue";

export default defineComponent({
  name: "SigninUser",
  components: { RegForm },
});
</script>
<style scoped>
.content {
  background-color: rgb(217, 187, 157);
  min-height: 100vh;
  display: flex;
  align-items: center;
}
.reg-form {
  margin: auto;
  width: 100%;
}

@media (max-width: 768px) {
  .reg-form {
    width: 90%;
  }
}
</style>
