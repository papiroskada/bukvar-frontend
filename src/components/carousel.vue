<template>
  <div id="carouselExampleFade" class="carousel slide carousel-fade">
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img src="@/assets/slide.jpg" class="d-block w-100" alt="..." />
        <div class="carousel-content">
          <div class="carousel-caption d-none d-md-block custom-caption">
            <p>
              <span class="carousel-text"
                >"A room without books is like a body without a soul."</span
              >
            </p>
            <p><span class="carousel-text">Marcus Tullius Cicero</span></p>
          </div>
        </div>
      </div>
      <div class="carousel-item">
        <img src="@/assets/slide1.jpg" class="d-block w-100" alt="..." />
        <div class="carousel-content">
          <div class="carousel-caption d-none d-md-block custom-caption">
            <p>
              <span class="carousel-text">
                "The more that you read, the more things you will know. The more
                that you learn, the more places you'll go."</span
              >
            </p>
            <p><span class="carousel-text">Dr. Seuss</span></p>
          </div>
        </div>
      </div>
      <div class="carousel-item">
        <img src="@/assets/slide2.jpg" class="d-block w-100" alt="..." />
        <div class="carousel-content">
          <div class="carousel-caption d-none d-md-block custom-caption">
            <p>
              <span class="carousel-text"
                >"A book is a dream that you hold in your hands."</span
              >
            </p>
            <p><span class="carousel-text">Neil Gaiman</span></p>
          </div>
        </div>
      </div>
    </div>
    <button
      class="carousel-control-prev"
      type="button"
      data-bs-target="#carouselExampleFade"
      data-bs-slide="prev"
    >
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button
      class="carousel-control-next"
      type="button"
      data-bs-target="#carouselExampleFade"
      data-bs-slide="next"
    >
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
</template>
<style scoped>
.carousel-text {
  background-color: rgba(0, 0, 0, 0.545);
}
.custom-caption {
  font-size: 26px;
  color: #ffffff;
  text-align: right;
  text-shadow: 0px 2px 15px rgba(0, 0, 0, 1);
}

</style>
<script>
export default {
  name: "CarouselPhotos",
};
</script>
