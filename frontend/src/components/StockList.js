import { useEffect, useState } from "react";
import axios from "axios";

const StockList = () => {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await axios.get("https://api.coingecko.com/api/v3/coins/markets", {
          params: { vs_currency: "usd", order: "market_cap_desc", per_page: 5 }
        });
        setStocks(response.data);
      } catch (error) {
        console.error("Error fetching stock data:", error);
      }
    };

    fetchStocks();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold">Top Stocks</h2>
      <ul>
        {stocks.map(stock => (
          <li key={stock.id} className="border p-2 my-2">
            {stock.name} - ${stock.current_price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StockList;
