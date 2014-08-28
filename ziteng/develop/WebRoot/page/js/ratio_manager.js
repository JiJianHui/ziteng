function queryRatio(){
	var year = $("#sel_year").val();
	var month = $("#sel_month").val();
	
	var params = {"year":year, "month":month};
	var url = "/ziteng/ratio/queryRatioByDate.do";
	
	$.post(url, params, function(data){
		var json = eval('(' + data +  ')');
		if(json.success){
			var areaRatios = json.datas.areaRatios;
			gareaRatio = areaRatios;
			$("#div_area_checkbox").empty();
			for(var i = 0; i < areaRatios.length; i++){
				var $checkbox = '<label class="checkbox inline">'+
									'<input value="'+i+'" type="checkbox" checked id="check_'+i+'" onclick="refresh_paint();">'+areaRatios[i][0].areaName+
								'</label>';
				$("#div_area_checkbox").append($checkbox);
			}
			repaint(areaRatios);
			repaintTable(areaRatios);
		}else{
			alert(json.msg);
		}
	});
}


var gareaRatio;
function refresh_paint(){
	repaint(gareaRatio);
}
var canvas = null;
var ctx = null;
var chart = null;
var today = new Date();//获得当前日期
var gyear = today.getFullYear();//获得年份
var gmonth = today.getMonth() + 1;//此方法获得的月份是从0---11，所以要加1才是当前月份
var gday = today.getDate();//获得当前日期

function setting(){
	$("#sel_year").val(gyear);
	$("#sel_month").val(gmonth);
	queryRatio();
}

function repaint(areaRatios){
	var labels = new Array();
	var datasets = new Array();
	var idx = 0;
	for(var i = 0; i < areaRatios.length; i++){
		if(document.getElementById("check_"+i).checked==false){continue; }
		var data = new Array();
		for(var j = 0; j < areaRatios[i].length; j++){
			var ratio = areaRatios[i][j];
			if(idx == 0){
				labels[j] = ratio.dateString;
			}
			data[j] = ratio.ratio;
		}
		var obj = new Object();
		obj.title = areaRatios[i][0].areaName;
		var c_r= Math.floor(Math.random()*255+1); //1-10
		var c_g= Math.floor(Math.random()*255+1); //1-10
		var c_b= Math.floor(Math.random()*255+1); //1-10
		
		obj.fillColor = "rgba("+c_r+","+c_g+","+c_b+",0)";
		obj.strokeColor = "rgba("+c_r+","+c_g+","+c_b+",1)";
		obj.pointColor = "rgba("+c_r+","+c_g+","+c_b+",1)";
		obj.pointStrokeColor = "#fff";
		obj.pointDot = true;
		obj.data = data;
		datasets[idx] = obj;
		idx++;	
	}
	var lineChartData = {
			labels:labels,
			datasets:datasets
	};
//	var lineChartData = {
//			labels : ["January","February","March","April","May","June","July"],
//			datasets : [
//				{
//					title:"titles1",
//					fillColor : "rgba(220,220,220,0.5)",
//					strokeColor : "rgba(220,220,220,1)",
//					pointColor : "rgba(220,220,220,1)",
//					pointStrokeColor : "#fff",
//					pointDot : true,
//					data : [6.5,5.9,9.0,8.1,5.6,5.5,4.0]
//				},
//				{
//					title:"titlsssse2",
//					fillColor : "rgba(151,187,205,0.5)",
//					strokeColor : "rgba(151,187,205,1)",
//					pointColor : "rgba(151,187,205,1)",
//					pointStrokeColor : "#fff",
//					data : [2.8,4.8,4.0,1.9,9.6,2.7,10.0]
//				}
//			]
//		};
	if(canvas == null){
		canvas = document.getElementById("canvas");
		ctx = canvas.getContext("2d");
		chart  = new Chart(ctx);
	}
	
	var config = {scaleStartValue:0,scaleStepWidth:0.1,scaleSteps:20};
	
	var width = canvas.width;
	var height = canvas.height;
	ctx.clearRect(0,0,width,height);
	var myLine = chart.Line(lineChartData,config);
}


function repaintTable(areaRatios){
	$("#tr_title").empty();
	$("#tr_title").append('<th onclick="alert(1);">日期</th>');
	for(var j = 0; j < areaRatios.length; j++){
		var $trTitle = '<th>'+areaRatios[j][0].areaName+'</th>';
		$("#tr_title").append($trTitle);
	}
	$("#tbody").empty();
	for(var i = 0; i <areaRatios[0].length; i++ ){
		var $trBody = '<tr>';
		$trBody += '<td>'+areaRatios[0][i].dateString+'</td>';
		for(var j = 0; j < areaRatios.length; j++){
			var valtr = '<td onclick="showEditDailog('+j+', '+ i+')">'+areaRatios[j][i].ratio.toFixed(2)+'</td>';
			$trBody  += valtr;
		}
		$trBody += '</tr>';
		$("#tbody").append($trBody);
	}
}


function showEditDailog(i,j){
	var ratio = gareaRatio[i][j];
	$("#label_ratio").html(ratio.dateString+"&nbsp;&nbsp;"+ratio.areaName);
	$("#txt_ratio_id").val(ratio.id);
	$("#txt_ratio").val(ratio.ratio.toFixed(2));
	$('#myModal').modal('show');
}


function updateRatio(){
	$('#myModal').modal('hide');
	var ratioId = $("#txt_ratio_id").val();
	var ratio = $("#txt_ratio").val();
		
	if(ratio==null || ratio == undefined || ratio == ""){alert("请输入系数值"); return false;}
	if(! /^[1-9]d*.d*|0.d*[1-9]d*|0?.0+|0$/.test(ratio)){alert("请输入浮点数系数值"); return false;}
	var params = {"ratioId":ratioId, "ratio":ratio};
	
	var url = "/ziteng/v/w/ratio/updateRatio.do";
	
	$.post(url, params, function(data){
		var json = eval('(' + data + ')');
		if(json.success){
			queryRatio();
		}
		alert(json.msg);
	});
}

