
var formidable = require('formidable');
var fs = require('fs');
var path = require('path');

module.exports = function(Paper) {
   
Paper.upload = function(ctx,cb){
    var req= ctx.req;
    var form  = new formidable.IncomingForm();
        form.keepExtensions = true;
        form.type = "multipart";
        form.uploadDir = path.join(__dirname,'../../client/papers');
    
    
    
    form.parse(req,function(err,fields,files){
        if(err)cb(err);
        else{
              var url=path.basename(files.file.path);
        Paper.create({
            url:url,
            year_id:fields.year,
            subject_id:fields.subject,
            level_id:fields.level,
            paperno:fields.paperno
            },function(error,data){
             if(err)cb(error);
            cb(null,data);
        }); 
        
    
    
    
    
    }
    });
    
    
   
};

    

Paper.remoteMethod(
  'upload',
  {
    description: 'Uploads a file',
    accepts: [
    { arg: 'ctx', type: 'object', http: {source : 'context'}}
    ],
    returns: {
      arg: 'fileObject', type: 'object'
    },
    http: {verb: 'post'}
  }

);
};

             
