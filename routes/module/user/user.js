const commonRouter = require('../../commonRouter')


//register user
//add file
module.exports.registerUser = (req,res,next)=>{

    const postReq = {
        name:req.body.name,
        gender:req.body.gender,
        photo:'',
        is_active:1,
        created_by:req.body.created_by,
    }
    if(req.body.mobile!=null){
        postReq['mobile'] = req.body.mobile
    }
    if(req.body.email!=null){
        postReq['email'] = req.body.email
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
           const register_user_query = "INSERT INTO users SET ?";
            connection.query(register_user_query,[postReq], function(err, rows, fields) {
                connection.release();
                if (err) {
                           console.log("error in register user", err);
                            res.status(500).send({
                                status: "FAILURE",
                                message: "error in register user",
                            });
                } 
                else {
                     if(rows && rows.affectedRows){
                         res.send({
                             status:'success',
                             msg:'user has been register successfully'
                         })
                     }

                }
        
             })
  
        }


        })
}


module.exports.getMyProfile = (req,res)=>{
    const postReq = {
        user_id:req.body.user_id
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
           const user_query = `select * from users where user_id='${postReq.user_id}' `;
            connection.query(user_query, function(err, rows, fields) {
                connection.release();
                if (err) {
                           console.log("error in register user", err);
                            res.status(500).send({
                                status: "FAILURE",
                                message: "error in register user",
                            });
                } 
                else {
                         res.send(rows)
                }
        
             })
  
        }


        })

}