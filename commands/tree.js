const fs = require('fs');
const path = require('path');

function treeFn(dirPath) {
    // console.log('Tree function');
    // ├──
    if(dirPath == undefined) {
        console.log("Please enter a valid Path");
    } else {
        let doesExist = fs.existsSync(dirPath)
        if(doesExist) {
            treeHelper(dirPath + " ");
        }
    }
}

function treeHelper(targetPath, intend) {
    let isFile = fs.lstatSync(targetPath).isFile();
    if(isFile) {
        let fileName = path.basename(targetPath);
        console.log(intend + "├──" + fileName);
    } else {
        let dirName = path.basename(targetPath);
        console.log(intend + "└──" + dirName);

        let children = fs.readFileSync(targetPath);

        for(let i = 0; i < children.length; i++) {
            let childPath = path.join(targetPath, children[i]);
            treeHelper(childPath, intend + '\t');
        }
    }
}
module.exports = {
    treeKey: treeFn
}