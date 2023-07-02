const commonRouter = require('../../commonRouter')



module.exports.getOverviewReview = (req,res)=>{
    // for overall at index = 0
    // for rating 5 at index = 1
    // for rating 4 at index = 2
    // for rating 3 at index = 3
    // for rating 2 at index = 4
    // for rating 1 at index = 5

    commonRouter.mysql_pool.getConnection((connectionErr, connection) => {
        if (connectionErr) {
            console.log("inn error 1");
             res.status(500).send({
                status: "FAILURE",
                message: "internal server error 1",
            });
        } 
        else {
           const sql_query = `( SELECT COALESCE( AVG(rating),0) as avg_rating ,COUNT(rating) as total_rating   FROM review  WHERE review.is_active=1  AND role='${req.body.role}' AND review_to=${req.body.review_to} ) 
           UNION ALL
           ( SELECT  COALESCE( AVG(rating),0) as avg_rating ,COUNT(rating) as total_rating  FROM review  WHERE review.is_active=1  AND role='${req.body.role}' AND review_to=${req.body.review_to}  and rating=5) UNION ALL
           ( SELECT COALESCE( AVG(rating),0) as avg_rating ,COUNT(rating) as total_rating  FROM review  WHERE review.is_active=1  AND role='${req.body.role}' AND review_to=${req.body.review_to}  and rating=4) UNION ALL
           ( SELECT COALESCE( AVG(rating),0) as avg_rating ,COUNT(rating) as total_rating  FROM review  WHERE review.is_active=1  AND role='${req.body.role}' AND review_to=${req.body.review_to}  and rating=3) UNION ALL
           ( SELECT COALESCE( AVG(rating),0) as avg_rating ,COUNT(rating) as total_rating  FROM review  WHERE review.is_active=1  AND role='${req.body.role}' AND review_to=${req.body.review_to}  and rating=2) UNION ALL
           ( SELECT COALESCE( AVG(rating),0) as avg_rating ,COUNT(rating) as total_rating  FROM review  WHERE review.is_active=1  AND role='${req.body.role}' AND review_to=${req.body.review_to}  and rating=1) `;
            connection.query(sql_query, function(err, rows, fields) {
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
module.exports.getReview = (req,res)=>{


    commonRouter.mysql_pool.getConnection((connectionErr, connection) => {
        if (connectionErr) {
            console.log("inn error 1");
             res.status(500).send({
                status: "FAILURE",
                message: "internal server error 1",
            });
        } 
        else {
           const get_service_query = `SELECT review_id,comment,rating,review.created_date,user_id,name,photo FROM review JOIN users ON review.review_by=users.user_id WHERE review.is_active=1  AND role='${req.body.role}' AND review_to=${req.body.review_to}`;
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




module.exports.postReview = (req,res)=>{
    
    var postReq = {
        comment:req.body.comment,
        rating:req.body.rating,
        role: req.body.role,
        review_by:req.body.review_by,
        review_to:req.body.review_to,
        created_by:req.body.created_by,
        is_active:1
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
            connection.beginTransaction(function(err) {
                if (err) {
                     res.status(500).send({
                        status: "FAILURE",
                        message: "Transaction Error in give review",
                    });
                }
                else{
                    const insert_rating_query = `insert into review set ? `;
                    connection.query(insert_rating_query,[postReq], function(err, rows, fields) {
                        if (err) {
                            console.log("error in insert service", err);
                            connection.release()
                            return connection.rollback(function() {
                                res.status(500).send({
                                    status: "FAILURE",
                                    message: "error in insert service",
                                });
                            });
                        } 
                        else {
                            if(rows && rows.affectedRows){
                                const review_query = `select avg(rating), count(rating) from review where is_active=1 and review_to='${postReq.review_to}' `;
                                connection.query(review_query, function(err, rows, fields) {
                                    if (err) {
                                        connection.release()
                                        return connection.rollback(function() {
                                            res.status(500).send({
                                                status: "FAILURE",
                                                message: "error select review",
                                            });
                                        });
                                    } 
                                    else {
                                        //  return res.send(rows)
                                        var result = Object.values(rows[0])
                                        const updateReq = {
                                                avg_rating:result[0],
                                                total_rating: result[1]
                                            }
                                           const update_service_query = `update service set ? where is_active=1 and service_id='${postReq.review_to}' `;
                                            connection.query(update_service_query,[updateReq], function(err, rows, fields) {
                                                if (err) {
                                                        console.log("error in insert service", err);
                                                        connection.release()
                                                        return connection.rollback(function() {
                                                            res.status(500).send({
                                                                status: "FAILURE",
                                                                message: "error in insert service",
                                                            });
                                                        });
                                                } 
                                                else {
                                                   
                                                    connection.commit(function(commitErr) {
                                                        connection.release();
                                                        if (commitErr) {
                                                            console.log(commitErr);
                                                            return connection.rollback(function(err2) {
                                                                res.status(500).send({
                                                                    status: "FAILURE",
                                                                    message: "commit error",
                                                                });
                                                            });

                                                        }
                                                        else{
                                                            res.send({
                                                                status: "success",
                                                                message: "thanks to give us rating",
                                                            });

                                                        }

                                                    });

                                
                                                }
                            
                                              })
                    
                                    }
                            
                                 })

                            }
                            else{
                                connection.release()
                                return connection.rollback(function() {
                                    res.status(500).send({
                                        status: "FAILURE",
                                        message: "error after insert in review",
                                    });
                                });

                            }

                        }
    
                      })
        
                }

            })


          
  
        }


        })
}