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
                                            Usage Terms
                                        </b>
                                    </p>
                                    <h2 >
                                        Terms of use
                                    </h2>

                                </div>
                                <h5 className="mt-4">
                                    Introduction
                                </h5>
                                <p className="pText">
                                    Welcome to elontradingplatform.com (the “Website”), operated by the QuantumAI group (“we,” “our,” and “us”). These Terms and Conditions (“Terms” or “Agreement”) govern your access to and use of the Website, as well as any website services we provide through it.
                                </p>
                                <h5 className="mt-4">
                                    Consent and Scope:
                                </h5>
                                <p className="pText">
                                    By accessing and using this Website, you acknowledge and agree to these Terms. Please review them carefully, and refrain from using the Website or any Services if you disagree with any provision. Your continued use of QuantumAI constitutes acceptance of all clauses outlined in this document.
                                </p>
                                <h5 className="mt-4">
                                    Minors:
                                </h5>
                                <p className="pText">
                                    Our Services are not intended for children. Individuals under the age of 18 are prohibited from using this Website and/or the Services. Parents and guardians are advised to actively monitor their children’s online activities.
                                </p>
                                <h5 className="mt-4">
                                    Content Changes:
                                </h5>
                                <p className="pText">
                                    QuantumAI reserves the right to update these Terms at any time by posting a new version on this Website. Notification of revised Terms and their effective date will be provided if significant modifications are made.
                                    <br />
                                    Date of last update: January 8, 2024.
                                </p>
                                <h5 className="mt-4">
                                    Risk Disclaimer:
                                </h5>
                                <p className="pText">
                                    QuantumAI serves primarily as an information source and does not provide individual investment advice. While reviews of various companies related to financial and cryptocurrency markets may be published, direct comparisons of brokers are not offered. The information on this Website should not be construed as a suggestion, offer, or invitation to engage in any investment-related activity.
                                    <br />
                                    <br />

                                    Cryptocurrencies are known for their volatility, and users should be aware of associated risks. Conduct your research or consult with a personal account manager before making financial decisions.
                                    <br />
                                    <br />
                                    Trading involves risks, and leveraged trading products like CFDs can result in losses exceeding the invested amount. As of January 6, 2021, cryptocurrency-based CFD trading is prohibited in the United Kingdom as per PS20/10, limiting the sale, marketing, and distribution of CFDs on unregulated digital assets.
                                    <br />
                                    <br />

                                    QuantumAI assumes no responsibility for losses or damages resulting from the use of information on this Website. Information is provided in good faith, but no warranties or assurances are made regarding its accuracy. Users are fully responsible for decisions related to the use of our site or third-party websites mentioned.

                                </p>

                                <h5 className="mt-4">
                                    Affiliate Disclosure:
                                </h5>
                                <p className="pText">
                                    Readers are informed about affiliate links within our content. Clicking on these links compensates us, with no added expenses for users. Advertisements on our Website are not necessarily sponsored, recommended, or endorsed by us.
                                    <br />
                                    <br />
                                    We do not verify claims made on third-party websites linked to us, and we are not responsible for any damages incurred through these hyperlinks.
                                    <br /><br />
                                    Information on our Website is free, and we reserve the right to make adjustments in the future.
                                </p>
                                <h5 className="mt-4">
                                    Interruptions of Service:
                                </h5>
                                <p>
                                    While we strive for professionalism, occasional interruptions in our website service may occur due to planned or emergency maintenance. Users may experience limited access during such times. Notice of planned downtime may be provided, but maintenance can occur without advance notice.
                                    <br />
                                    <br />
                                    QuantumAI is not liable for damages resulting from service interruptions.
                                </p>
                                <h5 className="mt-4">
                                    License Grant:
                                </h5>
                                <p className="pText">
                                    Users are granted a limited personal use license to access, view, download, format, and print Website material for non-commercial use, provided content is unmodified, and proprietary rights are preserved. Duplicating, publishing, translating, selling, renting, distributing, or creating derivative works based on the content for other websites or reference materials is prohibited.
                                </p>

                                <h5 className="mt-4">
                                    Freedom of Liability:
                                </h5>
                                <p className="pText">
                                    QuantumAI is not responsible for any direct or indirect damages resulting from the use of our website, information, or third-party content. We do not guarantee completeness, accuracy, or timeliness of website content.
                                </p>

                                <h5 className="mt-4">
                                    Third-Party Content:
                                </h5>
                                <p className="pText">
                                    Testimonials, views, products, or services offered by third parties on this site are solely those of the providers. QuantumAI does not guarantee the accuracy, completeness, reliability, or helpfulness of third-party content.
                                </p>

                                <h5 className="mt-4">
                                    Governing Law:
                                </h5>
                                <p className="pText">
                                    This Agreement and your use of our Services are subject to relevant international laws. Violations of this Agreement may result in temporary or permanent limitations to access. Cooperation with authorities may be required in case of suspected criminal activity.
                                </p>

                                <h5 className="mt-4">
                                    Privacy:
                                </h5>
                                <p className="pText">
                                    This Website may collect users’ personal information. For details on information collection, use, sharing, and user rights, please refer to our Privacy Policy.
                                </p>

                                <h5 className="mt-4">
                                    Cookies:
                                </h5>
                                <p className="pText">
                                    To enhance user experience, QuantumAI uses cookies. Check our Cookie Policy for information on cookie usage and options for accepting or rejecting this feature.
                                </p>

                                <h5 className="mt-4">
                                    Feedback:
                                </h5>
                                <p className="pText">
                                    For questions or feedback on our services, visit our Contacts page.
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