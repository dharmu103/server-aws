const commonRouter = require('../../commonRouter')

module.exports.getServiceByLimit = (req,res)=>{

    commonRouter.mysql_pool.getConnection((connectionErr, connection) => {
        if (connectionErr) {
            console.log("inn error 1");
             res.status(500).send({
                status: "FAILURE",
                message: "internal server error 1",
            });
        } 
    // con.connect((err)  =>{
    //   if(err){
    //     console.log("Database Error ``")
    // }
        else {
           const get_service_query = `SELECT service_id,title,description,price,service_img,avg_rating,total_rating,extra,type,service_name from service where is_active=1 and service_name='${req.body.service_name}' limit ${req.body.limit}`;
            connection.query(get_service_query, function(err, rows, fields) {
                connection.release();
                if (err) {
                           console.log("error in insert service", err);
                            res.status(500).send({
                                status: "FAILURE",
                                message: "error in insert service",
                            });
                } 
                else {
                         res.send(rows)
                     }
        
             })
  
        }


        })
}



module.exports.addService = (req,res)=>{

    const postReq = {
        title:req.body.title,
        description:req.body.description,
        price:req.body.price,
        service_img:req.body.service_img,
        extra:req.body.extra,
        type:req.body.type,
        service_name:req.body.service_name,
        created_role:req.body.created_role,
        created_by:req.body.created_by,
        is_active:1,
        created_by:req.body.created_by,
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
        //    console.log(postReq);
           const register_user_query = "INSERT INTO service SET ?";
            connection.query(register_user_query,[postReq], function(err, rows, fields) {
                connection.release();
                if (err) {
                           console.log("error in insert service", err);
                            res.status(500).send({
                                status: "FAILURE",
                                message: "error in insert service",
                            });
                } 
                else {
                     if(rows && rows.affectedRows){
                         res.send({
                             status:'success',
                             msg:'new service has been created successfully'
                         })
                     }

                }
        
             })
  
        }


        })
}

module.exports.filterService=(req,res)=>{
    // console.log(req.body.min_price);

    var filterReq={
        search_by_value : req.body.search_by_value,
        min_price : req.body.min_price,
        max_price : req.body.max_price,
        min_rating : req.body.min_rating,
        max_rating : req.body.max_rating,
        search_by_type : req.body.search_by_type,
        search_by_service_name : req.body.search_by_service_name,
        page:req.body.page-1,
        limit:req.body.limit
    }

    // console.log(filterReq);
    commonRouter.mysql_pool.getConnection((connectionErr, connection) => {
        if (connectionErr) {
            console.log("inn error 1");
             res.status(500).send({
                status: "FAILURE",
                message: "internal server error 1",
            });
        } 
        else {
            // console.log(filterReq);
            var by_price_range = `price BETWEEN ${filterReq.min_price} AND ${filterReq.max_price} and`
            var by_service = ` service_name='${filterReq.search_by_service_name}' AND`
            var by_type = ` type=${filterReq.search_by_type}`
            var by_rating_range = `avg_rating BETWEEN ${filterReq.min_rating} AND ${filterReq.max_rating} AND` 

           const get_service_query = `SELECT * from service WHERE ${req.body.max_price!=undefined?by_price_range:''}${req.body.search_by_service_name!=undefined?by_service:''}${req.body.search_by_type!=undefined?by_type:''}${req.body.max_rating!=undefined?by_rating_range:''} is_active=1 AND title LIKE '%${filterReq.search_by_value}%' LIMIT ${filterReq.limit} offset ${filterReq.page*2}`;

            connection.query(get_service_query, function(err, rows, fields) {
                connection.release();
                if (err) {
                           console.log("error in filter service", err);
                            res.status(500).send({
                                status: "FAILURE",
                                message: "error in filter service",
                            });
                } 
                else {
                         res.send(rows)
                     }
        
             })
  
        }


        })

}