var guideId;

$(document).ready(function() {
	var url = window.location.href;
	guideId = url.substring(url.lastIndexOf('=')+1, url.length);
	setting();
	loadGuidePriceInfo();
});

var guide;
var prices;
var ratios;
var pre;			//Car Grade对于的价格单位

function queryRatio(){
	loadGuidePriceInfo();
}

function loadGuidePriceInfo(){
	var year = $("#sel_year").val();
	var month = $("#sel_month").val();
	
	var params = {"guideId":guideId,"year":year, "month":month};
	var url = "/ziteng/v/travelGuide/getGuideOneMonthPrice.do";
	
	$.post(url, params, function(data){
		var json = eval('(' + data +  ')');
		if(json.success){
			guide = json.datas.guide;
			prices = json.datas.prices;
			ratios = json.datas.ratios;
			
			if(prices.length<=0){
				alert("缺少设置相关Car Grade对于的价格");
			}
			
			$("#h3_title").html(guide.name);
			var guide_info = "";
			switch(guide.priceWayId){
			case 1:
				guide_info = "Accroding to Days:     price=days*per_day_price*coefficient =  "+guide.days+" *per_day_price*coefficient";
				pre = "/day";
				break;
			case 2:
				guide_info = "按里程计价    价格=里程*每里程价格*当日系数 =  "+guide.days+"里程 *每里程价格*系数";
				pre = "/每里";
				break;
			case 3:
				guide_info = "按系数     价格=路线价格*当日系数";
				pre = "/线路";
				break;
			case 4:
				guide_info = "按固定价格    ";
				pre = "/线路";
				break;
			}
			$("#h3_info").html(guide_info);
			
			$("#div_area_checkbox").empty();
			for(var i = 0; i < prices.length; i++){
				var $checkbox = '<label class="checkbox inline">'+
									'<input value="'+i+'" type="checkbox" checked id="check_'+i+'" onclick="refresh_paint();">'+prices[i].carDegreeName+
								'</label>';
				$("#div_area_checkbox").append($checkbox);
			}
			repaint();
			repaintTable();
		}else{
			alert(json.msg);
		}
	});
}


function refresh_paint(){
	repaint();
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
}

function repaint(){
	var labels = new Array();
	var datasets = new Array();
	var idx = 0;
	
	for(var i = 0; i < ratios.length; i++){
		labels[i] = ratios[i].dateString;
	}
	
	for(var i = 0; i < prices.length; i++){
		if(document.getElementById("check_"+i).checked==false){continue; }
		var obj = new Object();
		var ptitle;
		switch(guide.priceWayId){
		case 1:
			ptitle = prices[i].carDegreeName + "(" + prices[i].pricePerDay + pre +")";
			break;
		case 2:
			ptitle = prices[i].carDegreeName + "(" + prices[i].pricePerKm + pre +")";
			break;
		case 3:
			ptitle = prices[i].carDegreeName + "(" + prices[i].originalPrice + pre +")";
			break;
		case 4:
			ptitle = prices[i].carDegreeName + "(" + prices[i].originalPrice + pre +")";
			break;
		}
		obj.title = ptitle;
		var c_r= Math.floor(Math.random()*255+1); //1-10
		var c_g= Math.floor(Math.random()*255+1); //1-10
		var c_b= Math.floor(Math.random()*255+1); //1-10
		
		obj.fillColor = "rgba("+c_r+","+c_g+","+c_b+",0)";
		obj.strokeColor = "rgba("+c_r+","+c_g+","+c_b+",1)";
		obj.pointColor = "rgba("+c_r+","+c_g+","+c_b+",1)";
		obj.pointStrokeColor = "#fff";
		obj.pointDot = true;
		obj.data = prices[i].oneMonthPrice;
		datasets[idx] = obj;
		idx++;	
	}
	var lineChartData = {
			labels:labels,
			datasets:datasets
	};
	if(canvas == null){
		canvas = document.getElementById("canvas");
		ctx = canvas.getContext("2d");
		chart  = new Chart(ctx);
	}
	
	var config = {scaleStartValue:0,scaleSteps:20};
	
	var width = canvas.width;
	var height = canvas.height;
	ctx.clearRect(0,0,width,height);
	var myLine = chart.Line(lineChartData,config);
}


function repaintTable(){
	$("#tr_title").empty();
	$("#tr_title").append('<th>Date</th>');
	if(guide.priceWayId!=4){
		$("#tr_title").append('<th>Coefficient</th>');
	}
	for(var i = 0; i < prices.length; i++){
		var ptitle;
		switch(guide.priceWayId){
		case 1:
			ptitle = prices[i].carDegreeName + "(" + prices[i].pricePerDay + pre +")";
			break;
		case 2:
			ptitle = prices[i].carDegreeName + "(" + prices[i].pricePerKm + pre +")";
			break;
		case 3:
			ptitle = prices[i].carDegreeName + "(" + prices[i].originalPrice + pre +")";
			break;
		case 4:
			ptitle = prices[i].carDegreeName + "(" + prices[i].originalPrice + pre +")";
			break;
		}
		var $trTitle = '<th>'+ptitle+'</th>';
		$("#tr_title").append($trTitle);
	}
	$("#tbody").empty();
	for(var i = 0; i <ratios.length; i++ ){
		var $trBody = '<tr>';
		$trBody += '<td>'+ratios[i].dateString+'</td>';
		if(guide.priceWayId!=4){
			$trBody += '<td>'+ratios[i].ratio.toFixed(2)+'</td>';
		}
		for(var j = 0; j < prices.length; j++){
			var month_price = prices[j].oneMonthPrice;
			var valtr = '<td onclick="showEditDailog('+j+', '+ i+')">'+month_price[i].toFixed(2)+'</td>';
			$trBody  += valtr;
		}
		$trBody += '</tr>';
		$("#tbody").append($trBody);
	}
}
