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
	var url = window.location.href;
	if(url.indexOf("=")>=0){
		try{
			guideId = url.substring(url.lastIndexOf('=')+1, url.length);
		}catch(err){
			guideId = null;
		}
	}else{
		guideId = null;
	}
	
	
	if(guideId==null || guideId==undefined || guideId==""){			//add new guide.
		loadArea();
		loadCarDegree();
	}else{				//modify guide.
		isModifyGuide = true;
		loadGuideInfoToModify();
	}
	
});

var uploadImagePath;
var guideId;
var carDegrees2Price = new Array();
var isModifyGuide = false;

function add_or_modify_guide(){
	var name = $("#txt_name").val();
	var priceWayId = $("#sel_price_type").val();
	var departAreaId= $("#sel_start_area").val();
	var arriveAreaId= $("#sel_end_area").val();
	var kms= $("#txt_km").val();
	var days= $("#txt_days").val();
	var detail= $("#editor").html();
	var coverImage= uploadImagePath;
	var taoBaoLink = $("#txt_taoBaoLink").val();
	
	if(name==null || name==undefined || name==""){ alert("攻略Title不能为空");return false; }
	if(priceWayId==null || priceWayId==undefined || priceWayId==""){ alert("计价类型不能为空");return false; }
	if(departAreaId==null || departAreaId==undefined || departAreaId==""){ alert("Departure Area不能为空");return false; }
	if(arriveAreaId==null || arriveAreaId==undefined || arriveAreaId==""){ alert("Arrival Area不能为空");return false; }
	if(kms==null || kms==undefined || kms==""){ alert("里程数不能为空");return false; }
	if(days==null || days==undefined || days==""){ alert("Travel Days不能为空");return false; }
	if(coverImage==null || coverImage==undefined || coverImage==""){ alert("缺少Cover图片");return false; }
	if(!  /^[1-9]\d*$/.test(kms) && ! /^[1-9]\d*\.\d*|0\.\d*[1-9]\d*$/.test(kms)){alert("Please type in the 正数里程"); return false;}
	if(!  /^[1-9]\d*$/.test(days)){alert("Please type in the 整数天数"); return false;}
	
	
	var params;
	if(isModifyGuide){
		var url = "/ziteng/v/w/travelGuide/modfiy.do";
		params = {"id":guideId, "name":name, "priceWayId":priceWayId, "departAreaId":departAreaId, "arriveAreaId":arriveAreaId, "kms":kms,
				"days":days,"detail":detail, "coverImage":coverImage,"taoBaoLink":taoBaoLink};
	}else{	//add gonglue.
		var url = "/ziteng/v/w/travelGuide/addGuide.do";
		params = { "name":name, "priceWayId":priceWayId, "departAreaId":departAreaId, "arriveAreaId":arriveAreaId, "kms":kms,
				"days":days,"detail":detail, "coverImage":coverImage,"taoBaoLink":taoBaoLink};
	}
	$.post(url ,params, function(data){
		var json = eval("(" + data + ")");
		if(json.success){
			if(! isModifyGuide){
				guideId = json.datas.guideId;
			}
			addGuide2CarDegreePrice();
		}else{
			alert(json.msg);
		}
	});
}



function loadArea(){
	var url = "/ziteng/area/getAllAreas.do";
	var param = {};
	$.post(url,param,function(data){
		var json = eval('(' + data +')');
		if(json.success){
			var areas = json.datas.areas;
			setAreaDiv(areas);
		}else{
			alert(json.msg);
		}
	});
}

function loadCarDegree(){
	var url = "/ziteng/car/getAllCarDegrees.do";
	var param = {};
	$.post(url,param,function(data){
		var json = eval('(' + data +')');
		if(json.success){
			$("#tbody").empty();
			var carDegrees = json.datas.carDegrees;
			setCarDegreeDiv(carDegrees);
		}else{
			alert(json.msg);
		}
	});
}

