function toggleMenu() {
    const overlayMenu = document.getElementById("overlayMenu");
    overlayMenu.classList.toggle("show");
}

document.addEventListener("DOMContentLoaded", () => {
    const quizContainer = document.getElementById("quiz-container");
    const startButton = document.getElementById("start-quiz");

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

    startButton.addEventListener("click", () => startQuiz());

    function startQuiz() {
        let currentQuestion = 0;
        const answers = {};

        function showQuestion() {
            if (currentQuestion >= quizQuestions.length) {
                showResult();
                return;
            }

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

            document.querySelectorAll(".quiz-answer").forEach((button) => {
                button.addEventListener("click", (event) => {
                    const value = event.target.getAttribute("data-value");
                    answers[value] = (answers[value] || 0) + 1;
                    currentQuestion++;
                    showQuestion();
                });
            });
        }

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
