const projectQuery = window.location.search;
const projectName = projectQuery.replace("?", "");
console.log(projectName);

let project;

function getProjectByName(projectName) {
  fetch("../js/projectJsons/Actual-Projects.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      project = data.find((project) => project.query === projectName);
      if (project) {
        setProject(project);
        populatePage(project);
      } else {
        document.getElementById("project-title").textContent =
          "Project not found";
      }
    })
    .catch((error) => {
      console.error("There was a problem fetching the data:", error);
    });
}

function setProject(p) {
  project = p;
}

getProjectByName(projectName);

function populatePage(project) {
  document.getElementById("project-title").textContent = project.name || "";
  document.getElementById("project-date").textContent = project.date || "";
  document.getElementById("project-description").textContent =
    project.description || "";

  const imgElement = document.getElementById("project-image");
  if (imgElement && project.imageStatic) {
    imgElement.src = project.imageStatic;
    imgElement.alt = project.name;
  }

  const tagsContainer = document.getElementById("project-tags");
  if (tagsContainer) {
    tagsContainer.innerHTML = ""; 
    if (project.tags && project.tags.length > 0) {
      project.tags.forEach((tag) => {
        const tagSpan = document.createElement("span");
        tagSpan.className = "tag"; 
        tagSpan.textContent = tag+" ";
        tagsContainer.appendChild(tagSpan);
      });
    }
  }

  const videoWrapper = document.getElementById("project-video-wrapper");
  if (videoWrapper) {
    videoWrapper.innerHTML = "";

    if (project.videoLink) {
      const regExp =
        /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      const match = project.videoLink.match(regExp);

      if (match && match[2].length === 11) {
        const videoId = match[2];

        const iframe = document.createElement("iframe");
        iframe.src = `https://www.youtube.com/embed/${videoId}`;
        iframe.width = "100%";
        iframe.height = "315"; 
        iframe.title = "YouTube video player";
        iframe.frameBorder = "0";
        iframe.allow =
          "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
        iframe.allowFullscreen = true;

        videoWrapper.appendChild(iframe);
      } else {
        videoWrapper.textContent = "Invalid video link configuration.";
      }
    } else {
      videoWrapper.textContent = "No gameplay video available.";
    }
  }

  document.getElementById("project-about").textContent =
    project["about this game"] || "";
  document.getElementById("project-tech").textContent =
    project["technical details"] || "";
  document.getElementById("project-contributors").textContent =
    project.contributors || "";

  const downloadsContainer = document.getElementById("project-downloads");
  if (downloadsContainer) {
    downloadsContainer.innerHTML = "";
    if (project["download link"]) {
      const downloadAnchor = document.createElement("a");
      downloadAnchor.href = project["download link"];
      downloadAnchor.target = "_blank";
      downloadAnchor.textContent = "Download Game";
      downloadsContainer.appendChild(downloadAnchor);
    } else {
      downloadsContainer.textContent = "No downloads available.";
    }
  }
}
