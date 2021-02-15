const fs = require('fs'); 
const path = require('path');  
const dir = '../calendario'
let file = dir+'/access_log';

if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
    console.log('Directory created successfully!'); 
}else if(!fs.existsSync(file)){
    fs.createWriteStream(`${dir}/access_log`);
    console.log('File created successfully!'); 
}else{
    console.log('Directory is already created!'); 
}

const https = require('https')
const url = "https://api.ipify.org/?format=json";
https.get(url, res => {
  let data = '';
  res.on('data', chunk => {
    data += chunk;
  });
  res.on('end', () => {
    data = JSON.parse(data);
    // console.log(data.ip);
    const url = `https://api.astroip.co/${data.ip}/?api_key=1725E47C-1486-4369-AAFF-463CC9764026`;
        https.get(url, res => {
        let data = '';
        res.on('data', chunk => {
            data += chunk;
        });
        res.on('end', () => {
            data = JSON.parse(data);
            // console.log(data);
            let message = '';
            let date = new Date(data.timezone.date_time);
            let currentDate = new Date (Date.now());
            // date = date.getDate() + "-"+ date.getMonth()+ "-" +date.getFullYear();
            console.log(date);
            message = `\n${date.toLocaleString('default', { day: '2-digit', month: 'long', year: 'numeric'})} - ${date.toLocaleString('default', {hour: '2-digit', minute: '2-digit', second: '2-digit' })} - ${data.requester_ip} - ${date.toLocaleString('default', { day: '2-digit', month: 'long', year: 'numeric'})} - ${currentDate.toLocaleString('default', { day: '2-digit', month: 'long', year: 'numeric'})}`
            fs.appendFile('../calendario/access_log',message, function (err) {
                if (err) return console.log(err);
                console.log('Log writed succesfull on calendario/access_log');
              });
        })
        }).on('error', err => {
        console.log(err.message);
        })
  })
}).on('error', err => {
  console.log(err.message);
})

