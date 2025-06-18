
const modalContainer = document.getElementById("modal_container");
const openModalBtn = document.getElementById("openModal");

openModalBtn.addEventListener("click" , (e)=> {
    modalContainer.style.display = "inline-block"
})

modalContainer.addEventListener("click" , (e)=> {
    if(e.target.id === "modal_container"){
    modalContainer.style.display = "none"
    }
})