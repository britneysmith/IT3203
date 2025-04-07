// Quiz questions with types and correct answers
const questions = [
    {
      question: "What is the primary function of a website cookie?",
      options: [
        "To install software on your computer",
        "To help websites remember you and your preferences",
        "To block ads",
        "To be eaten"
      ],
      correct: "To help websites remember you and your preferences"
    },
    {
      question: "Which of the following is NOT a type of website cookie?",
      options: [
        "Session cookie",
        "Persistent cookie",
        "Malware cookie",
        "Persistent cookie"
      ],
      correct: "Malware cookie"
    },
    {
      type: "text", // fill-in-the-blank question
      question: "Fill in the blank: Cookies can help websites remember your login details and __________.",
      correct: "preferences"
    },
    {
      question: "What's a smart way to handle cookies when visiting unfamiliar websites?",
      options: [
        "Always accept all cookies to avoid popups",
        "Clear cookies every 10 minutes",
        "Customize or reject non-essential cookies",
        "eat them"
      ],
      correct: "Customize or reject non-essential cookies"
    },
    {
      type: "checkbox", // multiple-answer question
      question: "Which of these are potential risks of accepting website cookies? (Select all that apply)",
      options: [
        "Your browsing data might be shared with third parties",
        "Hackers can track your exact passwords using cookies",
        "You may see more targeted ads based on your activity",
        "Your internet speed will drastically slow down"
      ],
      correct: [
        "Your browsing data might be shared with third parties",
        "You may see more targeted ads based on your activity"
      ]
    }
  ];
  
  const quizContainer = document.querySelector(".quiz-container");
  const questionElement = document.querySelector(".question");
  const optionsContainer = document.querySelector(".options");
  const submitBtn = document.querySelector(".submit-btn");
  
  let currentQuestionIndex = 0;
  let score = 0;
  
  function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    optionsContainer.innerHTML = "";
  
    if (currentQuestion.type === "text") {
      const input = document.createElement("input");
      input.type = "text";
      input.className = "text-input";
      optionsContainer.appendChild(input);
    } else if (currentQuestion.type === "checkbox") {
        currentQuestion.options.forEach(option => {
          const div = document.createElement("div");
          div.className = "option";
          
          const label = document.createElement("label");
          label.style.cursor = "pointer";
          
          const checkbox = document.createElement("input");
          checkbox.type = "checkbox";
          checkbox.value = option;
          checkbox.style.marginRight = "10px";
          
          label.appendChild(checkbox);
          label.appendChild(document.createTextNode(option));
          div.appendChild(label);
          optionsContainer.appendChild(div);
        });    
    } else {
      currentQuestion.options.forEach(option => {
        const div = document.createElement("div");
        div.className = "option";
        div.textContent = option;
        div.addEventListener("click", () => {
          document.querySelectorAll(".option").forEach(opt => opt.classList.remove("selected"));
          div.classList.add("selected");
        });
        optionsContainer.appendChild(div);
      });
    }
  }
  
  function checkAnswer() {
    const currentQuestion = questions[currentQuestionIndex];
    let isCorrect = false;
  
    if (currentQuestion.type === "text") {
      const input = document.querySelector(".text-input");
      if (input && input.value.trim().toLowerCase() === currentQuestion.correct.toLowerCase()) {
        isCorrect = true;
      }
    } else if (currentQuestion.type === "checkbox") {
      const checkboxes = document.querySelectorAll("input[type=checkbox]:checked");
      const selectedValues = Array.from(checkboxes).map(cb => cb.value);
      if (
        selectedValues.length === currentQuestion.correct.length &&
        selectedValues.every(val => currentQuestion.correct.includes(val))
      ) {
        isCorrect = true;
      }
    } else {
      const selectedOption = document.querySelector(".option.selected");
      if (selectedOption && selectedOption.textContent === currentQuestion.correct) {
        isCorrect = true;
      }
    }
  
    if (isCorrect) score++;
  }
  
  function handleNextQuestion() {
    checkAnswer();
    currentQuestionIndex++;
  
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showResults();
    }
  }
  
  function showResults() {
    quizContainer.innerHTML = `
      <h2>You scored ${score} out of ${questions.length}</h2>
      <button onclick="location.reload()" class="submit-btn">Start Over</button>
    `;
  }
  
  submitBtn.addEventListener("click", handleNextQuestion);
  
  // Show the first question on page load
  showQuestion();
  