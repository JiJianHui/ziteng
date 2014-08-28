if ($('.back-top').size() == 0) {
    $('body').append('<div class="back-top""><a href="javascript:"></a></div>');
}
$('.back-top').click(function () {
    $('html,body').animate({ scrollTop: 0 }, 800, null, function () {
        $('.back-top').hide();
    })
})
$(window).scroll(function () {
    if ($(window).scrollTop() > 150)
        $(".back-top").show();
    else
        $(".back-top").hide();
});
$(window).scroll();