// BlogCard.jsx
import React, { useState } from 'react';
import { Card, Button, Modal, Avatar, Typography, Form, Input, Upload } from 'antd';
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2';

const { Meta } = Card;

const BlogCard = ({ blog, onDelete, onView, onEdit }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editForm] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsEditMode(false);
  };

  const handleEditClick = () => {
    setIsEditMode(true);
    showModal();
  };

  const handleDeleteClick = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you really want to delete the blog titled "${blog.title}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete(blog);
        setIsModalVisible(false);
      }
    });
  };

  const handleEditSubmit = () => {
    editForm.validateFields().then((values) => {
      const formData = new FormData();
      formData.append('blogId', blog.id);
      formData.append('title', values.title);
      formData.append('description', values.description);
      formData.append('body', values.body);

      if (values.banner && values.banner.file) {
        formData.append('banner', values.banner.file);
      }

      onEdit(formData);
      setIsModalVisible(false);
      setIsEditMode(false);
    });
  };

  return (
    <>
      <Card
        style={{ width: 240, margin: 6 }}
        hoverable
        actions={[
          <Button type="primary" onClick={() => showModal()}>View</Button>,
          <Button type="default" onClick={handleEditClick}>Edit</Button>,
          <Button type="danger" onClick={handleDeleteClick}>Delete</Button>,
        ]}
      >
        <Meta
          avatar={<Avatar src={blog.bannerUrl} />}
          title={blog.title}
          description={<Typography.Paragraph ellipsis={{ rows: 2 }}>{blog.body}</Typography.Paragraph>}
        />
      </Card>

      {/* Modal for Viewing or Editing */}
      <Modal
        title={isEditMode ? 'Edit Blog' : blog.title}
        visible={isModalVisible}
        onCancel={handleCancel}
        onOk={isEditMode ? handleEditSubmit : null}
        footer={isEditMode ? [
          <Button key="back" onClick={handleCancel}>Cancel</Button>,
          <Button key="submit" type="primary" onClick={handleEditSubmit}>Save Changes</Button>,
        ] : null}
      >
        {isEditMode ? (
          <Form form={editForm} layout="vertical" initialValues={blog}>
            <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Please input the title' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="description" label="Description" rules={[{ required: true, message: 'Please input the description' }]}>
              <Input.TextArea rows={2} />
            </Form.Item>
            <Form.Item name="body" label="Body" rules={[{ required: true, message: 'Please input the body' }]}>
              <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item name="banner" label="Banner">
              <Upload
                listType="picture"
                maxCount={1}
                beforeUpload={() => false}
              >
                <Button icon={<UploadOutlined />}>Select New Banner</Button>
              </Upload>
            </Form.Item>
          </Form>
        ) : (
          <>
            <img alt={blog.title} src={blog.bannerUrl} style={{ width: '100%' }} />
            <h3>{blog.title}</h3>
            <p>{blog.description}</p>
            <p>{blog.body}</p>
          </>
        )}
      </Modal>
    </>
  );
};

export default BlogCard;
