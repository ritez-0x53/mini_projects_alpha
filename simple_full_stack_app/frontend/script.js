
const employeeLists = document.querySelector(".employee")
const submitBtn = document.querySelector("#submit_btn")
const employeeForm = document.getElementById("employee_from");
const name = document.getElementById("nameInput")
const role = document.getElementById("roleInput");
const editForm = document.querySelector(".edit_form")
const nameEdit = document.getElementById("nameEdit")
const roleEdit = document.getElementById("roleEdit")
const mainWrapper = document.getElementById("main_wrapper");

let employees = []
let selectedId;

function clearForm() {
    name.value = ""
    role.value = ""
}

console.log(employeeLists)

async function renderEmployee() {
    employeeLists.innerHTML = "";
    const res = await fetch("http://127.0.0.1:7070/api/employee", {});
    const data = await res.json();
    employees = [...data];
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


function getEmployee(id) {
    const employee = employees.filter((val) => {
        return val.id == id;
    })
    return employee[0];
}

employeeLists.addEventListener("click", async (e) => {
    // console.log(e.target)
    if (e.target.classList.contains("del_btn")) {
        const id = e.target.getAttribute("data-id")
        const response = await fetch(`http://127.0.0.1:7070/api/employee/${id}`, {
            method: 'DELETE'
        });
        const data = await response.json();
        console.log(data);
        renderEmployee()

    } else if (e.target.classList.contains("edit_btn")) {
        const id = e.target.getAttribute("data-id")
        mainWrapper.classList.add("flag_class")
        selectedId = id;
        const editEmployee = getEmployee(id);
        nameEdit.value = editEmployee.name
        roleEdit.value = editEmployee.role
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


    editForm.addEventListener("submit", async (e) => {
        e.preventDefault()
        const response = await fetch(`http://127.0.0.1:7070/api/employee/${selectedId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: nameEdit.value, role: roleEdit.value }),
        });
        renderEmployee();
        mainWrapper.classList.remove("flag_class")
        
    })


renderEmployee()

