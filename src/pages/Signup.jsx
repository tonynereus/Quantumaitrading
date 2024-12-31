import { useState } from "react";
import Header from "../components/Header";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

export default () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhoneChange = (phone) => {
    setFormData({ ...formData, phone });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setMessage("");
    try {
      const response = await fetch("https://your-api-endpoint.com/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage("Sign-up successful! Welcome aboard.");
      } else {
        setMessage("An error occurred. Please try again.");
      }
    } catch (error) {
      setMessage("An error occurred. Please check your internet connection.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="w-100 bgf">
        <Header />
        <NavBar />
        <div className="w-100 bgf1 py-3 row m-0 justify-content-center text-white">
          <div className="col-11">
            <div className="w-100 row m-0 align-items-center">
              <div className="col-md-6 text-white">
                <h1 className="title">Embrace the Leap with Quantum AI</h1>
                <p className="pText mb-2">
                  Enhance your trading proficiency by aligning with the AI
                  Trading Platform – a platform transforming your trading
                  strategies with a data-centric approach. Complete the Quantum
                  AI Login form for exclusive access and embark on a journey
                  toward amplified profits and decision-making driven by data.
                </p>
              </div>
              <div className="col-md-6 px-1 text-white px-3">
                <div className="signinBox p-3">
                  <h3>Sign Up today</h3>
                  <div className="py-2">
                    <input
                      type="text"
                      name="firstName"
                      className="form-control"
                      placeholder="First Name"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="py-2">
                    <input
                      type="text"
                      name="lastName"
                      className="form-control"
                      placeholder="Last Name"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="py-2">
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Email address"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="py-2 mb-5">
                    <PhoneInput
                      country={"us"}
                      inputClass="w-100"
                      value={formData.phone}
                      onChange={handlePhoneChange}
                    />
                  </div>
                  <div className="mb-5">
                    <button
                      className="btn bgFrag w-100"
                      onClick={handleSubmit}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <img
                          src="/loading.gif"
                          alt="Loading"
                          style={{ height: 20 }}
                        />
                      ) : (
                        "Sign Up"
                      )}
                    </button>
                  </div>
                  {message && (
                    <div className="alert alert-info text-center">{message}</div>
                  )}
                  <div className="d-flex gap-3">
                    <div
                      className="bg-white"
                      style={{
                        height: 50,
                        width: 6,
                        borderRadius: 14,
                      }}
                    ></div>
                    <div>
                      By creating an account, you are agreeing to our{" "}
                      <span className="textFrag">Terms of Use</span> and{" "}
                      <span className="textFrag">Privacy Policy</span>.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};