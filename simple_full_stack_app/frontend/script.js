
const employeeLists = document.querySelector(".employee")
const submitBtn = document.querySelector("#submit_btn")
const employeeForm = document.getElementById("employee_from");
const name = document.getElementById("nameInput")
const role = document.getElementById("roleInput");


function clearForm() {
    name.value = ""
    role.value = ""
}

console.log(employeeLists)

async function renderEmployee() {
    employeeLists.innerHTML = "";
    const res = await fetch("http://127.0.0.1:7070/api/employee");
    const data = await res.json();
    data.reverse().forEach((val) => {

        // console.log(new Date(val.joined))
        const date = new Date(val.joined).toLocaleDateString().split("/").join("-")

        employeeLists.innerHTML += `  <div class="employee_list">
                    <div class="image">
                        <img src="" alt="">
                    </div>

                    <div class="details">
                        <h1 class="name">${val.name}</h1>
                        <h2 class="role">${val.role}</h2>
                        <h3>since : ${date}.</h3>
                    </div>

                    <div class="action_btn">
                        <button data-id=${val.id}  class="btn del_btn">Delete</button>
                        <button data-id=${val.id}  class="btn edit_btn">Edit</button>
                    </div>
                </div>` })
}

employeeLists.addEventListener("click", (e) => {
    // console.log(e.target)
    if (e.target.classList.contains("del_btn")) {
        console.log("clicked del")
        console.log(e.target.getAttribute("data-id"))
    } else if (e.target.classList.contains("edit_btn")) {
        console.log("edit clicked")
        console.log(e.target.getAttribute("data-id"))

    }
})

employeeForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const res = await fetch('http://127.0.0.1:7070/api/employee', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name.value,
            role: role.value
        })
    })

    const final = await res.json()
    console.log(final)
    clearForm()
    renderEmployee()

})


renderEmployee()

