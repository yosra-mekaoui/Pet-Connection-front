import axios from "axios";
const url = "http://localhost:3000";

export const UpgradeUser = async (upgrade) => {
    console.log("test" + upgrade); 
    try {
        await axios.post(`http://localhost:3000/user/upgrade`, upgrade);
    } catch (error) {
        console.log(error); 
    }
    //return console.log(upgrade); 
};
