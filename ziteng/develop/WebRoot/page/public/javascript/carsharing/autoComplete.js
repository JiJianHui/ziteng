/*
* @author:2yuan
* @date:2014-03-11
* @description:脱离百度地图的智能提示控件
*/
function init() {
    var script = document.createElement("script");
    script.src = 'http://api.map.baidu.com/api?v=1.3&callback=initMap';
    document.body.appendChild(script);
}

function initMap() {
    var defaults = {
        currentCity: '重庆市',
        inputs: [],
        values: [],
        left: 0,
        top: 0,
        width: 0,
        showMap: false,
        map: null,
        callback: null,
        errorback: null
    }
    _model = $.extend(defaults, _model);
    if (!!_model.map && $(_model.map).size() == 0) {
        $('body').append('<div id="' + _model.map + '" style="width: 400px; height: 300px; position: absolute; left: -9999px;"></div>');
    }

    if (_model.showMap) {
        var map = new BMap.Map(_model.map); // 启用滚轮
        map.enableScrollWheelZoom();
        var opts = { type: BMAP_NAVIGATION_CONTROL_SMALL };
        map.addControl(new BMap.NavigationControl(opts));
        map.centerAndZoom(_model.currentCity);
        _model.map = map;
    }
    for (var i = 0, len = _model.inputs.length; i < len; i++) {
        auto((_model.inputs)[i], i, _model.width, _model.currentCity);
    }
    $('body').append('<style type="text/css">.tangram-suggestion-main {z-index: 9999;zoom:1}.tangram-suggestion-main * {font-size: 12px;}.tangram-suggestion-main .tangram-suggestion {border: 1px solid #eeeeee;left: ' + _model.left + 'px !important;width: 100%;top: ' + _model.top + 'px !important;}.tangram-suggestion-main td {padding: 0px 3px;height:28px;line-height:28px;}</style>')
}

//#region 初始化智能提示控件
var autoCompletes = [], complted = false;
function auto(input, index, width, location) {
    var _province = input + 'RouteProvince', _city = input + 'RouteCity', _address = input + 'RouteAddress', _point = input + 'RoutePoint';
    $('#' + input).after(['<input type="hidden" name="' + _province + '" />', '<input type="hidden" name="' + _city + '" />', '<input type="hidden" name="' + _address + '" />', '<input type="hidden" name="' + _point + '" />'].join(''))
    var autoCompleteOptions = {
        'input': input,
        'onSearchComplete': function (r) {
            var ps = [];
            //务必倒序执行,不然会出现删错选项
            //如移除了第2项 eq(1).remove，到第3项时发现也要移除 那么eq(2).remove()的时候实际上是移除原始的第4项
            for (var i = r.getNumPois() - 1; i > -1; i--) {
                var p = r.getPoi(i);
                if (!!p.district && p.district != "") {
                    ps.push(p);
                    $('.tangram-suggestion-main:eq(' + index + ') tr').eq(i).find('td').attr('city', p.city).attr('province', p.district).attr('address', p.business);
                } else
                    $('.tangram-suggestion-main:eq(' + index + ') tr').eq(i).remove();
            }
            if (ps.length == 0) {
                complted = false;
                autoCompletes[index].hide();
                $('.tangram-suggestion-main:eq(' + index + ') tr').remove();
                if (!!_model.errorback) {
                    _model.errorback();
                }
            } else {
                complted = true;
                $('.tangram-suggestion-main:eq(' + index + ') tr:eq(0) td').addClass('tangram-suggestion-current');
            }
        }
    }
    if (index == 0)
        autoCompleteOptions['location'] = location;
    autoCompletes[index] = new BMap.Autocomplete(autoCompleteOptions);
    autoCompletes[index].addEventListener("onconfirm", function (e) {
        setValue(input, index, e.item.value);
    });
    $('#' + input).click(function () {
        if ($('.tangram-suggestion-main:eq(' + index + ') tr').size() > 0)
            autoCompletes[index].show();
    }).blur(function () {
        if (!$('#' + input).hasClass('bind')) {
            if (!complted || $('.tangram-suggestion-main:eq(' + index + ') tr').size() == 0) {
                $('#' + input).focus();
                return;
            }
            if ($('.tangram-suggestion-main:eq(' + index + ') tr').size() > 0) {
                setTimeout(function () {
                    if ($('input[name=' + input + 'RouteProvince]').val() + $('input[name=' + input + 'RouteCity]').val() + $('input[name=' + input + 'RouteAddress]').val() != $('#' + input).val()) {
                        //$(td).click()在ie8-下要报错 故用这种土方法
                        var _item = $('.tangram-suggestion-main:eq(' + index + ') tr td.tangram-suggestion-current');
                        if (_item.size() == 0)
                            _item = $('.tangram-suggestion-main:eq(' + index + ') tr td').eq(0);
                        setValue(input, index, getItem(_item));
                    }
                }, 300)
            }
        }
    }).keyup(function () {
        complted = false;
        $('#' + input).removeClass('bind')
        reset(_province, _city, _address, _point);
        if ($(this).val() == '') {
            $('.tangram-suggestion-main:eq(' + index + ') tr').remove();
            autoCompletes[index].hide();
        }
    }).keydown(function (e) {
        if (e.keyCode == 13)
            $(this).blur();
    })
    if (width > 0)
        $('#' + input).css('width', width + 'px');
    if (_model.values.length > index) {
        $('#' + input).addClass('bind')
        var _item = _model.values[index];
        autoCompletes[index].setInputValue(_item.city + _item.area + _item.address);
        _item.point = _item.point == '0,0' ? '' : _item.point;
        $('input[name=' + _province + ']').val(_item.city);
        $('input[name=' + _city + ']').val(_item.area);
        $('input[name=' + _address + ']').val(_item.address);
        $('input[name=' + _point + ']').val(_item.point);
    }
}

