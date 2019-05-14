import React from "react";
import {
  // StaticMap,
  Marker,
  InteractiveMap,
  NavigationControl
} from "react-map-gl";
// import PropTypes from "prop-types";
import MediaQuery from "react-responsive";
// import marker from "assets/img/map-marker.svg";
import { Card, CardBody } from "reactstrap";
import Pin from "./Pin";

export default function MapCard({ viewport, setViewport, markerCoords }) {
  return (
    <div style={{ display: "grid" }}>
      <MediaQuery maxWidth={500}>
        {matches => {
          if (matches) {
            return (
              <Card>
                <CardBody>
                  <InteractiveMap
                    {...viewport}
                    width="100%"
                    height="40vh"
                    onViewportChange={viewport => setViewport(viewport)}
                    mapStyle="mapbox://styles/redvelocity/cjumbtame019l1ft8zigwi1cd"
                    mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_KEY}
                  >
                    <div style={{ position: "absolute", right: 0 }}>
                      <NavigationControl
                        onViewportChange={viewport => setViewport(viewport)}
                      />
                    </div>
                    <Marker
                      className="marker"
                      latitude={markerCoords.coords.latitude}
                      longitude={markerCoords.coords.longitude}
                    >
                      <Pin size={30} />
                    </Marker>
                  </InteractiveMap>
                </CardBody>
              </Card>
              // <Card>
              //   <CardBody>
              //     <StaticMap
              //       width="100%"
              //       height="40vh"
              //       {...viewport}
              //       mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_KEY}
              //       mapStyle="mapbox://styles/redvelocity/cjumbtame019l1ft8zigwi1cd"
              //     >
              //       <Marker
              //         latitude={viewport.latitude}
              //         longitude={viewport.longitude}
              //         offsetLeft={-20}
              //         offsetTop={-10}
              //       >
              //         <img src={marker} alt="" />
              //       </Marker>
              //     </StaticMap>
              //   </CardBody>
              // </Card>
            );
          } else {
            return (
              <Card>
                <CardBody>
                  {/* <CardTitle className="lead">Map</CardTitle> */}
                  <InteractiveMap
                    {...viewport}
                    width="100%"
                    height="75vh"
                    onViewportChange={view_port => setViewport(view_port)}
                    mapStyle="mapbox://styles/redvelocity/cjumbtame019l1ft8zigwi1cd"
                    mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_KEY}
                  >
                    <div style={{ position: "absolute", right: 0 }}>
                      <NavigationControl
                        onViewportChange={view_port => setViewport(view_port)}
                      />
                    </div>
                    <Marker
                      latitude={markerCoords.coords.latitude}
                      longitude={markerCoords.coords.longitude}
                      // offsetLeft={-20}
                      // offsetTop={-10}
                    >
                      <Pin size={30} />
                    </Marker>
                  </InteractiveMap>
                </CardBody>
              </Card>
              // <Card>
              //   <CardBody>
              //     {/* <CardTitle className="lead">Map</CardTitle> */}
              //     {/* <hr /> */}
              //     <StaticMap
              //       width="100%"
              //       height="65vh"
              //       {...viewport}
              //       mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_KEY}
              //       mapStyle="mapbox://styles/redvelocity/cjumbtame019l1ft8zigwi1cd"
              //     >
              //       <Marker
              //         latitude={viewport.latitude}
              //         longitude={viewport.longitude}
              //         offsetLeft={-20}
              //         offsetTop={-10}
              //       >
              //         <img src={marker} alt="" />
              //       </Marker>
              //     </StaticMap>
              //   </CardBody>
              // </Card>
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
