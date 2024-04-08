import { post } from "../http/request";

const loginapi = (params) => {
    return post("https://chenjinxu.top:6001/login", params);
};

const registerapi=(params)=>{
    return post("https://chenjinxu.top:6001/register",params);
}

export default {loginapi,registerapi};