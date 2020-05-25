<template>
  <div>
    <page-title :heading="heading" :subheading="subheading" :icon="icon"></page-title>
    <div class="content">
      <b-row>
        <b-col md="6">
          <b-card title="Doughnut" class="main-card mb-3">
            <doughnut></doughnut>
          </b-card>
          <b-card title="Radar" class="main-card mb-3">
            <radar></radar>
          </b-card>
        </b-col>
        <b-col md="6">
          <b-card title="Polar Area" class="main-card mb-3">
            <polar></polar>
          </b-card>
          <b-card title="Pie Chart" class="main-card mb-3">
            <pie></pie>
          </b-card>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="6">
          <b-card title="Line Chart" class="main-card mb-3">
            <lineeg></lineeg>
          </b-card>
          <b-card title="Area Chart" class="main-card mb-3">
            <areaeg></areaeg>
          </b-card>
        </b-col>
        <b-col md="6">
          <b-card title="Vertical Bar Chart" class="main-card mb-3">
            <bar></bar>
          </b-card>
          <b-card title="Horizontal Bar Chart" class="main-card mb-3">
            <barhoriz></barhoriz>
          </b-card>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import PageTitle from "../../../Layout/Components/PageTitle.vue";

import doughnut from "./../../Components/Chartjs/Doughnut";
import radar from "./../../Components/Chartjs/Radar";
import polar from "./../../Components/Chartjs/Polar";
import pie from "./../../Components/Chartjs/Pie";
import lineeg from "./../../Components/Chartjs/Line";
import areaeg from "./../../Components/Chartjs/Area";
import bar from "./../../Components/Chartjs/Bar";
import barhoriz from "./../../Components/Chartjs/BarHoriz";

export default {
  components: {
    PageTitle,

    doughnut,
    radar,
    polar,
    pie,
    lineeg,
    areaeg,
    bar,
    barhoriz
  },
  data: () => ({
    heading: "ChartJS",
    subheading: "Huge selection of charts created with the Vue ChartJS Plugin",
    icon: "pe-7s-bandaid icon-gradient bg-amy-crisp"
  })
};
</script>
