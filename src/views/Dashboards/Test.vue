<template>
  <heat-map :points="data" :width="600" :height="500" />
</template>

<script>
import HeatMap from "./HeatMap";

export default {
  name: "view-page",
  components: { HeatMap },
  data: () => {
    return {
      data: [
        { lat: 37.786117, lng: -122.440119 },
        { lat: 37.786564, lng: -122.440209 },
        { lat: 37.786905, lng: -122.44027 },
        { lat: 37.786956, lng: -122.440279 },
        { lat: 37.800224, lng: -122.43352 },
        { lat: 37.800155, lng: -122.434101 },
        { lat: 37.80016, lng: -122.43443 },
        { lat: 37.800378, lng: -122.434527 },
        { lat: 37.800738, lng: -122.434598 },
        { lat: 37.800938, lng: -122.43465 },
        { lat: 37.801024, lng: -122.434889 },
        { lat: 37.800955, lng: -122.435392 },
        { lat: 37.800886, lng: -122.435959 },
      ],
    };
  },
  methods: {},
  mounted() {},
};
</script>
