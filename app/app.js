var app = new Vue({
  el: "#app",
  data: {
    apiUrl: "http://api.weatherapi.com/v1/",
    endPoint: "forecast.json?",
    apiKey: "key=4e42d51c7463474d87932720222906&",
    queryApi: "",
    forecastDays: 10,
    weatherLocation: [],
    currentWeather: [],
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
      let url = `${this.apiUrl}${this.endPoint}${this.apiKey}q=${query}&days=${this.forecastDays}&aqi=no&alerts=no`;

      fetch(url)
        .then((response) => response.json())
        .then((json) => {
          this.weatherLocation = json.location;
          this.currentWeather = json.current;
        })
        .catch((err) => console.log("solicitud fallida: ", err));
    },
  },
  mounted: function () {
    this.getCurrentLocation();
  },
  filters: {
    monthString: function (value) {
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dic",
      ];
      return months[value - 1];
    },
  },
});
