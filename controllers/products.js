const User = require('../models/user')
const Products = require('../models/products')


exports.productById = (req,res,next,id) => {
	Products.findById(id)
	.exec( (err, product) => {
		if(err || !product)
			return res.status(400).json({error: err})
		req.product = product;
		next();
	})
}


exports.userById = (req,res,next,id) => { 
    User.findById(id)
    .exec( (err,user)=>{
        if(err || !user)
            return res.status(400).json({"Error": "User not found"});
        
        req.profile = user;
        next();
    })
}


exports.getProducts=(req,res)=>
{
	const product = Products.find()
	.select("_id name price")
	.then( (product)=> { res.json({product: product})} )
	.catch( (err)=> { console.log(err)} )
};


exports.addProduct = (req, res) => {

    const product = new Products(req.body);
    product.postedBy = req.profile;
	product.save().then(result => {
		res.status(200).json({product: result});
	})
}

exports.updateProduct = (req,res) => {
	const product = req.product;
	product = lodash.extend(product, req.body)
	product.save( (err) => {
		if(err)
			return res.status(400).json({error: err})
		res.json(product);
	})
}

exports.deleteProduct = (req,res) => {
	let product = req.product
	product.remove( (err,product) => {
		if(err)
			return res.status(400).json({error: err});
		res.json({"Message": "Deleted product!"});
	})
}