function show_feedback() {
    $.prompt($("#pnl_feedback").clone().find(".FeedForm").attr("id","feedback-form").end().find(".FeedAct").attr("id","feedback-act").end().find("textarea").attr("id","feedback-textarea").end().find(".FeedAct span").attr("id","feedback-errinfo").end().html(), {buttons:{}});
    $("#feedback-textarea").focus(function() {
        if($(this).val() == "欢迎提出宝贵的意见和建议。抱歉我们无法逐一回复，但我们会认真阅读，你的支持是对我们最大的鼓励和帮助。")
            $(this).val("");
    }).blur(function() {
            if($(this).val() == "")
                $(this).val("欢迎提出宝贵的意见和建议。抱歉我们无法逐一回复，但我们会认真阅读，你的支持是对我们最大的鼓励和帮助。");
        });
}
function to_feedback(url) {
    var post_url = url.length == 0 ? '/login/ajax_feedback.php' : url;
    var content = $.trim($("#feedback-textarea").val());
    if(content!="" && content!="欢迎提出宝贵的意见和建议。抱歉我们无法逐一回复，但我们会认真阅读，你的支持是对我们最大的鼓励和帮助。") {
        $.post(post_url, {content:content}, function(d) {
            if(d.ret == 1) {
                $("#feedback-form").fadeOut(250, function() {
                    $(this).html("<div class=\"success\">提交成功，谢谢！</div>").fadeIn(250, function() {
                        setTimeout("$.prompt.close();", 3000);
                    });
                });
                $("#feedback-act").fadeOut(250);
            } else {
                $("#feedback-errinfo").show();
            }
        }, "json");
    } else {
        $("#feedback-errinfo").show();
        $("#feedback-textarea").val("");
    }
}
