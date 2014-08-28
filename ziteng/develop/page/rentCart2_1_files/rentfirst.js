$(function()
{
	$("#rentFirst input").click
	(
		function()
		{
			var InputName	=	$(this).attr('name');
			
			//------------------------------------------------------------------------------
			/**
			 * 城市区域选择Operation
			 * @author zsf
			 */
			if(InputName == 'shop_name')
			{
				//$("#select1  option:selected").
				var CityId	=	$("input[name='city_id']").val();
				
				if(CityId > 0)
				{
					$("#cityBox").fadeOut();
					$.post
					(
						'/address/getAreaList',
						{city_id:CityId},
						function(result)
						{
							var AreaResult	=	eval(result);
							var AreaHtml	=	'';
							
							for(var i = 0 ; i < AreaResult.length ; i++)
							{
								var Area	=	AreaResult[i];
								AreaHtml	+=	'<li area_id="'+Area['AreID']+'">'+Area['AreName']+'</li>';
							}
							
							$("#shopArea").html(AreaHtml);
							
							$("#shopArea li:first").trigger('click');
						}
					)
					
				}
				else
				{
					return false;
				}
			}
			
			//------------------------------------------------------------------------------
			/**
			 * 时间日期选择Operation
			 * @author zsf
			 */
			if(InputName == 'start_date' || InputName == 'end_date')
			{
				
				$("#sHours").fadeOut(100);
				
				var DateObj	=	new Date();
				
				if(InputName == 'end_date')
				{
					var minDate	=	$('input[name="start_date"]').val();
					DateObj.setDate(DateObj.getDate()+50);
				}
				else
				{
					var minDate	=	getDateFormat(DateObj);
					DateObj.setDate(DateObj.getDate()+30);
				}
				
				//DateObj.setDate(DateObj.getDate()+60);
				
				var maxDate	=	getDateFormat(DateObj);
				var sdate1 = $('input[name="start_date"]').val();
				WdatePicker
				(
					{
						minDate:minDate,
						maxDate:maxDate,
						onpicking:function(ThisObj)
						{
							if(InputName == 'start_date')
							{
								$("input[name='start_date']").val(ThisObj.cal.getNewDateStr());
								var startNowDate	=	ThisObj.cal.getNewDateStr()+" "+$("input[name='start_hours']").val()+":00";
								var endNowDate		=	$("input[name='end_date']").val()+" "+$("input[name='end_hours']").val()+":00";
							}
							else
							{
								$("input[name='end_date']").val(ThisObj.cal.getNewDateStr());
								var startNowDate	=	$('input[name="start_date"]').val()+" "+$("input[name='start_hours']").val()+":00";
								var endNowDate		=	ThisObj.cal.getNewDateStr()+" "+$("input[name='end_hours']").val()+":00";
							}
							
							var userSdateArr	=	startNowDate.split('-');
							var userSdateArr1	=	userSdateArr[2].split(' ');
							var userSdateArr2	=	userSdateArr1[1].split(':');
							
							var userEdateArr	=	endNowDate.split('-');
							var userEdateArr1	=	userEdateArr[2].split(' ');
							var userEdateArr2	=	userEdateArr1[1].split(':');
							
							var Snddate	=	new Date();
							var Enddate	=	new Date();
							
							Snddate.setFullYear(userSdateArr[0],(userSdateArr[1]-1),userSdateArr1[0]);
							Snddate.setHours(userSdateArr2[0],'00','00');
							
							Enddate.setFullYear(userEdateArr[0],(userEdateArr[1]-1),userEdateArr1[0]);
							Enddate.setHours(userEdateArr2[0],'00','00');
							
							if(InputName == 'start_date')
							{
								if((Enddate.getTime() - Snddate.getTime()) < 3*24*60*60*1000)
								{
									Snddate.setDate(Snddate.getDate()+2);
									if(Snddate.getTime()>DateObj.getTime())
									{
										Snddate	=	DateObj;
									}
									$('input[name="end_date"]').val(getDateFormat(Snddate));
									
								}
								$("input[name='end_date']").removeAttr('disabled');
								$("input[name='start_hours']").removeAttr('disabled');
							}
							
							// if((Enddate.getTime() - Snddate.getTime()) > 4*24*60*60*1000)
							// {
								// $("#selectShop").show();
								// $("#inputShop").hide();
								
								// var cityName	=	$(".activeyell:first").html();
								// $("#areaul_"+cityName).find('.activeyell').click();
							// }
							
							// var int_day		=	Math.ceil((Enddate.getTime()-Snddate.getTime())/86400000);
							// $("#zuqi").html(int_day);
							$("input[name='"+InputName+"']").change();
							
						},
						onpicked:function(ThisObj){
							var CityId	=	$("input[name='city_id']").val();
							var sdate = ThisObj.cal.getNewDateStr();
							var sobj = new Date(sdate);
							var stime = sobj.getTime();
							if(CityId != '6bddc499-90d4-4c27-a491-dcfbd613ea35')
							{
								if(1390752000000 < stime && stime < 1391529600000)
								{
									if(InputName == 'start_date')
									{
										$('input[name="start_date"]').val('2014-01-27');
										$('input[name="end_date"]').val('2014-02-05');
									}
									else if (InputName == 'end_date')
									{
										$('input[name="end_date"]').val('2014-02-05');
									}
									$("input[name='start_hours']").val('17:00');
									$("input[name='end_hours']").val('17:00');
									$("input[name='start_hours']").attr('readonly','readonly');
									$("input[name='end_hours']").attr('readonly','readonly');
									alert('春节须打包整租，整租时间段为2014年01月27日17:00至2014年02月05日17:00，\n即会员春节租车的租期必须至少涵盖这个时间段');
								}
							}
						}
						
					}
				);
				
			}
			
			
			//------------------------------------------------------------------------------
			/**
			 * 时间小时选择Operation
			 * @author zsf
			 */
			if(InputName == 'start_hours')
			{
				if($(".shijiandiv").css('display') == 'none')
				{
					$(".shijiandiv").css('left',$(this).offset().left-10+'px');
					$(".shijiandiv").css('top',$(this).offset().top+45+'px');
					
					$(".shijiandiv").fadeIn(150);
				}
				else
				{
					$(".shijiandiv").fadeOut(150);
				}
			}
		}
	);

	
	$(document).on
	(
		'click',
		'#shopArea li',
		function ()
		{
			var AreaId	=	$(this).attr('area_id');
			if(AreaId > 0)
			{
				$.post
				(
					'/address/getShopList',
					{area_id:AreaId},
					function(result)
					{
						var ShopResult	=	eval(result);
						
						var AreaHtml	=	'';
						
						if(ShopResult.length > 0)
						{
							for(var i= 0; i < ShopResult.length; i++)
							{
								var shop	=	ShopResult[i];
								
								AreaHtml	+=	'<li shop_id="'+shop['sShopID']+'" shop_address="'+shop['sAddress']+'" shop_traffic="'+shop['sTrafficInfo']+'" shop_phone="'+shop['sPhoneNumber']+'" shop_time="'+shop['shopTime']+'" shop_coordinate="'+shop['sShopLocation']+'">'+shop['sName']+'</li>';
							}
							
							$("#shopList").html(AreaHtml);
							$("input[name='area_id']").val(AreaId);
							$("#shopList li:first").trigger('mouseover');
						}
						
					}
				);
				
			}
		}
	);
	
	$(document).on
	(
		'mouseover',
		'#shopList li',
		function ()
		{
			var ShopAddress		=	$(this).attr('shop_address');
			var ShopTraffic		=	$(this).attr('shop_traffic');
			var ShopPhone		=	$(this).attr('shop_phone');
			var shopTime		=	$(this).attr('shop_time');
			var shopCoordinate	=	$(this).attr('shop_coordinate');
			var shopId			=	$(this).attr('shop_id');
			
			var ShopInfo	=	'<p>Address：'+ShopAddress+'<a id="disMapA" shop_id='+shopId+' coordinate="'+shopCoordinate+'">Map</a></p><p>营业时间：'+shopTime+'</p><p>Phone：'+ShopPhone+'</p><p>交通提示：'+ShopTraffic+'</p>';
			
			$("#shopInfo").html(ShopInfo);
			
			if($('#shopBox').css('display') == 'none')
			{
				$('#shopBox').fadeIn(50);
			}
		}
	);
	
	$(document).on
	(
		'click',
		'#shopList li',
		function ()
		{
			var ShopId		=	$(this).attr('shop_id');
			var ShopName	=	$(this).html();
			
			$("input[name='shop_name']").val(ShopName);
			$("input[name='shop_id']").val(ShopId);
			$("#shopBox").fadeOut(100);
		}
	);
	
	$(document).on
	(
		'click',
		function(ClickObj)
		{
			var thisObj  = $(ClickObj.target);
			
			if(thisObj.closest('.shijiandiv').length == 0 && thisObj.closest('input[name="start_hours"]').length == 0)
			{
				$('.shijiandiv').fadeOut(100);
			}
		}
	);
	
	$(document).on
	(
		'click',
		'.shijiandiv div',
		function()
		{
			var selectHoursVal	=	$(this).html();
			var sHourVarInt		=	parseInt(selectHoursVal);
			
			if(sHourVarInt < 11 || sHourVarInt > 16)
			{
				var timeMsg	=	'温馨提示：<br/>1. 瑞卡租车采用节点收费,建议您在11：00和17：00两个节点取还车价格最优惠。<br/>2. 您现在的取车时间为：11点之前或17点之后，您只需在预计还车当天17点前还车即可';
				var endHour	=	'17:00';
			}
			else
			{
				var timeMsg	=	'温馨提示：<br/>1. 瑞卡租车采用节点收费,建议您在11：00和17：00两个节点取还车价格最优惠。<br/>2. 您现在的取车时间为：11点至17点之间，您只需在预计还车当天11点前还车即可';
				var endHour	=	'11:00';
			}
			
			$("#timeMsg").attr('data-original-title',timeMsg);
			
			$("input[name='start_hours']").val(selectHoursVal);
			$("input[name='end_hours']").val(endHour);
			
			$(".shijiandiv").fadeOut(50);
			
			var userSdate	=	$("input[name='start_date']").val()+" "+$("input[name='start_hours']").val()+":00";
			var userEdate	=	(Edate != "" ? Edate : $("input[name='end_date']").val())+" "+$("input[name='end_hours']").val()+":00";
			
			var Sdate		=	new Date(userSdate);
			var Edate		=	new Date(userEdate);
			
			if(parseInt(Sdate.getTime()) >= parseInt(Edate.getTime()))
			{
				Sdate.setDate(Sdate.getDate()+2);
				$("input[name='end_date']").val(getDateFormat(Sdate));
				
				return false;
			}
			$("input[name='start_hours']").change();
			$('.shijiandiv').fadeOut(1);
		}
	);
	
	$("#rentFirst").submit
	(
		function()
		{
			addBlackBox();
			$('.carousel').carousel('pause');
			
			if($("input[name='city_id']").val() == '')
			{
				$('.carousel').carousel({
				  interval: 5000
				});
				alert('请选择城市');
				removeBlackBox();
				return false;
			}

			if($("input[name='area_id']").val() == '')
			{
				$('.carousel').carousel({
				  interval: 5000
				});
				alert('请选择门店');
				removeBlackBox();
				return false;
			}
			if($("input[name='shop_id']").val() == '')
			{
				$('.carousel').carousel({
				  interval: 5000
				});
				alert('请选择门店');
				removeBlackBox();
				return false;
			}
			
			var userSdate	=	$("input[name='start_date']").val()+" "+$("input[name='start_hours']").val()+":00";
			var userEdate	=	$("input[name='end_date']").val()+" "+$("input[name='end_hours']").val()+":00";
			
			var userSdateArr	=	userSdate.split('-');
			var userSdateArr1	=	userSdateArr[2].split(' ');
			var userSdateArr2	=	userSdateArr1[1].split(':');
			
			var userEdateArr	=	userEdate.split('-');
			var userEdateArr1	=	userEdateArr[2].split(' ');
			var userEdateArr2	=	userEdateArr1[1].split(':');
			
			var Ndate		=	new Date();
			var Sdate		=	new Date();
			var Edate		=	new Date();
			
			Sdate.setFullYear(userSdateArr[0],(userSdateArr[1]-1),userSdateArr1[0]);
			Sdate.setHours(userSdateArr2[0],'00','00');
			
			Edate.setFullYear(userEdateArr[0],(userEdateArr[1]-1),userEdateArr1[0]);
			Edate.setHours(userEdateArr2[0],'00','00');
			
			var int_day		=	Math.ceil((Edate.getTime()-Sdate.getTime())/86400000);
			var stime = Sdate.getTime();
			var etime = Edate.getTime();
			var CityId	=	$("input[name='city_id']").val();
			var SdateInit   =   $("input[name='start_date']").val();
			
			if((Sdate.getTime() - Ndate.getTime()) < 0)
			{
				$('.carousel').carousel({
				  interval: 5000
				});
				alert('取车时间应大于当前时间');
				removeBlackBox();
				return false;
			}
			
			if(int_day > 20)
			{
				$('.carousel').carousel({
				  interval: 5000
				});
				alert('为了保持车辆良好的状态,租车订单时间最长不超过20天,请您重新选择');
				removeBlackBox();
				return false;
			}
			
			if(Edate <= Sdate)
			{
				$('.carousel').carousel({
				  interval: 5000
				});
				alert('还车时间应大于取车时间');
				removeBlackBox();
				return false;
			}
			

			
			return true;
		}
	);
	
	
});

 //日期加上天数后的新日期.
function AddDays(date,days){
    var nd = new Date(date);
    nd = nd.valueOf();
    nd = nd + days * 24 * 60 * 60 * 1000;
    nd = new Date(nd);

	var y = nd.getFullYear();
	var m = nd.getMonth()+1;
	var d = nd.getDate();
	if(m <= 9) m = "0"+m;
	if(d <= 9) d = "0"+d; 
	var cdate = y+"-"+m+"-"+d;
	return cdate;
 }
