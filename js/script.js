/* js/quiz.js */
document.addEventListener('DOMContentLoaded', () => {
  const questions = [
    { q: "Which of the following pairs have the same dimensions?", options: ["Impulse and Momentum", "Force and Pressure", "Energy and Torque", "Work and Power"], answer: 0 },
    { q: "The dimensional formula for Planck’s constant is:", options: ["[MLT⁻¹]", "[ML²T⁻³]", "[ML²T⁻²]", "[ML²T⁻¹]"], answer: 3 },
    { q: "If x = at² + bt + c, the dimensions of b are:", options: ["[LT]", "[LT⁻²]", "[LT⁻¹]", "[L]"], answer: 2 },
    { q: "Which is not a dimensionless quantity?", options: ["Strain", "Refractive Index", "Gravitational constant", "Relative density"], answer: 2 },
    { q: "Which quantity has [ML⁰T⁻²]?", options: ["Force", "Pressure", "Tension", "Stress"], answer: 3 },
    { q: "Unit of coefficient of viscosity:", options: ["kg m² s⁻¹", "kg m⁻¹ s⁻¹", "kg m s⁻²", "kg s⁻²"], answer: 1 },
    { q: "Dimensional formula of angular momentum:", options: ["[ML²T⁻²]", "[MLT⁻¹]", "[MLT⁻²]", "[ML²T⁻¹]"], answer: 3 },
    { q: "Which has same dimension as energy?", options: ["Impulse", "Torque", "Power", "Momentum"], answer: 1 },
    { q: "Significant figures in 0.00750:", options: ["2", "4", "5", "3"], answer: 3 },
    { q: "Which is dimensionless?", options: ["Poisson’s ratio", "Surface tension", "Electric potential", "Magnetic flux"], answer: 0 },
  ];

  const form = document.getElementById("quizForm");
  const scoreSection = document.getElementById("scoreSection");

  questions.forEach((q, i) => {
    const qDiv = document.createElement("div");
    qDiv.innerHTML = `<p><strong>Q${i + 1}:</strong> ${q.q}</p>`;
    q.options.forEach((opt, idx) => {
      qDiv.innerHTML += `<label><input type="radio" name="q${i}" value="${idx}"> ${opt}</label><br>`;
    });
    form.appendChild(qDiv);
  });

  const submitBtn = document.createElement("button");
  submitBtn.textContent = "Submit Quiz";
  submitBtn.type = "button";
  submitBtn.onclick = () => {
    let score = 0;
    questions.forEach((q, i) => {
      const selected = form.querySelector(`input[name='q${i}']:checked`);
      if (selected && parseInt(selected.value) === q.answer) score++;
    });
    scoreSection.innerHTML = `<h3>Your Score = ${score * 10}%</h3>`;
    if (score >= 8) {
      scoreSection.innerHTML += "<p>Redirecting to your surprise in 5 seconds...</p>";
      setTimeout(() => {
        window.location.href = "letter.html";
      }, 5000);
    }
  };
  form.appendChild(submitBtn);
});

/* js/game.js */
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
let basket = { x: 160, y: 550, width: 80, height: 20 };
let hearts = [];
let caught = 0;

function drawBasket() {
  ctx.fillStyle = "#ff8080";
  ctx.fillRect(basket.x, basket.y, basket.width, basket.height);
}

function drawHearts() {
  ctx.fillStyle = "red";
  hearts.forEach(h => ctx.fillRect(h.x, h.y, 20, 20));
}

function updateHearts() {
  for (let h of hearts) h.y += 4;
  hearts = hearts.filter(h => h.y < canvas.height);
}

function detectCatch() {
  hearts.forEach((h, i) => {
    if (h.y + 20 >= basket.y && h.x >= basket.x && h.x <= basket.x + basket.width) {
      caught++;
      hearts.splice(i, 1);
      if (caught >= 10) window.location.href = "encouragement.html";
    }
  });
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBasket();
  drawHearts();
  updateHearts();
  detectCatch();
  requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", e => {
  if (e.key === "ArrowLeft" && basket.x > 0) basket.x -= 20;
  if (e.key === "ArrowRight" && basket.x < canvas.width - basket.width) basket.x += 20;
});

setInterval(() => {
  hearts.push({ x: Math.random() * 380, y: 0 });
}, 800);

gameLoop();
