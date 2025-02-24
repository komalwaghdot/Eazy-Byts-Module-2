import React, { useState, useEffect } from "react";
import axios from "axios";

const Details = () => {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    // Fetch stock data from backend
    axios.get("http://localhost:5000/api/stocks")
      .then((response) => {
        setStocks(response.data);
      })
      .catch((error) => console.error("Error fetching stock data:", error));
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Stock Market Trends</h2>
      {stocks.length === 0 ? (
           <p>Loading stock data...</p>
      ) : (
      <table> 
              <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Symbol</th>
            <th className="border px-4 py-2">Price</th>
            <th className="border px-4 py-2">Change</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock, index) => (
            <tr key={index} className="text-center">
              <td className="border px-4 py-2">{stock.symbol}</td>
              <td className="border px-4 py-2">${stock.price.toFixed(2)}</td>
              <td className={`border px-4 py-2 ${stock.change > 0 ? "text-green-600" : "text-red-600"}`}>
                {stock.change.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    
      </table>
      )}

      
    </div>
  );
};

export default Details;
