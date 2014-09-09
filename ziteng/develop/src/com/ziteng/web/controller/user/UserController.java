package com.ziteng.web.controller.user;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Enumeration;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ziteng.common.Constants;
import com.ziteng.dto.biz.Result;
import com.ziteng.dto.query.user.UserQuery;
import com.ziteng.entity.user.User;
import com.ziteng.service.user.IUserService;
import com.ziteng.utils.MD5Util;
import com.ziteng.utils.Regex;

/**
 * 用户管理控制器
 * 
 * @author lusar
 * @date 2014-04-24
 * 
 */
@Controller
public class UserController {

	@Autowired
	private IUserService userService;

	/*******************************************
	 * 普通用户管理 *
	 *******************************************/
	
	
	/*在用SpringMVC整合mybatis的时候，在controller中调用service进行保存数据的操作，遇到了
	 Failed to convert from type java.lang.String to type java.util.Date for value………这个错误 */
	@InitBinder 
    public void initBinder(WebDataBinder binder) {   
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");   
        dateFormat.setLenient(true);   
        binder.registerCustomEditor(Date.class, new CustomDateEditor(dateFormat, true));   
    } 
	/**
	 * loginOut。
	 * 
	 * @param session
	 * @return
	 */
	@RequestMapping("/user/getUserInfoById.do")
    @ResponseBody
	public String getUserInfo(Integer uid){
		Result result = new Result();
		User user = userService.selectById(uid);
		result.setSuccess(user!=null);
		result.setMsg(user==null?"获取失败":"获取用户信息成功");
		result.putObject("user", user);
		return result.toJsonString();
	}
	
	/**
	 * loginOut。
	 * @param session
	 * @return
	 */
	@RequestMapping("/user/getUserInfoFromCache.do")
    @ResponseBody
	public String getUserInfoFromCache(Integer uid){
		Result result = new Result();
//		User user = userCacheDao.selectById(uid);
//		result.setSuccess(user!=null);
//		result.setMsg(user==null?"获取失败":"获取用户信息成功");
//		result.putObject("user", user);
		return result.toJsonString();
	}
	
	
	/**
	 * loginOut。
	 * @param session
	 * @return
	 */
	@RequestMapping("/user/loginOut.do")
	@ResponseBody
	public String loginOut(HttpSession session) {
		Result result = new Result();
		session.removeAttribute(Constants.USER_INFO);
		result.setSuccess(true);
		return result.toJsonString();
	}

	/**
	 * check is user login。
	 * 
	 * @param session
	 * @return
	 */
	@RequestMapping("/user/isLogin.do")
	@ResponseBody
	public String checkLogin(HttpSession session) {
		Result result = new Result();
		User user = (User) session.getAttribute(Constants.USER_INFO);
		//System.out.println("user:"+user);
		if (user.getType() != Constants.COMMON_USER) return result.setErrorMsg("请用普通用户登录").toJsonString();
		result.setSuccess(user != null);
		result.setMsg(user != null ? "已登录" : "未登录");
		result.putObject("user", user);
		return result.toJsonString();
	}

	/**
	 * 检查属性是否已经注册过了。
	 * 
	 * @param value
	 *            name | email | mobile | idcard
	 * @return
	 */
	@RequestMapping("/user/register_check.do")
	@ResponseBody
	public String checkIsTypeRigster(String value) {
		Result result = new Result();
		UserQuery query = new UserQuery();
		if (StringUtils.isBlank(value) || value.length() > 60) {
			return result.setErrorMsg("字段不能空,且长度不能超过60个字符").toJsonString();
		}

		if (Regex.regex(Regex.semail, value)) { // 1. check email
			query.setEmail(value);
		} else if (Regex.regex(Regex.smobile, value)) { // 2. check mobile
			query.setPhoneNumber(value);
		} else if (Regex.regex(Regex.sidCard, value)) { // 3. 身份证
			query.setIdCard(value);
		} else { // 4. 说明是用户登陆
			query.setUserName(value);
		}
		int count = userService.queryCount(query);
		if (count > 0) {
			result.setErrorMsg("已经被注册过了");
		} else {
			result.setSuccess(true);
			result.setMsg("尚未注册");
		}
		return result.toJsonString();
	}

