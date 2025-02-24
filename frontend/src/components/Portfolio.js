import { useEffect, useState } from "react";
import axios from "axios";

const Portfolio = ({ userId }) => {
  const [portfolio, setPortfolio] = useState([]);
  const [symbol, setSymbol] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [buyPrice, setBuyPrice] = useState(0);

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/portfolio/${userId}`);
      setPortfolio(response.data.stocks || []);
    } catch (error) {
      console.error("Error fetching portfolio:", error);
    }
  };

  const buyStock = async () => {
    try { 
      await axios.post("http://localhost:5000/api/portfolio/buy", {
        userId,
        symbol,
        quantity: Number(quantity),
        buyPrice: Number(buyPrice),
      });
      fetchPortfolio();
    } catch (error) {
      console.error("Error buying stock:", error);
    }
  };

  const sellStock = async (symbol, quantity) => {
    try {
      await axios.post("http://localhost:5000/api/portfolio/sell", {
        userId,
        symbol,
        quantity: Number(quantity),
      });
      fetchPortfolio();
    } catch (error) {
      console.error("Error selling stock:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold">My Portfolio</h2>

      <div className="mb-4">
        <label className="block mb-1">Stock Symbol:</label>
        <input type="text" placeholder="Enter Stock Symbol" onChange={(e) => setSymbol(e.target.value)} className="border p-2" /><br></br><br></br>
        <label className="block mb-1">Quantity:</label>
        <input type="number" placeholder="Enter Quantity" onChange={(e) => setQuantity(e.target.value)} className="border p-2 mx-2" /><br></br><br></br>
        <label className="block mb-1">Buy price:</label>
        <input type="number" placeholder=" Enter Buy Price" onChange={(e) => setBuyPrice(e.target.value)} className="border p-2 mx-2" /><br></br><br></br>
        <button onClick={buyStock} className="bg-green-500 text-white p-2">Buy</button>
      </div>

      <ul>
        {portfolio.map(stock => (
          <li key={stock.symbol} className="border p-2 my-2 flex justify-between">
            {stock.symbol} - {stock.quantity} shares @ ${stock.buyPrice}
            <button onClick={() => sellStock(stock.symbol, 1)} className="bg-red-500 text-white p-2">Sell 1</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Portfolio;
