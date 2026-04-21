import { useEffect, useState } from "react";
import axios from "axios";

function Cart() {
  const [cart, setCart] = useState([]);

  /******fetch added product list from API*******/
  useEffect(() => {
    axios.get("https://assignment02-itrm.onrender.com/api/cart")
      .then(res => setCart(res.data))
      .catch(err => console.log(err));
  }, []);

  /*****Remove product from cart*****/
  const RemoveFromCart = (product) => {
    const cartList = cart.filter(item => item._id !== product)
    setCart(cartList)
    axios.delete(`https://assignment02-itrm.onrender.com/api/cart/${product}`)
      .then(res => {
        if (res.status === 200) {
          alert("Remove from cart successfuly")
        }
        else {
          alert("Remove from cart unsuccessfuly")
        }
      })
      .catch(err => console.log(err));
  };

  // Calculate total
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div style={{
      maxWidth: "1000px",
      margin: "auto",
      padding: "30px"
    }}>
      <h2 style={{ marginBottom: "20px" }}>🛒 Your Cart</h2>

      {cart.length === 0 ? (
        <h3>Your cart is empty</h3>
      ) : (
        <>
          {/* CART ITEMS */}
          {cart.map(item => (
            <div key={item._id} style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "white",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "10px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
            }}>
              {/* IMAGE */}
              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: "100px",
                  height: "80px",
                  objectFit: "contain"
                }}
              />

              {/* NAME */}
              <h3 style={{ flex: 1, marginLeft: "20px" }}>
                {item.name}
              </h3>

              {/* PRICE */}
              <p style={{
                color: "green",
                fontWeight: "bold",
                marginRight: "20px"
              }}>
                ₹{item.price}
              </p>

              {/* REMOVE BUTTON */}
              <button
                style={{
                  background: "red",
                  color: "white",
                  border: "none",
                  padding: "8px 12px",
                  borderRadius: "5px",
                  cursor: "pointer"
                }}
                onClick={() => RemoveFromCart(item._id)}
              >
                Remove
              </button>
            </div>
          ))}

          {/* TOTAL SECTION */}
          <div style={{
            background: "white",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            marginTop: "20px",
            textAlign: "right"
          }}>
            <h3>Total: ₹{total}</h3>

            <button style={{
              marginTop: "10px",
              padding: "12px 25px",
              background: "black",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer"
            }}>
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;