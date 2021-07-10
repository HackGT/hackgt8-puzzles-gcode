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


function getLeaderboard() {

}






