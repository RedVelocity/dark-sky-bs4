import React from "react";
import moment from "moment";
import { Line } from "react-chartjs-2";
// import Media from 'react-media';
// import MediaQuery from "react-responsive";
import { Card, CardHeader, CardBody, CardTitle, Col } from "reactstrap";

function WeatherChart({ daily }) {
  //Chart Data
  const dailyWeather = daily.data;
  const chartData = {
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
            (daily.apparentTemperatureHigh + daily.apparentTemperatureLow) / 2
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

  const chartOptions = {
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
  return (
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
  );
}

export default WeatherChart;
