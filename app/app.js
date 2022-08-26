var app = new Vue({
  el: "#app",
  data: {
    apiUrl: "http://api.weatherapi.com/v1/",
    endPoint: "forecast.json?",
    apiKey: "key=4e42d51c7463474d87932720222906&",
    forecastDays: 10,
    weatherLocation: [],
    currentWeather: [],
    forecastWeather: [],
    locationResponse: [],
    toDay: new Date(),
    isLoading: true,
    isFinding: true,
    keyword: "",
  },
  methods: {
    getCurrentLocation: function () {
      this.isLoading = true;
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
      this.isLoading = true;
      this.isFinding = false;
      this.endPoint = "forecast.json?";
      let url = `${this.apiUrl}${this.endPoint}${this.apiKey}q=${query}&days=${this.forecastDays}&aqi=no&alerts=no`;

      fetch(url)
        .then((response) => response.json())
        .then((json) => {
          this.weatherLocation = json.location;
          this.currentWeather = json.current;
          this.forecastWeather = json.forecast.forecastday;
          this.forecastWeather.shift();
          this.isLoading = false;
          console.log(this.forecastWeather);
        })
        .catch((err) => console.log("solicitud fallida: ", err));
    },
    findLocation: function (query) {
      if (query == "") {
        alert("Validate your search and try again.");
        return false;
      }
      this.endPoint = "search.json?";
      query = query.replace(" ", "%20");
      let url = `${this.apiUrl}${this.endPoint}${this.apiKey}q=${query}`;

      fetch(url)
        .then((response) => response.json())
        .then((json) => {
          this.locationResponse = json;
          this.locationResponse.pop();
          this.locationResponse.pop();
          this.locationResponse.pop();
          this.locationResponse.pop();
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
      return months[value];
    },
    dayString: function (value) {
      const d = new Date();
      d.setDate(value);
      const days = ["Sun", "Mon", "Tue", "Wen", "Thu", "Fri", "Sat"];
      return days[d.getDay()];
    },
  },
});
