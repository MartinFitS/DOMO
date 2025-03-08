import React, { useState } from "react";
import { Slider } from "antd";
import "../assets/styles/home.css";
import "../assets/styles/devices.css";

const DeviceControl = ({ selectedDevice }) => {
  const [intensity, setIntensity] = useState(35);
  const [color, setColor] = useState("#ffffff");
  const [temperature, setTemperature] = useState(24);
  const [volume, setVolume] = useState(50);

  switch (selectedDevice) {
    case "light":
      return (
        <div className="device-control">
          <div className="light-container">
            <div className="light-circle">
              <div
                className="circle"
                style={{
                  background: "conic-gradient(red, orange, yellow, green, cyan, blue, purple, red)"
                }}
              >
                <div
                  className="light-overlay"
                  style={{ backgroundColor: color, opacity: intensity / 100 }}
                ></div>
                <p className="intensity">{intensity}%</p>
              </div>
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="color-picker"
                style={{ opacity: 0, position: 'absolute', width: '100%', height: '100%', cursor: 'pointer' }}
              />
            </div>
            <Slider
              className="intensity-slider"
              min={0}
              max={100}
              value={intensity}
              onChange={setIntensity}
            />
          </div>
        </div>
      );

    case "fan":
      return (
        <div className="device-control">
          <div className="circle fan">
            <p className="intensity">{temperature}°C</p>
          </div>
          <Slider
            className="intensity-slider"
            min={0}
            max={40}
            value={temperature}
            onChange={setTemperature}
          />
        </div>
      );

    case "speaker":
      return (
        <div className="device-control">
          <div className="circle speaker">
            <p className="intensity">{volume}%</p>
          </div>
          <Slider
            className="intensity-slider"
            min={0}
            max={100}
            value={volume}
            onChange={setVolume}
          />
        </div>
      );

    default:
      return null;
  }
};

export default DeviceControl;
