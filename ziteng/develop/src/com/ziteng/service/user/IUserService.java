package com.ziteng.service.user;

import java.util.List;

import com.ziteng.dto.query.user.UserQuery;
import com.ziteng.entity.user.User;

/**
 * 用户
 * @author lusar
 * @date 2014-04-07
 *
 */
public interface IUserService {
	public boolean register(User user);

	public boolean updateUser(User user);

	public List<User> queryUser(UserQuery query);

	public int queryCount(UserQuery query);

	/**
	 * 
	 * @param query  设置password， userName | mobile | email.
	 * @return User 登陆成功返回User，否则返回NUll
	 */
	public User login(UserQuery query);
	public	User selectById(Integer id);
}
