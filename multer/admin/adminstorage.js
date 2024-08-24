const multer=require("multer")

const storage=multer.diskStorage({
    destination:(req,res,callback)=>{
        callback(null,"./admin_uploads")
    },
    filename:(req,file,callback)=>{
        const filename=`image-${Date.now()}.${file.originalname}`;
        callback(null,filename)
    }
})


const filter=(req,file,callback)=>{
    if(file.mimetype==="image/png" || file.mimetype==="image/jpg" || file.mimetype==="image/jpeg"){
        callback(null,true)
    }else{
        callback(null,false);
        return callback(new Error("file format is invalid"))
    }
}

const upload=multer({
    storage:storage,
    fileFilter:filter
})

module.exports=upload