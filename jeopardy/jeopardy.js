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

function fillTable(myClues) {
   
let $jeopardyHead = $("#jeopardy thead");
let $jeopardyBody = $("#jeopardy tbody");

let $myHead = $(`<tr></tr>`);
$jeopardyHead.append($myHead);

    for (let clue of myClues){

        //attempted picking random question from clues array but not successful, could not identify bug, log cme out ok with an array of 
        // randomized numbers
        //always get error"jeopardy.js:124 TypeError: Cannot read properties of undefined (reading 'question')
    // at fillTable (jeopardy.js:119:59) ( console.log("Questions: 4 "+ clue.clues[setOfNum[3]].question);)
    // at HTMLButtonElement.handleStart (jeopardy.js:145:8)(fillTable(myClues);)

    //     let range = clue.clues.length;
    //     let count = 5
    //  let nums = new Set();
    //  while (nums.size < count) {
    //   nums.add(Math.floor(Math.random() * (range - 1 + 1) + 1));
    //      }
         
    //      let setOfNum =  [...nums]
    console.log(clue);

    // let setOfClues = _.sampleSize(clue, 5);
    // console.log(setOfClues);

    
     
    //    let $myTd = $(`<td ><h1>${clue.title}</h1></td>`);
    //      $myHead.append($myTd);
     
    //  let $myQues = $(`
    //  <tr><td ><p style="color: red" >${clue.clues[setOfNum[0]].question}</p></td></tr>
    //  <tr><td ><p style="color: blue">${clue.clues[setOfNum[1]].question}</p></td></tr>
    //  <tr><td ><p style="color: red">${clue.clues[setOfNum[2]].question}</p></td></tr>
    //  <tr><td ><p style="color: blue">${clue.clues[setOfNum[3]].question}</p></td></tr>
    //  <tr><td ><p style="color: red">${clue.clues[setOfNum[4]].question}</p></td></tr>
    //  `)
     
    //  $jeopardyBody.append($myQues)
 
     }
    



}


/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */

// function handleClick(evt) {
$("#start").on("click", async function handleStart(evt){
        evt.preventDefault();
        
let myCat = getCategoryIds();
let myClues = await getCategory(myCat);
console.log(myClues);



const okGo = async function(myClues){

if(myClues.every(ele => ele.clues.length > 5) = true)
{
        console.log('yay');
    
    } else if (myClues.every(ele => ele.clues.length > 5) = false) {
        myCat = getCategoryIds();
      myClues = await getCategory(myCat);
 return okGo(myClues);
    }


}
        
});

/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 */

function showLoadingView() {

}

/** Remove the loading spinner and update the button used to fetch data. */

function hideLoadingView() {
}

/** Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 * */

async function setupAndStart() {
}

/** On click of start / restart button, set up game. */

// TODO

/** On page load, add event handler for clicking clues */
// TODO