import React from "react";
// import PropTypes from "prop-types";
import ReactAnimatedWeather from "react-animated-weather";
import Stats from "components/Stats/Stats.jsx";
import { Card, CardBody, CardFooter, CardTitle, Row, Col } from "reactstrap";

function WeatherDetail({ currently, place_name }) {
  const defaults = {
    color: "#1385ae",
    size: 50,
    animate: true
  };
  const { temperature, icon, summary } = currently;

  return (
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
  );
}

// PropTypes
// WeatherDetail.propTypes = {
//   weatherState: PropTypes.object.isRequired
// };

export default WeatherDetail;
