const userController = require('./module/user/user')
const partnerController = require('./module/partner/partner')
const serviceController = require('./module/service/service')
const inviteController = require('./module/invite/invite')
const announcementController = require('./module/announcement/announcement')
const reviewController = require('./module/review/review')
const offerController = require('./module/Offers/offers')
const faqController = require('./module/Faq/Faq')


const {cpUPload} = require('./module/user/userFileValidation')
const {cpUPloadService} = require('./module/service/serviceFileValidation')
const { inviteUpload } = require('./module/invite/inviteFileValidation')
const { partnerUpload } = require('./module/partner/partnerFileValidation')
const { announcementUpload } = require('./module/announcement/announcementFileValidation')

const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

module.exports = function(app) {
    
    //for user api
    app.post("/api/v1/employee/getMyProfile",userController.getMyProfile);
    app.post("/api/v1/user/register",cpUPload,userController.registerUser);


    //for user post api
    app.post("/api/v1/employee/registerPartner",partnerUpload,partnerController.registerPartner);
    //for get all partner
    app.post("/api/v1/employee/getAllPartner",partnerController.getAllPartner);
    // to get all partner by role
    app.post("/api/v1/employee/getPartnerByRole",partnerController.getPartnerByRole);
    // //for single partner
    app.post("/api/v1/employee/getSinglePartner",partnerController.getSinglePartner);



    //for service api
    app.post("/api/v1/employee/addService",cpUPloadService,serviceController.addService);
    app.post("/api/v1/employee/getServiceByLimit",serviceController.getServiceByLimit);
    app.post("/api/v1/employee/filterService",upload.none(),serviceController.filterService);

    //for announcement api
    app.post("/api/v1/employee/postAnnouncement",announcementUpload,announcementController.postAnnouncement);
    app.post("/api/v1/employee/getAnnouncement",announcementController.getAnnouncement);


    //for invite
    app.post("/api/v1/employee/postInvite",inviteUpload,inviteController.postInvite);
    app.post("/api/v1/employee/getInvite",inviteController.getInvite);


    //for review api
    //for post review
    app.post("/api/v1/employee/postReview",reviewController.postReview);
    //to get all review list
    app.post("/api/v1/employee/getReview",reviewController.getReview);
    // to get overview of review 
    app.post("/api/v1/employee/getOverviewReview",reviewController.getOverviewReview);


    //for all offers api
    // to insert offer
    app.post("/api/v1/employee/postOffer",offerController.postOffer);
    // to get offers
    app.post("/api/v1/employee/getOffers",offerController.getOffers);


    //for all faq api
    // to insert offer
    app.post("/api/v1/employee/postFaq",faqController.postFaq);
    // to get offers
    app.post("/api/v1/employee/getFaqByRole",faqController.getFaqByRole);



}
