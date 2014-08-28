var msg = {};
msg.show = function (e, a, c,mobile,taskid) {
    var d = [
            '<form id="formLetter">',
                '<input type="hidden" name="to" value="' + e + '" />',
                '<div class="pop-reply" style="padding:0 0 0 0;">',
                    "<ul>",
                        mobile ? '<li class="tel yahei"><p style=" background-image:none;margin:0px; padding:0px; font-size:16px;"></p><p><img src="' + mobile + '" /></p></li>' : '',
                        '<li class="clearfix" style="background:none;">',
                            '<div class="head-pic fn-left"><img src="' + window.domain + c + '" width="40" height="40"></div>',
                            '<div class="fn-right" id="boxComment">',
                                '<textarea name="content" id="txtComment" class="textarea3"></textarea>',
                                '<div class="func clearfix">',
                                    '<div class="fn-left">',
                                        '<a href="javascript:;" class="ico-face ico m_face"></a>',
                                    "</div>",
                                    '<div class="fn-right">',
                                        '<span class="boxMore" style=" margin-right:10px; color:Red;display:none;">已超过<span class="font18 yahei boxCommentTip">1</span >字</span>',
                                        '<span class="boxValid" class="cr666" style=" margin-right:10px">还能输入<span class="font18 yahei boxCommentTip">70</span >字</span>',
                                        '<span class="sure-btn"><a href="javascript:;" class=" btn btnReply">发送</a></span>',
                                    "</div>",
                                "</div>",
                            "</div>",
                        "</li>",
                    "</ul>",
                "</div>",
            "</form>",
    ].join(""),
    b = m.dialog({
        content: d,
        title: "免费给" + a+"发短信",
        initFn: function () {
            $(".m_face").mface({
                txtAreaObj: $("#txtComment"),
                containerObj: $("#boxComment"),
                top: 25,
                left: -27
            });
            $("#txtComment").keyup(function () {
                var a = 70 - $(this).val().length;
                if (a >= 0) {
                    $(".boxMore").hide();
                    $(".boxValid").show()
                } else {
                    $(".boxMore").show();
                    $(".boxValid").hide()
                }
                $(".boxCommentTip").html(Math.abs(a))
            });
            $(".btnReply").click(function () {
                $(".boxMore").is(":hidden")
                && $("#txtComment").val()
                && $.getJSON(window.domain + '/center/service/letter.aspx?do=send&task='+(taskid||'')+'&jsoncallback=?',
                    $("#formLetter").serialize(),
                    function (a) {
                        if (a.Success) m.pop.success(a.Msg,
                        function () {
                            b.close()
                        });
                        else m.pop.error(a.Msg)
                    })
            })
        }
    })
}