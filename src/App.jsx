import { useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [city, setCity] = useState("");
  const [response, setresponse] = useState("")

  const handleChange = (e) => {
    setCity(e.target.value);
  }

  const handleSearch = async () => {
    const api_key = import.meta.env.VITE_API_KEY;
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`)
      setresponse(response);
    }
    catch (err) {
      setCity("Error fetching data");
    }
  }

  return (
    <div className="container-fluid min-vh-100 vw-100 d-flex flex-column justify-content-center align-items-center bg-light pt-3">
      <h1 className="fw-bold text-primary ">Weather Report</h1>
      <div className="row">
        <div className="col-8"><input type="text" className="col-9 form-control" value={city} onChange={handleChange} placeholder="Enter city..." /></div>
        <div className="col-4"><button className="col-3 btn btn-primary w-100" onClick={handleSearch}>Search</button></div>
      </div>
      {response && <div className="card p-3 m-3 shadow-lg align-items-center gap-2 text-center" style={{ width: "fit-content" }}>
        <h2 className="text-center text-success">Weather in {response.data.name}</h2>
        <div className="d-flex flex-row justify-content-center align-items-center mb-3">
          <div className="d-flex flex-column align-items-center ">
            <img src={`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`} alt="Weather icon" width={125} className="me-4" />
            <p className="text-muted m-0 fw-semibold">{response.data.weather[0].main}</p>
          </div>
          <div className="d-flex flex-column">
            <h1 className="fw-bold">{response.data.main.temp}°C</h1>
            <h5 className="fw-semibold">Feels Like:{response.data.main.feels_like}</h5>
            <div className="d-flex flex-row"><p className="fw-semibold text-captilize">Description: {response.data.weather[0].description}</p></div>
          </div>
        </div>
        <div className="d-flex flex-row  flex-wrap gap-3 justify-content-center" style={{ maxWidth: "460px" }}>
          <div className="card p-3 d-flex align-items-center">
            <p className="m-0">Min temp</p>
            <p className="m-0">{response.data.main.temp_min}°C</p>
          </div>
          <div className="card p-3 d-flex align-items-center">
            <p className="m-0">Max temp</p>
            <p className="m-0">{response.data.main.temp_max}°C</p>
          </div>
          <div className="card p-3 d-flex align-items-center">
            <p className="m-0">Pressure</p>
            <p className="m-0">{response.data.main.pressure} hPa</p>
          </div>
          <div className="card p-3 d-flex align-items-center">
            <p className="m-0">Humidity</p>
            <p className="m-0">{response.data.main.humidity}%</p>
          </div>
          <div className="card p-3 d-flex align-items-center">
            <p className="m-0">Wind speed</p>
            <p className="m-0">{response.data.wind.speed} m/s</p>
          </div>
          <div className="card p-3 d-flex align-items-center">
            <p className="m-0">Wind direction</p>
            <p className="m-0">{response.data.wind.deg}°</p>
          </div>
          <div className="card p-3 d-flex align-items-center">
            <p className="m-0"> Wind gust speed</p>
            <p className="m-0">{response.data.wind.gust} m/s</p>
          </div>
        </div>
      </div>}
    </div >
  )
}

export default App;