// generate the HTML structure for each project
function generateProjectHTML(work) {
    return `
        <div class="project">
            <hr>
            <div class="grid-container">
                <div class="div1">
                    <p><strong>${work.name}</strong> </p>
                    <p>${work.date}</p>
                    <p> ${work.medium.join(', ')}</p>
                </div>
                <div class="div2">
                    <p> ${work.description}</p>
                </div>
                <div class="div3">
                    <p> ${work.tags.join(', ')}</p>
                </div>
                <div class="div4">
                    <img src="${work.documentation.finalLook}" height= "300px" class="hover-image">
                </div>
            </div>
        </div>
    `;
}

// load all projects into the respective tab content containers
function loadProjects(jsonData) {
    const allProjectsContainer = document.getElementById('all-projects-container');
    const artProjectsContainer = document.getElementById('art-projects-container');
    const techProjectsContainer = document.getElementById('tech-projects-container');
    const webProjectsContainer = document.getElementById('web-projects-container');

    jsonData.projects.forEach(category => {
        category.works.forEach(work => {
            const projectHTML = generateProjectHTML(work);

            // Insert projects into the correct container based on category
            allProjectsContainer.innerHTML += projectHTML; // Add to "All" tab

            if (category.category === "Art") {
                artProjectsContainer.innerHTML += projectHTML; // Add to "Art" tab
            } else if (category.category === "Tech") {
                techProjectsContainer.innerHTML += projectHTML; // Add to "Tech" tab
            } else if (category.category === "Website") {
                webProjectsContainer.innerHTML += projectHTML; // Add to "Websites" tab
            }
        });
        attachHoverEffect();
    });
}

// Fetch the JSON data and load the projects into the tabs
fetch("portfolio.json")
    .then(response => response.json())
    .then(jsonData => {
        loadProjects(jsonData);
    });

// Tab functionality to show/hide content
function openPage(pageName, elmnt, color) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].style.backgroundColor = "";
    }
    document.getElementById(pageName).style.display = "block";
    elmnt.style.backgroundColor = color;
}

// Automatically open the default tab
document.getElementById("defaultOpen").click();

// Function to attach hover effects to images
function attachHoverEffect() {
    const images = document.querySelectorAll('.hover-image');

    images.forEach(img => {
        img.addEventListener('mouseover', function() {
            enlargeImage(this.src);
        });

        img.addEventListener('mouseout', function() {
            closeEnlargedImage();
        });
    });
}

// Function to enlarge the image in the center of the screen
function enlargeImage(src) {
    // Check if modal already exists
    let enlargedImage = document.getElementById('enlargedImage');

    // If not, create the modal
    if (!enlargedImage) {
        enlargedImage = document.createElement('div');
        enlargedImage.id = 'enlargedImage';
        enlargedImage.style.position = 'fixed';
        enlargedImage.style.top = '50%';
        enlargedImage.style.left = '50%';
        enlargedImage.style.transform = 'translate(-50%, -50%)';
        enlargedImage.style.zIndex = '1000';
        enlargedImage.style.padding = '20px';
        enlargedImage.style.opacity = '60%';
        enlargedImage.style.display = 'flex';
        enlargedImage.style.justifyContent = 'center';
        enlargedImage.style.alignItems = 'center';
        enlargedImage.style.transition = 'opacity 0.3s ease';

        const imgElement = document.createElement('img');
        imgElement.style.maxWidth = '70vw'; // Limit the size
        imgElement.style.maxHeight = '70vh';
        enlargedImage.appendChild(imgElement);

        document.body.appendChild(enlargedImage);
    }

    enlargedImage.querySelector('img').src = src;
    enlargedImage.style.opacity = '1';
    enlargedImage.style.visibility = 'visible';
}

// Function to close the enlarged image
function closeEnlargedImage() {
    const enlargedImage = document.getElementById('enlargedImage');
    if (enlargedImage) {
        enlargedImage.style.opacity = '0';
        enlargedImage.style.visibility = 'hidden';
    }
}