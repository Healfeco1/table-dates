let fechaInicio = document.getElementById('startDate');
let fechaFin = document.getElementById('endDate');
let butonSend = document.getElementById('send');
let selectDate = document.getElementById('selectDate');
let options = document.createElement("option");

function dateFormat(date){
    let year = date.value.substring(0, 4);
    let month = date.value.substring(5, 7);
    let result = month + '/' + year;
    return result
}

for(let i=1; i<=10; i++){
    let options = document.createElement("option");
    options.text = i
    selectDate.add(options)
}
selectDate.selectedIndex = 0

