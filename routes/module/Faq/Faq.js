const commonRouter = require('../../commonRouter')


// get faq
module.exports.getFaqByRole = (req,res)=>{
// this is for  service only

    commonRouter.mysql_pool.getConnection((connectionErr, connection) => {
        if (connectionErr) {
            console.log("inn error 1");
             res.status(500).send({
                status: "FAILURE",
                message: "internal server error 1",
            });
        } 
        else {
           const sql_query = `select faq_id,question,answer from faq where is_active=1 and role='${req.body.role}' and map_to='${req.body.service_id}' and type='${req.body.type}' limit ${req.body.limit}`;
            connection.query(sql_query, function(err, rows, fields) {
                connection.release();
                if (err) {
                           console.log("error in get faq", err);
                            res.status(500).send({
                                status: "FAILURE",
                                message: "error in get faq",
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
module.exports.postFaq = (req,res)=>{

    const postReq = {
        question:req.body.question,
        answer:req.body.answer,
        role:req.body.role,
        map_to:req.body.map_to,
        type:req.body.type || null,
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
           const sql_query = "INSERT INTO faq SET ?";
            connection.query(sql_query,[postReq], function(err, rows, fields) {
                connection.release();
                if (err) {
                           console.log("error in insert faq", err);
                            res.status(500).send({
                                status: "FAILURE",
                                message: "error in insert faq",
                            });
                } 
                else {
                     if(rows && rows.affectedRows){
                         res.send({
                             status:'success',
                             msg:'faq has been insert successfully'
                         })
                     }

                }
        
             })
  
        }


        })
}
