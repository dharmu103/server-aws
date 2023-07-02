const commonRouter = require('../../commonRouter')


//register partner
module.exports.registerPartner = (req,res)=>{

    const postReq = {
        name:req.body.name,
        photo:req.file.path,
        mobile:req.body.mobile,
        email:req.body.email,
        password:req.body.password,
        dob:req.body.dob,
        gender:req.body.gender,
        is_vaccinated:req.body.is_vaccinated,
        designation:req.body.designation,
        is_active:1,
        created_role:req.body.created_role,
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
           console.log(postReq);
           const register_partner_query = "INSERT INTO partner SET ?";
            connection.query(register_partner_query,[postReq], function(err, rows, fields) {
                connection.release();
                if (err) {
                           console.log("error in register partner", err);
                            res.status(500).send({
                                status: "FAILURE",
                                message: "error in register partner",
                            });
                } 
                else {
                     if(rows && rows.affectedRows){
                         res.send({
                             status:'success',
                             msg:'partner has been register successfully'
                         })
                     }

                }
        
             })
  
        }


        })
}


// get my all partner
module.exports.getPartnerByRole = (req,res)=>{


    commonRouter.mysql_pool.getConnection((connectionErr, connection) => {
        if (connectionErr) {
            console.log("inn error 1");
             res.status(500).send({
                status: "FAILURE",
                message: "internal server error 1",
            });
        } 
        else {
           const sql_query = `SELECT partner_id,name,photo,designation,is_vaccinated, IFNULL( AVG(rating),0) AS avg_rating,IFNULL( COUNT(rating),0) as total_rating from partner JOIN review on partner.partner_id=review.review_to WHERE partner.is_active and review.role='${req.body.role}' limit ${req.body.limit}`;
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

// get my all partner
module.exports.getAllPartner = (req,res)=>{
    // const postReq = {
    //     partner_id:req.body.partner_id
    // }

    commonRouter.mysql_pool.getConnection((connectionErr, connection) => {
        if (connectionErr) {
            console.log("inn error 1");
             res.status(500).send({
                status: "FAILURE",
                message: "internal server error 1",
            });
        } 
        else {
           const partner_query = `select * from partner  `;
            connection.query(partner_query, function(err, rows, fields) {
                connection.release();
                if (err) {
                           console.log("error in register partner", err);
                            res.status(500).send({
                                status: "FAILURE",
                                message: "error in register partner",
                            });
                } 
                else {
                         res.send(rows)
                }
        
             })
  
        }


        })

}
// get my all partner
module.exports.getSinglePartner = (req,res)=>{
    const postReq = {
        partner_id:req.body.partner_id
    }

    console.log(req.body);

    commonRouter.mysql_pool.getConnection((connectionErr, connection) => {
        if (connectionErr) {
            console.log("inn error 1");
             res.status(500).send({
                status: "FAILURE",
                message: "internal server error 1",
            });
        } 
        else {
           const partner_query = `select * from partner where partner_id='${postReq.partner_id}' `;
            connection.query(partner_query, function(err, rows, fields) {
                connection.release();
                if (err) {
                           console.log("error in  partner", err);
                            res.status(500).send({
                                status: "FAILURE",
                                message: "error in  partner",
                            });
                } 
                else {
                         res.send(rows)
                }
        
             })
  
        }


        })

}