import React, { useEffect, useState, useContext } from "react";
import { Card, Typography, Button, Space, Modal, List, message } from "antd";
import {
  DollarCircleOutlined,
  LineChartOutlined,
  FundOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import { Box } from "@mui/material";
import LoadingCenter from "../components/LoadingCenter";
import AppContext from "../context/AppContext";
import apis from "../assets/apis";

const { Title, Text } = Typography;

function Investments() {
  const { myReq , setBalance} = useContext(AppContext);
  const [investmentPlans, setInvestmentPlans] = useState([]);
  const [activeInvestments, setActiveInvestments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  // Fetch investments from the API
  const fetchInvestments = async () => {
    setLoading(true);
    try {
      const response = await myReq(apis.getPlans, {}, false);
      if (response && response.status) {
        setInvestmentPlans(response.plans);
        setActiveInvestments(response.investments);
      } else {
        throw new Error(response.message || "Failed to fetch investments.");
      }
    } catch (error) {
      message.error(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Open a new investment
  const openInvestment = async (planId) => {
    try {
      const response = await myReq(apis.createInvestment, { planId }, true);
      if (response && response.status) {
        message.success("Investment opened successfully.");
        setBalance(response.balance)
        fetchInvestments(); // Refresh the list
      } else {
        throw new Error(response.message || "Failed to open investment.");
      }
    } catch (error) {
      message.error(`Error: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchInvestments();
  }, []);

  const renderActiveInvestments = () => (
    <List
      itemLayout="vertical"
      dataSource={activeInvestments}
      renderItem={(investment) => (
        <List.Item key={investment.id}>
          <Card
            style={{
              borderRadius: 10,
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              background: "linear-gradient(145deg, #ffffff, #f0f0f0)",
            }}
          >
            <Title level={4}>{investment.plan_name}</Title>
            <Text strong>Invested Amount: </Text>${investment.invested_amount}
            <br />
            <Text strong>ROI: </Text>${investment.roi}k / Year
            <br />
            <Text strong>Duration: </Text>{investment.duration_years} years
            <br />
            <Text strong>Status: </Text>
            <span style={{ color: investment.status === "active" ? "green" : "red" }}>
              {investment.status}
            </span>
            <br />
            <Text type="secondary">
              Invested On: {new Date(investment.investment_date).toLocaleDateString()}
            </Text>
          </Card>
        </List.Item>
      )}
    />
  );

  return (
    <div className="container mt-4">
      {loading ? (
        <LoadingCenter />
      ) : (
        <>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
            <Title level={3}>Investment Plans</Title>
            <Button type="primary" size="large" onClick={() => setModalVisible(true)}>
              View All Investments
            </Button>
          </Box>
          <div className="row">
            {investmentPlans &&
              investmentPlans.map((plan) => (
                <div className="col-md-6 col-lg-4 col-xl-3 mt-3" key={plan.id}>
                  <Card
                    style={{
                      borderRadius: 10,
                      background: "linear-gradient(145deg, #f7f7f7, #e3e3e3)",
                      boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
                      overflow: "hidden",
                    }}
                    hoverable
                  >
                    <div style={{ textAlign: "center", marginBottom: 20 }}>
                      {plan.id === 1 && (
                        <DollarCircleOutlined style={{ fontSize: 36, color: "#4caf50" }} />
                      )}
                      {plan.id === 2 && (
                        <LineChartOutlined style={{ fontSize: 36, color: "#ff5722" }} />
                      )}
                      {plan.id === 3 && (
                        <FundOutlined style={{ fontSize: 36, color: "#2196f3" }} />
                      )}
                      {plan.id === 4 && (
                        <TrophyOutlined style={{ fontSize: 36, color: "#ffc107" }} />
                      )}
                    </div>
                    <Title level={4} style={{ textAlign: "center" }}>
                      {plan.name}
                    </Title>
                    <Text
                      type="secondary"
                      style={{ display: "block", textAlign: "center", marginBottom: 20 }}
                    >
                      {plan.description}
                    </Text>
                    <Space direction="vertical" size="middle" style={{ width: "100%" }}>
                      <Text strong>Investment Cost: ${plan.minimum_investment}</Text>
                      <Text strong>ROI: ${plan.roi}k / Year</Text>
                      <Text strong>Duration: {plan.duration_years} years</Text>
                    </Space>
                    <Button
                      type="primary"
                      style={{
                        marginTop: 20,
                        width: "100%",
                        backgroundColor: "#4caf50",
                        borderColor: "#4caf50",
                      }}
                      onClick={() => openInvestment(plan.id)}
                    >
                      Invest Now
                    </Button>
                  </Card>
                </div>
              ))}
          </div>
          <Modal
            title="Active Investments"
            visible={modalVisible}
            onCancel={() => setModalVisible(false)}
            footer={null}
            width={800}
          >
            {renderActiveInvestments()}
          </Modal>
        </>
      )}
    </div>
  );
}

export default Investments;
