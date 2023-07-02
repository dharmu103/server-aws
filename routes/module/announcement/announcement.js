const commonRouter = require('../../commonRouter')


//register user
//add file
module.exports.postAnnouncement = (req,res)=>{

    console.log(req.body);
    console.log(req.file);
    console.log(req.files);

    const postReq = {
        title:req.body.title,
        description:req.body.description,
        service_id:req.body.service_id,
        announcement_img:req.file.path,
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
           const register_user_query = "INSERT INTO announcement SET ?";
            connection.query(register_user_query,[postReq], function(err, rows, fields) {
                connection.release();
                if (err) {
                           console.log("error in announcement", err);
                            res.status(500).send({
                                status: "FAILURE",
                                message: "error in announcement",
                            });
                } 
                else {
                     if(rows && rows.affectedRows){
                         res.send({
                             status:'success',
                             msg:'announcement has been updated successfully'
                         })
                     }

                }
        
             })
  
        }


        })
}


module.exports.getAnnouncement = (req,res)=>{
    const postReq = {
        announcement_id:req.body.announcement_id
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
           const announcement_query = `select * from announcement`;
            connection.query(announcement_query, function(err, rows, fields) {
                connection.release();
                if (err) {
                           console.log("error in announcement", err);
                            res.status(500).send({
                                status: "FAILURE",
                                message: "error in announcement user",
                            });
                } 
                else {
                         res.send(rows)
                }
        
             })
  
        }


        })

}