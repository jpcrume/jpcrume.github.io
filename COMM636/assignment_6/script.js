/* For hamburger navigation bar */
function toggleMenu() {
    const overlayMenu = document.getElementById("overlayMenu");
    overlayMenu.classList.toggle("show");
}

document.addEventListener("DOMContentLoaded", () => {
    const quizContainer = document.getElementById("quiz-container");
    const startButton = document.getElementById("start-quiz");

    const quizQuestions = [
        {
            question: "Pick a food!",
            answers: [
                { text: "Blueberries", value: "hunger_games", image: "../media/Quiz Images/blueberry.png" },
                { text: "Roasted Squirrel", value: "hunger_games", image: "../media/Quiz Images/squirrel.jpg" },
                { text: "Squid Ink Soup", value: "underland_chronicles", image: "../media/Quiz Images/squidink.jpg" },
                { text: "Bread", value: "standalone_books", image: "../media/Quiz Images/bread.jpg" }
            ]
        },
        {
            question: "Choose your house",
            answers: [
                { text: "Cottage", value: "standalone_books", image: "../media/Quiz Images/cottage.jpg" },
                { text: "Rustic House", value: "hunger_games", image: "../media/Quiz Images/village.jpg" },
                { text: "Modern Home", value: "standalone_books", image: "../media/Quiz Images/house.jpg" },
                { text: "Apartments", value: "underland_chronicles", image: "../media/Quiz Images/apartment.png" }
            ]
        },
        {
            question: "Everyone needs a pet, choose which to adopt!",
            answers: [
                { text: "Bird", value: "hunger_games", image: "../media/Quiz Images/mockingbird.jpg" },
                { text: "Bat", value: "underland_chronicles", image: "../media/Quiz Images/bat.png" },
                { text: "Rat", value: "underland_chronicles", image: "../media/Quiz Images/rat.png" },
                { text: "Puppy", value: "standalone_books", image: "../media/Quiz Images/puppy.png" }
            ]
        }, 
        {
            question: "You'll need to be able to protect and defend yourself, choose wisely.",
            answers: [
                { text: "Bow and Arrow", value: "hunger_games", image: "../media/Quiz Images/bowandarrow.png" },
                { text: "Armor", value: "underland_chronicles", image: "../media/Quiz Images/armor.jpg" },
                { text: "Sword", value: "standalone_books", image: "../media/Quiz Images/sword.jpg" },
                { text: "Slingshot", value: "standalone_books", image: "../media/Quiz Images/slingshot.jpg" }
            ]
        }, 
        {
            question: "You've been hurt, what is your ideal way to heal?",
            answers: [
                { text: "Potion", value: "hunger_games", image: "../media/Quiz Images/potion.png" },
                { text: "Ointment", value: "hunger_games", image: "../media/Quiz Images/cream.jpg" },
                { text: "Magic Mushrooms", value: "underland_chronicles", image: "../media/Quiz Images/mushroom.jpg" },
                { text: "Cookie", value: "standalone_books", image: "../media/Quiz Images/cookie.png" }
            ]
        }, 
        {
            question: "What is your favorite genre?",
            answers: [
                { text: "Enemies to Lovers", value: "hunger_games", image: "../media/Quiz Images/entolo.png" },
                { text: "Adventure Quest", value: "underland_chronicles", image: "../media/Quiz Images/adventurquest.png" },
                { text: "Fantasy", value: "underland_chronicles", image: "../media/Quiz Images/fantast.png" },
                { text: "Dystopian", value: "hunger_games", image: "../media/Quiz Images/dystopian.jpg" }
            ]
        }, 
        {
            question: "Finally, what is the trait you desire most for a main character to have?",
            answers: [
                { text: "Courage", value: "hunger_games", image: "../media/Quiz Images/courage.jpg" },
                { text: "Curiousity", value: "underland_chronicles", image: "../media/Quiz Images/curious.png" },
                { text: "I just like standalone stories", value: "standalone_books", image: "../media/Quiz Images/standalones.jpg" },
                { text: "Autobiographical", value: "standalone_books", image: "../media/Quiz Images/autobio.png" }
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
                <div class="answers-container">
                    ${question.answers
                        .map(
                            (answer, index) => `
                                <button class="quiz-answer" data-value="${answer.value}">
                                    ${
                                        answer.image
                                            ? `<img class="answer-image" src="${answer.image}" alt="${answer.text}">`
                                            : ""
                                    }
                                    <span>${answer.text}</span>
                                </button>`
                        )
                        .join("")}
                </div>
            `;

            document.querySelectorAll(".quiz-answer").forEach((button) => {
                button.addEventListener("click", (event) => {
                    const value = event.target.closest("button").getAttribute("data-value");
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
