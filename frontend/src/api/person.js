import { post } from "../http/request";

const getpersonapi = (pamare) => {
    return post("https://chenjinxu.top:6001/getperson",pamare);
};

const sendpersonapi =(pamare)=>{
    return post("https://chenjinxu.top:6001/sendperson",pamare);
}
export default {getpersonapi,sendpersonapi};