<template>
  <div class="content">
    <div class="container">
      <h2 class="m-lg-3 text-center">Hello, {{ user.name }}</h2>
      <hr />
      <ul class="info">
        <li>Name: {{ user.name }}</li>
        <li>Username: {{ user.username }}</li>
        <li>Email: {{ user.email }}</li>
        <li>Cellphone: {{ user.phone }}</li>
        <li>Birth date: {{ formatDate(user.birthdate) }}</li>
      </ul>
      <router-link :to="{name: 'ProfileUpdate'}" class="btn btn-primary btn-lg ml-5">Update Information</router-link>
    </div>
  </div>
</template>

<script>
    import { defineComponent } from 'vue';
    import { getUserInfo } from '@/common/decodeJWT';
    import { UsersAPI } from '@/api/UsersAPI/usersAPI';
    import { formatDate } from '../common/formatDate';

    export default defineComponent({
        name: "UserProfile",
        data() {
            return {
                user: {}
            }
        },
        methods: {
            formatDate(date) {
                return formatDate(date); 
            }
        },
        async mounted() {
            const {userId} = getUserInfo(localStorage.getItem('token'));
            if (userId) {
                const res = await UsersAPI.user(userId);
                if (res && res.data) {
                    this.user = {...res.data};
                }
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
.info {
  list-style-type: none;
  font-size: 20px;
}
.info li {
  margin: 10px;
}
</style>
