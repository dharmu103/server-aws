const commonRouter = require('../../commonRouter')


//register user
//add file
module.exports.postInvite = (req,res,next)=>{

    console.log(req.body);
    console.log(req.file);
    console.log(req.files);

    const postReq = {
        title:req.body.title,
        description:req.body.description,
        reffer_code:req.body.reffer_code,
        invite_img:req.file.path,
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
           const register_user_query = "INSERT INTO invite SET ?";
            connection.query(register_user_query,[postReq], function(err, rows, fields) {
                connection.release();
                if (err) {
                           console.log("error in invite", err);
                            res.status(500).send({
                                status: "FAILURE",
                                message: "error in invite",
                            });
                } 
                else {
                     if(rows && rows.affectedRows){
                         res.send({
                             status:'success',
                             msg:'Invite has been updated successfully'
                         })
                     }

                }
        
             })
  
        }


        })
}


module.exports.getInvite = (req,res)=>{
    const postReq = {
        invite_id:req.body.invite_id
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
           const invite_query = `select * from invite where invite_id='${postReq.invite_id}' `;
            connection.query(invite_query, function(err, rows, fields) {
                connection.release();
                if (err) {
                           console.log("error in invite", err);
                            res.status(500).send({
                                status: "FAILURE",
                                message: "error in invite user",
                            });
                } 
                else {
                         res.send(rows)
                }
        
             })
  
        }


        })

}