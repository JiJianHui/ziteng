package com.ziteng.dto.query.user;

import java.util.Date;

import com.ziteng.dto.query.base.Query;

/**
 * @author yangzuo
 * @date 2014-4-19
 *
 */
public class UserQuery extends Query {
	
	private Integer id;            // 用户id
	private String userName;       // 用户名
	private String fullName;       // 用户真实姓名
	private String idCard;         // 身份证
	private String email;          // 电子邮箱
	private String phoneNumber;    // 用户电话号码
	private Integer sex;           // 用户性别, 0表示male, 1表示female
	private Integer type;          // 用户类型, 0表示游客, 1表示普通用户, 2表示管理员
	private String address;        // 地址
	private Date birth;            // 生日
	private String avatar;         // 头像地址
	private String password;       // md5加密后密码
	private Date createTime;       // 用户创建时间
	private Date modifyTime;       // 用户修改时间
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getFullName() {
		return fullName;
	}
	public void setFullName(String fullName) {
		this.fullName = fullName;
	}
	public String getIdCard() {
		return idCard;
	}
	public void setIdCard(String idCard) {
		this.idCard = idCard;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPhoneNumber() {
		return phoneNumber;
	}
	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}
	public Integer getSex() {
		return sex;
	}
	public void setSex(Integer sex) {
		this.sex = sex;
	}
	public Integer getType() {
		return type;
	}
	public void setType(Integer type) {
		this.type = type;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public Date getBirth() {
		return birth;
	}
	public void setBirth(Date birth) {
		this.birth = birth;
	}
	public String getAvatar() {
		return avatar;
	}
	public void setAvatar(String avatar) {
		this.avatar = avatar;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public Date getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
	public Date getModifyTime() {
		return modifyTime;
	}
	public void setModifyTime(Date modifyTime) {
		this.modifyTime = modifyTime;
	}
}
