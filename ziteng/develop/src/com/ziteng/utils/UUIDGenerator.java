/**
 * <b>项目名：</b>kk<br/>  
 * <b>包名：</b>com.kk.utils<br/>  
 * <b>文件名：</b>UUIDGenerator.java<br/> 
 * <b>日期：</b>2013-9-3 下午12:29:49<br/>  
 * <b>Copyright (c)</b> 2013<br/>    
 */
package com.ziteng.utils;

import java.util.UUID;

/** 
 * <b>类描述：UUID生成器</b><br/>  
 * <b>@author </b>shixiangjian<br/>  
 * <b>修改时间：</b>2013-9-3 下午12:29:49<br/> 
 * <b>修改备注：</b><br/> 
 *
 */
public class UUIDGenerator {
	public static String getUUID() {  
        UUID uuid = UUID.randomUUID();  
        String str = uuid.toString();  
        // 去掉"-"符号  
        String temp = str.substring(0, 8) + str.substring(9, 13) + str.substring(14, 18) + str.substring(19, 23) + str.substring(24);  
        return temp;  
    }  
	public static void main(String[] args) {
		String str = getUUID();
		System.out.println(str);
	}
}
