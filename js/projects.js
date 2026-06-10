let projects = [];
const actualProjectPath="/js/projectJsons/Actual-Projects.json";
const fillerProjectPath="/js/projectJsons/fillerProjects.json";

getProjects(actualProjectPath);
getUniqueTags();
generateProjectCards(projects);

const toggle = document.querySelector(".toggle-filler").
addEventListener("click", function () {
  if (event.target.checked) {
    getProjects(fillerProjectPath);
  } else {
    getProjects(actualProjectPath);
  }
  console.log(projects);
  
});
function getProjects(path){
    fetch(path)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log(data); 
    projects=data;
    updateFiltersAndRender();
    generateProjectCards(projects);
  })
  .catch(error => {
    console.error('There was a problem fetching the data:', error);
  });
}


const themeToggle=document.querySelector(".theme-toggle").addEventListener("click",function(event){
    if(event.target.checked){
        document.documentElement.setAttribute("data-theme","dark");
    }else{
        document.documentElement.setAttribute("data-theme","light");
    }
});

let filters = [];
const projectList = document.querySelector(".project-list");

const uniquetags = [];

// Call this after projects is updated
function updateFiltersAndRender() {
  // compute unique tags
  const tags = Array.from(new Set(projects.flatMap(p => p.tags || [])));
  // render checkboxes
  const filterDiv = document.querySelector(".dropdown-content");
  filterDiv.innerHTML = tags.map(tag => {
    const safeId = `filterBox-${tag.replace(/\s+/g, "_")}`;
    return `
      <div class="filter-item">
        <label for="${safeId}">${tag}</label>
        <input type="checkbox" id="${safeId}" value="${tag}">
      </div>
    `;
  }).join("");

  // reset filters state
  filters = [];

  // attach listeners
  tags.forEach(tag => {
    const safeId = `filterBox-${tag.replace(/\s+/g, "_")}`;
    const el = document.getElementById(safeId);
    if (!el) return;
    el.addEventListener("change", function (event) {
      if (event.target.checked) {
        filters.push(event.target.value);
      } else {
        filters = filters.filter(f => f !== event.target.value);
      }
      const filteredProjects = projects.filter(project => {
        if (filters.length === 0) return true;
        return project.tags && project.tags.some(t => filters.includes(t));
      });
      generateProjectCards(filteredProjects);
    });
  });
}
uniqueTags=[];
function getUniqueTags() {
projects.forEach((project) => {
  project.tags.forEach((tag) => {
    if (!uniquetags.includes(tag)) {
      uniquetags.push(tag);
    }
  });
});
}


const filterDiv = document.querySelector(".dropdown-content");
filterDiv.innerHTML = "";

uniquetags.forEach((tag) => {
  filterDiv.innerHTML += `
        <div class="filter-item">
            <label for="filterBox-${tag}">${tag}</label>
            <input type="checkbox" id="filterBox-${tag}" value="${tag}">
        </div>
    `;
});

function generateProjectCards(projects) {
  const projectList = document.querySelector(".project-list");
  projectList.innerHTML = "";
  projects.forEach((project) => {
    const projectItem = document.createElement("div");
    projectItem.classList.add("project-item");
    projectItem.innerHTML = `
                <div class="project-item-${project.id}">
                    <div class="project-title">
                    <h3> ${project.name}</h3>
                    </div>
                    <p> ${project.description}</p>
                    <div class="tags">
                        ${project.tags.map((tag) => `<span class="tag">${tag} </span>`).join("")}
                    </div>
                </div>
        `;
    projectList.appendChild(projectItem);
    projectItem.addEventListener("click", function (event) {
      window.location.href = project.link;
    });
    projectItem.addEventListener("pointerenter", function (event) {
      projectItem.style.backgroundImage = `url(../assets/${project.imageHover})`;
    });
    projectItem.addEventListener("pointerleave", function (event) {
      projectItem.style.backgroundImage = `url(../assets/${project.imageStatic})`;
    });
    projectItem.style.backgroundImage = `url(../assets/${project.imageStatic})`;
  });
}

let checkboxbtns=[];
if (uniquetags.length > 0) {
  for (let i = 0; i < uniquetags.length; i ++) {
    checkboxbtns[i]=document.getElementById("filterBox-"+uniquetags[i]).addEventListener("change",function(event){
        if(event.target.checked){
            filters.push(event.target.value);
        }else{            filters=filters.filter((filter)=>filter!==event.target.value);
        }        console.log(filters);
        const filteredProjects = projects.filter((project) => {
            if (filters.length === 0) {
              return true;
            }
            return project.tags.some((tag) => filters.includes(tag));
          });
        generateProjectCards(filteredProjects);
    })
  }
}