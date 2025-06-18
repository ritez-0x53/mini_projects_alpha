
const randomBtn = document.querySelector("#randomBtn");
const inputColor = document.querySelector("#colorInput");
const applyBtn = document.querySelector("#applyBtn");
const currentColor = document.querySelector("#currentColor");
const main = document.querySelector("#main")

const changeColor = (color) => {
    main.style.backgroundColor = color;
}

const changeName = (name) =>{
    currentColor.textContent = `Current Color : ${name}`
}

const handleapplyBtn = ()=> {
    let color = inputColor.value;
    changeColor(color);
    changeName(color);
    inputColor.value = ""
}

const colorArray = ["red" , "green", "blue" , "royalblue" , "white" , "black" , "cyan" , "aqua", "yellow" , "rebeccapurple"];

const handleRandomBtn = () => {
    let randomNumber = Math.floor(Math.random() * colorArray.length)
    let color = colorArray[randomNumber];
    changeColor(color);
    changeName(color);
    
}

randomBtn.addEventListener("click" , handleRandomBtn);
applyBtn.addEventListener("click" , handleapplyBtn);