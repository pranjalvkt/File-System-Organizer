function helpFn() {
    console.log(`List of all the commands:
                1- Tree Command- node FO.js tree <dirName>
                2- Organize Command- node FO.js organize <dirName>
                3- Help Command- node FO.js help`);
}
module.exports = {
    helpKey: helpFn
}