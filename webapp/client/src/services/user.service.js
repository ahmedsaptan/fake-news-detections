import axios from "axios";
import authHeader from "./auth-header";
import { myPredictions, allPredictions } from "../config/nodeURL";

class UserServcie {
  getAllPredictions() {
    return axios.get(allPredictions, { headers: authHeader() });
  }

  getMyPredictions() {
    return axios.get(myPredictions, { headers: authHeader() });
  }
}

export default new UserServcie();
