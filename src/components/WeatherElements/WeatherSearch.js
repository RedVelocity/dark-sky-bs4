import React, { Component } from "react";
import PropTypes from "prop-types";
// import { AutoComplete } from "primereact/autocomplete";
import { getSuggestions } from "API";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col
} from "reactstrap";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import ReactAnimatedWeather from "react-animated-weather";
import { Line } from "react-chartjs-2";
import Stats from "components/Stats/Stats.jsx";
import moment from "moment";

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

    //Chart Data
    let dailyWeather, chartOptions, chartData;
    // console.log('chart props', weather, isLoaded);
    if (this.props.isLoaded) {
      dailyWeather = this.props.daily.data;
      chartData = {
        labels: dailyWeather.map(daily =>
          moment.unix(daily.time).format("ddd DD/MM")
        ),
        datasets: [
          {
            label: "Low",
            data: dailyWeather.map(daily =>
              Math.round(daily.apparentTemperatureLow)
            ),
            borderColor: "#f17e5d",
            backgroundColor: "#f17e5d",
            pointRadius: 0,
            pointHoverRadius: 0,
            borderWidth: 3
          },
          {
            label: "Average",
            data: dailyWeather.map(daily =>
              Math.round(
                (daily.apparentTemperatureHigh + daily.apparentTemperatureLow) /
                  2
              )
            ),
            borderColor: "#fcc468",
            backgroundColor: "#fcc468",
            pointRadius: 0,
            pointHoverRadius: 0,
            borderWidth: 3
          },
          {
            label: "High",
            data: dailyWeather.map(daily =>
              Math.round(daily.apparentTemperatureHigh)
            ),
            borderColor: "#6bd098",
            backgroundColor: "#6bd098",
            pointRadius: 0,
            pointHoverRadius: 0,
            borderWidth: 3
          }
        ]
      };

      chartOptions = {
        legend: {
          display: true,
          position: "bottom"
          // fullWidth: true
          // reverse: false
        },

        // tooltips: {
        //   enabled: true
        // },

        scales: {
          yAxes: [
            {
              ticks: {
                fontColor: "#9f9f9f",
                beginAtZero: false,
                maxTicksLimit: 5
                //padding: 20
              },
              gridLines: {
                drawBorder: false,
                zeroLineColor: "#ccc",
                color: "rgba(255,255,255,0.05)"
              }
            }
          ],

          xAxes: [
            {
              barPercentage: 1.6,
              gridLines: {
                drawBorder: false,
                color: "rgba(255,255,255,0.1)",
                zeroLineColor: "transparent",
                display: false
              },
              ticks: {
                padding: 20,
                fontColor: "#9f9f9f"
              }
            }
          ]
        }
      };
    }
    return (
      <div className="container">
        <Row>
          <Col xs={12} sm={12} md={4} lg={4}>
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
          <Col xs={12} sm={12} md={8} lg={8}>
            <Card>
              <CardHeader>
                <CardTitle className="lead">Weekly Weather</CardTitle>
                {/* <p className="card-category">High Average Low</p> */}
              </CardHeader>
              <CardBody>
                <Line
                  data={chartData}
                  options={chartOptions}
                  width={400}
                  height={100}
                />
              </CardBody>
              {/* <CardFooter>
                <hr />
                <Stats>
                  {[
                    {
                      i: "fas fa-history",
                      t: " Updated 3 minutes ago"
                    }
                  ]}
                </Stats>
              </CardFooter> */}
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
