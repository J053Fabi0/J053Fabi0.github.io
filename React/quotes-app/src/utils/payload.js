const payload = () => {
  const token = window.localStorage.getItem("token");
  if (token) {
    const [, payload] = token.split(".");
    const base64 = payload.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  }

  return null;
};

export default payload;
