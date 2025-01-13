import { Loading3QuartersOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import styles from "./style.module.css";

function LoadingCenter() {
    return (
        <div className={styles.loader}>
            <Spin spinning={true} size="large" tip="Loading..." />
        </div>
    )
}

export default LoadingCenter;