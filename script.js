// Data
let date = new Date();
let today = new Date().toLocaleDateString('en-CA')
let weekAgo = new Date(date.getFullYear(), date.getMonth(), date.getDate()-7).toLocaleDateString('en-CA');

// Dynamic Date Input Implementation
document.getElementById('date-picker').innerHTML = ('<div class="date-input"><label for="datemin">Start Date:</label> <input type="date" id="datemin" name="dateselect" min="2020-01-01" max="' + today + '" required></div> <div class="date-input"> <label for="datemax">End Date:</label><input type="date" id="datemax" name="dateselect" max="' + today + '" required></div>')

// ======== Load Past Week of API Data ===========

// Fetch API between provided dates
fetch('https://api.nasa.gov/planetary/apod?api_key=sdcCicWmBL9lc51EcwZNp64dDHpMJpnhb5WO5Xgz&start_date=' + weekAgo + '&end_date=' + today + '&thumbs=True')
  
.then(function (response){
  return response.json(); 
})

.then(function (imageData){   //JSON data captured in this parameter

  // trigger for days between dates including current day
  for (i = 0; i < 8; i++){

    // If APOD is a video, use the provided thumbnail
    if (imageData[i].media_type == 'video') { 
      document.getElementById('row').innerHTML += ('<div class="card-container"><div id="card-content" class="col"><img src=' + imageData[i].thumbnail_url + ' class="card-img-top" alt="nasa APOD"> <div class="card-body"> <h5 class="card-title"> ' + imageData[i].title + ' (' + imageData[i].date + ')' + '</h5> <p class="card-text">' + imageData[i].explanation + ' </p>     <input type="checkbox" class="btn-check" id="btn-check-outlined" autocomplete="off"> <label class="btn btn-outline-primary" for="btn-check-outlined">Like</label> </div></div></div>')
    
      // otherwise function as expected
    } else { 
      document.getElementById('row').innerHTML += ('<div class="card-container"><div id="card-content" class="col"><img src=' + imageData[i].hdurl + ' class="card-img-top" alt="nasa APOD"> <div class="card-body"> <h5 class="card-title"> ' + imageData[i].title + ' (' + imageData[i].date + ')' +'</h5> <p class="card-text">' + imageData[i].explanation + ' </p>     <input type="checkbox" class="btn-check" id="btn-check-outlined" autocomplete="off"> <label class="btn btn-outline-primary" for="btn-check-outlined">Like</label> </div></div></div>')
    }
  } 
}) 



// ======== User Input | Event Listeners ===========

// Min Date Declaration
let minDate;
let $minInput = document.getElementById('datemin');


// When date inputs detect change
$minInput.addEventListener('change', function () {
    
    minDate = $minInput.value;
    console.log('Minimum date is', minDate)

    // Set minimum date for second input to selected minimum
    document.getElementById("datemax").min = minDate;
});


// Max Date Declaration
let maxDate;
let $maxInput = document.getElementById('datemax');

// When date inputs detect change
$maxInput.addEventListener('change', function () {
    
    maxDate = $maxInput.value;
    console.log('Maximum date is', maxDate)

    // Set maximum date for first input to selected maximum
    document.getElementById("datemin").max = maxDate;

});




// ======== Calculate Difference Between Dates | Function ===========
let dayDiff;

function countDays(start, end) {
  const dateMin = new Date(start);
  const dateMax = new Date(end);
  const oneDay = 1000 * 60 * 60 * 24;

  // Calculating ms between dates
  const timeDiff = dateMax.getTime() - dateMin.getTime();

  // Calculating # of days between provided dates
  dayDiff = Math.round(timeDiff / oneDay);
}



// ======== Form Submission | Event Listener ===========
const $form = document.getElementById('form');

$form.addEventListener('submit', function (e) {

    // Prevent Refresh
    e.preventDefault();

    // Calculate day difference
    countDays(minDate, maxDate);

    // Clear Current APOD
    document.getElementById('grid-container').innerHTML = ('<div class="container-fluid"><div class="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-xl-3" id="row"></div></div>');

    // Re-fetch API between provided dates
    fetch('https://api.nasa.gov/planetary/apod?api_key=sdcCicWmBL9lc51EcwZNp64dDHpMJpnhb5WO5Xgz&start_date=' + minDate + '&end_date=' + maxDate + '&thumbs=True')
  
    .then(function (response){  //JS promise structure and response
      return response.json();    //Return data
    })

    .then(function (imageData){   //JSON data captured in this parameter

    // trigger for days between dates including dates
    for (i = 0; i < (dayDiff + 1); i++){

      // If APOD is a video, use the provided thumbnail
      if (imageData[i].media_type == 'video') { 
        document.getElementById('row').innerHTML += ('<div class="card-container"><div id="card-content" class="col"><img src=' + imageData[i].thumbnail_url + ' class="card-img-top" alt="nasa APOD"> <div class="card-body"> <h5 class="card-title"> ' + imageData[i].title + ' (' + imageData[i].date + ')' + '</h5> <p class="card-text">' + imageData[i].explanation + ' </p>     <input type="checkbox" class="btn-check" id="btn-check-outlined" autocomplete="off"> <label class="btn btn-outline-primary" for="btn-check-outlined">Like</label> </div></div></div>')
      
        // otherwise function as expected
      } else { 
        document.getElementById('row').innerHTML += ('<div class="card-container"><div id="card-content" class="col"><img src=' + imageData[i].hdurl + ' class="card-img-top" alt="nasa APOD"> <div class="card-body"> <h5 class="card-title"> ' + imageData[i].title + ' (' + imageData[i].date + ')' +'</h5> <p class="card-text">' + imageData[i].explanation + ' </p>     <input type="checkbox" class="btn-check" id="btn-check-outlined" autocomplete="off"> <label class="btn btn-outline-primary" for="btn-check-outlined">Like</label> </div></div></div>')
      }
    } 


    });
});


// To do:
// Implement Like button
// More keyboard navigation needed


