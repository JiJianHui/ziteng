package com.ziteng.dao.user;

import com.ziteng.dao.base.IBaseDao;
import com.ziteng.entity.user.User;

public interface IUserDao extends IBaseDao<User> {
	public String getNameById(Integer id);
}
