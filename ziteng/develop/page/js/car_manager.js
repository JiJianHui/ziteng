 var unsigned_int_reg = /^[0-9]+.?[0-9]*$/;

/**
 * add car.
 */
function add_car(){
	var	name = $("#txt_car_name").val();
	var carDegreeId = $("#sel_car_degree").val();
	var price = $("#txt_car_price").val();; 
	var volume = $("#txt_car_volumn").val();
	var fileName = $("#file_car_image").val();
	
	var params = {"name":name, "carDegreeId":carDegreeId, "price":price, "volume":volume};
	var posturl = '/ziteng/v/w/car/addCar.do';
	
	if(name==null || name == undefined || name =="" ||name.length>20){	alert("Car Name不能为空,且长度在10位内"); return false; }
	if(carDegreeId == null || carDegreeId == undefined){ alert("请选择Car Grade"); return false;}
	if(price==null || price == undefined || price == "" || !unsigned_int_reg.test(price)){alert("Please type in the 正数价格"); return false;};
	if(volume==null || volume == undefined || volume == "" || !unsigned_int_reg.test(volume)){alert("Please type in the 正数可载数量"); return false;};
	if(fileName == null || fileName == undefined || fileName==""){ alert("请选择上传文件");	return false;	}
	if(!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(fileName)) {	alert("图片类型必须是.gif,jpeg,jpg,png中的一种"); return false; }
	
	 $.ajaxFileUpload({
	        url:posturl,//处理图片脚本
	        type: 'post',
	        secureuri :false,
	        fileElementId :'file_car_image',	//注意-1：file控件id，改控件的name必须为file
	        dataType : 'json',
	        data:params, 		//注意-2：type的取值为 activity | guide | hotel | user 
	        success : function (datas, status){
	            var json = datas;			//注意-3： datas本身就是json对象。
	            if(json.success){
	            	location.reload();
	            }else{
	            	alert(json.msg);
	            }
	        },
	        error: function(datas, status, e){
	            alert(e);
	        }
	}); 
	 return false;
}

function load_car_degree(){
	var url = '/ziteng/car/getAllCarDegrees.do';
	$("#sel_car_degree").empty();
	$.post(url, null, function(data){
		var json = eval("(" + data +")");
		if(json.success){
			var carDegrees = json.datas.carDegrees;
			for(var i = 0; i < carDegrees.length; i++){
				var $opt = '<option value="'+carDegrees[i].id+'">'+carDegrees[i].name+'</option>';
				$("#sel_car_degree").append($opt);
			}
		}else{
			alert(json.msg);
		}
	});
}
load_car_degree();

//delete areas.
function deleteCar(carId){
	var params = {"carId":carId};
	var url = "/ziteng/v/w/car/deleteCarById.do";
	
	if(carId==null || carId==undefined || carId == ""){return false;}
	
	$.post(url, params, function(data){
		var json = eval("(" + data +")");
		if(json.success){
			location.reload();
		}else{
			alert(json.msg);
		}
	});
}
