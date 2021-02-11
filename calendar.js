let startYear, endYear, startmonth, endmonth, daysWeek, firstDay, monthYear, weeks, divTable, dateEnd, dateStart,
    containerCalendar, daysOfYear, dStart, dEnd, tableDate, output, dates = [],rows;
 var cal = [];
 var indexTable = [];
fechaInicio.addEventListener("change", e => {
    [startYear, startmonth] = e.target.value.split('-');
    dStart = new Date(startYear, parseInt(startmonth));
    // showCalendar(startmonth, startYear)
});
fechaFin.addEventListener("change", e => {
    [endYear, endmonth] = e.target.value.split('-');
    dEnd = new Date(endYear, parseInt(endmonth));
    // showCalendar(endmonth, endYear)
});

// Form operations
butonSend.addEventListener("click", e => {
    e.preventDefault();
    // startYear = parseInt(startYear);
    // startmonth = parseInt(startmonth);
    // endYear = parseInt(endYear);
    // endmonth = parseInt(endmonth);
    if (fechaFin.value >= fechaInicio.value) {
        let n = 0
        if (endYear == startYear) {
            let dif = endmonth - startmonth;
            let month = startmonth;
            n = 0;
            while (n <= dif) {
                n++;
                month = parseInt(month)
                // showCalendar(month, endYear)
                month += 1
            }
        }

    }
    rang()
})

function rang() {
    let calendars = diffDates(dStart, dEnd);
    // createTable(rows, selectDate.value);
    for (dStart; dStart <= dEnd; dStart.setMonth(dStart.getMonth() + 1)) {
        if(dStart.getMonth()==0){
            dates.push(dStart.getMonth()+'-'+(dStart.getFullYear()-1));
        }else{
            dates.push(dStart.getMonth()+'-'+dStart.getFullYear());
        }
        // showCalendar(dStart.getMonth(), dStart.getFullYear(), rows);
        // createTable(rows, selectDate.value, dStart.getMonth(), dStart.getFullYear());
        // populate(rows,selectDate.value, dStart.getMonth(), dStart.getFullYear());
        
    }
    for(date in dates){
        var month = dates[date].split('-')[0];
        var year = dates[date].split('-')[1]
        cal.push(createMonth(month, year));
    }

    console.log(cal.length);
    // rows = generateRow(selectDate.value, calendars + 1);
    rows = generateRow(selectDate.value, cal.length);
    showCalendar(rows);
}
function createMonth(month, year) {
    divTable = "";

    // Get first day of month
    firstDay = new Date(year, month).getDay();

    // creating all cells
    var date = 1;

    // get week of month
    let dias = new Date(year, month, 0).getDate() - 7 + firstDay;
    weeks = Math.ceil(dias / 7) + 1

    divTable += `<table class="table-calendar">
                    <caption>${getMonth(month) + "-" + year}</caption>
                    <thead id="thead-month">
                    <tr>`;

    // Print days of week
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
            } else if (date > getDays(month, year)) {
                break;
            } else {
                divTable += `<td class=date-picker data-date=${date} data-month_name=${getMonth(month)} data-year=${year}>`;
                divTable += `<span>${date}</span>`;
                date++;
            }
            divTable += `</td>`;
        }
        divTable += `</tr>`;
    }
    // -++++++++++++++++++++++++++++++++++++++++++
    divTable += `</tbody>`;

    return divTable
}

function diffDates(d1, d2) {
    // d1 = new Date(d1)
    // d2 = new Date(d2)
    var d1Y = d1.getFullYear();
    var d2Y = d2.getFullYear();
    var d1M = d1.getMonth();
    var d2M = d2.getMonth();;
    return (d2M + 12 * d2Y) - (d1M + 12 * d1Y);
}

// Get the name of the month
function getMonth(month) {
    // let date =  new Date(`${month}-01-2021`);
    // month = parseInt(month)-1;
    let date = new Date(00, month, 0);
    return (date.toLocaleString('default', { month: 'long' }));
    // for (let i = 0; i < 1; i++) {
    //     let date = new Date(`${month}-01-2021`);
    //     let name = date.toLocaleString('default', { month: 'long' });
    //     return name;
    // }
}

// Get days of month
function getDays(month, year) {
    return new Date(year, month, 0).getDate();
}

// Get the names of the week
function getNamesWeek(month, year) {
    let daysWeek = []
    for (let i = 0; i <= 6; i++) {
        daysWeek.push((new Date(year, month, i).toLocaleString("default", {
            weekday: "long",
        })).substr(0, 1));
        // console.log((new Date(year,month,i).toLocaleString("es", {
        //     weekday: "long",
        //   })).substr(0,1));
    }
    return (daysWeek);
}

selectYear = document.getElementById("year");
selectMonth = document.getElementById("month");

var calendar = document.getElementById("calendar");
// var lang = calendar.getAttribute('data-lang');

var months = "";
var days = "";

daysWeek = (getNamesWeek(2, 2021));
days = daysWeek;

var table = document.createElement("TABLE");
table.classList.add("table");


