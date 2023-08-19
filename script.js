async function getWeather(evt) {
  const query = evt.target.value
  const api_key = '13fb1fd9a0234cf1be4164704231808'
  const content = document.querySelector('#content')
  content.innerHTML = ''
  content.appendChild(loading())

  const promise = fetch(`https://api.weatherapi.com/v1/current.json?key=${api_key}&q=${query}&aqi=no`)
    .then(res => res.json())
    .then(handleWeatherData)

}

function loading() {
  const span = document.createElement('span')
  span.textContent = 'Loading...'

  return span
}

function handleWeatherData(weatherData) {
  const template = document.querySelector('#template').innerHTML
  const weatherSection = document.querySelector('#content')
  console.log(weatherData)
  const { country, name } = weatherData.location
  console.log(country, name)

  const { temp_c, temp_f, humidity } = weatherData.current;

  const { text, icon } = weatherData.current.condition;
  const url = 'https:' + icon


  const data = {
    city: name,
    temp: {
      cel: temp_c,
      fah: temp_f,
    },
    condition: {
      text,
      url,
    }
  }

  const templateCompiled = Handlebars.compile(template)


  weatherSection.innerHTML = templateCompiled(data)


}



const queryInput = document.querySelector('#query')
queryInput.addEventListener('change', getWeather)
