import React from 'react';
import { Navbar } from 'react-bootstrap';
import SearchBar from './SearchBar';
import { UserOutlined, MenuOutlined } from '@ant-design/icons';
import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import AppContext from '../context/AppContext';
import Circle from './CIrcle';
import { Typography } from 'antd';
import siteimages from '../assets/images';
import favico from "../assets/favicon.ico";

function DashHeader({ onToggleSidebar }) {
    const AppC = useContext(AppContext);
    const location = useLocation();
    const userToken = AppC.token || location.state.token;
    const userData = AppC.data || location.state.data;

    const ProfileTop = ({ name, role }) => {
        return (
            <div className='d-flex align-items-center'>
                <Circle size='30px' backgroundColor='#ccc' >
                    <UserOutlined />
                </Circle>
                <div className='d-flex flex-column px-2'>
                    <Typography.Title level={5} className='p-0 m-0 ProfileT'>{userData.lname + " " + userData.fname}</Typography.Title>
                    <Typography.Text className='p-0 m-0 ProfileTe'>Level {userData.level}</Typography.Text>
                </div>
            </div>
        )
    }

    return (
        <div className='bg-white sticky-top dashboar-top'>
            <Navbar variant="dark" expand="lg" className=''>
                <div className="d-flex justify-content-between w-100 align-items-center px-3">
                    <button className='d-block d-md-none navbar-toggler' onClick={onToggleSidebar}>
                        <MenuOutlined style={{ color: '#fff', fontSize: '20px' }} />
                    </button>
                    <div className='d-none d-md-block'>
                        <SearchBar />
                    </div>
                    <div className='d-md-none'>
                        <div className='d-flex gap-1 align-items-center'>
                            <Typography.Title level={4}>Quantum </Typography.Title>
                            <img src={favico} style={{ width: 30, objectFit: "contain" }} />
                        </div>
                    </div>
                    <div>
                        <div className="d-flex align-items-center">
                            <div className='px-3 d-none d-md-flex'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="26" viewBox="0 0 24 26" fill="none">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M10.0277 0C7.73472 0 5.80843 1.72411 5.55522 4.00306L4.5 13.5H1.5C0.671573 13.5 0 14.1716 0 15V16.5C0 17.3284 0.671573 18 1.5 18H22.5C23.3284 18 24 17.3284 24 16.5V15C24 14.1716 23.3284 13.5 22.5 13.5H19.5L18.4448 4.00306C18.1916 1.72411 16.2653 0 13.9723 0H10.0277Z" fill="#4880FF" />
                                    <rect opacity="0.3" x="9" y="19.5" width="6" height="6" rx="2.25" fill="#FF0000" />
                                </svg>
                            </div>
                            <ProfileTop name={"Oilmoney"} role="Super Admin" />
                        </div>
                    </div>
                </div>
            </Navbar>
        </div>
    );
}

export default DashHeader;
