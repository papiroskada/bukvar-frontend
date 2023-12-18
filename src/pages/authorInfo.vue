<template>
  <div class="content">
    <div class="container">
      <h1 class="text-center fst-italic">{{ author.name }}</h1>
      <div class="info m-5">
        <h3 class="m-3">Age: {{ author.age }}<span>19</span></h3>
        <h3 class="m-1 ">Biography: {{ author.characteristic }} </h3>
      </div>
    </div>
  </div>
</template>

<script>
    import { defineComponent } from 'vue';
    import { AuthorsAPI } from '@/api/AuthorsAPI/authorsAPI';

    export default defineComponent({
        name: "AuthorInfo",
        props: {
            id: {
                type: String
            },
        },
        data() {
            return {
                author: {}
            }
        },
        async mounted() {
            const res = await AuthorsAPI.author(this.id);
            if (res && res.data) {
                this.author = res.data;
            }
        }
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
</style>
