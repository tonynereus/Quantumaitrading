import React, { useEffect, useState } from 'react';
import { Upload, Button, Modal, message, Row, Col } from 'antd';
import { UploadOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';

const BannerUploader = ({ currentBanners, onUpload,reload , cat }) => {
  //console.log(currentBanners)
  const [fileList, setFileList] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [banners, setBanners] = useState(currentBanners); // State to manage current banners

  useEffect(
    () => {
      setBanners(currentBanners);
    }, [currentBanners]
  )
  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = (file) => {
    setPreviewImage(file.thumbUrl || file.url);
    setPreviewVisible(true);
  };

  const handleChange = ({ fileList }) => setFileList(fileList);

  const handleUpload = async () => {
    const formData = new FormData();
    if (fileList.length === 0) {
      message.warning('Please select images to upload.');
      return;
    }
    setLoading(true);
    fileList.forEach((file, index) => {
      formData.append(`cat-banner`, file.originFileObj);
    });
    formData.append("cat_id",cat);
    try {
      const response = await onUpload(formData);
      console.log(response);
      response.status ? message.success(response.message) : message.error(response.message);
      reload();
      //message.success('Banners updated successfully.');
      //setBanners([...banners, ...fileList.map(file => {console.log(file); return file})]);
      setFileList([]);
    } catch (error) {
      message.error('Failed to update banners.');
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = (id) => {
    const updatedBanners = banners.filter((vn, i) => vn.id !== id);
    setBanners(updatedBanners);
  };

  return (
    <div>
      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        {banners.map((banner, index) => (
        //   <Col  >
            <div style={{ position: 'relative' }} key={index} className='w-100'>
              <img
                src={banner.url}
                alt={`Banner ${index + 1}`}
                style={{ maxWidth: '100%', maxHeight: '300px', objectFit: 'cover', marginBottom: 8 }}
              />
              <Button
                type="primary"
                icon={<DeleteOutlined />}
                onClick={() => handleRemove(banner.id)}
                style={{ position: 'absolute', top: 8, left: 8 }}
              >
                Remove
              </Button>
            </div>
        //   </Col>
        ))}
      </Row>
      {banners.length < 1 && (
        <ImgCrop rotationSlider aspect={16 / 9}>
          <Upload
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
            beforeUpload={() => false} // Prevent automatic upload
          >
            {fileList.length < 1  && (
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            )}
          </Upload>
        </ImgCrop>
      )}
      <Button
        type="primary"
        onClick={handleUpload}
        loading={loading}
        disabled={fileList.length === 0}
        style={{ marginTop: 16 }}
      >
        Update Banner
      </Button>
      <Modal
        open={previewVisible}
        title="Preview Image"
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="Preview" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </div>
  );
};

export default BannerUploader;
