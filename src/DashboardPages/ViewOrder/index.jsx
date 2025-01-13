import React, { useEffect, useState, useContext } from 'react';
import { Card, List, Typography, Descriptions, Row, Col, message, Image, Button, Spin, Modal } from 'antd';
import { useLocation } from 'react-router-dom';
import apis from '../../assets/apis'; // Adjust the import path as needed
import AppContext from '../../context/AppContext';



const { Title } = Typography;

const OrderPreview = () => {
    const [orderData, setOrderData] = useState(null);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const AppC = useContext(AppContext);
    const userToken = AppC.token || location.state.token;

    const { orderId } = location.state || {} // Assume route parameter for order ID
    //const history = useHistory();

    const [confirming, setConfirming] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isDispatchModalVisible, setIsDispatchModalVisible] = useState(false);


    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const response = await fetch(`${apis.viewOrder + orderId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: userToken
                    }
                    // body: JSON.stringify({ orderId })
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch order details");
                }

                const data = await response.json();
                setOrderData(data.order);
            } catch (error) {
                console.error("Error fetching order details:", error);
                message.error(error.message || "Failed to fetch order details.");
            } finally {
                setLoading(false);
            }
        };

        fetchOrderDetails();
    }, [orderId]);

    const handleConfirmOrder = async () => {
        setConfirming(true);
        try {
            const response = await fetch(`${apis.confirmOrder}`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    authorization: userToken
                },
                body: JSON.stringify({ orderId }),
            });

            const data = await response.json();
            if (data.status) {
                message.success('Order confirmed successfully!');
                //history.push('/orders'); // Redirect to orders list or another page
            } else {
                message.error(data.message || 'Failed to confirm order.');
            }
        } catch (error) {
            console.error('Error confirming order:', error);
            message.error('Failed to confirm order.');
        } finally {
            setConfirming(false);
            setIsModalVisible(false);
        }
    };
    const handleConfirmDispatch = async () => {
        setConfirming(true);
        try {
            const response = await fetch(`${apis.confirmDispatch}`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    authorization: userToken
                },
                body: JSON.stringify({ orderId }),
            });

            const data = await response.json();
            if (data.status) {
                message.success('Order dispatched successfully!');
                //history.push('/orders'); // Redirect to orders list or another page
            } else {
                message.error(data.message || 'Failed to dispatch order.');
            }
        } catch (error) {
            console.error('Error dispatching order:', error);
            message.error('Failed to dispatch order.');
        } finally {
            setConfirming(false);
            setIsModalVisible(false);
        }
    };

    const showModal = () => {
        setIsModalVisible(true);
    };
    const showDispatchModal = () => {
        setIsDispatchModalVisible(true);
    };

    const handleModalOk = () => {
        handleConfirmOrder();
    };
    const handleDispatchModalOk = () => {
        handleConfirmDispatch();
    };

    const handleModalCancel = () => {
        setIsModalVisible(false);
    };

    const handleDispatchModalCancel = () => {
        setIsDispatchModalVisible(false);
    };


    if (loading) return <Spin />;
    if (!orderData) return <p>No order data found</p>;

    return (
        <div style={{ maxWidth: '800px', margin: '20px auto', padding: '20px' }}>
            <Card>
                <Title level={2}>Order Preview</Title>
                <Descriptions bordered>
                    <Descriptions.Item label="Order ID">{orderData.order_id}</Descriptions.Item>
                    <Descriptions.Item label="Item price">&#8358;{orderData.products_fee}</Descriptions.Item>
                    <Descriptions.Item label="Delivery fee">&#8358;{orderData.delivery_fee}</Descriptions.Item>
                    <Descriptions.Item label="Tax">&#8358;{orderData.tax}</Descriptions.Item>
                    <Descriptions.Item label="Total">&#8358;{orderData.total_amount}</Descriptions.Item>
                    <Descriptions.Item label="Payment Status">{orderData.pay_s}</Descriptions.Item>
                    <Descriptions.Item label="Order Date">{new Date(orderData.created_at).toLocaleDateString('en-GB')}</Descriptions.Item>
                </Descriptions>

                <Title level={3} style={{ marginTop: '20px' }}>Items Ordered</Title>
                <List
                    itemLayout="horizontal"
                    dataSource={orderData.products}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Image src={item.photo} alt={item.title} width={50} />}
                                title={item.title}
                                description={<span>Size: {item.size} | Price: &#8358;{item.price}</span>}
                            />
                        </List.Item>
                    )}
                />

                <Title level={3} style={{ marginTop: '20px' }}>Delivery Information</Title>
                <Descriptions bordered>
                    <Descriptions.Item label="Name">{orderData.delivery_info.firstN} {orderData.delivery_info.lastN}</Descriptions.Item>
                    <Descriptions.Item label="Phone">{orderData.delivery_info.pno}</Descriptions.Item>
                    <Descriptions.Item label="Email">{orderData.delivery_info.email}</Descriptions.Item>
                    <Descriptions.Item label="City">{orderData.city}</Descriptions.Item>
                    <Descriptions.Item label="Address">{orderData.addr}</Descriptions.Item>
                    <Descriptions.Item label="Additional delivery info">{orderData.additionalDeliveryInfo}</Descriptions.Item>
                    {/* <Descriptions.Item label="Town">{orderData.delivery_info.town}</Descriptions.Item> */}
                </Descriptions>
                <div className="py-4 d-flex justify-content-end" style={{gap:6}}>
                    <Button
                        type="primary"
                        onClick={showDispatchModal}
                        loading={confirming}
                    >
                        Dispatch Order
                    </Button>
                    <Button
                        type="primary"
                        onClick={showModal}
                        loading={confirming}
                    >
                        Confirm Order
                    </Button>
                </div>

            </Card>
            <Modal
                title="Confirm Order"
                open={isModalVisible}
                onOk={handleModalOk}
                confirmLoading={confirming}
                onCancel={handleModalCancel}
            >
                <p>Are you sure you want to confirm this order?</p>
            </Modal>

            <Modal
                title="Dispatch Order"
                open={isDispatchModalVisible}
                onOk={handleDispatchModalOk}
                confirmLoading={confirming}
                onCancel={handleDispatchModalCancel}
            >
                <p>Are you sure you want to dispatch this order?</p>
            </Modal>
        </div>
    );
};

export default OrderPreview;




