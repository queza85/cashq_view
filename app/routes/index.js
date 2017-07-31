const uploadController = require('../controllers').adsupload;


const multer  = require('multer');
const multerS3 = require('multer-s3');
const fs = require('fs');
const AWS = require('aws-sdk');
AWS.config.loadFromPath('app/configs/config.json');
AWS.config.update({
    signatureVersion: 'v4'
});
const s3 = new AWS.S3();
const dynamoDB = new AWS.DynamoDB.DocumentClient();

module.exports = (app) => {
  //view routes
  app.get('/',function(req,res){
    res.render('index');
  });
  
  var upload = multer({
      dest:'uploads/',
      storage: multerS3({
          s3: s3,
          bucket: 'cashq',
          acl: 'public-read',
          metadata: function (req, file, cb) {
              cb(null, { fieldName: file.fieldname });
          },
          key: function (req, file, cb) {
              var filenames = file.originalname.split(".");
              cb(null,  req.body.adsName+'/'+req.body.adsType+'/'+Date.now().toString()+"."+filenames[filenames.length-1]);
          }
      })
  });
  
  app.post('/adsupload', upload.array('files'), function (req, res, next) {
    var params = {
      TableName:'Ads',
      Item:{
          "adsId": req.body.adsName+"_"+req.body.adsType+"_"+req.body.startDate+"_"+req.body.endDate,
          "adsName": req.body.adsName,
          "adsType": req.body.adsType,
          "adsCash": req.body.adsCash,
          "startDate": req.body.startDate,
          "endDate": req.body.endDate,
          "urls": []      
          }
      };
      
      
      for(var i=0; i<req.files.length;i++){
        params.Item.urls.push(req.files[i].location);
      }
      
      dynamoDB.put(params, function(err, data) {
          if (err) {
              console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
          } else {
              console.log("Added item:", JSON.stringify(data));
          }
          
          res.send({result:'success'});
      });
  });
};