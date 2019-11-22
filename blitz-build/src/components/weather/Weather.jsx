import React, { useState, useEffect } from "react";
import axios from "axios";
import ProjectWeather from "./ProjectWeather";
import DashboardWeather from "./DashboardWeather";


// for dashboard import <Weather usage="dashboard"/>
// for project page import <Weather usage="project" city={} latitude={} longitude={} />

function Weather(props) {
  const [weatherData, setWeatherData] = useState();
  const [weatherPosition, setWeatherPosition] = useState({
    latitude: 0,
    longitude: 0
  });
  useEffect(() => {
    // get the latitude and longitude from the project page or navigator.geolocation.
    if (props.usage === "project") {
      setWeatherPosition({
        latitude: 37.7202,
        longitude: -122.4099
      });
    } else if (props.usage === "dashboard") {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          console.log(position);
          setWeatherPosition({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        });
      } else {
        console.log("geolocation is not supported");
      }
    }
  }, []);

  // get the weather data from backend.
  useEffect(() => {
    if (weatherPosition.latitude !== 0) {
      console.log(weatherPosition);
      axios
        .get(
          ` https://blitz-build-weather.herokuapp.com/forecast/${weatherPosition.latitude},${weatherPosition.longitude}`
        )
        .then(res => {
          setWeatherData(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [weatherPosition]);


  // get time
  function getTime() {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    const d = new Date();
    const day = days[d.getDay()];
    var hour = d.getHours();
    var ampm = "am";

    if (hour > 12) {
      hour = hour - 12;
      ampm = "pm";
    }

    const minute = d.getMinutes();
    return `${day}, ${hour}:${("0" + minute).slice(-2)} ${ampm}`;
  }

  // convert weather info to weather icon - not finish!
  function getWeatherIcon() {
    var weatherIcon = weatherData.currently.icon;
    //var weatherIcon = <IconImage src="weatherIcons/streamline-icon-weather-clouds@24x24.png" alt="cloudy"/>
    return weatherIcon;
  }
console.log(weatherData)
  return (
    <>
      {props.usage === "project" ? (
        // display in project page
        <>
          {weatherData ? (
            <ProjectWeather
              weatherData={weatherData}
              time={getTime()}
              icon={getWeatherIcon()}
              city={props.city}
            />
          ) : (
            <p>Weather Loading....</p>
          )}
        </>
      ) : (
        // display in dashboard
        <>
          {weatherData ? (
            <DashboardWeather
              weatherData={weatherData}
              time={getTime()}
              icon={getWeatherIcon()}
            />
          ) : (
            <p>Weather Loading...</p>
          )}
        </>
      )}
    </>
  );
}

export default Weather;
