$(function(){
    function initToolbarBootstrapBindings() {
      var fonts = ['Serif', 'Sans', 'Arial', 'Arial Black', 'Courier', 
            'Courier New', 'Comic Sans MS', 'Helvetica', 'Impact', 'Lucida Grande', 'Lucida Sans', 'Tahoma', 'Times',
            'Times New Roman', 'Verdana'],
            fontTarget = $('[title=Font]').siblings('.dropdown-menu');
      $.each(fonts, function (idx, fontName) {
          fontTarget.append($('<li><a data-edit="fontName ' + fontName +'" style="font-family:\''+ fontName +'\'">'+fontName + '</a></li>'));
      });
      $('a[title]').tooltip({container:'body'});
    	$('.dropdown-menu input').click(function() {return false;})
		    .change(function () {$(this).parent('.dropdown-menu').siblings('.dropdown-toggle').dropdown('toggle');})
        .keydown('esc', function () {this.value='';$(this).change();});

      $('[data-role=magic-overlay]').each(function () { 
        var overlay = $(this), target = $(overlay.data('target')); 
        overlay.css('opacity', 0).css('position', 'absolute').offset(target.offset()).width(target.outerWidth()).height(target.outerHeight());
      });
      if ("onwebkitspeechchange"  in document.createElement("input")) {
        var editorOffset = $('#editor').offset();
        $('#voiceBtn').css('position','absolute').offset({top: editorOffset.top, left: editorOffset.left+$('#editor').innerWidth()-35});
      } else {
        $('#voiceBtn').hide();
      }
	};
	function showErrorAlert (reason, detail) {
		var msg='';
		if (reason==='unsupported-file-type') { msg = "Unsupported format " +detail; }
		else {
			console.log("error uploading file", reason, detail);
		}
		$('<div class="alert"> <button type="button" class="close" data-dismiss="alert">&times;</button>'+ 
		 '<strong>File upload error</strong> '+msg+' </div>').prependTo('#alerts');
	};
    initToolbarBootstrapBindings();  
	$('#editor').wysiwyg({ fileUploadError: showErrorAlert} );
    window.prettyPrint && prettyPrint();
  });


$(document).ready(function() {
	$('.datepicker').datepicker();
});

var uploadImagePath;

function add_activity(){
	var title = $("#txt_name").val();
	var price = $("#txt_price").val();
	var city= $("#txt_place").val();
	var startTime= $("#txt_start_date").val();
	var endTime= $("#txt_end_date").val();
	var totalPeoples= $("#txt_count").val();
	var content= $("#editor").html();
	var picture= uploadImagePath;
	
	if(title==null || title==undefined || title==""){ alert("活动标题不能为空");return false; }
	if(city==null || city==undefined || city==""){ alert("活动地点不能为空");return false; }
	if(startTime==null || startTime==undefined || startTime==""){ alert("活动开始时间不能为空");return false; }
	if(endTime==null || endTime==undefined || endTime==""){ alert("活动结束时间不能为空");return false; }
	if(startTime!=null && endTime!=null && startTime > endTime){alert("开始时间不能大于结束时间"); return false;}
	if(totalPeoples==null || totalPeoples==undefined || totalPeoples==""){ alert("活动人数不能为空");return false; }
	if(price==null || price==undefined || price==""){ alert("活动费用不能为空");return false; }
	if(picture==null || picture==undefined || picture==""){ alert("缺少封面图片");return false; }
	if(!  /^[1-9]\d*$/.test(totalPeoples) && ! /^[1-9]\d*\.\d*|0\.\d*[1-9]\d*$/.test(totalPeoples)){alert("请输入正数活动人数"); return false;}
	if(!  /^[1-9]\d*$/.test(price) && ! /^[1-9]\d*\.\d*|0\.\d*[1-9]\d*$/.test(price)){alert("请输入正数活动费用"); return false;}
	
	
	var url = "/ziteng/v/w/activity/createNewActivity.do";
	var params = { "title":title, "price":price, "city":city, "startTimeString":startTime, "endTimeString":endTime,
				"totalPeoples":totalPeoples,"content":content, "picture":picture};
	
	$.post(url ,params, function(data){
		var json = eval("(" + data + ")");
		if(json.success){
			window.location.href = "activity_list.html";
		}else{
			alert(json.msg);
		}
	});
}


function uploadImage(){
	var fileName = $("#fileInput").val();
	
	if(fileName == null || fileName == undefined || fileName==""){	alert("请选择上传文件");	return false;}
	if(!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(fileName)){	 alert("图片类型必须是.gif,jpeg,jpg,png中的一种"); return false; }

	$.ajaxFileUpload({
	        url:'/ziteng/v/tools/uploadImage.do',//处理图片脚本
	        type: 'post',
	        secureuri :false,
	        fileElementId :'fileInput',	//注意-1：file控件id，改控件的name必须为file
	        dataType : 'json',
	        data:{'type':'activity'}, 		//注意-2：type的取值为 activity | guide | hotel | user 
	        success : function (datas, status){
	            var json = datas;		//注意-3：datas本身就是json对象。	
	            if(json.success){
	            	uploadImagePath = json.datas.filePath;
//	            	alert(uploadImagePath);
	            }
	            alert(json.msg);
	        },
	        error: function(datas, status, e){
	            alert(e);
	        }
	}); 
	return false;
}


