import { useContext, useState } from "react";
import Header from "../components/Header";;
import "react-phone-input-2/lib/style.css";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { Spin } from "antd";
import { useNavigate } from "react-router-dom";
import apis from "../assets/apis";
import AppContext from "../context/AppContext";

export default () => {
    const [formData, setFormData] = useState({
        email: "",
        pswd: "",
    });

    const { setLogin } = useContext(AppContext);

    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const nav = useNavigate();
    const handleSubmit = async () => {
        setIsLoading(true);
        setMessage("");
        try {
            const response = await fetch(apis.signin, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const resu = await response.json();
                setLogin(resu.data, resu.token);
                console.log({ token: resu.token, data: resu.data })
                alert("Sign-in successful! Welcome aboard.");
                nav("/dashboard");
            } else {
                const res = await response.json();
                if (res.message) {
                    setMessage(res.message);
                } else {
                    throw new Error("Sign up error");
                }

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
                                    <h3>Sign In</h3>
                                    <div className="py-2">
                                        <input
                                            type="email"
                                            name="email"
                                            className="form-control"
                                            placeholder="Email address"
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="py-2 mb-4">
                                        <input
                                            type="password"
                                            name="pswd"
                                            className="form-control"
                                            placeholder="Password"
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div className="mb-5">
                                        <button
                                            className="btn bgFrag w-100"
                                            onClick={handleSubmit}
                                            disabled={isLoading}
                                        >
                                            {isLoading ? (
                                                <Spin size="small" />
                                            ) : (
                                                "Sign In"
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
                                            Login to your  account, go through our{" "}
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
