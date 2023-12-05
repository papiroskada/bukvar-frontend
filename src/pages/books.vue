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
        v-for="(item, index) in items"
        :key="index"
        class="col-lg-2 col-sm-6 m-lg-3 mb-sm-2"
      >
        <div class="card">
          <img src="@/assets/example.jpg" class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">Cool book</h5>
            <p class="card-text">
              <span class="fw-medium">Author:</span> Plak Plak <br />
              <span class="fw-medium">Genre:</span> cool
            </p>
            <a href="#" class="btn custom-button">View</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "BooksCatalog",
  data() {
    return {
      items: [
        { title: "Item 1", description: "Description 1" },
        { title: "Item 2", description: "Description 2" },
        { title: "Item 3", description: "Description 3" },
        { title: "Item 3", description: "Description 3" },
        { title: "Item 3", description: "Description 3" },
        { title: "Item 3", description: "Description 3" },
        { title: "Item 3", description: "Description 3" },
        { title: "Item 3", description: "Description 3" },
        { title: "Item 3", description: "Description 3" },
        { title: "Item 3", description: "Description 3" },
        { title: "Item 3", description: "Description 3" },
        { title: "Item 3", description: "Description 3" },
      ],
    };
  },
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
</style>
