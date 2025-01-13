import React, { useEffect, useState, useContext } from 'react';
import PageTitle from '../components/PageTitle';
import { Table, Card, Tag, Spin, message, Button } from 'antd';
import SearchBar from '../components/SearchBar';
import Circle from '../components/CIrcle';
import { UserOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2';
import apis from '../assets/apis';
import { useLocation } from 'react-router-dom';
import AppContext from '../context/AppContext';

function Users() {
  const AppC = useContext(AppContext);
  const { myReq } = AppC;
  const location = useLocation();
  const userToken = AppC.token || location.state.token;
  //const userData = AppC.data || location.state.data;


  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const result = await myReq(apis.getUsers, null, false);
        if (Array.isArray(result.data)) {
          console.log(result.data);
          setData(result.data);
        }
      } catch (e) {
        message.error("Failed to load users");
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, []);

  function downloadExel() {
    // Convert array to CSV
    //  const headers = Object.keys(data[0]);
    const headers = ["First Name", "Last Name", "Email", "Phone"];

    const csvRows = [
      headers.join(','), // header row
      ...data.map(
        x => {
          var str = "";
          for (var i in x) {
            str += x[i] + ",";
          }
          return str;
        }
      )
      //  ...data.map(row => headers.map(field => JSON.stringify(row[field] || '')).join(',')) // data rows
    ].join('\n');

    // Create a blob from the CSV string
    const blob = new Blob([csvRows], { type: 'text/csv' });

    // Create a link element
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', 'data.csv');
    document.body.appendChild(a);

    // Trigger the download by simulating a click
    a.click();

    // Clean up
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

  }

  return (
    <div>
      <div className='w-100 px-1 d-flex justify-content-between align-items-center'>
        <PageTitle title={"Users"} />
        <Button type="primary" onClick={downloadExel}>Export </Button>
      </div>
      <Card className='p-2 w-100'>
        <div className='row m-0 p-0'>
          <div className="col-md-4 col-sm-7">
            <SearchBar place='Search Inbox' />
          </div>
        </div>
        <div className="py-2 w-100 d-flex justify-content-center overflow-auto">

          <Table
            loading={loading}
            columns={[
              {
                title: '#',
                render: () => (<Circle size='30px' backgroundColor='#ccc'><UserOutlined /></Circle>)
              },
              {
                title: 'First Name',
                dataIndex: 'firstN',
              },
              {
                title: 'Last Name',
                dataIndex: 'lastN',
              },
              {
                title: 'Email',
                dataIndex: 'email',
              },
              {
                title: 'Phone',
                dataIndex: 'pno',
              },
            ]}
            dataSource={data}
            size="middle"
            className='w-100'
            key={(record, index) => index}
          />

        </div>
      </Card>
    </div>
  );
}

export default Users;
