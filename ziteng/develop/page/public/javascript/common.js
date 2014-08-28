function doShare(site,qid,share_title){
    var share_content = '#蚂蜂窝问答#我在蚂蜂窝看到一个问题 →_→【'+share_title+'】有谁知道答案？帮忙支个招吧!点这里查看>>';
    var share_url = "http://www.mafengwo.cn/wenda/detail-"+qid+".html";
    var share_img = '';
    eval(sns_share_show(site,share_title,share_content,share_url,share_img));
}

function strlen(str) {
    str = $.trim(str);
    var len = 0;
    for (var i = 0; i < str.length; i++) {
        len += str.charCodeAt(i) > 0 && str.charCodeAt(i) < 255 ? 0.5 : 1;
    }
    return len;
}

function getIndexUrl(mddid,tid,type,start){
    mddid = mddid || 0;
    mddid = parseInt(mddid,10);

    tid = tid || 0;
    tid = parseInt(tid,10);

    start = start || 0;
    start = parseInt(start,10);

    var c_type = "";
    if (type == 1){
        c_type = "new";
    }
    else if (type == 2){
        c_type = "noanswer";
    }
    else if (type == 3){
        c_type = "coin";
    }
    else{
        c_type = "hot";
    }
    var prefix = "http://" + window.location.host + "/wenda/";
    if (start == 0){
        if (mddid == 0 && tid == 0){
            return  prefix + c_type + ".html";
        }
        else{
            if (c_type == "new"){
                return  prefix + mddid + "-" + tid + ".html";
            }
            else{
                return  prefix + mddid + "-" + tid + "/" + c_type+ ".html";
            }
        }
    }
    else{
        return  prefix + mddid + "-" + tid + "/" + c_type+ "-" + start + ".html";
    }
}

function getQaCookie(cookie_key){
    return $.cookie(cookie_key, {path:'/'});
}

function setQaCookie(cookie_key,cookie_value,expire_day){
    $.cookie(cookie_key,cookie_value,{ expires: expire_day, path: '/', domain: 'mafengwo.cn'});
}

function delQaCookie(cookie_key){
    $.cookie(cookie_key,0,{ expires: -1, path: '/', domain: 'mafengwo.cn'});
}

function checkWordNum(target,is_submit){
    is_submit = is_submit || 0;
    var word_box = target.parents("._j_word");
    var max_span = word_box.find("._j_max_num");
    var max_num = parseInt(max_span.html(),10);
    var content = target.val();
    var cur_num = Math.ceil(strlen(content));
    word_box.find("._j_word_num").html(cur_num);
    var err_tip = word_box.find(".err-tips");
    var column = target.data("column") || "内容";
    if (cur_num == 0 && is_submit){
        if (err_tip.length > 0){
            err_tip.html("Please type in the " + column).show();
            target.addClass("err-input");
        }
        else{
            mAlert("Please type in the " + column);
        }
        return false;
    }
    if (cur_num > max_num){
        if (err_tip.length > 0){
            err_tip.html(column + "不能超过" + max_num + "字").show();
            target.addClass("err-input");
        }
        else{
            mAlert(column + "不能超过" + max_num + "字");
        }
        return false;
    }
    else{
        err_tip.hide();
        target.removeClass("err-input");
        return true;
    }
}

