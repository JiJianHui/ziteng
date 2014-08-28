/* File Created: 一月 18, 2013 */

//#region baiduMap
//$('[tab="current"]').click(function () { $('#boxBaiduMap').css({ 'left': 0, 'position': 'static' }); });
var script = document.createElement("script");
script.src = 'http://api.map.baidu.com/api?v=1.3&callback=setMap';
document.body.appendChild(script);

function setMap() {
    var map = new BMap.Map('boxBaiduMap'); // 启用滚轮

    map.enableScrollWheelZoom();
    var opts = { type: BMAP_NAVIGATION_CONTROL_SMALL };
    map.addControl(new BMap.NavigationControl(opts));

//    map.disableDragging();
//    map.disableDoubleClickZoom();
   //map.centerAndZoom(_model.startCity);
    var driving = new BMap.DrivingRoute(map, {
        policy: BMAP_DRIVING_POLICY_LEAST_DISTANCE,
        renderOptions: {
            highlightMode: BMAP_HIGHLIGHT_STEP
        }
    });
    driving.setSearchCompleteCallback(function (r) {
        if (r.getNumPlans() > 0) {
            var plan = r.getPlan(0);

            // 画线
            var pts = plan.getRoute(0).getPath();
            var polyline = new BMap.Polyline(pts);
            map.addOverlay(polyline);
               
        }
    });


    var points = [];
    var pinot = _model.passpinot.split('-');
    var si = new BMap.Icon("/res/images/icon/markers.png", new BMap.Size(42, 34), {
        anchor: new BMap.Size(14, 32),
        imageOffset: new BMap.Size(0, 0)   // 设置图片偏移  
    });
    var ei = new BMap.Icon("/res/images/icon/markers.png", new BMap.Size(42, 34), {
        anchor: new BMap.Size(14, 32),
        imageOffset: new BMap.Size(0, 0 - 34)   // 设置图片偏移  
    });

    if (pinot.length > 1)
    {
        for (var i = 0; i < pinot.length; i++) {
            var p = new BMap.Point(pinot[i].split(',')[0], pinot[i].split(',')[1]);
            points.push(p);
        }

        for (var i = 1; i < points.length; i++) {
            driving.search(points[i - 1], points[i]);

            if (i != points.length - 1) {
                var pm = new BMap.Marker(points[i]);
                map.addOverlay(pm);
            }
            var sm = new BMap.Marker(points[0], { icon: si });
            map.addOverlay(sm);
            var em = new BMap.Marker(points[points.length - 1], { icon: ei });
            map.addOverlay(em);
        }

    } else {
        var s = new BMap.Point(_model.spx, _model.spy),
            e = new BMap.Point(_model.epx, _model.epy);

        var sm = new BMap.Marker(s, { icon: si });
        map.addOverlay(sm);

        var em = new BMap.Marker(e, { icon: ei });
        map.addOverlay(em);
        points.push(s);
        points.push(e);
        driving.search(s, e);
    }
    map.setViewport(points);
}

//#endregion

//#region ajax


function collect() {
    $.post(window['domain'] + '/line/show.aspx?do=collect&jsoncallback=?', { id: _model.id }, function (rst) {

        if (rst.Success) m.pop.success(rst.Msg);
        else m.pop.error(rst.Msg);
    }, 'JSON');
}
$('.btnCollect').click(function () {
    m.withLoginDo(collect);
});
$('.btnSendMsg').click(function () {
    m.withLoginDo(function () {
        msg.show(_model.uid, _model.nickName, _model.head,_model.mobile,_model.id);
    });
});

//#endregion

//#region formBuy


//_seat = _form.find('[name="seat"]')
//function Jia() {
//    var val = parseInt(_seat.val());
//    if (!isNaN(val)) { val = val >= _model.seat ? _model.seat : val + 1; _seat.val(val); }
//    else { _seat.val("1"); }
//}
//function Jian() {
//    var val = parseInt(_seat.val());
//    if (!isNaN(val)) {
//        val -= 1;
//        val = val <= 1 ? 1 : val;
//        _seat.val(val);
//    }
//    else { _seat.val("1"); }
//}
//$('.btnJia').click(Jia);
//$('.btnJian').click(Jian);

$('.btnSubmit').click(function () {
    m.withLoginDo(function () {
        var _t = 1;
        if ($("#datexuan .cp-current").size() != 0) {
            _t = $("#datexuan .cp-current").eq(0).attr('data-type');
        }
        location = window['domain'] + "/center/personal/order/create.aspx?type="+_t+"&seat=1&tasklist="+_model.id;

	return false;
    })
})

//#endregion

//#region formJoin

