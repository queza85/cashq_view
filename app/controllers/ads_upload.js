

module.exports = {
    upload(req, res){
        // // console.log(req);
        // console.log(req.body.adsName);
        // console.log(req.body.adsType);
        // console.log(req.body.startDate);
        // console.log(req.body.endDate);
        // console.log(req.files);
        
        // // for(var file in req.files){
        // //     console.log(file.name);
        // //     console.log(file.path);
        // //     console.log(file.type);
        // // }
        // var item = req.body;
        // var upload = multer({
        //     storage: multerS3({
        //         s3: s3,
        //         bucket: 'cashq',
        //         metadata: function (req, file, cb) {
        //             cb(null, { fieldName: file.fieldname });
        //         },
        //         key: function (req, file, cb) {
        //             cb(null, Date.now().toString())
        //         }
        //     })
        // });

        // console.log(item);
        // return res.status(200).send('uploaded!!!!!!!!!!!');
    }
};