(function ($, window, undefined) {

    //#region 声明
    var Meeko = (function () {
        var Meeko = function (opts) {
            return new Meeko.fn.init(opts);
        }
        Meeko.fn = Meeko.prototype = {
            init: function (opts) {
                this.config = $.extend({}, Meeko.defaults, opts);
            }
        }
        Meeko.fn.init.prototype = Meeko.fn;
        Meeko.extend = Meeko.fn.extend = function (fns) {
            $.extend(this, fns);
            return this;
        }
        return Meeko;
    })();
    this.m = Meeko;
    //#endregion 

    //#region 配置
    Meeko.extend({
        defaults: {
            focusAttribute: 'focusClass',
            hoverAttribute: 'hoverClass',
            clickAttribute: 'clickClass',
            tipsAttribute: 'tips',
            radioAttribute: 'radio',
            checkBoxAttribute: 'checkBox',
            checkedClassAttribute: 'checkedClass',
            tabAttribute: 'tab',
            hoverTabAttribute: 'htab',
            menuAttribute: 'menu',
            clickMenuAttribute: 'cmenu',
            activeClassAttribute: 'activeClass',
            accordionAttribute: 'accordion',
            groupAttribute: 'group',
            hideActiveClass: 'hide',
            resetAttribute: 'reset',
            selectAttribute: 'select'
        }
    });
    //#endregion 

    //#region M工具
    Meeko.extend({
        dialog: function (config, yesFn, noFn) {
            var defaults = {
                id: 'dialog',
                lock: true,
                opacity: .1
            }
            if (typeof config === 'string') {
                defaults.content = config;
            } else {
                $.extend(defaults, config);
            }
            return $.artDialog(defaults, yesFn, noFn);
        },
        pop: {
            tips: function (content, time) {
                return $.artDialog({
                    id: 'Tips',
                    title: '操作提示',
                    title: false,
                    noFn: false,
                    fixed: true,
                    lock: true,
                    opacity: .1
                })
                .content('<div style="padding: 0 1em;">' + content + '</div>')
                .position('50%', 'goldenRatio')
                .time(time || 1.5);
            },
            success: function (content, urlOrFn, timer) {
                var closeFn = function () {
                    if (urlOrFn != undefined) {
                        if (typeof urlOrFn === 'string')
                            location = urlOrFn;
                        else if (typeof urlOrFn === 'function')
                            urlOrFn();
                    }
                }
                return $.artDialog({
                    id: 'Success',
                    title: '操作提示',
                    title: false,
                    noFn: false,
                    fixed: true,
                    icon: 'succeed',
                    closeFn: closeFn,
                    opacity: .1
                })
                .content('<div style="padding: 0 1em;">' + content + '</div>')
                .position('50%', 'goldenRatio')
                .time(timer || 1.5);
            },
            error: function (content, urlOrFn) {
                var closeFn = function () {
                    if (urlOrFn != undefined) {
                        if (typeof urlOrFn === 'string')
                            location = urlOrFn;
                        else if (typeof urlOrFn === 'function')
                            urlOrFn();
                    }
                }
                return $.artDialog({
                    id: 'Error',
                    title: false,
                    fixed: true,
                    icon: 'error',
                    content: content,
                    lock: true,
                    closeFn: closeFn,
                    opacity: .1
                });
            },
            alert: function (content) {
                return $.artDialog({
                    id: 'Alert',
                    title: '操作提示',
                    icon: 'warning',
                    fixed: true,
                    lock: true,
                    content: content,
                    opacity: .3,
                    yesFn: true
                });
            },
            tips: function (content, time) {
                return $.artDialog({
                    id: 'Tips',
                    title: '操作提示',
                    title: false,
                    noFn: false,
                    fixed: true,
                    lock: true,
                    opacity: .3
                })
                .content('<div style="padding: 0 1em;">' + content + '</div>')
                .position('50%', 'goldenRatio')
                .time(time || 1.5);
            },
            confirm: function (content, yes, no) {
                return $.artDialog({
                    id: 'Confirm',
                    title: '操作提示',
                    title: false,
                    icon: 'question',
                    fixed: true,
                    lock: true,
                    opacity: .3,
                    content: content,
                    noFn: function (here) {
                        return no && no.call(this, here);
                    },
                    yesFn: function (here) {
                        return yes.call(this, here);
                    }
                });
            },
            success: function (content, urlOrFn, timer) {
                var closeFn = function () {
                    if (urlOrFn != undefined) {
                        if (typeof urlOrFn === 'string')
                            location = urlOrFn;
                        else if (typeof urlOrFn === 'function')
                            urlOrFn();
                    }
                }
                return $.artDialog({
                    id: 'Success',
                    title: '操作提示',
                    title: false,
                    noFn: false,
                    fixed: true,
                    icon: 'succeed',
                    closeFn: closeFn,
                    opacity: .3
                })
                .content('<div style="padding: 0 1em;">' + content + '</div>')
                .position('50%', 'goldenRatio')
                .time(timer || 1.5);
            },
            error: function (content, urlOrFn) {
                var closeFn = function () {
                    if (urlOrFn != undefined) {
                        if (typeof urlOrFn === 'string')
                            location = urlOrFn;
                        else if (typeof urlOrFn === 'function')
                            urlOrFn();
                    }
                }
                return $.artDialog({
                    id: 'Error',
                    title: false,
                    fixed: true,
                    icon: 'error',
                    content: content,
                    lock: true,
                    closeFn: closeFn,
                    opacity: .3
                });
            },
            warning: function (content) {
                return $.artDialog({
                    id: 'Warning',
                    title: false,
                    fixed: true,
                    icon: 'warning',
                    content: content,
                    lock: true,
                    opacity: .3
                });
            },
            prompt: function (content, yes, value, title, ispass) {
                value = value || '';
                title = title || '请输入';
                var input;

                return $.artDialog({
                    id: 'Prompt',
                    icon: 'question',
                    fixed: true,
                    lock: true,
                    opacity: .3,
                    title: title,
                    content: [
                            '<div style="margin-bottom:5px;font-size:12px">',
                                content,
                            '</div>',
                            '<div>',
                                '<input value="',
                                    value,
                                '" style="width:18em;padding:6px 4px" ',
                                ispass ? 'type="password"' : '',
                                '/>',
                            '</div>'
                            ].join(''),
                    initFn: function () {
                        input = this.DOM.content.find('input')[0];
                        input.select();
                        input.focus();
                    },
                    yesFn: function (here) {
                        return yes && yes.call(this, input.value, here);
                    },
                    noFn: true
                });
            },
            full: function (content, title, fn) {
                return m.dialog({
                    padding: 0,
                    title: title || '操作提示',
                    lock: true,
                    fixed: true,
                    closeFn: fn,
                    width: '100%',
                    height: '100%',
                    left: '0%',
                    top: '0%',
                    yesFn: fn,
                    opacity: .3
                })
                    .content(content)
                    .position('50%', 'goldenRatio');
            },
            photo: function (url, w, h) {
                w = w || "", h = h || "";
                var temp = [
                    '<div class="pop-photo" id="m_photo_box">',
                //		                '<div class="leftbtn ico"></div>',
                //		                '<div class="rightbtn ico"></div>',
		                '<div class="m_photo"></div>',
	                '</div>'
                ].join('');
                var m_dialog = m.dialog({
                    padding: 0,
                    title: '浏览相册',
                    lock: true,
                    width: w,
                    height: h,
                    opacity: .3,
                    content: temp
                });
                var newImg = new Image();
                newImg.src = url;
                h = newImg.height;
                w = newImg.width;
                newImg.onload = function () {
                    $('#m_photo_box .m_photo').html('<img style="display:inline-block;" src="' + url + '"/>');
                    m_dialog.position('50%', 'goldenRatio');
                }

                if (_photoList && _photoList.length > 1) {
                    var now = _photoList.indexOf(url);
                    var next = now + 1 > _photoList.length ? 0 : now + 1;
                    //                    var prev =
                    //                    $('#m_photo_box .leftbtn')
                }
                else {
                    $('#m_photo_box .leftbtn').hide();
                    $('#m_photo_box .rightbtn').hide();
                }
                return m_dialog;
            },
            loading: function (content) {
                return m.pop.tips('<img src="' + window['domain'] + '/res/images/icon/loading.gif" style="margin-right:5px;"/><span style="line-height:15px; height:15px;vertical-align:top; display:inline-block;">' + (content || '请稍后……') + '</span>', 2000);
            }
        },
        cookie: {
            getSource: function (name) {
                var arrStr = document.cookie.split("; ");
                for (var i = 0; i < arrStr.length; i++) {
                    var temp = arrStr[i].split("=");
                    if (temp[0] == name) return temp[1];
                }
            },
            get: function (name) {
                var arrStr = document.cookie.split("; ");
                for (var i = 0; i < arrStr.length; i++) {
                    var temp = arrStr[i].split("=");
                    if (temp[0] == name) return unescape(temp[1]);
                }
            },
            add: function (name, value, hours) {//添加cookie
                var str = name + "=" + escape(value);
                if (hours > 0) {//为0时不设定过期时间，浏览器关闭时cookie自动消失
                    var date = new Date();
                    var ms = hours * 3600 * 1000;
                    date.setTime(date.getTime() + ms);
                    str += "; expires=" + date.toGMTString();
                }
                document.cookie = str;
            },
            del: function (name) {//为了删除指定名称的cookie，可以将其过期时间设定为一个过去的时间
                var date = new Date();
                date.setTime(date.getTime() - 10000);
                document.cookie = name + "=a; expires=" + date.toGMTString();
            }
        },
        url: {
            page: function () {
                var strUrl = window.location.href;
                var arrUrl = strUrl.split("/");
                var strPage = arrUrl[arrUrl.length - 1];
                return strPage;
            },
            params2Object: function () {
                var args = {};
                var query = location.search.substring(1);
                var pairs = query.split("&");
                for (var i = 0; i < pairs.length; i++) {
                    var pos = pairs[i].indexOf('=');
                    if (pos == -1) continue;
                    var argname = pairs[i].substring(0, pos); // Extract the name
                    var value = pairs[i].substring(pos + 1); // Extract the value
                    value = decodeURIComponent(value); // Decode it, if needed
                    args[argname] = value;
                }
                return args; // Return the object 
            },
            object2Params: function (obj) {
                var params = [];
                for (var p in obj) {
                    if (obj[p] !== undefined)
                        params.push(p + '=' + obj[p]);
                }
                return params.join('&');
            }
        }
    });
    //#endregion

    //#region AA工具
    Meeko.extend({
        findAddress: function (codeOrName, codelen) {
            codelen = codelen || 3;
            if (isNaN(codeOrName)) {
                for (var i = 0; i < cityAry.length; i++) {
                    if (cityAry[i][3] == codeOrName && cityAry[i][1].length == codelen)
                        return cityAry[i];
                }
            } else {
                for (var i = 0; i < cityAry.length; i++) {
                    if (cityAry[i][1] == codeOrName && cityAry[i][1].length == codelen)
                        return cityAry[i];
                }
            }
        },
        getCity: function () {
            var citys = [];
            for (var i = 0; i < cityAry.length; i++) {
                if (cityAry[i][1].length == 3)
                    citys.push(cityAry[i]);
            }
            return citys;
        },
        getArea: function (codeOrName) {
            var c = this.findAddress(codeOrName), child = [];
            if (c) {
                for (var i = 0; i < cityAry.length; i++) {
                    if (cityAry[i][1].length == 5 && cityAry[i][1].substring(0, 3) == c[1])
                        child.push(cityAry[i]);
                }
            }
            return child;
        },
        isLogin: function (okFn, noFn) {
            $.getJSON(window['domain'] + '/account/login.aspx?do=islogin&jsoncallback=?', function (rst) {
                if (rst) okFn();
                else noFn();
            });
        },
        showLogin: function (fn) {
            var loginDialog = m.dialog({
                id: 'loginDialog',
                padding: 0,
                meeko: fn,
                title: '快速登录AA拼车网'
            }).position('50%', 'goldenRatio');
            $.get('/account/login.html', {}, function (temp) {
                temp = temp.replace(/{m.Domain}/g, window['domain']);
                temp = temp.replace(/{m.ResDomain}/g, window['resdomain']);
                loginDialog.content(temp);
            }, 'html');
        },
        withLoginDo: function (fn) {
            m.isLogin(fn, function () { m.showLogin(fn); });
        },
        editor: function (config, items) {
            if (!KE)
                return;
            if (KE) {
                var options = {};
                if (typeof config === 'string')
                    options.id = config;
                else
                    options = config;
                options.imageUploadJson = '/ashx/editor_upload.ashx';
                options.fileManagerJson = '/ashx/editor_file.ashx';
                options.allowFileManager = false;
                if (items)
                    options.items = items;
                KE.show(options);
            }
        },
        simpleEditor: function (config) {
            this.editor(config, ['image', 'emoticons']);
        },
        infoEditer: function (config) {
            var item = [
		        'fullscreen', 'justifyleft', 'justifycenter', 'justifyright',
		        'justifyfull', '|',
		        'fontname', 'fontsize', '|', 'textcolor', 'bgcolor', 'bold',
		        'italic', 'underline', 'removeformat', '|', 'image'
	        ];
            this.editor(config, item);
        }
    });
    //#endregion

    //#region 注册特效
    Meeko.fn.extend({
        // demo: <input type="text" hoverClass="hoverClass"/>
        hover: function () {
            var cfg = this.config;
            $('[' + cfg.hoverAttribute + ']')
            .live('mouseover', function () {
                $(this).addClass($(this).attr(cfg.hoverAttribute));
            })
            .live('mouseout', function () {
                $(this).removeClass($(this).attr(cfg.hoverAttribute));
            });
            return this;
        },
        // demo: <input type="button" clickClass="clickClass"/>
        click: function () {
            var cfg = this.config;
            $('[' + cfg.clickAttribute + ']')
            .live('mousedown', function () {
                $(this).addClass($(this).attr(cfg.clickAttribute));
            })
            .live('mouseup', function () {
                $(this).removeClass($(this).attr(cfg.clickAttribute));
            })
            .live('mouseout', function () {
                $(this).removeClass($(this).attr(cfg.clickAttribute));
            });
            return this;
        },
        // demo: <input type="text" focusClass="focusClass"/>
        focus: function () {
            var cfg = this.config;
            $('[' + cfg.focusAttribute + ']')
            .live('focus', function () {
                $(this).parent().parent().addClass($(this).attr(cfg.focusAttribute));
            })
            .live('blur', function () {
                $(this).parent().parent().removeClass($(this).attr(cfg.focusAttribute));
            });
            return this;
        },
        // demo: <input type="text" tips="提示文本"/>
        tips: function (opts) {
            var cfg = this.config;
            $('[' + cfg.tipsAttribute + ']').each(function (i, item) {
                opts = opts || $.tipsDefaults;
                opts.tipsText = $(this).attr(cfg.tipsAttribute);
                $(item).tips(opts);
            });
            return this;
        },
        show: function () {
            var cfg = this.config;
            $('[show]').click(function () {
                var _this = $(this), box = $('#' + _this.attr('show')), _class = _this.attr(cfg.activeClassAttribute);
                if (box.is(':hidden')) {
                    box.show();
                    _this.addClass(_class);
                } else {
                    box.hide();
                    _this.removeClass(_class);
                }
            });
            return this;
        },
        hide: function () {
            var cfg = this.config;
            $('[' + cfg.hideActiveClass + ']').click(function () {
                $('#' + $(this).attr(cfg.hideActiveClass)).hide();
            });
            return this;
        }
    });
    //#endregion

    //#region 注册事件
    Meeko.fn.extend({
        enter: function () {
            $('input').keydown(function (e) {
                if (e.keyCode == 13) {
                    $(this).parents('form').submit();
                }
            });
            return this;
        },
        reset: function () {
            var cfg = this.config;
            $('[' + cfg.resetAttribute + ']').click(function () {
                var _form = $('#' + $(this).attr(cfg.resetAttribute));
                _form.find('input').each(function () {
                    var 
                    _this = $(this),
                    type = _this.attr('type'),
                    isreset = !_this.attr('noreset');
                    if (isreset) {
                        if (type == 'text' || type == 'password') _this.val('').showTip();
                        if (type == 'checkbox') _this.attr('checked', '');
                    }
                });
            });
            return this;
        },
        setIco: function () {
            $('.ico1').click(function (event) {
                var ipt = $(this).prev().find('input');
                if (ipt.length > 0) {
                    if (ipt.attr('disabled')) { } else {
                        ipt.focus();
                        event = event || window.event;
                        event.stopPropagation();
                    }
                }
            });
            $('.ico5').click(function (event) {
                var ipt = $(this).prev().find('input');
                if (ipt.length > 0) {
                    ipt.focus();
                }
            });
            $('.ico4').click(function (event) {
                var ipt = $(this).prev().find('input');
                if (ipt.length > 0) {
                    ipt.focus();
                }
            });
            return this;
        }
    });
    //#endregion

    //#region 控件
    Meeko.fn.extend({
        // demo: <span class="rdoSex" radio="{name:'Sex',value:'1',checked:true,change:'changeFN'}" checkedClass="checked">先生</span>
        //       <span class="rdoSex" radio="{name:'Sex',value:'0',change:'changeFN'}" checkedClass="checked">女士</span>
        radio: function () {
            var cfg = this.config, rdos = [];
            $('[' + cfg.radioAttribute + ']').each(function () {
                var opts = [], rdo = null, checkedClass = $(this).attr(cfg.checkedClassAttribute);
                eval('opts = ' + $(this).attr(cfg.radioAttribute));
                rdo = $('<input style="display:none;" type="radio" name="' + opts.name + '" value="' + opts.value + '" ' + (opts.checked ? 'checked="checked"' : '') + '/>');
                rdo.click(function (event) {
                    event = event || window.event;
                    event.stopPropagation();
                });
                $(this).attr('group', opts.name);

                $(this)
                .click(function () {
                    rdo.click();
                    $('[' + cfg.radioAttribute + '][group="' + opts.name + '"]').removeClass(checkedClass);
                    $(this).addClass(checkedClass);
                    if (opts.change) eval(opts.change + '("' + $('[name="' + opts.name + '"]:checked').val() + '")');
                })
                .append(rdo);

                if (opts.checked) $(this).addClass(checkedClass);
            });
            return this;
        },
        checkBox: function () {
            var cfg = this.config;
            $('[' + cfg.checkBoxAttribute + ']').each(function () {
                var opts = [], check = null, checkedClass = $(this).attr(cfg.checkedClassAttribute);
                eval('opts = ' + $(this).attr(cfg.checkBoxAttribute));
                check = $('<input style="display:none;" type="checkbox" name="' + opts.name + '" value="' + opts.value + '" />');
                check.click(function (event) {
                    event = event || window.event;
                    event.stopPropagation();
                });
                if (opts.checked) check.attr('checked', true);

                $(this)
                .click(function () {
                    check.click();
                    if ($(this).hasClass(checkedClass)) $(this).removeClass(checkedClass);
                    else $(this).addClass(checkedClass);
                    if (opts.change) eval(opts.change + '(' + (check.attr('checked') ? 'true' : 'false') + ')');
                })
                .append(check);

                if (opts.checked) $(this).addClass(checkedClass);
            });

            return this;
        },
        // demo: <div><a href="#tabContent1" tab/htab="active">选项卡1</a><a href="#tabContent2" tab/htab="active">选项卡2</a></div>
        //       <div><div id="tabContent1"></div><div id="tabContent2"></div></div>
        tab: function () {
            var cfg = this.config;
            $('[' + cfg.tabAttribute + ']').live('click', function () {
                var id = $(this).attr('href'), activeClass = $(this).attr(cfg.tabAttribute);
                $(this).addClass(activeClass).siblings().each(function () { $(this).removeClass($(this).attr(cfg.tabAttribute)); });
                $(id).show().siblings().hide();
                return false;
            });

            // 感应切换
            $('[' + cfg.hoverTabAttribute + ']').live('mouseover', function () {
                var id = $(this).attr('href'), activeClass = $(this).attr(cfg.hoverTabAttribute);
                $(this).addClass(activeClass).siblings().removeClass(activeClass);
                $(id).show().siblings().hide();
                return false;
            }).click(function () { return false; });
            return this;
        },

        // demo:
        menu: function () {
            var 
            cfg = this.config,
            delay = 200,
            showTimer = null;

            $('[' + cfg.menuAttribute + ']').each(function () {
                var 
                _this = $(this),
                hideTimer = null,
                hidding = true,
                menuBox = $('#' + _this.attr(cfg.menuAttribute)),
                activeClass = _this.attr(cfg.activeClassAttribute) || '',
                menuOver = _this.attr('menuOver'),
                isSlideDown = _this.attr('slideDown'),
                show = function () {
                    if (isSlideDown) {
                        _this.addClass(activeClass);
                        menuBox.slideDown();
                    } else {
                        _this.addClass(activeClass);
                        menuBox.show();
                    }
                },
                hide = function () {
                    if (isSlideDown) {
                        menuBox.slideUp(function () {
                            if (hidding) _this.removeClass(activeClass);
                        });
                    } else {
                        _this.removeClass(activeClass);
                        menuBox.hide();
                    }
                };
                _this.mouseover(function () {
                    hidding = false;
                    clearTimeout(hideTimer);
                    showTimer = setTimeout(show, delay);
                }).mouseout(function () {
                    hidding = true;
                    clearTimeout(showTimer);
                    hideTimer = setTimeout(hide, delay);
                });
                if (menuOver) {
                    menuBox.mouseover(function () {
                        clearTimeout(showTimer);
                        clearTimeout(hideTimer);
                    }).mouseout(function () {
                        clearTimeout(showTimer);
                        hideTimer = setTimeout(hide, delay);
                    });
                }
            });

            $('[' + cfg.clickMenuAttribute + ']').each(function () {
                var 
                _this = $(this),
                menuBox = $('#' + $(this).attr(cfg.clickMenuAttribute)),
                activeClass = _this.attr(cfg.activeClassAttribute) || '',
                show = function () {
                    _this.addClass(activeClass);
                    menuBox.show();
                },
                hide = function () {
                    _this.removeClass(activeClass);
                    menuBox.hide();
                };
                _this.click(function () {
                    show();
                }).mouseout(function () {
                    hideTimer = setTimeout(hide, 200);
                });
                menuBox.mouseover(function () {
                    clearTimeout(hideTimer);
                }).mouseout(function () {
                    hideTimer = setTimeout(hide, 200);
                });
            });
            return this;
        },
        accordion: function () {
            var cfg = this.config;
            $('[' + cfg.accordionAttribute + ']').each(function () {
                var 
                _this = $(this),
                activeClass = _this.attr(cfg.activeClassAttribute),
                menuBox = $('#' + _this.attr(cfg.accordionAttribute)),
                group = $('[' + cfg.accordionAttribute + '][' + cfg.groupAttribute + ']');

                _this.click(function () {
                    if (menuBox.is(':hidden')) {
                        group.each(function () {
                            $('#' + $(this).attr(cfg.accordionAttribute)).hide();
                        });
                        menuBox.show();
                        _this.addClass(activeClass);
                    } else {
                        menuBox.hide();
                        _this.removeClass(activeClass);
                    }
                });
            });

            return this;
        },
        select: function () {
            var cfg = this.config;
            var selects = $('[' + cfg.selectAttribute + ']');

            $('[selectTarget]').click(function (event) {
                event = event || window.event;
                event.stopPropagation();
                var 
                _this = $(this),
                _selectTarget = $('#' + _this.attr('selectTarget'));
                _selectTarget.focus();
            });
            selects.each(function () {
                var 
                _this = $(this),
                _activeClass = _this.attr(cfg.activeClassAttribute),
                selectBox = $('#' + _this.attr(cfg.selectAttribute)),
                hide = function () {
                    if (_activeClass) _this.removeClass(_activeClass);
                    selectBox.hide();
                },
                init = function () {
                    selects.each(function () {
                        $('#' + $(this).attr(cfg.selectAttribute)).hide();
                    });
                    if (_activeClass) _this.addClass(_activeClass);
                    selectBox.show();
                };

                if (_this[0].nodeName.toLowerCase() == 'input') _this.focus(init);
                else _this.click(init);


                selectBox.find('[selectItem]').click(function () {
                    if (_this.hideTip) _this.hideTip();

                    if (_this[0].nodeName.toLowerCase() == 'input') _this.val($(this).attr('selectItem'));
                    else _this.html($(this).attr('selectItem'));
                    

                    hide();
                });
                $(document).click(hide);
                // 停止冒泡
                _this.click(function (event) {
                    event = event || window.event;
                    event.stopPropagation();
                });
                selectBox.click(function (event) {
                    event = event || window.event;
                    event.stopPropagation();
                });
            });
            return this;
        },
        numlist: function () {
            $('[numlist]').each(function () {
                var 
                _this = $(this),
                _num = _this.attr('numlist'),
                numLen = _this.attr('numLen'),
                minNum = (new Date()).getFullYear(),
                maxNum = 1900;

                if (_num) {
                    minNum = parseInt(_num.split('-')[0]);
                    maxNum = parseInt(_num.split('-')[1]);
                }
                if (minNum < maxNum) {
                    for (var i = minNum; i <= maxNum; i++) {
                        _this.append('<a href="javascript:;" selectItem="' + i.pad(numLen) + '">' + i.pad(numLen) + '</a>');
                    }
                } else {
                    for (var i = minNum; i >= maxNum; i--) {
                        _this.append('<a href="javascript:;" selectItem="' + i.pad(numLen) + '">' + i.pad(numLen) + '</a>');
                    }
                }
            });
            return this;
        },
        goTop: function (exp) {
            var
            timer,
            getScrollTop = function () { return document.documentElement.scrollTop || document.body.scrollTop; },
            setScrollTop = function (value) {
                if (document.documentElement.scrollTop) {
                    document.documentElement.scrollTop = value;
                } else {
                    document.body.scrollTop = value;
                }
            },
            scrollMove = function () {
                setScrollTop(getScrollTop() / 1.1);
                if (getScrollTop() < 1) clearInterval(timer) ;
            };

            $(exp).click(function () { if (document['goBottomTimer']) clearInterval(document['goBottomTimer']); timer = setInterval(scrollMove, 10); document['goTopTimer'] = timer; });
            window.onscroll = function () { getScrollTop() > 200 ? $(exp).show() : $(exp).hide(); }
            return this;
        },
        goBottom: function (exp) {
            var
            timer,
            getScrollTop = function () { return document.documentElement.scrollTop || document.body.scrollTop; },
            getScrollHeight = function () { return document.documentElement.scrollHeight || document.body.scrollHeight; },
            getHight = function () {
                return document.documentElement.clientHeight || document.body.clientHeight;
            },
            setScrollTop = function (value) {
                $(document).scrollTop(value);
            },
            scrollMove = function () {
                var max = getScrollHeight() - getHight();
                setScrollTop(max -((max - getScrollTop()) / 1.1-1));
                if (getScrollTop() >= max ) {
                    clearInterval(timer);
                }
            };
            $(exp).click(function () { if (document['goTopTimer']) clearInterval(document['goTopTimer']); timer = setInterval(scrollMove, 10); document['goBottomTimer'] = timer; });

            return this;
        },
        goTopOld: function () {
            var 
            timer,
            temp = [
                '<div class="back-top">',
			        '<a href="javascript:;" class="btnGoTop"></a>',
		        '</div>',
		        '<div class="back-top2">',
			        '<a clickClass="clicked" target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=4000052030&site=qq&menu=yes">客服1001<i class="ico qq"></i></a>',
			        '<a clickClass="clicked" target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=4000052030&site=qq&menu=yes">客服1002<i class="ico qq"></i></a>',
			        '<a clickClass="clicked" target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=4000052030&site=qq&menu=yes">客服1003<i class="ico qq"></i></a>',
		        '</div>'
            ].join(''),
            getScrollTop = function () { return document.documentElement.scrollTop || document.body.scrollTop; },
            setScrollTop = function (value) {
                if (document.documentElement.scrollTop) {
                    document.documentElement.scrollTop = value;
                } else {
                    document.body.scrollTop = value;
                }
            },
            scrollMove = function () {
                setScrollTop(getScrollTop() / 1.1);
                if (getScrollTop() < 1) clearInterval(timer);
            };

            temp = $(temp);
            temp.hide();
            $('body').append(temp);
            temp.find('.btnGoTop').click(function () { timer = setInterval(scrollMove, 10); });
            window.onscroll = function () { getScrollTop() > 100 ? temp.show() : temp.hide(); }
            return this;
        }
    });
    //#endregion
})($, this)