function setAreaDiv(areas){
	for(var i = 0; i < areas.length; i++){
		var $opt = '<option value="'+ areas[i].id+'"' + '>' + areas[i].name +"</option>";
		$("#sel_start_area").append($opt);
		$("#sel_end_area").append($opt);
	}
}

function setCarDegreeDiv(carDegrees){
	for(var i = 0; i < carDegrees.length; i++){
		var obj =  new Object();
		obj.travelGuideId = guideId;
		obj.carDegreeId = carDegrees[i].id;
		carDegrees2Price[i] = obj;
		var $car_td = '<tr><td>'+carDegrees[i].name+'</td><td id="car_id_'+i+'" onclick="td_car_degree_price('+i+');">——</td></tr>';
		$("#tbody").append($car_td);
	}
}



function change_price_type(){
	var price_type = $("#sel_price_type").val();
	update_price_type(price_type);
}

function update_price_type(price_type){
	var price_pre = "";
	if(price_type==1) {		
		price_pre = "每天价格"; 
		for(var i = 0; i < carDegrees2Price.length; i++){
			if(carDegrees2Price[i].pricePerDay!=null){
				$("#car_id_"+i).html(carDegrees2Price[i].pricePerDay);
			}else{
				$("#car_id_"+i).html("——");
			}
		}
	}
	if(price_type==2){ 		
		price_pre = "每公里价格"; 
		for(var i = 0; i < carDegrees2Price.length; i++){
			if(carDegrees2Price[i].pricePerKm!=null){
				$("#car_id_"+i).html(carDegrees2Price[i].pricePerKm);
			}else{
				$("#car_id_"+i).html("——");
			}
		}
	}
	if(price_type==3){		
		price_pre = "每路线价格";	
		for(var i = 0; i < carDegrees2Price.length; i++){
			if(carDegrees2Price[i].originalPrice!=null){
				$("#car_id_"+i).html(carDegrees2Price[i].originalPrice);
			}else{
				$("#car_id_"+i).html("——");
			}
		}
	}
	if(price_type==4){		
		price_pre = "每路线价格";	
		for(var i = 0; i < carDegrees2Price.length; i++){
			if(carDegrees2Price[i].originalPrice!=null){
				$("#car_id_"+i).html(carDegrees2Price[i].originalPrice);
			}else{
				$("#car_id_"+i).html("——");
			}
		}
	}
	$("#td_price_type").html(price_pre);
}



function td_car_degree_price(idx){
	$("#txt_car_degree_price").val("");
	$("#txt_td_id").val(idx);
	$('#myModal').modal('show');
}

function save_car_degree_price(){
	var price = $("#txt_car_degree_price").val();
	
	if(price ==null || price == undefined || price == ""){ alert("Please type in the 价格"); return false; }
	if(!  /^[1-9]\d*$/.test(price)){alert("Please type in the 正整数价格"); return false;}
	
	$('#myModal').modal('hide');
	
	var txt_td_id = $("#txt_td_id").val();
	$("#car_id_"+txt_td_id).html(price);
	
	var priceWayId = $("#sel_price_type").val();
	if(priceWayId == 1){ carDegrees2Price[txt_td_id].pricePerDay = price; 	};
	if(priceWayId == 2){ carDegrees2Price[txt_td_id].pricePerKm = price; 	};
	if(priceWayId == 3){ carDegrees2Price[txt_td_id].originalPrice = price; };
	if(priceWayId == 4){ carDegrees2Price[txt_td_id].originalPrice = price; };
}


