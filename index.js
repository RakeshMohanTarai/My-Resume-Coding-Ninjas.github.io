//AUTOMATIC SCROLLING BAR
var navMenuAnchorTags = document.querySelectorAll(".nav-menu a");
for(var i = 0; i < navMenuAnchorTags.length; i++){
    navMenuAnchorTags[i].addEventListener('click', function(event) {
        event.preventDefault(); //use to stop the anchor tag functionality
        var targetSelectionId = this.textContent.trim().toLowerCase(); /*here we get the element by it's ID name and 
        we can also get this ID using href link, here we fetch with textContent */
        var targetSelection = document.getElementById(targetSelectionId);//here we get the section using it's ID 
        
        var interval =  setInterval(function() {
        var targetSelectionCoordinates = targetSelection.getBoundingClientRect(); /*getBoundingClientRect will give you the co-ordinates 
        which have top and Y-axis*/
        
        if(targetSelectionCoordinates.top <= 0) //if it's top reach to zero than it will stop 
        {
            clearInterval(interval); //use to stop the scrolling bar
            //console.log('visible');
            return;
        }
        window.scrollBy(0,50); //use to scroll the bar
    },20);
    });
}

//AUTOMATIC FILLING BAR
//STEPS:-
//Check that skills sections container is visible or not 
// ensure that initial width of colored skill divs is Zero ->initialise
// Start animation on every skill increase skill width from 0 to skil 
// Store skill level-> HTML with the help data attribute

var progressBars = document.querySelectorAll('.skill-progress > div'); //using '>' this we can select only the the first child of the div
var skillsContainer = document.getElementById('skills-container');
window.addEventListener('scroll',checkScroll); //we use scroll instead of click to get the scroll effect
var animationDone = false; //we will use animationDone boolean attribute to stop the repeating of the skills section visible

initialiseBars();// it will set the the width of the bars to Zero percent initially

function initialiseBars(){
for(let bar of progressBars){
    bar.style.width = 0 + "%";   /*here we set the the bar width to Zero percent,
    so the can animation is move on Zero to required percent which is fillsbars() */
 } 
}

function fillBars(){
  for(let bar of progressBars){
      let targetWidth = bar.getAttribute("data-bar-width"); //data-bar-width is set on HTML which is our target value
      let currentWidth = 0;

      let interval = setInterval(function(){
      if(targetWidth <= currentWidth){
        clearInterval(interval);
        return;
      }
      currentWidth++; 
      bar.style.width = currentWidth + "%"; //Here we rapidly increase the width of the currentWidth to get the incresing effect
      },10); // the higher the number is it will take that much time to fill it
  }
}


function checkScroll() {
//we have to check whether skill container is visible
var coordinates = skillsContainer.getBoundingClientRect();
if(!animationDone && coordinates.top <= window.innerHeight){  //window.innerHeight will give us the view port height 
    animationDone = true;//!animationDone make sure that this code work only once 
    console.log('visible');   
    fillBars(); // Now we fill the bars form Zero percentage to targetWidth
}
else if(coordinates.top > window.innerHeight){  /*Now when ever we drag the scrollbar function from top to botton it will call
    here (>) means if the coordinates are greater than the view port or innerHeight */
    animationDone = false;
    initialiseBars();
}
}

window.addEventListener("scroll", function() {
// calculate the scroll process
const scrollTop = document.documentElement.scrollTop || document.body.scrollTop; // find the top position of the scroll bar
const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight; // find where user scroll bar postion
const scrollPercent = (scrollTop / scrollHeight) * 100; // calculate the percent where the sctoll bar is right now

// Update the progress indicator
const progressBar = document.querySelector('#progress-bar span');
progressBar.style.width = scrollPercent + '%'; // here it changes it's width according to the scroll percentage
});



