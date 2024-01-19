// Get the input element for the calculator display
let input = document.getElementById("inputBox");
// Get all the buttons in the calculator
let buttons = document.querySelectorAll("button");
// Initialize an empty string to store the user input
let string = "";
// Convert the NodeList of buttons to an array for easier iteration
let arr = Array.from(buttons);
// Add click event listeners to each button
arr.forEach(button => {
    button.addEventListener("click", (e) => {
        // Check if the clicked button is the "=" (equals) button
        if(e.target.innerHTML == "="){
            // Evaluate the expression in the input string and update the display
            string = eval(string);
            input.value = string;
        }
         // Check if the clicked button is the "AC" (all clear) button
        else if(e.target.innerHTML =="AC"){
            string = "";
            input.value = string;
        }
        // Check if the clicked button is the "DEL" (delete) button
        else if(e.target.innerHTML == "DEL"){
            // Remove the last character from the input string and update the display
            string = string.substring(0, string.length-1);
            input.value = string;
        }
        // For other buttons, append their value to the input string and update the display
        else{
            string += e.target.innerHTML;
            input.value = string;
        }
        
    })
})