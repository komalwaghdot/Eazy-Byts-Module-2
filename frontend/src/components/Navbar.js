import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
 



const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");  // Clear authentication token
    navigate("/login");  // Redirect to login page
  };



  return (
    <nav className="bg-primary text-white">
      <div className="container mx-auto flex justify-between">
        <h1 className="text-xl font-bold"  style={{ color: "black", backgroundColor: "yellow",padding:"10px" }}>    Stock  Market Dashboard  </h1>
        
        <div  className="nav-div ">
          <Link to="/" style={{ color: "white", textDecoration: "none" }} className="mx-2">Home</Link>
          <Link to="/stocks" style={{ color: "white", textDecoration: "none" }} className="mr-4 ">Stocks</Link>
          <Link to="/portfolio" style={{ color: "white", textDecoration: "none" }} className="mx-2">Portfolio</Link>
          <Link to="/api/details" style={{ color: "white", textDecoration: "none" }} className="mx-2">Details </Link>
          <button onClick={handleLogout} style={{ color: "white", textDecoration: "none" }} className="btn btn-primary">Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