function generateRow(columns, calendars) {
    console.log("calendars: " + calendars);
    let res = 0
    for (let i = 0; i < 20; i++) {
        res = columns * i;
        if (res >= calendars) {
            let restCell = res - calendars;
            // return { rows: i, restCell }
            return i
        }
    }
}
// +++++++++++++++++++++++++++++++++++++++ showCalendar(month, year) +++++++++++++++++++++++++++++++++++++++++++++
// output = `<table border="1" style="border-color: #ccc;" cellspacing="0" cellpadding="5" class="table-calendar">`
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

function populate(row, column, month, year) {
    console.log("mount: "+month+" y- "+year);
    var table = document.getElementsByClassName('table-calendar');
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < column; j++) {
            // if (dates.length <= i || dates.length == j) {
            // } else{
            //     break
            // }
            table[0].rows[i].cells[j].innerHTML += showCalendar(month,year)
        }
    }
}

/** 
table = document.getElementById('dateTable');
function showCalendar(month, year, rows) {
    console.log('month' + ' ' + month);
    var cellNode, textNode, rowNode;
    console.log('rows' + ' ' + rows);
    for (var i = 0; i <= selectDate.value; i++) {
        rowNode = document.createElement("tr");
        for (var j = 0; j <= rows; j++) {
            if (selectDate.value == 1) {
                textNode = document.createTextNode(getMonth(month) + '' + year);
            }
            else {
                cellNode = document.createElement("td");
                textNode = document.createTextNode(getMonth(month) + '' + year);
            }
        }
    }
    cellNode.appendChild(textNode);
    rowNode.appendChild(cellNode);
    table.appendChild(rowNode);
}
*/


// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
output = `<table cellspacing="15" cellpadding="15" class="table all-dates">`
function showCalendar(rows) {
    console.log(rows);
        for (var i = 0; i < rows; i++) {
            output += `<tr>`
            for (var j = 1; j <= selectDate.value; j++) {
                // output += `<td>${i+'-'+j}</td>`
                output += `<td></td>`
                // output += `<td>${i+'-'+j}</td>`
            }
            output += `</tr>`
        }
        output += `</table>`
        // console.log(output)
        document.getElementById('container').innerHTML = output;
        ta('all-dates');
}

function ta(tableName){
    var a = 0;
    var table = document.getElementsByClassName(`${tableName}`)[0];
    // console.log('rows: ' + table.rows.length);
    // console.log('columns: ' + table.rows[1].cells.length);


    // console.log(table[0].rows);
    // /**
    for (let row = 0; row < table.rows.length; row++) {
        for (let column = 0; column < table.rows[row].cells.length; column++) {
            indexTable.push(row+"-"+column);
            console.log(row+"-"+column);
        }
    }

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

    for (let row in table.rows) {
        // console.log(typeof(row));
       for (let column in  table.rows[row].cells) {
        // console.log(column);
        //    table.rows[row].cells[column].innerHTML = row+"-"+column;
        //    indexTable.push(table.rows[row].cells[column].innerHTML);
       }  
    }
    // */
}
/** 
function showCalendar(month, year, rows) {
    console.log(year + "-" + month);
    divTable = "";

    // Get first day of month
    firstDay = new Date(year, month).getDay();

    // creating all cells
    var date = 1;

    // get week of month
    let dias = new Date(year, month, 0).getDate() - 7 + firstDay;
    weeks = Math.ceil(dias / 7) + 1
    divTable += `<table class="table-calendar">
                    <caption>${getMonth(month) + "-" + year}</caption>
                    <thead id="thead-month">
                    <tr>`;

    // Print days of week
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
            } else if (date > getDays(month, year)) {
                break;
            } else {
                divTable += `<td class=date-picker data-date=${date} data-month_name=${getMonth(month)} data-year=${year}>`;
                divTable += `<span>${date}</span>`;
                date++;
            }
            divTable += `</td>`;
        }
        divTable += `</tr>`;
    }
    // -++++++++++++++++++++++++++++++++++++++++++
    divTable += `</tbody>`;

    console.log("rows: " + rows +'--'+ selectDate.value);
    //Add the data rows.
    // row = table.insertRow(-1);
    //         for (var j = 0; j < selectDate.value; j++) {
    //             for (let i = 0; i < rows; i++) { 
    //                 var cell = row.insertCell(-1);
    //                 cell.innerHTML = divTable;
    //             }
    //         }


    // var dvTable = document.getElementById("datesTable");
    // dvTable.innerHTML = "";
    // dvTable.appendChild(table);
    containerCalendar = document.createElement("table");
    containerCalendar.classList.add("table-calendar");
    containerCalendar.innerHTML = divTable

    // return divTable
    var dvTable = document.getElementById("datesTable")
    // dvTable.appendChild(containerCalendar);
    output = `<table border="1" style="border-color: #ccc;" cellspacing="0" cellpadding="5" class="table-calendar">`
        for (var i = 1; i <= rows; i++) {
            output += `<tr>`
            for (var j = 1; j <= selectDate.value; j++) {
                // output += `<td>${i+'-'+j}</td>`
                output += `<td>${i+'-'+j}--${divTable}</td>`
            }
            output += `</tr>`
        }
        output += `</table>`
        document.getElementById('container').innerHTML = output;
}
*/

// createFolder("./Example")
// function createFolder(folder){
// makeDir(folder)
// }