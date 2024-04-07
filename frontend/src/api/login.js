import { post } from "../http/request";

const loginapi = (params) => {
    return post("https://chenjinxu.top:6001/login", params, { withCredentials: true });
};

const registerapi=(params)=>{
    return post("https://chenjinxu.top:6001/register",params, { withCredentials: true });
}

export default {loginapi,registerapi};