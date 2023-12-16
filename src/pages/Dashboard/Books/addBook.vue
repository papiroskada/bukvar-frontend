<template>
    <div class="wrapper">
        <form @submit.prevent="onSubmit"
            class="custom-form">
            <h2 class="form-title">Add Book</h2>
            <div class="form-group">
                <label class="form-label" for="name">
                    Name
                </label>
                <input v-model.trim="name"
                    class="form-input"
                    id="name" type="text" placeholder="Enter name" />
            </div>
            <div class="form-group">
                <label class="form-label" for="description">
                    Description
                </label>
                <textarea v-model.trim="description"
                    class="form-input"
                    id="description" placeholder="Enter description">
                </textarea>
            </div>
            <div class="form-group">
                <label class="form-label" for="genre">
                    Genre
                </label>
                <input v-model.trim="genre"
                    class="form-input"
                    id="genre" type="text" placeholder="Enter genre" />
            </div>
            <div class="form-group">
                <label class="form-label" for="pages">
                    Pages
                </label>
                <input v-model.trim="pages"
                    class="form-input"
                    id="pages" type="number" placeholder="Enter pages count" />
            </div>
            <div class="form-group">
                <label class="form-label" for="price">
                    Price
                </label>
                <input v-model.trim="price"
                    class="form-input"
                    id="price" type="number" />
            </div>
            <div class="form-group">
                <label class="form-label" for="capacity">
                    Capacity
                </label>
                <input v-model.trim="capacity"
                    class="form-input"
                    id="capacity" type="number" />
            </div>
            <div class="form-group">
                <label class="form-label" for="capacitySold">
                    Capacity Sold
                </label>
                <input v-model.trim="capacitySold"
                    class="form-input"
                    id="capacitySold" type="number" />
            </div>
            <div class="form-group">
                <label class="form-label" for="authors">
                    Select Authors:
                </label>
                <VueMultiselect
                    v-model="selectedAuthors"
                    track-by="name"
                    :options="filteredAuthors"
                    label="name"
                    placeholder="Select authors"
                    :multiple="true"
                    :searchable="true"
                    :close-on-select="false"
                    >
                </VueMultiselect>
            </div>
            <div class="form-group-button">
                <button class="form-button">
                    Add Book
                </button>
            </div>
            <ErrorMessage :errors="errors"
                          :hasErrors = "hasErrors"
                        class="errors"
            />
        </form>
    </div>
</template>

