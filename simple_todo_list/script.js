
const taskContainer = document.querySelector("#taskContainer");
const addInput = document.querySelector("#addInput");
const addBtn = document.querySelector("#addBtn");

render();

function setItemLS(arr) {
    localStorage.setItem("tasks" , JSON.stringify(arr));
}

function getItemLS(){
    const items = localStorage.getItem("tasks")
    return JSON.parse(items);
}

function render(){
    taskContainer.innerHTML = ""
    const items = getItemLS() || [];
    items.forEach((item , ind)=> {
        const taskItem = document.createElement("div");
        taskItem.className = "taskItem";
        taskItem.innerHTML = `<p>${item}</p>`
        taskItem.setAttribute("id_val" , ind);
        const rmvBtn = document.createElement("i");
        rmvBtn.className = "ri-close-circle-fill";
        
        rmvBtn.addEventListener("click",(e)=> {
            handleRemove(e)
        })

        taskItem.append(rmvBtn);
        taskContainer.append(taskItem)
    })
}

function handleRemove(e) {
    const ind = e.target.parentElement.getAttribute("id_val")
    const arr = getItemLS();
    arr.splice(ind,1);
    console.log(arr);
    setItemLS(arr);
    render();
    
}

addBtn.addEventListener("click" , ()=> {
    if(addInput.value === ""){return;}
    const arr = getItemLS() || [];
    arr.push(addInput.value);
    setItemLS(arr);
    render();
    addInput.value = ""
})

