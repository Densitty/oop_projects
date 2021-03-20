// event listeners
function eventListeners() {
  // select the question(s)
  const showBtn = document.getElementById("show-btn");
  const questionCard = document.querySelector(".question-card");
  // close the question
  const closeBtn = document.querySelector(".close-btn");
  // holds the form data
  const form = document.getElementById("question-form");
  const feedback = document.querySelector(".feedback");
  const questionInput = document.getElementById("question-input");
  const answerInput = document.getElementById("answer-input");
  const questionList = document.getElementById("questions-list");
  // data holds the questions
  let data = JSON.parse(localStorage.getItem("data")) || [];
  // let data = [];

  let id = 1;

  // new UI instance
  const ui = new UI();

  // load from Local Storage
  if (data !== null) {
    data
      .map(function (data) {
        ui.addQuestion(questionList, data);
      })
      .join("");
  } else {
    return [];
  }
  console.log(data);

  // show question form
  showBtn.addEventListener("click", function () {
    ui.showQuestion(questionCard);
  });

  // hide question form
  closeBtn.addEventListener("click", function () {
    ui.hideQuestion(questionCard);
  });

  // submit the question form
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const question = questionInput.value;
    const answer = answerInput.value;

    if (!question || !answer) {
      feedback.classList.add("showItem", "alert-danger");
      feedback.textContent =
        "Sorry, you cannot have a blank question or answer";
      // remove the alert from ui
      setTimeout(function () {
        feedback.classList.remove("showItem", "alert-danger");
      }, 4000);
    } else {
      const myQuestion = new Question(id, question, answer);
      data.push(myQuestion);
      localStorage.setItem("data", JSON.stringify(data));
      id++;
      // add question to the ui
      ui.addQuestion(questionList, myQuestion);
      // on successful addition of question and answer, clean up their inputs
      ui.clearFields(questionInput, answerInput);
    }
  });

  // event listener for the btns inside the form - should be on the parent since the child div which hosts the btns have not been created yet
  questionList.addEventListener("click", function (e) {
    // prevent default action on links (anchor tags)
    e.preventDefault();
    // when the show answer is clicked
    if (e.target.classList.contains("show-answer")) {
      e.target.nextElementSibling.classList.toggle("showItem");
    }
    // when the edit btn is clicked
    if (e.target.classList.contains("edit-flashcard")) {
      // get the id of the question
      const id = e.target.dataset.id;
      // delete the question from the UI
      e.target.parentElement.parentElement.parentElement.remove();
      // questionCard.remove();
      // open the question card
      ui.showQuestion(questionCard);
      // look for the specific question from the data array
      const questionToEdit = data.filter(function (question) {
        return parseInt(id) === question.id;
      });

      // find the index of the questionToEdit from data
      const questionToEditIndex = data.findIndex(function (question) {
        return parseInt(id) === question.id;
      });

      // remove the questionToEdit by its index from the data
      data.splice(questionToEditIndex, 1);
      // save the data manipulated onto local storage
      localStorage.setItem("data", JSON.stringify(data));

      // edit questionToEdit on the UI
      questionInput.value = questionToEdit[0].title;
      answerInput.value = questionToEdit[0].answer;
    }
    // when the delete btn is clicked
    if (e.target.classList.contains("delete-flashcard")) {
      const questionCard = e.target.parentElement.parentElement.parentElement;
      questionCard.remove();

      const questionToRemoveIndex = data.findIndex(function (question) {
        return parseInt(id) === question.id;
      });

      data.splice(questionToRemoveIndex, 1);
      // save the data manipulated onto local storage
      localStorage.setItem("data", JSON.stringify(data));
    }
  });
}

class UI {
  constructor() {}

  showQuestion(element) {
    element.classList.add("showItem");
  }

  hideQuestion(element) {
    element.classList.remove("showItem");
  }

  clearFields(question, answer) {
    question.value = "";
    answer.value = "";
  }

  addQuestion(element, question) {
    const div = document.createElement("div");
    div.classList.add("col-md-4");
    div.innerHTML = `
      <div class="card card-body flashcard my-3">
            <h4 class="text-capitalize">${question.title}</h4>
            <a href="#" class="text-capitalize my-3 show-answer"
              >show/hide answer</a
            >
            <h5 class="answer mb-3">${question.answer}</h5></h5>
            <div class="flashcard-btn d-flex justify-content-between">
              <a
                href="#"
                id="edit-flashcard"
                class="btn my-1 edit-flashcard text-uppercase"
                data-id="${question.id}"
                >edit</a
                >
                <a
                href="#"
                id="delete-flashcard"
                data-id="${question.id}"
                class="btn my-1 delete-flashcard text-uppercase"
                >delete</a
              >
            </div>
          </div>
    `;
    // append the div to the element
    element.appendChild(div);
  }
}

class Question {
  constructor(id, title, answer) {
    this.id = id;
    this.title = title;
    this.answer = answer;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  eventListeners();
});
