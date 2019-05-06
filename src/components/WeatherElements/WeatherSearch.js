import React, { Component } from "react";
import PropTypes from "prop-types";
// import { AutoComplete } from "primereact/autocomplete";
import { getSuggestions } from "API";
import {
  Card,
  // CardSubtitle,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col
} from "reactstrap";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import ReactAnimatedWeather from "react-animated-weather";
import Stats from "components/Stats/Stats.jsx";

export default class WeatherSearch extends Component {
  state = {
    //user entered text
    selected: [],
    //place suggestions and coords in features
    suggestions: [],
    features: []
  };

  toggleDropdown = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  };

  loadSuggestions = async searchText => {
    const res = await getSuggestions(
      this.props.proximity.latitude,
      this.props.proximity.longitude,
      searchText
    );
    res !== 0
      ? this.setState({
          suggestions: res.features.map(feature => feature.place_name),
          features: res.features
        })
      : // console.log('place state', this.state);
        this.setState({
          features: [],
          suggestions: []
        });
  };

  onSelect = selected => {
    // console.log("onselect", e);
    if (this.state.features.length > 0 && selected.length > 0) {
      const { toggleLoading, performSearch } = this.props;
      const feature = this.state.features.filter(
        feature => feature.place_name === selected[0]
      );
      toggleLoading();
      performSearch(
        feature[0].geometry.coordinates[1],
        feature[0].geometry.coordinates[0],
        feature[0].place_name
      );
    }
    this.setState({ selected: [] });
  };

  render() {
    const defaults = {
      color: "#1385ae",
      size: 50,
      animate: true
    };
    const { temperature, icon, summary } = this.props.currently;
    const { place_name } = this.props;

    return (
      <div className="content">
        <Row>
          <Col xs={12} sm={6} md={6} lg={4}>
            <Card>
              <CardBody>
                <CardTitle className="lead">Search Weather</CardTitle>
                <AsyncTypeahead
                  isLoading={this.props.isLoading}
                  id="typeahead"
                  onChange={selected => this.onSelect(selected)}
                  onSearch={query => this.loadSuggestions(query)}
                  options={this.state.suggestions}
                  placeholder="Enter Place Name"
                  selected={[]}
                />
              </CardBody>
            </Card>
            <Card className="card-stats ">
              <CardBody>
                <Row className="align-items-center justify-items-center">
                  <Col xs={12} md={4}>
                    <div className="text-center">
                      <ReactAnimatedWeather
                        icon={icon.replace(/-/g, "_").toUpperCase()}
                        color={defaults.color}
                        size={defaults.size}
                        animate={defaults.animate}
                      />
                    </div>
                  </Col>
                  <Col xs={12} md={4}>
                    <div>
                      <p className="lead text-muted text-center">{summary}</p>
                    </div>
                  </Col>
                  <Col xs={12} md={4}>
                    <div className="numbers text-center">
                      <p className="card-category">Currently</p>
                      <CardTitle tag="p">{Math.round(temperature)}°C</CardTitle>
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
                      t: place_name
                    }
                  ]}
                </Stats>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

WeatherSearch.propTypes = {
  // performSearch: PropTypes.func.isRequired,
  // toggleLoading: PropTypes.func.isRequired,
  isLoaded: PropTypes.bool.isRequired
  // weatherState: PropTypes.object.isRequired
};