var _formJoin = $('#formJoin'), _dialog;
$('.btnJoin').click(function () {
    m.withLoginDo(function () {
        _dialog = $.dialog({
            padding: 0,
            lock: true,
            title: '请填写您的Contacts',
            opacity: .5,
            content: document.getElementById('boxJoinInfo')
        });
        $.getJSON(window['domain'] + '/line/show.aspx?do=getlink&jsoncallback=?', {}, function (rst) {
            if (rst.Success) {
                _formJoin.find('[name="Name"]').val(rst.Data.Name).hideTip();
                _formJoin.find('[name="Mobile"]').val(rst.Data.Mobile).hideTip();
            }
        });
    });
});
_formJoin.validate({
    onkeyup: false,
    rules: { Name: { required: true, maxlength: 4 }, Mobile: { required: true, moblie: true} },
    messages: { Name: { required: "Please type in the Contact。", maxlength: 'Contact输入错误。' }, Mobile: { required: 'Please type in the Phone。', moblie: 'Phone错误。'} },
    showErrors: function (g, d) {
        for (var b = 0; this.successList[b]; b++) { var a = $(this.successList[b]).parents("li").eq(0); a.find("span.warm").remove(); a.find("span.right").remove() } for (var b = 0; b < d.length; b++) { var c = d[b], f = $(c.element), a = f.parents("li").eq(0), e = a.find("span.warm"); a.find("span.right").remove(); if (e.length > 0) e.html(c.message); else a.append('<span class="tip warm ico">' + c.message + "</span>") }
    },
    submitHandler: function () {
        var b = m.pop.loading("请稍后…");
        $.getJSON(window['domain'] + "/line/show.aspx?do=join&jsoncallback=?", _formJoin.serialize(), function (a) {
            if (a.Success) m.pop.success(a.Msg);
            else if (a.MsgTarget) {
                var c = $('[name="' + a.MsgTarget + '"]').parents("li").eq(0);
                c.find("span.ico.tip").remove();
                c.append('<span class="tip warm ico">' + a.Msg + "</span>")
            } else m.pop.error(a.Msg);
            b.close();
            _dialog.close();
        })
    }
});
_formJoin.find('a.btnPostJoin').click(function () {
    _formJoin.submit();
});

var _scroll = [], _auto = false;
$('.scroll').each(function (i) {
    _scroll[i] = $(this).offset().top;
})
$('#tab li').click(function () {
    var _h = $($(this).attr('data-id')).offset().top;
    var _index = $(this).index()
    _h = _h - (_index == 0 ? 0 : (($('#tab').hasClass('fixed-style1') ? 1 : 2) * $('#tab').height()));
    _auto = true;
    $('html,body').stop().animate({ scrollTop: _h }, 500, function () {
        _auto = false;
    });
})
$(window).scroll(function () {
    $('#tab').removeClass('fixed-style1')
    if ($(window).scrollTop() > $('#tab').offset().top)
        $('#tab').addClass('fixed-style1')
    if (!_auto) {
        for (var i = 0, len = _scroll.length; i < len; i++) {
            if ($(window).scrollTop() < _scroll[i]) {
                $('#tab li').removeClass('current').eq(i).addClass('current');
                break;
            }
        }
    }
});
if ($(window).scrollTop() > 0)
    $(window).scroll();
//#endregion
$('.choice-pay').click(function () {
    if ($(this).find('.flat-ico').css("display") == "block") {
        $('.choice-pay').removeClass('cp-current');
        $(this).find('.flat-ico').css({ "display": "none" })
        $(this).hover(function () {
            if ($(this).find('.flat-ico').css("display") == "none") {
                $(this).addClass('cp-current');
            }
        }, function () {
            if ($(this).find('.flat-ico').css("display") == "none") {
                $(this).removeClass('cp-current');
            }
        })
    } else {
        $('.choice-pay').removeClass('cp-current');
        $(this).addClass('cp-current');
        $(this).find('.flat-ico').css({ "display": "" })
    }
}).hover(function () {
    if ($(this).find('.flat-ico').css("display") == "none") {
        $(this).addClass('cp-current');
    }
}, function () {
    if ($(this).find('.flat-ico').css("display") == "none") {
        $(this).removeClass('cp-current');
    }
})

////绑定页码事件
//function InitPage() {
//    //处理分页控件
//    $("#pager").children("a").each(function () {
//        if ($(this).attr("href") != "") {
//            //获取分页按钮的超链接
//            var link = $(this).attr("href");
//            $(this).click(function () {
//                pages(link);
//            });
//        }
//        //让超链接不发生跳转
//        $(this).attr("href", "javascript:void(0);");

//    });
//}

////重置页面内容
//function pages(link) {
//    var page = link.split('?')[1].split('=')[2];
//    $.ajax({
//        type: "post",
//        url: '/shared/PinJiaPageControl.aspx?count=9&page='+page,
//        async: false,
//        data: { zip: Math.random() },
//        global: false,
//        success: function (msg) {
//            $("#pinjiaId").html(msg)
//        }
//    });
//    InitPage();//重新绑定页码事件
//}



