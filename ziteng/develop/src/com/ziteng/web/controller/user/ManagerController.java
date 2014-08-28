package com.ziteng.web.controller.user;

import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ziteng.common.Constants;
import com.ziteng.dto.biz.Result;
import com.ziteng.dto.query.user.ManagerQuery;
import com.ziteng.dto.query.user.UserQuery;
import com.ziteng.entity.user.Manager;
import com.ziteng.entity.user.User;
import com.ziteng.service.user.IManagerService;
import com.ziteng.service.user.IUserService;
import com.ziteng.utils.MD5Util;
import com.ziteng.utils.Regex;

@Controller
public class ManagerController {
	
    @Autowired
    private IManagerService managerService;
    
    @Autowired
	private IUserService userService;
    
    /*******************************************
	 * 管理员用户管理 *
	 *******************************************/
    
    /**
     * <b>Summary: </b>
     *     managerLogin 管理员登陆
     * @param name
     * @param password
     * @return
     */
    @RequestMapping("/admin/managerLogin.do")
    @ResponseBody
    public String managerLogin(HttpSession session, String name, String password){   
    	Result result = new Result();
		UserQuery query = new UserQuery();
			
		System.out.println("Name == " + name + "password == " + password);
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
			System.out.println("Query.setUserName(" + name + ")");
			query.setUserName(name);
		}

		// 普通用户
		query.setType(Constants.ADMINISTRATOR);

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
			session.setAttribute(Constants.ADMIN_INFO, user);
			session.setAttribute(Constants.USER_INFO, user);
		}
		result.putObject("admin", user);
		return result.toJsonString();
    }
    
    /**
	 * loginOut。
	 * @param session
	 * @return
	 */
	@RequestMapping("/admin/managerloginOut.do")
	@ResponseBody
	public String loginOut(HttpSession session) {
		Result result = new Result();
		session.removeAttribute(Constants.ADMIN_INFO);
		result.setSuccess(true);
		return result.toJsonString();
	}
	
	/**
	 * check is user login。
	 * 
	 * @param session
	 * @return
	 */
	@RequestMapping("/admin/isLogin.do")
	@ResponseBody
	public String checkLogin(HttpSession session) {
		Result result = new Result();
		User admin = (User) session.getAttribute(Constants.ADMIN_INFO);
		result.setSuccess(admin != null);
		result.setMsg(admin != null ? "已登录" : "未登录");
		result.putObject("admin", admin);
		return result.toJsonString();
	}
    
    /**
	 * 添加管理员用户
	 * 
	 * @param session
	 * @param user
	 * @return
	 */
	@RequestMapping("/admin/addAdministrator.do")
	@ResponseBody
	public String addAdministrator(HttpSession session, User user) {
		// step-1 validate property.
		Result result = new Result();
		
		User admin = (User) session.getAttribute(Constants.ADMIN_INFO);
		if (admin == null) {
			result.setSuccess(false);
			result.setMsg("管理员未登录");
			return result.toJsonString();
		}
		
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
		user.setType(Constants.ADMINISTRATOR);
		user.setCreateTime(new Date());
		boolean register = userService.register(user);
		result.setSuccess(register);
		result.setMsg(register ? "添加成功" : "添加失败");
		return result.toJsonString();
	}
	
	/**
	 * 修改密码
	 * @param session
	 * @param oldpassword
	 * @param newpassword
	 * @return
	 */
	@RequestMapping("/admin/changePassword.do")
	@ResponseBody
	public String changePassword(HttpSession session, String oldpassword, String newpassword) {
		Result result = new Result();
		
		User admin = (User) session.getAttribute(Constants.ADMIN_INFO);
		if (admin == null) {
			result.setSuccess(false);
			result.setMsg("管理员未登录");
			return result.toJsonString();
		}
		
		if (! MD5Util.getMD5(oldpassword).equals(admin.getPassword())) {
			result.setSuccess(false);
			result.setMsg("密码错误");
		} else {
			admin.setPassword(MD5Util.getMD5(newpassword));
			userService.updateUser(admin);
			result.setSuccess(true);
			result.setMsg("更新密码成功");
			session.setAttribute(Constants.ADMIN_INFO, admin);
		}
		
		return result.toJsonString();
	}
    
    /**
     * 
     * <b>Summary: </b>
     *     getSearchManager 查询管理员
     * @param query
     * @return
     */
    @RequestMapping("/admin/managerQuery.do")
    @ResponseBody
    public String getSearchManager(ManagerQuery query){
        Result result = new Result();
        if(query == null){
            query = new ManagerQuery();
        }
        int           total     = managerService.queryManagersCount(query);
        List<Manager> managers  = managerService.queryManagers(query);
        result.setSuccess(true);
        result.setMsg("查询成功");
        result.putObject("total", total);  
        result.putObject("managers", managers);
        result.putObject("pageNo",query.getPageNo());
        result.putObject("pageSize", query.getPageSize());
        return result.toJsonString();
    }
    
    /**
	 * 查询所有的普通用户
	 * @param session
	 * @return
	 */
	@RequestMapping("/admin/getUserList.do")
	@ResponseBody
	public String getUserList(HttpSession session) {
		Result result = new Result();
		User admin = (User) session.getAttribute(Constants.ADMIN_INFO);
		
		if (admin == null) {
			result.setSuccess(false);
			result.setMsg("管理员未登录");
			return result.toJsonString();
		}
		
		UserQuery query = new UserQuery();
		query.setType(Constants.COMMON_USER);
		
		List<User> users = userService.queryUser(query);
		result.setSuccess(true);
		result.putObject("users", users);
		
		return result.toJsonString();
	}
	
	/**
	 * 查询特定普通用户的详细情况
	 * @param session
	 * @param userId
	 * @return
	 */
	@RequestMapping("/admin/getUserDetails.do")
	@ResponseBody
	public String getUserDetails(HttpSession session, String userId) {
		Result result = new Result();
		User admin = (User) session.getAttribute(Constants.ADMIN_INFO);
		
		if (admin == null) {
			result.setSuccess(false);
			result.setMsg("管理员未登录");
			return result.toJsonString();
		}
		
		User user = userService.selectById(Integer.parseInt(userId));
		result.setSuccess(true);
		result.putObject("user", user);
		
		return result.toJsonString();
	}
}
