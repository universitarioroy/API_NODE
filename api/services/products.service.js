const {faker}= require('@faker-js/faker');//faker
const boom = require('@hapi/boom');
class ProductsServices{

    
    constructor(){
        this.products=[];
        this.generate();

    }


    generate(){
        const limit =  100;
        for (let index = 0; index < limit; index++) {
          this.products.push({
            id:faker.string.uuid(),
            name: faker.commerce.productName(),
            price: parseInt(faker.commerce.price(), 10),
            image: faker.image.url(),
            isBlock:faker.datatype.boolean(),
          });
        }
    }

    async create(product){
        const newproduc={
            id:faker.string.uuid(),
            ...product
        };
        this.products.push(newproduc);
        return newproduc;
    }

    find(){
        return new Promise((resolve,reject)=>{
            setTimeout(()=>{
                resolve(this.products);
            },1000);
        });   
    }

    async findOne(id){
        // const   name=this.getTotal();
        const producto= this.products.find((producto)=>{
            return producto.id===id;
        });
        
        if(!producto){
            // throw new Error('Producto no encontrado...');
            throw boom.notFound('product not found...');
        }

        if(producto.isBlock){
            throw boom.conflict('product es block');
        }

        return producto;
        
    }

    async update(id,body){
        
        
            const index= this.products.findIndex((producto)=>{
                return producto.id===id;
            });
            
            if(index===-1){
                //throw new Error('Product not found..!');
                throw boom.notFound('producto no encontrado...');
            }
            const newproduct={ ...this.products[index],...body};
            this.products[index]=newproduct;
                
            return this.products[index];
            
        
    }

    async delete(id){
        const index= this.products.findIndex((producto)=>{
            return producto.id===id;
        });


        if(index==-1){
            throw new Error('producto no encontrado...');
        }
        const product=this.products[index];
        this.products.splice(index,1);
        return product;
    }

}

module.exports=ProductsServices;