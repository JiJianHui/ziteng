$(
	function()
	{
		$('.leftList li').hover(
			function()
			{
				if($(this).css('background-image').indexOf('leftlistselect') < 0)
				{
					$(this).css('background-image','url()');
					$(this).css('background-color','#808080');
					$(this).css('color','#FFF');
				}
			},
			function()
			{
				var leftListObj	=	$('.leftList li');
				
				$(this).css('color','#000');
				
				for(var i=0;i<leftListObj.length;i++)
				{
					var thisLi	=	leftListObj.eq(i);
					
					if(thisLi.css('background-image').indexOf('leftlistselect') < 0)
					{
						thisLi.css('background-image','url(/public/images/reocarLeftListBg.gif)');
					}
				}
			}
		);
	}
);