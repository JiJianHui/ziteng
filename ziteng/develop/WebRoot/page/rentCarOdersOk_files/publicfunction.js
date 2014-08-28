function checkRegExps(thisObj)
{
	var inputObj	=	thisObj;
	var ExpArr		=	new Array();
	
	ExpArr['isPasswd']		=	/^[a-zA-Z0-9_]{6,18}$/;//密码
	ExpArr['isname']		=	/^[\u4e00-\u9fa5]{2,9}$/;//姓名
	ExpArr['isEmail']		=	/([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)/;//email
	ExpArr['isPhone']		=	/^((\(\d{2,3}\))|(\d{3}\-))?(13|15|18|14)\d{9}$/;//手机
	ExpArr['isIdCard']		=	/^([\d]{18,18})|([\d]{17,17}[xX]{1,1})$/;//身份证号
	
	var inputCheckType	=	inputObj.attr('data-check-type');
	var ExpVal			=	ExpArr[inputCheckType];
	var inputVal		=	inputObj.val();
	
	if(inputCheckType == 'rplay')
	{
		var checkSta	=	inputVal == $('input[name="'+thisObj.attr('data-check-rtype')+'"]').val() && inputVal.length > 2;
	}
	else
	{
		var checkSta	=	ExpVal.test(inputVal);
	}
	
	return checkSta;
}

function getDateFormat(DateObj)
{
	var DateMonth	=	DateObj.getMonth()+1;
	var DateDay		=	DateObj.getDate();
	
	if(DateMonth < 10)	{DateMonth	=	'0'+DateMonth;}
	if(DateDay < 10)	{DateDay	=	'0'+DateDay;}
	
	return DateObj.getFullYear()+'-'+DateMonth+'-'+DateDay;
}

function getCookie(c_name)
{
	if(document.cookie.length > 0)
	{
		var c_start	=	document.cookie.indexOf(c_name + '=');
		var c_end	=	'';
		
		if(c_start != -1)
		{
			c_start	=	c_start + c_name.length + 1;
			c_end	=	document.cookie.indexOf(";",c_start);
			
			if(c_end == -1)
			{
				c_end	=	document.cookie.length;
			}
			
			return unescape(document.cookie.substring(c_start,c_end));
		}
	}
	
	return '';
}


function addBlackBox()
{
	var docuWidth	=	$(document).width();
	var docuHeight	=	$(document).height();
	
	var loadImgLeft	=	document.body.clientWidth/2-16;
	
	var loadImgTop	=	$(window).height()/2;
	
	$("#page_loading").width(docuWidth);
	$("#page_loading").height(docuHeight);
	$("#page_loadimg").css('top',loadImgTop);
	$("#page_loadimg").css('left',loadImgLeft);
		
	$("#page_loading").show();
	$("#page_loadimg").show();
}


function removeBlackBox()
{
	$("#page_loading").hide();
	$("#page_loadimg").hide();
}

function changeInputVal(thisObj)
{
	var inputVal	=	thisObj.val();
	var msgVal		=	thisObj.attr('msg-val');
	
	if(inputVal == '')
	{
		thisObj.css('color','#CCC');
		thisObj.val(msgVal);
	}
	if(inputVal == msgVal)
	{
		thisObj.css('color','#555');
		thisObj.val('');
	}
}
$(window).load(
	function()
	{
		var Iobj	=	$("input[msg-sta='Y']");
		
		for(x = 0; x < Iobj.length; x++)
		{
			changeInputVal(Iobj.eq(x));
		}
	}
);
function pageDo(num,page,count,disname,oldpage)
{
	var pageNum		=	parseInt(num);
	var nowPage		=	parseInt(page);
	var listNum		=	parseInt(count);
	var pageCount	=	Math.ceil(listNum/pageNum);
	var maxDis		=	3;
	
	var sPage	=	(nowPage - maxDis)	<	1	?	1	:	(nowPage - maxDis);
	var ePage	=	(nowPage + maxDis)	>	pageCount	?	pageCount	:	(nowPage + maxDis);
	
	if(oldpage > 0)
	{
		$('.'+disname+oldpage).fadeOut(100);
		$('.'+disname+nowPage).fadeIn(100);
	}
	
	var pageHtml	=	'<ul>';
	
	if(nowPage > 1)
	{
		pageHtml	+=	'<li style="cursor:pointer;" onclick="pageDo('+num+','+(nowPage-1)+','+listNum+',\''+disname+'\','+nowPage+')"><a>上一页</a></li>';
	}
	
	if(nowPage > maxDis+1)
	{
		pageHtml	+=	'<li style="cursor:pointer;" onclick="pageDo('+num+',1,'+listNum+',\''+disname+'\','+nowPage+')"><a>1</a></li>';
	}
	
	if(nowPage > maxDis+2)
	{
		pageHtml	+=	'<li class="disabled"><a>...</a></li>';
	}
	
	for(sPage;sPage<=ePage;sPage++)
	{
		if(sPage	==	nowPage)
		{
			pageHtml	+=	'<li class="disabled"><a>'+sPage+'</a></li>';
		}
		else
		{
			pageHtml	+=	'<li style="cursor:pointer;" onclick="pageDo('+num+','+sPage+','+listNum+',\''+disname+'\','+nowPage+')" ><a>'+sPage+'</a></li>';
		}
	}
	
	if(nowPage < (pageCount - maxDis - 1))
	{
		pageHtml	+=	'<li class="disabled"><a>...</a></li>';
	}
	
	if(nowPage < (pageCount - maxDis))
	{
		pageHtml	+=	'<li><a onclick="pageDo('+num+','+pageCount+','+listNum+',\''+disname+'\','+nowPage+')">'+pageCount+'</a></li>';
	}
	
	if(nowPage < pageCount)
	{
		pageHtml	+=	'<li style="cursor:pointer;" onclick="pageDo('+num+','+(nowPage+1)+','+listNum+',\''+disname+'\','+nowPage+')" ><a>下一页</a></li>';
	}
	
	pageHtml	+=	'</ul>';
	
	$('.pagination').html(pageHtml);
}
