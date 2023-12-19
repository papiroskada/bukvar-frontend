<template>
  <div class="content">
    <div class="log-form">
      <LogForm />
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import LogForm from "@/components/log-form.vue";

export default defineComponent({
  name: "SigninUser",
  components: { LogForm },
});
</script>
<style scoped>
.content {
  background-color: rgb(217, 187, 157);
  min-height: 100vh;
  display: flex;
  align-items: center;
}
.log-form {
  margin: auto;
  width: 30%;
}

@media (max-width: 768px) {
  .log-form {
    width: 90%;
  }
}
</style>
