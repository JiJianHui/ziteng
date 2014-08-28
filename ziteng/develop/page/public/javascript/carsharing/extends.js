(function ($, window, undefined) {

    // #region 基础扩展

    Date.prototype.toFormatString = function (_format) {
        var year = this.getFullYear();
        var month = parseInt(this.getMonth() + 1, 10);
        var day = this.getDate();
        var hour = this.getHours() > 9 ? this.getHours() : "0" + this.getHours();
        var minute = this.getMinutes() > 9 ? this.getMinutes() : "0" + this.getMinutes();
        var second = this.getSeconds() > 9 ? this.getSeconds() : "0" + this.getSeconds();
        _format = !_format ? "yyyy-MM-dd HH:mm:ss" : _format;
        return _format.replace("yyyy", year).replace("MM", month).replace("dd", day).replace("HH", hour).replace("mm", minute).replace("ss", second);
    }
    Date.prototype.addDays = function (days) {
        var times = this.getTime() + (days * 24 * 60 * 60 * 1000);
        var d = new Date();
        d.setTime(times);
        return d;
    }
    Date.prototype.addMinutes = function (minutes) {
        var times = this.getTime() + (minutes * 60 * 1000);
        var d = new Date();
        d.setTime(times);
        return d;
    }
    Date.prototype.addSeconds = function (seconds) {
        var seconds = this.getTime() + (seconds * 1000);
        var d = new Date();
        d.setTime(seconds);
        return d;
    }

    Array.prototype.indexOf = function (item, fromIndex) {
        var aryLen = this.length;
        if (!fromIndex) fromIndex = 0;
        else if (fromIndex < 0) fromIndex = Math.max(0, aryLen + fromIndex);
        for (var i = fromIndex; i < aryLen; i++) {
            if (this[i] == item) {
                return i;
            }
        }
        return -1;
    }
    Array.prototype.remove = function (item) {
        var index = this.indexOf(item);
        if (index > -1) {
            this.splice(index, 1);
        }
        return this;
    }
    Array.prototype.removeAt = function (index) {
        return this.splice(index, 1);
    }
    Array.prototype.exists = function (item) {
        return (this.indexOf(item) != -1);
    }
    Array.prototype.clear = function () {
        this.length = 0;
    }
    Array.prototype.addArray = function (array) {
        var newLen = array.length;
        for (var i = 0; i < newLen; i++) {
            this.push(array[i]);
        }
    }
    Array.prototype.insertAt = function (index, item) {
        this.splice(index, 0, item);
    }
    Array.prototype.insertBefore = function (aryItem, item) {
        var index = this.indexOf(aryItem);
        if (index == -1) {
            this.push(item);
        }
        else {
            this.splice(index, 0, item);
        }
    }

    String.prototype.trim = function () {
        return this.replace(/(^\s*)|(\s*$)/g, "");
    }
    String.prototype.ltrim = function () {
        return this.replace(/(^\s*)/g, "");
    }
    String.prototype.rtrim = function () {
        return this.replace(/(\s*$)/g, "");
    }
    String.prototype.contains = function (charstring) {
        return (this.indexOf(charstring) > -1);
    }

    // 小数截取(x:小数位数)
    String.prototype.toDecimal = Number.prototype.toDecimal = function (x) {
        if (isNaN(this)) return this;
        var f = parseFloat(this);
        var y = Math.pow(10, x);
        f = Math.round(f * y) / y;
        if (f.toString().indexOf('.') < 0) {
            var z = ''
            for (i = 0; i < x; i++) {
                z += '0';
            }
            if (x != 0) f += ('.' + z);
        }
        return f;
    }
    String.prototype.pad = Number.prototype.pad = function (n) {
        var _this = parseInt(this);
        return Array(n > ('' + _this).length ? (n - ('' + _this).length + 1) : 0).join(0) + _this;
    }
    // #endregion

    // #region 验证扩展


    if (jQuery.validator) {
        jQuery.validator.addMethod("nickName", function (value, element) {
            //var nickName = /(\w|[\u3007\u3400-\u4DB5\u4E00-\u9FCB\uE815-\uE864]|[\uD840-\uD87F][\uDC00-\uDFFF]){1,2}$/;
            var nickName = /([\u4E00-\u9FFF]){1,1}$/;
            return nickName.test(value) || this.optional(element);
        }, "昵称格式不正确。");

        jQuery.validator.addMethod("moblie", function (value, element) {
            var mobile = /^1[3|4|5|8]\d{9}$/;
            return mobile.test(value) || this.optional(element);
        }, "Phone不存在。");

        jQuery.validator.addMethod("phoneCode", function (value, element) {
            var mobile = /^(0[0-9]{2,3})?$/;
            return mobile.test(value) || this.optional(element);
        }, "区号输入错误。");

        jQuery.validator.addMethod("phoneWithOutCode", function (value, element) {
            var mobile = /^(\d{7,8})|(\d{11})$/;
            return mobile.test(value) || this.optional(element);
        }, "Phone输入错误。");

        jQuery.validator.addMethod("zzs", function (value, element) {
            return this.optional(element) || /^[1-9]\d*$/.test(value);
        }, "正整数>0。");

        jQuery.validator.addMethod("emailOrMobile", function (value, element) {
            var loginID = /^(1[3|4|5|8]\d{9})|((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/;
            return loginID.test(value) || this.optional(element);
        }, "Account格式不正确。");

        jQuery.validator.addMethod("qq", function (value, element) {
            return this.optional(element) || /^[1-9][0-9]{4,10}$/.test(value);
        }, "QQ号输入错误。");
        jQuery.validator.addMethod("card", function (value, element) {
            return this.optional(element) || /^(\d{14}[0-9a-zA-Z])$|^(\d{17}[0-9a-zA-Z])$/.test(value);
        }, "ID号码输入错误。");
        jQuery.validator.addMethod("twofloat", function (value, element) {
            return this.optional(element) || /^\d+(\.\d{1,2})?$/.test(value);
        }, "小数位数不能超过2位。");
        jQuery.validator.addMethod("onefloat", function (value, element) {
            return this.optional(element) || /^\d+(\.\d{1,1})?$/.test(value);
        }, "小数位数不能超过1位。");
        jQuery.validator.addMethod("carnumber", function (value, element) {
            return this.optional(element) || /^[a-zA-Z][a-zA-Z0-9]{6}$/.test(value);
        }, "车牌号输入错误。");
    }
    // #endregion


    // #region jQuery扩展
    $.extend({
        tipsDefaults: {
            defaultColor: '#999999',
            focusColor: '#DDDDDD',
            height: '28px',
            lineHeight: '28px',
            padding: '0 0 0 3px',
            opacity: '1',
            fontSize: '12px',
            tipsText: 'Please type in the 文本'
        }
    });
    $.fn.extend({
        showTip: function () {
            return this.each(function () {
                $(this).prev('.m_tip').css('visibility', '');
            });
        },
        hideTip: function () {
            return this.each(function () {
                $(this).prev('.m_tip').css('visibility', 'hidden');
            });
        },
        tips: function (opts) {
            var 
            _this = this,
            cfg = $.extend({}, $.tipsDefaults, opts),
            tipsText = typeof opts === 'string' ? opts : opts.tipsText,
            tipsBox = $('<div class="m_tip" style="position: absolute;"></div>');
            //transition: all 0.2s ease-out 0s;cursor:text;

            tipsBox.css('color', cfg.defaultColor);
            tipsBox.css('height', cfg.height);
            tipsBox.css('line-height', cfg.lineHeight);
            tipsBox.css('padding', cfg.padding);
            tipsBox.css('opacity', cfg.opacity);
            tipsBox.css('font-size', cfg.fontSize);
            tipsBox.html(tipsText);

            _this
            .before(tipsBox)
            .focus(function () {
                tipsBox.css('color', cfg.focusColor);
            })
            .blur(function () {
                tipsBox.css('color', cfg.defaultColor);
                if (!$(this).val()) tipsBox.css('visibility', '');
                else tipsBox.css('visibility', 'hidden');
            })
            .keydown(function () {
                tipsBox.css('visibility', 'hidden');
            })
            .change(function () {
                if ($(this).val()) tipsBox.css('visibility', 'hidden');
                else tipsBox.css('visibility', '');
            });
            //            .parent()
            //            .css('position', 'relative');

            if ($(this).val())
                tipsBox.css('visibility', 'hidden');

            tipsBox.click(function (event) {
                if (!_this.attr('disabled')) {
                    _this.focus();
                }
                event = event || window.event;
                event.stopPropagation();
            });
            return this;
        }
    });

    jQuery.extend({
        reflex: function (obj, property) {
            for (var p in obj) {
                if (p == property) {
                    return obj[p];
                }
            }
        }
    });
    jQuery.fn.extend({
        bindSelect: function (obj) {
            return this.each(function () {
                var options = obj.head == "undefined" ? "" : obj.head;
                for (var i = 0; i < obj.data.length; i++) {
                    var o = obj.data[i];
                    var bindValue = obj.bindValue == undefined ? o : $.reflex(o, obj.bindValue),
                    bindText = obj.bindText == undefined ? o : $.reflex(o, obj.bindText);
                    var selected = obj.selectedValue == bindValue ? 'selected="true"' : '';
                    options += '<option ' + selected + ' value="' + bindValue + '">' + bindText + '</option>';
                }
                $(this).html(options);
            });
        },
        checkedList: function (obj) {
            return this.each(function () {
                var checks = "", checkeds = obj.checkeds.split(',');
                for (var i = 0; i < obj.data.length; i++) {
                    var o = obj.data[i], checked = "";
                    var bindValue = obj.bindValue == "undefined" ? o : $.reflex(o, obj.bindValue), bindText = obj.bindText == "undefined" ? o : $.reflex(o, obj.bindText);
                    for (var c in checkeds) {
                        if (checkeds[c] == bindValue)
                            checked = 'checked="true"';
                    }
                    checks += '<input name=' + obj.name + ' type="checkbox" ' + checked + ' value="' + bindValue + '">' + bindText;
                }
                $(this).html(checks);
            });
        },
        serializeObject: function () {
            var o = {};
            var a = this.serializeArray();
            $.each(a, function () {
                if (o[this.name]) {
                    if (!o[this.name].push) {
                        o[this.name] = [o[this.name]];
                    }
                    o[this.name].push(this.value || '');
                } else {
                    o[this.name] = this.value || '';
                }
            });
            return o;
        },
        bindForm: function (obj) {
            for (var p in obj) {
                this.find("[name='" + p + "']").each(function () {
                    var control = $(this);
                    var type = control.attr("type");
                    if (type == "radio") {
                        if (control.val() == obj[p]) {
                            var pt = control.parent();
                            if (pt.attr('checkedClass')) { pt.click(); }
                            else control.attr("checked", true);
                        }
                    } else if (type == "checkbox") {
                        if (typeof (obj[p]) == "object") {
                            for (var i in obj[p]) {
                                if (control.val() == obj[p][i]) {
                                    var pt = control.parent();
                                    if (pt.attr('checkedClass')) { pt.click(); }
                                    else control.attr("checked", true);
                                    break;
                                } else { control.attr("checked", false); }
                            }
                        } else {
                            var vs = obj[p].toString().split(",");
                            for (var v in vs) {
                                if (control.val() == vs[v]) {
                                    var pt = control.parent();
                                    if (pt.attr('checkedClass')) { pt.click(); }
                                    else control.attr("checked", true);
                                    break;
                                } else { control.attr("checked", false); }
                            }
                        }
                    } else {
                        try {
                            //alert(p + ":" + obj[p]);
                            control.val(obj[p]);
                            if (obj[p] && control.hideTip) control.hideTip();
                        } catch (ee) {
                        }
                    }
                });
            }
        },
        lock: function (cancel) {
            var _this = this.eq(0);
            if (cancel) {
                _this.css({ position: "static", top: 0 });
                window.onscroll = function () { };
                window.onresize = function () { };
            } else {
                var _top = _this.offset().top,
                        reset = function () {
                            var top = $(document).scrollTop();
                            if ($.browser.msie && ($.browser.version == 6.0)) {
                                if (top > _top) _this.css({ position: "absolute", top: top - _top });
                            } else {
                                if (top > _top) _this.css({ position: "fixed", top: "-" & top + "px" });
                            }
                            if (top <= _top) _this.css({ position: "static", top: 0 });
                        };
                window.onscroll = reset;
                window.onresize = reset;
            }
        }
    });

    // #endregion

})(jQuery || $, window);