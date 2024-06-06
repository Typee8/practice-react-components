import React from "react";
import { createRoot } from "react-dom/client";

const root = createRoot(document.querySelector("#root"));

class Weather extends React.Component {
  state = {
    data: null,
  };
  constructor(props) {
    super(props)
    this.APIkey = "ddf7d1e85e1c468b8595edc33a4f75d8";
  }

  async componentDidMount() {
    const { temp, clouds, description } = await this.fetchWeatherData();
    this.setState({
      data: {
        temp,
        clouds,
        description,
      },
    });
  }

  async fetchWeatherData() {
    const { lat, lng } = this.props;
    const url = `https://api.weatherbit.io/v2.0/current?key=${this.APIkey}&lat=${lat}&lon=${lng}&lang=pl`;

    const response = await fetch(url);

    if (response.ok) {
      const responseObj = await response.json();
      const data = responseObj.data[0];

      const { temp, clouds } = data;
      const { description } = data.weather;

      return { temp, clouds, description };
    } else {
      throw new Error(`Server responded with: ${response.status} status`);
    }
  }

  render() {
    const { data } = this.state;

    if (data) {
      const { temp, clouds, description } = data;
      return (
        <h1>
          Temperatura: {temp} °C, Pogoda: {description}, Chmury: {clouds}
        </h1>
      );
    }

    return null;
  }
}

root.render(<Weather lat={50.061389} lng={19.938333} />);
