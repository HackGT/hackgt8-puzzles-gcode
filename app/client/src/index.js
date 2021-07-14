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


function submitAnswer(answer) {
  axios.post(
    "http://localhost:3001/submitEntry", 
    JSON.stringify({
      "answer": answer}),
    {
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    }
  ).then((response) => {("leaderboard-text").innerHTML = response.text;})
    .catch((error => {console.log(error);}))
}

submitAnswer("fwe");

