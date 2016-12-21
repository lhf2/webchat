$(function () {
    $("#filename").uploadPreview({ Img: "ImgPr1", Width: 80, Height: 80});
//多选图片

});
var isDown = true;
jQuery.fn.extend({
    uploadPreview: function (opts) {
        var _self = this,
            _this = $(this);
        opts = jQuery.extend({
            Img: "ImgPr",
            Width: 100,
            Height: 100,
            ImgType: ["jpeg", "jpg", "bmp", "png"],
            Callback: function () {}
        }, opts || {});
        _self.getObjectURL = function (file) {
            var url = null;
            if (window.createObjectURL != undefined) {
                url = window.createObjectURL(file);
            } else if (window.URL != undefined) {
                url = window.URL.createObjectURL(file);
            } else if (window.webkitURL != undefined) {
                url = window.webkitURL.createObjectURL(file);
            }
            return url;
        };
        _this.change(function () {
        	$("#tipphoto .tip-txt").text("");
    		$("#tipphoto .tip-img img").attr("src","");
            if (this.value) {
                if (!RegExp("\.(" + opts.ImgType.join("|") + ")$", "i").test(this.value.toLowerCase())) {
                	alert("选择文件错误,图片类型必须是" + opts.ImgType.join("，") + "中的一种!");
                    this.value = "";
                    return false;
                }
                if(this.files[0])
                {
                	var fileSize = this.files[0].size;
                	var size = fileSize / 1024 / 1024;
                    if (size > 0.5) {
                    	alert("照片不能大于500KB,请重新上传！");
                        isDown = false;
                        return false;
                    }else{
                        isDown = true;
                    }
                    
                }
                if ($.support) {
                    try {
                        $("#" + opts.Img).attr('src', _self.getObjectURL(this.files[0]));
                    } catch (e) {
                        var src = "";
                        var obj = $("#" + opts.Img);
                        var div = obj.parent("div")[0];
                        _self.select();
                        if (top != self) {
                            window.parent.document.body.focus();
                        } else {
                            _self.blur();
                        }
                        src = document.selection.createRange().text;
                        document.selection.empty();
                        obj.hide();
                        obj.parent("div").css({
                            'filter': 'progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)',
                            'width': opts.Width + 'px',
                            'height': opts.Height + 'px'
                        });
                        div.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = src;
                    }
                } else {
                    $("#" + opts.Img).attr('src', _self.getObjectURL(this.files[0]));
                }
                opts.Callback();
            }
        });
    }
});







                                

                               

                                    $('.camera-box').hide();
                                    $('.mask-box').hide();
                                   localStorage.setItem("base64",'');
                                   
                                    var upload = document.getElementById('filename');
                                    var camera = document.getElementById('playeraddress');
                                    var tmp=null,result,div;
                                    upload.addEventListener('change',mbUploadImg.handleFile,false);
                                    camera.addEventListener('change',mbUploadImg.handleFile2,false);
                                    var count=1;
                                    mbUploadImg.init({
                                        changeSize:false,
                                        maxWidth : 150,
                                        maxHeight :300,
                                        imgHandle:function(src){
                                                if(isDown){
                                                     $('<div style="float: left;" ><img src="'+ src +'" /></div>').appendTo('.add-img');
                                                }
                                             $('.camera-box').hide();
                                             $('.mask-box').hide();
                                             var v_exist=localStorage.getItem("base64");
                                             var s=src.replace('data:image/png;base64,', '');
                                             var s1=s.replace('data:image/jpeg;base64,', '');
                                             
                                             if(v_exist.length>20){
                                                 localStorage.setItem("base64",localStorage.getItem("base64")+"|"+s1);
                                             }else{
                                                 localStorage.setItem("base64",s1);
                                             }  
                                          }
                                   })


                              