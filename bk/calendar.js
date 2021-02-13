let fechaInicio = document.getElementById('startDate');
let fechaFin = document.getElementById('endDate');
let butonSend = document.getElementById('send');
let selectDate = document.getElementById('selectDate');
let options = document.createElement("option");
let startYear, endYear, startmonth, endmonth, daysWeek, firstDay, monthYear, weeks, divTable, dateEnd, dateStart,
    containerCalendar, daysOfYear, dStart, dEnd, tableDate, output, dates = [],rows;
 var cal = [];
 var indexTable = [];
 let lang = 'default';

// Populate column select element
for(let i=1; i<=10; i++){
    let options = document.createElement("option");
    options.text = i
    selectDate.add(options)
}
selectDate.selectedIndex = 0

fechaInicio.addEventListener("change", e => {
    [startYear, startmonth] = e.target.value.split('-');
    // Changed
    dStart = new Date(startYear, parseInt(startmonth));
    // dStart = createDate(startmonth,startYear);
});
fechaFin.addEventListener("change", e => {
    [endYear, endmonth] = e.target.value.split('-');
    // Changed
    dEnd = new Date(endYear, parseInt(endmonth));
    // dEnd = createDate(parseInt(endmonth),endYear);
});

// Form operations
butonSend.addEventListener("click", e => {
    e.preventDefault();
    if (fechaFin.value >= fechaInicio.value) {
        let n = 0
        if (endYear == startYear) {
            let dif = endmonth - startmonth;
            let month = startmonth;
            n = 0;
            while (n <= dif) {
                n++;
                month = parseInt(month)
                month += 1
            }
        }

    }else{
        alert(`Fecha de incio: ${getMonth(startmonth)} ${startYear} debe ser mayor a fecha final: ${getMonth(endmonth)} ${endYear}`)
    }
    rang()
})

function rang() {
    let calendars = diffDates(dStart, dEnd);
    for (dStart; dStart <= dEnd; dStart.setMonth(dStart.getMonth() + 1)) {
        if(dStart.getMonth()==0){
            // When month = 0 (December) show a year more on date
            dates.push(dStart.getMonth()+'-'+(dStart.getFullYear()-1));
        }else{
            dates.push(dStart.getMonth()+'-'+dStart.getFullYear());
        }
    }
    // Save the HTML calendar table exa: (Julio 2021) 
    for(date in dates){
        var month = dates[date].split('-')[0];
        var year = dates[date].split('-')[1]
        cal.push(createMonth(month, year));
    }

    rows = generateRow(selectDate.value, cal.length);
    showCalendar(rows);
}

// Create table month exa: (Julio 2021) and return the HTML table code
function createMonth(month, year) {

    var totalDays, monthName, date;
    
    // get int data, total days of months eje.(Feb 28 days (return:28))
    totalDays = getDays(month, year);

    // get the name of month, return string name: send 1 -> return Enero
    monthName = getMonthName(month);

    // create date whith month and year gotten in this function
    date = new Date(year,month);
    date = new Date(date.setMonth(date.getMonth()-1))

    console.log('fecha: '+date);
    console.log('Mes: '+monthName);
    console.log('TotalDias: '+totalDays);
    console.log(date.getDate());
    divTable = "";

    // Get first day of month
    let d = new Date(year, month)
    console.log(new Date(d.setMonth(d.getMonth()-1)));
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
    var d1M = d1.getMonth();
    var d2M = d2.getMonth();;
    return (d2M + 12 * d2Y) - (d1M + 12 * d1Y);
}

function createDate(month,year){
    let date = new Date(parseInt(year), parseInt(month),0);
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
    for (let i = 0; i < 20; i++) {
        res = columns * i;
        if (res >= calendars) {
            let restCell = res - calendars;
            return i
        }
    }
}

// Create the table where will be printed all calendars
function createTable(row, column) {

    console.log("row: " + row + ' column:' + column);

    for (var i = 1; i <= row; i++) {
        output += `<tr>`
        for (var j = 1; j <= column; j++) {
            output += `<td></td>`
        }
        output += `</tr>`
    }
    output += `</table>`
    document.getElementById('container').innerHTML = output;
}

output = `<table cellspacing="15" cellpadding="15" class="table all-dates">`
// Create cells table
function showCalendar(rows) {
        for (var i = 0; i < rows; i++) {
            output += `<tr>`
            for (var j = 1; j <= selectDate.value; j++) {
                output += `<td></td>`
            }
            output += `</tr>`
        }
        output += `</table>`
        document.getElementById('container').innerHTML = output;
        printTable('all-dates');
}

// Populate the table with all calendars
function printTable(tableName){
    var a = 0;
    var table = document.getElementsByClassName(`${tableName}`)[0];


    // Save the index table
    for (let row = 0; row < table.rows.length; row++) {
        for (let column = 0; column < table.rows[row].cells.length; column++) {
            indexTable.push(row+"-"+column);
        }
    }

    // Print the calendars in the columns selected on select element
    var a = 0;
    for (let calendar = 0; calendar < cal.length; calendar++) {
        for (let i = 0; i < indexTable.length; i++) {
            if(a==calendar && a==i){
                var [row,column] = indexTable[i].split('-');
                table.rows[row].cells[column].innerHTML = cal[calendar];
                a++;
            }
        }
    }
}