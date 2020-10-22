<template>
  <div>
    <home-carousel></home-carousel>
    <home-content></home-content>
  </div>
</template>

<script>
import HomeCarousel from "./components/Carousel";
import HomeContent from "./components/Content";
export default {
  name: 'home',
  components: {
    HomeCarousel,
    HomeContent,
  }
}
</script>
