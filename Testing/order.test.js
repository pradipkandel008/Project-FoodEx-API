const Order = require('../models/orders');
const mongoose = require('mongoose');
const url = "mongodb://localhost:27017/foodExTesting";

beforeAll(async () => {     
    await mongoose.connect(url, {         
    useNewUrlParser: true, 
    useCreateIndex: true     
}); 
}); 

afterAll(async () => { 

await mongoose.connection.close(); 
}); 


describe('Order  Schema test', () => {     
    it('Add order testing', () => {         
        const order = {             
            'phone': '9849329276',             
            'food_name': 'Mo:mo',
            'food_quantity':'1',
            'food_price':'100',
            'status':'active',
            'food_imagename':'momo.jpg', 
            'payment_type':'cash' 
           
               
        };                  
        return Order.create(order)             
        .then((pro_ret) => {                 
            expect(pro_ret.phone).toEqual('9849329276');  
            expect(pro_ret.food_name).toEqual('Mo:mo');   
            expect(pro_ret.food_quantity).toEqual('1');             
            expect(pro_ret.food_price).toEqual('100'); 
            expect(pro_ret.status).toEqual('active'); 
            expect(pro_ret.food_imagename).toEqual('momo.jpg'); 
            expect(pro_ret.payment_type).toEqual('cash'); 

            

            
        });     }); 

        // update the test

       it('to test the update', async () => { 
 
            return Order.updateOne({
               _id :Object('5d21df42a5ecb718a46bbe09'
               )}, 
               {$set : {food_quantity:'2'}})     
                .then((pp)=>{         
                    expect(pp.ok).toEqual(1)     
              })    
            }) 
            

            //delete the test
           it('to test the delete order is working or not', async () => {         
                const status = await Order.deleteMany();         
               expect(status.ok).toBe(1); });  


    })

