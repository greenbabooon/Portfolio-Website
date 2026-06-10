let theme = sessionStorage.getItem("theme");
if (theme) {
  document.documentElement.setAttribute("data-theme", theme);
}

let isScrolling;
const glowObjs = document.querySelectorAll("#glow");
const onScroll = document.addEventListener("scroll", () => {
  console.log("scrolling");
  clearTimeout(isScrolling);
  glowObjs.forEach((element) => {
    element.id = "is-glow";
  });
  isScrolling = setTimeout(() => {
    glowObjs.forEach((element) => {
      element.id = "glow";
    });
    console.log("fade");
  }, 0);
});


const currentPath = window.location.pathname;
const isAtRoot = !currentPath.includes("/html/");


const basePrefix = isAtRoot ? "./html/" : "./";
const rootPrefix = isAtRoot ? "./" : "../";

function renderNavBar() {
  const navHTML = `
    <header id=\"glow\">
      <h1>
        <span class=\"accent\">Stephanos Loizos</span> | Portfolio
      </h1>
      <ul>
        <li><a href="${rootPrefix}index.html">Home</a></li>
        <li><a href="${rootPrefix}html/projects.html">Projects</a></li>
        <li><a href="${rootPrefix}html/contact.html">Contact</a></li>
        <li>
          <label class=\"switch\">
            <input class=\"theme-toggle\" type=\"checkbox\">
            <span title=\"Toggle Theme\" class=\"slider\"></span>
          </label>
        </li>
      </ul>
    </header>
  `;
  document.body.insertAdjacentHTML("afterbegin", navHTML);
}

renderNavBar();

const themeToggle = document
  .querySelector(".theme-toggle")
  .addEventListener("click", () => {
    let currentTheme = document.documentElement.getAttribute("data-theme");
    let newTheme = currentTheme === "dark" ? "default" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    sessionStorage.setItem("theme", newTheme);
  });