	/**
	 * 注册用户
	 * 
	 * @param session
	 * @param user
	 * @return
	 */
	@RequestMapping("/user/register.do")
	@ResponseBody
	public String register(HttpSession session, User user) {
		// step-1 validate property.
		Result result = new Result();
		if (StringUtils.isBlank(user.getFullName())
				|| user.getFullName().length() > 60) {
			return result.setErrorMsg("用户名不能空,且长度不能超过60个字符").toJsonString();
		}
		if (StringUtils.isBlank(user.getUserName())
				|| user.getUserName().length() > 60) {
			return result.setErrorMsg("用户名不能空,且长度不能超过60个字符").toJsonString();
		}
		if (StringUtils.isBlank(user.getPassword())
				|| user.getPassword().length() > 20) {
			return result.setErrorMsg("密码不能空， 且长度不能超过20个字符").toJsonString();
		}
		if (StringUtils.isBlank(user.getIdCard())) {
			return result.setErrorMsg("身份证不能为空").toJsonString();
		}
		if (!Regex.regex(Regex.sidCard, user.getIdCard())) {
			return result.setErrorMsg("身份证号码不符合").toJsonString();
		}
		if (StringUtils.isBlank(user.getPhoneNumber())) {
			return result.setErrorMsg("手机号码不能为空").toJsonString();
		}
		if (!Regex.regex(Regex.smobile, user.getPhoneNumber())) {
			return result.setErrorMsg("手机号码不正确").toJsonString();
		}

		if (StringUtils.isBlank(user.getEmail())
				|| user.getEmail().length() > 50) {
			return result.setErrorMsg("Email不能为空").toJsonString();
		}
		if (!Regex.regex(Regex.semail, user.getEmail())) {
			return result.setErrorMsg("Email不合法").toJsonString();
		}

		// step-2 业务操作.
		UserQuery query = new UserQuery();
		query.setUserName(user.getUserName());
		int count = userService.queryCount(query);
		if (count > 0) {
			return result.setErrorMsg("该昵称已经被注册了").toJsonString();
		}
		query.setUserName("");
		query.setPhoneNumber(user.getPhoneNumber());
		count = userService.queryCount(query);
		if (count > 0) {
			return result.setErrorMsg("该手机号已经被注册了").toJsonString();
		}
		query.setPhoneNumber("");
		query.setEmail(user.getEmail());
		count = userService.queryCount(query);
		if (count > 0) {
			return result.setErrorMsg("该邮箱已经被注册了").toJsonString();
		}
		query.setEmail("");
		query.setIdCard(user.getIdCard());
		count = userService.queryCount(query);
		if (count > 0) {
			return result.setErrorMsg("该身份证已经被注册了").toJsonString();
		}

		// s4. register.
		user.setType(Constants.COMMON_USER);
		user.setCreateTime(new Date());
		boolean register = userService.register(user);
		result.setSuccess(register);
		result.setMsg(register ? "注册成功" : "注册失败");
		if (register) {// 注册成功，添加User到回话中。
			session.setAttribute(Constants.USER_INFO, user);
		}
		return result.toJsonString();
	}

	/**
	 * 用户登录
	 * 
	 * @param session
	 * @param name
	 *            姓名 | Email | Mobile | idCard
	 * @param password
	 *            密码
	 * @return
	 */
	@RequestMapping("/user/login.do")
	@ResponseBody
	public String login(HttpSession session, String name, String password) {
		Result result = new Result();
		UserQuery query = new UserQuery();

		// s1 validate
		if (StringUtils.isBlank(name) || name.length() > 60) {
			return result.setErrorMsg("用户名不能空,且长度不能超过60个字符").toJsonString();
		}

		// s2 whether is email, mobile or name login.
		if (Regex.regex(Regex.semail, name)) { // 1. 说明是email登陆
			query.setEmail(name);
		} else if (Regex.regex(Regex.smobile, name)) { // 2. 说明是mobile登陆
			query.setPhoneNumber(name);
		} else if (Regex.regex(Regex.sidCard, name)) { // 3. 身份证
			query.setIdCard(name);
		} else { // 4. 说明是用户登陆
			query.setUserName(name);
            System.out.println("UserController.java, name == " + name);
		}

		// 普通用户
		query.setType(Constants.COMMON_USER);

		// s3 login.
		int count = userService.queryCount(query);
		if (count == 0) {
			return result.setErrorMsg("不存在该用户").toJsonString();
		}
		// s4. 登录成功，添加User到回话中。
		query.setPassword(password);
		User user = userService.login(query);
		result.setSuccess(user != null);
		result.setMsg(user != null ? "登录成功" : "密码不正确");
		if (user != null) {
			session.setAttribute(Constants.USER_INFO, user);
		}
		result.putObject("user", user);
		return result.toJsonString();
	}

