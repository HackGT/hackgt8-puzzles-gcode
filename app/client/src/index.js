const faqs = document.querySelectorAll(".faq");
const axios = require('axios');

for (const faq of faqs) {
  const question = faq.querySelector(".question");
  const answer = faq.querySelector(".answer");
  const chevron = question.querySelector("i");
  question.addEventListener("click", () => {
    answer.classList.toggle("hide");
    chevron.classList.toggle("gg-chevron-down");
  });
}


function submitAnswer() {
  axios.post(
    "http://localhost:3000/submitEntry"
  ).then((response) => {("leaderboard-text").innerHTML = response.text;})
    .catch((error => {console.log(error);}))
}




