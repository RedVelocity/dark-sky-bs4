import React from "react";
import moment from "moment";
import { Line } from "react-chartjs-2";
// import Media from 'react-media';
import MediaQuery from "react-responsive";
import { Card, CardHeader, CardBody, CardTitle } from "reactstrap";

function WeatherChart({ daily }) {
  //Chart Data
  const dailyWeather = daily.data;
  const summary = daily.summary;
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
        borderColor: "#7F96FF",
        backgroundColor: "#7F96FF",
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
        borderColor: "#E56399",
        backgroundColor: "#E56399",
        pointRadius: 0,
        pointHoverRadius: 0,
        borderWidth: 3
      },
      {
        label: "High",
        data: dailyWeather.map(daily =>
          Math.round(daily.apparentTemperatureHigh)
        ),
        borderColor: "#4B186A",
        backgroundColor: "#4B186A",
        pointRadius: 0,
        pointHoverRadius: 0,
        borderWidth: 3
      }
    ]
  };

  const chartOptions = {
    maintainAspectRatio: false,
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
    <MediaQuery maxWidth={500}>
      {matches => {
        if (matches) {
          return (
            <Card>
              <CardHeader>
                <CardTitle className="lead">Through The Week</CardTitle>
                <p className="card-category">{summary}</p>
              </CardHeader>
              <CardBody>
                <Line
                  data={chartData}
                  options={chartOptions}
                  width={200}
                  height={180}
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
          );
        } else {
          return (
            <Card>
              <CardHeader>
                <CardTitle className="lead">Through The Week</CardTitle>
                <p className="card-category">{summary}</p>
              </CardHeader>
              <CardBody>
                <Line
                  // maintainAspectRatio={false}
                  data={chartData}
                  options={chartOptions}
                  width={400}
                  height={180}
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
          );
        }
      }}
    </MediaQuery>
  );
}

export default WeatherChart;
