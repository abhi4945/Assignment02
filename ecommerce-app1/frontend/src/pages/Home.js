import { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  }, []);

  const addToCart = (product) => {
    axios.post("http://localhost:5000/api/cart/add", product);
    alert("Added to cart");
  };

  return (
    <div style={{
      padding: "40px 20px",
      maxWidth: "1200px",
      margin: "auto"
    }}>
      <h2 style={{
        textAlign: "center",
        marginBottom: "30px",
        fontSize: "28px"
      }}>
        🛒 Products
      </h2>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "30px"
      }}>
        {products.map(p => (
          <div key={p._id} style={{
            background: "#fff",
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
            transition: "0.3s",
            textAlign: "center"
          }}
          onMouseEnter={e => e.currentTarget.style.transform = "translateY(-5px)"}
          onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
          >

            {/* IMAGE CONTAINER (IMPORTANT FIX) */}
            <div style={{
              width: "100%",
              height: "200px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#f9f9f9"
            }}>
              <img
                src={p.image}
                alt={p.name}
                style={{
                  maxWidth: "90%",
                  maxHeight: "90%",
                  objectFit: "contain"
                }}
              />
            </div>

            {/* CONTENT */}
            <div style={{ padding: "20px" }}>
              <h3 style={{ marginBottom: "10px" }}>{p.name}</h3>

              <p style={{
                color: "green",
                fontWeight: "bold",
                fontSize: "18px"
              }}>
                ₹{p.price}
              </p>

              <button
                onClick={() => addToCart(p)}
                style={{
                  marginTop: "12px",
                  padding: "10px 20px",
                  background: "black",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer"
                }}
              >
                Add to Cart
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;