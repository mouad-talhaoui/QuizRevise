
// =====================================================================================================================
//                                                                                                   RESOURCES INSERTER
// =====================================================================================================================

// ---------------------------------------------------------------------------------------------------------------------
//                                                                                               CONFIGURATION DE BASE
// ---------------------------------------------------------------------------------------------------------------------

/**
 * @typedef {Object} Resource
 * @property {string} title - The title of the resource.
 * @property {string} link - The URL of the resource.
 */

/**
 * An array of resource objects to be displayed on the page.
 * @type {Resource[]}
 */
const resources = [
    {
        title: "INPT Ressources",
        link: "https://drive.google.com/drive/folders/1N47xVtTOCrZABlqEFT7V3lAsPq9yLiQK?usp=drive_link"
    },
    {
        title: "ENSET Ressources",
        link: "https://drive.google.com/drive/folders/1eGHv7dk0t78Y5Uo6HK1K0SJZ8cMpPGA5?usp=drive_link"
    },
    {
        title: "BAC+2 Ressources",
        link: "https://drive.google.com/drive/folders/0B6myi2jo94YuSGNTNE9wN0FjVTQ?resourcekey=0-MFWuNEsHMkgJv_y-BxC7AQ&usp=drive_link"
    },
    {
        title: "OTHER Ressources",
        link: "https://drive.google.com/drive/folders/1SOv15eGJ0I_k7cRjDGqkNXCmQ-VqR9kz?usp=drive_link"
    }
    ,
    {
        title: "Livres Ressources",
        link: "https://drive.google.com/drive/folders/1tupfOQUq7opePd0Xq_LGmnj_xtwILRnk?usp=drive_link"
    }

];

// ---------------------------------------------------------------------------------------------------------------------
//                                                                                                   MANIPULATION DU DOM
// ---------------------------------------------------------------------------------------------------------------------

/**
 * Creates and injects resource elements into the DOM.
 * 
 * This function finds a container element by its ID and populates it with
 * styled links based on the `resources` array. If the container isn't found,
 * it does nothing, ensuring it only runs on the correct page.
 */
const displayResources = () => {
    const resourcesContainer = document.getElementById('resources-container');

    // Exit if the container element doesn't exist
    if (!resourcesContainer) {
        return;
    }

    // Generate the HTML for each resource
    const resourcesHTML = resources.map(resource => `
        <a href="${resource.link}" target="_blank" class="block bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
            <h3 class="text-xl font-semibold text-gray-800">${resource.title}</h3>
        </a>
    `).join('');

    // Inject the generated HTML into the container
    resourcesContainer.innerHTML = resourcesHTML;
};

// ---------------------------------------------------------------------------------------------------------------------
//                                                                                                   INITIALISATION
// ---------------------------------------------------------------------------------------------------------------------

// Add an event listener to run the displayResources function when the DOM is fully loaded.
document.addEventListener('DOMContentLoaded', displayResources);

