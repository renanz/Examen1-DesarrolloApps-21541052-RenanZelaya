import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { city: "", condition: "", temperature: "" };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    const name = event.target.nameCity.value;
    if (name) {
      axios
        .get(
          `https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?query=${name}`
        )
        .then(data => {
          const woeid = data.data[0].woeid;
          axios
            .get(
              `https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${woeid}`
            )
            .then(res => {
                this.setState(() => ({
                    city: res.data.title,
                    condition: res.data.consolidated_weather[0].weather_state_name,
                    temperature: res.data.consolidated_weather[0].the_temp
                  }));
            })
            .catch(err2 => {
              console.log(err2.message);
            });
        })
        .catch(err => {
            this.setState(() => ({
                city: 'Ciudad no encontrada',
                condition: '',
                temperature: ''
              }));
          console.log(err.message);
        });
    }
  }

  render() {
    return (
      <div className="center">
        <div>
          <h1>{this.state.city}</h1>
          <br />
          <h2>{this.state.condition}</h2>
          <br />
          <h2>{this.state.temperature}</h2>
        </div>
        <br />
        <div>
          <form onSubmit={this.handleClick}>
            <input
              className="u-full-width"
              type="text"
              name="nameCity"
              placeholder="Enter the City Name"
            />
            <br />
            <br />
            <button type="submit">Search Weather</button>
          </form>
        </div>
      </div>
    );
  }
}

export const fetchLocationId = async city => {
  const response = await fetch(`location/search/?query=${city}`);
  const locations = await response.json();
  return locations[0].woeid;
};

export const fetchWeather = async woeid => {
  const response = await fetch(`location/${woeid}/`);
  const { title, consolidated_weather } = await response.json();
  const { weather_state_name, the_temp } = consolidated_weather[0];

  return {
    location: title,
    weather: weather_state_name,
    temperature: the_temp
  };
};

Home.propTypes = {
  match: PropTypes.object.isRequired
};

export default Home;
