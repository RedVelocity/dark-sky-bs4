import React from "react";
// import PropTypes from "prop-types";
import WeatherChart from "./WeatherChart";
import WeatherDetail from "./WeatherDetail";
import { Row, Col } from "reactstrap";
import WeatherSearch from "./WeatherSearch";

function WeatherCard({ appState, performSearch, toggleLoading }) {
  return (
    <div className="container pt-5 pb-3" style={{ minHeight: "100vh" }}>
      <Row>
        <Col xs={12} sm={12} md={4} lg={4}>
          <WeatherSearch
            isLoading={appState.isLoading}
            performSearch={performSearch}
            toggleLoading={toggleLoading}
            proximity={appState.proximity}
          />
          {appState.isLoaded && (
            <WeatherDetail
              currently={appState.weather.currently}
              place_name={appState.place_name}
            />
          )}
        </Col>
        {appState.isLoaded && <WeatherChart daily={appState.weather.daily} />}
      </Row>
    </div>
  );
}

// PropTypes
// WeatherCard.propTypes = {
//   weatherState: PropTypes.object.isRequired,
//   performSearch: PropTypes.func.isRequired,
//   toggleLoading: PropTypes.func.isRequired
// };

export default WeatherCard;
