package com.ziteng.service.hotel.impl;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ziteng.dao.hotel.IHotelSmsRec;
import com.ziteng.dto.query.hotel.HotelSmsRecQuery;
import com.ziteng.entity.hotel.HotelSmsRec;
import com.ziteng.service.hotel.IDuanXinSMSService;
import com.ziteng.utils.DateUtils;

@Service
@Transactional
public class DuanXinSMSImpl implements IDuanXinSMSService {

	@Autowired
	private IHotelSmsRec hotelSmsRecDao;
	/**
	 *  发送短信接口
	 * @param phoneNum  手机号码
	 * @param content   短信内容
	 * @return 是否发送成功标记  100 为发送成功 其他值 为发送不成功
	 * @author yuyajie 
	 * */
	//发送短信  
	@Override
	public String sendSMS(String phoneNum,String content) throws IOException
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
		//content = "您好！欢迎订购“七天假日酒店”大床房，总价：198员 预计到店时间：2014-6-10  20:00。 欢迎入住【紫藤车队】";		
		
		System.out.println(java.net.URLEncoder.encode(content,"utf-8"));
		sb.append("&content=" + java.net.URLEncoder.encode(content,"utf-8"));
//		System.out.println(URLDecoder.decode(cc));		
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
	//保存发送短信记录
	/**
	 * 保存发送短信内容  包括：订单号、手机号、短信内容
	 * @param orderId  订单号
	 * @param phoneNum 手机号
	 * @param smsContent 短信内容
	 * **/
	public Integer saveSMSRc(String orderId, String rcphoneNum, String smsContent, String remarks)
	{
		
		HotelSmsRec hotelSmsRec = new HotelSmsRec();
		hotelSmsRec.setId(getGeneralId() + 1);
		hotelSmsRec.setOrderId(orderId);
		hotelSmsRec.setMessageContent(smsContent);
		hotelSmsRec.setSenderPhone(rcphoneNum);
		hotelSmsRec.setCreateTime(new Date());
		hotelSmsRec.setMessageType("订单详情");		
		hotelSmsRec.setRemarks(remarks);
		Integer result = hotelSmsRecDao.insert(hotelSmsRec);			
		return result;
	}
	
	/**
	 * 保存回复短信内容  
	 * @param rpDate 回复时间
	 * @param phoneNum 手机号 回复的
	 * @param smsContent 短信内容
	 * @param remarks 网关号 
	 * **/
	public Integer saveSMSHfc(String rpDate, String rcphoneNum, String smsContent, String remarks)
	{
		
		HotelSmsRec hotelSmsRec = new HotelSmsRec();
		hotelSmsRec.setId(getGeneralId() + 1);
		hotelSmsRec.setCreateTime(DateUtils.yyyy_MM_dd_HH_mm_ss2Date(rpDate));
		hotelSmsRec.setMessageContent(smsContent);
		hotelSmsRec.setReceivePhone(rcphoneNum);
		hotelSmsRec.setMessageType("回复内容");		
		hotelSmsRec.setRemarks(remarks);
		Integer result = hotelSmsRecDao.insert(hotelSmsRec);			
		return result;
	}
	
	//接受消息回复 
	@Override
	public String getSMSRe() throws IOException
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
		//String u = "http://localhost:821/xiaodi/test.asp";
		//URL url = new URL(u);
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
	    
	    //将获取到的回复信息保存到短信记录表中
	    xml = xml.replace("{&}", "#&#"); 		
		String[] recs = xml.split("#&#");
		
	    if(recs.length > 0)
	    {
	    	for(int j = 1; j < recs.length; j++)
	    	{
	    		String rec = recs[j];  // 得到一条记录  这里不要第0位 因为 最开始 为状态吗
	    		String[] recc = rec.split("\\|\\|"); //将一条记录分割 得到 回复的电话号码、回复的内容、回复的实际、通道号码
	    		saveSMSHfc(recc[2],recc[0],recc[1],recc[3]); // 保存回复内容	    		
	    	}
	    }
	    
		return xml;
	}	
	
	@Override
	public int getGeneralId() {
		// TODO Auto-generated method stub
		Integer result = hotelSmsRecDao.getGeneralId();
		return result == null ? 1 : result + 1;
	}
}
