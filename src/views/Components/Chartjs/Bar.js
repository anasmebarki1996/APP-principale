import {
  Bar,
} from 'vue-chartjs'

export default {
  extends: Bar,
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
        datasets: [{
          label: this.title,
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          borderCapStyle: 'round',
          data: this.data
        }]
      }, {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      });
    }
  },
  mounted() {
    this.renderLineChart();
  },

}