
var o = null;
var i = 0;
weixinicon = function(id, _top, _right, _bottom) {
    var me = id.charAt ? document.getElementById(id) : id;
   // d1.style.height = d2.style.height = '100%'; 
	// me.style.top = _top ? _top + 'px' : 0; 
	// me.style.right = _right + "px"; 
	me.style.right = _right + "px";
	me.style.bottom = _bottom + "px";
    me.style.position = 'fixed';
    me.style.display = 'block';
    // setInterval(function() { me.style.top = parseInt(me.style.top) + (Math.max(d1.scrollTop, d2.scrollTop) + _top - parseInt(me.style.top)) * 0.1 + 'px'; }, 10 + parseInt(Math.random() * 20));
    //return arguments.callee;
};
$(document).ready(function() {
    var html = '';
    html += '<div id="weixinicon" style="display:none;z-index:99" >';
    html += '    <div class="services">';
    html += '        <div class="con">';
    html += '                	<p><a href="/rentcar" class="qq"><img border="0" src="/public/images/erwm.png" /></p>';
    html += '        </div>';
    html += '    </div>';
    html += '</div>';

    $(document.body).append(html);

    o = document.getElementById("weixinicon");
    i = parseInt(o.style.left);

    weixinicon('weixinicon', 0, 0 ,0);
});

