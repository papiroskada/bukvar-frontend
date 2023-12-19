<template>
  <div class="content">
    <div class="container">
      <h1 class="text-center fst-italic">{{ author.name }}</h1>
      <div class="m-5">
        <div class="m-1 info">
          <span class="fw-bold">Age:</span> {{ author.age }}
        </div>
        <div class="m-1 info">
          <span class="fw-bold">Biography:</span> {{ author.characteristic }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { AuthorsAPI } from "@/api/AuthorsAPI/authorsAPI";

export default defineComponent({
  name: "AuthorInfo",
  props: {
    id: {
      type: String,
    },
  },
  data() {
    return {
      author: {},
    };
  },
  async mounted() {
    const res = await AuthorsAPI.author(this.id);
    if (res && res.data) {
      this.author = res.data;
    }
  },
});
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
  font-size: 24px;
}
</style>
