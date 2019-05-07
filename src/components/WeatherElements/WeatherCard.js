import React from "react";
// import PropTypes from "prop-types";
import WeatherChart from "./WeatherChart";
import WeatherDetail from "./WeatherDetail";
import { Row, Col } from "reactstrap";
import WeatherSearch from "./WeatherSearch";

function WeatherCard({
  isLoading,
  performSearch,
  toggleLoading,
  proximity,
  currently,
  place_name,
  daily,
  isLoaded
}) {
  return (
    <div className="container">
      <Row>
        <Col xs={12} sm={12} md={4} lg={4}>
          <WeatherSearch
            isLoading={isLoading}
            performSearch={performSearch}
            toggleLoading={toggleLoading}
            proximity={proximity}
          />
          <WeatherDetail currently={currently} place_name={place_name} />
        </Col>
        <WeatherChart daily={daily} isLoaded={isLoaded} />
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
