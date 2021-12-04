const fs = require('fs');
const path = require('path');

let types = {
    media: ['mp4', 'mkv', 'mp3', 'jpeg', 'jpg', 'png'],
    archives: ['7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz", 'zip'],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex', 'pptx'],
    app: ['dmg', 'pkg', "deb", 'exe']
}

function organizeFn(dirPath) {
    let destPath;

    if (dirPath == undefined) {
        console.log('Please enter a Directory Path');
        return;
    } else {
        //1. checks whether the given path is valid or not
        let doesExist = fs.existsSync(dirPath);

        if (doesExist) {
            //2 . creates a Organized files Directory path
            destPath = path.join(dirPath, 'organized_files');
            
            //destPath -> E:\PepCoding\DEV\Test Folder\organized_files
            if (fs.existsSync(destPath) == false) {
                //3 . creates a Organized files Directory if doesn't exists already
                fs.mkdirSync(destPath);
            } else {
                console.log("File already exists");
            }
        } else {
            console.log("Please enter a valid path");
        }
    }
    organizeHelper(dirPath, destPath);
}



function organizeHelper(src, dest) {
    let childName = fs.readdirSync(src);

    for (let i = 0; i < childName.length; i++) {
        let childAddress = path.join(src, childName[i]);
        let isFile = fs.lstatSync(childAddress).isFile();
        if (isFile) {
            let fileCategory = getCategory(childName[i]);
            console.log(childName[i] + ' belongs to ' + fileCategory);
            moveFiles(childAddress, dest, fileCategory);
        }
        
    }
}

function moveFiles(srcFilePath, dest, fileCategory) {
    let catPath = path.join(dest, fileCategory);

    if(fs.existsSync(catPath) == false) {
        fs.mkdirSync(catPath);
    }
    let fileName = path.basename(srcFilePath);
    let destFilePath = path.join(catPath, fileName);
    fs.copyFileSync(srcFilePath, destFilePath);
    fs.unlinkSync(srcFilePath);
    console.log(fileCategory + " moved to " + fileCategory);
}

function getCategory(name) {
    let ext = path.extname(name);
    ext = ext.slice(1);
    for(let type in types) {
        let cTypeArr = types[type];
        for(let i = 0; i < cTypeArr.length; i++) {
            if(ext == cTypeArr[i]) {
                return type;
            }
        }
    }
    return 'other';
}

module.exports = {
    organizeKey: organizeFn
}
