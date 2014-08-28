package com.ziteng.service.hotel;

import java.io.IOException;

public interface IDuanXinSMSService {
	/**
	 * 短信发送接口
	 * */
	public String sendSMS(String phoneNum,String content) throws IOException;
	
	/**
	 * 保存发送短信内容  包括：订单号、手机号、短信内容
	 * @param orderId  订单号
	 * @param phoneNum 手机号
	 * @param smsContent 短信内容
	 * @param remarks 短信发送成功编码  100 成功 其他 不成功
	 * **/
	public Integer saveSMSRc(String orderId, String phoneNum, String smsContent,String remarks);

	/**
	 * 保存回复短信内容  
	 * @param rpDate 回复时间
	 * @param phoneNum 手机号 回复的
	 * @param smsContent 短信内容
	 * @param remarks 网关号 
	 * **/
	public Integer saveSMSHfc(String rpDate, String phoneNum, String smsContent,String remarks);

	
	/**
	 * 短息接收回复接口  注意 只能接收一次 二次 10分钟收一次 ，所以 我们本地需要存储接收的短信回复记录
	 * @throws IOException 
	 * */
	public String getSMSRe() throws IOException;
	
	public int getGeneralId();
	
}
