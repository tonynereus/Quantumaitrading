import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "../components/Header";
import Logo from "../svgs/Logo.svg";
import ana from "../svgs/ana.svg";
import bars from "../svgs/bars.svg";
import dot from "../svgs/dot.svg";
import star from "../svgs/star.svg";
import briefcase from "../svgs/briefcase.svg";
import muscle from "../svgs/muscle.svg";
import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import bgImage from "../assets/elon.webp";
import phone from "../assets/phone.webp";
import laptop from "../assets/laptop.webp";

import staff1 from "../assets/1-1.webp";
import staff2 from "../assets/2-1.webp";
import staff3 from "../assets/3-1.webp";
import staff4 from "../assets/4.webp";
import staff5 from "../assets/5.webp";
import staff6 from "../assets/6.webp";
import banner from "../assets/4-1.webp";


import innovation from "../assets/banner.webp";
import Footer from "../components/Footer";


export default () => {

    const KeyFeatures = ({ icon, title, body }) => {
        return (
            <div className="col-md-4 p-3">
                <h4 className="d-flex gap-2">
                    <img src={icon} width={30} />
                    <span>{title}</span>
                </h4>
                <p>
                    {body}
                </p>
            </div>
        )
    }

    const Staffs = ({ image, title, body, name, role }) => {
        return (
            <div className="col-md-4 p-3">
                <div className="w-100 signinBox p-3">
                    <div>
                        <span className="uag-star">★</span>
                        <span class="uag-star">★</span>
                        <span className="uag-star">★</span>
                        <span className="uag-star">★</span>
                        <span className="uag-star">★</span>
                    </div>
                    <div><strong>{title}</strong></div>
                    <p className="mb-2">{body}</p>
                    <div className="d-flex gap-3">
                        <img src={image} width={35} height={35} />
                        <div>
                            <div>{name}</div>
                            <div>{role}</div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }

    const RenderFaq = ({ title, text }) => {
        return (
            <div className="mb-3">
                <h4>
                    {title}
                </h4>
                <p>
                    {text}
                </p>
            </div>
        )
    }
    const faqs1 = [
        {
            title: "1. How can I start trading on Elon Musk trading platform, QuantumAI?",
            text: "To begin trading, visit our website, click on the “Sign Up” button, and follow the simple registration process. Once registered, you can start exploring the features of QuantumAI"
        },
        {
            title: "2. What assets are available for trading on QuantumAI?",
            text: "QuantumAI offers a diverse range of trading assets, including cryptocurrencies, stocks, and commodities, providing users with various options to build their investment portfolios."
        },
        {
            title: "3. Is QuantumAI available as a mobile app?",
            text: "Yes, QuantumAI is available as a mobile application for both iOS and Android devices. You can download it from the respective app stores and trade on the go."
        },
        {
            title: "4. How secure is my personal information on QuantumAI?",
            text: "We take security seriously. QuantumAI employs advanced encryption and follows stringent privacy measures to safeguard your personal information."
        }

    ]
    const faqs2 = [
        {
            title: "5. Are there any fees associated with using QuantumAI?",
            text: "QuantumAI is transparent about its fee structure. While certain transactions may have associated costs, we provide a clear breakdown of fees to keep users informed."
        },
        {
            title: "6. Can I automate my trades using Elon Musk Trading Platform?",
            text: "Certainly. QuantumAI offers automated trading features, allowing users to implement predefined strategies and execute trades automatically."
        },
        {
            title: "7. How can I reach customer support if I encounter issues?",
            text: "If you face any issues or have inquiries, our customer support team is available through the platform. They are dedicated to providing prompt assistance."
        },
        {
            title: "8. Is QuantumAI suitable for beginners in trading?",
            text: "Yes, QuantumAI caters to users of all experience levels. We offer educational resources, a user-friendly interface, and support to help beginners navigate the trading world with confidence."
        },
    ]
    const staffData = [
        {
            image: staff1,
            title: "Super Support Heroes",
            body: `“Shoutout to the support team—they’re like trading superheroes! 🤝 Always there when I need them, with quick and helpful responses. Boosts my confidence big time.”`,
            name: "Luca Romano",
            role: "Developer"
        },
        {
            image: staff6,
            title: "Transparent and Trustworthy",
            body: `“I love the transparency here. No hidden fees, no surprises. Everything’s laid out clearly, making it easy to trust the platform with my trades and investments.”`,
            name: "Marco Kapoor",
            role: "Designer"
        },
        {
            image: staff3,
            title: "Innovative Features Thrill",
            body: `“Elon’s platform keeps surprising me with cool features! From automated trading to real-time alerts, it’s like they’re always a step ahead. Trading here feels like an adventure! 🌟💸”`,
            name: "Elena Petrova",
            role: "Freelancer"
        },
        {
            image: staff4,
            title: "Smart Genius at Work",
            body: `“The artificial intelligence on this platform is just genius! It guides you where to go, like having a smart trading buddy by your side. Impressive stuff! ❤️‍🔥❤️‍🔥❤️‍🔥”`,
            name: "Emma Fischer",
            role: "Business owner"
        },
        {
            image: staff5,
            title: "Simplified Trading Magic",
            body: `“Elon Musk trading platform is pure magic! 🪄 It’s so simple to use, even for a beginner like me. I feel like a seasoned trader without the headache!”`,
            name: "Sebastian Weber",
            role: "Marketing Coordinator"
        },
        {
            image: staff2,
            title: "Reliability Unleashed",
            body: `“This platform is my go-to for reliability. It works like a charm, even during crazy market times. No interruptions, just smooth sailing for my trades!”`,
            name: "Meera Choudhury",
            role: "Marketer"
        },
    ]
    const features = [
        {
            icon: ana,
            title: "Advanced Algorithmic Trading",
            body: "Our AI trading platform employs sophisticated algorithms that analyze market data in real-time, enabling precise and data-driven decision-making. This advanced approach helps optimize trading strategies and adapt to dynamic market conditions."
        },
        {
            icon: bars,
            title: "Predictive Analytics",
            body: "Leveraging machine learning, our platform predicts market trends and potential price movements based on historical data and current market conditions. This predictive analytics feature empowers traders with valuable insights to make informed decisions."
        },
        {
            icon: muscle,
            title: "Automated Execution",
            body: "Experience hands-free trading with our automated execution feature. The platform can automatically execute trades based on predefined criteria, eliminating the need for manual intervention. This ensures timely responses to market fluctuations and enhances overall efficiency."
        },
        {
            icon: dot,
            title: "Risk Management Tools",
            body: "Elon Musk Trading Platform includes robust risk management tools that assess and mitigate potential risks. These tools can set stop-loss limits, control leverage, and dynamically adjust trading parameters to protect investments and optimize overall portfolio performance."
        },
        {
            icon: briefcase,
            title: "Multi-Asset Support",
            body: "Diversify your portfolio effortlessly with multi-asset support. Our platform accommodates various financial instruments, including stocks, cryptocurrencies, commodities, and forex, providing users with the flexibility to explore diverse investment opportunities within a unified interface."
        },
        {
            icon: star,
            title: "User-Friendly Interface",
            body: "Accessible to both novice and experienced traders, Elon Musk trading platform features an intuitive and user-friendly interface. Real-time analytics, customizable dashboards, and easy navigation contribute to a seamless trading experience, ensuring users can focus on making strategic decisions rather than grappling with complex interfaces."
        }
    ]

    return (
        <>
            <div className="w-100 bgf">
                <Header />
                <div className="w-100 row m-0 justify-content-center">
                    <div className="col-11">
                        <div className="py-2 w-100">
                            <div className="mb-3 w-100 row m-0 d-flex justify-content-between align-items-center">
                                <div className="col-6 col-md-4 col-lg-3">
                                    <img
                                        src={Logo}
                                        className="img-fluid"
                                        style={{ width: '100%' }}
                                    />
                                </div>
                                <div className="col-6 col-md-4 col-lg-3 justify-content-end d-flex">
                                    <div className="d-md-flex gap-3 d-none">
                                        <div className="btn text-white">Login</div>
                                        <div className="btn bgFrag">Sign Up</div>
                                    </div>
                                    <div className="d-flex gap-3 d-md-none">
                                        <FontAwesomeIcon icon={faBars} color="#ccc" />
                                    </div>
                                </div>
                            </div>

                            <div className="w-100 row m-0">
                                <div className="col-md-6 text-white">
                                    <h1 className="title">
                                        Transforming Finance: Exploring Elon Musk’s Trading Platform
                                    </h1>
                                    <p className="pText mb-2">
                                        Revolutionizing the realm of digital trading, Quantum AI stands out as a premier global cryptocurrency platform. With its provision of up-to-the-minute market data, sophisticated technical instruments, and smooth automation, the Trading Platform enables users to confidently explore the ever-changing domain of cryptocurrencies. Keep abreast of the latest developments and acquire invaluable insights into this transformative financial era.
                                    </p>
                                    <p className="pText">
                                        Partake in the Elon Musk Trading Platform for a revolutionary journey into the realm of cryptocurrency trading <br />
                                        <span className="uag-star">★</span>
                                        <span class="uag-star">★</span>
                                        <span className="uag-star">★</span>
                                        <span className="uag-star">★</span>
                                        <span className="uag-star">★</span>
                                    </p>
                                    <p>
                                        Rated <b>4.81</b> stars by over <b>17,843</b> users
                                    </p>
                                </div>
                                <div className="col-md-6 px-1 text-white">
                                    <div className="signinBox p-3">
                                        <h3>
                                            Sign Up today
                                        </h3>
                                        <div className="py-2">
                                            <input type="text" className="form-control" placeholder="First Name" />
                                        </div>
                                        <div className="py-2">
                                            <input type="text" className="form-control" placeholder="Last Name" />
                                        </div>
                                        <div className="py-2">
                                            <input type="email" className="form-control" placeholder="Email address" />
                                        </div>
                                        <div className="py-2 mb-5">
                                            <PhoneInput
                                                country={'us'}
                                                inputClass="w-100"

                                            />
                                        </div>
                                        <div className="mb-5">
                                            <div className="btn bgFrag w-100">Sign Up</div>
                                        </div>
                                        <div className="d-flex gap-3">
                                            <div className="bg-white" style={{ height: 50, width: 6, borderRadius: 14 }}></div>
                                            <div>
                                                By creating an account, you are agreeing to our <span className="textFrag">Terms of Use</span>  and <span className="textFrag">Privacy Policy</span>.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-3">
                    <div
                        style={{
                            backgroundImage: `url(${bgImage})`,
                            backgroundSize: 'cover',
                            backgroundAttachment: 'fixed',
                            backgroundPosition: 'center',


                        }}
                    >
                        <div className="elonSection row m-0 d-flex justify-content-center py-3 text-white">
                            <div className="col-11 col-md-9 elonContent p-3">
                                <h2 className="text-center">
                                    Elon Musk New Trading Platform
                                </h2>
                                <p className="text-center pText">
                                    Welcome to the exciting realm of automated trading on Elon Musk Quantum AI Trading Platform. Here, you’ll experience an innovative approach to trading, driven by cutting-edge artificial intelligence technologies. Uncover unique opportunities for automated income provided by this platform. Join us now and soar alongside the vanguard of the financial world crafted under the guidance of Elon Musk.
                                </p>
                                <h2 className="text-center">
                                    What is Elon Musk Trading Platform Called
                                </h2>
                                <p className="text-center pText">
                                    Immerse yourself in the world of automated trading with Quantum AI, a groundbreaking platform crafted by none other than Elon Musk himself. Fusing the visionary insights of Musk with the power of artificial intelligence, Quantum AI introduces a paradigm shift in the way we approach financial markets. This platform harnesses the capabilities of advanced algorithms and machine learning to enable seamless and intelligent trading. Named Quantum AI, it represents the pinnacle of innovation in automated trading, designed to empower users with a sophisticated and efficient tool for navigating the complexities of the financial landscape. Join Quantum AI now and embark on a journey at the forefront of Elon Musk’s foray into the future of trading.
                                </p>
                                <div className="w-100 d-flex justify-content-center">
                                    <div className="btn bgFrag">
                                        <b>
                                            Get Started
                                        </b>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-100 row m-0 justify-content-center text-white">
                    <div className="col-11">
                        <div className="py-2 w-100 row m-0 justify-content-center">
                            <div className="px-2 col-11 col-md-7 mb-5">
                                <h1 className="text-center">
                                    Primary Advantages of Quantum AI Elon Musk’s Trading Platform
                                </h1>
                                <p className="pText text-center mt-3">
                                    Discover the unique attributes of the Elon Musk Trading Platform, offering a thorough insight into its capabilities. Here is a summary of the advantages provided by the trading platform:
                                </p>
                            </div>

                            <div className="w-100 mb-2 row m-0 align-items-center">
                                <div className="col-md-6 text-white">
                                    <img src={phone} className="w-100" />
                                </div>
                                <div className="col-md-6 px-1 text-white p-2">
                                    <p>
                                        01
                                    </p>
                                    <h2>
                                        Advanced AI Integration
                                    </h2>
                                    <p className="pText ">
                                        Elon Musk trading platform stands out with its advanced integration of artificial intelligence. The platform utilizes cutting-edge AI algorithms to analyze market trends, predict potential price movements, and optimize trading strategies. This intelligent system adapts to changing market conditions, providing users with valuable insights for informed decision-making.
                                    </p>
                                </div>
                            </div>
                            <div className="w-100 mb-2 row m-0 align-items-center">

                                <div className="col-md-6 px-1 text-white p-2">
                                    <p>
                                        02
                                    </p>
                                    <h2>
                                        Innovative Automated Execution
                                    </h2>
                                    <p className="pText ">
                                        One of the Elon Musk Trading Platform’s unique features is its innovative approach to automated execution. Users benefit from a hands-free trading experience as the platform can automatically execute trades based on predefined criteria. This not only enhances efficiency but also ensures timely responses to market fluctuations, giving traders a competitive edge.
                                    </p>
                                </div>
                                <div className="col-md-6 text-white">
                                    <img src={laptop} className="w-100" />
                                </div>
                            </div>
                            <div className="w-100 mb-2 row m-0 align-items-center">
                                <div className="col-md-6 text-white">
                                    <img src={innovation} className="w-100" />
                                </div>
                                <div className="col-md-6 px-1 text-white p-2">
                                    <p>
                                        03
                                    </p>
                                    <h2>
                                        Implementation of updates
                                    </h2>
                                    <p className="pText ">
                                        We prioritize updates to ensure that our users consistently have access to the most cutting-edge tools and technologies in the realm of financial markets. Our team of developers works tirelessly to implement new features, enhance performance, and ensure data security. This continuous stream of updates not only guarantees the reliability and relevance of the platform but also creates a distinctive space for successful trading, where users can stay ahead of the market by leveraging the latest innovations.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-100 bgf1 row m-0 justify-content-center text-white">
                    <div className="col-11">
                        <div className="py- w-100 row m-0 justify-content-center">
                            <div className="px-2 col-11 col-md-7  mb-5 ">
                                <p className="text-center textFrag mt-4">
                                    <b>
                                        THE DISTINCTIVE FEATURES THAT MAKE US STAND OUT
                                    </b>
                                </p>
                                <h2 className="text-center">
                                    Key Features of the Elon Musk Trading Platform
                                </h2>

                            </div>
                            <div className="row m-0">
                                {
                                    features.map((x, ind) => <KeyFeatures {...x} key={ind} />)
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-100 row m-0 justify-content-center text-white">
                    <div className="col-11">
                        <div className="py- w-100 row m-0 justify-content-center">
                            <div className="px-2 col-11 col-md-7  mb-5 ">
                                <p className="text-center textFrag mt-4">
                                    <b>
                                        Customer Experiences
                                    </b>
                                </p>
                                <h2 className="text-center">
                                    Insights into the Experience with Elon Musk Trading Platform
                                </h2>

                            </div>
                            <div className="row m-0">
                                {
                                    staffData.map((x, ind) => <Staffs {...x} key={ind} />)
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-100 row m-0 bgf1 py-2 justify-content-center text-white">
                    <div className="col-11 mt-3">
                        <div className="py- w-100 row m-0 justify-content-center">
                            <div className="px-2 col-md-6 mb-5 ">
                                <div >
                                    <h2 className="mb-3">Trading Platform App</h2>
                                    <p className="mb-3 pText">
                                        QuantumAI stands out as a groundbreaking mobile application for cryptocurrency trading, crafted by Elon Musk, a leading figure in the world of financial quantitative transactions. This state-of-the-art application transcends the typical iOS or Android offering; it represents the pinnacle of both convenience and sophistication.
                                    </p>
                                    <p className="mb-3 pText">
                                        A key highlight of QuantumAI lies in its delivery of real-time market data, ensuring users have instant access to the latest information on cryptocurrency prices.
                                    </p>
                                    <p className="mb-2 pText">
                                        Additionally, Elon Musk Trading Platform features a diverse set of technical analysis tools, empowering users to discern trends and patterns in the cryptocurrency market. These tools act as invaluable resources for users aiming to gain a comprehensive understanding of market dynamics.
                                    </p>
                                </div>
                            </div>
                            <div className="col-md-6 d-flex justify-content-center">
                                <div className="px-3 w-75">
                                    <img src={banner} className="w-100" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-100 row m-0 justify-content-center text-white">
                    <div className="col-11">
                        <div className="py- w-100 row m-0 justify-content-center">
                            <div className="px-2 col-11 col-md-7  mb-5 ">
                                <p className="text-center textFrag mt-4">
                                    <b>
                                        Have a question?
                                    </b>
                                </p>
                                <h2 className="text-center">
                                    Frequently Asked Questions (FAQs)
                                </h2>
                            </div>
                            <div className="row m-0">
                                <div className="col-md-6 mb-3">
                                    {
                                        faqs1.map((x, ind) => <RenderFaq {...x} key={ind} />)
                                    }

                                </div>
                                <div className="col-md-6">
                                    {
                                        faqs2.map((x, ind) => <RenderFaq {...x} key={ind} />)
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-100 bgf1 py-3 row m-0 justify-content-center text-white">
                    <div className="col-11">
                        <div className="py- w-100 row m-0 justify-content-center">
                            <div className="px-2 col-11 col-md-7  mb-5 ">
                                <p className="text-center textFrag mt-4">
                                    <b>
                                        It is important to know
                                    </b>
                                </p>
                                <h3 className="text-center">
                                    Overview
                                </h3>

                            </div>
                            <div className="row m-0">
                                <table>
                                    <tr>
                                        <td>
                                            <b>
                                                Platform Compatibility
                                            </b>
                                        </td>
                                        <td>
                                            Elon Musk Trading Platform is designed to seamlessly integrate with various devices, ensuring a consistent and user-friendly experience across different platforms. Whether you prefer trading on your desktop, laptop, or mobile device, our platform adapts to your choice, providing flexibility and convenience. Experience the same powerful features and real-time data, regardless of the device you choose, and stay connected to the markets anytime, anywhere. With our commitment to platform compatibility, we aim to enhance your trading experience across the digital landscape.
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <b>
                                                Deposit Methods
                                            </b>
                                        </td>
                                        <td>
                                            We understand the importance of convenience when it comes to funding your trading account. That’s why we offer a variety of deposit methods to suit your preferences. From traditional bank transfers to modern e-wallet solutions, we provide a range of secure and efficient options. Whether you choose credit/debit cards, wire transfers, or digital wallets, our deposit process is designed to be straightforward and user-friendly. Rest assured that your financial transactions are handled with the utmost security, allowing you to focus on your trading journey. Explore the flexibility of our deposit methods and fund your account effortlessly.
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <b>
                                                Supported Countries
                                            </b>
                                        </td>
                                        <td>
                                            Elon Musk Trading Platform is dedicated to providing a global trading experience, and we are proud to support users from a wide range of countries around the world. Whether you are in North America, Europe, Asia, or any other region, you can take advantage of our platform’s features and capabilities. We strive to make our services accessible to traders globally, ensuring that individuals from different countries can participate in the exciting world of online trading. Check our website for the most up-to-date information on supported countries and join our diverse community of traders.
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <b>
                                                Platform Cost
                                            </b>
                                        </td>
                                        <td>
                                            transparency is paramount, and we want our users to be fully informed about the costs associated with using our services. Our platform cost structure is clear and straightforward, with no hidden fees. While certain transactions may incur charges, we provide a detailed breakdown of costs, ensuring that you have a complete understanding of any fees involved. We believe in fostering trust through transparency, and our commitment is to empower users with the knowledge they need to make informed decisions about their trading activities. Explore our platform, knowing that we prioritize clarity when it comes to platform costs.
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />

            </div>
        </>
    )
}