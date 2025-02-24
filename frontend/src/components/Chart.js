import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

const Chart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    socket.on("stockUpdate", (stockData) => {
      setData((prevData) => [...prevData, { time: new Date().toLocaleTimeString(), price: stockData.price }]);
      if (data.length > 10) {
        setData((prevData) => prevData.slice(1));
      }
    });

    return () => socket.off("stockUpdate");
  }, [data]);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-2 bg-blue">Stock Price Trend</h2>
      <ResponsiveContainer width="100%" height={300} >
        <LineChart data={data}>
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <CartesianGrid stroke="#ccc" />
          <Line type="monotone" dataKey="price" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
