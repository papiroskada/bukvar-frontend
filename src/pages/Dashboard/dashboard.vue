<template>
    <div class="container">
        dashboard
        <router-link to="/dashboard/authors" class="">
            <li class="items"> 
                <i class="fas fa-users text-gray-500 mr-2"></i>
                <span class="">Authors</span>
            </li>
        </router-link>
        <router-link to="/dashboard/books" class="">
            <li class="items"> 
                <i class="fas fa-users text-gray-500 mr-2"></i>
                <span class="">Books</span>
            </li>
        </router-link>
    </div>
</template>

<script>
    import { defineComponent } from 'vue';

    export default defineComponent({
        name: 'DashboardPage',
        
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
    .items {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    span {
        font-weight: 500; 
        color: #1F2937; 
    }
</style>