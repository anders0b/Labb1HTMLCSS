const locationText = document.getElementById("location-text");

async function getApi() {
  const apiUrl =
    "https://ipgeolocation.abstractapi.com/v1/?api_key=046ef8b54aa440188af86cc0f158911d";
  const response = await fetch(apiUrl);
  const results = await response.json();
  locationText.innerText = `Vi fraktar till ${results.city}! *`;
}
getApi();
