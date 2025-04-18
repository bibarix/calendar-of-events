 // I'm wrapping the entire script in $(document).ready() to ensure the DOM is fully loaded before my jQuery code runs.
$(document).ready(function() {
  // declare an object Calendar
  function Calendar(elem) {
      // HTML element in which to display the calendar
      // I'm now storing the jQuery object of the element.
      this.elem = $(elem);

      // array containing list of names of the days of the week
      this.dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

      /** Returns the month name of the year for a given month index.
       * @param monthIndex {number} zero-based index of the month of the year (0 = January, 11 = December)
       * @returns {string} the name of the given month
       */
      this.getMonth = function(monthIndex) {
          // Check if monthIndex is a number and within the valid range (0-11)
          if (typeof monthIndex !== 'number' || monthIndex < 0 || monthIndex > 11) {
              return "Unknown"; // Return "Unknown" if the value is not a valid number between 0 and 11
          }

          // Using a switch statement to return the month name based on monthIndex
          switch (monthIndex) {
              case 0:
                  return "January"; // Return "January" for index 0
              case 1:
                  return "February"; // Return "February" for index 1
              case 2:
                  return "March"; // Return "March" for index 2
              case 3:
                  return "April"; // Return "April" for index 3
              case 4:
                  return "May"; // Return "May" for index 4
              case 5:
                  return "June"; // Return "June" for index 5
              case 6:
                  return "July"; // Return "July" for index 6
              case 7:
                  return "August"; // Return "August" for index 7
              case 8:
                  return "September"; // Return "September" for index 8
              case 9:
                  return "October"; // Return "October" for index 9
              case 10:
                  return "November"; // Return "November" for index 10
              case 11:
                  return "December"; // Return "December" for index 11
              default:
                  return "Unknown"; // Return "Unknown" for any invalid index or error
          }
      };

      /** Returns the number of days in the month for a given zero-based month index and year.
       * @param monthIndex {number} zero-based index of the month of the year (0 = January, 11 = December)
       * @param year {number} a 4-digit year
       * @returns {number} the number of days in the given month and year
       */
      this.getDaysInMonth = function(monthIndex, year) {
          // Ensure that monthIndex is a valid number between 0 and 11
          if (typeof monthIndex !== 'number' || monthIndex < 0 || monthIndex > 11 || typeof year !== 'number' || isNaN(year)) {
              return -1; // Invalid input
          }

          // Checking if the year is a leap year
          function isLeapYear(year) {
              if (year % 4 === 0) {
                  if (year % 100 === 0) {
                      if (year % 400 === 0) {
                          return true; // It's a leap year
                      } else {
                          return false; // It's not a leap year
                      }
                  } else {
                      return true; // It's a leap year
                  }
              } else {
                  return false; // It's not a leap year
              }
          }

          // Using a switch case to handle months
          switch (monthIndex) {
              case 0: // January
              case 2: // March
              case 4: // May
              case 6: // July
              case 7: // August
              case 9: // October
              case 11: // December
                  return 31;
              case 3: // April
              case 5: // June
              case 8: // September
              case 10: // November
                  return 30;
              case 1: // February
                  return isLeapYear(year) ? 29 : 28;
              default:
                  return -1; // Invalid month
          }
      };

      // method display generates calendar HTML
      // the displayDate parameter indicates the year and month to render (display)
      this.display = function(displayDate = new Date()) {
          // I'm using jQuery's empty() to clear the calendar container.
          this.elem.empty();

          let daysInMonth = this.getDaysInMonth(displayDate.getMonth(), displayDate.getFullYear());
          let days = [];
          for (let i = 1; i <= daysInMonth; i++) {
              days.push(new Date(displayDate.getFullYear(), displayDate.getMonth(), i));
          }

          // I'm creating table elements using jQuery.
          let table = $('<table></table>').addClass('table table-bordered');
          let thead = $('<thead></thead>').addClass('thead-dark');
          table.append(thead);

          let headerRow = $('<tr></tr>');
          let prevCell = $('<td></td>');
          // I'm creating the previous button using jQuery.
          let prevButton = $('<button class="btn btn-sm btn-success">&lt;&lt;</button>');
          prevCell.append(prevButton);
          headerRow.append(prevCell);

          let monthYearCell = $('<td colspan="5"></td>');
          // I'm creating the month and year header using jQuery and setting its text.
          let monthYearHeader = $('<h1></h1>').text(this.getMonth(displayDate.getMonth()) + " " + displayDate.getFullYear());
          monthYearCell.append(monthYearHeader);
          headerRow.append(monthYearCell);

          let nextCell = $('<td></td>');
          // I'm creating the next button using jQuery.
          let nextButton = $('<button class="btn btn-sm btn-success">&gt;&gt;</button>');
          nextCell.append(nextButton);
          headerRow.append(nextCell);

          thead.append(headerRow);

          let dayNamesRow = $('<tr></tr>');
          for (const dayName of this.dayNames) {
              // I'm creating day name headers using jQuery and setting their text.
              let dayNameHeader = $('<th></th>').text(dayName);
              dayNamesRow.append(dayNameHeader);
          }
          thead.append(dayNamesRow);

          let tbody = $('<tbody></tbody>');
          table.append(tbody);

          let weekRow = $('<tr></tr>');

          for (let i = 0; i < days[0].getDay(); i++) {
              // I'm creating empty cells using jQuery.
              let emptyCell = $('<td></td>');
              weekRow.append(emptyCell);
          }

          for (let i = 0; i < days.length; i++) {
              if (days[i].getDay() === 0) {
                  tbody.append(weekRow);
                  weekRow = $('<tr></tr>');
              }

              // I'm creating day cells using jQuery, adding the 'day' class and setting the text.
              let dayCell = $('<td></td>').addClass('day').text(days[i].getDate());
              
              // today class if it's today's date
              const today = new Date();
              if (today.getDate() === days[i].getDate() && 
                  today.getMonth() === days[i].getMonth() && 
                  today.getFullYear() === days[i].getFullYear()) {
                  dayCell.addClass('today');
              }
              
              // weekend class for Saturday and Sunday
              if (days[i].getDay() === 0 || days[i].getDay() === 6) {
                  dayCell.addClass('weekend');
              }
              
              weekRow.append(dayCell);
          }

          for (let i = days[days.length - 1].getDay() + 1; i < 7; i++) {
              // I'm creating empty cells for the end of the month using jQuery.
              let emptyCell = $('<td></td>');
              weekRow.append(emptyCell);
          }

          tbody.append(weekRow);

          // I'm appending the entire jQuery table to the calendar container.
          this.elem.append(table);

          // I'm using jQuery's on('click', ...) for event handling for the previous button.
          prevButton.on('click', () => {
              this.display(new Date(displayDate.getFullYear(), displayDate.getMonth() - 1));
          });
          // I'm using jQuery's on('click', ...) for event handling for the next button.
          nextButton.on('click', () => {
              this.display(new Date(displayDate.getFullYear(), displayDate.getMonth() + 1));
          });
      };
  }

  // I'm creating a new Calendar instance and passing the jQuery object of the calendar container.
  const cal = new Calendar($("#calendar"));
  cal.display();

  // I'm declaring a global array to store events.
  const events = [];

  // I'm selecting the form elements using jQuery.
  const eventForm = $("#event-form");
  const eventDateInput = $("#event-date");
  const eventTitleInput = $("#event-title");
  const eventDescriptionInput = $("#event-description");
  const clearButton = $("#clear-button");
  const submitButton = $("#submit-button");
  const formMessages = $("#form-messages");

  // Function to display messages to the user
  function displayMessage(message, type = 'success') {
      formMessages.removeClass('success error').addClass(type).text(message);
  }

  // Function to clear the form fields
  function clearForm() {
      // I'm using jQuery's val("") to clear the input fields.
      eventDateInput.val("");
      eventTitleInput.val("");
      eventDescriptionInput.val("");
      formMessages.text("");
  }

  // Function to validate the date (YYYY-MM-DD format and actual date)
  function isValidDate(dateString) {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
          return false;
      }
      const parts = dateString.split("-");
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10);
      const day = parseInt(parts[2], 10);

      if (month < 1 || month > 12 || day < 1 || day > new Date(year, month, 0).getDate()) {
          return false;
      }
      return true;
  }

  // Form validation on blur event (with a note about Chrome issues)
  // I'm using jQuery's on('blur', ...) for the blur event.
  eventDateInput.on('blur', function() {
      if (eventDateInput.val() && !isValidDate(eventDateInput.val())) {
          displayMessage("Please enter a valid date in YYYY-MM-DD format.", 'error');
      } else if (eventDateInput.val()) {
          displayMessage("", 'success'); // Clear any previous error if now valid
      }
  });

  // I'm using jQuery's on('blur', ...) for the blur event.
  eventTitleInput.on('blur', function() {
      if (eventTitleInput.val().length < 3) {
          displayMessage("Title must be at least 3 characters long.", 'error');
      } else if (eventTitleInput.val()) {
          displayMessage("", 'success'); // Clear any previous error if now valid
      }
  });

  // Handle form submission (updated to work with the modal)
  submitButton.on('click', function() {
      const eventDate = eventDateInput.val();
      const eventTitle = eventTitleInput.val();
      const eventDescription = eventDescriptionInput.val();

      let isValid = true;

      if (!eventDate || !isValidDate(eventDate)) {
          displayMessage("Please enter a valid date in YYYY-MM-DD format.", 'error');
          isValid = false;
      }

      if (!eventTitle || eventTitle.length < 3) {
          displayMessage("Title is required and must be at least 3 characters long.", 'error');
          isValid = false;
      }

      if (isValid) {
          const eventString = `Date: ${eventDate}, Title: ${eventTitle}, Description: ${eventDescription}`;
          events.push(eventString);
          // I'm using console.log() to output the events array to the console.
          console.log("Events:", events);
          displayMessage("Event added successfully!", 'success');
          
          // Close the modal after successful submission
          setTimeout(function() {
              $('#eventModal').modal('hide');
              clearForm();
          }, 1500);
      }
  });

  // Handle clear button click (inside modal)
  clearButton.on('click', clearForm);
  
  // I'm creating and initializing the analog clock
