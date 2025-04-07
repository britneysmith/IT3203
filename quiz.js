const questions = [
    {
      type: "radio",
      question: "What is the primary function of a website cookie?",
      options: {
        a: "To install software on your computer",
        b: "To help websites remember you and your preferences",
        c: "To block ads"
      },
      correct: "b"
    },
    {
      type: "radio",
      question: "Which of the following is NOT a type of website cookie?",
      options: {
        a: "Session cookie",
        b: "Persistent cookie",
        c: "Malware cookie"
      },
      correct: "c"
    },
    {
      type: "text",
      question: "Fill in the blank: Cookies can help websites remember your login details and __________.",
      correct: "preferences"
    },
    {
      type: "checkbox",
      question: "Which of these are potential risks of accepting website cookies? (Select all that apply)",
      options: {
        a: "Your browsing data might be shared with third parties",
        b: "Hackers can track your exact passwords using cookies",
        c: "You may see more targeted ads based on your activity",
        d: "Your internet speed will drastically slow down"
      },
      correct: ["a", "c"]
    },
    {
      type: "radio",
      question: "What’s a smart way to handle cookies when visiting unfamiliar websites?",
      options: {
        a: "Always accept all cookies to avoid popups",
        b: "Clear cookies every 10 minutes",
        c: "Customize or reject non-essential cookies"
      },
      correct: "c"
    }
  ];
  
  let currentQuestion = 0;
  const answers = [];
  
  const questionContainer = document.getElementById("question-container");
  const nextBtn = document.getElementById("next-btn");
  const counter = document.getElementById("question-counter");
  const results = document.getElementById("results");
  
  function renderQuestion() {
    const q = questions[currentQuestion];
    let html = `<p>${currentQuestion + 1}. ${q.question}</p>`;
  
    if (q.type === "radio" || q.type === "checkbox") {
      for (const [key, text] of Object.entries(q.options)) {
        html += `
          <label>
            <input type="${q.type}" name="q${currentQuestion}" value="${key}">
            ${key}) ${text}
          </label><br>`;
      }
    } else if (q.type === "text") {
      html += `<input type="text" name="q${currentQuestion}">`;
    }
  
    questionContainer.innerHTML = html;
    counter.textContent = `${currentQuestion + 1} of ${questions.length} Questions`;
    nextBtn.textContent = currentQuestion === questions.length - 1 ? "Submit Quiz" : "Next Question";
  }
  
  function getUserAnswer() {
    const q = questions[currentQuestion];
    if (q.type === "text") {
      return document.querySelector(`input[name="q${currentQuestion}"]`).value.trim().toLowerCase();
    }
  
    if (q.type === "radio") {
      const selected = document.querySelector(`input[name="q${currentQuestion}"]:checked`);
      return selected ? selected.value : null;
    }
  
    if (q.type === "checkbox") {
      return Array.from(document.querySelectorAll(`input[name="q${currentQuestion}"]:checked`))
        .map(cb => cb.value);
    }
  }
  
  function checkAnswers() {
    let score = 0;
    let summary = [];
  
    questions.forEach((q, i) => {
      const userAnswer = answers[i];
      let correctDisplay;
  
      if (q.type === "text") {
        correctDisplay = q.correct;
        if (userAnswer === q.correct) score++;
      } else if (q.type === "radio") {
        correctDisplay = q.correct;
        if (userAnswer === q.correct) score++;
      } else if (q.type === "checkbox") {
        const isCorrect = q.correct.every(c => userAnswer.includes(c)) && userAnswer.length === q.correct.length;
        correctDisplay = q.correct.join(", ");
        if (isCorrect) score++;
      }
  
      summary.push(`Q${i + 1}: Your answer: ${Array.isArray(userAnswer) ? userAnswer.join(", ") : userAnswer || "No answer"} — Correct: ${correctDisplay}`);
    });
  
    results.innerHTML = `You scored ${score}/${questions.length}.<br><br>` + summary.join("<br>");
    results.classList.remove("hidden");
    nextBtn.disabled = true;
  }
  
  nextBtn.addEventListener("click", () => {
    const userAnswer = getUserAnswer();
    if (!userAnswer || (Array.isArray(userAnswer) && userAnswer.length === 0)) {
      alert("Please select or enter an answer before continuing.");
      return;
    }
  
    answers[currentQuestion] = userAnswer;
  
    if (currentQuestion < questions.length - 1) {
      currentQuestion++;
      renderQuestion();
    } else {
      questionContainer.innerHTML = "";
      counter.textContent = "Quiz Complete";
      nextBtn.textContent = "Submitted";
      checkAnswers();
    }
  });
  
  renderQuestion();