import { ArrowLeftOutlined, SwapLeftOutlined } from "@ant-design/icons";
import { SwipeLeftOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function BackButton() {
    const nav = useNavigate();
    return (
        <div className="py-2">
            <span onClick={()=>{nav(-1)}}>
                <ArrowLeftOutlined  size={20}/>
            </span>
        </div>
    )
}

export default BackButton;