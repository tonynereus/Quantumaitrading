import React, { useEffect, useState, useContext } from 'react';
import PageTitle from '../components/PageTitle';
import { Table, Spin, message, Button } from 'antd';
import { CheckOutlined, CloseOutlined, EyeFilled } from '@ant-design/icons';
import Circle from '../components/CIrcle';
import apis from '../assets/apis';
import { useNavigate, useLocation } from 'react-router-dom';
import AppContext from '../context/AppContext';

function OrderList() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([

  ]);

  const location = useLocation();
  const navigate = useNavigate();

  const AppC = useContext(AppContext);
  const { myReq } = AppC;
  const userToken = AppC.token || location.state.token;
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        var resu = await myReq(apis.getOrders, {}, false);
        if (Array.isArray(resu.data)) {
          setData(resu.data);
        }
      } catch (e) {
        message.error(e || "Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, []);

  const handleViewOrder = (orderId) => {
    navigate(`/dashboard/view-order`, { state: { ...location.state, orderId } }); // Navigate to the view-order page with orderId
  };


  function downloadExel() {
    // Define the headers you want in your CSV file
    const headers = ["ID", "Amount", "Email", "Status", "Paid", "Date", "Created At"];

    // Convert array of objects to CSV rows
    const csvRows = [
      headers.join(','), // header row
      ...data.map(row => [
        row.id,
        row.amount,
        row.email,
        row.stat == 0 ? "Pending": row.stat == 1 ? "Transit":"Completed",
        row.paid == 1 ? "Paid":"Not-Paid",
        row.date,
        row.created_at
      ].join(','))
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

  console.log(data);

  return (
    <div>
      <div className='d-flex w-100 justify-content-between py-2'>
        <PageTitle title={"Order List"} />
        <Button type='primary' onClick={downloadExel}>Export</Button>
      </div>
      <div className="py-2 w-100 d-flex justify-content-center overflow-auto">
        <Table
          loading={loading}
          columns={[
            {
              title: 'Id',
              dataIndex: 'id',
            },
            {
              title: 'Email',
              dataIndex: 'email',
            },
            {
              title: 'Amount',
              dataIndex: 'amount',
              render: (itm) => (<span>&#8358;{itm}</span>)
            },
            {
              title: 'Date',
              dataIndex: 'date',
            },
            {
              title: 'Status',
              dataIndex: 'stat',
              render: (res) => {
                let statusText;
                let className;

                if (res === 0) {
                  statusText = 'Pending';
                  className = 'text-warning';
                } else if (res === 1) {
                  statusText = 'In Transit';
                  className = 'text-primary';
                } else if (res === 2) {
                  statusText = 'Completed';
                  className = 'text-success';
                }

                return (
                  <span className={className}>
                    {statusText}
                  </span>
                );
              }
            },
            {
              title: 'Payment status',
              dataIndex: 'paid',
              render: (res) => {
                let statusText;
                let className;

                if (res === 1) {
                  statusText = 'Paid';
                  className = 'text-success';
                } else {
                  statusText = 'Not Paid';
                  className = 'text-danger';
                }

                return (
                  <span className={className}>
                    {statusText}
                  </span>
                );
              }
            },
            {
              title: 'Action',
              dataIndex: 'id',
              render: (res) => {
                return (
                  <>
                    <div onClick={() => handleViewOrder(res)}>
                      <Circle size='20px' backgroundColor='#ccc' >
                        <EyeFilled style={{ color: "white" }} />
                      </Circle>
                    </div>
                  </>
                );
              }
            },
          ]}
          dataSource={data}
          size="middle"
          className='w-100'
          key={(record, index) => index} // using the index as the key
        />
      </div>
    </div>
  );
}

export default OrderList;
