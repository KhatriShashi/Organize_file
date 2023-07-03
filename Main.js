let inputArr = process.argv.slice(2);
let helpFn=require("./commands/help");
let treeObj=require("./commands/tree");
let organizeObj=require("./commands/organize");
//  node main.js tree "diretorypath"
//  node main.js organize "directorypath"
//  noe help
let command=inputArr[0];
let dirpath=inputArr[1];
switch (command){
   case "tree":
       treeObj.treeKey(dirpath);
       break;
   case "organize":
       organizeObj.organizeKey(dirpath);
       break;
   case "help":
       helpFn();
       break;
   default:
       console.log("please input right command");
       break;
}
