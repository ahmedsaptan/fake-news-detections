export default function authHeader() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.accessToken) {
    return {
      "x-access-token": user.accessToken,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    };
  } else {
    return {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    };
  }
}
