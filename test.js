// var resultString = '';
// let filename = process.argv[2];
// let fs = require('fs');
// let array = fs.readFileSync(filename).toString().split("\r\n");

// for(let i = 1; i < array.length; i+=2) {
//     resultString += array[i];
// }
// console.log(resultString);

if (process.argv.length < 3) {
    console.log('Use the next command to run the app: node ', process.argv[1], ' [FILENAME]');
    process.exit(1);
}

let fs = require('fs');
let filename = process.argv[2];

let resultString = '';

fs.readFile(filename, 'utf-8', function (err, data) {
    if (err) throw err;
    let array = data.toString().split("\r\n");
    for (i in array) {
        if (i % 2 == 1) {
            resultString += array[i];
        }
    }
    // for(let i = 1; i < array.length; i += 2) {
    //     resultString += array[i];
    // }
    console.log(resultString);
});


