const button = document.getElementById("myButton");
const texts = document.getElementsByClassName("display_text");
const closeBtn = document.getElementById("closeBtn");

button.addEventListener("click", function() {
    for (let i = 0; i < texts.length; i++) {
        texts[i].classList.toggle('hideP');
    }
});

closeBtn.addEventListener("click", function() {
    for (let i = 0; i < texts.length; i++) {
        texts[i].classList.toggle('hideP');
    }
});