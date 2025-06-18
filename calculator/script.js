
const btns = document.getElementsByClassName("btn")
const display = document.getElementById("d_input")

function calculate() {
    try {
        display.value = eval(display.value);
    } catch (error) {
        display.value = "Error"
    }
}

Array.from(btns).map((elem)=> {
    display.value = "0"
    elem.addEventListener("click",()=> {
        
        if(elem.value === "C"){
           display.value = 0;
            return;
        }

        if(elem.value === "="){
            if(display.value === "Error"){
                return;
            }
           calculate();
            return;
        }
        
        if(display.value == 0 || display.value === "Error" || display.value === "Infinity"){
            display.value=elem.value;
            return;
        }
        display.value += elem.value;

    })
})