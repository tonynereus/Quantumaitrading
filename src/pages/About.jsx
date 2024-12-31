import Header from "../components/Header";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";


export default () => {
    return (
        <>
            <div className="w-100 bgf">
                <Header />
                <NavBar />
                <div className="w-100 bgf1 py-3 row m-0 justify-content-center text-white">
                    <div className="w-100 row m-0 justify-content-center text-white">
                        <div className="col-11">
                            <div className="py- w-100 row m-0 justify-content-center">
                                <div>
                                    <p className="textFrag mt-4">
                                        <b>
                                            OUR MISSION
                                        </b>
                                    </p>
                                    <h1>
                                        Welcome to QuantumAI
                                    </h1>

                                </div>
                                <p className="pText">
                                    Welcome to QuantumAI, the forefront of groundbreaking trading technology envisioned by Elon Musk. QuantumAI represents a fusion of Musk’s innovative mindset and cutting-edge artificial intelligence, creating a platform that transcends traditional trading boundaries.
                                </p>
                                <p className="pText">
                                    At QuantumAI, our mission is to democratize access to the financial markets. We strive to empower individuals worldwide, providing a user-friendly platform that combines real-time market insights with seamless automation. Musk’s vision of a technologically advanced and accessible trading experience is at the core of QuantumAI’s philosophy.
                                </p>
                                <p className="pText">
                                    Join us on this revolutionary journey as we redefine the future of trading. QuantumAI is not just a platform; it’s a testament to the limitless possibilities when visionary leadership meets state-of-the-art technology. Trade with confidence, trade with QuantumAI.
                                </p>
                                
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />

            </div>
        </>
    )
}