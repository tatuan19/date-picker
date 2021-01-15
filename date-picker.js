// Set content to new HTML tag
const div = document.createElement('div');

div.className = 'date-picker';

div.innerHTML = `
  <div class="selected-date"></div>
  <div class="dates">
      <div class="month">
          <div class="arrows prev-mth">&lt;</div>
          <div class="mth"></div>
          <div class="arrows next-mth">&gt;</div>
      </div>
      <div class="days"></div>
  </div>
  `;

document.getElementsByTagName("date-picker")[0].appendChild(div);

// Get element
const datePickerElement = document.querySelector('.date-picker');
const selectedDateElement = document.querySelector('.date-picker .selected-date');
const datesElement = document.querySelector('.date-picker .dates');
const monthElement = document.querySelector('.date-picker .dates .month .mth');
const nextElement = document.querySelector('.date-picker .dates .month .next-mth');
const prevElement = document.querySelector('.date-picker .dates .month .prev-mth');
const daysElement = document.querySelector('.date-picker .dates .days');


// Initial
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

let date = new Date();
let day = date.getDate();
let month = date.getMonth();
let year = date.getFullYear();

let selectedDate = date;
let selectedDay = day;
let selectedMonth = month;
let selectedYear = year;

monthElement.textContent = months[month] + ' ' + year;

selectedDateElement.textContent = formatDate(date);
selectedDateElement.dataset.value = selectedDate;

generateCalenderDate();

// Add event listener
datePickerElement.addEventListener('click', toggleDatePicker);
nextElement.addEventListener('click', goToNextMonth);
prevElement.addEventListener('click', goToPrevMonth);

// Function
function toggleDatePicker(e) {
    if (!checkEventPathForClass(e.path, 'dates')) {
        datesElement.classList.toggle('active');
    }
}

function goToNextMonth(e) {
    month++;
    if (month > 11) {
        month = 0;
        year++;
    }
    monthElement.textContent = months[month] + ' ' + year;
    generateCalenderDate();
}

function goToPrevMonth(e) {
    month--;
    if (month < 0) {
        month = 11;
        year--;
    }
    monthElement.textContent = months[month] + ' ' + year;
    generateCalenderDate();
}

function generateCalenderDate(e) {
    daysElement.innerHTML = '';
    let amount_days = 31;

    if (month == 1) {
        amount_days = 28;
    }

    for (let i = 0; i < amount_days; i++) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('day');
        dayElement.textContent = i + 1;

        if (selectedDay == (i + 1) && selectedYear == year && selectedMonth == month) {
            dayElement.classList.add('selected');
        }

        dayElement.addEventListener('click', function () {
            selectedDate = new Date(year + '-' + (month + 1) + '-' + (i + 1));
            selectedDay = (i + 1);
            selectedMonth = month;
            selectedYear = year;

            selectedDateElement.textContent = formatDate(selectedDate);
            selectedDateElement.dataset.value = selectedDate;

            generateCalenderDate();
            
            datesElement.classList.toggle('active');
        });

        daysElement.appendChild(dayElement);
    }
}

// HELPER FUNCTIONS
function checkEventPathForClass(path, selector) {
    for (let i = 0; i < path.length; i++) {
        if (path[i].classList && path[i].classList.contains(selector)) {
            return true;
        }
    }

    return false;
}
function formatDate(d) {
    let day = d.getDate();
    if (day < 10) {
        day = '0' + day;
    }

    let month = d.getMonth() + 1;
    if (month < 10) {
        month = '0' + month;
    }

    let year = d.getFullYear();

    return day + ' / ' + month + ' / ' + year;
}