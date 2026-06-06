const projects = [
  {
    name: "Project 1",
    description: "Description of Project 1",
    image: "project1.jpg",
    link: "project1.html",
    tags: ["JavaScript", "HTML", "CSS"],
    date: "2025-01-01",
    id: 1,
  },
  {
    name: "Todo List App",
    description: "A simple responsive todo list with persistence",
    image: "todo.jpg",
    link: "project2.html",
    tags: ["JavaScript", "HTML", "CSS"],
    date: "2024-05-12",
    id: 2,
  },
  {
    name: "Weather Dashboard",
    description: "Weather lookup using OpenWeatherMap API",
    image: "weather.jpg",
    link: "project3.html",
    tags: ["JavaScript", "API", "HTML"],
    date: "2023-09-01",
    id: 3,
  },
  {
    name: "Real-time Chat App",
    description: "Socket-based chat with rooms and message history",
    image: "chat.jpg",
    link: "project4.html",
    tags: ["Node.js", "Socket.io", "Express"],
    date: "2022-11-30",
    id: 4,
  },
  {
    name: "E-commerce Mock",
    description: "Product listing and shopping cart prototype",
    image: "ecommerce.jpg",
    link: "project5.html",
    tags: ["React", "Redux", "CSS"],
    date: "2024-02-20",
    id: 5,
  },
  {
    name: "Portfolio Template",
    description: "A modern, responsive portfolio template",
    image: "portfolio.jpg",
    link: "project6.html",
    tags: ["HTML", "CSS", "Bootstrap"],
    date: "2021-07-15",
    id: 6,
  },
  {
    name: "Data Visualizer",
    description: "Interactive charts and visualizations with D3.js",
    image: "dataviz.jpg",
    link: "project7.html",
    tags: ["D3.js", "JavaScript"],
    date: "2023-12-10",
    id: 7,
  },
  {
    name: "Blog Platform",
    description: "A minimal CMS built with Django and SQLite",
    image: "blog.jpg",
    link: "project8.html",
    tags: ["Python", "Django", "SQLite"],
    date: "2024-08-05",
    id: 8,
  },
  {
    name: "Image Classifier",
    description: "Prototype ML model for image classification",
    image: "classifier.jpg",
    link: "project9.html",
    tags: ["Python", "TensorFlow", "ML"],
    date: "2025-03-03",
    id: 9,
  },
  {
    name: "Task Scheduler",
    description: "Background job scheduler with TypeScript and Node",
    image: "scheduler.jpg",
    link: "project10.html",
    tags: ["TypeScript", "Node.js"],
    date: "2024-10-18",
    id: 10,
  },
  {
    name: "Game Engine Demo",
    description: "Small demo built with Unity showcasing physics",
    image: "game.jpg",
    link: "project11.html",
    tags: ["C#", "Unity"],
    date: "2022-04-22",
    id: 11,
  },
];
let filters = [];
const projectList = document.querySelector(".project-list");
const uniquetags = projects.reduce((acc, project) => {
  project.tags.forEach((tag) => {
    if (!acc.tags.includes(tag)) {
      acc.tags.push(tag);
    }
  });
  return acc;
}).tags;

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
generateProjectCards(projects);
console.log(uniquetags);
const testbtn = document
  .querySelector(".dropdown")
  .addEventListener("click", function (event) {
    console.log("clicked");
  });
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

function generateProjectCards(projects) {
  const projectList = document.querySelector(".project-list");
  projectList.innerHTML = "";
  projects.forEach((project) => {
    const projectItem = document.createElement("div");
    projectItem.classList.add("project-item");
    projectItem.innerHTML = `
                <div class="project-item-${project.id}">
                    <h3> ${project.name}</h3>
                    <p> ${project.description}</p>
                </div>
        `;
    projectList.appendChild(projectItem);
  });
}

