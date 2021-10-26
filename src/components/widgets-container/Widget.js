import React, { useState, useEffect } from "react";
import "./Widget.css";
const Widget = ({ apiUrl, name, canvasData, stats, filter }) => {
  const [chart, setChart] = useState(canvasData || []);

  const maxMin = (e) => {
    const target = e.target.closest(".widget"),
      a = target.classList.contains("max");
    [...document.getElementsByClassName("widget")].forEach((t) =>
      t.classList[a ? "remove" : "add"]("hidden-widget")
    );
    target.classList.toggle("max");
    target.classList.remove("hidden-widget");
    const icon = e.target.closest("header").querySelector(".fa");
    icon.classList.toggle("fa-arrows-alt");
    icon.classList.toggle("fa-minus");
  };

  const sortOption = (e) => {
    const chartData = chart?.data;
    if (e.target.value === "value") {
      chartData.sort((a, b) => {
        if (a.value < b.value) return 1;
        if (a.value > b.value) return -1;
        return 0;
      });
    } else if (e.target.value === "label") {
      chartData.sort((a, b) => {
        if (a.label > b.label) return 1;
        if (a.label < b.label) return -1;
        return 0;
      });
    }
    setChart({ ...chart, data: chartData });
  };

  useEffect(() => {
    const chartData = canvasData?.data;
    chartData.sort((a, b) => {
      if (a.label > b.label) return 1;
      if (a.label < b.label) return -1;
      return 0;
    });
    setChart({ ...canvasData, data: chartData });
  }, [canvasData]);

  return (
    <div className="widget">
      <header>
        <h3>{name}</h3>
        <select
          name="sort-option"
          onChange={sortOption}
          className="sort-option form-select"
        >
          {Object.keys(filter).map((item, index) => (
            <option key={index} value={item}>
              sort by {item}
            </option>
          ))}
        </select>
        <div className="btn btn-primary max-min" onClick={maxMin}>
          <i className="fa fa-arrows-alt"></i>
        </div>
      </header>
      <div className="chart">
        <div className="controls">
          <nav>
            <a href="void(0)">{filter?.label}</a>
          </nav>
          <div>
            <span>{filter?.value}%</span>
          </div>
        </div>
        <div className="canvas-container">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                {chart?.header.map((value, index) => {
                  return <th key={index}>{value}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              {chart?.data.map((value, index) => {
                return (
                  <tr key={index} style={{ color: value?.color }}>
                    <td>{value?.label}</td>
                    <td>{value?.value}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="info">
        <h4>Stats:</h4>
        {Object.values(stats).map((stat, index) => {
          return (
            <div className="info-module" key={index}>
              <div className="heading">
                <span>{stat?.label}</span>
                <span>{stat?.value}%</span>
              </div>
              <div className={`progress atib-` + Number(index + 1)}>
                <div
                  className="actual-progress"
                  style={{ width: stat?.value + "%" }}
                ></div>
              </div>
            </div>
          );
        })}
        <nav>
          <a href={apiUrl} target="_blank" rel="noreferrer">
            <span>View API</span>
            <span className="fa fa-arrow-right fa-lg"></span>
          </a>
        </nav>
      </div>
    </div>
  );
};

export default Widget;
