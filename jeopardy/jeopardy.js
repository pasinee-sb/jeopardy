// categories is the main data structure for the app; it looks like this:

//  [
//    { title: "Math",
//      clues: [
//        {question: "2+2", answer: 4, showing: null},
//        {question: "1+1", answer: 2, showing: null}
//        ...
//      ],
//    },
//    { title: "Literature",
//      clues: [
//        {question: "Hamlet Author", answer: "Shakespeare", showing: null},
//        {question: "Bell Jar Author", answer: "Plath", showing: null},
//        ...
//      ],
//    },
//    ...
//  ]


/** Get NUM_CATEGORIES random category from API.
 *
 * Returns array of category ids
 */


function  getCategoryIds() {
  const numbers = Array. from( {length: 1000}, (item, index) => item = index + 1 ); 
return (_.sampleSize(numbers, 6));
   
}

/** Return object with data about a category:
 *
 *  Returns { title: "Math", clues: clue-array }
 *
 * Where clue-array is:
 *   [
 *      {question: "Hamlet Author", answer: "Shakespeare", showing: null},
 *      {question: "Bell Jar Author", answer: "Plath", showing: null},
 *      ...
 *   ]
 */
async function getCategory(catId) {

    let categories= [];

    for (let cat of catId){


    let res = await axios.get(`https://jservice.io/api/category/?id=${cat}`);

    
    
        let myClues =[];
      for (let clue of res.data.clues){
    // console.log("QUESTION: "+ clue.question, "ANSWER "+ clue.answer);
     let myObj = {question: `${clue.question}`, answer: `${clue.answer}`, showing: null};
    // console.log(myObj);
    myClues.push(myObj);
    }
    let myCat = {title: res.data.title, clues: myClues}
    categories.push(myCat); 

} 
   return categories;
    
}

/** Fill the HTML table#jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initally, just show a "?" where the question/answer would go.)
 */

async function fillTable(myClues) {


    for (let clue of myClues){
    let setOfClues = _.sampleSize(clue.clues, 5);
const $column = $(`<div class="category"></div>`);
    
    const $catTitle = $(`<div class="catName"><p>${clue.title}<p></div>`);
    
    $("#jeopardy").append($column).append($catTitle);

console.log(setOfClues);

            for(let question of setOfClues){

    const $card = $(`<div class="card" question="${question.question}" answer="${question.answer}" showing=${question.showing}">?</div>`);
    $catTitle.append($card);
    
  
    $card.on("click", handleClick)
}
}

}





/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */

async function handleClick(evt) {


    this.innerHTML = "";
this.style.fontSize = "12px";
this.style.lineHeight = "30px";
const qDisplay = document.createElement('div');
qDisplay.classList.add("my-card");
const textDisplay =document.createElement('span');
textDisplay.classList.add("card-text");
textDisplay.innerHTML = this.getAttribute('question');
const myButton = document.createElement('button');
myButton.innerText = "answer";

// const aDisplay = document.createElement('div');
// aDisplay.classList.add("my-answer");
const answerDisplay =document.createElement('span');
answerDisplay.classList.add("card-answer");
answerDisplay.innerHTML = this.getAttribute('answer');




this.append(qDisplay);
qDisplay.append(textDisplay);
qDisplay.append(myButton);

// this.append(aDisplay);
qDisplay.append(answerDisplay);
answerDisplay.classList.add('no-show');


myButton.addEventListener("click", answer)


}

async function answer() {

   console.log(this.parentElement);
   this.parentElement.children[0].classList.add('no-show');
   this.parentElement.children[1].classList.add('no-show');
   this.parentElement.children[2].classList.remove('no-show')




 }


/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 */

function showLoadingView() {

}

/** Remove the loading spinner and update the button used to fetch data. */

function hideLoadingView() {
    $("#spin-container").remove();
}

/** Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 * */

async function setupAndStart(evt) {
    evt.preventDefault();
    let myCat = getCategoryIds();
let myClues = await getCategory(myCat);
let numArr = myClues.map(ele=> ele.clues.length);

//check if each category retrieved from API contains at least 5 questions in clues array if not,
//re-shuffle and re-check then populate table when finalized 

const checkFive = async function(myClues){

const isFive = (ele)=>ele>4;
if(numArr.every(isFive)){
    hideLoadingView();
fillTable(myClues);
} else {
myCat = getCategoryIds();
myClues = await getCategory(myCat);
checkFive(myClues);
}
}
checkFive(myClues);
}

$("#start").on("click", setupAndStart );

/** On click of start / restart button, set up game. */

// TODO

/** On page load, add event handler for clicking clues */
// TODO