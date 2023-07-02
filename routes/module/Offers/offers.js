const commonRouter = require('../../commonRouter')


// get my all partner
module.exports.getOffers = (req,res)=>{

//test
    commonRouter.mysql_pool.getConnection((connectionErr, connection) => {
        if (connectionErr) {
            console.log("inn error 1");
             res.status(500).send({
                status: "FAILURE",
                message: "internal server error 1",
            });
        } 
        else {
           const sql_query = `select offer_id, offer_title,description,offer_code,offer_img,valid_from,valid_to,maxium_disscount_amount from offers where is_active=1 limit ${req.body.limit}`;
            connection.query(sql_query, function(err, rows, fields) {
                connection.release();
                if (err) {
                           console.log("error in get partner", err);
                            res.status(500).send({
                                status: "FAILURE",
                                message: "error in get partner",
                            });
                } 
                else {
                         res.send(rows)
                }
        
             })
  
        }


        })

}




//insert to database
module.exports.postOffer = (req,res)=>{

    const postReq = {
        offer_title:req.body.offer_title,
        description:req.body.description,
        offer_code:req.body.offer_code,
        offer_img:req.body.offer_code,
        valid_from:req.body.valid_from,
        valid_to:req.body.valid_to,
        discount_value:req.body.discount_value,
        discount_unit:req.body.discount_unit,
        maxium_disscount_amount:req.body.maxium_disscount_amount,
        service_id:req.body.service_id,
        is_active:1,
        created_by:req.body.created_by
    }

    commonRouter.mysql_pool.getConnection((connectionErr, connection) => {
        if (connectionErr) {
            console.log("inn error 1");
             res.status(500).send({
                status: "FAILURE",
                message: "internal server error 1",
            });
        } 
        else {
           const sql_query = "INSERT INTO offers SET ?";
            connection.query(sql_query,[postReq], function(err, rows, fields) {
                connection.release();
                if (err) {
                           console.log("error in insert offers", err);
                            res.status(500).send({
                                status: "FAILURE",
                                message: "error in insert offers",
                            });
                } 
                else {
                     if(rows && rows.affectedRows){
                         res.send({
                             status:'success',
                             msg:'offer has been insert successfully'
                         })
                     }

                }
        
             })
  
        }


        })
}
