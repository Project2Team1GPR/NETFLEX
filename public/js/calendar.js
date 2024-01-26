

// currentDate = new Date();

// // Get the current month and year
// const currentMonth = currentDate.getMonth();
// const currentYear = currentDate.getFullYear();

// // Get the calendar element
// const calendar = document.querySelector('.calendar');

// // Generate the calendar
// generateCalendar(currentMonth, currentYear);

// function generateCalendar(month, year) {
//   // Get the first day of the month
//   const firstDay = new Date(year, month).getDay();

//   // Get the number of days in the month
//   const daysInMonth = 32 - new Date(year, month, 32).getDate();

//   // Clear the calendar
//   calendar.innerHTML = '';

//   // Add the month to the calendar
//   const monthElement = document.createElement('div');
//   monthElement.classList.add('month');
//   monthElement.textContent = new Date(year, month).toLocaleString('default', { month: 'long' });
//   calendar.appendChild(monthElement);

//   // Add the days of the week to the calendar
//   const daysOfWeek = [  'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
//   const weekElement = document.createElement('div');
//   weekElement.classList.add('week');
//   daysOfWeek.forEach(day => {
//     const dayElement = document.createElement('div');
//     dayElement.classList.add('day');
//     dayElement.textContent = day;
//     weekElement.appendChild(dayElement);
//   });
//   calendar.appendChild(weekElement);

//   // Add the dates to the calendar
//   const datesElement = document.createElement('div');
//   datesElement.classList.add('dates');
//   for (let i = 1; i <= daysInMonth; i++) {
//     const dateElement = document.createElement('div');
//     dateElement.classList.add('date');
//     if (i === currentDate.getDate() && month === currentDate.getMonth() && year === currentDate.getFullYear()) {
//       dateElement.classList.add('today');
//     }
//     dateElement.textContent = i;
//     datesElement.appendChild(dateElement);
//   }
//   calendar.appendChild(datesElement);
// }