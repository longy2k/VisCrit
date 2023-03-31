
var XLSX = require("xlsx");
var workbook = XLSX.readFile(`./InputFile.xlsx`)
let worksheet = workbook.Sheets[workbook.SheetNames[6]];

for (let index = 2; index < 4; index++) {
    // const Name = worksheet[`D${index}`].v;
    // const Email = worksheet[`C${index}`].v;
    const Name = worksheet[`D${index}`];
    const Email = worksheet[`C${index}`];


    console.log({
         Name: Name, Email: Email
    })
    }

// var templateParams = {
//     to_name: 'xyz',
//     from_name: 'abc',
//     message_html: 'Please Find out the attached file'
//   };

//   emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
//     .then(function(response) {
//       console.log('SUCCESS!', response.status, response.text);
//     }, function(error) {
//       console.log('FAILED...', error);
//     });