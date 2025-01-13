import React, { useState, useEffect, useContext } from 'react';
import { Card, Table, Button, message, Input, Modal, Tag, Spin } from 'antd';
import PageTitle from '../components/PageTitle';
import AppContext from '../context/AppContext';
import apis from '../assets/apis';

function MyAccount() {
  const AppC = useContext(AppContext);
  const { myReq } = AppC;
  const userData = AppC.data;

  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);

  useEffect(() => {
    const fetchAccountDetails = async () => {
      setLoading(true);
      try {
        const userResponse = await myReq(apis.getUserDetails, null, false);
        const transactionResponse = await myReq(apis.getTransactions, null, false);

        if (userResponse.status && transactionResponse.status) {
          setUserInfo(userResponse.data);
          setTransactions(transactionResponse.data);
        } else {
          throw new Error("Failed to load account details.");
        }
      } catch (error) {
        message.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    // fetchAccountDetails();
  }, []);

  const handleWithdrawRequest = async () => {
    if (!withdrawAmount || !walletAddress) {
      return message.error("Please enter an amount and a wallet address.");
    }

    setLoading(true);
    try {
      const payload = { amount: withdrawAmount, walletAddress };
      const response = await myReq(apis.withdraw, payload, true);

      if (response.status) {
        message.success("Withdrawal request submitted successfully.");
        setIsWithdrawModalOpen(false);
        setWithdrawAmount("");
        setWalletAddress("");
      } else {
        throw new Error(response.message || "Failed to process withdrawal.");
      }
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const renderAccountInfo = () => (
    <div className="mb-3">
      <h4>Account Information</h4>
      <p><strong>Frist Name:</strong> {userData.fname}</p>
      <p><strong>Last Name:</strong> {userData.lname}</p>
      <p><strong>Email:</strong> {userData.email}</p>
      <p><strong>Level :</strong> <Tag color="green">Tier ${userData.level}</Tag></p>
      {/* <p><strong>Wallet Balance:</strong> <Tag color="green">${userData.wallet_balance}</Tag></p> */}
    </div>
  );

  const renderTransactions = () => (
    <Table
      dataSource={transactions}
      loading={loading}
      columns={[
        { title: 'Date', dataIndex: 'date' },
        { title: 'Type', dataIndex: 'type' },
        { title: 'Amount', dataIndex: 'amount', render: (text) => <Tag color="blue">₦{text}</Tag> },
        { title: 'Status', dataIndex: 'status', render: (text) => <Tag color={text === 'Success' ? 'green' : 'red'}>{text}</Tag> },
      ]}
      rowKey="id"
      className="mt-3"
    />
  );

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <PageTitle title="My Account" />
        <Button type="primary" onClick={() => setIsWithdrawModalOpen(true)}>Withdraw</Button>
      </div>
      <Card className="p-3">
        {loading ? <Spin size="large" /> : renderAccountInfo()}
        <h4>Recent Transactions</h4>
        {renderTransactions()}
      </Card>

      <Modal
        title="Withdraw Funds"
        visible={isWithdrawModalOpen}
        onCancel={() => setIsWithdrawModalOpen(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsWithdrawModalOpen(false)}>Cancel</Button>,
          <Button key="withdraw" type="primary" onClick={handleWithdrawRequest}>Submit</Button>,
        ]}
      >
        <div className="mb-3">
          <Input
            type="number"
            placeholder="Enter amount"
            value={withdrawAmount}
            onChange={(e) => setWithdrawAmount(e.target.value)}
          />
        </div>
        <div>
          <Input
            type="text"
            placeholder="Enter wallet address"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
          />
        </div>
      </Modal>
    </div>
  );
}

export default MyAccount;
