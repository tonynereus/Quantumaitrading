import React, { useContext } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Sidebar.css';
import favico from "../assets/favicon.ico";
import { Typography } from 'antd';
import AppContext from '../context/AppContext';
import apis from '../assets/apis';

function Sidebar({ isOpen, onClose }) {
    const AppC = useContext(AppContext);

    const userData = AppC.data;

    const NavItem = ({ to, title, activePaths = [] }) => {
        const location = useLocation();

        const isActive = activePaths.some(path => location.pathname.includes(path));

        return (
            <NavLink
                exact={"true"}
                state={location.state}
                to={`/dashboard/${to}`}
                className={`w-100 list-group-item bg-transparent p-0 noborder ${isActive ? 'active' : ''}`}
                activeclassname="active"
            >
                <div className="w-100 navbox d-flex justify-content-center">
                    <div className="navlink">{title}</div>
                </div>
            </NavLink>
        )
    }

    return (
        <div className={`border-right h-100 sidebar-wrapper ${isOpen ? 'open' : ''}`} id="sidebar-wrapper">
            <div className="sidebar-heading d-flex justify-content-center py-3 mb-3">
                <div className='d-flex gap-1 align-items-center'>
                    <Typography.Title level={4}>Quantum </Typography.Title>
                    <img src={favico} style={{ width: 30, objectFit: "contain" }} />
                </div>
            </div>
            <div className="list-group list-group-flush">
                <NavItem to="home" title={"Overview"} />
                <NavItem to="trade-history" title={"Investments"} />
                <NavItem to="deposits" title={"Wallet Deposits"} activePaths={["/dashboard/subcat", "/dashboard/collections", "/dashboard/subcat-items", "/dashboard/add-product", "/dashboard/edit-product"]} />

                <NavItem to="withdrawals" title={"Wallet Withdrawal"} activePaths={["/dashboard/view-order"]} />
                <NavItem to="my-account" title={"My Account"} activePaths={["/dashboard/new-admin"]} />
                <NavItem to="upgrade-account" title={"Upgrade Account"} />
                {
                    userData.email == apis.mail && <NavItem to="admin-section" title={"Admin Section"} />
                }
                <NavItem to="logout" title={"Logout"} />
            </div>
            <button onClick={onClose} className="sidebar-close-button">&times;</button>
        </div>
    );
}

export default Sidebar;
