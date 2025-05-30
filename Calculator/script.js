const input = document.getElementById("display");
const buttons = document.querySelectorAll("button");
const operators = ["+", "-", "/", "*", "%"]
buttons.forEach(button =>{
    button.addEventListener("click", ()=>
    {
        const value = button.innerText;
        const last =display.value.slice(-1);
         if (display.value === "Error!") {
            if (value === "AC" || value === "C") {
                display.value = "";
                return;
            } else if (value !== "=") {
                display.value = value; // Replace "Error" with new clicked value
            }
            return ;
        }
        switch(value)
        {
            case "AC" : display.value ="" ; break;
            case "C" : display.value=display.value.slice(0,-1); break;
            case "=" : try{
                display.value =eval(display.value);

            }
            catch(error)
            {
                display.value ="Error!";
            }break;
            default : if(operators.includes(value)){
                if(display.value ===" " || operators.includes(last))
                {
                    return;
                }
            }
            display.value+=value;
        }
        
    });
});
display.addEventListener("input",() =>{
    if(display.value==="Error!") return;
    display.value=display.value.replace(/[^0-9=\-*/%.]/g,'')
});