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
                                            HAVE A QUESTION ?
                                        </b>
                                    </p>
                                    <h1>
                                        Have Questions?
                                    </h1>

                                </div>
                                <p className="pText">
                                    Fill out the form below
                                </p>
                                <div className="row m-0 justify-content-center">
                                    <div className="col-md-7">
                                        <div className="py-2">
                                            <input type="text" className="form-control" placeholder="Name" />
                                        </div>
                                        <div className="py-2">
                                            <input type="email" className="form-control" placeholder="Email address" />
                                        </div>
                                        <div className="py-2 mb-5">
                                           <textarea className="form-control" rows={6} placeholder="Type your message here"></textarea>
                                        </div>
                                        <div className="mb-5">
                                            <div className="btn bgFrag w-100">Submit</div>
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
    )
}