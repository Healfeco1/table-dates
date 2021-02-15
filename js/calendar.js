let fechaInicio = document.getElementById('startDate');
let fechaFin = document.getElementById('endDate');
let butonSend = document.getElementById('send');
let selectDate = document.getElementById('selectDate');
let options = document.createElement("option");
let startYear, endYear, startmonth, endmonth, daysWeek, firstDay, weeks,
    dStart, dEnd, dates = [], rows;
var cal = [];
var indexTable = [];
let lang = 'default';

// Populate column select element
for (let i = 1; i <= 10; i++) {
    let options = document.createElement("option");
    options.text = i
    selectDate.add(options)
}
selectDate.selectedIndex = 0

function validateForm(Form,elementName){

    var z = document.forms[Form][elementName].value;
    
    if (elementName == 'startDate') {
        elementName = 'Fecha Inicio';
    }
    if (elementName == 'endDate') {
        elementName = 'Fecha Fin';
    }
    if(!/^[0-9-]+$/.test(z)){
      alert(`El campo ${elementName} solo acepta números: 0-9)`)
    }
  
  }

  function validateNumber(e) {
    var ele = document.querySelectorAll(`#${e.path[0].id}`)[0];
    ele.onkeypress = function(e) {
       if(isNaN(this.value+""+String.fromCharCode(e.charCode)))
          return false;
    }
}

fechaInicio.addEventListener("keypress", validateNumber);
fechaFin.addEventListener("keypress", validateNumber);
fechaFin.maxLength = 6;
fechaInicio.maxLength = 6;


// onchange select
selectDate.addEventListener("change", e => {
    if (cal.length > 0) {
        showCalendar();
    }
});

function formtDate(e){
    // alert(e.target.value);
    let val = e.target.value;
    let add = '-'
    // let result = [val.slice(0, 4), add, val.slice(2)].join('');
    return [val.slice(0, 2), add, val.slice(2)].join('')
    // fechaInicio.value = [val.slice(0, 2), add, val.slice(2)].join('')
}

// fechaInicio.addEventListener("keypress", e => {
//     let val = e.target.value;
//     // let val = '-';
//     if (e.target.value.length==2) {
//         fechaInicio.value += [val.slice(0, 2), '-', val.slice(2)].join('')
//     }
//     console.log(e.target.value.length);
// })

fechaInicio.addEventListener("change", e => {
    let val;
    if (validateNumber) {
        val = formtDate(e)
        fechaInicio.value = val;
        [startmonth,startYear] = e.target.value.split('-');
        // Changed
        // dStart = new Date(startYear, parseInt(startmonth));
        dStart = new Date(startmonth,startYear);
        // dStart = createDate(startmonth,startYear);
    }
});
fechaFin.addEventListener("change", e => {
    let val;
    if (validateNumber) {
        val = formtDate(e)
        fechaFin.value = val;
        [endmonth,endYear] = e.target.value.split('-');
        // Changed
        dEnd = new Date(endmonth,endYear);
        // dEnd = createDate(parseInt(endmonth),endYear);
    }
});

// Form operations
butonSend.addEventListener("click", e => {
    e.preventDefault();
    // while(validateNumber){
        if ((new Date (endmonth, endYear)) >= (new Date(startmonth, startYear))) {
        // if (fechaFin.value >= fechaInicio.value) {
            let n = 0
            let dif = endmonth - startmonth;
            let month = startmonth;
            n = 0;
            while (n <= dif) {
                n++;
                month = parseInt(month)
                month += 1
            }
            rang()
        // } else if (endYear == startYear) {
        }else {
            alert(`Fecha de incio: ${getMonthName(startmonth)} ${startYear} debe ser menor a fecha final: ${getMonthName(endmonth)} ${endYear}`)
        }
    // }
    
})

function rang() {
    dates = [];
    cal = [];
    [startYear, startmonth] = fechaInicio.value.split('-');
    // dStart = new Date(startYear, parseInt(startmonth));
    dStart = new Date(startmonth,startYear);
    [endYear, endmonth] = fechaFin.value.split('-');
    // Changed
    // dEnd = new Date(endYear, parseInt(endmonth));
    dEnd = new Date(endmonth,endYear);
    let calendars = diffDates(dStart, dEnd);
    console.log(calendars);
    for (dStart; dStart <= dEnd; dStart.setMonth(dStart.getMonth() + 1)) {
        if (dStart.getMonth() == 0) {
            // When month = 0 (December) show a year more on date
            dates.push(dStart.getMonth() + '-' + (dStart.getFullYear() - 1));
        } else {
            dates.push(dStart.getMonth() + '-' + dStart.getFullYear());
        }
    }
    // Save the HTML calendar table exa: (Julio 2021) 
    for (date in dates) {
        var month = dates[date].split('-')[0];
        var year = dates[date].split('-')[1]
        cal.push(createMonth(month, year));
    }

    // Calculate the rows to print the table-calendar where the all calendars will be shown
    showCalendar();
}

