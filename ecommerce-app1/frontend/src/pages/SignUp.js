import { useState } from "react";
import axios from "axios";

function Signup() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setMsg("");

    // validation
    if (!form.email || !form.password) {
      setError("All fields are required");
      return;
    }

    if (!form.email.includes("@")) {
      setError("Invalid email");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    /****Call API  to add user into table******/
    try {
      const res = await axios.post(
        "https://assignment02-itrm.onrender.com/api/auth/signup",
        form
      );

      console.log(res)

      setMsg("Signup successful! Redirecting to login...");

      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);

    } catch (err) {
      setError(err.response?.data || "Signup failed");
    }
  };

  return (
    <div style={{
      maxWidth: "400px",
      margin: "80px auto",
      padding: "30px",
      background: "white",
      borderRadius: "10px",
      boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
    }}>
      <h2 style={{ textAlign: "center" }}>Sign Up</h2>

      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      {msg && <p style={{ color: "green", textAlign: "center" }}>{msg}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          onChange={handleChange}
          style={{ width: "100%", padding: "10px", margin: "10px 0" }}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          onChange={handleChange}
          style={{ width: "100%", padding: "10px", margin: "10px 0" }}
        />

        <button style={{
          width: "100%",
          padding: "10px",
          background: "green",
          color: "white",
          border: "none",
          borderRadius: "5px"
        }}>
          Sign Up
        </button>
      </form>

      <p style={{ textAlign: "center", marginTop: "10px" }}>
        Already have an account?{" "}
        <span
          onClick={() => window.location.href = "/"}
          style={{ color: "blue", cursor: "pointer" }}
        >
          Login
        </span>
      </p>
    </div>
  );
}

export default Signup;