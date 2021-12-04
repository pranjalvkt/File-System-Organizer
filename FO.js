const helpObj = require('./commands/help');
const treeObj = require('./commands/tree');
const organizeObj = require('./commands/organize');

let input = process.argv.slice(2); // slice is used to extart the commands and path we have passed
// node js treats command line inputs as array and that array is your process array

let command = input[0];
let dirPath = input[1];


switch (command) {
    case 'tree':
        treeObj.treeKey(dirPath);
        break;

    case 'organize':
        organizeObj.organizeKey(dirPath);
        break;

    case 'help':
        helpObj.helpKey();
        break;

    default:
        console.log('Please input a valid command !');
        break;
}