// =====================================================================================================================
//                                                                                                      MATH QUIZ LOGIC
// =====================================================================================================================
document.addEventListener('DOMContentLoaded', () => {
    const mathQuizContainer = document.getElementById('math-quiz-container');
    if (!mathQuizContainer) return; // Only run on the math quiz page

    const startScreen = document.getElementById('quiz-start-screen');
    const questionScreen = document.getElementById('quiz-question-screen');
    const resultsScreen = document.getElementById('quiz-results-screen');

    const startBtn = document.getElementById('start-quiz-btn');
    const nextBtn = document.getElementById('next-btn');
    const restartBtn = document.getElementById('restart-quiz-btn');

    const questionTextEl = document.getElementById('question-text');
    const answerButtonsEl = document.getElementById('answer-buttons');

    const resultsTitleEl = document.getElementById('results-title');
    const resultsScoreEl = document.getElementById('results-score');
    const celebrationContainer = document.getElementById('celebration-container');

    const mathQuestions = [
        {
            question: "Quelle est la somme de la série numérique $\sum_{n=1}^{\infty} \\frac{1}{2^n}$ ?",
            answers: [
                { text: "1", correct: true },
                { text: "1/2", correct: false },
                { text: "2", correct: false },
                { text: "Infini", correct: false },
            ]
        },
        {
            question: "Le premier coefficient de Fourier $a_0$ pour la fonction $f(x) = x$ sur $[-\pi, \pi]$ est :",
            answers: [
                { text: "0", correct: true },
                { text: "1", correct: false },
                { text: "$\\pi$/2", correct: false },
                { text: "$\\pi$", correct: false },
            ]
        },
        {
            question: "Quelles sont les valeurs propres de la matrice $\begin{pmatrix} 2 & 7 \\ 1 & 8 \\end{pmatrix}$ ?",
            answers: [
                { text: "1 et 9", correct: true },
                { text: "2 et 8", correct: false },
                { text: "7 et 1", correct: false },
                { text: "-1 et 10", correct: false },
            ]
        }
    ];

    let currentQuestionIndex = 0;
    let score = 0;

    startBtn.addEventListener('click', startQuiz);
    nextBtn.addEventListener('click', () => {
        currentQuestionIndex++;
        showQuestion();
    });
    restartBtn.addEventListener('click', startQuiz);

    function startQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        startScreen.classList.add('hidden');
        resultsScreen.classList.add('hidden');
        questionScreen.classList.remove('hidden');
        nextBtn.classList.add('hidden');
        clearCelebration();
        showQuestion();
    }

    function showQuestion() {
        resetState();
        const question = mathQuestions[currentQuestionIndex];
        questionTextEl.innerHTML = question.question;
        question.answers.forEach(answer => {
            const button = document.createElement('button');
            button.innerHTML = answer.text;
            button.classList.add('answer-btn', 'w-full', 'bg-gray-200', 'p-4', 'rounded-lg', 'hover:bg-gray-300', 'transition-colors');
            if (answer.correct) {
                button.dataset.correct = answer.correct;
            }
            button.addEventListener('click', selectAnswer);
            answerButtonsEl.appendChild(button);
        });
        // Render LaTeX
        renderMathInElement(mathQuizContainer);
    }

    function resetState() {
        nextBtn.classList.add('hidden');
        while (answerButtonsEl.firstChild) {
            answerButtonsEl.removeChild(answerButtonsEl.firstChild);
        }
    }

    function selectAnswer(e) {
        const selectedBtn = e.target;
        const correct = selectedBtn.dataset.correct === 'true';
        if (correct) {
            score++;
        }
        Array.from(answerButtonsEl.children).forEach(button => {
            setStatusClass(button, button.dataset.correct === 'true');
            button.disabled = true; // Disable all buttons after an answer is chosen
        });

        if (mathQuestions.length > currentQuestionIndex + 1) {
            nextBtn.classList.remove('hidden');
        } else {
            showResults();
        }
    }

    function setStatusClass(element, correct) {
        clearStatusClass(element);
        if (correct) {
            element.classList.add('correct');
        } else {
            element.classList.add('incorrect');
        }
    }

    function clearStatusClass(element) {
        element.classList.remove('correct');
        element.classList.remove('incorrect');
    }

    function showResults() {
        questionScreen.classList.add('hidden');
        resultsScreen.classList.remove('hidden');
        const scorePercent = Math.round((score / mathQuestions.length) * 100);
        resultsScoreEl.textContent = `Votre score : ${score} / ${mathQuestions.length} (${scorePercent}%)`;

        if (scorePercent >= 70) {
            resultsTitleEl.textContent = "Félicitations ! Vous avez réussi !";
            triggerCelebration();
        } else {
            resultsTitleEl.textContent = "Dommage... Essayez encore !";
        }
    }

    function triggerCelebration() {
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.style.left = `${Math.random() * 100}vw`;
            confetti.style.animationDelay = `${Math.random() * 3}s`;
            // Add different colors
            const colors = ['#fde047', '#f97316', '#ec4899', '#8b5cf6'];
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            celebrationContainer.appendChild(confetti);
        }
    }

    function clearCelebration() {
        celebrationContainer.innerHTML = '';
    }
});
