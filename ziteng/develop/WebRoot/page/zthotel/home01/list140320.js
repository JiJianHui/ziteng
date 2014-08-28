function AddEvent() {
    $("a.addchain").click(function() {
        $(this).toggleClass("cate_hotel_more").toggleClass("cate_hotel_less"),
        $("div.chainname").toggleClass("hidden")
    }),
    $("div.sort_page span:first").click(function() {
        par.page > 1 && FillParameter(parseInt(par.page) - 1 + ",16", "")
    }),
    $("div.sort_page span:last").click(function() {
        par.page < par.MaxPage && FillParameter(parseInt(par.page) + 1 + ",16", "")
    }),
    $("div.list_srh_bot span[relid],div.list_srh_bot em[relid]").click(function() {
        FillParameter($(this).attr("relid"), "")
    }),
    $("div#list_filter dl dd a span.srh_arrow").click(function() {
        ShowPoint($(this).attr("typeid"), this),
        $(this).parent("a").siblings().removeClass("on"),
        $(this).parent("a").addClass("on")
    }),
    $("div#list_filter dl dd a[relid]").click(function() {
        $("#m_contentedHotSugstAll").hide(),
        $(this).siblings().removeClass("on"),
        $(this).addClass("on"),
        FillParameter($(this).attr("relid"), $(this).text())
    }),
    $("div.sort_box a[relid]").click(function() {
        $(this).siblings("a[relid]").each(function() {
            $(this).attr("class").indexOf("_on") > 0 && $(this).attr("class", $(this).attr("class").replace("_on", ""))
        });
        var b = $(this).attr("class").replace("_on", "") + "_on";
        $(this).attr("class", b),
        FillParameter($(this).attr("relid"), $(this).text())
    }),
    $("#lowprice,#highPrice").blur(function() {
        $(this).val($(this).val().replace(/\D/g, ""))
    }),
    $("#btnSearch2").click(function() {
        var b = $("#lowprice").val(),
        c = $("#highPrice").val();
        "" != b && "" != c && ((parseInt(b) > 0 || parseInt(c) > 0) && (priceName = 0 == parseInt(b) ? c + "元以下": 0 == parseInt(c) ? b + "元以上": b + "-" + c + "元", FillParameter(b + ",6||" + c + ",7", priceName)), $("div.price_on").siblings("a").removeClass("on"))
    }),
    $("div.preOptions input").click(function() {
        var b = 0;
        "isBulk" == $(this).attr("id") ? (b = 11, "checked" == $(this).attr("checked") ? FillParameter("1," + b, "团购酒店") : FillParameter("0," + b, "团购酒店")) : (b = 12, "checked" == $(this).attr("checked") ? FillParameter("1," + b, "预付更便宜") : FillParameter("0," + b, "预付更便宜"))
    }),
    $("#hoteldiv .hotel_inftiptx li a[relid]").click(function() {
        FillParameter($(this).attr("relid"), "")
    }),
    $("#m_contentedHotSugstAll a.com_close").click(function() {
        $(document).unbind("click.m"),
        $("#m_contentedHotSugstAll").hide()
    }),
    par.uid > 0 && $("span.sc-but a").click(function() {
        var b = $(this).parents(".hotel_view").attr("hotelid"),
        c = "http://www.sunnychina.com/api/memberhotel.html?userid=" + par.uid + "&hotelid=" + b;
        $.getJSON(c,
        function(a) {
            return a.result >= 0 ? (alert("加入收藏成功!"), !1) : (alert("加入失败!"), !1)
        })
    })
}
function FillParameter(a, b) {
    var c, d;
    if ("clearAll" == a && (a = "0,2||0,3||0,4||0,5||0,6||0,7||0,8||0,9||0,11||0,12||0,13||0,14||1,16||0,21"), 0 == par.poiId && 0 == par.baiduLat && 0 == par.baiduLng && 9 == par.sort && (par.sort = 0, par.sortName = "默认"), a.indexOf(",16") <= 0 && (par.page = 1), a) {
        for (c = a.split("||"), d = 0; d < c.length; d++) EditParameter(c[d], b); (par.minPrice > 0 || par.maxPrice > 0) && (par.priceType = 0)
    }
    ShowSelectParameter(),
    ReFillHotel()
}
function ShowSelectParameter() {
    var showText = "";
    par.areaId > 0 && (showText += '<span relid="0,2" method="areaName">' + par.areaName + "</span>"),
    par.areaIdXz > 0 && (showText += '<span relid="0,3" method="areaNameXz">' + par.areaNameXz + "</span>"),
    par.chainId > 0 && (showText += '<span relid="0,4" method="chainName">' + par.chainName + "</span>"),
    (0 != par.baiduLat && 0 != par.baiduLng || par.poiId > 0) && (showText += "" != par.poiName ? '<span relid="0,5||0,13||0,14" method="poiName">' + par.poiName + "</span>": '<span relid="0,5||0,13||0,14" method="poiName">' + par.keyPoiName + "</span>"),
    (par.minPrice > 0 || par.maxPrice > 0 || par.priceType > 0) && (showText += '<span relid="0,6||0,7||0,8" method="priceName">' + par.priceName + "</span>"),
    par.star > 0 && (showText += '<span relid="0,9" method="starName">' + par.starName + "</span>"),
    par.isBulk > 0 && (showText += '<span relid="0,11" method="bulkName">' + par.bulkName + "</span>"),
    par.isPrepay > 0 && (showText += '<span relid="0,12" method="prepayName">' + par.prepayName + "</span>"),
    "" != par.hotelName && (showText += '<span relid="0,21" method="hotelName">' + par.hotelName + "</span>"),
    (par.areaId > 0 || par.areaIdXz > 0 || par.chainId > 0 || 0 != par.baiduLat && 0 != par.baiduLng || par.poiId > 0 || par.minPrice > 0 || par.maxPrice > 0 || par.priceType > 0 || par.star > 0 || par.isBulk > 0 || par.isPrepay > 0 || "" != par.hotelName) && (showText += '<em relid="clearAll">清除搜索条件</em>'),
    $(".list_srh_bot div.showPar").html(showText),
    $("div.list_srh_bot span[relid],div.list_srh_bot em[relid]").click(function(e) {
        $(this).attr("method") && eval("par." + $(this).attr("method") + '=""'),
        FillParameter($(this).attr("relid"), "")
    }),
    0 == par.areaId && 0 == par.areaIdXz && 0 == par.poiId && ($("div#list_filter dl dd a span.srh_arrow").removeClass("on"), $("div#list_filter dl dd:first a[relid]").addClass("on")),
    0 == par.chainId && $("div#list_filter dl dd a[method=chainName]").removeClass("on").eq(0).addClass("on"),
    0 == par.minPrice && 0 == par.maxPrice && 0 == par.priceType && ($("div#list_filter dl dd a[method=priceName]").removeClass("on").eq(0).addClass("on"), $("#lowprice").val(""), $("#highPrice").val("")),
    0 == par.star && ($("div#list_filter dl dd a[method=starName]").removeClass("on").eq(0).addClass("on"), $("#lowprice").val(""), $("#highPrice").val(""))
}
function GetPrice() {
    
}
function FillPrice(a) {
    var b = "<p align=center>抱歉,此酒店" + par.checkInDate + "到" + par.checkOutDate + "期间内暂时无法预订.</p>";
    "true" == a.Result && $(a.Hotel).each(function(c, d) {
        var f, g, h, i, e = '<table class="hotel_room_list" border="0" cellspacing="0" cellpadding="0"><tbody><tr><th width="26%">房型</th><th width="20%">早餐</th><th width="8%">床型</th><th width="8%">宽带</th><th width="16%">&nbsp;&nbsp;&nbsp;&nbsp;房价</th><th width="12%">房量</th><th width="10%">&nbsp;</th></tr>';
        d.AdvanceRoomCount = 0,
        d.AdvanceRooms = null,
        d.SpotRoomCount > 0 || d.AdvanceRoomCount > 0 ? (f = 3, g = 0, h = !1, 0 == d.SpotRoomCount ? (g = 3, f = 0, d.AdvanceRoomCount > 3 && (h = !0)) : d.SpotRoomCount > 0 && d.AdvanceRoomCount > 0 ? (f = 2, g = 2, (d.SpotRoomCount > 2 || d.AdvanceRoomCount > 2) && (h = !0)) : d.SpotRoomCount > 3 && (h = !0), $(d.SpotRooms).each(function(a, b) {
            e += "<tr",
            e += a >= f ? ' class="hideroom hidden"': "",
            e += '><td><a href="javascript:" class="roomIntro" roomindex="' + a + '" type="s">' + b.RoomName + '<span class="reduction"></span></a>',
            e += "true" == b.Rate[0].GiftState ? '<span class="gift" index="' + a + '" hindex="' + c + '"></span>': "",
            e += "</td><td>" + b.Rate[0].RatePlanIntro + "</td>",
            e += "-" == b.RoomBed ? "<td>" + b.RoomBed + "</td>": "<td>" + b.RoomBed + "</td>",
            e += "<td>" + b.RoomInternet + "</td>" + '<td><div class="price_jj"><span class="price_20" index="' + a + '" hindex="' + c + '" type="s">' + b.Rate[0].AvgPrice + "</span>&nbsp;&nbsp;",
            e += b.Rate[0].jiangjin_single > 0 ? '<span class="fan_icon">' + b.Rate[0].jiangjin_single + "</span>": "",
            e += "</div></td>",
            e += b.Rate[0].maxBooking >= 6 ? '<td><span class="green">房量充足</span></td>': b.Rate[0].maxBooking > 0 ? '<td><span class="red">仅剩' + b.Rate[0].maxBooking + "间</span></td>": '<td><span class="gray">订完</span></td>',
            e += '<td><div class="icon_chakan">',
            e += "true" == b.Rate[0].BookState ? '<input type="button" value="预订" class="btn_yd" onClick="GoBook(\'' + d.HotelId + "','" + b.RoomId + "','" + b.Rate[0].RateId + "')\" >": '<input type="button" value="满房"  class="btn_mf">',
            e += "</div></td></tr>",
            e += '<tr class="roomhide hidden" Spotindex="' + a + '"><td colspan="6" class="room_xqtip">' + b.RoomIntro + "</td></tr>"
        }), $(d.AdvanceRooms).each(function(a, b) {
            e += "<tr",
            e += a >= g ? ' class="hideroom hidden"': "",
            e += '><td><a href="javascript:" class="roomIntro" roomindex="' + a + '" type="a">' + b.RoomName + '<span class="reduction"></span></a></td>' + "<td>" + b.Rateplans[0].BreakFast + "</td>",
            e += "-" == b.RoomBed ? "<td>" + b.RoomBed + "</td>": "<td>" + b.RoomBed + "床</td>",
            e += "<td>" + b.RoomNet + "</td>" + '<td><div class="price_jj"><span class="price_20" index="' + a + '" hindex="' + c + '" type="a">￥' + b.Rateplans[0].AdvancePrice + '</span>&nbsp;&nbsp;<span class="xyf_icon"></span>',
            e += "</div></td>",
            e += b.Rateplans[0].maxBooking >= 6 ? '<td><span class="green">房量充足</span></td>': b.Rateplans[0].maxBooking > 0 ? '<td><span class="red">仅剩' + b.Rateplans[0].maxBooking + "间</span></td>": '<td><span class="gray">订完</span></td>',
            e += '<td><div class="icon_chakan">',
            e += "1" == b.Rateplans[0].isAvailable ? '<input type="button" value="预订" class="btn_yd" onClick="GoPrepay(\'' + d.HotelId + "')\" >": '<input type="button" value="满房"  class="btn_mf">',
            e += "</div></td></tr>",
            e += '<tr class="roomhide hidden" Advanceindex="' + a + '"><td colspan="6" class="room_xqtip">' + b.RoomIntro + "</td></tr>"
        }), h && (e += '<tr><td colspan="5" class="boder_0"><span class="liwu_pic"></span></td><td colspan="2" class="ag_r"><a href="javascript:" >查看所有房型/价格<span class="all_icon"></span></a></td></tr>'), e += 0 / 0, e = e.replace("NaN", ""), i = $("div.hotel_view[hotelid=" + d.HotelId + "] div.hotel_room"), i.html(e), $(".ag_r a", i).click(function() {
            $("tr.hideroom", i).toggleClass("hidden"),
            $(".ag_r span", i).toggleClass("all_icon").toggleClass("all_icon01")
        }), $("a.roomIntro", i).click(function() {
            var b;
            b = "a" == $(this).attr("type") ? "Advanceindex": "Spotindex",
            $("tr.roomhide[" + b + "=" + $(this).attr("roomindex") + "]", i).toggleClass("hidden"),
            $("span", $(this)).toggleClass("reduction").toggleClass("plus")
        }), $("span.gift", i).mouseover(function() {
            views(this, "v1", a.Hotel[$(this).attr("hindex")].SpotRooms[$(this).attr("index")].Rate[0].GiftContent)
        }), $("span.fan_icon", i).mouseover(function() {
            views(this, "v3", $(this).text())
        }), $("span.price_20", i).mouseover(function() {
            var c;
            c = "a" == $(this).attr("type") ? a.Hotel[$(this).attr("hindex")].AdvanceRooms[$(this).attr("index")].Rateplans[0].RoomPriceDivHtml: a.Hotel[$(this).attr("hindex")].SpotRooms[$(this).attr("index")].Rate[0].RoomPriceDivHtml,
            views(this, "v1", c)
        })) : $("div.hotel_view[hotelid=" + d.HotelId + "] div.hotel_room").html(b)
    }),
    $("div.hotel_view div.hotel_room").has("p[class=loading]").html(b)
}
function GoBook(a, b, c) {
    var d = "home-0111.html?checkindate=" + par.checkInDate + "&checkoutdate=" + par.checkOutDate;
    window.open(d)
}
function GoPrepay(a) {
   
}
function ReFillHotel() {
    dialog.dialog({
        title: par.cityName + "酒店搜索",
        modal: !0
    }),
    dialog.dialog("open");
    var a = GetJsonHotelUrl();
    a += a.indexOf("?") > 0 ? "&callback=?": "?callback=?",
    $.ajax({
        async: !0,
        cache: !1,
        type: "get",
        timeout: "10000",
        dataType: "jsonp",
        url: a,
        success: function(a) {
            FillHotel(a),
            dialog.dialog("close")
        }
    })
}
function FillHotel(a) {
    var c, b = "";
    return a && null != a && "" != a ? (par.hotelCount = parseInt(a[0].RowCounter), c = "", $(a).each(function(a, d) {
        imageurl = "" == d.image_url ? par.staticUrl + "/image/no_img1.gif": par.imagestaticUrl + "/thumb" + d.image_url,
        c += d.hotelid + ",",
        b += '<div class="hotel_view" hotelid="' + d.hotelid + '">' + '<div class="hotel_cont">' + '<div class="img_box"> <a href="/hotel/hotel_' + d.hotelid + '.html" title="' + d.hotel_name + '" target="_blank"><img src="' + imageurl + '" width="120" height="96" /></a></div>' + '<div class="htext_box"> ' + '<h3 class="htext_box_h2"><a href="/hotel/hotel_' + d.hotelid + '.html" title="' + d.hotel_name + '" target="_blank">' + d.hotel_name + '<span class="star_img star_' + d.star + '"></a></span></h3>' + '<dl class="ito_box"><dt>酒店位置：</dt><dd>',
        b += d.area_id > 0 ? '<a href="/hotel/area_' + par.cityId + "_" + d.area_id + '.html" title="' + par.cityName + d.area + '酒店">' + d.area + "</a> ": "",
        b += d.area_id_xz > 0 ? '<a href="/hotel/xarea_' + par.cityId + "_" + d.area_id_xz + '/" title="' + par.cityName + d.area_xz + '酒店">' + d.area_xz + "</a> ": "",
        b += d.xpoint > 0 && d.ypoint > 0 ? '<a href="/hotel/map.asp?hotelid=' + d.hotelid + '&TB_iframe=true&width=600&height=410" title="' + d.hotel_name + '地图" class="thickbox">地图/交通</a>': "",
        b += par.uid > 0 ? '<span class="sc-but"><a href="javascript:">加入收藏</a></span>': "",
        b += '</dd></dl><dl class="ito_box"><dt>酒店地址：</dt><dd>' + d.adress + "</dd></dl>",
        d.zpoint > 0 && (b += '<dl class="ito_box"><dt>距&nbsp;&nbsp;&nbsp;&nbsp;离：</dt><dd>距<span class="color_ff6">', b += "" == par.poiName ? par.keyPoiName: par.poiName, b += '</span>的直线距离约<span class="color_ff6">' + d.zpoint + "</span>公里</dd></dl>"),
        b += '<dl class="ito_box"><dd class="color_666">' + d.intro + '</dd></dl><div class="htext_box2_jiag">',
        b += d.IsBulk > 0 ? '<div class="tuan_float"><a href="http://tuan.sunnychina.com/tuangou_view_' + d.IsBulk + '.html" target="_blank"><span></span>仅售' + parseInt(d.BulkPrice) + "元</a></div>": "",
        b += d.min_price > 0 ? '<span class="jiage">￥' + d.min_price + "</span>起<br />": "",
        b += d.order_count > 0 ? '<div class="hpl_cs">最近已有' + d.order_count + "人预订</div>": "",
        b += d.CountReview > 0 ? '<div class="hpl_cs"><a href="/hotel/hotelReview_' + d.hotelid + '.html" target="_blank" title="好评率数据来源于艺龙旅行网"><span class="font_16b">' + d.ReviewRate + '%</span>好评</a> | <a href="/hotel/hotelReview_' + d.hotelid + '.html" target="_blank" title="' + d.hotel_name + '怎么样" class="col_3">' + d.CountReview + "人评价</a></div>": "",
        b += '</div></div><div class="clear"></div></div>',
        b += d.IsBulk > 0 ? '<div class="tuan_nav"><p><a href="http://tuan.sunnychina.com/tuangou_view_' + d.IsBulk + '.html" target="_blank"  title="' + d.hotel_name + '团购">【' + par.cityName + "】" + d.BulkDescription + '</a></p><span><input type="button" value="团购" name="tuan" onclick="window.open(\'http://tuan.sunnychina.com/tuangou_view_' + d.IsBulk + ".html')\"></span></div>": "",
        b += 0 == par.isSingle ? '<div class="hotel_room"></div>': "",
        b += "</div>"
    }), par.all = c, "," == right(par.all, 1) && (par.all = left(par.all, par.all.length - 1)), $("#hoteldiv").html(b), $("span.sc-but a").click(function() {
        var b = $(this).parents(".hotel_view").attr("hotelid"),
        c = "http://www.sunnychina.com/api/memberhotel.html?userid=" + par.uid + "&hotelid=" + b;
        $.getJSON(c,
        function(a) {
            return a.result >= 0 ? (alert("加入收藏成功!"), !1) : (alert("加入失败!"), !1)
        })
    }), TB_init(), ShowPage(), GetPrice(), void 0) : (b = '<div class="hotel_inftip"><ul class="hotel_inftiptx"><li class="mag_b15"><span class="font16_y">很抱歉，</span>没有找到与您的 <strong>筛选条件</strong> 相关的酒店。。</li><li >建议您适当减少搜索条件：<a href="javascript:" relid="clearAll">清空筛选条件</a></li></ul></div>', par.all = "", $("#hoteldiv").html(b), $("#hoteldiv .hotel_inftiptx li a[relid]").click(function() {
        FillParameter($(this).attr("relid"), "")
    }), par.hotelCount = 0, ShowPage(), !1)
}
function GetAllCityId() {
    par.all = "",
    $("div.hotel_view").each(function() {
        par.all += $(this).attr("hotelid") + ","
    }),
    "," == right(par.all, 1) && (par.all = left(par.all, par.all.length - 1))
}
function ShowPoint(a, b) {
    var c, d, e, f, g, h;
    $("div#HotSuggestContainer").html('<img src="' + par.staticUrl + '/image/indicator.gif" />'),
    c = parseInt(a) || 0,
    d = $(b).offset(),
    e = $(window).width(),
    f = d.top + 12,
    g = e - d.left > 550 ? d.left - 10 : d.left - 450,
    $("#m_contentedHotSugstAll div:first").css("left", g).css("top", f),
    $("#m_contentedHotSugstAll").show(),
    h = "/api/poi.html?v=1.1&cityId=" + par.cityId,
    $.getJSON(h,
    function(a) {
        ShowPoi(c, a, b)
    })
}
function ShowPoi(a, b) {
    switch (a) {
    case 1:
        GetAreaContent(a, b.syq);
        break;
    case 2:
        GetAreaContent(a, b.xzq);
        break;
    case 3:
        GetAirContent(a, b.hcz, b.jichang, b.ctqcz);
        break;
    case 4:
        GetDiBiaoContent(a, b.daxue, "大学周边");
        break;
    case 5:
        GetDiBiaoContent(a, b.jingdian, "景点周边");
        break;
    case 6:
        GetDiBiaoContent(a, b.yiyuan, "医院周边");
        break;
    case 7:
        GetDiTieContent(a, b.lines, b.station)
    }
    $(document).bind("click.m",
    function(a) {
        a = a || window.Event,
        !$(a.target).parents("#m_contentedHotSugstAll").length && !$(a.target).parents("#show_point").length && ($(document).unbind("click.m"), $("#m_contentedHotSugstAll").hide())
    }),
    $("#m_contentedHotSugstAll #HotSuggestContainer a[relid]").click(function() {
        $(document).unbind("click.m"),
        $("#m_contentedHotSugstAll").hide(),
        FillParameter($(this).attr("relid"), $(this).text())
    })
}
function GetAreaContent(a, b) {
    var g, h, c = new Array("ABCD", "EFG", "HIJK", "LMN", "OPQRST", "UVWXYZ"),
    d = "商业区",
    e = 2,
    f = 3;
    if (2 == a && (d = "行政区", e = 3, f = 2), g = '<ul class="caty pt10 clx"><li class="on"> <a method="typeData" index="0" href="javascript:">' + d + "</a> <span></span> </li></ul>", g += '<div class="box2">', b.length >= 30) {
        for (g += '<div class="group"><ul class="clx">', h = 0; h < c.length; h++) g += "<li ",
        g += 0 == h ? 'class="on"': "",
        g += ' method="tagData" index="' + h + '">' + c[h].substr(0, 1) + "-" + c[h].substr(c[h].length - 1, 1) + "</li>";
        g += '<div class="clear"></div></ul></div>',
        g += '<div class="p10 links_box">',
        $(b).each(function(a, b) {
            c[0].indexOf(b.py) >= 0 && (g += '<a relid="' + b.id + "," + e + "||0," + f + '||0,5||1,16"  href="javascript:">' + b.name + "</a>")
        }),
        g += '<div class="clear"></div></div>'
    } else g += '<div class="p10 links_box">',
    $(b).each(function(a, b) {
        g += '<a relid="' + b.id + "," + e + "||0," + f + '||0,5||1,16"  href="javascript:">' + b.name + "</a>"
    }),
    g += '<div class="clear"></div></div>';
    g += "</div>",
    $("#m_contentedHotSugstAll #HotSuggestContainer").html(g),
    $("#m_contentedHotSugstAll div.group ul.clx").size() > 0 && $("#m_contentedHotSugstAll div.group ul.clx li").click(function() {
        if (!$(this).hasClass("on")) {
            $(this).siblings().removeClass("on"),
            $(this).addClass("on");
            var d = parseInt($(this).attr("index")),
            g = "";
            c = new Array("ABCD", "EFG", "HIJK", "LMN", "OPQRST", "UVWXYZ"),
            $(b).each(function(a, b) {
                c[d].indexOf(b.py) >= 0 && (g += '<a relid="' + b.id + "," + e + "||0,," + f + '||0,5||1,16"  href="javascript:">' + b.name + "</a>")
            }),
            g += '<div class="clear"></div>',
            $("#m_contentedHotSugstAll #HotSuggestContainer div.links_box").html(g),
            $("#m_contentedHotSugstAll #HotSuggestContainer a[relid]").click(function() {
                $(document).unbind("click.m"),
                $("#m_contentedHotSugstAll").hide(),
                FillParameter($(this).attr("relid"), $(this).text())
            })
        }
    })
}
function GetDiTieContent(a, b, c) {
    var d = '<ul class="caty pt10 clx"><li class="on"> <a method="typeData" index="0" href="javascript:">地铁站</a> <span></span> </li></ul>';
    d += '<div class="box2">',
    b.length > 1 && (d += '<div class="group"><ul class="clx">', $(b).each(function(a, b) {
        d += "<li ",
        d += 0 == a ? 'class="on"': "",
        d += ' method="tagData" index="' + a + '">' + b.name + "</li>"
    }), d += '<div class="clear"></div></ul></div>'),
    d += '<div class="p10 links_box">',
    $(c).each(function(a, c) {
        b[0].name == c.line && (d += '<a relid="' + c.id + ',5||0,2||0,3||9,10||1,16" href="javascript:">' + c.name + "</a>")
    }),
    d += '<div class="clear"></div></div>',
    d += "</div>",
    $("#m_contentedHotSugstAll #HotSuggestContainer").html(d),
    $("#m_contentedHotSugstAll div.group ul.clx").size() > 0 && $("#m_contentedHotSugstAll div.group ul.clx li").click(function() {
        if (!$(this).hasClass("on")) {
            $(this).siblings().removeClass("on"),
            $(this).addClass("on");
            var d = parseInt($(this).attr("index")),
            e = "";
            p = b,
            $(c).each(function(a, c) {
                b[d].name == c.line && (e += '<a relid="' + c.id + ',5||0,2||0,3||9,10||1,16" href="javascript:">' + c.name + "</a>")
            }),
            e += '<div class="clear"></div>',
            $("#m_contentedHotSugstAll #HotSuggestContainer div.links_box").html(e),
            $("#m_contentedHotSugstAll #HotSuggestContainer a[relid]").click(function() {
                $(document).unbind("click.m"),
                $("#m_contentedHotSugstAll").hide(),
                FillParameter($(this).attr("relid"), $(this).text())
            })
        }
    })
}
function GetAirContent(a, b, c) {
    var e = '<ul class="caty pt10 clx"><li class="on"> <a method="typeData" index="0" href="javascript:">火车站</a> <span></span> </li></ul>';
    e += '<div class="box2"><div class="p10 links_box">',
    $(b).each(function(a, b) {
        e += '<a relid="' + b.id + ',5||0,2||0,3||9,10||1,16"  href="javascript:">' + b.name + "</a>"
    }),
    e += '<div class="clear"></div></div></div>',
    e += '<ul class="caty pt10 clx"><li class="on"> <a method="typeData" index="0" href="javascript:">机场</a> <span></span> </li></ul>',
    e += '<div class="box2"><div class="p10 links_box">',
    $(c).each(function(a, b) {
        e += '<a relid="' + b.id + ',5||0,2||0,3||9,10||1,16"  href="javascript:">' + b.name + "</a>"
    }),
    e += '<div class="clear"></div></div></div>',
    $("#m_contentedHotSugstAll #HotSuggestContainer").html(e)
}
function GetDiBiaoContent(a, b, c) {
    html = '<ul class="caty pt10 clx"><li class="on"> <a method="typeData" index="0" href="javascript:">' + c + "</a> <span></span> </li></ul>",
    html += '<div class="box2"><div class="p10 links_box">',
    $(b).each(function(a, b) {
        html += '<a relid="' + b.id + ',5||0,2||0,3||9,10||1,16"  href="javascript:">' + b.name + "</a>"
    }),
    html += '<div class="clear"></div></div></div>',
    $("#m_contentedHotSugstAll #HotSuggestContainer").html(html)
}
function ShowPage() {
   
}
function EditParameter(a, b) {
    if (a.indexOf(",") > 0) switch (v = a.split(","), m = parseInt(v[1])) {
    case 1:
        par.cityId = v[0],
        par.cityName = "0" == v[0] ? "": b;
        break;
    case 2:
        par.areaId = v[0],
        par.areaName = "0" == v[0] ? "": b;
        break;
    case 3:
        par.areaIdXz = v[0],
        par.areaNameXz = "0" == v[0] ? "": b;
        break;
    case 4:
        par.chainId = v[0],
        par.chainName = "0" == v[0] ? "": b;
        break;
    case 5:
        par.poiId = v[0],
        par.poiName = "0" == v[0] ? "": b;
        break;
    case 6:
        par.minPrice = v[0],
        par.priceName = "0" == v[0] ? "": b;
        break;
    case 7:
        par.maxPrice = v[0],
        par.priceName = "0" == v[0] ? "": b;
        break;
    case 8:
        par.priceType = v[0],
        par.priceName = "0" == v[0] ? "": b;
        break;
    case 9:
        par.star = v[0],
        par.starName = "0" == v[0] ? "": b;
        break;
    case 10:
        par.sort = v[0],
        par.sortName = "0" == v[0] ? "": b;
        break;
    case 11:
        par.isBulk = v[0],
        "0" == v[0] ? (par.bulkName = "", $("div.preOptions input#isBulk").attr("checked", !1)) : par.bulkName = b;
        break;
    case 12:
        par.isPrepay = v[0],
        "0" == v[0] ? (par.prepayName = "", $("div.preOptions input#isPrepay").attr("checked", !1)) : par.prepayName = b;
        break;
    case 13:
        par.baiduLat = v[0],
        par.poiName = "0" == v[0] ? "": b;
        break;
    case 14:
        par.baiduLng = v[0],
        par.poiName = "0" == v[0] ? "": b;
        break;
    case 15:
        par.isSingle = v[0];
        break;
    case 16:
        par.page = v[0],
        par.pageName = "0" == v[0] ? "": b;
        break;
    case 21:
        par.hotelName = v[0],
        par.hotelName = "0" == v[0] ? "": b
    }
}
function SubmitForm() {
    var a, b, c;
    for (v = "0,2||0,3||0,4||0,5||0,6||0,7||0,8||0,9||0,10||0,11||0,12||0,13||0,14||1,16", a = v.split("||"), b = 0; b < a.length; b++) EditParameter(a[b], "");
    par.cityName = $("#cityName").val(),
    par.checkInDate = $("#CheckInDate").val(),
    par.checkOutDate = $("#CheckOutDate").val(),
    par.hotelName = "" == $("#HotelName").val() || $("#HotelName").val().indexOf("输入酒店名") >= 0 ? "": $("#HotelName").val(),
    "" == $("#KeyPoiName").val() || $("#KeyPoiName").val().indexOf("如:火车站") >= 0 ? (dialog.dialog({
        title: par.cityName + "酒店搜索",
        modal: !0
    }), dialog.dialog("open"), par.keyPoiName = "", referUrl = GetJsonHotelUrl(1), window.top.location = referUrl) : (par.keyPoiName = $("#KeyPoiName").val(), c = "/api/getpoint.html?cityId=" + par.cityId + "&keyPoiName=" + encodeURIComponent(par.keyPoiName) + "&callback=", $.getJSON(c,
    function(a) {
        par.baiduLat = a.lat,
        par.baiduLng = a.lng,
        par.sort = 9,
        referUrl = GetJsonHotelUrl(1),
        window.top.location = referUrl
    }))
}
var dialog = $('<div class="dialog" ><img class="loading" src="' + par.staticUrl + '/image/loading01.gif" width="220" height="19" /><p>正在为您查询，请稍后！</p><img class="guanggao" src="' + par.staticUrl + '/image/dialog_img.gif" width="280" height="45" /></div>');
$(document).ready(function() {
    MM_preloadImages(par.staticUrl + "/image/dialog_img.gif", par.staticUrl + "/image/dialog_img.gif", par.staticUrl + "/image/dialog_bg.gif")
}),
LoadSearch(),
AddEvent(),
ShowPage(),
GetAllCityId(),
GetPrice();