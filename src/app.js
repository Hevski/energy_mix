import Vue from 'vue';
import { GChart } from 'vue-google-charts';

document.addEventListener("DOMContentLoaded", () => {
	new Vue({
		el: "#app",
		components: {
			"gchart": GChart
		},
		data: {
      energy: {},
			genMix: [],
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
			}
		},
		mounted: function() {
      this.getEnergy()
		}
	});
});