//#endregion

//#region 设置隐藏域值
function setValue(input, index, source) {
    var _province = input + 'RouteProvince', _city = input + 'RouteCity', _address = input + 'RouteAddress', _point = input + 'RoutePoint';
    $('input[name=' + _province + ']').val(source.city);
    $('input[name=' + _city + ']').val(source.district);
    $('input[name=' + _address + ']').val(source.business);
    var address = source.city + source.district + source.business;
    autoCompletes[index].setInputValue(address);
    autoCompletes[index].hide();
    getPoint(source.city, address, _point);
}

//#endregion

//#region 获取坐标
function getPoint(city, address, input) {
    pointInput = input;
    var src = 'http://api.map.baidu.com/geocoder/v2/?ak=wRlcbP8iFaWjvsnHMByAxLrG&callback=setPoint&output=json&address=' + encodeURIComponent(address) + '&city=' + encodeURIComponent(city)
    if ($('#' + input).size() == 0) {
        $('body').append('<script id="' + input + '" src="' + src + '"></script>')
    } else {
        $('#' + input).attr('src', src);
    }
}

//#endregion

//#region 设置坐标
function setPoint(r) {
    if (_model.showMap) {
        _model.map.clearOverlays();
    }
    $('input[name=' + pointInput + ']').val('');
    if (r.msg) {
        if (_model.showMap) {
            if (!!_model.errorback) {
                _model.errorback();
            }
        }
        return;
    }
    var p = r.result.location;
    $('input[name=' + pointInput + ']').val(p.lng + ',' + p.lat);
    if (!!_model.callback) {
        var input = pointInput.replace('RoutePoint', '')
        var _province = input + 'RouteProvince', _city = input + 'RouteCity', _address = input + 'RouteAddress', _point = pointInput;
        var result = {};
        result['province'] = $('input[name=' + _province + ']').val();
        result['city'] = $('input[name=' + _city + ']').val();
        result['address'] = $('input[name=' + _address + ']').val();
        result['point'] = $('input[name=' + _point + ']').val();
        _model.callback(result);
    }
    if (_model.showMap) {
        _model.map.centerAndZoom(p, 18);
        var pm = new BMap.Marker(p);
        _model.map.addOverlay(pm);
    }
}

//#endregion

//#region 获取选项值
function getItem(el) {
    var result = {};
    result['city'] = el.attr('city');
    result['district'] = el.attr('province');
    result['business'] = el.attr('address');
    return result;
}

//#endregion

//#region 重置值
function reset(province, city, address, point) {
    $('input[name=' + province + ']').val('');
    $('input[name=' + city + ']').val('');
    $('input[name=' + address + ']').val('');
    $('input[name=' + point + ']').val('');
}

//#endregion