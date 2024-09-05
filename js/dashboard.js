import backendAPI from "../api/api.js";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await axios.get(`${backendAPI}/user`);
    const username = response.data;
    document.querySelector(".username").innerHTML = `Hello ${username}`;
  } catch (err) {
    console.log(err);
  }
});