<script>
    import { defineComponent } from 'vue';
    import ErrorMessage from '../../../components/error.vue';
    import { BooksAPI } from '../../../api/BooksAPI/booksAPI';
    import VueMultiselect  from 'vue-multiselect';
    import { AuthorsAPI } from '@/api/AuthorsAPI/authorsAPI';
    import "vue-multiselect/dist/vue-multiselect.css";

    export default defineComponent({
        name: 'DashboardAddBook',
        components: { ErrorMessage, VueMultiselect },
        data() {
            return {
                name: '',
                description: '',
                price: 0,
                genre: '',
                pages: '',
                capacity: 0,
                capacitySold: 0,
                authors: [],
                selectedAuthors: [],
                searchQuery: '',
                errors: {
                    name: '',
                    price: '',
                    description: '',
                    pages: '',
                    genre: '',
                    capacity: '',
                    capacitySold: '',
                    submit: ''
                }
            }
        },
        computed: {
            hasErrors() {
                return Object.values(this.errors).some(error => error !== '');
            },
            filteredAuthors() {
                const query = this.searchQuery.toLowerCase();
                return this.authors.filter(
                    (author) => author.name.toLowerCase().includes(query)
                );
            },
            getAuthorsIndexes() {
                return this.selectedAuthors.map(author => author.id)
            }
        },
        methods: {
            clearErrors(fieldName) {
                this.errors[fieldName] = '';
            },
            async onSubmit() {
                if (!this.hasErrors) {
                    if (!this.name || !this.price || !this.description || !this.pages || !this.genre || !this.capacity || !this.capacitySold) {
                        this.errors.submit = "Check all the fields not to be empty!";
                        return;
                    }
                    const res = await BooksAPI.createBook({name: this.name, description: this.description, price: this.price, genre: this.genre, pages: this.pages, capacity: this.capacity, capacitySold: this.capacitySold, authorIndicies: this.getAuthorsIndexes});

                    if (res && res.data) {
                        this.$router.push({name: 'DashboardBooks'});
                    } 
                }
            },
            validateName(name) {
                let error = '';
                const ukrainianLettersRegex = /^[A-Z][a-zA-Z]{2,}/;
                if (!ukrainianLettersRegex.test(name)) {
                    error = `Поле повинно бути написане англійською та починатися з великої літери.`;
                }

                return error;
            },
            validateDescription(description) {
                let error = '';
                if (description.length > 255) {
                    error = `Опис не може бути більшим за 255 символів`;
                }

                return error;
            },
            validatePrice(price) {
                let error = '';
                if (price > 9999.99) {
                    error = "Price cannot be bigger than 9999,99";
                } else if (price <= 0) {
                    error = 'Price cannot be less than 0';
                }

                return error;
            },
            validateGenre(genre) {
                let error = '';
                if (/\d/.test(genre) || genre.length < 3) {
                    error = `Genre must be at least 3 characters and contain only alphabet letters`;
                }
                return error;
            },
            validateCapacity(capacity) {
                let error = '';
                if (capacity < 0) {
                    error = 'Capacity cannot be less than 0';
                }
                return error;
            },
            validatePages(pages) {
                let error = '';
                if (pages < 0) {
                    error = 'Pages cannot be less than 0';
                }
                return error;
            }
        },
        watch: {
            'name': function (newVal) {
                if (newVal) {
                    this.clearErrors('name');
                    this.errors.name = this.validateName(newVal);
                }
            },
            'price': function (newVal) {
                if (newVal) {
                    this.clearErrors('price');
                    this.errors.price = this.validatePrice(newVal);
                }
            },
            'description': function (newVal) {
                if (newVal) {
                    this.clearErrors('description');
                    this.errors.description = this.validateDescription(newVal);
                }
            },
            'genre': function (newVal) {
                if (newVal) {
                    this.clearErrors('genre');
                    this.errors.genre = this.validateGenre(newVal);
                }
            },
            'capacity': function (newVal) {
                if (newVal) {
                    this.clearErrors('capacity');
                    this.errors.capacity = this.validateCapacity(newVal);
                }
            },
            'capacitySold': function (newVal) {
                if (newVal) {
                    this.clearErrors('capacitySold');
                    this.errors.capacitySold = this.validateCapacity(newVal);
                }
            },
            'pages': function (newVal) {
                if (newVal) {
                    this.clearErrors('pages');
                    this.errors.pages = this.validatePages(newVal);
                }
            },
        },
        async created() {
            const res = await AuthorsAPI.authors();
            if (res && res.data) {
                this.authors = res.data;
            }
        }
    })
</script>

<style lang="scss" scoped>
    .wrapper {
        display: flex; 
        margin-top: 2rem; 
        flex-direction: column; 
        justify-content: center; 
        align-items: center; 
        height: auto;
    }
    .custom-form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        background-color: #fff;
        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
        border-radius: 0.375rem;
        padding: 2rem;
        margin-bottom: 1rem;
        max-width: 28rem;
    }

    .form-title {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2.5rem;
        font-weight: bold;
        color: #4a5568;
        margin-bottom: 1rem;
    }
    .form-input {
        width: 100%;
        padding: 0.75rem;
        font-size: 1.5rem;
        border: 1px solid #e2e8f0;
        border-radius: 0.25rem;
    }

    .form-group {
        margin-bottom: 1.5rem;
    }
    .form-group-button {
        margin-bottom: 1.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .form-label {
        display: block;
        font-size: 2rem;
        color: #4a5568;
        margin-bottom: 0.5rem;
    }

    .form-button {
        width: 70%;
        height: 3.6rem;
        background-color: #4299e1;
        color: #fff;
        font-size: 1.5rem;
        padding: 0.75rem 1.5rem;
        border: none;
        border-radius: 0.375rem;
        cursor: pointer;
        &:hover {
            background-color: #3182ce;
        }
    }
    .errors {
        display: flex;
        text-align: center;
        justify-content: center;
    }
</style>