import React from "react";
import {
  StaticMap,
  Marker
  // InteractiveMap,
  // NavigationControl
} from "react-map-gl";
// import PropTypes from "prop-types";
import MediaQuery from "react-responsive";
import marker from "assets/img/marker.png";
import { Card, CardBody, CardTitle } from "reactstrap";

export default function MapCard({ viewport }) {
  return (
    <Card>
      <CardBody>
        <CardTitle className="lead">Map</CardTitle>
        <hr />
        <StaticMap
          width="100%"
          height="70vh"
          {...viewport}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_KEY}
          mapStyle="mapbox://styles/redvelocity/cjumbtame019l1ft8zigwi1cd"
        >
          <Marker
            latitude={viewport.latitude}
            longitude={viewport.longitude}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <img src={marker} alt="" />
          </Marker>
        </StaticMap>
      </CardBody>
    </Card>
  );
}

// MapCard.propTypes = {
//   setViewport: PropTypes.func.isRequired,
//   weatherState: PropTypes.object.isRequired
// };
