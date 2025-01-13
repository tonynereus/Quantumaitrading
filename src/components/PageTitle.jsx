import { Typography } from "antd"

export default ({title})=>{
    return(
        <div className="w-100 p-2">
            <Typography.Title level={3}>{title}</Typography.Title>
        </div>
    )
}