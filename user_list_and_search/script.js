import { users } from "./data.js";

const userContainer = document.querySelector("#userContainer");
const searchInput = document.querySelector("#searchInput")

function renderUsers(arr) {
    userContainer.innerHTML = ""
    arr.map((item)=> {

        const {imageUrl , name , email} = item;
    
        const userItem = document.createElement("div")
        userItem.className = "userItem"
        userItem.innerHTML = `<img class="avatar" src=${imageUrl} alt="avatar">
                    <div class="metaContainer">
                        <p class="name">${name}</p>
                        <p class="email">${email}</p>
                    </div>`
    
        userContainer.append(userItem)
    })
}

renderUsers(users)

function handleInput(e) {
    let value = e.target.value;

    const filteredUsers = users.filter((item)=> {
        return (
            item.name.toLowerCase().includes(value.toLowerCase()) || item.email.toLowerCase().includes(value.toLowerCase())
        )
    })
    renderUsers(filteredUsers)
    
}

searchInput.addEventListener("input" , handleInput);