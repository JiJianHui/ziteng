package com.ziteng.utils;

import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * @author  lc
 */
public class Regex {

	 public static final String 
		szhDigWord = "^[\u4e00-\u9fa5_a-zA-Z0-9]+$",														//中文，数字，英文   
		szh = "^[\u4e00-\u9fa5]+$",																			//中文
		smobile = "^((13[0-9])|(15[^4,\\D])|(18[0,5-9]))\\d{8}$",											//联通，移动，电信手机号码 
		semail = "^\\s*\\w+(?:\\.{0,1}[\\w-]+)*@[a-zA-Z0-9]+(?:[-.][a-zA-Z0-9]+)*\\.[a-zA-Z]+\\s*$", 		//邮箱
		sidCard = "(\\d{17}[0-9a-zA-Z]|\\d{14}[0-9a-zA-Z])",												//身份证
		sbithday = "^(19\\d{2}|20\\d{2})((0[1-9]|10|11|12))((0[1-9]|[12][0-9])|30|31)",						//生日.
	    snumber = "^[-+]?\\d{0,53}",																		//最长53位整数
	    svarchar = ".*",																					//任意字符
	    sdate = "^(\\d{4}-\\d{2}-\\d{2}) (\\d{2}:\\d{2}:\\d{2})$",											//YYYY-MM-dd日期
	    sfloat = "^[-+]?(\\d+(\\.\\d*)?|(\\.\\d+))([eE]([-+]?([012]?\\d{1,2}|30[0-7])|-3([01]?[4-9]|[012]?[0-3])))?[dD]?$",	//浮点数			//最长53浮点数
	    sint = "^[-+]?\\d{0,53}",																			//最长38位整数
	    slong = "^[-+]?\\d*",																				//整数
		sunnegint = "^\\d+$",																				//非负整数（正整数 + 0） 
		sposint = "^[0-9]*[1-9][0-9]*$",																	//正整数 
		snoposint = "^((-\\d+)|(0+))$",																		//非正整数（负整数 + 0） 
		snegint = "^-[0-9]*[1-9][0-9]*$",																	//负整数 
		snonegfloat = "^\\d+(\\.\\d+)?$",																	//非负浮点数（正浮点数 + 0） 
		sposfloat = "^(([0-9]+\\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\\.[0-9]+)|([0-9]*[1-9][0-9]*))$",	//正浮点数 
		snoposfloat = "^((-\\d+(\\.\\d+)?)|(0+(\\.0+)?))$",													//非正浮点数（负浮点数 + 0） 
		snegfloat = "^(-(([0-9]+\\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\\.[0-9]+)|([0-9]*[1-9][0-9]*)))$",	//负浮点数 
		sengword = "^[A-Za-z]+$",																			//由26个英文字母组成的字符串 
		supperword = "^[A-Z]+$",																			//由26个英文字母的大写组成的字符串 
		slowerword = "^[a-z]+$",																			//由26个英文字母的小写组成的字符串 
		sdig_word = "^[A-Za-z0-9]+$",																		//由数字和26个英文字母组成的字符串 
		sdig_word_dis = "^\\w+$",																			//由数字、26个英文字母或者下划线组成的字符串 
		surl = "^[a-zA-z]+://(\\w+(-\\w+)*)(\\.(\\w+(-\\w+)*))*(\\?\\S*)?$",								//url 
		sYYYYMMDD_date = "/^(d{2}|d{4})-((0([1-9]{1}))|(1[1|2]))-(([0-2]([1-9]{1}))|(3[0|1]))$", 			// 年-月-日 
		sMMDDYYYY_date = "/^((0([1-9]{1}))|(1[1|2]))/(([0-2]([1-9]{1}))|(3[0|1]))/(d{2}|d{4})$", 			// 月/日/年 
		sip = "^(d{1,2}|1dd|2[0-4]d|25[0-5]).(d{1,2}|1dd|2[0-4]d|25[0-5]).(d{1,2}|1dd|2[0-4]d|25[0-5]).(d{1,2}|1dd|2[0-4]d|25[0-5])$"; //IP地址 
	
	private static Map<String,String> map = new HashMap<String,String>(40);
	
	static{
		map.put("中文数字英文",szhDigWord);
		map.put("手机号码",smobile);
		map.put("邮箱",semail);
		map.put("身份证",sidCard);
		map.put("生日日期",sbithday);
		map.put("最长53位整数",snumber);
		map.put("任意字符",svarchar);
		map.put("日期",sdate);
		map.put("浮点数",sfloat);
		map.put("长53位整数",sint);
		map.put("整数",slong);
		map.put("非负整数",sunnegint);
		map.put("正整数",sposint);
		map.put("非整数",snoposint);
		map.put("负整数",snegint);
		map.put("非负浮点数",snonegfloat);
		map.put("正浮点数",sposfloat);
		map.put("非正浮点数",snoposfloat);
		map.put("负浮点数",snegfloat);
		map.put("英文单词",sengword);
		map.put("大写英文单词",supperword);
		map.put("小写英文单词",slowerword);
		map.put("数字加英文单词",sdig_word);
		map.put("数字英文单词下划线",sdig_word_dis);
		map.put("URL",surl);
		map.put("年-月-日",sYYYYMMDD_date);
		map.put("月-日-年",sMMDDYYYY_date);
		map.put("IP地址",sip);
		map.put("中文",szh);
	}
	  
	/**
	 * 获取正则名称集合.
	 * @return
	 */
	public static String[] getRegexName(){
		return map.keySet().toArray(new String[map.size()]);
	}
	
	public static boolean match(String key, String value){
		if(map.containsKey(key) && value !=null){
			return value.matches(map.get(key));
		}else{
			return true;
		}
	}

    public static boolean regex(String reg, String value){
        return value.matches(reg);
    }

	public static String getBirthday(String _idCard) {  
        if (_idCard == null) {  
            return null;  
        }  
        Pattern p1 = Pattern.compile("\\d{6}(\\d{8}).*"); 			// 用于提取出生日字符串  
        Pattern p2 = Pattern.compile("(\\d{4})(\\d{2})(\\d{2})");	// 用于将生日字符串进行分解为年月日  
  
        Matcher matcher = p1.matcher(_idCard);  
        if (matcher.find()) {  
            String birthday = matcher.group(1);  
            Matcher matcher2 = p2.matcher(birthday);  
            if (matcher2.find()) {  
                StringBuilder sb = new StringBuilder();  
                sb.append(matcher2.group(1));  
                sb.append('-');  
                sb.append(matcher2.group(2));  
                sb.append('-');  
                sb.append(matcher2.group(3));  
                return sb.toString();  
            }  
        }  
        return null;  
	}  
	
	public static void  main(String args[]){
		String phone = "513701198809186713";
		System.out.println(match("身份证",phone));
	}
}
