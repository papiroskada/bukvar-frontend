<template>
    <div class="wrapper">
        <form @submit.prevent="onSubmit"
            class="custom-form">
            <h2 class="form-title">Update Author</h2>
            <div class="form-group">
                <label class="form-label" for="name">
                    Name
                </label>
                <input v-model.trim="name"
                    class="form-input"
                    id="name" type="text" :disabled="true" placeholder="Enter name" />
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
                <label class="form-label" for="age">
                    Age
                </label>
                <input v-model.trim="age"
                    class="form-input"
                    id="age" type="number" :disabled="true" />
            </div>
            <div class="form-group">
                <label class="form-label" for="authors">
                    Select Books:
                </label>
                <VueMultiselect
                    v-model="selectedBooks"
                    track-by="name"
                    :options="filteredBooks"
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
                    Update Author
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
    import { AuthorsAPI } from '../../../api/AuthorsAPI/authorsAPI';
    import VueMultiselect  from 'vue-multiselect';
    import { BooksAPI } from '@/api/BooksAPI/booksAPI';

    export default defineComponent({
        name: 'DashboardUpdateAuthor',
        components: { ErrorMessage, VueMultiselect },
        props: {
            id: {
                type: String
            },
        },
        data() {
            return {
                name: '',
                age: null,
                description: '',
                books: [],
                selectedBooks: [],
                searchQuery: '',
                errors: {
                    name: '',
                    age: '',
                    description: '',
                }
            }
        },
        computed: {
            hasErrors() {
                return Object.values(this.errors).some(error => error !== '');
            },
            filteredBooks() {
                const query = this.searchQuery.toLowerCase();
                return this.books.filter(
                    (book) => book.name.toLowerCase().includes(query)
                );
            },
        },
        methods: {
            clearErrors(fieldName) {
                this.errors[fieldName] = '';
            },
            async onSubmit() {
                if (!this.hasErrors) {
                    if (!this.name) {
                    this.errors.name = "Введіть ім'я";
                    }

                    const res = await AuthorsAPI.updateAuthor(this.id, {description: this.description});

                    if (res && res.data) {
                        this.$router.push({name: 'DashboardAuthors'});
                    }
                }
            },
            validateName(name) {
                console.log(name)
                let error = '';
                const ukrainianLettersRegex = /^[A-Z][a-zA-Z]{2,}/;
                if (!ukrainianLettersRegex.test(name)) {
                    error = `Поле повинно бути написане англійською та починатися з великої літери.`;
                }

                return error;
            },
            validateAge(age) {
                let error = '';
                if (age > 110 || age < 18) {
                    error = `Автор не може бути неповнолітнім або старшим за 110`;
                }

                return error;
            },
            validateDescription(description) {
                let error = '';
                if (description.length > 255) {
                    error = `Опис не може бути більшим за 255 символів`;
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
            'age': function (newVal) {
                if (newVal) {
                    this.clearErrors('age');
                    this.errors.age = this.validateAge(newVal);
                }
            },
            'description': function (newVal) {
                if (newVal) {
                    this.clearErrors('description');
                    this.errors.description = this.validateDescription(newVal);
                }
            },
        },
        async mounted() {
            const authorRes = await AuthorsAPI.author(this.id);
            if (authorRes && authorRes.data) {
                ({name: this.name, age: this.age, characteristic: this.description} = authorRes.data);
            }

            const bookAuthorsRes = await BooksAPI.bookAuthors(this.id);
            if (bookAuthorsRes && bookAuthorsRes.data) {
                this.selectedAuthors = [...bookAuthorsRes.data];
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