// Date Data
let date = new Date();
let today = new Date().toLocaleDateString('en-CA');
let weekAgo = new Date(date.getFullYear(), date.getMonth(), date.getDate()-7).toLocaleDateString('en-CA');

// Dynamic Date Input Implementation
document.getElementById('date-picker').innerHTML = ('<div class="date-input"><label for="datemin">Start Date:</label> <input type="date" id="datemin" name="dateselect" min="1995-07-16" max="' + today + '" required></div> <div class="date-input"> <label for="datemax">End Date:</label><input type="date" id="datemax" name="dateselect" max="' + today + '" required></div>');

// ======== Load Past Week of API Data ===========

// Fetch APOD api for past week
fetch('https://api.nasa.gov/planetary/apod?api_key=sdcCicWmBL9lc51EcwZNp64dDHpMJpnhb5WO5Xgz&start_date=' + weekAgo + '&end_date=' + today + '&thumbs=True')
  
.then(function (response){
  return response.json(); 
})

.then(function (imageData){

  // trigger for days between dates including current day
  for (i = 0; i < 8; i++){

    // Fill grid with APOD content from past week --- If APOD is a video, use the provided thumbnail --- otherwise perform as usual
    if (imageData[i].media_type == 'video') { 
      document.getElementById('row').innerHTML += ('<div class="card-container unliked"><div id="card-content" class="col"><button type="button" class="like-btn unliked"><i class="bi bi-star"></i></button><img src=' + imageData[i].thumbnail_url + ' class="card-img-top" alt="' + imageData[i].title + '"> <div class="card-body"> <h5 class="card-title"> ' + imageData[i].title + ' (' + imageData[i].date + ')' + '</h5> <p class="card-text">' + imageData[i].explanation + ' </p>  </div></div></div>');

    } else { 
      document.getElementById('row').innerHTML += ('<div class="card-container unliked"><div id="card-content" class="col"><button type="button" class="like-btn unliked"><i class="bi bi-star"></i></button><img src=' + imageData[i].hdurl + ' class="card-img-top" alt="' + imageData[i].title + '"> <div class="card-body"> <h5 class="card-title"> ' + imageData[i].title + ' (' + imageData[i].date + ')' +'</h5> <p class="card-text">' + imageData[i].explanation + ' </p>  </div></div></div>');
    }
  } 
});


// ======== Event Listener | Like Button ===========

// On Click
document.addEventListener('click', function (e) {

  // Closest Like Button Selected
  let likeButton = e.target.closest('.like-btn');

  // Closest Like Button Selected
  let likedPost = e.target.closest('.card-container');

  // If Like Button Clicked
  if (likeButton){

    // Change Icon When Liked or Unliked
    if (likeButton.innerHTML == ('<i class="bi bi-star-fill"></i>')){
      likeButton.innerHTML = ('<i class="bi bi-star"></i>');

    } else {
    likeButton.innerHTML = ('<i class="bi bi-star-fill"></i>');
    }

    // Toggle Class Accordingly on Post
    likedPost.classList.toggle("unliked");
    likedPost.classList.toggle("liked");

    // Toggle Class Accordingly on Button for styling
    likeButton.classList.toggle("unliked");
    likeButton.classList.toggle("liked");

  }
});


// ======== User Input Limits | Event Listeners ===========
//     NOTE: Prevents user from breaking search feature

let minDate;
let $minInput = document.getElementById('datemin');

// When Start date input detects change
$minInput.addEventListener('change', function () {
    
  // Set Minimum Date
  minDate = $minInput.value;
  console.log('Minimum date is', minDate);

  // Set minimum date for second input to selected minimum
  document.getElementById("datemax").min = minDate;

});

let maxDate;
let $maxInput = document.getElementById('datemax');

// When date inputs detect change
$maxInput.addEventListener('change', function () {
    
  // Set Maximum Date
  maxDate = $maxInput.value;
  console.log('Maximum date is', maxDate);

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

// When user input submitted
$form.addEventListener('submit', function (e) {

  // Prevent Page Refresh
  e.preventDefault();

  // Calculate day difference using function
  countDays(minDate, maxDate);

  // Clear Current APOD
  document.getElementById('grid-container').innerHTML = ('<div class="container-fluid"><div class="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-xl-3" id="row"></div></div>');

  // Fetch API between provided dates
  fetch('https://api.nasa.gov/planetary/apod?api_key=sdcCicWmBL9lc51EcwZNp64dDHpMJpnhb5WO5Xgz&start_date=' + minDate + '&end_date=' + maxDate + '&thumbs=True')
  
  .then(function (response){
    return response.json();
  })

  .then(function (imageData){

    // trigger for days between user input dates
    for (i = 0; i < (dayDiff + 1); i++){

      // Fill grid with APOD content from past week --- If APOD is a video, use the provided thumbnail --- otherwise perform as usual
      if (imageData[i].media_type == 'video') { 
        document.getElementById('row').innerHTML += ('<div class="card-container unliked"><div id="card-content" class="col"><button type="button" class="like-btn unliked"><i class="bi bi-star"></i></button><img src=' + imageData[i].thumbnail_url + ' class="card-img-top" alt="' + imageData[i].title + '"> <div class="card-body"> <h5 class="card-title"> ' + imageData[i].title + ' (' + imageData[i].date + ')' + '</h5> <p class="card-text">' + imageData[i].explanation + ' </p>  </div></div></div>');
        
      } else { 
        document.getElementById('row').innerHTML += ('<div class="card-container unliked"><div id="card-content" class="col"><button type="button" class="like-btn unliked"><i class="bi bi-star"></i></button><img src=' + imageData[i].hdurl + ' class="card-img-top" alt="' + imageData[i].title + '"> <div class="card-body"> <h5 class="card-title"> ' + imageData[i].title + ' (' + imageData[i].date + ')' +'</h5> <p class="card-text">' + imageData[i].explanation + ' </p>  </div></div></div>');
      }
    } 
  });
});

// Add Fav Filter
// Add Favicon