import {
  Line,
} from 'vue-chartjs'

export default {
  extends: Line,
  data: () => ({
    data: [],
    labels: [],
    title: ""
  }),
  props: ['options'],
  watch: {
    '$store.state.statistiques': function () {
      this.data = this.$store.state.statistiques.data;
      this.labels = this.$store.state.statistiques.labels;
      this.title = this.$store.state.statistiques.title;
      this.$data._chart.destroy();
      this.renderLineChart();
    }
  },

  methods: {
    renderLineChart() {
      this.renderChart({
        labels: this.labels,
        options: {
          legend: {
            display: false,
          },
        },
        datasets: [{
          label: this.title,
          fill: true,
          lineTension: 0.1,
          backgroundColor: "rgba(237, 15, 81, .2)",
          borderColor: "#ed0f51",
          borderCapStyle: "round",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "#ed0f51",
          pointBackgroundColor: "#ffffff",
          pointBorderWidth: 2,
          pointHoverRadius: 10,
          pointHoverBackgroundColor: "#ed0f51",
          pointHoverBorderColor: "#ed0f51",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: this.data,
        }, ],
      }, {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }],
        }
      });
    }
  },
  mounted() {
    this.renderLineChart();
  },

}