const base = "http://localhost:9000";
const pythonBase = "http://localhost:5000";

export const registerUser = base + "/register";
export const loginUser = base + "/login";
export const allPredictions = base + "/news";
export const myPredictions = base + "/news/me";
export const logoutUser = base + "/logout";
export const predict = base + "/news/predict";
export const PythonPredict = pythonBase + "/predict";
export const getDataFromLink = base + "/get-post-data";
export const pythonGetDataFromLink = pythonBase + "/get-post-data";
