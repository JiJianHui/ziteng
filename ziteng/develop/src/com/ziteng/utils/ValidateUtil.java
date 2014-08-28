package com.ziteng.utils;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.math.NumberUtils;


public class ValidateUtil {
	/**
	 * 验证手机号
	 * @param mobile
	 * @return is mobile phone return true alse return false
	 */
	public static boolean checkMobile(String mobile){
		//判断是否为0-9数字
		if(!NumberUtils.isDigits(mobile)){
			return false;
		}
		//判断是否为11位数字的手机号长度
		if(mobile.trim().length()!=11){
			return false;
		}
		//匹配手机号码
		Pattern pattern = Pattern.compile("^13\\d{9}||15[012356789]\\d{8}||18[056789]\\d{8}$");
		Matcher matcher = pattern.matcher(mobile);
		if(matcher.matches()){
			return true;
		}else {
			return false;
		}
	}
	/**
	 * 验证昵称是否合法
	 * @param nickName 
	 * @return 合法返回true 否则返回false
	 */
	public static boolean checkNickName(String nickName){
		if(StringUtils.isBlank(nickName)){
			return false;
		}
		//不允许出现的特殊字符
		Pattern pattern = Pattern.compile("[$&?'\";|\\[\\]]");
		Matcher matcher = pattern.matcher(nickName);
		//发现存在特殊字符
		if(matcher.find()){
			return false;
		}
		//存在系统不允许的字符[admin,system,service,管理员,系统,客服]
		String[] cannot = {"admin","system","service","管理员","系统","客服"};
		String tmp_nickName = nickName.toLowerCase().trim();
		for(String str:cannot){
			if(StringUtils.contains(tmp_nickName, str)){
				return false;
			}
		}
		return true;
	}
	/**
	 * 验证邮箱
	 * @param email
	 * @return
	 */
	public static boolean checkEmail(String email){  
		boolean tag = true;
        final String pattern1 = "^[a-zA-Z0-9]([\\w\\-\\.\\+]*)@([\\w\\-\\.]+)(\\.[a-zA-Z]{2,4}(\\.[a-zA-Z]{2}){0,2})$";
        final Pattern pattern = Pattern.compile(pattern1);
        final Matcher mat = pattern.matcher(email);
        if (!mat.find()) {
            tag = false;
        }
        return tag;
	} 
	
	/**
	 * 验证生日格式
	 * @param birthday
	 * @return
	 */
	public static boolean checkBirthday(String birthday){
		if(StringUtils.isBlank(birthday)){
			return false;
		}
		if(birthday.trim().length()!=8){
			return false;
		}
		final String pat = "^(19\\d{2}|20\\d{2})((0[1-9]|10|11|12))((0[1-9]|[12][0-9])|30|31)";
		Pattern pattern = Pattern.compile(pat);
		Matcher mat = pattern.matcher(birthday);
		return mat.matches();
	}
	
	public static boolean checkDateyyyyMMddHHmmss(String time){
		if(StringUtil.isBlank(time)){
			return false;
		}
		if(time.trim().length()!=14){
			return false;
		}
		System.out.println("-");
		final String pat = "^(19\\d{2}|20\\d{2})((0[1-9]|10|11|12))((0[1-9]|[12][0-9])|30|31)([0-1][0-9]|20|21|22|23)([0-5][0-9])([0-5][0-9])";
		Pattern pattern = Pattern.compile(pat);
		Matcher mat = pattern.matcher(time);
		return mat.matches();
	}
	/**
	 * 验证图片后缀是否为允许的后缀
	 * .jpg .jpeg .fig .png
	 * @param type
	 * @return
	 */
	public static boolean checkPicType(String type){
		if(type==null){
			return false;
		}
		type = type.trim().toLowerCase();
		if(type.equals("gif")||type.equals("jpg")||type.equals("jpeg")||type.equals("png")){
			return true;
		}else {
			return false;
		}
	}
	
	/**
	 *Description : 验证即时通讯图片，音频后缀
	 *@param type
	 *@return
	 *Datetime    : Jul 27, 2013 4:13:12 PM
	 *@author     : shixiangjian 
	 */
	public static boolean checkImResourceType(String type){
		if(type==null){
			return false;
		}
		type = type.trim().toLowerCase();
		if(type.equals("pdf")||type.equals("gif")||type.equals("jpg")||type.equals("jpeg")
				||type.equals("png")||type.equals("ogg")||type.equals("mp3")||type.equals("mp4")){
			return true;
		}else {
			return false;
		}
	}

    /**
     *Description : 验证视频格式
     *@param type
     *@return
     *Datetime     : 2013/8/5 12:01
     *@author     : 卢川
     */
    public static boolean checkVideoResourceType(String type){
        if(type==null){
            return false;
        }
        type = type.trim().toLowerCase();
        String audioTypes = "mp4|avi|rmvb|3gp|mkv|wmv|mpg|vob|flv|swf|mov";
        if( !type.contains("|") && audioTypes.contains(type)){
            return true;
        }else {
            return false;
        }
    }
    /**
     *Description : 验证音频格式
     *@param type
     *@return
     *Datetime     : 2013/8/5 12:01
     *@author     : 卢川
     */
    public static boolean checkAudioResourceType(String type){
        if(type==null){
            return false;
        }
        type = type.trim().toLowerCase();
        String audioTypes = "mp3|wav|pcm|tta|flac|au|ape|tak|ogg|aac|wma|3gp";
        if( !type.contains("|") && audioTypes.contains(type)){
            return true;
        }else {
            return false;
        }
    }
}
