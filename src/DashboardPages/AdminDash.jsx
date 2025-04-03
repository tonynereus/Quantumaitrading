import React, { useState, useEffect, useContext } from 'react';
import { Card, Table, Button, Input, Tag, Modal, message, Select, Switch, Form } from 'antd';
import PageTitle from '../components/PageTitle';
import AppContext from '../context/AppContext';
import apis from '../assets/apis';

const { Option } = Select;

function AdminDashboard() {
    const AppC = useContext(AppContext);
    const userData = AppC.data;
    const { myReq } = AppC;

    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [deposits, setDeposits] = useState([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [isPaymentEditModalOpen, setIsPaymentEditModalOpen] = useState(false);
    const [bankTransferDetails, setBankTransferDetails] = useState();
    const [updatingBankTfLoading,setUpdatingBankTfLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const usersResponse = await myReq(apis.getAllUsers, null, false);
                const paymentMethodsResponse = await myReq(apis.getAllPaymentMethods, null, false);
                const depositsResponse = await myReq(apis.getAllDeposits, null, false);
                const bankDetails = await myReq(apis.getDirectBankDetails, null, false);

                if(bankDetails.status){
                    setBankTransferDetails(bankDetails.data);
                }

                if (usersResponse.status && paymentMethodsResponse.status && depositsResponse.status) {
                    setUsers(usersResponse.data);
                    setPaymentMethods(paymentMethodsResponse.data);
                    setDeposits(depositsResponse.data);
                } else {
                    throw new Error('Failed to fetch admin data.');
                }
            } catch (error) {
                message.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const openEditModal = (user) => {
        setEditingUser(user);
        setIsEditModalOpen(true);
    };

    const updateUser = async () => {
        setLoading(true);
        try {
            const response = await myReq(apis.updateUser, editingUser, true);
            if (response.status) {
                message.success('User updated successfully.');
                setUsers(users.map((u) => (u.id === editingUser.id ? editingUser : u)));
                setIsEditModalOpen(false);
            } else {
                throw new Error(response.message || 'Failed to update user.');
            }
        } catch (error) {
            message.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const updatePaymentMethods = async () => {
        setLoading(true);
        try {
            const response = await myReq(apis.updatePaymentMethods, { methods: paymentMethods }, true);
            if (response.status) {
                message.success('Payment methods updated successfully.');
                setIsPaymentEditModalOpen(false);
            } else {
                throw new Error(response.message || 'Failed to update payment methods.');
            }
        } catch (error) {
            message.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const renderUsersTable = () => (
        <Table
            dataSource={users}
            columns={[
                { title: 'Name', dataIndex: 'name', key: 'name' },
                { title: 'Email', dataIndex: 'email', key: 'email' },
                { title: 'Level', dataIndex: 'level', key: 'level' },
                { title: 'Balance', dataIndex: 'balance', key: 'balance' },
                {
                    title: 'Status',
                    dataIndex: 'status',
                    key: 'status',
                    render: (status) => (
                        <Tag color={status === 1 ? 'green' : 'red'}>
                            {status === 1 ? 'Active' : 'Inactive'}
                        </Tag>
                    ),
                },
                {
                    title: 'Actions',
                    key: 'actions',
                    render: (_, user) => (
                        <Button type="link" onClick={() => openEditModal(user)}>
                            Edit
                        </Button>
                    ),
                },
            ]}
            rowKey="id"
            loading={loading}
            pagination={{ pageSize: 10 }}
        />
    );
    const renderDepositTable = () => (
        <Table
            dataSource={deposits}
            columns={[
                { title: 'Email', dataIndex: 'email', key: 'email' },
                { title: 'Paid Via', dataIndex: 'pay_method', key: 'pay_method' },
                { title: 'Amount', dataIndex: 'amount', key: 'amount' },
                {
                    title: 'Proof of Pay',
                    dataIndex: 'proof',
                    key: 'proof',
                    render: (img) => (
                        <img
                            width={150}
                            src={img}
                        />
                    ),
                },
                // {
                //     title: 'Actions',
                //     key: 'actions',
                //     render: (_, user) => (
                //         <Button type="link" onClick={() => openEditModal(user)}>
                //             Edit
                //         </Button>
                //     ),
                // },
            ]}
            rowKey="id"
            loading={loading}
            pagination={{ pageSize: 10 }}
        />
    );

    const renderEditModal = () => (
        <Modal
            title="Edit User"
            visible={isEditModalOpen}
            onOk={updateUser}
            onCancel={() => setIsEditModalOpen(false)}
        >
            {editingUser && (
                <>
                    <Input
                        placeholder="Balance"
                        type="number"
                        value={editingUser.balance}
                        onChange={(e) =>
                            setEditingUser({ ...editingUser, balance: e.target.value })
                        }
                        className="mb-2"
                    />
                    <Select
                        value={editingUser.level}
                        onChange={(value) =>
                            setEditingUser({ ...editingUser, level: value })
                        }
                        className="mb-2"
                        style={{ width: '100%' }}
                    >
                        <Option value={1}>Level 1</Option>
                        <Option value={2}>Level 2</Option>
                        <Option value={3}>Level 3</Option>
                        <Option value={4}>Level 4</Option>
                    </Select>
                    <Switch
                        checked={editingUser.status === 1}
                        onChange={(checked) =>
                            setEditingUser({ ...editingUser, status: checked ? 1 : 0 })
                        }
                    />{' '}
                    Active
                </>
            )}
        </Modal>
    );

    const [form] = Form.useForm();

    const handleUpdate = async (values) => {
        setUpdatingBankTfLoading(true);
        try{
            const response =await myReq(apis.setDirectBankDetails,values,true);
            if(response && response.status){
                message.success("Bank details successfully updated")
            }else{
                throw new Error("Failed to update bank details")
            }
        }catch(err){
            message.error("Failed to update details");
        }finally{
            setUpdatingBankTfLoading(false);
        }
    };

    const BankDetailsCard = () => {
        return (
            <Card title="Edit Bank Details" style={{ width: 400 }}>
                <Form
                    form={form}
                    layout="vertical"
                    initialValues={bankTransferDetails}
                    onFinish={handleUpdate}
                >
                    <Form.Item
                        label="Bank Name"
                        name="bankName"
                        rules={[{ required: true, message: "Please enter bank name" }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Account Name"
                        name="accountName"
                        rules={[{ required: true, message: "Please enter account name" }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Account Number"
                        name="accountNumber"
                        rules={[
                            { required: true, message: "Please enter account number" },
                            { pattern: /^[0-9]+$/, message: "Account number must be numeric" },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Button type="primary" htmlType="submit" block loading={updatingBankTfLoading}>
                        Update Bank Details
                    </Button>
                </Form>
            </Card>
        )
    }

    const renderPaymentEditModal = () => (
        <Modal
            title="Edit Payment Methods"
            visible={isPaymentEditModalOpen}
            onOk={updatePaymentMethods}
            onCancel={() => setIsPaymentEditModalOpen(false)}
        >
            {paymentMethods.map((method, index) => (
                <Form.Item>
                    <div className='d-flex gap-2'>
                        <img src={method.img} alt={method.name} style={{ width: 50, height: 50 }} />
                    </div>
                    <Input
                        key={method.id}
                        placeholder="Address"
                        value={method.address}
                        onChange={(e) => {
                            const updatedMethods = [...paymentMethods];
                            updatedMethods[index].address = e.target.value;
                            setPaymentMethods(updatedMethods);
                        }}
                        className="mb-2"
                    />
                </Form.Item>
            ))}
        </Modal>
    );

    return (
        <div>
            {
                userData.email == apis.mail && <>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <PageTitle title="Admin Dashboard" />
                        <Button
                            type="primary"
                            onClick={() => setIsPaymentEditModalOpen(true)}
                        >
                            Edit Payment Methods
                        </Button>
                    </div>
                    <div className="mb-2">
                        {
                            bankTransferDetails && <BankDetailsCard />
                        }
                    </div>
                    <div className="w-100 ">
                        <Card className='w-100 overflow-auto'>{renderUsersTable()}</Card>
                    </div>
                    {renderEditModal()}
                    {renderPaymentEditModal()}
                    <div className="w-100">
                        <Card className='mt-2 w-100 overflow-auto'>{renderDepositTable()}</Card>
                    </div>
                </>
            }
        </div>
    );
}

export default AdminDashboard;
