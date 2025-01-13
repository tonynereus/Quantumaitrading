import { useLocale } from "antd/es/locale";
import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


export default()=>{
    const nav = useNavigate();
    const locate = useLocation();
    useEffect(
        ()=>{
          Swal.fire(
            {
                title:"Logout",
                icon:"question",
                text:"Are you sure you want to logout",
                confirmButtonText:"Yes",
                showDenyButton:true,
                denyButtonText:"No"
            }
          ).then(
            x=>{
                if(x.isConfirmed){
                    location.replace("/")
                }else{
                    nav("/dashboard/",{state:locate.state});
                }
            }
          )
        },[]
    )
    return(
        <></>
    )
}