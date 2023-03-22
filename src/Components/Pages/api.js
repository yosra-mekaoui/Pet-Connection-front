import axios from "axios";
const url = "http://localhost:3000";

export const UpgradeUser = async (upgrade) => {
    console.log("test"+upgrade); 
    await axios.post(`${url}/user/upgrade`, upgrade);
    return console.log(upgrade); 
};
