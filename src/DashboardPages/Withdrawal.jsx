import React, { useContext, useState } from 'react';
import {
    WalletOutlined,
    TeamOutlined,
} from "@ant-design/icons";
import { Card, Input, Button, Space, Statistic, Typography, Form, message } from "antd";
import AppContext from '../context/AppContext';
import LoadingCenter from '../components/LoadingCenter';
import PageTitle from '../components/PageTitle';
import apis from '../assets/apis';

function Withdrawal() {
    const AppC = useContext(AppContext);
    const { myReq , setBalance} = AppC;
    const userData = AppC.data;
    const [isLoading, setIsLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [withdrawAmount, setWithdrawAmount] = useState("");
    const [withdrawAddress, setWithdrawAddress] = useState("");

    const handleWithdrawalRequest = async () => {
        if (!withdrawAmount || !withdrawAddress) {
            return message.error("Please enter an amount and a wallet address to withdraw.");
        }
        setLoading(true);
    
        try {
            const payload = {
                amount: withdrawAmount,
                walletAddress:withdrawAddress,
            };
    
            const response = await myReq(apis.getWithdraw, payload, true); // Assuming `apis.withdraw` points to the correct endpoint
    
            if (response && response.status) {
                message.success("Withdrawal request submitted successfully.");
                setWithdrawAmount("");
                setWithdrawAddress("");
                setBalance(response.balance)
            } else {
                throw new Error(response.message || "Failed to submit withdrawal request.");
            }
        } catch (error) {
            message.error(`Error: ${error.message}`);
        }finally{
            setLoading(false);
        }
    };
    

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
                   {
                    loading && <LoadingCenter />
                   }
                    <PageTitle title="Withdrawal" />

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

                        {/* Withdrawal Form Card */}
                        <div className="col-md-4 col-sm-12 mt-3">
                            <Card>
                                <Typography.Title level={4}>Request Withdrawal</Typography.Title>
                                <Form layout="vertical">
                                    <Form.Item label="Input Wallet" required>
                                        <Input
                                            type="text"
                                            placeholder="0x32"
                                            value={withdrawAddress}
                                            onChange={(e) => setWithdrawAddress(e.target.value)}
                                        />
                                    </Form.Item>
                                    <Form.Item label="Amount" required>
                                        <Input
                                            type="number"
                                            placeholder="Enter amount"
                                            value={withdrawAmount}
                                            onChange={(e) => setWithdrawAmount(e.target.value)}
                                        />
                                    </Form.Item>
                                    <Button
                                        type="primary"
                                        block
                                        onClick={handleWithdrawalRequest}
                                    >
                                        Submit Request
                                    </Button>
                                </Form>
                            </Card>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Withdrawal;
