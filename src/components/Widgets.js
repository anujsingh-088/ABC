import React, { useState, useEffect } from "react";
import axios from "axios";
import Widget from "./widgets-container/Widget";
import {
  HOME,
  GET_BUYER,
  GET_INCOME,
  GET_HIGHLIGHT,
  GET_COUNTRY,
} from "../common/Api";
import { BUYERS, HIGHLIGHT, COUNTRIES, INCOME } from "../common/Constants";

const Widgets = () => {
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    const data = [];
    (async () => {
      const highlight = await axios.get(HOME + GET_HIGHLIGHT);
      if (highlight?.status === 200)
        data.push({
          name: HIGHLIGHT,
          apiUrl: HOME + GET_HIGHLIGHT,
          ...highlight?.data?.data,
        });

      const buyer = await axios.get(HOME + GET_BUYER);
      if (buyer?.status === 200)
        data.push({
          name: BUYERS,
          apiUrl: HOME + GET_BUYER,
          ...buyer?.data?.data,
        });

      const country = await axios.get(HOME + GET_COUNTRY);
      if (country?.status === 200)
        data.push({
          name: COUNTRIES,
          apiUrl: HOME + GET_COUNTRY,
          ...country?.data?.data,
        });

      const income = await axios.get(HOME + GET_INCOME);
      if (income?.status === 200)
        data.push({
          name: INCOME,
          apiUrl: HOME + GET_INCOME,
          ...income?.data?.data,
        });

      setAllData(data);
    })();
  }, []);

  return (
    <div>
      {allData.map((data, index) => {
        return (
          <Widget
            key={index}
            apiUrl={data?.apiUrl}
            name={data?.name}
            canvasData={data?.dataSet}
            stats={data?.stats}
            filter={data?.filter}
          />
        );
      })}
    </div>
  );
};

export default Widgets;