function addGuide2CarDegreePrice(){
	var cdPrices = [];
	var priceWayId = $("#sel_price_type").val();
	
	var idx = 0;
	for(var i = 0; i < carDegrees2Price.length; i++){
		carDegrees2Price[i].travelGuideId = guideId;
		if(priceWayId == 1 && carDegrees2Price[i].pricePerDay!=null){     cdPrices.push(carDegrees2Price[i]); 	};
		if(priceWayId == 2 && carDegrees2Price[i].pricePerKm !=null ){    cdPrices.push(carDegrees2Price[i]);	};
		if(priceWayId == 3 && carDegrees2Price[i].originalPrice !=null){  cdPrices.push(carDegrees2Price[i]); };
		if(priceWayId == 4 && carDegrees2Price[i].originalPrice !=null){  cdPrices.push(carDegrees2Price[i]); };
	}
	var resultInfo = isModifyGuide ? "Change成功": "添加成功";
	if(cdPrices.length<=0){
		alert(resultInfo);
	}
	
	var url = "/ziteng/v/w/travelGuide/addGuidePrice.do";
	 $.ajax({  
         url:url,  
         data:JSON.stringify(cdPrices),  
         type:"post",  
         dataType:"json",      
    	 contentType:"application/json", 
         success:function(data){  
//        	 var json = eval("(" + data +")");
        	 var msg = isModifyGuide ? "Change成功": "添加成功";
        	 alert(msg);

         },  
         error:function(){  
             alert("添加失败，请重新Confirm 数据是否准确");  
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
	        data:{'type':'guide'}, 		//注意-2：type的取值为 activity | guide | hotel | user 
	        success : function (datas, status){
	            var json = datas;		//注意-3：datas本身就是json对象。	
	            if(json.success){
	            	uploadImagePath = json.datas.filePath;
	            	alert(uploadImagePath);
	            }
	            alert(json.msg);
	        },
	        error: function(datas, status, e){
	            alert(e);
	        }
	}); 
	return false;
}



function loadGuideInfoToModify(){
	$("#lg_add_or_modify_type").html("Change攻略信息");
	$("#btn_add_or_modify").html("Save攻略信息");
	
	
	var url = "/ziteng/v/w/travelGuide/getGuideInfoToModify.do";
	var params = {"guideId":guideId};
	
	$.post(url, params, function(data){
		var json = eval('(' + data + ')');
		if(json.success){
			var areas = json.datas.areas;
			var carDegrees = json.datas.carDegrees;
			var prices = json.datas.prices;
			var guide = json.datas.guide;
			setAreaDiv(areas);
			setCarDegreeDiv(carDegrees);
			update_price_type(guide.priceWayId);
			
			
			$("#txt_name").val(guide.name);
			$("#sel_price_type").val(guide.prieWayId);
			$("#sel_start_area").val(guide.departAreaId);
			$("#sel_end_area").val(guide.arriveAreaId);
			$("#txt_km").val(guide.kms.toFixed(2));
			$("#txt_days").val(guide.days);
			$("#editor").html(guide.detail);
			$("#txt_taoBaoLink").val(guide.taoBaoLink);
			uploadImagePath = guide.coverImage;
			var coverImage= uploadImagePath;
			
			for(var i = 0; i < carDegrees.length; i++){
				for(var j = 0; j < prices.length; j++){
					if(prices[j].carDegreeId == carDegrees[i].id){
						if(guide.priceWayId==1){
							carDegrees2Price[i].pricePerDay = prices[j].pricePerDay.toFixed(2);
							$("#car_id_"+i).html(carDegrees2Price[i].pricePerDay);
						}else if(guide.priceWayId==2){
							carDegrees2Price[i].pricePerKm = prices[j].pricePerKm.toFixed(2);
							$("#car_id_"+i).html(carDegrees2Price[i].pricePerKm);
						}else if(guide.priceWayId==3){
							carDegrees2Price[i].originalPrice = prices[j].originalPrice.toFixed(2);
							$("#car_id_"+i).html(carDegrees2Price[i].originalPrice);
						}else if(guide.priceWayId==4){
							carDegrees2Price[i].originalPrice = prices[j].originalPrice.toFixed(2);
							$("#car_id_"+i).html(carDegrees2Price[i].originalPrice);
						}
						break;
					}
				}
			}
		}else{
			alert(json.msg);
		}
	});
}
