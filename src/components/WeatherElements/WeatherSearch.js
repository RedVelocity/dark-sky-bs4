import React, { Component } from "react";
// import PropTypes from "prop-types";
import { getSuggestions } from "API";
import { Card, CardBody, CardTitle } from "reactstrap";
import { AsyncTypeahead } from "react-bootstrap-typeahead";

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
    return (
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
    );
  }
}

// WeatherSearch.propTypes = {
//   performSearch: PropTypes.func.isRequired,
//   toggleLoading: PropTypes.func.isRequired,
//   isLoaded: PropTypes.bool.isRequired
//   weatherState: PropTypes.object.isRequired
// };
