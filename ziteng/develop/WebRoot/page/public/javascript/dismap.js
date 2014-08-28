var reocarIcon 		=	new BMap.Icon("/public/images/MapLogo.png",new BMap.Size(78,38),{offset: new BMap.Size(20, 64),imageOffset: new BMap.Size(0, 0)});
var NreocarIcon 	=	new BMap.Icon("/public/images/MapLogo_full.png",new BMap.Size(78,38),{offset: new BMap.Size(20, 64),imageOffset: new BMap.Size(0, 0)});

function createMap(thisObj,sId)
{
	thisObj.parent().find('li').attr('class','');
	thisObj.attr('class','selectedLi');
	
	var shopMapVal	=	thisObj.attr('shopinfoarr');
	var shopMapArr	=	shopMapVal.split('+');
	
	var mapObj		=	new BMap.Map("mapBox");
	var cityName	=	$('.selectedLi:first').html().substr(0,2);
	var sId			=	sId;
	var thisName	=	thisObj.html().split('(',1);
	
	if(thisName != '不限' && thisName != '地图')
	{
		cityName	+=	thisName;
	}
	
	if(cityName == '长沙开发区')
	{
		cityName	=	'长沙长沙县';
	}
	
	if(cityName == '广州增城区')
	{
		cityName	=	new BMap.Point(113.61,23.13);
	}
	
	if(typeof(sId) == 'undefined' || sId == 0)
	{
		mapObj.centerAndZoom(cityName,13);
	}
	else
	{
		for(var k=0;k<shopMapArr.length;k++)
		{
			var centInfo	=	shopMapArr[k].split('_');
			
			if(centInfo[1] == sId)
			{
				var centPoint	=	centInfo[0].split(',');
				
				mapObj.centerAndZoom(new BMap.Point(centPoint[0],centPoint[1]),14);
			}
		}
	}
	
	mapObj.enableScrollWheelZoom(true);
	
	var mapMarkerArr	=	new Array();
	
	for(var i=0;i<shopMapArr.length;i++)
	{
		function cPoint(x)
		{
			var shopMap		=	shopMapArr[x];
			var shopInfo	=	shopMap.split('_');
			
			var shopPoint	=	shopInfo[0].split(',');
			var shopId		=	shopInfo[1];
			
			var mapPoint	=	new BMap.Point(shopPoint[0],shopPoint[1]);
			
			if(shopInfo.length == 4 && shopInfo[3] == 0)
			{
				var mapMarker	=	new BMap.Marker(mapPoint,{icon: NreocarIcon}); 
			}
			else
			{
				var mapMarker	=	new BMap.Marker(mapPoint,{icon: reocarIcon}); 
			}
			
			mapMarkerArr[mapMarkerArr.length]	=	mapMarker;
			
			mapObj.addOverlay(mapMarker);
			
			if(shopId == sId && typeof(sId) != 'undefined')
			{
				mapMarker.setAnimation(BMAP_ANIMATION_BOUNCE);
				
				if(shopInfo.length == 4)
				{
					disShopInfo(shopId,shopInfo[3] > 0 ? 1 : 2);
				}
				else
				{
					disShopInfo(shopId);
				}
			}
			
			mapMarker.addEventListener
			(
				"click",
				function()
				{
					for(var i=0;i<mapMarkerArr.length;i++)
					{
						mapMarkerArr[i].setAnimation();
					}
					
					mapObj.centerAndZoom(mapPoint,mapObj.getZoom());
					mapMarker.setAnimation(BMAP_ANIMATION_BOUNCE);
										
					if(shopInfo.length == 4 && shopInfo[3] == 0)
					{
						disShopInfo(shopId,shopInfo[3] > 0 ? 1 : 2);
					}
					else
					{
						disShopInfo(shopId);
					}
				}
			);
		}
		
		cPoint(i);
	}
}

function disShopInfo(shop_id,carnum)
{
	$.post
	(
		'/index.php/address/getShopInfo',
		{shop_id:shop_id},
		function(result)
		{
			result = eval('('+result+')');
			var shopInfoObj	=	$('.shopInfoUl');
						
			$(".shoplistLiy").attr('class','shoplistLin');
			$("#shop"+result['sShopID']).attr('class','shoplistLiy');
			
			$('.shopInfoUl li').eq(0).html(result['DepartmentName']);
			$('.shopInfoUl li').eq(1).find('ol:last').html(result['Address']);
			$('.shopInfoUl li').eq(3).find('ol:last').html(result['Tel']);
			
			if(carnum == 2)
			{
				$("#inputSubmitBt").attr('class','btn');
				$("#inputSubmitBt").val('已定满');
				$("#inputSubmitBt").attr('disabled',true);
			}
			else
			{
				$("#inputSubmitBt").val('预订');
				$("#inputSubmitBt").attr('class','btn-primary');
				$("#inputSubmitBt").attr('disabled',false);
			}
			$('input[name="city_name"]').val($('.selectedLi:first').html().substr(0,2));
			$('input[name="area_name"]').val($('.selectedLi:last').html().split('(',1));
			$('input[name="shop_id"]').val(result['DepartmentID']);
			$('input[name="shop_name"]').val(result['DepartmentName']);
			
			$('.shopInfobgBox').fadeIn(200);
			$('.shopInfoBox').fadeIn(50);
		}
	);
}

function createOneMap(thisObj)
{
	$('#disMapBox').bPopup({fadeSpeed:'slow',followSpeed: 300});
	
	var shopMapVal	=	thisObj.attr('shopInfoArr');
	var shopMapArr	=	shopMapVal.split('_');
	var centPoint	=	shopMapArr[0].split(',');
		
	var map = new BMap.Map("disOneMap");
	var point = new BMap.Point(centPoint[0],centPoint[1]);
	map.centerAndZoom(point, 16);
	var marker = new BMap.Marker(point,{icon: reocarIcon});
	map.enableScrollWheelZoom();
	map.enableContinuousZoom();
	map.addOverlay(marker);							
	map.addControl(new BMap.NavigationControl());
}
