import React, { useContext, useState } from 'react';
import {
  WalletOutlined,
  TeamOutlined,
  DollarCircleOutlined,
} from "@ant-design/icons";
import { Card, Input, Button, Space, Statistic, Typography, Form, message , Table } from "antd";
import AppContext from '../context/AppContext';
import LoadingCenter from '../components/LoadingCenter';
import PageTitle from '../components/PageTitle';

function DashboardComponent() {
  const AppC = useContext(AppContext);
  const { myReq } = AppC;
  const userData = AppC.data
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentBalance, setCurrentBalance] = useState(5000); // Example value
  const [referralBalance, setReferralBalance] = useState(1200); // Example value
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawAddress, setWithdrawAddress] = useState("");

  const handleWithdrawalRequest = () => {
    if (!withdrawAmount) {
      return message.error("Please enter an amount to withdraw.");
    }
    // Handle withdrawal logic here
    message.success(`Withdrawal request for ₦${withdrawAmount} submitted.`);
    setWithdrawAmount("");
  };

  const renderTransactions = () => (
    <Table
      dataSource={[]}
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

  const DashboardCard = ({ title, value, icon }) => (
    <div className="col-md-4 col-sm-12 mt-3">
      <Card>
        <Space direction="horizontal" className="w-100 d-flex justify-content-between">
          <Statistic title={title} value={value} prefix={"$"} precision={2} />
          {icon}
        </Space>
      </Card>
    </div>
  );

  return (
    <>
      {isLoading ? (
        <LoadingCenter />
      ) : (
        <div className="container mt-4">
          <PageTitle title="Dashboard" />

          <div className="row">
            {/* Current Balance Card */}
            <DashboardCard
              title="Current Balance"
              value={userData.wallet_balance ?? 0}
              icon={
                <WalletOutlined
                  style={{
                    color: "green",
                    backgroundColor: "rgba(0,255,0,0.1)",
                    borderRadius: 20,
                    fontSize: 24,
                    padding: 8,
                  }}
                />
              }
            />

            {/* Referral Balance Card */}
            <DashboardCard
              title="Referral Balance"
              value={userData.ref_balance ?? 0}
              icon={
                <TeamOutlined
                  style={{
                    color: "blue",
                    backgroundColor: "rgba(0,0,255,0.1)",
                    borderRadius: 20,
                    fontSize: 24,
                    padding: 8,
                  }}
                />
              }
            />
            <Card className="p-3 mt-3">
              <h4>Recent Trades</h4>
              {renderTransactions()}
            </Card>

            {/* Withdrawal Form Card */}
            
          </div>
        </div>
      )}
    </>
  );
}

export default DashboardComponent;
