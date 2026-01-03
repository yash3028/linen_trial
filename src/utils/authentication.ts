export const isLoggedIn = () => {
  try {
    const token = localStorage.getItem("token");
    return token ? true : false;
  } catch (error) {
    alert("Error while authentication");
  }
};

export const save_token = (token: string) => {
  try {
    localStorage.setItem("token", token);
  } catch (error) {
    alert("Error while logging in");
  }
};

export const save_data = (key: string, value: string) => {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    alert("Error while logging in");
  }
};

export const clear_storage = () => {
  try {
    localStorage.clear();
  } catch (error) {
    alert("Error while logging out");
  }
};
