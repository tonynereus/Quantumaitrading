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
                                            L E G A L
                                        </b>
                                    </p>
                                    <div className="px-2">
                                        <h2 className="mt-4">
                                            Privacy Policy
                                        </h2>
                                        <p className="pText">
                                            By continuing to use this site, you automatically agree to this privacy policy
                                        </p>
                                        <h2 className="mt-4">
                                            Media
                                        </h2>
                                        <p className="pText">
                                            If you upload images to the website, you should avoid uploading images with embedded location data (EXIF GPS) included. Visitors to the website can download and extract any location data from images on the website.
                                        </p>
                                        <h2 className="mt-4">
                                            Cookies
                                        </h2>
                                        <p className="pText">
                                            Our Services are not intended for children. Individuals under the age of 18 are prohibited from using this Website and/or the Services. Parents and guardians are advised to actively monitor their children’s online activities.
                                        </p>
                                        <p className="pText">
                                            If you visit our login page, we will set a temporary cookie to determine if your browser accepts cookies. This cookie contains no personal data and is discarded when you close your browser.
                                        </p>
                                        <p className="pText">
                                            When you log in, we will also set up several cookies to save your login information and your screen display choices. Login cookies last for two days, and screen options cookies last for a year. If you select “Remember Me”, your login will persist for two weeks. If you log out of your account, the login cookies will be removed.
                                        </p>
                                        <p className="pText">
                                            If you edit or publish an article, an additional cookie will be saved in your browser. This cookie includes no personal data and simply indicates the post ID of the article you just edited. It expires after 1 day.
                                        </p>
                                        <h2 className="mt-4">
                                            Embedded content from other websites
                                        </h2>
                                        <p className="pText">
                                            Articles on this site may include embedded content (e.g. videos, images, articles, etc.). Embedded content from other websites behaves in the exact same way as if the visitor has visited the other website.
                                        </p>
                                        <p className="pText">
                                            These websites may collect data about you, use cookies, embed additional third-party tracking, and monitor your interaction with that embedded content, including tracking your interaction with the embedded content if you have an account and are logged in to that website.
                                        </p>

                                        <h2 className="mt-4">
                                            Who we share your data with
                                        </h2>
                                        <p className="pText">
                                            If you request a password reset, your IP address will be included in the reset email.
                                        </p>
                                        <h2 className="mt-4">
                                            How long we retain your data
                                        </h2>
                                        <p className="pText">
                                            If you leave a comment, the comment and its metadata are retained indefinitely. This is so we can recognize and approve any follow-up comments automatically instead of holding them in a moderation queue.
                                        </p>
                                        <p className="pText">
                                            For users that register on our website (if any), we also store the personal information they provide in their user profile. All users can see, edit, or delete their personal information at any time (except they cannot change their username). Website administrators can also see and edit that information.
                                        </p>
                                        <h2 className="mt-4">
                                            What rights you have over your data
                                        </h2>
                                        <p className="pText">
                                            If you have an account on this site, or have left comments, you can request to receive an exported file of the personal data we hold about you, including any data you have provided to us. You can also request that we erase any personal data we hold about you. This does not include any data we are obliged to keep for administrative, legal, or security purposes.
                                        </p>
                                        <h2 className="mt-4">
                                            Where your data is sent
                                        </h2>
                                        <p className="pText">
                                            Visitor comments may be checked through an automated spam detection service.
                                        </p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <Footer />

            </div>
        </>
    )
}