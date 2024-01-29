function updateCalendar(data) {
  // Select the calendar element
  const calendar = document.querySelector('#calendar');
  console.log("update", data)
  // Loop through the data
  data.forEach(activity => {
    // Create a new element for the activity
    const activityElement = document.createElement('div');
    activityElement.textContent = activity.description;

    const lengthElement = document.createElement('div');  
    lengthElement.textContent = activity.length;

    // // Add the activity element to the calendar
    // calendar.appendChild(activityElement);
    // calendar.appendChild(lengthElement);
  });
}

document.getElementById('activity-log-form').addEventListener('submit', function(event) {
  event.preventDefault(); 

  const description = document.getElementById('activity-description').value;
  const length = document.getElementById('length').value;  
  
  fetch('/api/activitylog', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      exercises: description,
      length: length,
    }),
  })
  
  .then(response => { 
    console.log('Response', response); 
    return response.json(); }
  )
  .then(data => {
    console.log('Data:', data);
        if (Array.isArray(data.exercises)) {
    console.log(data)
    window.location.reload();
    updateCalendar(data.exercises);
        }
        else {
          console.error('Error: no array');
        }
  })
  .catch((error) => {
    console.error('Error:', error);
  }
  );
    
});
// Get the current date
// const currentDate = new Date();

// // Get the current month and year
// const currentMonth = currentDate.getMonth();
// const currentYear = currentDate.getFullYear();

// // // Get the calendar element
// const calendar = document.querySelector('.calendar')