	@RequestMapping("/user/getUserInfo.do")
	@ResponseBody
	public String loadUserInfo(HttpSession session) {
		Result result = new Result();
		User user = (User) session.getAttribute(Constants.USER_INFO);
		result.setSuccess(user != null);
		result.putObject("userInfo", user);
		result.setMsg(user == null ? "尚未登录" : "获取成功");
		return result.toJsonString();
	}
	
	/**
	 * 
	 * @param session
	 * @param oldPassword
	 * @param newPassword
	 * @return
	 */
	@RequestMapping("/user/changePassword.do")
	@ResponseBody
	public String changePassword(HttpSession session, String oldPassword, String newPassword) {
		Result result = new Result();
		
		User user = (User) session.getAttribute(Constants.USER_INFO);
		if (user == null) {
			result.setSuccess(false);
			result.setMsg("用户未登录");
			return result.toJsonString();
		} 
		
		if (! MD5Util.getMD5(oldPassword).equals(user.getPassword())) {
			result.setSuccess(false);
			result.setMsg("密码错误");
		} else {
			user.setPassword(MD5Util.getMD5(newPassword));
			userService.updateUser(user);
			result.setSuccess(true);
			result.setMsg("更新密码成功");
			session.setAttribute(Constants.USER_INFO, user);
		}
		
		return result.toJsonString();
	}
	
	/**
	 * 更新用户信息 
	 * @param session
	 * @param user
	 * @return
	 */
	@RequestMapping("/user/updateUserInfo.do")
	@ResponseBody
	public String updateUserInfo(HttpSession session, User user) {
		/*
		Result result = new Result();
		//System.out.println("start");
		User oldUser = (User) session.getAttribute(Constants.USER_INFO);
		
		if (oldUser == null) {
			System.out.println("oldUser is null");
			result.setSuccess(false);
			result.setMsg("用户未登录");
			return result.toJsonString();
		}
		user.setId(oldUser.getId());
		boolean flag = userService.updateUser(user);
		result.setSuccess(flag);
		result.setMsg(flag ? "更新用户成功" : "更新用户失败");
		if (flag) {
			session.setAttribute(Constants.USER_INFO, user);//这句话应不应该加注释的问题 
		}
		//System.out.println("flag:"+flag);
		return result.toJsonString();
		*/
		
		
		Result result = new Result();
		//System.out.println("start");
		User oldUser = (User) session.getAttribute(Constants.USER_INFO);
		
		if (oldUser == null) {
			System.out.println("oldUser is null");
			result.setSuccess(false);
			result.setMsg("用户未登录");
			return result.toJsonString();
		}
		//user.setId(oldUser.getId());
		oldUser.setSex(user.getSex());
		oldUser.setPhoneNumber(user.getPhoneNumber());
		oldUser.setEmail(user.getEmail());
		oldUser.setIdCard(user.getIdCard());
		oldUser.setBirth(user.getBirth());
		oldUser.setAddress(user.getAddress());
		
		boolean flag = userService.updateUser(oldUser);
		result.setSuccess(flag);
		result.setMsg(flag ? "更新用户成功" : "更新用户失败");
		if (flag) {
			session.setAttribute(Constants.USER_INFO, oldUser);//这句话应不应该加注释的问题 
		}
		//System.out.println("flag:"+flag);
		return result.toJsonString();
	}

}
