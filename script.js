const msg = document.getElementById("msg");

async function weather() {
  msg.innerHTML = `<div class="loader"></div>`;

  navigator.geolocation.getCurrentPosition(
    async function (position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      try {
        const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
        const data = await res.json();

        const weather = data.current_weather;

        msg.innerHTML = `
          <h3>📍 Your Location</h3>
          <p><strong>Temperature:</strong> ${weather.temperature}°C</p>
          <p><strong>Wind Speed:</strong> ${weather.windspeed} km/h</p>
          <p><strong>Condition:</strong> ${weather.weathercode}</p>
        `;
      } catch (err) {
        msg.innerText = "❌ Failed to fetch weather.";
      }
    },
    function (error) {
      msg.innerText = `❌ Location Error: ${error.message}`;
    }
  );
}

weather();
