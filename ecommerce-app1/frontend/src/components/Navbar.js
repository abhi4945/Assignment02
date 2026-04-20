import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div style={{
      background: "linear-gradient(135deg, #000, #222)",
      padding: "15px 30px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      color: "white",
      boxShadow: "0 2px 10px rgba(0,0,0,0.3)"
    }}>
      <h2>🛒 GadgetZone</h2>

      <div>
        <Link to="/" style={{
          color: "white",
          margin: "10px",
          textDecoration: "none"
        }}>Home</Link>

        <Link to="/cart" style={{
          color: "white",
          margin: "10px",
          textDecoration: "none"
        }}>Cart</Link>
      </div>
    </div>
  );
}

export default Navbar;