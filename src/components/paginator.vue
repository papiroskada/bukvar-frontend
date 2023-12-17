<template>
    <vue-awesome-paginate
        :total-items="total"
        :items-per-page="pageSize"
        :max-pages-shown="maxPagesShown"
        v-model="currentPage"
        :on-click="onClickHandler"
        paginate-buttons-class="btn"
        active-page-class="btn-active"
        back-button-class="back-btn"
        next-button-class="next-btn"
    />
</template>

<script>
    import { defineComponent } from 'vue';
    import { BooksAPI } from '@/api/BooksAPI/booksAPI';
    import { DEFAULT_PAGE_SIZE, DEFAULT_MAXPAGE_SHOWN } from '../config';

    export default defineComponent({
        name: 'PaginatorComponent',
        props: {
            paginatorName: {
                type: String,
                default: '',
                required: true
            }
        },
        data() {
            return {
                currentPage: 1,
                pageSize: DEFAULT_PAGE_SIZE,
                total: 0,
                maxPagesShown: DEFAULT_MAXPAGE_SHOWN,
                userId: ''
            }
        },
        methods: {
            async getServerResponseForPaginator(paginatorName) {
                let response = [];
                switch(paginatorName) {
                    case 'books':
                        response = await BooksAPI.books({ currentPage: this.currentPage, pageSize: this.pageSize });
                        break;
                }
                return this.total = response?.totalCount || 0;
            },
            async onClickHandler(page) {
                this.currentPage = page;
                this.$router.push({ query: { page: this.currentPage } });
                this.getServerResponseForPaginator(this.paginatorName);
            }
        },
        async mounted() {
            this.currentPage = parseInt(this.$route.query.page, 10) || 1;
            this.getServerResponseForPaginator(this.paginatorName);
        }
    })
</script>

<style lang="scss" scoped>
    .btn {
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