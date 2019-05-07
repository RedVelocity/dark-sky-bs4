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
    <div style={{ display: "grid" }}>
      <MediaQuery maxWidth={500}>
        {matches => {
          if (matches) {
            return (
              // <InteractiveMap
              //   {...weatherState.viewport}
              //   width="85vw"
              //   height="80vh"
              //   onViewportChange={viewport => setViewport(viewport)}
              //   mapStyle="mapbox://styles/redvelocity/cjumbtame019l1ft8zigwi1cd"
              //   mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_KEY}
              // >
              //   <div style={{ position: "absolute", right: 0 }}>
              //     <NavigationControl
              //       onViewportChange={viewport => setViewport(viewport)}
              //     />
              //   </div>
              //   <Marker
              //     latitude={weatherState.weather.latitude}
              //     longitude={weatherState.weather.longitude}
              //     // offsetLeft={-20}
              //     // offsetTop={-10}
              //   >
              //     <img src={marker} alt="" />
              //   </Marker>
              // </InteractiveMap>
              <Card>
                <CardBody>
                  <CardTitle className="lead">Map</CardTitle>
                  <hr />
                  <StaticMap
                    width="100%"
                    height="50vh"
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
          } else {
            return (
              // <InteractiveMap
              //   {...weatherState.viewport}
              //   width="70vw"
              //   height="75vh"
              //   onViewportChange={viewport => setViewport(viewport)}
              //   mapStyle="mapbox://styles/redvelocity/cjumbtame019l1ft8zigwi1cd"
              //   mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_KEY}
              // >
              //   <div style={{ position: "absolute", right: 0 }}>
              //     <NavigationControl
              //       onViewportChange={viewport => setViewport(viewport)}
              //     />
              //   </div>
              //   <Marker
              //     latitude={weatherState.weather.latitude}
              //     longitude={weatherState.weather.longitude}
              //     offsetLeft={-18}
              //     offsetTop={-25}
              //   >
              //     <img src={marker} alt="" />
              //   </Marker>
              // </InteractiveMap>
              <Card>
                <CardBody>
                  <CardTitle className="lead">Map</CardTitle>
                  <hr />
                  <StaticMap
                    width="100%"
                    height="65vh"
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
        }}
      </MediaQuery>
    </div>
  );
}

// MapCard.propTypes = {
//   setViewport: PropTypes.func.isRequired,
//   weatherState: PropTypes.object.isRequired
// };
