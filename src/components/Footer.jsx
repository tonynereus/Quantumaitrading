import logo from "../svgs/Logo.svg";

export default () => {
    return (
        <>
            <div className="w-100 py-2 p-3 text-white">
                <div className="py-2 p-3 mt-3">
                    <img src={logo} width={120} />
                </div>
                <div className="w-100 row m-0 p-2">
                    <div className="col-md-8">
                        <p className="mb-3">
                            <small>
                                Engaging in trading holds the potential for significant profits, but it comes with an inherent risk of partial or complete capital loss. It’s crucial to acknowledge that approximately 70% of traders encounter financial setbacks.
                            </small>
                        </p>
                        <p className="mb-3">
                            <small>
                                Please take note that the brand names featured on our website are used exclusively for promotional purposes and do not represent specific companies or service providers.
                            </small>
                        </p>
                        <p className="mb-3">
                            <small>
                                Prior to participating in any investment activities, carefully review the Terms & Conditions and the Disclaimer page of the third-party investor platform. Additionally, consider potential obligations related to personal capital gains tax based on your country of residence. Encouraging US residents to trade commodity options, including ‘prediction’ contracts, is against the law unless conducted on a CFTC-registered exchange or legally exempted.
                            </small>
                        </p>
                        <p className="mb-3">
                            <small>
                                Moreover, the Financial Conduct Authority (FCA) in the UK has enacted policy statement PS20/10, which prohibits the sale, marketing, and distribution of Contracts for Difference (CFDs) related to trading products. This policy also limits the dissemination of promotional materials concerning CFDs or other financial products targeting UK consumers.
                            </small>
                        </p>
                        <p className="mb-3">
                            <small>
                                By providing us with your personal information, you consent to its sharing with third-party trading service providers in accordance with our Privacy Policy and Terms & Conditions. Regarding trading methodologies, traders have various options, including using trading software, collaborating with human brokers, or independently executing trades – all of which are entirely at their discretion.
                            </small>
                        </p>
                    </div>
                    <div className="col-md-4 d-md-flex justify-content-center">
                        <div>
                            <div>
                                <p>
                                    SUPPORT
                                </p>
                                <div className="mt-3">
                                    <p className="textFrag">Privacy Policy</p>
                                    <p className="textFrag">Term of Use</p>
                                </div>
                            </div>
                            <div>
                                <p>
                                    COMPANY
                                </p>
                                <div className="mt-3">
                                    <p className="textFrag">About Us</p>
                                    <p className="textFrag">Our Team</p>
                                    <p className="textFrag">Contact</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="w-100 d-flex justify-content-center">
                    <small>
                        <cite>© 2025 Quantumaitrading.com </cite>
                    </small>
                </div>
            </div>
        </>
    )
}