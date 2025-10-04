const btns=document.querySelectorAll(".btn");
const display=document.querySelector(".display");
let currentInput='';
let resultDisplayed=false;

btns.forEach(btn=>{
    btn.addEventListener("click",()=>{
        const value=btn.innerText;

        if(btn.id==='clear'){
            currentInput='';
            display.innerText='0';
            resultDisplayed=false;
            return;
        }
        if(btn.id==='delete'){
            currentInput=currentInput.slice(0,-1);
            display.innerText= currentInput || '0';
            return;
        }
        if(btn.id=== 'equals'){
            try{
            const result = calculate(currentInput);
            display.innerText = result;
            currentInput = result.toString();
            resultDisplayed=true;
            }
            catch{
                display.innerText='Error';
                currentInput='';
            }
            return;
        }

          if (resultDisplayed) {
            if (/[0-9.]/.test(value)) {
                currentInput = value;
            } else {
                currentInput += value;
            }
            resultDisplayed = false;
        } else {
            currentInput += value;
        }

        display.innerText = currentInput;
        
    });

});
function calculate(expression) {
   
    let tokens = expression.match(/(\d+(\.\d+)?|[+\-*/])/g);

    if (!tokens) return 0;

    
    for (let i = 0; i < tokens.length; i++) {
        if (tokens[i] === "*" || tokens[i] === "/") {
            let left = parseFloat(tokens[i - 1]);
            let right = parseFloat(tokens[i + 1]);
            if (tokens[i] === "/" && right === 0) {
                 throw new Error("Division by zero");
                }
            let result = tokens[i] === "*" ? left * right : left / right;
            tokens.splice(i - 1, 3, result.toString());
            i--; 
        }
    }

 
    let result = parseFloat(tokens[0]);
    for (let i = 1; i < tokens.length; i += 2) {
        let operator = tokens[i];
        let next = parseFloat(tokens[i + 1]);
        if (operator === "+") result += next;
        if (operator === "-") result -= next;
    }
    return result;
}