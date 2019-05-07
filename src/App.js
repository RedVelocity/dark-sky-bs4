import React, { Component } from "react";
import { getWeather, getLocation } from "API";
import WeatherCard from "components/WeatherElements/WeatherCard";

class App extends Component {
  state = {
    weather: null,
    //init map coords
    viewport: {
      latitude: 12.9791198,
      longitude: 77.5912997,
      zoom: 11
    },
    //store gps location if available
    proximity: {
      latitude: null,
      longitude: null
    },
    //current place
    place_name: "",
    //ui loaders
    isLoaded: false,
    isLoading: false
  };

  toggleLoading = () => this.setState({ isLoading: !this.state.isLoading });

  setViewport = viewport => {
    this.setState({ viewport: viewport });
    // console.log('set viewport in app js', this.state);
  };

  performSearch = async (lat, lon, place) => {
    const res = await getWeather(lat, lon);
    // console.log("res data appjs", res);
    if (res !== 0) {
      this.setState({
        weather: res,
        viewport: {
          ...this.state.viewport,
          latitude: res.latitude,
          longitude: res.longitude
        },
        place_name: place,
        isLoaded: true,
        isLoading: false
      });
    }
  };

  componentDidMount() {
    // const { isLoaded, toggleLoading, performSearch } = this.props;
    if (!this.state.isLoaded) {
      if ("geolocation" in navigator) {
        /* geolocation is available */
        navigator.geolocation.getCurrentPosition(async position => {
          const { latitude, longitude } = position.coords;
          this.toggleLoading();
          const res = await getLocation(latitude, longitude);
          // console.log("navigator position", position);
          this.setState({
            proximity: { latitude: latitude, longitude: longitude }
          });
          this.performSearch(
            latitude,
            longitude,
            res.features[0].place_name_en
          );
        });
      } else {
        /* geolocation IS NOT available */
      }
    }
  }

  render() {
    console.log("App State", this.state);
    return (
      <WeatherCard
        appState={this.state}
        toggleLoading={this.toggleLoading}
        performSearch={this.performSearch}
      />
    );
  }
}

export default App;
