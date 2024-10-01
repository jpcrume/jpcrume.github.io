// Making a function so that when the user inputs a text question in the question-input and clicks the button it will get a randomized response 
// If the user does not enter text and hits submit, I want it to tell the user to enter a question
function askQuestion() {
    // Making the function
    // First - the function needs to obtain the question from the input field
    let question = document.getElementById('question-input').value.trim();

    // Implement an if then statement 
    // This way when the user enters a question, the function continues to an answer 
    // When the user does not, THEN the user will be provided with the error message
    if (question) {
        // We need an array for these potential answers/responses for WHEN the user DOES enter a question
        const responses = [ // ChatGPT explained to me to use const so that no matter how many questions are inputted, the answer is still randomized
            "Yes, definitely!",
            "Ask again later.",
            "No way!",
            "It’s possible."
        ];

        // Now, we need to ensure it is truly randomized so that even if the same question is asked, a different answer could be chosen
        // To do this, random index to pick a response
        // ChatGPT had to help me this part
        // I will explain this from inside to outside of the parenthesis as that is how the computer reads and processes this
        // Math.random is generating a decimal between 0 and 1 (it can be 0 but it cannot be exactly 1) we do this so when it is multiplied by responses.length so that... 
        // the math.random will take the responses array made above so that it will actually choose a number between 0 and 4 (again can be 0 but cannot be 4)
        // Why do we exclude 4? Because in javascript indexing begins at 0 so having an index of 4 would not correlate with any of my 4 prompts causing an error in the function
        // We do all of this so that math.floor will then take that randomized number it rounds down to the nearest whole number which correlates with an index of the array
        const randomIndex = Math.floor(Math.random() * responses.length);

        // We now show the randomized response INSIDE of the magic eight ball png
        document.getElementById('response').innerText = responses[randomIndex];
    } else {
        // If or when no question is entered, we give it this response and continue to until it gives a text question and hits the button
        document.getElementById('response').innerText = "Please enter a question!";
    }
}

// We use event listener to the button to call askQuestion() when clicked
document.getElementById('ask-button').addEventListener('click', askQuestion);
