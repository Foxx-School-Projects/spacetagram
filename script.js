
// On Load
let today = new Date().toLocaleDateString('en-CA')

// Log Current Date
console.log("Today's Date:", today);

// Date Picker Input Added
document.getElementById('date-picker').innerHTML = ('<div class="date-min"><label for="datemin">Start Date</label> <input type="date" id="datemin" name="dateselect" min="2020-01-01" max="' + today + '" required></div> <div class="date-max"> <label for="datemax">End Date</label><input type="date" id="datemax" name="dateselect" max="' + today + '" required></div>')


// ==== NASA APOD | API KEY: sdcCicWmBL9lc51EcwZNp64dDHpMJpnhb5WO5Xgz

// Fetch API
fetch('https://api.nasa.gov/planetary/apod?api_key=sdcCicWmBL9lc51EcwZNp64dDHpMJpnhb5WO5Xgz&date=' + today + '&thumbs=True')
  .then(function (response){  //JS promise structure and response
    return response.json();    //Return data
})
.then(function (imageData){   //JSON data captured in this parameter
  
    // Set Div Background Image
    document.getElementById('cards').innerHTML += ('<div id="nasa-card" class="card"><img src=' + imageData.hdurl + ' class="card-img-top" alt="nasa APOD"> <div class="card-body"> <h5 class="card-title"> ' + imageData.title + '</h5> <h6 class="card-subtitle mb-2 text-muted"> ' + imageData.date + '</h6><p class="card-text">' + imageData.explanation + ' </p> </div></div>')
});





// ======= EVENT LISTENERS FOR MIN MAX INPUT CHANGES =============

let minDate;
let $minInput = document.getElementById('datemin');

// When date inputs detect change
$minInput.addEventListener('change', function () {
    
    minDate = $minInput.value;
    console.log('Minimum date is', minDate)

});



let maxDate;
let $maxInput = document.getElementById('datemax');

// When date inputs detect change
$maxInput.addEventListener('change', function () {
    
    maxDate = $maxInput.value;
    console.log('Maximum date is', maxDate)

});


// Fuction to calculate days between two provided dates
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



// ======== Form Submission ===========
const $form = document.getElementById('form');

$form.addEventListener('submit', function (e) {

    // Prevent Refresh
    e.preventDefault();

    countDays(minDate, maxDate);
    console.log('Day Difference', dayDiff)

    // Trigger x Days between dates + 1

    console.log("iterations")
    document.getElementById('cards').innerHTML = ('');
    // Fetch API
    fetch('https://api.nasa.gov/planetary/apod?api_key=sdcCicWmBL9lc51EcwZNp64dDHpMJpnhb5WO5Xgz&start_date=' + minDate + '&end_date=' + maxDate + '&thumbs=True')
  
    .then(function (response){  //JS promise structure and response
      return response.json();    //Return data
    })
    .then(function (imageData){   //JSON data captured in this parameter

    for (i = 0; i < (dayDiff + 1); i++){
      console.log(imageData[i]);
      document.getElementById('cards').innerHTML += ('<div id="nasa-card" class="card"><img src=' + imageData[i].hdurl + ' class="card-img-top" alt="nasa APOD"> <div class="card-body"> <h5 class="card-title"> ' + imageData[i].title + '</h5> <h6 class="card-subtitle mb-2 text-muted"> ' + imageData[i].date + '</h6><p class="card-text">' + imageData[i].explanation + ' </p> </div></div>')
    }


    });

  });