// Create table month exa: (Julio 2021) and return the HTML table code
function createMonth(month, year) {

    var totalDays, monthName, date;

    // get int data, total days of months eje.(Feb 28 days (return:28))
    totalDays = getDays(month, year);

    // get the name of month, return string name: send 1 -> return Enero
    monthName = getMonthName(month);

    // create date whith month and year gotten in this function
    date = new Date(year, month);
    date = new Date(date.setMonth(date.getMonth() - 1))

    console.log('fecha: ' + date);
    console.log('Mes: ' + monthName);
    console.log('TotalDias: ' + totalDays);
    console.log(date.getDate());
    let divTable = "";

    // Get first day of month
    let d = new Date(year, month)
    console.log(new Date(d.setMonth(d.getMonth() - 1)));
    // let x = new Date(d.setMonth(d.getMonth()))
    // let fsday = x.getDay();
    // console.log(fsday);
    // firstDay = "";
    firstDay = date.getDay();
    // let date = createDate(month,year);
    // firstDay = date.getDay();

    console.log('TotalDias: ' + firstDay);

    // creating all cells
    var day = 1;

    // get week of month
    // changed
    let dias = new Date(year, month, 0).getDate() - 7 + firstDay;
    // let dias = date.getDate() - 7 + firstDay;
    weeks = Math.ceil(dias / 7) + 1

    divTable += `<table class="table-calendar">
                    <caption>${monthName + "-" + year}</caption>
                    <thead id="thead-month">
                    <tr>`;

    // Print days of week
    daysWeek = (getNamesWeek(2, 2021));
    days = daysWeek;
    for (dhead in days) {
        divTable += `<th data-days=${days[dhead]}>${days[dhead]}</th>`
    }
    divTable += `</tr></thead>`;
    divTable += `<tbody id="calendar-body">`;

    // Create the weeks(rows) of months
    for (var i = 0; i < weeks; i++) {
        divTable += `<tr>`;
        for (var j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                divTable += `<td>`;
            } else if (day > totalDays) {
                break;
            } else {
                divTable += `<td class=date-picker data-date=${day} data-month_name=${monthName} data-year=${year}>`;
                divTable += `<span>${day}</span>`;
                day++;
            }
            divTable += `</td>`;
        }
        divTable += `</tr>`;
    }
    divTable += `</tbody>`;

    return divTable
}

// Return the diff numbers months between two dates 
function diffDates(d1, d2) {
    var d1Y = d1.getFullYear();
    var d2Y = d2.getFullYear();
    var d1M = d1.getMonth() - 1;
    var d2M = d2.getMonth() - 1;
    return (d2M + 12 * d2Y) - (d1M + 12 * d1Y);
}

function createDate(month, year) {
    let date = new Date(parseInt(year), parseInt(month), 0);
    // return (date.toLocaleString('default', { month: 'long' }));
    // console.log(date.getFullYear());
    // console.log(date.getMonth());
    return date
}

// Get the name of the month
function getMonthName(month) {
    let date = createDate(month, 00);
    // return (date.toLocaleString('default', { month: 'long' }));
    return (date.toLocaleString(lang, { month: 'long' }));
}

// Get days of month
function getDays(month, year) {
    let date = createDate(month, year)
    return date.getDate();
}

// Get the names of the week
function getNamesWeek(month, year) {
    let daysWeek = []
    for (let i = 0; i <= 6; i++) {
        daysWeek.push((new Date(year, month, i).toLocaleString(lang, {
            weekday: "long",
        })).substr(0, 1));
    }
    return (daysWeek);
}

// Calculate the rows, where will be printed all calendars 
function generateRow(columns, calendars) {
    console.log("calendars: " + calendars);
    let res = 0
    if (columns == 1) {
        return calendars
    } else {
        for (let i = 0; i < calendars; i++) {
            res = columns * i;
            if (res >= calendars) {
                let restCell = res - calendars;
                return i
            }
        }
    }
}

// Create the table-calendar where the all calendars will be shown
function showCalendar() {
    rows = generateRow(selectDate.value, cal.length);
    var a = 0;
    let output = `<table cellspacing="7" cellpadding="5" class="table all-dates">`
    for (var i = 0; i < rows; i++) {
        output += `<tr>`
        for (var j = 1; j <= selectDate.value; j++) {
            // for (let calendar = 0; calendar < cal.length; calendar++) {
            // if (a==i && a==calendar) {
            // output += `<td>${cal[calendar]}</td>`
            // a++;
            // }
            // }
            // output += `<td>${i}-${j}</td>`
            output += `<td></td>`
        }
        output += `</tr>`
    }
    output += `</table>`
    document.getElementById('container').innerHTML = output;
    printTable('all-dates');
}

// Populate the table with all calendars
function printTable(tableName) {
    var a = 0;
    var table = document.getElementsByClassName(`${tableName}`)[0];
    indexTable = [];

    // Save the index table
    for (let row = 0; row < table.rows.length; row++) {
        for (let column = 0; column < table.rows[row].cells.length; column++) {
            indexTable.push(row + "-" + column);
        }
    }

    // Print the calendars in the columns selected on select element
    var a = 0;
    for (let calendar = 0; calendar < cal.length; calendar++) {
        for (let i = 0; i < indexTable.length; i++) {
            if (a == calendar && a == i) {
                var [row, column] = indexTable[i].split('-');
                table.rows[row].cells[column].innerHTML = cal[calendar];
                a++;
            }
        }
    }
}