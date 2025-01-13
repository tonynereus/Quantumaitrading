import React, { useState } from 'react';
import { Form, Input, Button, Select, message, Spin } from 'antd';
import { MailOutlined, LockOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import style from "./style.module.css";
import apis from '../../assets/apis';

const { Option } = Select;

const AdminForm = ({ roles, isLoadingRoles, token }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false); // State for request loader

  const onFinish = async (values) => {
    setLoading(true); // Show loader

    try {
      // Prepare data
      const adminData = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
        phone: values.phoneNumber,
        role: values.role,
        stat: 1, // Assuming 'stat' is the status field; 1 for active
      };

      // Send data to the backend
      const response = await fetch(apis.createUser, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`,
        },
        body: JSON.stringify(adminData),
      });

      const result = await response.json();

      if (response.ok) {
        message.success(result.message || 'Admin successfully created!');
        form.resetFields(); // Clear form
      } else {
        throw new Error(result.message || 'Failed to create admin.');
      }
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false); // Hide loader
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    message.error('Please check the form fields and try again.');
  };

  return (
    <Spin spinning={loading || isLoadingRoles}>
      <Form
        form={form}
        name="adminForm"
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className={style.adminForm}
      >
        <Form.Item
          name="firstName"
          label="First Name"
          rules={[{ required: true, message: 'Please enter the first name!' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="First Name" />
        </Form.Item>

        <Form.Item
          name="lastName"
          label="Last Name"
          rules={[{ required: true, message: 'Please enter the last name!' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Last Name" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Please enter the email!' },
            { type: 'email', message: 'Please enter a valid email!' }
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="role"
          label="Role"
          rules={[{ required: true, message: 'Please select the role!' }]}
        >
          <Select placeholder="Select a role" disabled={isLoadingRoles}>
            {roles.map((role) => (
              <Option key={role.id} value={role.id}>{role.role}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="phoneNumber"
          label="Phone Number"
          rules={[
            { required: true, message: 'Please enter the phone number!' },
            { pattern: /^[0-9\b]+$/, message: 'Please enter a valid phone number!' }
          ]}
        >
          <Input prefix={<PhoneOutlined />} placeholder="Phone Number" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            { required: true, message: 'Please enter the password!' },
            { min: 6, message: 'Password must be at least 6 characters long!' }
          ]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-100" disabled={loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default AdminForm;
