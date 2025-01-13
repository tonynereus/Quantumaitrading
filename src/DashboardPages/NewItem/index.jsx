import { useState, useContext } from "react";
import { Typography, Input, Button, message, Upload, Space } from "antd";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import apis from "../../API/appapis";
import LoadingCenter from "../../components/LoadingCenter";
import AppContext from "antd/es/app/context";

const AddProduct = () => {
    const [isLoading, updateLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        highlight: [],
        composition: [],
        photo: null,
        morePicture: [],
        howToStyle: [] // New field for "How to Style" uploads
    });

    const location = useLocation();
    const AppC = useContext(AppContext);
    const userToken = AppC.token || location.state.token;
    const { subCatId } = location.state || {};

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

    const handleMorePictureChange = (index, file) => {
        const newMorePicture = [...formData.morePicture];
        newMorePicture[index] = file;
        setFormData({ ...formData, morePicture: newMorePicture });
    };

    const changeMorePictures = ({ fileList: newFileList }) =>
        setFormData({ ...formData, morePicture: newFileList });

    const changeHowToStyle = ({ fileList: newFileList }) =>
        setFormData({ ...formData, howToStyle: newFileList });

    const handleAddProduct = async () => {
        try {
            const formDataToSend = new FormData();
            formDataToSend.append("sub_cat_id", subCatId);
            formDataToSend.append("title", formData.title);
            formDataToSend.append("description", formData.description);
            formDataToSend.append("price", formData.price);
            formDataToSend.append("photo", formData.photo);
            formData.highlight.forEach((highlight) =>
                formDataToSend.append("highlight", highlight)
            );
            formData.composition.forEach((composition) =>
                formDataToSend.append("composition", composition)
            );
            formData.morePicture.forEach((pic) => {
                const file = pic.originFileObj || pic;
                formDataToSend.append("morePicture", file, file.name);
            });
            formData.howToStyle.forEach((style) => {
                const file = style.originFileObj || style;
                formDataToSend.append("howToStyle", file, file.name);
            });

            updateLoading(true);
            const response = await fetch(apis.base + "uploadProduct", {
                method: "POST",
                headers: {
                    Authorization: `${userToken}`,
                },
                body: formDataToSend,
            });

            updateLoading(false);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to upload product");
            }

            message.success("Product uploaded successfully");
        } catch (error) {
            updateLoading(false);
            console.error("Error uploading product:", error);
            message.error(error.message || "Failed to upload product. Please try again later.");
        }
    };

    const UploadButton = ({ mes }) => {
        return (
            <button
                style={{
                    border: 0,
                    background: "none",
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
            {isLoading && <LoadingCenter />}
            <Typography.Title level={2}>Add Product</Typography.Title>
            <Space direction="vertical" size="large">
                <Input
                    placeholder="Title"
                    value={formData.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                />
                <Input
                    placeholder="Price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => handleChange("price", e.target.value)}
                />
                <Input.TextArea
                    placeholder="Description"
                    value={formData.description}
                    onChange={(e) => handleChange("description", e.target.value)}
                />
                <div className="d-flex flex-column">
                    <Typography.Text>Photo:</Typography.Text>
                    <Upload
                        beforeUpload={(file) => {
                            handlePhotoChange(file);
                            return false;
                        }}
                        onRemove={removePhoto}
                        listType="picture-card"
                    >
                        {formData.photo == null ? (
                            <Button icon={<PlusOutlined />}></Button>
                        ) : null}
                    </Upload>
                    <span style={{ color: "#888", fontSize: "small" }}>
                        Recommended Image size: 400 x 500 (px)
                    </span>
                    {formData.photo && <span>{formData.photo.name}</span>}
                </div>
                <div>
                    <Typography.Text>Highlights:</Typography.Text>
                    {formData.highlight.map((highlight, index) => (
                        <div
                            key={index}
                            style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}
                        >
                            <Input
                                style={{ flex: 1, marginRight: "8px" }}
                                placeholder={`Highlight ${index + 1}`}
                                value={highlight}
                                onChange={(e) => handleHighlightChange(index, e.target.value)}
                            />
                            <Button
                                onClick={() => handleRemoveHighlight(index)}
                                type="danger"
                            >
                                Remove
                            </Button>
                        </div>
                    ))}
                    <Button onClick={handleAddHighlight}>Add Highlight Field</Button>
                </div>
                <div>
                    <Typography.Text>Composition:</Typography.Text>
                    {formData.composition.map((comp, index) => (
                        <div
                            key={index}
                            style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}
                        >
                            <Input
                                style={{ flex: 1, marginRight: "8px" }}
                                placeholder={`Composition ${index + 1}`}
                                value={comp}
                                onChange={(e) => handleCompositionChange(index, e.target.value)}
                            />
                            <Button
                                onClick={() => handleRemoveComposition(index)}
                                type="danger"
                            >
                                Remove
                            </Button>
                        </div>
                    ))}
                    <Button onClick={handleAddComposition}>Add Composition Field</Button>
                </div>
                <div className="d-flex flex-column">
                    <Typography.Text>More Pictures:</Typography.Text>
                    <Upload
                        beforeUpload={(file) => {
                            handleMorePictureChange(index, file);
                            return false;
                        }}
                        fileList={formData.morePicture}
                        onChange={changeMorePictures}
                        listType="picture-card"
                    >
                        {formData.morePicture.length >= 4 ? null : <UploadButton mes={"More Picture"} />}
                    </Upload>
                    <span style={{ color: "#888", fontSize: "small" }}>
                        Recommended Image size: 367 x 310 (px)
                    </span>
                </div>
                <div className="d-flex flex-column">
                    <Typography.Text>How to Style:</Typography.Text>
                    <Upload
                        fileList={formData.howToStyle}
                        onChange={changeHowToStyle}
                        listType="picture-card"
                    >
                        {formData.howToStyle.length >= 4 ? null : <UploadButton mes={"How to Style"} />}
                    </Upload>
                    <span style={{ color: "#888", fontSize: "small" }}>
                        Recommended Image size: 350 x 459 (px)
                    </span>
                </div>
            </Space>
            <div style={{ textAlign: "center", marginTop: "20px" }}>
                <Button type="primary" onClick={handleAddProduct}>
                    Add Product
                </Button>
            </div>
        </div>
    );
};

export default AddProduct;
