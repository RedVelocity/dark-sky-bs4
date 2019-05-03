import React, { Component } from "react";
import PropTypes from "prop-types";
// import { AutoComplete } from "primereact/autocomplete";
import { getLocation, getSuggestions } from "API";
import {
  Card,
  // CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col
} from "reactstrap";
import ReactAnimatedWeather from "react-animated-weather";
import Stats from "components/Stats/Stats.jsx";

export default class WeatherSearch extends Component {
  state = {
    //hold gps location for proximity suggestions
    latitude: null,
    longitude: null,
    //user entered text
    place: "",
    //place suggestions and coords in features
    suggestions: null,
    features: null,
    //user selected text
    place_name: ""
  };

  componentDidMount() {
    const { isLoaded, toggleLoading, performSearch } = this.props;
    if (!isLoaded) {
      if ("geolocation" in navigator) {
        /* geolocation is available */
        // const asyncGetCurrentPosition = options =>
        //   new Promise((resolve, reject) => {
        //     navigator.geolocation.getCurrentPosition(resolve, reject, options);
        //   }); loc= await asyncGetCurrentPosition;
        navigator.geolocation.getCurrentPosition(async position => {
          const { latitude, longitude } = position.coords;
          this.setState({
            latitude: latitude,
            longitude: longitude
          });
          toggleLoading();
          const res = await getLocation(latitude, longitude);
          // console.log("navigator position", position);
          if (res !== 0) {
            this.setState({
              ...this.state,
              place_name: res.features[0].place_name_en
            });
          }
          performSearch(latitude, longitude);
        });
      } else {
        /* geolocation IS NOT available */
      }
    }
  }

  // loadSuggestions = async e => {
  //   const res = await getSuggestions(
  //     this.state.latitude,
  //     this.state.longitude,
  //     this.state.place
  //   );
  //   res !== 0
  //     ? this.setState({
  //         suggestions: res.features.map(feature => feature.place_name),
  //         features: res.features
  //       })
  //     : // console.log('place state', this.state);
  //       this.setState({
  //         ...this.state,
  //         features: null,
  //         suggestions: ["Place Not Found"]
  //       });
  // };

  onSelect = e => {
    if (this.state.features !== null && this.state.features !== undefined) {
      const { toggleLoading, performSearch } = this.props;
      const feature = this.state.features.filter(
        feature => feature.place_name === e.value
      );
      if (feature.length !== 0) {
        // console.log('selected co-ords',feature[0].geometry.lat, latitude:feature[0].geometry.lat, this.state);
        toggleLoading();
        performSearch(
          feature[0].geometry.coordinates[1],
          feature[0].geometry.coordinates[0]
        );
        this.setState({ place: "", place_name: e.value });
      } else this.setState({ place: "" });
    } else this.setState({ place: "" });
  };

  render() {
    const defaults = {
      color: "#1385ae",
      size: 50,
      animate: true
    };
    let temperature, icon, summary;
    const { isLoaded } = this.props.weatherState;
    if (isLoaded)
      ({
        temperature,
        icon,
        summary
      } = this.props.weatherState.weather.currently);

    return (
      <div className="content">
        {isLoaded ? (
          <Row>
            <Col xs={12} sm={6} md={6} lg={3}>
              <Card className="card-stats ">
                <CardBody>
                  <Row className="align-items-center">
                    <Col xs={5} md={4}>
                      <div className="text-center">
                        <ReactAnimatedWeather
                          icon={icon.replace(/-/g, "_").toUpperCase()}
                          color={defaults.color}
                          size={defaults.size}
                          animate={defaults.animate}
                        />
                      </div>
                    </Col>
                    <Col xs={3} md={4}>
                      <div>
                        <p className="h5 text-muted text-center">{summary}</p>
                      </div>
                    </Col>
                    <Col xs={7} md={4}>
                      <div className="numbers text-center">
                        <p className="card-category">Currently</p>
                        <CardTitle tag="p">
                          {Math.round(temperature)}°C
                        </CardTitle>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  <Stats>
                    {[
                      {
                        i: "fas fa-location-arrow",
                        t: this.state.place_name
                      }
                    ]}
                  </Stats>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        ) : (
          <div className="lead">
            <h3>Loading...</h3>
          </div>
        )}
        {/* <AutoComplete
          inputStyle={{ marginTop: "2px", width: "300px" }}
          placeholder="Enter Place Name"
          value={this.state.place}
          onChange={e => this.setState({ place: e.target.value })}
          suggestions={this.state.suggestions}
          completeMethod={this.loadSuggestions}
          onSelect={this.onSelect}
        />
        <label style={{ margin: "10px" }}>{this.state.place_name}</label> */}
      </div>
    );
  }
}

WeatherSearch.propTypes = {
  performSearch: PropTypes.func.isRequired,
  toggleLoading: PropTypes.func.isRequired,
  isLoaded: PropTypes.bool.isRequired,
  weatherState: PropTypes.object.isRequired
};
