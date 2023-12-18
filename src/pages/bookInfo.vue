<template>
    <div class="content">
    <div class="container">
      <h2 class="m-lg-3 text-center">{{ book.name }}</h2>
      <hr />
      <ul class="info">
        <li>Description: {{ book.description }}</li>
        <li>Genre: {{ book.genre }}</li>
        <li>Pages: {{ book.pages }}</li>
        <li>Price: {{ book.price }}</li>
        <li>Capacity: {{ book.capacity }}</li>
        <li>Capacity Sold: {{ book.capacitySold }}</li>
        <li>Authors: 
          <span v-for="author in authors" :key="author.id">
            <li>
              <router-link :to="{name: 'AuthorInfo', params:{id: author.id}}">{{ author.name }}</router-link>
            </li>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
    import { defineComponent } from 'vue';
    import { BooksAPI } from '@/api/BooksAPI/booksAPI';
    
    export default defineComponent({
        name: 'BookInfo',
        props: {
            id: {
                type: String
            },
        },
        data() {
            return {
                book: {},
                authors: {}
            }
        },
        async mounted() {
            const res = await BooksAPI.book(this.id);
            if (res && res.data) {
                this.book = res.data;
            }

            const authorsRes = await BooksAPI.bookAuthors(this.id);
            if (authorsRes && authorsRes.data) {
              this.authors = authorsRes.data;
            }
        }
    })
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