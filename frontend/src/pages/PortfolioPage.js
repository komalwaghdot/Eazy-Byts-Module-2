import Portfolio from "../components/Portfolio.js";

const PortfolioPage = () => {
  const userId = "123"; // Replace with actual user ID logic

  return (
    <div>
      <Portfolio userId={userId} />
    </div>
  );
};

export default PortfolioPage;
