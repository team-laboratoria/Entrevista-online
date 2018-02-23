var widget = uploadcare.Widget('[role=uploadcare-uploader]');
widget.onUploadComplete(function(info) {
  var urlVideo = info.cdnUrl;
  console.log(urlVideo);
});
