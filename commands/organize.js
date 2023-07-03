let fs=require('fs');
let path=require('path');
// organize
let types=require("./utility");
function organizeFn(dirpath){
    let despath;
    // 1. input -> directory path givent
    if(dirpath== undefined){
        console.log("Please enter Directory path");
        return;
    }else{
        let doesExist =fs.existsSync(dirpath);
        if(doesExist){
             // 2. create -> organized_files -> directory
            despath=path.join(dirpath,"organize_files");
            if(fs.existsSync(despath)==false){
                fs.mkdirSync(despath);
            }

        }else{
            console.log("kindly enter the correct path");
            return;
        }

    } 

    // Organize helper->here we pass source and destination
organizeHelper(dirpath,despath);

}
function organizeHelper(src,dest){
     // 3. identify categories of all the files present in that input directory 

    let childNames=fs.readdirSync(src);
    // console.log(childNames.length);
    for(let i=0;i<childNames.length;i++){
       let childaddress=path.join(src,childNames[i]);
       let isFile=fs.lstatSync(childaddress).isFile();
       if(isFile){
        // console.log(childNames[i]);
        let category=getCategory(childNames[i]);
         // 4. copy /cut files to that organized directory inside of any of category folder
         sendFiles(childaddress,dest,category);
       }
    }

}
function getCategory(name){
    let ext=path.extname(name);
    ext=ext.slice(1);
    // console.log(ext);
    for (let type in types){
        let cTypeArray=types[type];
        for(let i=0;i<cTypeArray.length;i++){
            if(ext == cTypeArray[i]){
                return type;
            }
        }
    }
    return others;

}
function sendFiles(srcFilePath,dest,category){
    let categorypath=path.join(dest,category);
   if(fs.existsSync(categorypath)==false){
        fs.mkdirSync(categorypath);
   }
   let fileName=path.basename(srcFilePath);
   let destFilePath=path.join(categorypath,fileName);
   fs.copyFileSync(srcFilePath,destFilePath);
   fs.unlinkSync(srcFilePath);
}

module.exports ={
    organizeKey:organizeFn
}