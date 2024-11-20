/* For hamburger navigation bar */
/* Finds the menu element by ID of overlayMenu */
/* Then adds or removes the show class from the element (making it visible by click rather than just constant on screen) */
function toggleMenu() {
    const overlayMenu = document.getElementById("overlayMenu");
    overlayMenu.classList.toggle("show");
}

/* This makes it so the script only runs after content is loaded */
document.addEventListener("DOMContentLoaded", () => {
    const quizContainer = document.getElementById("quiz-container");
    const startButton = document.getElementById("start-quiz");

    /* An array of questions for the quiz */
    /* The results map values which contribute to the resulting book suggestion */
    const quizQuestions = [
        {
            question: "What's your ideal setting for a story?",
            answers: [
                { text: "A dystopian future", value: "hunger_games" },
                { text: "An underground fantasy world", value: "underland_chronicles" },
                { text: "Standalone tales with unique themes", value: "standalone_books" }
            ]
        },
        {
            question: "Which quality best describes the main character you want to follow?",
            answers: [
                { text: "Courageous and resourceful", value: "hunger_games" },
                { text: "Adventurous and curious", value: "underland_chronicles" },
                { text: "Thoughtful and introspective", value: "standalone_books" }
            ]
        },
        {
            question: "Pick your favorite genre:",
            answers: [
                { text: "Action and survival", value: "hunger_games" },
                { text: "Fantasy and adventure", value: "underland_chronicles" },
                { text: "Drama and life stories", value: "standalone_books" }
            ]
        }
    ];

    /* For defining the book results that are displayed */
    const bookResults = {
        hunger_games: {
            title: "The Hunger Games Series",
            description: "Dive into the world of Panem and follow Katniss Everdeen's journey through courage, survival, and rebellion.",
            image: "../media/hungergames.jpg"
        },
        underland_chronicles: {
            title: "The Underland Chronicles",
            description: "Join Gregor in a thrilling adventure through the mysterious Underland, full of secrets and unlikely alliances.",
            image: "../media/underland.jpg"
        },
        standalone_books: {
            title: "Suzanne Collins' Standalone Books",
            description: "Explore captivating standalone stories that showcase Suzanne Collins' storytelling brilliance.",
            image: "../media/standalone.jpg"
        }
    };

    /* For starting the quiz with the use of a button */
    startButton.addEventListener("click", () => startQuiz());

    /* Initializing currentQuestion to track user's progress of the quiz */
    /* Initializing answers to record how many times each book series values is selected */
    function startQuiz() {
        let currentQuestion = 0;
        const answers = {};

        /* Checking to ensure all questions are answered and showing the result */
        function showQuestion() {
            if (currentQuestion >= quizQuestions.length) {
                showResult();
                return;
            }

            /* Takes from quiz questions and generates buttons for the answer options using map() */
            const question = quizQuestions[currentQuestion];
            quizContainer.innerHTML = `
                <h3>${question.question}</h3>
                <div>
                    ${question.answers
                        .map(
                            (answer, index) =>
                                `<button class="quiz-answer" data-value="${answer.value}">${index + 1}. ${answer.text}</button>`
                        )
                        .join("")}
                </div>
            `;

            /* Adds click event listeners to all answer / button options */
            /* Records the choices using data-values  */
            /* Then proceeds to next question by incrementing current question and calls show question to display the next question */
            document.querySelectorAll(".quiz-answer").forEach((button) => {
                button.addEventListener("click", (event) => {
                    const value = event.target.getAttribute("data-value");
                    answers[value] = (answers[value] || 0) + 1;
                    currentQuestion++;
                    showQuestion();
                });
            });
        }

        /* Uses reduce() to determine the most selected answer to find the key with the highest count in answers */
        /* Displaying the result for corresponding book rec in book results */
        /* updates quiz container to show result of book title, description, and image */
        /* Allow retaking the quiz with the restart quiz */
        function showResult() {
            const resultKey = Object.keys(answers).reduce((a, b) =>
                answers[a] > answers[b] ? a : b
            );
            const result = bookResults[resultKey];

            quizContainer.innerHTML = `
                <h3>Your Next Read is...</h3>
                <h2>${result.title}</h2>
                <img src="${result.image}" alt="${result.title}" style="max-width: 100%; border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);">
                <p>${result.description}</p>
                <button id="restart-quiz" class="cta-button">Take Quiz Again</button>
            `;

            document
                .getElementById("restart-quiz")
                .addEventListener("click", () => startQuiz());
        }

        showQuestion();
    }
});
