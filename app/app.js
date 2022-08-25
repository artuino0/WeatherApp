var app = new Vue({
  el: "#app",
  data: {
    apiUrl: "http://api.weatherapi.com/v1/",
    endPoint: "forecast.json?",
    apiKey: "key=4e42d51c7463474d87932720222906&",
    queryApi: "",
    forecastDays: 5,
  },
  methods: {
    getCurrentLocation: async function () {
      if (!navigator.geolocation) {
        throw new Error(`Your browser doesn't support Geolocation`);
      }
      navigator.geolocation.getCurrentPosition(this.successGeoloaction);
    },
    successGeoloaction: function (position) {
      queryApi = `${position.coords.latitude},${position.coords.longitude}`;
      this.getWeather(queryApi);
    },
    getWeather: function (query) {
      let url = `${this.apiUrl}${this.endPoint}${this.apiKey}q=${query}&days=${this.forecastDays}`;
      console.log(url);
    },
  },
  mounted: function () {
    this.getCurrentLocation();
  },
});
