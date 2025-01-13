import { Typography } from "antd";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BannerUploader from "./BannerImg";
import ProtectedRoute from "./ProtectedRoute";
import apis from "../../assets/apis";
import AppContext from "../../context/AppContext";
import { Button, Modal, Form, Input, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const ManageSubCategories = () => {
    const [category, setCategory] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [banner, setBanner] = useState('');
    const [collections, setCollections] = useState([]);
    const [moadalLoading, setModalLoading] = useState(false);
    const [subCategories, setSubCategories] = useState({
        shopByType: [], forWomen: [], forMen: []
    });
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [newCollection, setNewCollection] = useState({ name: '', title: '', description: '', banner: null });

    const location = useLocation();
    const navigate = useNavigate();
    const AppC = useContext(AppContext);
    const userToken = AppC.token || location.state.token;

    const handleBannersUpload = async (formData) => {
        try {
            const response = await fetch(apis.categoryBanner, {
                method: 'POST',
                body: formData,
                headers: {
                    authorization: userToken
                }
            });

            const resu = await response.json();
            console.log(resu);
            if (resu.status === true || resu.status === false) {
                return resu;
            }
            if (!response.ok) {
                throw new Error('Failed to upload banner.');
            }


        }
        catch (err) {
            throw new Error('Failed to upload banner.');
        }
    }
    useEffect(() => {
        if (!location.state || !location.state.subCats) {
            alert("yes");
            //navigate("/dashboard/categories", { replace: true });
            return;
        }
        const data = location.state.subCats;
        console.log(data);
        setCategory(data.category);
        setCollections(data.collections);
        setCategoryId(data.id);
        setBanner(data.banner);
        setSubCategories(data.subCategories);
    }, [location.state, navigate]);

    const handleSubCategoryClick = (subCategory) => {
        navigate("/dashboard/subcat-items", {
            state: {
                subCategory: subCategory.subCategory,
                subCatId: subCategory.id,
                token: location.state.token,
                data: location.state.data
            }
        });
    };
    const handleCollectionClick = (collections) => {
        navigate("/dashboard/collections", {
            state: {
                collections: {
                    ...collections,
                    categoryId: categoryId
                },
                token: location.state.token,
                data: location.state.data
            }
        });
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleFormChange = (e) => {
        setNewCollection({ ...newCollection, [e.target.name]: e.target.value });
    };

    const handleFileChange = (info) => {
        setNewCollection({ ...newCollection, banner: info });
    };

    const handleAddCollection = async () => {
        const formData = new FormData();
        formData.append('name', newCollection.name);
        formData.append('title', newCollection.title);
        formData.append('description', newCollection.description);
        formData.append('banner', newCollection.banner);
        formData.append('category_id', categoryId);

        try {
            setModalLoading(true);
            const response = await fetch(apis.addCollection, {
                method: 'POST',
                headers: {
                    'Authorization': `${userToken}`,
                },
                body: formData,
            });

            const data = await response.json();
            if (data.status) {
                message.success(data.message || 'Collection added successfully.');
                setIsModalVisible(false);
                setCollections([...collections, data.collection]);
            } else {
                throw new Error(data.message || 'Failed to add collection.');
            }
        } catch (error) {
            message.error(error.message || 'Failed to add collection.');
        } finally {
            setModalLoading(false);
        }
    };

    return (
        <div>
            <div className="w-100 p-3 d-flex justify-content-between align-items-center">
                <Typography.Title level={2}>{category}</Typography.Title>
                <Button type="primary" onClick={showModal}>Add Collection</Button>
            </div>
            <div className="w-100 p-2">
                <div className="w-100 m-0 row m-0 justify-content-center">
                    <div className="col-md-4 col-6">
                        <Typography.Title level={5}>For Men</Typography.Title>
                        <ul>
                            {subCategories.forMen.map((x, ind) => (
                                <li className="sub" key={ind} onClick={() => handleSubCategoryClick(x)}>{x.subCategory}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="col-md-4 col-6">
                        <Typography.Title level={5}>By Type</Typography.Title>
                        <ul>
                            {subCategories.shopByType.map((x, ind) => (
                                <li className="sub" key={ind} onClick={() => handleSubCategoryClick(x)}>{x.subCategory}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="col-md-4 col-6">
                        <Typography.Title level={5}>For Women</Typography.Title>
                        <ul>
                            {subCategories.forWomen.map((x, ind) => (
                                <li className="sub" key={ind} onClick={() => handleSubCategoryClick(x)}>{x.subCategory}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="col-md-4 col-6">
                        <Typography.Title level={5}>Collections</Typography.Title>
                        <ul>
                            {collections.map((x, ind) => (
                                <li className="sub" key={ind} onClick={() => handleCollectionClick(x)}>{x.name}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="py-2">
                <div className="d-flex flex-column">
                    <Typography.Title level={3} style={{ margin: 0 }}>Category Banner</Typography.Title>
                    <span style={{ color: "#888", fontSize: "small" }}>
                        Recommended Image size: 799 x 1000 (px)
                    </span>
                </div>
                <BannerUploader cat={categoryId} currentBanners={[{ id: 1, url: banner }]} onUpload={handleBannersUpload} reload={() => { }} />
            </div>
            <Modal
                title="Add New Collection"
                open={isModalVisible}
                onCancel={handleCancel}
                onOk={handleAddCollection}
                loading={moadalLoading}
            >
                <Form layout="vertical">
                    <Form.Item label="Name">
                        <Input
                            name="name"
                            value={newCollection.name}
                            onChange={handleFormChange}
                        />
                    </Form.Item>
                    <Form.Item label="Title">
                        <Input
                            name="title"
                            value={newCollection.title}
                            onChange={handleFormChange}
                        />
                    </Form.Item>
                    <Form.Item label="Description">
                        <Input
                            name="description"
                            value={newCollection.description}
                            onChange={handleFormChange}
                        />
                    </Form.Item>
                    <Form.Item label="Banner">
                        <Upload
                            listType="picture"
                            beforeUpload={(file) => {
                                handleFileChange(file);
                                return false; // Prevent auto upload
                            }}
                            onRemove={() => setNewCollection({ ...newCollection, banner: null })}
                        >
                            <Button icon={<UploadOutlined />}>Upload Banner</Button>
                        </Upload>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

// ['subCats', 'token', 'data']
const ProtectedManageSubCategories = () => (
    <ProtectedRoute requiredState={['subCats']}>
        <ManageSubCategories />
    </ProtectedRoute>
);

export default ProtectedManageSubCategories;
