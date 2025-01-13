import React, { useEffect, useState, useContext } from 'react';
import PageTitle from '../components/PageTitle';
import { Table, Card, Tag, Spin, message, Button, Form, Input, Upload } from 'antd';
import SearchBar from '../components/SearchBar';
import Circle from '../components/CIrcle';
import { UserOutlined, UploadOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2';
import apis from '../assets/apis';
import { useLocation } from 'react-router-dom';
import AppContext from '../context/AppContext';
import LoadingCenter from '../components/LoadingCenter';

function Deposits() {
    const AppC = useContext(AppContext);
    const { myReq, token } = AppC;

    const [loading, setLoading] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [selectedMethod, setSelectedMethod] = useState(null);
    const [reload,setReload] = useState(false);
    const [form] = Form.useForm();



    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            try {
                const result = await myReq(apis.getDeposits, null, false);
                if (result.status) {
                    setData(result.deposits);
                    setPaymentMethods(result.paymentMethods);
                }
            } catch (e) {
                message.error("Failed to load deposits");
            } finally {
                setLoading(false);
            }
        };
        getData();
    }, [reload]);


    const handlePaymentSelect = (method) => {
        setSelectedMethod(method);
        form.resetFields();
    };


    const handleDepositSubmit = async (values) => {
        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append('amount', values.amount);
            formData.append('paymentMethod', selectedMethod.id);

            if (values.proof.file) {
                formData.append('proof', values.proof.file);
            }

            const response = await fetch(apis.getDeposits, {
                method: 'POST',
                body: formData,
                headers: {
                    "Authorization": `${token}`
                },
            });

            const result = await response.json();

            if (response.ok && result.status) {
                message.success("Deposit request submitted successfully!");
                form.resetFields();
                setSelectedMethod(null);
                setReload(!reload);
            } else {
                message.error(result.message || "Failed to submit deposit request");
            }
        } catch (e) {
            console.error(e);
            message.error("An error occurred while submitting the deposit request");
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div>
            {
                isLoading && <LoadingCenter />
            }
            <div className="w-100 px-1 d-flex justify-content-between align-items-center">
                <PageTitle title="Deposits" />
            </div>
            <Card className="p-2 w-100">
                <div className="py-2">
                    <h3>Select a Payment Method</h3>
                    <div className="d-flex flex-wrap justify-content-center">
                        {paymentMethods.map((method) => (
                            <Card
                                key={method.id}
                                hoverable
                                style={{
                                    width: 120,
                                    height: 120,
                                    margin: 10,
                                    textAlign: 'center',
                                    border: selectedMethod?.id === method.id ? '2px solid #1890ff' : '',
                                }}
                                onClick={() => handlePaymentSelect(method)}
                            >
                                <img src={method.img} alt={method.name} style={{ width: 50, height: 50 }} />
                                <p>{method.name}</p>
                            </Card>
                        ))}
                    </div>
                    {selectedMethod && (
                        <div className="mt-3">
                            <h4>Wallet Details</h4>
                            <p><strong>Payment Method:</strong> {selectedMethod.name}</p>
                            <p><strong>Address:</strong> {selectedMethod.address}</p>
                            <Form form={form} onFinish={handleDepositSubmit}>
                                <Form.Item
                                    name="amount"
                                    rules={[{ required: true, message: 'Please enter the deposit amount' }]}
                                >
                                    <Input type="number" placeholder="Enter amount" />
                                </Form.Item>
                                <Form.Item
                                    name="proof"
                                    valuePropName="file"
                                    rules={[{ required: true, message: 'Please upload proof of payment' }]}
                                >
                                    <Upload maxCount={1} beforeUpload={() => false}>
                                        <Button icon={<UploadOutlined />}>Upload Proof</Button>
                                    </Upload>
                                </Form.Item>
                                <Button type="primary" htmlType="submit">Submit Deposit</Button>
                            </Form>
                        </div>
                    )}
                </div>
                <div className="py-2 w-100 d-flex justify-content-center overflow-auto">
                    <Table
                        loading={loading}
                        columns={[
                            {
                                title: '#',
                                render: () => (<Circle size="30px" backgroundColor="#ccc"><UserOutlined /></Circle>)
                            },
                            {
                                title: 'Date',
                                dataIndex: 'created_at',
                                render: (stat) => (
                                    <span>{new Date(stat).toLocaleDateString()}</span>
                                )
                                
                            },
                            {
                                title: 'Payment Method',
                                dataIndex: 'pay_method',
                                render: (stat,rest) => (
                                    <div className='d-flex justify-content-center'>
                                        <img src={rest.pay_logo} alt={"logo"} style={{ width: 50, height: 50 }} />
                                    </div>
                                )
                            },
                            {
                                title: 'Amount',
                                dataIndex: 'amount',
                                render: (stat) => (
                                    <span>${stat}</span>
                                )
                            },
                            {
                                title: 'Status',
                                dataIndex: 'stat',
                                render: (stat) => (
                                    <Tag color={stat === 1 ? 'green' : 'volcano'}>
                                        {
                                          stat == 1 ? 'Confirmed':'Pending'
                                        }
                                    </Tag>
                                )
                            },
                        ]}
                        dataSource={data}
                        size="middle"
                        className="w-100"
                        rowKey={(record, index) => index}
                    />
                </div>
            </Card>
        </div>
    );
}

export default Deposits;
