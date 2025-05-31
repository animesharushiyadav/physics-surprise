document.getElementById("quiz-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const answers = {
    q1: "A",
    q2: "B",
    q3: "C",
    q4: "C",
    q5: "D",
    q6: "B",
    q7: "D",
    q8: "B",
    q9: "D",
    q10: "A"
  };

  let score = 0;
  const totalQuestions = Object.keys(answers).length;

  for (let key in answers) {
    const selected = document.querySelector(`input[name="${key}"]:checked`);
    if (selected && selected.value === answers[key]) {
      score++;
    }
  }

  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = `YOUR SCORE = ${score} / ${totalQuestions}`;

  if ((score / totalQuestions) >= 0.8) {
    setTimeout(() => {
      window.location.href = "letter.html";
    }, 2000);
  }
});