var req = new XMLHttpRequest();
req.open("GET", "./imagelist.json");

req.onreadystatechange = function () {
    if (this.readyState == 4) {
        // console.log(this.response);

        let data = JSON.parse(this.response);
        for (let i = 0; i < data.length; i++) {
            let div = document.createElement("div");
            div.setAttribute("class", "image");

            div.onclick = function () {
                // image-selected라는 클래스네임없으면 클래스네임추가 있으면 제거하는 로직 근데 이방식은 비효율적임

                // if(this.getAttribute("class").indexOf("image-selected") == -1 ){
                //     this.setAttribute("class", "image image-selected");
                // }
                // else {
                //     this.setAttribute("class", "image");
                // }

                this.classList.toggle("image-selected");

            }
            div.onmouseover = function () {
                let element = this;
                this.timeID = setTimeout(function () {
                    element.classList.add("image-magnified");
                }, 500);
            }

            div.onmouseout = function () {
                clearTimeout(this.timeID);
                this.classList.remove("image-magnified");
            }


            let img = document.createElement("img");
            img.src = data[i];
            div.appendChild(img);

            let container = document.querySelector(".container")

            container.appendChild(div);

        }
    }
}
req.send();



function selectAll(btn) {
    let images = document.getElementsByClassName("image");

    for (let i = 0; i < images.length; i++) {
        if (btn.value == "Unselect ALL") {
            images[i].classList.remove("image-selected");
        } else {
            images[i].classList.add("image-selected");
        }
    }

    if (btn.value == "Unselect ALL") {
        btn.value = "Select ALL";
    } else {
        btn.value = "Unselect ALL";
    }

}

function slideShow(btn) {
    let images = document.getElementsByClassName("image");
    let index = 0

    images[index].classList.add("image-magnified");

    let intervalID = setInterval(function () {
        images[index].classList.remove("image-magnified");
        index++;
        if (index < images.length) {
            images[index].classList.add("image-magnified");
        } else {
            clearInterval(intervalID);
        }
    }, 1000);
}