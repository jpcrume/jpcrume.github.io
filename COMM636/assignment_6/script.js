// For hamburger navigation bar just toggles the overlay menu
function toggleMenu() {
    const overlayMenu = document.getElementById("overlayMenu");
    overlayMenu.classList.toggle("show");
}

// quiz to recommend a book or series based on silly choices like a buzzfeed one 
// ChatGPT helped me #bless 
document.addEventListener("DOMContentLoaded", () => {
    const quizContainer = document.getElementById("quiz-container");
    const startButton = document.getElementById("start-quiz");

    const quizQuestions = [
        {
            // Setting up questions and answer choices 
            // Set up values for counting to lead to a result of recommendation 
            // images and text to help viewer be able to know their options 
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
            question: "Choose a pet to adopt!",
            answers: [
                { text: "Bird", value: "hunger_games", image: "../media/Quiz Images/mockingbird.jpg" },
                { text: "Bat", value: "underland_chronicles", image: "../media/Quiz Images/bat.png" },
                { text: "Rat", value: "underland_chronicles", image: "../media/Quiz Images/rat.png" },
                { text: "Puppy", value: "standalone_books", image: "../media/Quiz Images/puppy.png" }
            ]
        }, 
        {
            question: "Protect yourself, choose wisely.",
            answers: [
                { text: "Bow and Arrow", value: "hunger_games", image: "../media/Quiz Images/bowandarrow.png" },
                { text: "Armor", value: "underland_chronicles", image: "../media/Quiz Images/armor.jpg" },
                { text: "Sword", value: "standalone_books", image: "../media/Quiz Images/sword.jpg" },
                { text: "Slingshot", value: "standalone_books", image: "../media/Quiz Images/slingshot.jpg" }
            ]
        }, 
        {
            question: "What's your ideal way to heal?",
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
            question: "What is the trait you desire most?",
            answers: [
                { text: "Courage", value: "hunger_games", image: "../media/Quiz Images/courage.jpg" },
                { text: "Curiousity", value: "underland_chronicles", image: "../media/Quiz Images/curious.png" },
                { text: "I just like standalone stories", value: "standalone_books", image: "../media/Quiz Images/standalones.jpg" },
                { text: "Autobiographical", value: "standalone_books", image: "../media/Quiz Images/autobio.png" }
            ]
        }
    ];
    // Result recommendations options 
    const bookResults = {
        hunger_games: {
            title: "The Hunger Games Series",
            description: "Dive into the world of Panem and follow Katniss Everdeen's journey through courage, survival, and rebellion.",
            image: "../media/hungergames2.png", 
            link: "books.html#hunger-games"
        },
        underland_chronicles: {
            title: "The Underland Chronicles",
            description: "Join Gregor in a thrilling adventure through the mysterious Underland, full of secrets and unlikely alliances.",
            image: "../media/UnderloadChronciles.png",
            link: "books.html#underland"
        },
        standalone_books: {
            title: "Suzanne Collins' Standalone Books",
            description: "Explore captivating standalone stories that showcase Suzanne Collins' storytelling brilliance.",
            image: "../media/IPCOV.png",
            link: "books.html#standalone"
        }
    };

    // Starts the quick the button and initiliazes entire quiz
    startButton.addEventListener("click", () => startQuiz());

    // Begins the counter for your answers and choices in the quiz
    function startQuiz() {
        let currentQuestion = 0; // begins at 0
        const answers = {}; // variable to contain the count of score of answers so if you chose 2 hunger games choices it would be HG: 2, Underland: 1, Standalone: 0, as an example 

        // shows results for when all questions have been answered
        function showQuestion() { 
            if (currentQuestion >= quizQuestions.length) {
                showResult();
                return;
            }

            // retrieves the current question object
            // uses map() to iterate through the answers array
            // creates buttons for each answer, including text and images
            // assigns the data value to store the categories (HG, Underland, Standalone)
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

            // recording the choices based on answer buttons
            // retrieves the category value of the clicked button
            // increments the count for the selected category  (if the category is already in answers, adds 1, if not, it intializes to 1)
            // moves to next question by incrementing the question index and calling to display next question
            document.querySelectorAll(".quiz-answer").forEach((button) => {
                button.addEventListener("click", (event) => {
                    const value = event.target.closest("button").getAttribute("data-value");
                    answers[value] = (answers[value] || 0) + 1;
                    currentQuestion++;
                    showQuestion();
                });
            });
        }

        // when all questions answered, quiz shows result
        // gets all the keys in the answers object
        // finds the key with the highest value 
        // retrieves the corresponding result from bookresults
        // dynamically generates html to show title, image, and description of the recommended books
        function showResult() {
            const resultKey = Object.keys(answers).reduce((a, b) =>
                answers[a] > answers[b] ? a : b
            );
            const result = bookResults[resultKey];
        
            quizContainer.innerHTML = `
                <h3>Your Next Read is...</h3>
                <h2>${result.title}</h2>
                <img src="${result.image}" alt="${result.title}" style="max-width: 45%; border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);">
                <p>${result.description}</p>
                <div style="margin-bottom: 1em;">
                    <a href="${result.link}" target="_blank" style="color: blue; text-decoration: underline;">Learn More</a>
                </div>
                <div>
                    <button id="restart-quiz" class="cta-button">Take Quiz Again</button>
                </div>
            `;
        
            document
                .getElementById("restart-quiz")
                .addEventListener("click", () => startQuiz());
        }
        

        showQuestion();
    }
});


// Show popup after 5 seconds when the page loads
document.addEventListener("DOMContentLoaded", () => {
    const popup = document.getElementById("popup");
    const closeBtn = document.getElementById("popup-close");

    // Display the popup with a fade-in effect after 5 seconds
    setTimeout(() => {
        popup.classList.add("show");
    }, 2000); // 1000 milliseconds = 1 second

    // Close the popup immediately when the close button is clicked
    closeBtn.addEventListener("click", () => {
        popup.classList.remove("show");
        popup.style.display = "none";
    });
});
