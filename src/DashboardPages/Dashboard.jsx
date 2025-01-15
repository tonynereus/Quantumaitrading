import React, { useContext, useState } from 'react';
import {
  WalletOutlined,
  TeamOutlined,
  DollarCircleOutlined,
} from "@ant-design/icons";
import { Card, Input, Space, Statistic, Typography, Form, message, Table } from "antd";
import AppContext from '../context/AppContext';
import LoadingCenter from '../components/LoadingCenter';
import PageTitle from '../components/PageTitle';

import { Box, IconButton, Typography as MTypography } from "@mui/material";
import LineChart from '../components/LineChart';
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import BarChart from '../components/BarChart';


export const colors = {
  grey: {
    100: "#141414",
    200: "#292929",
    300: "#3d3d3d",
    400: "#525252",
    500: "#666666",
    600: "#858585",
    700: "#a3a3a3",
    800: "#c2c2c2",
    900: "#e0e0e0",
  },
  primary: {
    100: "#040509",
    200: "#080b12",
    300: "#0c101b",
    400: "#f2f0f0", // manually changed
    500: "#141b2d",
    600: "#1F2A40",
    700: "#727681",
    800: "#a1a4ab",
    900: "#d0d1d5",
  },
  greenAccent: {
    100: "#0f2922",
    200: "#1e5245",
    300: "#2e7c67",
    400: "#3da58a",
    500: "#4cceac",
    600: "#70d8bd",
    700: "#94e2cd",
    800: "#b7ebde",
    900: "#dbf5ee",
  },
  redAccent: {
    100: "#2c100f",
    200: "#58201e",
    300: "#832f2c",
    400: "#af3f3b",
    500: "#db4f4a",
    600: "#e2726e",
    700: "#e99592",
    800: "#f1b9b7",
    900: "#f8dcdb",
  },
  blueAccent: {
    100: "#151632",
    200: "#2a2d64",
    300: "#3e4396",
    400: "#535ac8",
    500: "#6870fa",
    600: "#868dfb",
    700: "#a4a9fc",
    800: "#c3c6fd",
    900: "#e1e2fe",
  },
};

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
            <Box
              gridColumn="span 4"
              gridRow="span 2"
              backgroundColor={colors.primary[400]}
            >
              <MTypography
                variant="h5"
                fontWeight="600"
                sx={{ padding: "30px 30px 0 30px" }}
              >
                Sales Quantity
              </MTypography>
              <Box height="250px" mt="-20px">
                <BarChart isDashboard={true} />
              </Box>
            </Box>

            {/* <Card className="p-3 mt-3"> */}
            <div className="mt-2"></div>
            <Box
              gridColumn="span 7"
              gridRow="span 2"
              backgroundColor={colors.primary[400]}
            >
              <Box
                mt="25px"
                p="0 30px"
                display="flex "
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <MTypography
                    variant="h5"
                    fontWeight="600"
                    color={colors.grey[100]}
                  >
                    Revenue Generated
                  </MTypography>
                  <MTypography
                    variant="h3"
                    fontWeight="bold"
                    color={colors.greenAccent[500]}
                  >
                    $59,342.3233
                  </MTypography>
                </Box>
                <Box>
                  <IconButton>
                    <DownloadOutlinedIcon
                      sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                    />
                  </IconButton>
                </Box>
              </Box>
              <Box height="250px" m="-20px 0 0 0">
                <LineChart isDashboard={true} />
              </Box>
            </Box>
            {/* </Card> */}
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
