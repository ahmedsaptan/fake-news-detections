import axios from "axios";
import authHeader from "./auth-header";
import {
  myPredictions,
  allPredictions,
  predict,
  PythonPredict,
  pythonGetDataFromLink,
  getDataFromLink,
} from "../config/nodeURL";

class UserServcie {
  getAllPredictions() {
    return axios.get(allPredictions, { headers: authHeader() });
  }

  getMyPredictions() {
    return axios.get(myPredictions, { headers: authHeader() });
  }

  predict(data, isPython) {
    const url = isPython ? PythonPredict : predict;
    return axios.post(url, data, { headers: authHeader() });
  }

  GetPostFromLink(link, isPython) {
    const url = isPython ? pythonGetDataFromLink : getDataFromLink;

    return axios.post(
      url,
      { link },
      {
        headers: authHeader(),
      }
    );
  }
}

export default new UserServcie();
