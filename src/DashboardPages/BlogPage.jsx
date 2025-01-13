import React, { useEffect, useState, useContext } from 'react';
import { Card, Typography, message, Button, Modal, Form, Input, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import BlogCard from '../components/BlogCard';
import apis from '../assets/apis';
import AppContext from '../context/AppContext';
import LoadingCenter from "../components/LoadingCenter";
import PageTitle from '../components/PageTitle';

const { TextArea } = Input;

const BlogPage = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [reload, setReload] = useState(false);
    const [newBlog, setNewBlog] = useState({ title: '', description: '', body: '', banner: null });
    const [morePictures, setMorePictures] = useState([]);

    const AppC = useContext(AppContext);
    const userToken = AppC.token;
    const { myReq } = AppC;

    useEffect(() => {
        const fetchBlogs = async () => {
            setLoading(true);
            try {
                const data = await myReq(apis.getBlogs, {}, false);
                if (data.status) {
                    setBlogs(data.data);
                } else {
                    throw new Error(data.message || 'Failed to fetch blogs.');
                }
            } catch (error) {
                message.error(error.message || "Error");
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, [userToken, reload]);

    const handleFileChange = (info) => {
        setNewBlog({ ...newBlog, banner: info });
    };

    const handleMorePicturesChange = ({ fileList }) => {
        if (fileList.length <= 3) {
            setMorePictures(fileList);
        } else {
            message.error('You can only upload a maximum of 3 images.');
        }
    };

    const handleAddBlog = async () => {
        const formData = new FormData();
        formData.append('title', newBlog.title);
        formData.append('description', newBlog.description);
        formData.append('body', newBlog.body);
        formData.append('banner', newBlog.banner);

        // Add the "more pictures"
        morePictures.forEach((file, index) => {
            formData.append(`more_pictures[]`, file.originFileObj);
        });

        try {
            const response = await fetch(apis.addBlog, {
                method: 'POST',
                headers: {
                    'Authorization': `${userToken}`,
                },
                body: formData,
            });
            const data = await response.json();
            if (data.status) {
                message.success(data.message || 'Blog added successfully.');
                setIsModalVisible(false);
                setReload(!reload);
            } else {
                throw new Error(data.message || 'Failed to add blog.');
            }
        } catch (error) {
            message.error(error.message || 'Failed to add blog.');
        }
    };

    const handleEdit = async (formData) => {
        try {
            const response = await fetch(apis.editBlog, {
                method: 'POST',
                headers: {
                    'Authorization': `${userToken}`,
                    // No need to set 'Content-Type' for FormData. The browser will set it automatically.
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to edit blog.');
            }

            const updatedBlog = await response.json();

            // Update the blog list with the edited blog
            setBlogs(blogs.map(blog => blog.id === updatedBlog.blog.id ? updatedBlog.blog : blog));
            message.success(`Blog "${updatedBlog.blog.title}" has been updated successfully.`);
        } catch (error) {
            message.error(error.message || 'Failed to edit blog.');
        }
    };

    const handleDelete = async (blog) => {
        try {
            const resu = await myReq(apis.deleteBlog, { blogId: blog.id });
            if (resu.status) {
                setBlogs(blogs.filter(b => b.id !== blog.id));
                message.success(`Blog "${blog.title}" has been deleted.`);
            } else {
                throw new Error(resu.message || 'Failed to delete blog.');
            }
        } catch (error) {
            message.error(error.message || 'Failed to delete blog.');
        }
    };

    const handleFormChange = (e) => {
        setNewBlog({ ...newBlog, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <PageTitle title="Blogs" />
            {loading && <LoadingCenter />}
            <div className="container mt-5 d-flex flex-wrap justify-content-center">
                <Card
                    hoverable
                    style={{ width: 240, margin: 5, textAlign: 'center' }}
                    onClick={() => setIsModalVisible(true)}
                >
                    <Typography.Title><UploadOutlined /></Typography.Title>
                    <p>Add Blog</p>
                </Card>
                {blogs.map(blog => (
                    <BlogCard
                        key={blog.id}
                        blog={blog}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                ))}
            </div>

            <Modal
                title="Add New Blog"
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                onOk={handleAddBlog}
            >
                <Form layout="vertical">
                    <Form.Item label="Title">
                        <Input
                            name="title"
                            value={newBlog.title}
                            onChange={handleFormChange}
                        />
                    </Form.Item>
                    <Form.Item label="Description">
                        <TextArea
                            name="description"
                            value={newBlog.description}
                            onChange={handleFormChange}
                        />
                    </Form.Item>
                    <Form.Item label="Body">
                        <TextArea
                            rows={7}
                            name="body"
                            value={newBlog.body}
                            onChange={handleFormChange}
                        />
                    </Form.Item>
                    <Form.Item label="Banner">
                        <Upload
                            listType="picture"
                            beforeUpload={(fil) => {
                                handleFileChange(fil);
                                return false;
                            }}
                            onRemove={() => { setNewBlog({ ...newBlog, banner: null }); }}
                        >
                            <Button icon={<UploadOutlined />}>Upload Banner</Button>
                        </Upload>
                        <div>
                            <span style={{ color: "#888", fontSize: "small" }}>
                                Recommended Image size: 384 x 480 (px)
                            </span>
                        </div>
                    </Form.Item>
                    <Form.Item label="More Pictures (Max 3)">
                        <Upload
                            multiple={true}
                            listType="picture"
                            fileList={morePictures}
                            beforeUpload={() => false}
                            onChange={handleMorePicturesChange}
                        >
                            {morePictures.length < 3 && (
                                <Button icon={<UploadOutlined />}>Upload More Pictures</Button>
                            )}
                        </Upload>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default BlogPage;
