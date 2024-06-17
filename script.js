const container = document.querySelector(".container");
const btnRefresh = document.querySelector(".btn-refresh");
const body = document.querySelector('body');
const paletteBoxes = 10;
toggle = document.querySelector(".toggle");

setMode();
refreshPalette();

btnRefresh.addEventListener("click", () => {
    refreshPalette();
    animateBtn();
});

toggle.addEventListener("click", changeMode);

function setMode() {
    if (localStorage.getItem("mode") == "dark") {
        body.classList.toggle("body-dark");

        colors = document.getElementsByClassName("color")
        for (var i = 0; i < colors.length; i++)
            colors[i].classList.toggle("color-dark");
    }
}

function refreshPalette() {
    // clear container
    container.innerHTML = "";

    // генерируем 10 рандомных цветов и создаем блоки
    for (let i = 0; i < paletteBoxes; i++) {
        // генерация цвета
        let randomHex = Math.floor(Math.random() * (0xffffff) + 1).toString(16);
        // дополняем строку до нужной длины + "#"
        randomHex = "#" + randomHex.padStart(6, "0");

        const color = document.createElement("li");
        color.classList.add("color");

        if (localStorage.getItem("mode") == "dark") {
            color.classList.add("color-dark");
        }

        color.innerHTML = `<div class="rect-box" style="background: ${randomHex}"></div>
                            <span class="hex-value">${randomHex}</span>`;
        container.appendChild(color);

        color.addEventListener("click", () => copyColor(color, randomHex))
    }
}

function copyColor(element, randomHex) {
    console.log(randomHex);
    const colorHex = element.querySelector(".hex-value");
    navigator.clipboard.writeText(randomHex).then(() => {
        colorHex.innerHTML = "Copied" + `<i class="fa-solid fa-check"></i>`;
        setTimeout(() => colorHex.innerHTML = randomHex, 1100)
    }).catch(() => alert("Failed to copy the color code :("))
}

function changeMode() {
    toggle.classList.toggle("active");
    body.classList.toggle("body-dark");

    colors = document.getElementsByClassName("color")
        for (var i = 0; i < colors.length; i++)
            colors[i].classList.toggle("color-dark");

    if (!body.classList.contains("body-dark")) {
        return localStorage.setItem("mode", "light");
    }
    localStorage.setItem("mode", "dark");

}

function animateBtn() {
    btnRefresh.classList.add("animate");
    setTimeout(() => {
        btnRefresh.classList.remove("animate");
    }, 600);
}
