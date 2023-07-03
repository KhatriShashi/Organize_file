let fs=require('fs');
let path=require('path');
// tree
function treeFn(dirpath){
    if(dirpath == undefined){
        console.log("Please specify the path");
        return;
    }else{
        let doesExist=fs.existsSync(dirpath);
        if(doesExist){
            treeHelper(dirpath,"");
        }else{
            console.log("Directory does not exist");
            return;
        }
    }
}
function treeHelper(dirpath,indent){
    // is file or folder
    let isFile=fs.lstatSync(dirpath).isFile();
    if(isFile ==true){
        let fileName =path.basename(dirpath);
        console.log(indent+"|---"+fileName);
    }else{
        let dirName = path.basename(dirpath);
        console.log(indent+"|___"+dirName);
        let childrens=fs.readdirSync(dirpath);
        for(let i=0;i<childrens.length;i++){
            let childrenpath=path.join(dirpath,childrens[i]);
            treeHelper(childrenpath,indent+"\t")
        }
    }
}

module.exports ={
    treeKey:treeFn
}