function initClock() {
  const clockContainer = document.getElementById('clock-container');
  
  // I create the clock markings
  for (let i = 0; i < 12; i++) {
      const marking = document.createElement('div');
      marking.className = 'clock-marking';
      marking.style.transform = `translateX(-50%) rotate(${i * 30}deg)`;
      clockContainer.appendChild(marking);
  }
  
  // I create the hour hand
  const hourHand = document.createElement('div');
  hourHand.className = 'clock-hand hour-hand';
  clockContainer.appendChild(hourHand);
  
  // I create the minute hand
  const minuteHand = document.createElement('div');
  minuteHand.className = 'clock-hand minute-hand';
  clockContainer.appendChild(minuteHand);
  
  // I create the second hand
  const secondHand = document.createElement('div');
  secondHand.className = 'clock-hand second-hand';
  clockContainer.appendChild(secondHand);
  
  // I add the center of the clock
  const clockCenter = document.createElement('div');
  clockCenter.className = 'clock-center';
  clockContainer.appendChild(clockCenter);
  
  // I update the clock hands according to the current time
function updateClock() {
  const now = new Date();
  const hours = now.getHours(); // I use the 24-hour format directly
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  
  // I calculate the rotation angles for each hand of the clock
  const hourRotation = ((hours % 12) * 30) + (minutes * 0.5); // 30 degrees per hour, plus a bit for minutes
  const minuteRotation = minutes * 6; // 6 degrees per minute
  const secondRotation = seconds * 6; // 6 degrees per second
  
  // I apply the calculated rotations to the clock hands
  hourHand.style.transform = `translateX(-50%) rotate(${hourRotation}deg)`;
  minuteHand.style.transform = `translateX(-50%) rotate(${minuteRotation}deg)`;
  secondHand.style.transform = `translateX(-50%) rotate(${secondRotation}deg)`;
  
  // I update the day progress bar using the current 24-hour time
  updateDayProgress(hours, minutes, seconds);
}
  
  // I do the initial clock update
  updateClock();
  
  // I set the clock to update every second
  setInterval(updateClock, 1000);
}

// I update the day progress bar based on the time
function updateDayProgress(hours, minutes, seconds) {
  const totalSecondsInDay = 24 * 60 * 60;
  const currentSeconds = (hours * 3600) + (minutes * 60) + seconds;
  const progressPercentage = (currentSeconds / totalSecondsInDay) * 100;
  
  $('#day-progress').css('width', progressPercentage + '%');
  $('#day-progress').attr('aria-valuenow', progressPercentage);
  $('#day-progress').text(Math.round(progressPercentage) + '% of day complete');
}

// I call the function to start the clock
initClock();
});
