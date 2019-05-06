import React, { Component } from "react";
import WeatherSearch from "components/WeatherElements/WeatherSearch";
import { getWeather, getLocation } from "API";
import { Row, Col, Card, CardBody } from "reactstrap";

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
      <div>
        {this.state.isLoaded ? (
          <WeatherSearch
            // weatherState={this.state}
            performSearch={this.performSearch}
            toggleLoading={this.toggleLoading}
            // setViewport={this.setViewport}
            currently={this.state.weather.currently}
            isLoaded={this.state.isLoaded}
            isLoading={this.state.isLoading}
            place_name={this.state.place_name}
            proximity={this.state.proximity}
          />
        ) : (
          <div className="content">
            <Row className="text-center">
              <Col xs={12} sm={6} md={6} lg={4}>
                <Card className="card-stats ">
                  <CardBody>
                    <h3>Loading...</h3>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        )}
      </div>
    );
  }
}

export default App;
