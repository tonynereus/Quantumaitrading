import React, { useState, useEffect ,useContext} from "react";
import { Typography, Input, Button, message, Upload, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
// import apis from "../../API/appapis"; // Adjust the import path as needed
import apis from "../../assets/apis";
import LoadingCenter from "../../components/LoadingCenter";
import AppContext from "../../context/AppContext";

const EditProduct = () => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        highlight: [],
        composition: [],
        photo: null,
        morePicture: []
    });
    const [initialImages, setInitialImages] = useState({
        photo: null,
        morePicture: []
    });

    const [isLoading,updateLoading] = useState(false);
    const location = useLocation();
    const AppC = useContext(AppContext);
    const userToken = AppC.token || location.state.token;
    const { productId } = location.state || {};

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await fetch(apis.base + "getProductById", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ productId })
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || "Failed to fetch product details");
                }

                // Update form data with fetched product details
                setFormData({
                    title: data.name,
                    description: data.description,
                    price: data.price,
                    highlight: data.highlight,
                    composition: data.composition,
                    photo: { uid: data.img, name: data.img, url: data.img }, // Assume the API provides a URL or image name
                    morePicture: data.morePicture.map(url => ({
                        uid: url, // unique id for each image
                        name: url,
                        status: 'done',
                        url
                    }))
                });

                // Set initial images
                setInitialImages({
                    photo: { uid: data.img, name: data.img, url: data.img },
                    morePicture: data.morePicture.map(url => ({
                        uid: url,
                        name: url,
                        status: 'done',
                        url
                    }))
                });

            } catch (error) {
                console.error("Error fetching product details:", error);
                message.error(error.message || "Failed to fetch product details.");
            }
        };

        if (productId) {
            fetchProductDetails();
        }
    }, [productId, userToken]);

    const handleChange = (key, value) => {
        setFormData({ ...formData, [key]: value });
    };

    const handleCompositionChange = (index, value) => {
        const newComposition = [...formData.composition];
        newComposition[index] = value;
        setFormData({ ...formData, composition: newComposition });
    };

    const handleHighlightChange = (index, value) => {
        const newHighlight = [...formData.highlight];
        newHighlight[index] = value;
        setFormData({ ...formData, highlight: newHighlight });
    };

    const handleAddHighlight = () => {
        setFormData({ ...formData, highlight: [...formData.highlight, ""] });
    };

    const handleAddComposition = () => {
        setFormData({ ...formData, composition: [...formData.composition, ""] });
    };

    const handleRemoveHighlight = (index) => {
        const newHighlight = formData.highlight.filter((_, i) => i !== index);
        setFormData({ ...formData, highlight: newHighlight });
    };

    const handleRemoveComposition = (index) => {
        const newComposition = formData.composition.filter((_, i) => i !== index);
        setFormData({ ...formData, composition: newComposition });
    };

    const handlePhotoChange = (file) => {
        setFormData({ ...formData, photo: file });
    };

    const removePhoto = () => {
        setFormData({ ...formData, photo: null });
    };

    const handleMorePictureChange = ({ fileList: newFileList }) => setFormData({ ...formData, morePicture: newFileList });

    const handleUpdateProduct = async () => {
        try {
            const formDataToSend = new FormData();
            formDataToSend.append("productId", productId); // Include the product ID for update
            formDataToSend.append("title", formData.title);
            formDataToSend.append("description", formData.description);
            formDataToSend.append("price", formData.price);

            // Only include photo if it has been changed
           
            if (formData.photo != null && formData.photo.uid !== initialImages.photo.uid) {
                formDataToSend.append("photo", formData.photo.originFileObj || formData.photo);
            }

            // Append highlights and compositions
            formData.highlight.forEach((highlight) => formDataToSend.append("highlight", highlight));
            formData.composition.forEach((composition) => formDataToSend.append("composition", composition));

            // Only include more pictures if they have been changed
            const newMorePictures = formData.morePicture.filter(pic => !initialImages.morePicture.some(initialPic => initialPic.uid === pic.uid));
            newMorePictures.forEach((pic) => {
                const file = pic.originFileObj || pic;
                formDataToSend.append("morePicture", file, file.name);
            });

            updateLoading(true);
            const response = await fetch(apis.base + "editProduct", { // Replace with your update API endpoint
                method: "POST",
                headers: {
                    "Authorization": `${userToken}`,
                },
                body: formDataToSend
            });
            updateLoading(false);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to update product");
            }

            message.success("Product updated successfully");
            // Redirect or do something else upon successful update
        } catch (error) {
            updateLoading(false);
            console.error("Error updating product:", error);
            message.error(error.message || "Failed to update product. Please try again later.");
        }
    };

    const UploadButton = ({ mes }) => {
        return (
            <button
                style={{
                    border: 0,
                    background: 'none',
                }}
                type="button"
            >
                <PlusOutlined />
                <div
                    style={{
                        marginTop: 8,
                    }}
                >
                    {mes}
                </div>
            </button>
        );
    };

    return (
        <div style={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
            {
                isLoading && <LoadingCenter />
            }
            <Typography.Title level={2}>Edit Product</Typography.Title>
            <Space direction="vertical" size="large">
                <Input placeholder="Title" value={formData.title} onChange={(e) => handleChange("title", e.target.value)} />
                <Input placeholder="Price" type="number" value={formData.price} onChange={(e) => handleChange("price", e.target.value)} />
                <Input.TextArea placeholder="Description" value={formData.description} onChange={(e) => handleChange("description", e.target.value)} />
                <div>
                    <Typography.Text>Photo:</Typography.Text>
                    <Upload
                        beforeUpload={(file) => {
                            handlePhotoChange(file);
                            return false; // Prevent automatic upload
                        }}
                        onRemove={removePhoto}
                        fileList={formData.photo ? [formData.photo] : []}
                        listType="picture-card"
                    >
                        {formData.photo == null ? <Button icon={<PlusOutlined />}></Button> : null}
                    </Upload>
                </div>
                <div>
                    <Typography.Text>Highlights:</Typography.Text>
                    {formData.highlight.map((highlight, index) => (
                        <div key={index} style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
                            <Input
                                style={{ flex: 1, marginRight: "8px" }}
                                placeholder={`Highlight ${index + 1}`}
                                value={highlight}
                                onChange={(e) => handleHighlightChange(index, e.target.value)}
                            />
                            <Button onClick={() => handleRemoveHighlight(index)} type="danger">Remove</Button>
                        </div>
                    ))}
                    <Button onClick={handleAddHighlight}>Add Highlight Field</Button>
                </div>
                <div>
                    <Typography.Text>Composition:</Typography.Text>
                    {formData.composition.map((comp, index) => (
                        <div key={index} style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
                            <Input
                                style={{ flex: 1, marginRight: "8px" }}
                                placeholder={`Composition ${index + 1}`}
                                value={comp}
                                onChange={(e) => handleCompositionChange(index, e.target.value)}
                            />
                            <Button onClick={() => handleRemoveComposition(index)} type="danger">Remove</Button>
                        </div>
                    ))}
                    <Button onClick={handleAddComposition}>Add Composition Field</Button>
                </div>
                <div>
                    <Typography.Text>More Pictures:</Typography.Text>
                    <Upload
                        beforeUpload={(file) => {
                            const newMorePicture = [...formData.morePicture, file];
                            setFormData({ ...formData, morePicture: newMorePicture });
                            return false; // Prevent automatic upload
                        }}
                        fileList={formData.morePicture}
                        onChange={handleMorePictureChange}
                        listType="picture-card"
                    >
                        {formData.morePicture.length >= 4 ? null : <UploadButton mes={"More Picture"} />}
                    </Upload>
                </div>
            </Space>
            <div style={{ textAlign: "center", marginTop: "20px" }}>
                <Button type="primary" onClick={handleUpdateProduct}>Update Product</Button>
            </div>
        </div>
    );
};

export default EditProduct;
