showNotes();

// If user adds a note , add it to the localStorage

// targetting add note button
let addBtn = document.getElementById('AddButton');

// adding an event listener for the add note button
addBtn.addEventListener('click', function (e) {

    // targetting add textarea
    let addtxt = document.getElementById('AddText');
    let notes = localStorage.getItem("notes");
    // when no any note is stored in localstorage
    if (notes == null) {
        notesObj = [];
    }
    else {
        // when it is not empty parse the notes 
        notesObj = JSON.parse(notes);
    }
    // push the text written in textarea 
    notesObj.push(addtxt.value);

    // update the localstorage
    // stringify is essential because the localstorage need strings only
    localStorage.setItem('notes', JSON.stringify(notesObj));

    // after clicking add note our written text should vanish
    addtxt.value = "";
    
    // show all the notes
    showNotes();
})

// function to show the elements from local storage
function showNotes() {

    // same logic of parsing the notes present in localstorage as done above
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    // showing each and every note present in localstorage 
    let html = "";

    // use of forEach loop can be replaced by simple for loops
    // on every iteration we create innerHTML of a card and update it to the previous one.
    notesObj.forEach(function (element, index) {
        html += `
        <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">Note ${index + 1}</h5>
            <p class="card-text">${element}</p>
            <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
        </div>
        </div>
         `
    });

    // after the end of forEach loop we have a sequence of cards i.e. notes as we have done html+= .... means after all iterations we have all the cards including their HTML

    let notesElem = document.getElementById("notes");
    if (notesObj.length != 0) {
        // change the innerHTML of the notes Collection
        notesElem.innerHTML = html;
    }
    else {
        // if no cards present i.e. on opening page 
        notesElem.innerHTML = ` Nothing to show Use Add Note to add further node `;
    }
}

// function to delete node

function deleteNote(index) {

    // same logic as above
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    // specifically remove a particular note  
    notesObj.splice(index,1);

    // update the localstorage
    localStorage.setItem('notes', JSON.stringify(notesObj));

    // show the notes again
    showNotes();

}

// search event

// targetting the search box i.e. right top  
let search = document.getElementById("searchTxt");

// event listener , whenever we start giving input to the input box
search.addEventListener("input",function(){
    
    // convert it into lower if you want 
    let inputVal = search.value.toLowerCase();

    let noteCards = document.getElementsByClassName("noteCard");
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        

        // if it contains the given value show it 
        if(cardTxt.includes(inputVal))
        {
            element.style.display = "block";
        }
        // otherwise do not show it
        else
        {
            element.style.display = "none";
        }
    })
})
