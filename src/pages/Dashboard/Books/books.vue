<template>
    <div class="main-wrapper">
        <div class="container">
            <router-link :to="{ name: 'Dashboard' }" class="backwards">
                Back to Dashboard
            </router-link>
        </div>

        <div class="search">
            <div class="search__wrapper">
                <label for="search" class="search__label">Search</label>
                <input type="text"
                       id="search"
                       v-model="search"
                       class="search__input"
                       placeholder="Search by First Name">
                <router-link to="/dashboard/addBook">
                    <button class="actions actions__add">
                        Add new Book
                    </button>
                </router-link>
            </div>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">
              №
            </th>
            <th scope="col">
              Name
            </th>
            <th scope="col">
              Genre
            </th>
            <th scope="col">
              Description
            </th>
            <th scope="col">
                Price
            </th>
            <th scope="col">
                Pages
            </th>
            <th scope="col">
                Capacity
            </th>
            <th scope="col">
                Capacity sold
            </th>
            <th scope="col">
                Edit
            </th>
            <th scope="col">
              Delete
            </th>
          </tr>
        </thead>
        <tbody class="table__body">
          <tr v-for="(book, index) in filteredBooks" :key="book.id">
            <td>
              <div>{{ index + 1 }}</div>
            </td>
            <td>
              <div>{{ book.name }}</div>
            </td>
            <td>
              <div>{{ book.genre }}</div>
            </td>
            <td>
              <div>{{ book.description }}</div>
            </td>
            <td>
              <div>{{ book.price }}</div>
            </td>
            <td>
              <div>{{ book.pages }}</div>
            </td>
            <td>
              <div>{{ book.capacity }}</div>
            </td>
            <td>
              <div>{{ book.capacitySold }}</div>
            </td>
            <td>
                <RouterLink :to="{name: 'DashboardUpdateBook', params:{id: book.id}}">
                    <button class="actions actions__edit">
                        Edit
                    </button>
                </RouterLink>
            </td>
            <td>
                <button class="actions actions__delete" 
                        @click="confirmDelete(book.id)">
                    Delete
                </button>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- <Paginator :paginatorName="'users'"/> -->
    </div>
</template>

<script>
    import { defineComponent } from 'vue';
    import { BooksAPI } from '../../../api/BooksAPI/booksAPI';

    export default defineComponent({
        name: 'DashboardBooks',
        data() {
            return {
                books: [],
                search: ''
            }
        },
        computed: {
            filteredBooks() {
                return this.books.filter(book => book.name.toLowerCase().includes(this.search.toLowerCase()));
            }
        },
        methods: {
            confirmDelete(id) {
                if (window.confirm("Are you sure you want to delete this book?")) {
                    this.deleteBook(id);
                }
            },
            async deleteBook(id) {
                //need response
                await BooksAPI.deleteBook(id);
                this.$router.go();
            },
        },
        async created() {
            const res = await BooksAPI.books();
            if (res && res.data) {
                this.books = res.data;
            }
        }
    })
</script>

<style lang="scss" scoped>
    .main-wrapper {
        min-height: 100vh;
        margin: 50px;

    }
   .container {
        font-size: 1.5rem;
        padding: 2rem 0.5rem;
        margin-left: 0.5rem;
    }

    .backwards {
        margin-bottom: 1rem;
        color: #6B7280;
        cursor: pointer;

        &:hover {
            color: #374151;
        }
    }

    .search {
        display: flex;
        margin-left: 0.5rem;
        margin-bottom: 1rem;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        &__wrapper {
            width: 33.333333%;
            display: flex;
            input {
                margin-left: .3rem;
                width: 50%;
                padding: 10px;
                box-sizing: border-box;
                border: 2px solid #ddd;
                border-radius: 25px;
                outline: none;
                font-size: 16px;
                background: #fff url('https://img.icons8.com/ios-filled/50/000000/search.png') no-repeat 95% 50%;
                background-size: 20px;
                transition: border-color 0.3s;
            }
        }

        &__label {
          font-size: 1.5rem;
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border-width: 0; 
        }

        &__input {
            font-size: 1.5rem;
            display: block;
            border-radius: 0.25rem;
            border: 1px solid #D1D5DB;
            width: 100%;
            height: 2.6rem;
            box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

            @media (min-width: 640px) {
                font-size: 1rem;
                line-height: 1.25rem;
            }
        }
    }

    .table {
        border-top: 1px solid #E5E7EB;
        min-width: 100%;
        margin-bottom: 4rem;

        th {
            font-size: 1.75rem;
            padding: 0.75rem 1.5rem;
            line-height: 1rem;
            font-weight: 500;
            letter-spacing: 0.05em;
            text-align: center;
            color: #6B7280;
            text-transform: uppercase;
        }

        &__body {
            font-size: 1.2rem;
            border-top: 1px solid #E5E7EB;
            background-color: #ffffff;

            tr:nth-child(even) {
                background-color: #f9f9f9;
            }

            td {
                padding: 1rem 1.5rem;
                white-space: nowrap;
                text-align: center;

                &:hover {
                    background-color: #f0f0f0;
                }

                div {
                    line-height: 1.25rem;
                    color: #111827;
                }
            }
            &__role div {
              padding: 5px 10px;
              border-radius: 5px;
              display: inline-block;
              margin: 2px;
            }
            &__role .coach {
              background-color: #4CAF50;
              color: #ffffff;
            }
            &__role .customer {
              background-color: #3498db;
              color: #ffffff;
            }
            .fa {
              margin-left: 5px;
          }
        }
    }
    .actions {
        padding: 0, 1.25rem, 0, 1.25rem;
        margin-left: 2rem;
        width: 80%;
        border-radius: 0.5rem; 
        border-width: 1px; 
        border-color: #6366F1;
        color: #4338CA;  
        height: 3rem; 
        transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        transition-duration: 300ms; 
        transition-duration: 150ms;
        cursor: pointer;
        &__edit {
            border-color: #6366F1;
            color: #4338CA;  
            &:hover {
                color: #E0E7FF; 
                background-color: #6366F1; 
            }
        }
        &__delete {
            border-color:red;
            color: black;  
            &:hover {
                color: #E0E7FF; 
                background-color: red; 
            }
        }
        &__add {
            height: 3.2rem;
            width: 120%;
            background: rgb(56, 172, 56);
            border: rgb(56, 172, 56);
            color: #000;  
            &:hover {
                background-color: green; 
            }
        } 
    }
</style>