/**
 * <b>项目名：</b>kk<br/>  
 * <b>包名：</b>com.kk.dto.biz<br/>  
 * <b>文件名：</b>UploadResult.java<br/> 
 * <b>日期：</b>2013-11-27 下午08:11:51<br/>  
 * <b>Copyright (c)</b> 2013<br/>    
 */
package com.ziteng.dto.biz;

/** 
 * <b>类描述：资源文件上传返回结果</b><br/>  
 * <b>@author </b>shixiangjian<br/>  
 * <b>修改时间：</b>2013-11-27 下午08:11:51<br/> 
 * <b>修改备注：</b><br/> 
 *
 */
public class UploadResult {
	//当缩放时候，多图片地址;隔开
	//{"result":"success","name":"upload/20131127/IMG20131127200257698084.jpg;upload/20131127/IMG20131127200257698084_x.jpg"}
	//当result返回success时，name返回图片的访问地址
	//当result返回faild时，name返回失败原因
	private boolean success;
	private String result;
	private String name;
	public String getResult() {
		return result;
	}
	public void setResult(String result) {
		this.result = result;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public boolean isSuccess() {
		return success;
	}
	public void setSuccess(boolean success) {
		this.success = success;
	}
}
