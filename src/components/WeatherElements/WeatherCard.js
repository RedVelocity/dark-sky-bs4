import React from "react";
// import PropTypes from "prop-types";
import WeatherChart from "./WeatherChart";
import WeatherDetail from "./WeatherDetail";
import { Row, Col, Card, CardBody } from "reactstrap";
import WeatherSearch from "./WeatherSearch";
import MapCard from "./MapCard";
import { List } from "react-content-loader";

function WeatherCard({ appState, performSearch, toggleLoading, setViewport }) {
  const MyListLoader = () => (
    <List primaryColor={"#e0e0e0"} secondaryColor={"#999"} />
  );
  return (
    <div className="container pt-5" style={{ minHeight: "100vh" }}>
      <Row className="align-items-center">
        <Col xs={12} md={5} lg={4}>
          <WeatherSearch
            isLoading={appState.isLoading}
            performSearch={performSearch}
            toggleLoading={toggleLoading}
            proximity={appState.proximity}
          />
          {appState.isLoaded && !appState.isLoading ? (
            <WeatherDetail
              currently={appState.weather.currently}
              place_name={appState.place_name}
            />
          ) : (
            <Card>
              <CardBody>
                <MyListLoader />
              </CardBody>
            </Card>
          )}
        </Col>
        {appState.isLoaded && !appState.isLoading ? (
          <Col xs={12} md={7} lg={8}>
            <WeatherChart daily={appState.weather.daily} />
          </Col>
        ) : (
          <Col xs={12} md={7} lg={8}>
            <MyListLoader />
          </Col>
        )}
        {appState.isLoaded && !appState.isLoading ? (
          <Col xs={12}>
            <MapCard
              viewport={appState.viewport}
              setViewport={setViewport}
              markerCoords={{
                coords: {
                  latitude: appState.weather.latitude,
                  longitude: appState.weather.longitude
                }
              }}
            />
          </Col>
        ) : (
          <Col xs={12}>
            <MyListLoader />
          </Col>
        )}
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
