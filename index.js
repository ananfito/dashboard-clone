function getCurrentTime() {
	let currentDate = new Date()
	document.getElementById('time').innerText = currentDate.toLocaleTimeString("en-us", {timeStyle: "medium"})
}

setInterval(getCurrentTime, 1000)

navigator.geolocation.getCurrentPosition((position) => {
	const lat = position.coords.latitude
	const lon = position.coords.longitude
	fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial`)
		.then(res => {
			if (!res.ok) {
				throw Error("Weather data not available")
			}
			return res.json()
		})
		.then(data => {
			document.getElementById('weather').innerHTML = `
				<div class="weather__top">
					<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="weather icon">
					<h2>${Math.round(data.main.temp)}&#176;F</h2>
				</div>
				<p class="weather__city">${data.name}</p>
			`
		})
		.catch(err => console.error(err))
})



fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
    .then(res => res.json())
    .then(data => {
        document.body.style.backgroundImage = `url(${data.urls.regular})`
		document.getElementById('author').innerText = `📸: ${data.user.name}`
    })
	.catch(err  => {
		document.body.style.backgroundImage = 'url(https://images.unsplash.com/photo-1549558549-415fe4c37b60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODM4ODkwNjV8&ixlib=rb-4.0.3&q=80&w=1080)'
	})

fetch('https://api.coingecko.com/api/v3/coins/dogecoin')
	.then(res => res.json())
	.then(data => {
		document.getElementById('crypto-info').innerHTML = `
			<div id="crypto-info__header">
				<div class='crypto-info__img-container'><img src='${data.image.thumb}'/></div>
				<p id="crypto-name">${data.name}</p>
			</div>
            <div id="crypto-info__price-info">
				<p>➡️: $${data.market_data.current_price.usd}</p>
				<p>⬆️: $${data.market_data.high_24h.usd}</p>
				<p>⬇️: $${data.market_data.low_24h.usd}</p>
			</div>
		`
	})
	.catch(err => console.error(err))
