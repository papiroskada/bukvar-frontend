<template>
  <div>
      <RegForm />
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

