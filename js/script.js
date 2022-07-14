/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

/* Create the search input and button*/
const header = document.querySelector('.header');
const label = document.createElement('label');
const input = document.createElement('input');
const image = document.createElement('img');
const button = document.createElement('button');


label.setAttribute('for', 'search');
label.setAttribute('class', 'student-search');
input.setAttribute('id', 'search');
input.setAttribute('placeholder', 'Search by name...');
button.setAttribute('type', 'button');
image.setAttribute('src', 'img/icn-search.svg');
image.setAttribute('alt', 'Search icon');

button.appendChild(image);
label.appendChild(input);
label.appendChild(button);

header.appendChild(label);

let search = document.getElementById('search');

/*



Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
const div = document.querySelector('.page');
const studentUl = div.querySelector('ul');
const paginationUl = document.querySelector('ul.link-list');
const numOfButtons = Math.ceil(data.length / 9);
const searchBtn = document.querySelector('.student-search button');
let found = [];
let numOfSearchButtons;
let pageButtonClicked;
let noResultMessage;





/*  Create the stuydent list items from data base 
   append them to the student list ul 
*/

for (let i = 0; i < data.length; i++) {
   const studentLi = document.createElement('li');
   const photo = document.createElement('img');
   const studentDiv = document.createElement('div');
   const studentEmail = document.createElement('span');
   const studentName = document.createElement('h3');
   let joinedDate = document.createElement('span');
   const joinedDiv = document.createElement('div');

   photo.src = data[i].picture.medium;
   photo.className = 'avatar';
   photo.setAttribute('alt', "Profile Picture");
   let studentInfo = data[i].name.first + " " + data[i].name.last;
   studentName.textContent = studentInfo;
   studentEmail.textContent = data[i].email;
   let dateJoined = ` Joined ${data[i].registered.date}`;
   joinedDate.textContent = dateJoined;
   joinedDate.className = 'date';
   studentDiv.className = "student-details";
   studentDiv.appendChild(photo);
   studentDiv.appendChild(studentName);
   studentDiv.appendChild(studentEmail);
   joinedDiv.appendChild(joinedDate);
   joinedDiv.className = "joined-details";
   studentLi.appendChild(studentDiv);
   studentLi.appendChild(joinedDiv);
   studentLi.className = "student-item cf";
   studentUl.appendChild(studentLi);

}

let list = document.querySelectorAll('.student-list li');

/* this creates the pagination button based on the number of buttons required 
this is for the default display , there is a separate function that handles creating button for search result*/


function addPagination(numOfButtons) {


   for (let i = 0; i < numOfButtons; i++) {
      const buttonLi = document.createElement('li');
      const btn = document.createElement('button');
      btn.textContent = i + 1;
      btn.setAttribute('type', 'button');
      buttonLi.appendChild(btn);
      paginationUl.appendChild(buttonLi);

   }


   return (document.querySelectorAll("ul.link-list li"));
}

let theButtons = addPagination(numOfButtons);


/* when any of the default display pagination button is clicked,
 and even is fired to change the button to active then display 
 the student list associate with the particular button*/

paginationUl.addEventListener('click', (e) => {
   if (e.target.tagName == 'BUTTON') {
      for (let i = 0; i < theButtons.length; i++) {
         theButtons[i].firstElementChild.className = '';
      }
      e.target.className = 'active';
      pageButtonClicked = e.target;
      changeDisplay(pageButtonClicked);
   }

});


// this is to ensure 9 students are displayed on page load

window.onload = (event) => {
   defaultDisplay(list);
};

function defaultDisplay(list) {

   hideAll(); // initially hide all element
   for (let i = 0; i < 9; i++) {
      list[i].style.display = 'block'; // then display first nint items 
   }

   theButtons[0].firstElementChild.className = 'active';
}


// changng the student list displayed based on button pages that is clicked 
function changeDisplay(pageButtonClicked) {


   for (let i = 0; i < numOfButtons; i++) {
      if (pageButtonClicked.textContent == i + 1) {
         hideAll();
         for (let j = i * 9; j < (i * 9) + 9; j++) {
            if (list[j]) {
               list[j].style.display = 'block';
            }

         }
      }
   }


}

// this hides all item

function hideAll() {
   for (let i = 0; i < list.length; i++) {
      list[i].style.display = 'none';
   }
}

// SEARCH SECTION 

//event listener for  seartch button and keyup for search input
search.addEventListener('keyup', () => {

   searchItem();
});

searchBtn.addEventListener('click', () => {

   searchItem();
});

// get the list of names from student list to compare to inout search item

const namesToCompare = document.querySelectorAll('.student-list h3');


function searchItem() {
   if (noResultMessage) {
      noResultMessage.remove();
   }

   hideAll();

   /*
   first setting the found array search item to empty to update new search result for each keyup
   */
   found = [];
   const str = search.value.toLowerCase();
   for (let i = 0; i < namesToCompare.length; i++) {
      let strstr = namesToCompare[i].textContent.toLowerCase();


      if (strstr.includes(str)) {
         found.push(list[i]);
      }
   }
   displaySeach();
}



function displaySeach() {


   while (paginationUl.firstChild) {
      paginationUl.removeChild(paginationUl.firstChild);
   }

   hideAll();

   /*this is to display the first nine result if items found**/

   let a;
   if (found.length > 9) {
      a = 9;
   }
   else {
      a = found.length;
   }


   for (let i = 0; i < a; i++) {
      found[i].style.display = 'block';
   }

   //this informs user that no item is found

   if (found.length == 0) {
      numOfSearchButtons = 1;
      noResultMessage = document.createElement('h1');
      noResultMessage.textContent = 'NO RESULT';
      noResultMessage.className = 'noResult';
      label.insertBefore(noResultMessage, input);

   } else {
      numOfSearchButtons = Math.ceil(found.length / 9);
   }


   let searcResultnextButtons = addPagination(numOfSearchButtons);
   searcResultnextButtons[0].firstElementChild.className = 'active';


   // pagination button event listener for search result

   paginationUl.addEventListener('click', (e) => {
      if (e.target.tagName == 'BUTTON') {
         for (let i = 0; i < searcResultnextButtons.length; i++) {
            searcResultnextButtons[i].firstElementChild.className = '';

         }
         e.target.className = 'active';
         pageButtonClicked = e.target;
         SearchChangeDiaplay(pageButtonClicked);
      }

   });


}



function SearchChangeDiaplay(pageButtonClicked) {


   for (let i = 0; i < numOfSearchButtons; i++) {
      if (pageButtonClicked.textContent == i + 1) {
         hideAll();
         for (let j = i * 9; j < (i * 9) + 9; j++) {
            if (found[j]) {
               found[j].style.display = 'block';
            }

         }
      }
   }


}