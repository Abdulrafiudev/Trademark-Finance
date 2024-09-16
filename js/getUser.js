async function getUser(backendAPI) {
  try {
    //Makes sure the DOM fully loads before proceeding
    await new Promise((resolve) => {
      if (
        document.readyState === "complete" ||
        document.readyState === "interactive"
      ) {
        resolve();
      } else {
        document.addEventListener("DOMContentLoaded", resolve);
      }
    });
    const response = await axios.get(`${backendAPI}/user`, {
      withCredentials: true,
    });
    console.log(response.data);
    const { user } = response.data;
    console.log(user);
    if (!response.data.success) {
      window.location.href = "../login.html";
      return null;
    }
    const firstName = user.username.split(" ")[0];
    document.querySelector(".username").innerHTML = `Hello ${firstName}`;
    return user;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export default getUser;
