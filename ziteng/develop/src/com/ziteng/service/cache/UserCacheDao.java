package com.ziteng.service.cache;

import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.ziteng.dao.base.IBaseDao;
import com.ziteng.dao.base.ICacheBaseDao;
import com.ziteng.dao.user.IUserDao;
import com.ziteng.entity.user.User;
import com.ziteng.utils.JedisCacheTool;

/**
 * user cache dao.
 * @author lusar
 *
 */
@Component
public class UserCacheDao implements ICacheBaseDao<User>, IBaseDao<User>{
	
	private final String user_prefix = "user_";
	
	@Autowired
	private IUserDao userDao;
	
	@Autowired
	private JedisCacheTool jedisCacheTool;

	@Override
	public Integer insert(User user) {
		Integer result = userDao.insert(user);
		if(result>0){
			jedisCacheTool.putIntoCacheWithDefaultExpire(user_prefix, user.getId(), user);
		}
		return result;
	}

	@Override
	public Integer update(User user) {
		Integer result = userDao.update(user);
		if(result>0){
			jedisCacheTool.putIntoCacheWithDefaultExpire(user_prefix, user.getId(), user);
		}
		return result;
	}

	@Override
	public void delete(User user) {
		userDao.delete(user);
		jedisCacheTool.del(user_prefix + user.getId());
	}

	@Override
	public void deleteById(Integer id) {
		userDao.deleteById(id);
		jedisCacheTool.del(user_prefix + id);
	}

	@Override
	public User selectById(Integer id) {
		User user = (User) jedisCacheTool.get(user_prefix + id); 
		if(user==null){
			user = userDao.selectById(id);
			if(user!=null){
				jedisCacheTool.putIntoCache(user_prefix, id, user);
			}
			System.out.println("select user info from db(cache dosen't exist uid = "+id);
		}else{
			System.out.println("select user info from cache uid = "+id);
		}
		return user;
	}
	
	////////////////////////////////////////////////
	//下面的方法不包含缓存

	
	@Override
	public User selectByEntity(Object query) {
		return userDao.selectByEntity(query);
	}

	@Override
	public List<User> selectEntityList(Object query) {
		return userDao.selectEntityList(query);
	}

	@Override
	public Integer selectEntityCount(Object query) {
		return userDao.selectEntityCount(query);
	}

	@Override
	public Integer getGeneralId() {
		return userDao.getGeneralId();
	}

	@Override
	public List<User> selectEntityByIds(Collection<Integer> ids) {
		return userDao.selectEntityByIds(ids);
	}

}
