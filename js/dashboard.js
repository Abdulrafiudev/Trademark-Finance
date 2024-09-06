import backendAPI from "../api/api.js";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await axios.get(`${backendAPI}/user`, {
      withCredentials: true,
    });
    console.log(response.data);
    const { username, user } = response.data;
    console.log(response.data);
    if (!response.data.success) {
      window.location.href = "../login.html";
    }
    const firstName = username.split(" ")[0];

    document.querySelector(".username").innerHTML = `Hello ${firstName}`;
  } catch (err) {
    console.log(err);
  }
});
