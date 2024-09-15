function getUser(backendAPI) {
  document.addEventListener("DOMContentLoaded", async () => {
    try {
      const response = await axios.get(`${backendAPI}/user`, {
        withCredentials: true,
      });
      console.log(response.data);
      const { user } = response.data;
      console.log(response.data);
      if (!response.data.success) {
        window.location.href = "../login.html";
      }
      const firstName = user.username.split(" ")[0];

      document.querySelector(".username").innerHTML = `Hello ${firstName}`;
    } catch (err) {
      console.log(err);
    }
  });
}

export default getUser;
