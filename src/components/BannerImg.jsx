import React, { useEffect, useState } from 'react';
import { Upload, Button, message, Row, Col } from 'antd';
import { UploadOutlined, DeleteOutlined , PlusOutlined} from '@ant-design/icons';

const MultiBannerUploader = ({ currentBanners, onUpload, reload }) => {
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [banners, setBanners] = useState(currentBanners); 

  useEffect(() => {
    setBanners(currentBanners);
  }, [currentBanners]);

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    if (fileList.length === 0) {
      message.warning('Please select images to upload.');
      return;
    }
    setLoading(true);
    fileList.forEach((file) => {
      formData.append(`banner`, file.originFileObj);
    });
    banners.forEach((banner) => {
      formData.append("currentBanners", banner.id);
    });

    try {
      const response = await onUpload(formData);
      response.status ? message.success(response.message) : message.error(response.message);
      reload();
      setFileList([]);
    } catch (error) {
      message.error('Failed to update banners.');
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = (id) => {
    const updatedBanners = banners.filter(banner => banner.id !== id);
    setBanners(updatedBanners);
  };

  return (
    <div>
      <Row gutter={[16, 16]} style={{ marginBottom: 16, justifyContent: "center" }}>
        {banners.map((banner, index) => (
          <Col key={index} span={4.8}>
            <div style={{ position: 'relative' }}>
              <img
                src={banner.url}
                alt={`Banner ${index + 1}`}
                style={{ width: '100%', maxHeight: '150px', objectFit: 'cover', marginBottom: 8 }}
              />
              <Button
                type="primary"
                icon={<DeleteOutlined />}
                onClick={() => handleRemove(banner.id)}
                style={{ position: 'absolute', top: 8, right: 8 }}
              >
                Remove
              </Button>
            </div>
          </Col>
        ))}
      </Row>

      {banners.length < 5 && (
        <>
          <Upload
            listType="picture-card"
            fileList={fileList}
            onChange={handleChange}
            beforeUpload={() => false}
            multiple={true} // Allow multiple file selection
          >
            {fileList.length < 5 - banners.length && (
              // <Button icon={<UploadOutlined />}>Select Banners</Button>
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            )}
          </Upload>
          <div>
            <span style={{ color: "#888", fontSize: "small" }}>
              Recommended size: 1600 x 740 (px)
            </span>
          </div>
        </>
      )}

      <Button
        type="primary"
        onClick={handleUpload}
        loading={loading}
        disabled={fileList.length === 0}
        style={{ marginTop: 16 }}
      >
        Update Banners
      </Button>
    </div>
  );
};

export default MultiBannerUploader;



// import React, { useEffect, useState } from 'react';
// import { Upload, Button, Modal, message, Row, Col } from 'antd';
// import { UploadOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
// import ImgCrop from 'antd-img-crop';

// const MultiBannerUploader = ({ currentBanners, onUpload, reload }) => {
//   //console.log(currentBanners)
//   const [fileList, setFileList] = useState([]);
//   const [previewVisible, setPreviewVisible] = useState(false);
//   const [previewImage, setPreviewImage] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [banners, setBanners] = useState(currentBanners); // State to manage current banners

//   useEffect(
//     () => {
//       setBanners(currentBanners);
//     }, [currentBanners]
//   )
//   const handleCancel = () => setPreviewVisible(false);

//   const handlePreview = (file) => {
//     setPreviewImage(file.thumbUrl || file.url);
//     setPreviewVisible(true);
//   };

//   const handleChange = ({ fileList }) => setFileList(fileList);

//   const handleUpload = async () => {
//     const formData = new FormData();
//     if (fileList.length === 0) {
//       message.warning('Please select images to upload.');
//       return;
//     }
//     setLoading(true);
//     fileList.forEach((file, index) => {
//       formData.append(`banner`, file.originFileObj);
//     });
//     banners.map(x => {
//       formData.append("currentBanners", x.id);
//     })


//     try {
//       const response = await onUpload(formData);
//       console.log(response);
//       response.status ? message.success(response.message) : message.error(response.message);
//       reload();
//       //message.success('Banners updated successfully.');
//       //setBanners([...banners, ...fileList.map(file => {console.log(file); return file})]);
//       setFileList([]);
//     } catch (error) {
//       message.error('Failed to update banners.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRemove = (id) => {
//     const updatedBanners = banners.filter((vn, i) => vn.id !== id);
//     setBanners(updatedBanners);
//   };

//   return (
//     <div>
//       <Row gutter={[16, 16]} style={{ marginBottom: 16, justifyContent: "center" }}>
//         {banners.map((banner, index) => (
//           <Col key={index} span={4.8}>
//             <div style={{ position: 'relative' }}>
//               <img
//                 src={banner.url}
//                 alt={`Banner ${index + 1}`}
//                 style={{ width: '100%', maxHeight: '150px', objectFit: 'cover', marginBottom: 8 }}
//               />
//               <Button
//                 type="primary"
//                 icon={<DeleteOutlined />}
//                 onClick={() => handleRemove(banner.id)}
//                 style={{ position: 'absolute', top: 8, right: 8 }}
//               >
//                 Remove
//               </Button>
//             </div>
//           </Col>
//         ))}
//       </Row>
//       {banners.length < 5 && (
//         <>
//           <ImgCrop rotationSlider aspect={16 / 9}>
//             <Upload
            
//               listType="picture-card"
//               fileList={fileList}
//               onPreview={handlePreview}
//               onChange={handleChange}
//               beforeUpload={() => false} // Prevent automatic upload
//             >
//               {fileList.length < 5 - banners.length && (
//                 <div>
//                   <PlusOutlined />
//                   <div style={{ marginTop: 8 }}>Upload</div>
//                 </div>
//               )}
//             </Upload>
//           </ImgCrop>
//           <div>
//             <span style={{ color: "#888", fontSize: "small" }}>
//               1600 x 740 (px)
//             </span>
//           </div>
//         </>
//       )}
//       <Button
//         type="primary"
//         onClick={handleUpload}
//         loading={loading}
//         disabled={fileList.length === 0}
//         style={{ marginTop: 16 }}
//       >
//         Update Banners
//       </Button>
//       <Modal
//         open={previewVisible}
//         title="Preview Image"
//         footer={null}
//         onCancel={handleCancel}
//       >
//         <img alt="Preview" style={{ width: '100%' }} src={previewImage} />
//       </Modal>
//     </div>
//   );
// };

// export default MultiBannerUploader
