import { post } from "../http/request";

const getuserapi = (params) => {
    return post("https://chenjinxu.top:6001/getuser", params);
};

export default {getuserapi};