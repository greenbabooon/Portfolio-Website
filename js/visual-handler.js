
let theme=sessionStorage.getItem("theme");
if(theme){
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
const currentPage = window.location.pathname.split("/").pop();
console.log(currentPage);

const pages = [
  {
    name: "Home",
    url: "./index.html",
  },
  {
    name: "Projects",
    url: "./projects.html",
  },
  {
    name: "Contact",
    url: "./contact.html",
  },
];

function renderNavBar() {
  const navHTML = `
    <header id="glow">
      <h1>
        <span class="accent">Stephanos Loizos</span> | Portfolio
      </h1>
      <ul>
        <li><a href="../index.html">Home</a></li>
        <li><a href="../projects.html">Projects</a></li>
        <li><a href="./contact.html">Contact</a></li>
        <li>
          <label class="switch">
            <input class="theme-toggle" type="checkbox">
            <span title="Toggle Theme" class="slider"></span>
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
  .addEventListener("click", function (event) {
    if (event.target.checked) {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
    }
    sessionStorage.setItem("theme", document.documentElement.getAttribute("data-theme"));
  });
