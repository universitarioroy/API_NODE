    const express= require('express');
    const ProductsServices = require('./../services/products.service');
    const validatorHandler = require('./../midlewares/validator.handler');
    const {
        createProductSchema,
        updateProductSchema,
        getProductSchema
        } = require('./../schemas/products.schemas');

    const router = express.Router();
    const service= new ProductsServices();

    router.get('/', async (req, res) => {
        const products=await service.find();
        res.json(products);
    });

    router.get('/filter', async (req, res) => {
    res.send('Yo soy un filter');
    });


    router.get('/:id',
        validatorHandler(getProductSchema,'params'),
        async (req, res,next) => {
        const id= req.params.id;
        try {
            const product=await service.findOne(id);
            res.status(200).json({product});
        } catch (error) {
            // res.json({
            //     mensaje:error.message});
            next(error)
        }
        
    });

    router.post('/',
            validatorHandler(createProductSchema,'body'),
            async (req,res)=>{
            const product=req.body;
            const rsult=await service.create(product);
            res.status(201).json({mesagge:rsult});
    });

    router.put('/:id',
        validatorHandler(getProductSchema,'params'),
        validatorHandler(updateProductSchema,'body'),
        async (req,res,next)=>{
        const {id} = req.params;
        const body=req.body;
        
        try{
            const newproduct=await service.update(id,body);
            res.status(200).json({message:"Updated",data:newproduct});

        }catch(error){
            //res.json({mensaje:error.message});
            next(error);
        }
    
    });

    router.delete('/:id',
        validatorHandler(getProductSchema,'params'),
        async (req,res)=>{
        const {id} = req.params;
        
        try {
            const product=await service.delete(id);
            res.status(200).json(product);
        } catch (error) {
            res.status(404).json({message:error.message});
        }

        
    });

    module.exports = router;