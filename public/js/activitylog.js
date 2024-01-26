function updateCalendar(data) {
  // Select the calendar element
  const calendar = document.querySelector('#calendar');
  console.log("update", data)
  // Loop through the data
  data.forEach(activity => {
    // Create a new element for the activity
    const activityElement = document.createElement('div');
    activityElement.textContent = activity.description;

    // Add the activity element to the calendar
    calendar.appendChild(activityElement);
  });
}

document.getElementById('activity-log-form').addEventListener('submit', function(event) {
  event.preventDefault(); 

  const description = document.getElementById('activity-description').value;
  
  fetch('/api/activitylog', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      exercises: description,
      // Other data
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
    
    // updateCalendar([data]);

  } else {
    console.error('Error: no array');
  }  
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}
);

//

// Get the current date
// const currentDate = new Date();

// // Get the current month and year
// const currentMonth = currentDate.getMonth();
// const currentYear = currentDate.getFullYear();

// // // Get the calendar element
// const calendar = document.querySelector('.calendar')