import { useState } from "react";
import axios from "axios";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔴 VALIDATION
    if (!form.email || !form.password) {
      setError("All fields are required");
      return;
    }

    if (!form.email.includes("@")) {
      setError("Enter valid email");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    /****Call API  to check user available using login******/
    try {
      const res = await axios.post(
        "https://assignment02-itrm.onrender.com/api/auth/login",
        form
      );

      //store token
      localStorage.setItem("token", res.data.token);

      alert("Login successful");

      // redirect to Home page
      window.location.href = "/Home";

    } catch (err) {
      setError(err.response?.data || "Login failed");
    }
  };

  return (
    <div style={{
      maxWidth: "400px",
      margin: "80px auto",
      padding: "40px",
      background: "white",
      borderRadius: "10px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
    }}>
      <h2 style={{ textAlign: "center" }}>Login</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

 {/* SHOW SIGNUP BUTTON IF USER NOT FOUND */}
          {error.includes("User not found") && (
            <button
              onClick={() => window.location.href = "/signup"}
              style={{
                marginTop: "8px",
                padding: "8px 12px",
                background: "green",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer"
              }}
            >
              Go to Sign Up
            </button>
          )}

      <form onSubmit={handleSubmit} style={{marginLeft:'-20px'}}>
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={form.email}
          onChange={handleChange}
          style={{ width: "100%", padding: "10px", margin: "10px 0" }}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          style={{ width: "100%", padding: "10px", margin: "10px 0" }}
        />

        <button style={{
          width: "100%",
          padding: "10px",
          background: "black",
          color: "white",
          border: "none",
          margin: "10px 0",
          marginLeft:'10px'
        }}>
          Login
        </button>
      </form>
       <p style={{ textAlign: "center", marginTop: "10px" }}>
        Don't have an account?{" "}
        <span
          onClick={() => window.location.href = "/signup"}
          style={{ color: "blue", cursor: "pointer" }}
        >
          Sign Up
        </span>
      </p>
    </div>
  );
}
export default Login;