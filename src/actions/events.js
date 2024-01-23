export const closeMobileNav = () => {
  let mobileNav = document.querySelector(".mobile-nav");
  mobileNav.classList.add("d-none");
};
export const showMobileNav = () => {
  let mobileNav = document.querySelector(".mobile-nav");
  mobileNav.classList.remove("d-none");
};