$(function (){
    $.mfwplugins.buildGotop();

    $('body').delegate("._j_word_check",'keyup',function(event){
        event.preventDefault();
        checkWordNum($(this));
    });
    $('body').delegate("._j_word_check",'blur',function(event){
        event.preventDefault();
        checkWordNum($(this));
    });

    $('body').delegate("._j_page_loader",'click',function(event){
        event.preventDefault();
        var target = $(this);
        var query = target.data("query") || '';
        var start = target.data("start") || 0;
        var url = "/qa/ajax_pager.php?" + query;
        var offset = target.offset();
        if (target.hasClass('loading')) {
            return;
        }
        new Request(url).setData({
                'start' : start
            })
            .setLoadingElement(target)
            .setHandler( function( response ){
                $("._j_pager_box").append($(response.list_html));
                $("._j_pager").html(response.page_html);
                $(window).scrollTop(offset.top);
            } )
            .send();
    });
    /*
    $('body').delegate("._j_user_card","mouseenter",function(event){
        var target = $(event.currentTarget);
        var uid = target.data("uid") || 0;
        var logo = target.data("logo") || 90;
        if (uid == 0){
            return false;
        }
        var user_card = target.find(".user-card");
        if (user_card.length){
            user_card.show();
        }
        else{
            new Request("/qa/ajax.php").setData({
                'action' : "user_card",
                'uid' : uid,
                'logo' : logo
            })
            .setHandler( function( response ){
                if (response.html != ''){
                    var uc_html = $(response.html);
                    uc_html.insertBefore(target.find("a:first"));
                    uc_html.show();
                }
            } )
            .send();
        }
    });
    $('body').delegate("._j_user_card","mouseleave",function(event){
        //return false;
        var target = $(this);
        if (target.find(".user-card")){
            target.find(".user-card").hide();
        }
    });
    */
    $("body").delegate("._j_question_item","mouseenter",function(event){
        $(this).addClass("hover");
    });

    $("body").delegate("._j_question_item","mouseleave",function(event){
        $(this).removeClass("hover");
    });

    $("body").delegate("._j_question_item","click",function(event){
        if (!$(event.target).hasClass("_j_filter_click")){
            var qid = $(this).data("qid");
            window.location.href = '/wenda/detail-' + qid + ".html";
        }
    });

    $("body").delegate("._j_report_question","click",function(event){
        event.preventDefault();
        var target = $(this);
        var li = target.parents(".answer-item");
        var qid = li.data("qid");
        jb('举报类型:问答ID ('+qid+') 用户id:' + target.data("uid"));
    });

    var suggest_timer;
    $("body").delegate("._j_suggest","focus",function(event){
        var target = $(this);
        var p = target.parents("._j_suggest_hd");
        p.addClass("focus");
        if (target.val() == suggest_default){
            target.val('');
        }
        if (target.val() == ''){
            var mddid = parseInt(target.data("mddid"),10);
            if (mddid){
                target.trigger("keyup");
            }
        }
    });
    $("body").delegate("._j_suggest","blur",function(event){
        var target = $(this);
        var p = target.parents("._j_suggest_hd");
        p.removeClass("focus");
        target.val(suggest_default);
        suggest_timer = setTimeout(function(){
            $("._j_suggest_box").hide();
        },500);
    });

    $("body").delegate("._j_suggest","keyup",function(event){
        if (suggest_timer){
            clearTimeout(suggest_timer);
        }
        var target = $(this);
        var mddid = parseInt(target.data("mddid"),10);

        var title = $.trim(target.val());
        if (title.length == 0 && mddid == 0){
            $("._j_suggest_box").hide();
            return false;
        }
        var request = new Request("/qa/ajax_tag.php");
        request.setData({
            'action' : 'suggest',
            'mddid' : mddid,
            'title' : title
        }).setHandler( function( response ){
            if (response.html != ''){
                $("._j_suggest_box").html(response.html).show();
            }
        })
        .send();
    });

    $("body").delegate("._j_suggest","keydown",function(event){
        if (event.keyCode == 13){
            $("._j_search").trigger("click");
        }
    });

    $("body").delegate("._j_search","click",function(event){
        event.preventDefault();
        var kw = $("._j_suggest").val();
        if (kw == suggest_default || kw.length == 0){
            return false;
        }
        window.location.href = "/qa/search.php?kw=" + encodeURIComponent(kw);
    });

    var share_timer;
    $("body").delegate("._j_show_share","mouseenter",function(event){
        event.preventDefault();
        var p = $(this).parents("._j_share_box");
        p.find("._j_share_pop").show();
    });

    $("body").delegate("._j_show_share","mouseleave",function(event){
        event.preventDefault();
        var p = $(this).parents("._j_share_box");
        share_timer = setTimeout(function(){
            p.find("._j_share_pop").hide();
        },300);
    });

    $("body").delegate("._j_share_pop","mouseenter",function(event){
        event.preventDefault();
        if (share_timer){
            clearTimeout(share_timer);
        }
        $(this).show();
    });

    $("body").delegate("._j_share_pop","mouseleave",function(event){
        event.preventDefault();
        var target = $(this);
        share_timer = setTimeout(function(){
            target.hide();
        },300);
    });

    $("body").delegate("._j_do_share","click",function(event){
        event.preventDefault();
        var target = $(this);
        var p = target.parent();
        doShare(target.data("site"), p.data("qid"), p.data("title"));
    });

    $("body").delegate("._j_show_login","click",function(event){
        event.preventDefault();
        show_login();
    });
});

$(document).ready(function(){
    if ($("._j_mdd_wenda_page").length == 0){
        var request = new Request("/qa/ajax_medal.php");
        request.setData({
            'action' : 'get_medal'
        }).setHandler( function( response ){
            if (response.id > 0){
                Request.loadDialog("/qa/ajax_medal.php?action=show_medal&id=" + response.id);
            }
        })
        .send();
    }
});