/**
 * <b>项目名：</b>kk<br/>  
 * <b>包名：</b>com.kk.utils<br/>  
 * <b>文件名：</b>SMSUtils.java<br/> 
 * <b>日期：</b>2013-9-18 下午05:14:32<br/>  
 * <b>Copyright (c)</b> 2013<br/>    
 */
package com.ziteng.utils;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import org.apache.log4j.Logger;

/** 
 * <b>类描述：世纪之村短信接口</b><br/>  
 * <b>@author </b>shixiangjian<br/>  
 * <b>修改时间：</b>2013-9-18 下午05:14:32<br/> 
 * <b>修改备注：</b><br/> 
 *
 */
public class SMSUtils {
	private static Logger logger = Logger.getLogger(SMSUtils.class);
	
	/**
	 * 功能描述: 多个号码<br/> 
	 * @param content
	 * @param mobiles 
	 * @author shixiangjian
	 * 日期:2013-9-18 下午05:30:32
	 */
	public static void sendMsg(String content,List<String> mobiles){
//		HttpClientUtil client = new HttpClientUtil();
		StringBuffer mobileSbf = new StringBuffer();
		for(String mo:mobiles){
			mobileSbf.append(mo).append(";");
		}
		if(mobileSbf.toString().endsWith(";")){
			mobileSbf.deleteCharAt(mobileSbf.length()-1);
		}
		//至少有一个手机号码
		if(mobileSbf.length()>=11){
			HttpClient client = new DefaultHttpClient();
			HttpPost post = new HttpPost("http://m.mall.cuncun8.com/interface/msg");
			List<NameValuePair> values = new ArrayList<NameValuePair>();
				try {
					String mobile = mobileSbf.toString();//多个号码用“;”隔开
					String msg = java.net.URLEncoder.encode(content,"utf-8");
					String key = "DFDKFFDF2145452FDWEKEIN";//通讯密钥
					values.add(new BasicNameValuePair("mobile", mobile));
					values.add(new BasicNameValuePair("msg", msg));
					values.add(new BasicNameValuePair("sign", MD5Util.getMD5("mobile="+mobile+"&msg="+msg+key).toUpperCase()));
					post.setEntity(new UrlEncodedFormEntity(values,"UTF-8"));
					HttpResponse response = client.execute(post);
					HttpEntity entity = response.getEntity();
					BufferedReader reader = new BufferedReader(new InputStreamReader(entity.getContent(), "UTF-8"));   
					String line = reader.readLine();   
					logger.info("sendMsg>>:"+line);
					if(entity!=null){
						EntityUtils.consume(entity);
					}
				} catch (UnsupportedEncodingException e) {
					e.printStackTrace();
				} catch (ClientProtocolException e) {
					e.printStackTrace();
				} catch (IllegalStateException e) {
					e.printStackTrace();
				} catch (IOException e) {
					e.printStackTrace();
				}
		}
	}
	
	/**
	 * 功能描述: 单个号码<br/> 
	 * @param content
	 * @param m 
	 * @author shixiangjian
	 * 日期:2013-9-18 下午05:30:25
	 */
	public static void sendMsg(String content,String m){
//		HttpClientUtil client = new HttpClientUtil();
		//至少有一个手机号码
		if(m.trim().length()==11){
			HttpClient client = new DefaultHttpClient();
			HttpPost post = new HttpPost("http://m.mall.cuncun8.com/interface/msg");
			List<NameValuePair> values = new ArrayList<NameValuePair>();
				try {
					String mobile = m;//多个号码用“;”隔开
					String msg = java.net.URLEncoder.encode(content,"utf-8");
					String key = "DFDKFFDF2145452FDWEKEIN";//通讯密钥
					values.add(new BasicNameValuePair("mobile", mobile));
					values.add(new BasicNameValuePair("msg", msg));
					values.add(new BasicNameValuePair("sign", MD5Util.getMD5("mobile="+mobile+"&msg="+msg+key).toUpperCase()));
					post.setEntity(new UrlEncodedFormEntity(values,"UTF-8"));
					HttpResponse response = client.execute(post);
					HttpEntity entity = response.getEntity();
					BufferedReader reader = new BufferedReader(new InputStreamReader(entity.getContent(), "UTF-8"));   
					String line = reader.readLine();   
					logger.info("sendMsg>>:"+line);
					if(entity!=null){
						EntityUtils.consume(entity);
					}
				} catch (UnsupportedEncodingException e) {
					e.printStackTrace();
				} catch (ClientProtocolException e) {
					e.printStackTrace();
				} catch (IllegalStateException e) {
					e.printStackTrace();
				} catch (IOException e) {
					e.printStackTrace();
				}
		}
	}
}
