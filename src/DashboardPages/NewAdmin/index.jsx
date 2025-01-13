import React, { useState, useEffect, useContext } from 'react';
import { Spin } from 'antd';
import PageTitle from '../../components/PageTitle';
import AdminForm from './AdminForm';
import style from "./style.module.css";
import apis from '../../assets/apis';
import AppContext from '../../context/AppContext';
import { useLocation } from 'react-router-dom';

const NewAdmin = () => {
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);

    const location = useLocation();
    const AppC = useContext(AppContext);
    const userToken = AppC.token || location.state.token;

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await fetch(apis.getRoles, {
                    method: 'GET',
                    headers: {
                        'Authorization': `${userToken}`,
                        'Content-Type': 'application/json'
                    }}
                );
                if (!response.ok) {
                    throw new Error('Failed to fetch roles');
                }
                const data = await response.json();
                setRoles(data.data); // Assuming the API returns { roles: [] }
            } catch (error) {
                console.error('Error fetching roles:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRoles();
    }, []);

    return (
        <div className={style.newAdminContainer}>
            <PageTitle title="New Admin" />
            {loading ? (
                <div className={style.spinnerContainer}>
                    <Spin size="large" />
                </div>
            ) : (
                <AdminForm roles={roles} isLoadingRoles={loading} token={userToken} />
            )}
        </div>
    );
};

export default NewAdmin;
