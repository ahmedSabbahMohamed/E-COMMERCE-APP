export const closeMobileNav = () => {
  let mobileNav = document.querySelector(".mobile-nav");
  mobileNav.classList.add("d-none");
};
export const showMobileNav = () => {
  let mobileNav = document.querySelector(".mobile-nav");
  mobileNav.classList.remove("d-none");
};

export const toFormData = (jsonData) => {
  const formData = new FormData();

  for (let key in jsonData) {
    if (jsonData.hasOwnProperty(key)) {
      let value = jsonData[key];

      if (Array.isArray(value)) {
        // If the value is an array, convert it to a string
        value = value.join(",");
      } else if (typeof value === "object") {
        // If the value is an object, convert it to JSON
        value = JSON.stringify(value);
      }

      formData.append(key, value);
    }
  }

  return formData;
}

export const logOut = () => {
  localStorage.clear()
  window.location.pathname = "/"
  return
}
