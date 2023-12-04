<template>
  <div class="card">
    <div class="card-body">
      <h1 class="text-center">Top-3 books of the week</h1>
      <div class="container">
        <div class="row justify-content-center">
          <div v-for="(item, index) in items" :key="index" class="col-lg-3 m-3">
            <div class="card">
              <img src="@/assets/example.jpg" class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">Cool book</h5>
                <p class="card-text">
                  Author: Plak Plak <br />
                  Genre: cool
                </p>
                <a href="#" class="btn custom-button">View</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      items: [
        { title: "Item 1", description: "Description 1" },
        { title: "Item 2", description: "Description 2" },
        { title: "Item 3", description: "Description 3" },
      ],
    };
  },
};
</script>
<style scoped>
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
  h1 {
    font-size: 24px !important;
  }
  .card-img-top {
    max-width: 70%;
    margin: 5px auto;
  }
}
@media (min-width: 769px) and (max-width: 991px) {
  .card {
    max-width: 80%;
    margin: 5px auto;
  }
}
</style>
