import React from 'react';
import Weather from './app_component/weather.component';
import Form from './app_component/form.component';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'weather-icons/css/weather-icons.css';

import './App.css';



  const API_KEY = "86f58ffcf6dd3bad9e53b166269a3564";

  class App extends React.Component{

    constructor(){
      super();
      this.state={
        city: undefined,
        country:undefined,
        icon:undefined,
        main:undefined,
        celsius: undefined,
        temp_max:undefined,
        temp_min: undefined,
        description:"",
        error: false
      };
      
      this.weatherIcon = {
        Thunderstorm:"wi-thunderstorm",
        Drizzle:"wi-sleet",
        Rain:"wi-storm-showers",
        Snow:"wi-snow",
        Atmosphere:"wi-fog",
        Clear: "wi-day-sunny",
        Clouds:"wi-day-fog"
      }
    }

    getWeather = async (e) =>{
      e.preventDefault();
      const city = e.target.elements.city.value;
      const country = e.target.elements.country.value;

      if(city !=='' && country !==''){
        const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}`);
      const response = await api_call.json();
      console.log(response);

      this.setState({
        city: `${response.name},${response.sys.country}`,
        celsius: this.calCelcius(response.main.temp),
        temp_max: this.calCelcius(response.main.temp_max),
        temp_min: this.calCelcius(response.main.temp_min),
        description: response.weather[0].description,
        error:false
        
        
        
      });

      this.get_WeatherIcon(this.weatherIcon, response.weather[0].id)

      }else {
        this.setState({error:true});
      }
    }

     

    calCelcius(temp){
      let cell = Math.floor(temp-273.15)
      return cell;
    }

    get_WeatherIcon(icons,rangeId){

      switch (true) {
        case rangeId >= 200 && rangeId <=232:
          this.setState({icon:this.weatherIcon.Thunderstorm});
          break;
        case rangeId >= 300 && rangeId <= 321:
          this.setState({icon:this.weatherIcon.Drizzle});
          break;
        case rangeId >= 500 && rangeId <= 531:
          this.setState({icon:this.weatherIcon.Rain});
          break;
        case rangeId >= 600 && rangeId <= 622:
          this.setState({icon:this.weatherIcon.Snow});
          break;
        case rangeId >= 701 && rangeId <= 781:
          this.setState({icon:this.weatherIcon.Atmosphere});
          break;
        case rangeId === 800:
          this.setState({icon:this.weatherIcon.Clear});
          break;
        case rangeId >= 801 && rangeId <= 804:
          this.setState({icon:this.weatherIcon.Clouds});
          break;
      
        default:
          this.setState({icon:this.weatherIcon.Clouds});
      }

    }
     



     render(){
       return (
        <div className="App">
        <Form loadWeather={this.getWeather}  error={this.state.error}/>
        <Weather 
        city={this.state.city} 
        country={this.state.country}
        temp_celsius={this.state.celsius}
        temp_max={this.state.temp_max}
        temp_min={this.state.temp_min}
        description={this.state.description}
        weatherIcon={this.state.icon}
        
        />
        
        
      </div>

       );
     }
  }
export default App;

 
