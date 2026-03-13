function enlargeImage(currentImageDiv) {
    if (document.documentElement.clientWidth > 1000) {
        if (currentImageDiv.firstChild.tagName.toLowerCase() == "img") {
            let giantImageContainer = document.querySelector(".giantImageContainer");
            let giantImage = document.querySelector(".giantImage");

            giantImage.src = currentImageDiv.firstChild.src;
            giantImageContainer.style.display = "flex";
            document.body.style.height = "100%";
            document.body.style.overflow = "hidden";
        }
    }
}

function closeGiantImage() {
    document.querySelector(".giantImageContainer").style.display = "none";
    document.body.style.height = "auto";
    document.body.style.overflow = "scroll";
}

function openHamburger() {
    let mobileNav = document.querySelector(".mobileNav");
    let worldsWrapper = document.querySelector(".worldsWrapper");
    let hamburgerIcon = document.querySelector(".hamburgerIcon");

    if (mobileNav.classList.contains("open")) {
        mobileNav.classList.remove("open");
        hamburgerIcon.classList.remove("open");
        worldsWrapper.classList.remove("open");
    } else {
        mobileNav.classList.add("open");
        hamburgerIcon.classList.add("open");
        worldsWrapper.classList.add("open");
    }
}

// clone the image/video element from the sidebar that was clicked on, then remove the current image/video, and replace it with the new one, then mark the sidebar image as selected
function changeImage(imgElementOriginal) {
    let bigImage = document.getElementById("bigImage");
    let currImage = document.querySelector(".currentImage");
    let imgElement = imgElementOriginal.cloneNode(true);

    currImage.removeChild(bigImage);
    imgElement.classList.remove("sidebarImage");
    imgElement.id = "bigImage";
    imgElement.controls = true;
    currImage.appendChild(imgElement);

    document.querySelectorAll(".sidebarImage").forEach(smallImg => {
        smallImg.classList.remove("selectedImage");
    });

    imgElementOriginal.classList.add("selectedImage");
}

function insertDeliveryDate() {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["Janurary", "February", "March", "April", "May", "June", "July", "August", "September", "October", "Novermber", "December"];
    let deliveryDate = new Date();
    let deliveryDateString = "";
    
    deliveryDate.setDate(deliveryDate.getDate() + 2);
    deliveryDateString = days[deliveryDate.getDay()] + ", " + months[deliveryDate.getMonth()] + " " + deliveryDate.getDate();

    document.querySelector(".deliveryDate").textContent = deliveryDateString;

    deliveryDate.setDate(deliveryDate.getDate() - 1)
    document.querySelector(".premDeliveryDate").textContent = "Tomorrow, " + months[deliveryDate.getMonth()] + " " + deliveryDate.getDate();
}

function createImages() {
    // get a list of all files in the images folder
    fetch('images')
        .then(response => response.text())
        .then(data => {

            let arrayJson = JSON.parse(data.replaceAll(`'`, `"`));
            let fileNum = 0;
            let toAppend;

            arrayJson.forEach(fileData => {
                let fileName = fileData.name;
                let fileType = fileName.split(".").pop();
                
                // if the file is a video, then get it's thumbnail from the /thumbs folder, and then place it in the sidebar, with no controls
                if (fileName.match(/.+\..{2,6}$/g)) {
                    if (fileType == "mp4") {
                        const vid = document.createElement("video");
                        const source = document.createElement("source");

                        source.src = "images/" + fileName;
                        source.type = "video/" + fileType;
                        vid.classList.add("sidebarImage");
                        vid.onclick = function() { changeImage(this) };
                        vid.appendChild(source);
                        vid.poster = "images/thumbs/" + fileName.replace(".mp4", "") + ".png";
                        vid.preload = "none";

                        toAppend = vid;
                        document.querySelector('.listOfImages').appendChild(vid);
                    // otherwise, create an image element and put it in the sidebar
                    } else {
                        const img = document.createElement('img');
                        img.classList.add("sidebarImage");
                        img.onclick = function() { changeImage(this) };
                        img.src = 'images/' + fileName;
                        toAppend = img;
                        document.querySelector('.listOfImages').appendChild(img);
                    }

                    // if its the first file, then take that element, and replace the current image/video with the new element
                    if (fileNum == 0) {
                        document.querySelector(".currentImage")
                        let bigImage = document.getElementById("bigImage");
                        let currImage = document.querySelector(".currentImage");
                        let toAppendClone = toAppend.cloneNode(true);
                        toAppendClone.classList.remove("sidebarImage");
                        toAppendClone.id = "bigImage";
                        toAppendClone.controls = true;
                        currImage.removeChild(bigImage);
                        currImage.appendChild(toAppendClone);
                    }
                    fileNum += 1;
                }
            });
        })
        .catch(error => console.error(error));
}

function addClickOffToClose(clickedElement) {
    if (clickedElement.target.classList.contains("giantImageContainer")) {
        closeGiantImage();
    }
}


document.querySelector(".giantImageContainer").onclick = addClickOffToClose;
createImages();
insertDeliveryDate();