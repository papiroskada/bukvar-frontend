<template>
  <div class="container">
    <h1 class="text-center m-5 fst-italic">
      Books from all over the world
    </h1>
    <form class="d-flex search-bar mt-5" role="search">
      <input
        class="form-control me-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
      />
      <button class="btn custom-button" type="submit">Search</button>
    </form>
    <hr />
    <div class="row justify-content-center">
      <div
        v-for="(book, index) in books"
        :key="index"
        class="col-lg-2 col-sm-6 m-lg-3 mb-sm-2"
      >
        <div class="card">
          <img src="@/assets/example.jpg" class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">{{ book.name }}</h5>
            <p class="card-text">
              <span class="fw-medium">Author:
                <span>{{ getAuthors(authors[index]) }}</span>
              </span>
              <br />
              <span class="fw-medium">Genre: {{ book.genre }}</span>
            </p>
            <router-link :to="{name: 'BookInfo', params:{id: book.id}}" class="btn custom-button">View</router-link>
          </div>
        </div>
      </div>
    </div>
    <vue-awesome-paginate
        :total-items="total"
        :items-per-page="pageSize"
        :max-pages-shown="maxPagesShown"
        v-model="currentPage"
        :on-click="onClickHandler"
        paginate-buttons-class="btn-paginator"
        active-page-class="btn-active"
        back-button-class="back-btn"
        next-button-class="next-btn"
    />
  </div>
</template>
<script>
    import { defineComponent } from "vue";
    import { DEFAULT_PAGE_SIZE, DEFAULT_MAXPAGE_SHOWN } from '../config';
    import { BooksAPI } from "@/api/BooksAPI/booksAPI";

    export default defineComponent({
        name: "BooksCatalog",
        data() {
            return {
                books: [],
                authors: [],
                currentPage: 1,
                pageSize: DEFAULT_PAGE_SIZE,
                total: 0,
                maxPagesShown: DEFAULT_MAXPAGE_SHOWN,
            }
        },
        computed: {
        },
        methods: {
            async getServerResponseForPaginator() {
                const response = await BooksAPI.booksWithPagination({ currentPage: this.currentPage, pageSize: this.pageSize });
                if (response && response.data) {
                    this.books = response.data;
                    for (const book of this.books) {
                      const res = await BooksAPI.bookAuthors(book.id);
                      if (res && res.data) {
                          let authors = res.data.map(author => author.name);
                          this.authors.push(authors);
                    }
                }
                }
                const booksResponse = await BooksAPI.books();
                
                return this.total = booksResponse?.data.length || 0;
            },
            async onClickHandler(page) {
                this.currentPage = page;
                this.$router.push({ query: { page: this.currentPage } });
                await this.getServerResponseForPaginator();
            },
            getAuthors(authorsArr) {
                return authorsArr.join(', ');
            }
        },
        async mounted() {
            this.currentPage = parseInt(this.$route.query.page, 10) || 1;
            await this.getServerResponseForPaginator();
        }
    });
</script>
<style scoped>
    .container {
    margin: 20px auto;
    background-color: #ffffff;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
        rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
    }
    .search-bar {
    width: 70%;
    margin: auto;
    }
    .custom-button {
    background-color: rgb(193, 136, 80);
    color: white;
    font-weight: 600;
    }
    .custom-button:hover {
    background-color: rgb(174, 122, 70);
    color: white;
    }
    @media (max-width: 768px) {
    .search-bar {
        width: 90%;
        margin: auto;
    }
    .card-img-top {
        max-width: 80%;
        margin: 5px auto;
    }
    }
    .btn-paginator {
        height: 40px;
        width: 40px;
        border: none;
        margin-inline: 5px;
        cursor: pointer;
    }
    .back-btn {
        background-color: black;
        color: #fff;
    }
    .next-btn {
        background-color: black;
        color: #fff;
    }
    .btn-active {
        background-color: gray;
        color: white;
    }
</style>
