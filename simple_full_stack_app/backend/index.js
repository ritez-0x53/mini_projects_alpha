
import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())


const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "handloom",
    database: "employee_db"
})


async function getEmployee() {
    try {
        const [rows] = await pool.execute("SELECT * from employee", []);
        return rows;
    } catch (error) {
        console.log(error)
    }
}


async function addEmployee(obj){
    const {name , role} = obj;
    try {
        const [rows] = await pool.execute(`INSERT INTO employee (name ,role) VALUES (?,?)` , [name , role])
        return rows.insertId
    } catch (error) {
        console.log(error)        
    }
}

async function getEmployeeById(id){
     const [rows] = await pool.execute(`SELECT * FROM employee WHERE id = ?` ,[id])
     return rows[0]
}


async function deleteEmployeeById(id){
    const [rows] = await pool.execute(`DELETE FROM employee WHERE id = ?` , [id]);
    return rows.affectedRows
}


app.get("/api/employee", async (req, res) => {
    const data = await getEmployee();
    res.status(200).json(data)
})



app.post("/api/employee" , async(req,res)=> {
    const newId = await addEmployee(req.body)
    res.status(201).json({status:"created" , id : newId })
})

app.delete(`/api/employee/:id`,async(req,res)=> {
    const id = req.params.id;
    const result = await getEmployeeById(id);
    if(result) {
        const data = await deleteEmployeeById(id)
        res.json({"message" : `deleted id num ${data}`})
    }

})




app.listen(7070 , ()=> {
    console.log("server running on port 7070")
})