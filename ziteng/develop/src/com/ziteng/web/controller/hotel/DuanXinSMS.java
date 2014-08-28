package com.ziteng.web.controller.hotel;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class DuanXinSMS {
	
	/**
	 *  发送短信接口
	 * @param phoneNum  手机号码
	 * @param content   短信内容
	 * @return 是否发送成功标记  100 为发送成功 其他值 为发送不成功
	 * @author yuyajie 
	 * */
	//发送短信  
	@RequestMapping("/hotel/sendSMS.do")
	@ResponseBody
	public static String sendSMS(String phoneNum,String content) throws IOException
	{
		
		// 创建StringBuffer对象用来操作字符串
		StringBuffer sb = new StringBuffer("http://http.yunsms.cn/tx/?");
		// 向StringBuffer追加用户名
		sb.append("uid=55369");
		// 向StringBuffer追加密码（密码采用MD5 32位 小写）
		sb.append("&pwd=a99aec3774604ce5f26952c5287a5e33");
		// 向StringBuffer追加手机号码
		sb.append("&mobile=" + phoneNum);
		//设置内容编码方式
		sb.append("&encode=utf8");
		// 向StringBuffer追加消息内容转URL标准码
		sb.append("&content=" + URLEncoder.encode(content));
		// System.out.println(sb.toString());
		// 创建url对象
		URL url = new URL(sb.toString());
		// 打开url连接
		HttpURLConnection connection = (HttpURLConnection) url.openConnection();
		// 设置url请求方式 ‘get’ 或者 ‘post’
		connection.setRequestMethod("POST");
		// 发送
		BufferedReader in = new BufferedReader(new InputStreamReader(url.openStream()));
		// 返回发送结果
		String inputline = in.readLine();
		// 返回结果为‘100’ 发送成功
		System.out.println(inputline);
		return inputline;
	}	
	
	//接受消息回复 
	@RequestMapping("/hotel/getSMSRe.do")
	@ResponseBody
	public static String getSMSRe() throws IOException
	{
		String xml = "";		
		
		// 创建StringBuffer对象用来操作字符串
		StringBuffer sb = new StringBuffer("http://http.yunsms.cn/rx/?");
		// 向StringBuffer追加用户名
		sb.append("uid=55369");
		// 向StringBuffer追加密码（密码采用MD5 32位 小写）  用户名：55369  密码：gha864
		sb.append("&pwd=a99aec3774604ce5f26952c5287a5e33");
		//设置接收字符编码
		sb.append("&encode=utf8");
		// 创建url对象
		URL url = new URL(sb.toString());		
		// 打开url连接
		HttpURLConnection connection = (HttpURLConnection) url.openConnection();
		// 设置url请求方式 ‘get’ 或者 ‘post’
		connection.connect();
	    // 取得输入流，并使用Reader读取
	    BufferedReader reader = new BufferedReader(new InputStreamReader(
	                connection.getInputStream()));
//	    System.out.println("=============================");
//	    System.out.println("Contents of get request");
//	    System.out.println("=============================");
	    String lines;
	    while ((lines = reader.readLine()) != null) {
	            System.out.println(lines);
	            if(xml.equals(""))
	            {
	            	xml = lines;
	            }
	            else
	            {
	            	xml += "" +lines;
	            }
	    }
	    reader.close();
	    // 断开连接
	    connection.disconnect();
	       /* System.out.println("=============================");
	        System.out.println("Contents of get request ends");
	        System.out.println("=============================");*/
		return xml;
	}	
	
}
