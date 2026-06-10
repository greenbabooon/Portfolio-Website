let theme = sessionStorage.getItem("theme");
if (theme) {
  document.documentElement.setAttribute("data-theme", theme);
}

let isScrolling;
const glowObjs = document.querySelectorAll("#glow");
document.addEventListener("scroll", () => {
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

const masterPages = [
  { id: "home", name: "Home", rootUrl: "index.html" },
  { id: "projects", name: "Projects", rootUrl: "html/projects.html" },
  { id: "experience", name: "Experience", rootUrl: "html/experience.html" },
  { id: "contact", name: "Contact", rootUrl: "html/contact.html" }
];

// 2. Determine directory context depth
const currentPath = window.location.pathname;
const isAtRoot = !currentPath.includes("/html/");

const currentFile = currentPath.split("/").pop().toLowerCase();

let activePageId = "home"; 
if (currentFile.includes("projects.html")) {
  activePageId = "projects";
} else if (currentFile.includes("project.html")) {
  activePageId = "project-detail"; 
} else if (currentFile.includes("experience.html")) {
  activePageId = "experience";
} else if (currentFile.includes("contact.html")) {
  activePageId = "contact";
}

let visiblePages = [];

if (activePageId === "contact") {
  visiblePages = masterPages.filter(p => p.id !== "contact");
} else if (activePageId === "experience") {
  visiblePages = masterPages.filter(p => p.id !== "experience");
} else if (activePageId === "projects" || activePageId === "project-detail") {
  visiblePages = masterPages.filter(p => p.id !== "contact");
} else {
  visiblePages = masterPages.filter(p => p.id !== "home");
}

function renderNavBar() {
  const menuLinksHTML = visiblePages.map(page => {
    let targetUrl = "";
    if (isAtRoot) {
      targetUrl = "./" + page.rootUrl;
    } else {
      if (page.id === "home") {
        targetUrl = "../index.html";
      } else {
        targetUrl = "./" + page.rootUrl.replace("html/", "");
      }
    }
    return `<li><a href="${targetUrl}">${page.name}</a></li>`;
  }).join("");

  const navHTML = `
    <header id="glow">
      <h1>
        <span class="accent">Stephanos Loizos</span> | Portfolio
      </h1>
      <ul>
        ${menuLinksHTML}
        <li>
          <label class="switch">
            <input class="theme-toggle" type="checkbox" ${theme === "dark" ? "checked" : ""}>
            <span title="Toggle Theme" class="slider"></span>
          </label>
        </li>
      </ul>
    </header>
  `;
  document.body.insertAdjacentHTML("afterbegin", navHTML);
}

renderNavBar();

document.querySelector(".theme-toggle").addEventListener("click", () => {
  let currentTheme = document.documentElement.getAttribute("data-theme");
  let newTheme = currentTheme === "dark" ? "default" : "dark";
  document.documentElement.setAttribute("data-theme", newTheme);
  sessionStorage.setItem("theme", newTheme);
});