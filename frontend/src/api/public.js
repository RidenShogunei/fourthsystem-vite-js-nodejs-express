import { post } from "../http/request";

const getpublicapi = () => {
    return post("https://chenjinxu.top:6001/getpublic");
};

const sendpublicapi =(pamare)=>{
    return post("https://chenjinxu.top:6001/sendpublic",pamare);
}
export default {getpublicapi,sendpublicapi};