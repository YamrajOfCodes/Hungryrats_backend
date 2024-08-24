const productDb = require("../../Model/product/productModel");
const cloudinary = require("../../cloudinary/cloudinary");
const orderDb = require("../../Model/Order/orderModel");


const addproduct = async(req,res)=>{

const {productname,price,description,quantity,messname} = req.body;
try {
  console.log(productname,price,description,quantity);

     if(!productname || !price || !description || !quantity){
       return res.status(400).json({error:"all the fields are required"})
     }

     const productExist = await productDb.findOne({productname:productname});

     if(productExist){
       res.status(400).json({error:"product are already exists"})
     }else{
       const file = req.file?.path;
       const uploads = await cloudinary.uploader.upload(file);

       const Product = new productDb({
        productname,price,description,quantity,messname,productimage:uploads.secure_url
       })

       await Product.save();

       res.status(200).json(Product);
     }

} catch (error) {
    console.log(error);
}

}

const getproduct = async(req,res)=>{

try {
    
    const getallproducts = await productDb.find({});
    res.status(200).json(getallproducts)

} catch (error) {
    console.log(error);
}


}


const getsingleproduct = async(req,res)=>{

 const {productId} = req.params

 try {
    
   const getproduct = await productDb.findById({_id:productId});
   res.status(200).json(getproduct)

 } catch (error) {
    console.log(error);
 }

}


const deleteproduct = async(req,res)=>{

  const {productId}  = req.params;

    try {
        const deleteproduct = await productDb.findByIdAndDelete({_id:productId});
        res.status(200).json(deleteproduct)
    } catch (error) {
    console.log(error);    
    }

}

const orders = async(req,res)=>{

  try {
    const {Firstname,mobile,productname,price,messname} = req.body;

  

    if(!Firstname || !messname || !mobile || !price || !productname){
     return res.status(400).json({error:"please wait few seconds "});
    }

    const neworder = await orderDb.findOne({Firstname:Firstname})
    const order = await orderDb.findOne({productname:productname,Firstname:Firstname});
    if(order){
     return res.status(400).json({error:"please wait to deliver"})
    }else if(neworder){
         return res.status(400).json({error:`you already placed another order`});
    }else{
      const neworder = new orderDb({
        Firstname,
        messname,
        price,
        mobile,
        productname
      })

      await neworder.save();
      res.status(200).json("order is placed")
    }


  } catch (error) {
    console.log(error);
  }

}

const getallorders = async(req,res)=>{
   try {
     const orders = await orderDb.find({});
     res.status(200).json(orders)
   } catch (error) {
    console.log(error);
   }
}

const deleteorders = async (req,res)=>{
  const {orderId} = req.params;
  try {
    const deleteOrder = await orderDb.findOneAndDelete({_id:orderId});
    res.status(200).json(deleteOrder)
  } catch (error) {
    console.log(error);
  }
}


module.exports = {addproduct,getproduct,getsingleproduct,deleteproduct,orders,getallorders,deleteorders}