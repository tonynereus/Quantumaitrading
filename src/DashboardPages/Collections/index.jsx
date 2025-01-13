import { message, Typography } from "antd";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
// import apis from "../../assets/apis";
import AppContext from "../../context/AppContext";
import { Button, Image, Card, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import apis from "../../assets/apis";
import LoadingCenter from "../../components/LoadingCenter";
import Swal from "sweetalert2";

const Collections = () => {
    const [collections, setCollections] = useState(
        {
            id: 0,
            name: "",
            title: "",
            description: '',
            bannerUrl: "",
            createdAt: "",
            endedAt: "",
            categoryId: 0
        }
    );
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const location = useLocation();
    const navigate = useNavigate();
    const AppC = useContext(AppContext);
    const userToken = AppC.token || location.state.token;
    const [appLoading,updateAppLoading] = useState(false);
    const { myReq } = AppC;

    useEffect(() => {
        const data = location.state.collections;
        setCollections(data);
        console.log(data);
        const getProducts = async () => {
            try {
                const productsResponse = await myReq(apis.getProductsForCollection,
                    { catId: data.categoryId, collectionId: data.id }
                );
                if (Array.isArray(productsResponse))
                    return setProducts(productsResponse);
                if (productsResponse.message)
                    return message.error(productsResponse.message);
                return message.error("Error loading items");

            } catch (e) {
                console.log(e);
                message.error(e || "Error loading items");

            } finally {
                setLoading(false);
            }
        }
        getProducts();
    }, [location.state, navigate]);
    async function action(id,typ){
        try{
            //// 
            updateAppLoading(true);
            const response = await myReq(typ ? apis.addToCollection:apis.removeFromCollection,{product_id:id,collection_id:collections.id});

            if(response.status){
                console.log("Erroe 00");
                message.success(response.message);
                setProducts(
                    products.map(pro=>
                        pro.product_id == id ?
                        {...pro,inCollection:typ}:pro
                    )
                );
            }else{
                console.log("Erroe 1");
                message.error(response.message);
            }

        }catch(e){
            console.log(e);
            message.error("Error processing action");
        }finally{
            updateAppLoading(false);
        }
    }
    async function closeCollection(){
        try{
            //// 
            updateAppLoading(true);
            const response = await myReq(apis.deleteCollection,{collectionId:collections.id});

            if(response.status){
                console.log("Erroe 00");
                message.success(response.message);
                navigate(-2);
            }else{
                console.log("Erroe 1");
                message.error(response.message);
            }

        }catch(e){
            console.log(e);
            message.error("Error processing action");
        }finally{
            updateAppLoading(false);
        }
    }
    function closeCollectionClick(){
        Swal.fire({
            icon:"question",
            text:"Are you sure you want to close this collection ?",
            confirmButtonText:"Yes",
            showCancelButton:true
        }).then(
            x=>{
                if(x.isConfirmed){
                    closeCollection();
                }
            }
        )
    }
    return (
        <div>
            {
                appLoading && <LoadingCenter />
            }
            <div className="w-100 p-3 d-flex justify-content-between align-items-center">
                <div>
                    <Typography.Title level={4} className="py-0 m-0">{collections.name}</Typography.Title>
                </div>
                <Button type="primary" danger onClick={closeCollectionClick}>Close Collection</Button>
            </div>
            <div className="w-100 p-3 row m-0 align-items-center">
                <div className="col-md-6">
                    <Image loading="lazy" src={collections.bannerUrl} className="w-100 object-contain" />
                </div>
                <div className="col-md-6 ">
                    <Typography.Title level={5} className="py-0 m-0 ">{collections.title}</Typography.Title>
                    <Typography.Paragraph>
                        {collections.description}
                    </Typography.Paragraph>
                </div>
            </div>
            <div className="w-100 p-2 row m-0 ">
                {
                    loading &&
                    <div className="w-100 py-3 d-flex justify-content-center">
                        <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
                    </div>
                }
                {products.map((product, ind) => (
                    <div key={ind} className="col-md-3 p-2" >
                        <div className="w-100" style={{ aspectRatio: "1/1" }}>
                            <div className="w-100 h-100 collection-product p-1" >
                                <div className="w-100 px-2 d-flex align-items-end">
                                    <b>
                                        {product.name}
                                    </b>
                                    <hr />
                                </div>
                                <div className="w-100">
                                    <img src={product.img} alt={product.name} style={{ objectFit: "contain" }} className="w-100 h-100" />
                                </div>
                                <div className="d-flex align-items-end justify-content-end">
                                    {
                                        product.inCollection ?
                                            <Button type="primary" danger className="h-100 w-100" onClick={()=>{action(product.product_id,false)}}>Remove</Button> : <Button onClick={()=>{action(product.product_id,true)}} className="h-100 w-100" type="primary">Add</Button>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/* <div className="py-2">
                <BannerUploader cat={categoryId} currentBanners={[{ id: 1, url: banner }]} onUpload={handleBannersUpload} reload={() => { }} />
            </div> */}
        </div>
    );
};

// ['subCats', 'token', 'data']
const ProtectedCollections = () => (
    <ProtectedRoute requiredState={['collections']}>
        <Collections />
    </ProtectedRoute>
);

export default ProtectedCollections;
