import { useState } from "react";
import { faBars, faTimes, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "../svgs/Logo.svg";

import { Link } from "react-router-dom";
export default () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="w-100 row m-0 justify-content-center">
            <div className="col-11">
                <div className="py-2 w-100">
                    <div className="mb-3 w-100 row m-0 d-flex justify-content-between align-items-center">
                        <div className="col-6 col-md-4 col-lg-3">
                            <Link to={"/"}>
                                <img
                                    src={Logo}
                                    className="img-fluid"
                                    style={{ width: '100%' }}
                                />
                            </Link>
                        </div>
                        <div className="col-6 col-md-4 col-lg-3 justify-content-end d-flex">
                            <div className="d-md-flex gap-3 d-none">
                                <Link to="/signup">
                                    <div className="btn text-white mb-2">Login</div>
                                </Link>

                                <Link to={"/signup"}>
                                    <div className="btn bgFrag">Sign Up</div>
                                </Link>
                            </div>
                            <div className="d-flex gap-3 d-md-none">
                                <FontAwesomeIcon
                                    icon={isSidebarOpen ? faTimes : faBars}
                                    color="#ccc"
                                    onClick={toggleSidebar}
                                    style={{ cursor: "pointer" }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sidebar */}
            {isSidebarOpen && (
                <div className="sidebar">
                    <div className="d-flex py-1 px-2 w-100 justify-content-end">
                        <FontAwesomeIcon icon={faXmark} onClick={toggleSidebar} />
                    </div>
                    <div className="sidebar-content">
                        <Link to="/signup">
                            <div className="btn text-white mb-2">Login</div>
                        </Link>

                        <Link to={"/signup"}>
                            <div className="btn bgFrag">Sign Up</div>
                        </Link>
                    </div>
                    <div></div>
                </div>
            )}

            {/* Sidebar styling */}
            <style jsx>{`
                .sidebar {
                    position: fixed;
                    top: 0;
                    right: 0;
                    height: 100%;
                    width: 250px;
                    background-color: #333;
                    color: white;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    align-items: center;
                    z-index: 1000;
                    transition: transform 0.3s ease-in-out;
                }
                .sidebar-content .btn {
                    width: 80%;
                    text-align: center;
                    padding: 10px;
                    margin: 10px 0;
                    border-radius: 5px;
                    cursor: pointer;
                }
                .sidebar-content .btn.bgFrag {
                    background-color: #007bff;
                }
                .sidebar-content .btn.text-white {
                    background-color: transparent;
                    border: 1px solid #fff;
                }
            `}</style>
        </div>
    );
};
