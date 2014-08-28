(function(a){a.extend(a.fn,{validate:function(c){if(this.length){var b=a.data(this[0],"validator");if(b)return b;b=new a.validator(c,this[0]);a.data(this[0],"validator",b);if(b.settings.onsubmit){this.find("input, button").filter(".cancel").click(function(){b.cancelSubmit=true});b.settings.submitHandler&&this.find("input, button").filter(":submit").click(function(){b.submitButton=this});this.submit(function(d){function c(){if(b.settings.submitHandler){if(b.submitButton)var c=a("<input type='hidden'/>").attr("name",b.submitButton.name).val(b.submitButton.value).appendTo(b.currentForm);b.settings.submitHandler.call(b,b.currentForm);b.submitButton&&c.remove();return false}return true}b.settings.debug&&d.preventDefault();if(b.cancelSubmit){b.cancelSubmit=false;return c()}if(b.form()){if(b.pendingRequest){b.formSubmitted=true;return false}return c()}else{b.focusInvalid();return false}})}return b}else c&&c.debug&&window.console&&console.warn("nothing selected, can't validate, returning nothing")},valid:function(){if(a(this[0]).is("form"))return this.validate().form();else{var b=true,c=a(this[0].form).validate();this.each(function(){b&=c.element(this)});return b}},removeAttrs:function(d){var b={},c=this;a.each(d.split(/\s/),function(d,a){b[a]=c.attr(a);c.removeAttr(a)});return b},rules:function(f,c){var b=this[0];if(f){var d=a.data(b.form,"validator").settings,g=d.rules,e=a.validator.staticRules(b);switch(f){case"add":a.extend(e,a.validator.normalizeRule(c));g[b.name]=e;if(c.messages)d.messages[b.name]=a.extend(d.messages[b.name],c.messages);break;case"remove":if(!c){delete g[b.name];return e}var h={};a.each(c.split(/\s/),function(b,a){h[a]=e[a];delete e[a]});return h}}b=a.validator.normalizeRules(a.extend({},a.validator.metadataRules(b),a.validator.classRules(b),a.validator.attributeRules(b),a.validator.staticRules(b)),b);if(b.required){d=b.required;delete b.required;b=a.extend({required:d},b)}return b}});a.extend(a.expr[":"],{blank:function(b){return!a.trim(""+b.value)},filled:function(b){return!!a.trim(""+b.value)},unchecked:function(a){return!a.checked}});a.validator=function(b,c){this.settings=a.extend(true,{},a.validator.defaults,b);this.currentForm=c;this.init()};a.validator.format=function(c,b){if(arguments.length==1)return function(){var b=a.makeArray(arguments);b.unshift(c);return a.validator.format.apply(this,b)};if(arguments.length>2&&b.constructor!=Array)b=a.makeArray(arguments).slice(1);if(b.constructor!=Array)b=[b];a.each(b,function(a,b){c=c.replace(RegExp("\\{"+a+"\\}","g"),b)});return c};a.extend(a.validator,{defaults:{messages:{},groups:{},rules:{},errorClass:"error",validClass:"valid",errorElement:"label",focusInvalid:true,errorContainer:a([]),errorLabelContainer:a([]),onsubmit:true,ignore:[],ignoreTitle:false,onfocusin:function(a){this.lastActive=a;if(this.settings.focusCleanup&&!this.blockFocusCleanup){this.settings.unhighlight&&this.settings.unhighlight.call(this,a,this.settings.errorClass,this.settings.validClass);this.addWrapper(this.errorsFor(a)).hide()}},onfocusout:function(a){!this.checkable(a)&&(a.name in this.submitted||!this.optional(a))&&this.element(a)},onkeyup:function(a){(a.name in this.submitted||a==this.lastElement)&&this.element(a)},onclick:function(a){if(a.name in this.submitted)this.element(a);else a.parentNode.name in this.submitted&&this.element(a.parentNode)},highlight:function(b,c,d){b.type==="radio"?this.findByName(b.name).addClass(c).removeClass(d):a(b).addClass(c).removeClass(d)},unhighlight:function(b,c,d){b.type==="radio"?this.findByName(b.name).removeClass(c).addClass(d):a(b).removeClass(c).addClass(d)}},setDefaults:function(b){a.extend(a.validator.defaults,b)},messages:{required:"This field is required.",remote:"Please fix this field.",email:"Please enter a valid email address.",url:"Please enter a valid URL.",date:"Please enter a valid date.",dateISO:"Please enter a valid date (ISO).",number:"Please enter a valid number.",digits:"Please enter only digits.",creditcard:"Please enter a valid credit card number.",equalTo:"Please enter the same value again.",accept:"Please enter a value with a valid extension.",maxlength:a.validator.format("Please enter no more than {0} characters."),minlength:a.validator.format("Please enter at least {0} characters."),rangelength:a.validator.format("Please enter a value between {0} and {1} characters long."),range:a.validator.format("Please enter a value between {0} and {1}."),max:a.validator.format("Please enter a value less than or equal to {0}."),min:a.validator.format("Please enter a value greater than or equal to {0}.")},autoCreateRanges:false,prototype:{init:function(){function b(b){var c=a.data(this[0].form,"validator");b="on"+b.type.replace(/^validate/,"");c.settings[b]&&c.settings[b].call(c,this[0])}this.labelContainer=a(this.settings.errorLabelContainer);this.errorContext=this.labelContainer.length&&this.labelContainer||a(this.currentForm);this.containers=a(this.settings.errorContainer).add(this.settings.errorLabelContainer);this.submitted={};this.valueCache={};this.pendingRequest=0;this.pending={};this.invalid={};this.reset();var d=this.groups={};a.each(this.settings.groups,function(b,c){a.each(c.split(/\s/),function(c,a){d[a]=b})});var c=this.settings.rules;a.each(c,function(b,d){c[b]=a.validator.normalizeRule(d)});a(this.currentForm).validateDelegate(":text, :password, :file, select, textarea","focusin focusout keyup",b).validateDelegate(":radio, :checkbox, select, option","click",b);this.settings.invalidHandler&&a(this.currentForm).bind("invalid-form.validate",this.settings.invalidHandler)},form:function(){this.checkForm();a.extend(this.submitted,this.errorMap);this.invalid=a.extend({},this.errorMap);this.valid()||a(this.currentForm).triggerHandler("invalid-form",[this]);this.showErrors();return this.valid()},checkForm:function(){this.prepareForm();for(var a=0,b=this.currentElements=this.elements();b[a];a++)this.check(b[a]);return this.valid()},element:function(b){this.lastElement=b=this.clean(b);this.prepareElement(b);this.currentElements=a(b);var c=this.check(b);if(c)delete this.invalid[b.name];else this.invalid[b.name]=true;if(!this.numberOfInvalids())this.toHide=this.toHide.add(this.containers);this.showErrors();return c},showErrors:function(b){if(b){a.extend(this.errorMap,b);this.errorList=[];for(var c in b)this.errorList.push({message:b[c],element:this.findByName(c)[0]});this.successList=a.grep(this.successList,function(a){return!(a.name in b)})}this.settings.showErrors?this.settings.showErrors.call(this,this.errorMap,this.errorList):this.defaultShowErrors()},resetForm:function(){a.fn.resetForm&&a(this.currentForm).resetForm();this.submitted={};this.prepareForm();this.hideErrors();this.elements().removeClass(this.settings.errorClass)},numberOfInvalids:function(){return this.objectLength(this.invalid)},objectLength:function(b){var a=0,c;for(c in b)a++;return a},hideErrors:function(){this.addWrapper(this.toHide).hide()},valid:function(){return this.size()==0},size:function(){return this.errorList.length},focusInvalid:function(){if(this.settings.focusInvalid)try{a(this.findLastActive()||this.errorList.length&&this.errorList[0].element||[]).filter(":visible").focus().trigger("focusin")}catch(b){}},findLastActive:function(){var b=this.lastActive;return b&&a.grep(this.errorList,function(a){return a.element.name==b.name}).length==1&&b},elements:function(){var b=this,c={};return a(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function(){!this.name&&b.settings.debug&&window.console&&console.error("%o has no name assigned",this);return this.name in c||!b.objectLength(a(this).rules())?false:c[this.name]=true})},clean:function(b){return a(b)[0]},errors:function(){return a(this.settings.errorElement+"."+this.settings.errorClass,this.errorContext)},reset:function(){this.successList=[];this.errorList=[];this.errorMap={};this.toShow=a([]);this.toHide=a([]);this.currentElements=a([])},prepareForm:function(){this.reset();this.toHide=this.errors().add(this.containers)},prepareElement:function(a){this.reset();this.toHide=this.errorsFor(a)},check:function(b){b=this.clean(b);if(this.checkable(b))b=this.findByName(b.name).not(this.settings.ignore)[0];var d=a(b).rules(),e=false,c;for(c in d){var f={method:c,parameters:d[c]};try{var g=a.validator.methods[c].call(this,b.value.replace(/\r/g,""),b,f.parameters);if(g=="dependency-mismatch")e=true;else{e=false;if(g=="pending"){this.toHide=this.toHide.not(this.errorsFor(b));return}if(!g){this.formatAndAdd(b,f);return false}}}catch(h){this.settings.debug&&window.console&&console.log("exception occured when checking element "+b.id+", check the '"+f.method+"' method",h);throw h;}}if(!e){this.objectLength(d)&&this.successList.push(b);return true}},customMetaMessage:function(c,d){if(a.metadata){var b=this.settings.meta?a(c).metadata()[this.settings.meta]:a(c).metadata();return b&&b.messages&&b.messages[d]}},customMessage:function(b,c){var a=this.settings.messages[b];return a&&(a.constructor==String?a:a[c])},findDefined:function(){for(var a=0;a<arguments.length;a++)if(arguments[a]!==undefined)return arguments[a]},defaultMessage:function(b,c){return this.findDefined(this.customMessage(b.name,c),this.customMetaMessage(b,c),!this.settings.ignoreTitle&&b.title||undefined,a.validator.messages[c],"<strong>Warning: No message defined for "+b.name+"</strong>")},formatAndAdd:function(b,c){var a=this.defaultMessage(b,c.method),d=/\$?\{(\d+)\}/g;if(typeof a=="function")a=a.call(this,c.parameters,b);else if(d.test(a))a=jQuery.format(a.replace(d,"{$1}"),c.parameters);this.errorList.push({message:a,element:b});this.errorMap[b.name]=a;this.submitted[b.name]=a},addWrapper:function(a){if(this.settings.wrapper)a=a.add(a.parent(this.settings.wrapper));return a},defaultShowErrors:function(){for(var a=0;this.errorList[a];a++){var b=this.errorList[a];this.settings.highlight&&this.settings.highlight.call(this,b.element,this.settings.errorClass,this.settings.validClass);this.showLabel(b.element,b.message)}if(this.errorList.length)this.toShow=this.toShow.add(this.containers);if(this.settings.success)for(a=0;this.successList[a];a++)this.showLabel(this.successList[a]);if(this.settings.unhighlight){a=0;for(b=this.validElements();b[a];a++)this.settings.unhighlight.call(this,b[a],this.settings.errorClass,this.settings.validClass)}this.toHide=this.toHide.not(this.toShow);this.hideErrors();this.addWrapper(this.toShow).show()},validElements:function(){return this.currentElements.not(this.invalidElements())},invalidElements:function(){return a(this.errorList).map(function(){return this.element})},showLabel:function(c,d){var b=this.errorsFor(c);if(b.length){b.removeClass().addClass(this.settings.errorClass);b.attr("generated")&&b.html(d)}else{b=a("<"+this.settings.errorElement+"/>").attr({"for":this.idOrName(c),generated:true}).addClass(this.settings.errorClass).html(d||"");if(this.settings.wrapper)b=b.hide().show().wrap("<"+this.settings.wrapper+"/>").parent();this.labelContainer.append(b).length||(this.settings.errorPlacement?this.settings.errorPlacement(b,a(c)):b.insertAfter(c))}if(!d&&this.settings.success){b.text("");typeof this.settings.success=="string"?b.addClass(this.settings.success):this.settings.success(b)}this.toShow=this.toShow.add(b)},errorsFor:function(b){var c=this.idOrName(b);return this.errors().filter(function(){return a(this).attr("for")==c})},idOrName:function(a){return this.groups[a.name]||(this.checkable(a)?a.name:a.id||a.name)},checkable:function(a){return/radio|checkbox/i.test(a.type)},findByName:function(b){var c=this.currentForm;return a(document.getElementsByName(b)).map(function(d,a){return a.form==c&&a.name==b&&a||null})},getLength:function(c,b){switch(b.nodeName.toLowerCase()){case"select":return a("option:selected",b).length;case"input":if(this.checkable(b))return this.findByName(b.name).filter(":checked").length}return c.length},depend:function(a,b){return this.dependTypes[typeof a]?this.dependTypes[typeof a](a,b):true},dependTypes:{"boolean":function(a){return a},string:function(b,c){return!!a(b,c.form).length},"function":function(a,b){return a(b)}},optional:function(b){return!a.validator.methods.required.call(this,a.trim(b.value),b)&&"dependency-mismatch"},startRequest:function(a){if(!this.pending[a.name]){this.pendingRequest++;this.pending[a.name]=true}},stopRequest:function(c,b){this.pendingRequest--;if(this.pendingRequest<0)this.pendingRequest=0;delete this.pending[c.name];if(b&&this.pendingRequest==0&&this.formSubmitted&&this.form()){a(this.currentForm).submit();this.formSubmitted=false}else if(!b&&this.pendingRequest==0&&this.formSubmitted){a(this.currentForm).triggerHandler("invalid-form",[this]);this.formSubmitted=false}},previousValue:function(b){return a.data(b,"previousValue")||a.data(b,"previousValue",{old:null,valid:true,message:this.defaultMessage(b,"remote")})}},classRuleSettings:{required:{required:true},email:{email:true},url:{url:true},date:{date:true},dateISO:{dateISO:true},dateDE:{dateDE:true},number:{number:true},numberDE:{numberDE:true},digits:{digits:true},creditcard:{creditcard:true}},addClassRules:function(b,c){b.constructor==String?this.classRuleSettings[b]=c:a.extend(this.classRuleSettings,b)},classRules:function(b){var c={};(b=a(b).attr("class"))&&a.each(b.split(" "),function(){this in a.validator.classRuleSettings&&a.extend(c,a.validator.classRuleSettings[this])});return c},attributeRules:function(c){var b={};c=a(c);for(var d in a.validator.methods){var e=c.attr(d);if(e)b[d]=e}b.maxlength&&/-1|2147483647|524288/.test(b.maxlength)&&delete b.maxlength;return b},metadataRules:function(b){if(!a.metadata)return{};var c=a.data(b.form,"validator").settings.meta;return c?a(b).metadata()[c]:a(b).metadata()},staticRules:function(b){var c={},d=a.data(b.form,"validator");if(d.settings.rules)c=a.validator.normalizeRule(d.settings.rules[b.name])||{};return c},normalizeRules:function(b,c){a.each(b,function(e,d){if(d===false)delete b[e];else if(d.param||d.depends){var f=true;switch(typeof d.depends){case"string":f=!!a(d.depends,c.form).length;break;case"function":f=d.depends.call(c,c)}if(f)b[e]=d.param!==undefined?d.param:true;else delete b[e]}});a.each(b,function(e,d){b[e]=a.isFunction(d)?d(c):d});a.each(["minlength","maxlength","min","max"],function(){if(b[this])b[this]=Number(b[this])});a.each(["rangelength","range"],function(){if(b[this])b[this]=[Number(b[this][0]),Number(b[this][1])]});if(a.validator.autoCreateRanges){if(b.min&&b.max){b.range=[b.min,b.max];delete b.min;delete b.max}if(b.minlength&&b.maxlength){b.rangelength=[b.minlength,b.maxlength];delete b.minlength;delete b.maxlength}}b.messages&&delete b.messages;return b},normalizeRule:function(b){if(typeof b=="string"){var c={};a.each(b.split(/\s/),function(){c[this]=true});b=c}return b},addMethod:function(b,c,d){a.validator.methods[b]=c;a.validator.messages[b]=d!=undefined?d:a.validator.messages[b];c.length<3&&a.validator.addClassRules(b,a.validator.normalizeRule(b))},methods:{required:function(c,b,d){if(!this.depend(d,b))return"dependency-mismatch";switch(b.nodeName.toLowerCase()){case"select":return(c=a(b).val())&&c.length>0;case"input":if(this.checkable(b))return this.getLength(c,b)>0;default:return a.trim(c).length>0}},remote:function(f,b,e){if(this.optional(b))return"dependency-mismatch";var d=this.previousValue(b);this.settings.messages[b.name]||(this.settings.messages[b.name]={});d.originalMessage=this.settings.messages[b.name].remote;this.settings.messages[b.name].remote=d.message;e=typeof e=="string"&&{url:e}||e;if(this.pending[b.name])return"pending";if(d.old===f)return d.valid;d.old=f;var c=this;this.startRequest(b);var g={};g[b.name]=f;a.ajax(a.extend(true,{url:e,mode:"abort",port:"validate"+b.name,dataType:"json",data:g,success:function(e){c.settings.messages[b.name].remote=d.originalMessage;var h=e===true;if(h){var g=c.formSubmitted;c.prepareElement(b);c.formSubmitted=g;c.successList.push(b);c.showErrors()}else{g={};e=e||c.defaultMessage(b,"remote");g[b.name]=d.message=a.isFunction(e)?e(f):e;c.showErrors(g)}d.valid=h;c.stopRequest(b,h)}},e));return"pending"},minlength:function(c,b,d){return this.optional(b)||this.getLength(a.trim(c),b)>=d},maxlength:function(c,b,d){return this.optional(b)||this.getLength(a.trim(c),b)<=d},rangelength:function(b,c,d){b=this.getLength(a.trim(b),c);return this.optional(c)||b>=d[0]&&b<=d[1]},min:function(a,b,c){return this.optional(b)||a>=c},max:function(a,b,c){return this.optional(b)||a<=c},range:function(a,c,b){return this.optional(c)||a>=b[0]&&a<=b[1]},email:function(a,b){return this.optional(b)||/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(a)},url:function(a,b){return this.optional(b)||/^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(a)},date:function(a,b){return this.optional(b)||!/Invalid|NaN/.test(new Date(a))},dateISO:function(a,b){return this.optional(b)||/^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/.test(a)},number:function(a,b){return this.optional(b)||/^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(a)},digits:function(a,b){return this.optional(b)||/^\d+$/.test(a)},creditcard:function(b,f){if(this.optional(f))return"dependency-mismatch";if(/[^0-9-]+/.test(b))return false;var e=0,a=0,c=false;b=b.replace(/\D/g,"");for(var d=b.length-1;d>=0;d--){a=b.charAt(d);a=parseInt(a,10);if(c)if((a*=2)>9)a-=9;e+=a;c=!c}return e%10==0},accept:function(b,c,a){a=typeof a=="string"?a.replace(/,/g,"|"):"png|jpe?g|gif";return this.optional(c)||b.match(RegExp(".("+a+")$","i"))},equalTo:function(c,d,b){b=a(b).unbind(".validate-equalTo").bind("blur.validate-equalTo",function(){a(d).valid()});return c==b.val()}}});a.format=a.validator.format})(jQuery);(function(b){var a={};if(b.ajaxPrefilter)b.ajaxPrefilter(function(c,b,d){b=c.port;if(c.mode=="abort"){a[b]&&a[b].abort();a[b]=d}});else{var c=b.ajax;b.ajax=function(d){var e=("port"in d?d:b.ajaxSettings).port;if(("mode"in d?d:b.ajaxSettings).mode=="abort"){a[e]&&a[e].abort();return a[e]=c.apply(this,arguments)}return c.apply(this,arguments)}}})(jQuery);(function(a){!jQuery.event.special.focusin&&!jQuery.event.special.focusout&&document.addEventListener&&a.each({focus:"focusin",blur:"focusout"},function(c,b){function d(c){c=a.event.fix(c);c.type=b;return a.event.handle.call(this,c)}a.event.special[b]={setup:function(){this.addEventListener(c,d,true)},teardown:function(){this.removeEventListener(c,d,true)},handler:function(c){arguments[0]=a.event.fix(c);arguments[0].type=b;return a.event.handle.apply(this,arguments)}}});a.extend(a.fn,{validateDelegate:function(b,c,d){return this.bind(c,function(e){var c=a(e.target);if(c.is(b))return d.apply(c,arguments)})}})})(jQuery);if(jQuery.validator){jQuery.validator.addMethod("nickName",function(c,b){var a=/(\w|[\u3007\u3400-\u4DB5\u4E00-\u9FCB\uE815-\uE864]|[\uD840-\uD87F][\uDC00-\uDFFF]){1,12}$/;return a.test(c)||this.optional(b)},"昵称格式不正确。");jQuery.validator.addMethod("mobile",function(c,a){var b=/^1[3|4|5|8]\d{9}$/;return b.test(c)||this.optional(a)},"手机号码不存在。");jQuery.validator.addMethod("phoneOrMobile",function(c,a){var b=/^1[3|4|5|8]\d{9}$/;return b.test(c)||this.optional(a)},"联系电话输入错误。");jQuery.validator.addMethod("phoneCode",function(c,a){var b=/^(0[0-9]{2,3})?$/;return b.test(c)||this.optional(a)},"区号输入错误。");jQuery.validator.addMethod("phoneWithOutCode",function(c,a){var b=/^(\d{7,8})|(\d{11})$/;return b.test(c)||this.optional(a)},"电话号码输入错误。");jQuery.validator.addMethod("d",function(b,a){return this.optional(a)||/^\d{4}$/.test(b)},"数字格式错误。");jQuery.validator.addMethod("zzs",function(b,a){return this.optional(a)||/^[1-9]\d*$/.test(b)},"正整数>0。");jQuery.validator.addMethod("qq",function(b,a){return this.optional(a)||/^[1-9][0-9]{4,10}$/.test(b)},"QQ号输入错误。");jQuery.validator.addMethod("card",function(b,a){return this.optional(a)||/^(\d{14}[0-9a-zA-Z])$|^(\d{17}[0-9a-zA-Z])$/.test(b)},"身份证号码输入错误。");jQuery.validator.addMethod("onefloat",function(b,a){return this.optional(a)||/^\d+(\.\d)?$/.test(b)},"小数位数不能超过1位。")}