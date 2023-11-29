<template>
  <div>
    <LogForm />
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