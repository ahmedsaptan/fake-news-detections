import axios from "axios";
import { registerUser, loginUser } from "../config/nodeURL";

class AuthService {
  login(email, password) {
    return axios
      .post(loginUser, {
        email,
        password,
      })
      .then((res) => {
        console.log(res);
        if (res.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(res.data));
        }

        return res.data;
      })
      .catch((e) => {
        throw new Error(e);
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(userName, email, password) {
    return axios.post(registerUser, {
      email,
      password,
      userName,
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
