import Vue from 'vue';
import { GChart } from 'vue-google-charts';

document.addEventListener("DOMContentLoaded", () => {
	new Vue({
		el: "#app",
		components: {
			"gchart": GChart
		},
		data: {
			genMix: [],
			chartData: [],
			chartOptions: {
				width: 800,
				height: 240,
				title: 'Generation Mix for the GB power system',
				colors: ['#084887', '#f58a07', '#f9ab55', '#f7f5fb', '#909cc2', '#C1BB8F', '#A176BC']
			},
			timeFrom: [],
			timeTo: []

		},
		methods: {
      getEnergy: function () {
				fetch('https://api.carbonintensity.org.uk/generation')
				.then(response => response.json())
				.then(result => {
					this.genMix = result.data.generationmix;
					this.timeFrom = result.data.from;
					this.timeTo = result.data.to;
				})
				.then(() => {
					 this.genChartData()
				})
			},
			genChartData: function(){
				const chartData = [];
				chartData[0] = ["fuel", "percentage"];
				this.genMix.forEach((mix) => {
					const newData = [mix.fuel, mix.perc];
					chartData.push(newData);
				})
				this.chartData = chartData;
			}
		},
		mounted: function() {
			this.getEnergy()
		}
	});
});
