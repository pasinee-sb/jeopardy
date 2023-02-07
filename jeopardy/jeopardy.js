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


let data = [];




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

 
 
 *   (initally, just show a "?" where the question/answer would go.)
 */

async function fillTable(myClues) {


    for (let clue of myClues){
        // *- Randomize 5 questions from the pool of each category (myClues)
    let setOfClues = _.sampleSize(clue.clues, 5);

    // * - Each <div .category> column filled w/a <div .catName> for each category

const $column = $(`<div class="category"></div>`);
    
    const $catTitle = $(`<div class="catName"><p>${clue.title}<p></div>`);
    
    $("#jeopardy").append($column).append($catTitle);



            setOfClues.forEach((element) => {
              
//push each set of question and answer to an array of data, this array will gather all 30 sets of questions and answers
                data.push({question: `${element.question}`, answer: `${element.answer}`});

                  // * - create  <div .card>  filled w/ each randomized question for each category and assign id based on the index in data array

                let $card = $(`<div class="card" id=${data.length-1}>?</div>`);
                $catTitle.append($card);
                // console.log($card);
               $card.on("click", handleClick)
                
          
            })
           

}
// data.forEach((element,index)=>{
//     console.log(element, index);})

}




/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .question class to determine what to show:
 * - if currently no .question, add .question and show "question"
 * - if currently .question,add .answer & show "answer"

 * */

async function handleClick(evt) {

let myCard = evt.target;
if(!myCard.classList.contains('question')){
    myCard.classList.add('question');
    myCard.innerHTML = data[myCard.id].question;
  
}
else {

    myCard.classList.add('answer');
    myCard.innerHTML = data[myCard.id].answer;
}
return

}




/** Remove the loading spinner and update the button used to fetch data. */

function hideLoadingView() {
    $("#spin-container").remove();
}

/** Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table and fill clues by catagory
 * */

async function setupAndStart(evt) {
    evt.preventDefault();
    
    $("#jeopardy").empty();
    
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