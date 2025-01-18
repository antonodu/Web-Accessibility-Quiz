const quizData = [
    {
        question: "1. What is the primary goal of Web Accessibility?",
        options: {a: "To create visually appealing websites", b: "To make websites usuable for everyone, including people with disabilities", c: "To ensure websites load faster", d:"To increase website rankings on search engines"},
        correct: "b",

    },
    {
        question: "2. What does the acronym WCAG stand for?",
        options: {a: "Web Content Accessibility Guidelines", b: "Website Compliance Accessibility Guide", c:"Web Compliance and Accessibility Group", d: "World Committee for Accessible Guidelines"},
        correct: "a",
    },
    {
        question: "3. What is the minimum colour contrast ratio for normal size web text against its background for WCAG 2.1AA?",
        options: {a: "7.0 :1", b: "3.0 :1", c: "4.5: 1", d: "5.0 :1"},
        correct: "c", 
    },
    {
        question: "4. How many levels of accessibility are there in WCAG?",
        options: {a: "None, every website has to conform with the criteria in WCAG", b: "One, AA", c: "Three: A, AA, AAA", d: "Two, A, AA"},
        correct: "c",
    },
    {
        question: "5. What are examples of landmarks in HTML5?",
        options: {a: "<h1>, <p>, <blockquote>", b: "<button>, <p>, <input>", c: "<header>, <main>, <footer>", d: "<h1>, <h2>, <h3>"},
        correct: "c",
    },
    {
        question: "6. Why are captions important for videos?",
        options: {a: "To improve video quality", b: "To make videos more engaging", c: "To provide metadata for search engines", d: "To ensure content is accessible to users who are deaf or hard of hearing" },
        correct: "d",
    },
    {
        question: "7. Which of the following is an example of an accessible website feature?",
        options: {a: "High contrast between text and background", b: "Images without alternative text", c: "Videos without captions", d: "Small text sizes for compact design"},
        correct: "a",
    },
    {
        question: "8. Why should images on a website include alt text",
        options: {a: "To improve SEO", b: "To make images load faster", c: "To add captions below the images", d: "To describe the image content for screen readers"},
        correct: "d"
    },
    {
        question: "9. Which of the following is a key principle of WCAG?",
        options: {a: "Operability", b: "Visibility", c: "Sustainability", d: "Scalability"},
        correct: "a",
    },
    {
        question: "10. What is the purpose of ARIA (Accessible Rich Internet Applications)?",
        options: {a: "To improve website loading speed", b: "To enhance the appearance of websites", c: "To omptimise websites for search engines", d: "To make dynamic content and user interfaces more accessible"},
        correct: "d",
    },
    {
        question: "11. How can you make keyboard navigation accessible?",
        options: {a: "Use only a mouse interaction for navigation", b: "Ensure all interactive elements are focusable", c: "Disable tabbing on form fields", d: "Avoid Keyboard shortcuts"},
        correct: "b",
    },
    {
        question: "12. What does perceivable mean in the context of accessibility?",
        options: {a: "Content is available in ways that can be recognised by the senses, such as sight or hearing", b: "Users can perceive all colours on the website", c: "Website loads within a perceivable ammount of time", d: "Website is visible on all devices"},
        correct: "a",
    },
];

let currentQuestionIndex = 0;
let score = 0;

const questionBox = document.getElementById("question");
const options = document.querySelectorAll(".option");
const nextButton = document.getElementById("next-btn");
const submitButton = document.getElementById("submit-btn")
const resultDiv = document.getElementById("result");

function loadQuestion() {
  if (currentQuestionIndex < quizData.length) {
    const currentQuestion = quizData[currentQuestionIndex];
    questionBox.innerText = currentQuestion.question;

    options.forEach((option) => {
      const optionKey = option.getAttribute("data-option");
      option.innerText = `${optionKey.toUpperCase()}. ${currentQuestion.options[optionKey]}`;
      option.classList.remove("selected");
      option.classList.remove("correct");
      option.classList.remove("incorrect");
    });

    resultDiv.innerText = ""; // Clear result message for the current question
  } else {
    // Switch to submit button on the last question
    nextButton.style.display = "none";
    submitButton.style.display = "inline-block";
  }
}

function selectOption(e) {
  options.forEach((option) => option.classList.remove("selected"));
  e.target.classList.add("selected");
}

function nextQuestion() {
  const selectedOption = document.querySelector(".option.selected");
  if (!selectedOption) {
    alert("Please select an option!");
    return;
  }

  const answer = selectedOption.getAttribute("data-option");
  if (answer === quizData[currentQuestionIndex].correct) {
    score++;
    selectedOption.classList.add("correct");
  } else {
    selectedOption.classList.add("incorrect");
    // Highlight the correct answer
    const correctOption = document.querySelector(
      `.option[data-option="${quizData[currentQuestionIndex].correct}"]`
    );
    correctOption.classList.add("correct");
  }

  currentQuestionIndex++;

  setTimeout(() => {
    loadQuestion();
  }, 1000); // Delay to show feedback before moving to the next question
}

function submitQuiz() {
  // Calculate score based on the selected answers
 if (currentQuestionIndex < quizData.length) {
  const selectedOption = document.querySelector(".option.selected");
  if(selectedOption) {
    const answer = selectOption.getAttribute("data-option");
    if(answer === quizData[currentQuestionIndex].correct) {
      score++
    }
  } else {
    alert("Please select an option before submitting!")
    return;
  }
 }

 displayResult();
}


function displayResult() {
  questionBox.style.display = "none";
  document.getElementById("options").style.display = "none";
  nextButton.style.display = "none";
  submitButton.style.display = "none";
  resultDiv.innerHTML = `
    <h3>Quiz Complete!</h3>
    <p>You scored ${score} out of ${quizData.length}.</p>
    <button id="restart-btn" onclick="restartQuiz()" style="background: #28a745; border:none; color: white; cursor: pointer; border-radius: 5px; font-size: 1rem;" >Restart Quiz</button>
  `;

  const bluebox = document.getElementById("question-box");
  if (bluebox) {
    bluebox.style.display = "none";
  }
}

function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;

  const bluebox = document.getElementById("question-box");
  if (bluebox) {
    bluebox.style.display = "block";
  }

  questionBox.style.display = "block";
  document.getElementById("options").style.display = "flex";
  nextButton.style.display = "inline-block";
  submitButton.style.display = "none";
  loadQuestion();
}



options.forEach((option) => option.addEventListener("click", selectOption));
nextButton.addEventListener("click", nextQuestion);
submitButton.addEventListener("click", submitQuiz);

loadQuestion();



