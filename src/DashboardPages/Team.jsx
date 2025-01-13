import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Card, Typography, message } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import PageTitle from '../components/PageTitle';
import TeamProfile from '../components/TeamCard';
import apis from '../assets/apis';
import AppContext from '../context/AppContext';
import LoadingCenter from "../components/LoadingCenter";

const Team = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  const location = useLocation();
  const nav = useNavigate();

  const AppC = useContext(AppContext);
  const { myReq } = AppC;
  const userToken = AppC.token || location.state.token;

  const [reload, setReload] = useState(false);
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true); // Set loading state to true while fetching
      try {
        const data = await myReq(apis.getAdmins, {}, false);
        if (data.status) {
          setUsers(data.data);
        } else {
          throw new Error(data.message || 'Failed to fetch users.');
        }
      } catch (error) {
        message.error(error.message);
      } finally {
        setLoading(false); // Reset loading state after fetching
      }
    };

    fetchUsers();
  }, [userToken, reload]); // Added userToken to dependency array for useEffect

  const handleDeactivate = (user) => {
    Swal.fire({
      title: 'Deactivate Account',
      text: `Do you really want to ${user.active ? "deactivate" : "activate"} ${user.firstName} ${user.lastName}'s account?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: `yes ${user.active ? "deactivate" : "activate"} it`,
      cancelButtonText: 'No, keep it'
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true); // Set loading state to true while deactivating
        try {
          const response = await myReq(apis.deactivateAdmin, { userId: user.id, active: user.stat });
          if (response.status) {
            Swal.fire(`${user.active ? "Deactivated!" : "Activated!"}`, `${user.firstName} ${user.lastName}'s account has been ${user.active ? "deactivated!" : "activated!"}.`, 'success');
            setReload(!reload);
          } else {
            message.error(response.message);
          }
        } catch (error) {
          message.error(error.message || 'Failed to deactivate admin user.');
        } finally {
          setLoading(false); // Reset loading state after deactivating
        }
      }
    });
  };

  const handleDelete = (user) => {
    Swal.fire({
      title: 'Delete Account',
      text: `Do you really want to delete ${user.firstName} ${user.lastName}'s account?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true); // Set loading state to true while deleting
        try {
          const response = await myReq(apis.deleteAdmin, { userId: user.id });
          if (response.status) {
            const updatedUsers = users.filter(u => u.id !== user.id);
            setUsers(updatedUsers);
            Swal.fire('Deleted!', `${user.firstName} ${user.lastName}'s account has been deleted.`, 'success');
          }else{
            message.error(response.message);
          }
        } catch (error) {
          message.error(error.message || 'Failed to delete admin user.');
        } finally {
          setLoading(false); // Reset loading state after deleting
        }
      }
    });
  };

  const NewUser = () => {
    nav("/dashboard/new-admin", { state: location.state });
  };

  const UploadButton = () => {
    return (
      <Card
        hoverable
        style={{ width: 240, margin: 5, textAlign: 'center' }}
        className='d-flex justify-content-center align-items-center'
        onClick={NewUser}
      >
        <Typography.Title>
          <FontAwesomeIcon icon={faPlus} />
        </Typography.Title>
        <p>New User</p>
      </Card>
    );
  };

  return (
    <div>
      <PageTitle title={"Team"} />
      {
        loading && <LoadingCenter />
      }
      <div className="container mt-5 d-flex flex-wrap justify-content-center">
        <UploadButton />
        {users.map(user => (
          <TeamProfile
            key={user.id}
            user={{
              ...user,
              name: `${user.firstName} ${user.lastName}`,
              role: user.role_name,
              status: user.stat === 1 ? 'Active' : 'Inactive',
              active: user.stat === 1 ? true : false,

              // profilePicture: 'https://via.placeholder.com/150', // Add profile picture URL if available
            }}
            onDeactivate={handleDeactivate}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default Team;
