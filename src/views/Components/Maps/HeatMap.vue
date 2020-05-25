<template>
  <div ref="heatmap" style=" width: 100%; height: 500px" />
</template>

<script>
export default {
  name: "c-heat-map",
  props: {
    mapType: {
      type: String,
      default: () => "roadmap",
    },
    opacity: {
      type: Number,
      default: () => 1,
    },
    maxIntensity: {
      type: Number,
      default: () => 5,
    },
  },

  data: () => ({
    data: [],
  }),
  watch: {
    "$store.state.heatMap": function() {
      this.data = this.$store.state.heatMap;
      // this.$data._chart.destroy();
      this.setGpsCordonnee();
    },
  },
  computed: {
    heatmapPoints() {
      return this.data.map(
        // eslint-disable-next-line
        (data) => new google.maps.LatLng(data.lat, data.lng)
      );
    },
  },
  methods: {
    setGpsCordonnee() {
      return this.$gmapApiPromiseLazy().then(() => {
        var NEW_ZEALAND_BOUNDS = {
          north: 38,
          south: 19,
          west: -9,
          east: 12,
        };
        // eslint-disable-next-line
        this.mapObject = new google.maps.Map(this.$refs.heatmap, {
          zoom: 3,
          center: { lat: 28.555041, lng: 3.082614 },
          mapTypeId: this.mapType,
          restriction: {
            latLngBounds: NEW_ZEALAND_BOUNDS,
            strictBounds: false,
          },
        });
        // eslint-disable-next-line
        this.$heatmap = new google.maps.visualization.HeatmapLayer({
          data: this.heatmapPoints,
          map: this.mapObject,
          opacity: this.opacity,
          maxIntensity: this.maxIntensity,
        });
        this.$heatmap.setMap(this.mapObject);
      });
    },
  },
  mounted() {},
};
</script>
