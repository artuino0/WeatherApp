var app = new Vue({
  el: "#app",
  data: {
    apiUrl: "https://api.weatherapi.com/v1/",
    endPoint: "",
    apoKey: "key=4e42d51c7463474d87932720222906",
    queryApi: "",
  },
  methods: {
    getCurrentLocation: async function () {
      if (!navigator.geolocation) {
        throw new Error(`Your browser doesn't support Geolocation`);
      }
      await navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          this.queryApi = `${latitude},${longitude}`;
        },
        (err) => {
          console.log(`Ha ocurrido un error:`, err);
        }
      );
    },
  },
});
