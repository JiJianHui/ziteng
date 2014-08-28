/**
 * <b>项目名：</b>mypic_front<br/>  
 * <b>包名：</b>com.mypic.test.cache<br/>  
 * <b>文件名：</b>JedisCacheTool.java<br/> 
 * <b>日期：</b>2013-1-21 下午06:16:07<br/>  
 *     
 */
package com.ziteng.utils;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.Pipeline;
import redis.clients.jedis.exceptions.JedisConnectionException;

/**
 * <b>类描述：</b><br/>
 * <b>@author </b>shixiangjian<br/>
 * <b>修改时间：</b>2013-1-21 下午06:16:07<br/>
 * <b>修改备注：</b><br/>
 * 
 */
@Component
public class JedisCacheTool {
	private static final Logger logger = Logger.getLogger(JedisCacheTool.class);
	
	@Autowired
	protected JedisPool jedisPool;

	public JedisPool getJedisPool() {
		return jedisPool;
	}

	public void setJedisPool(JedisPool jedisPool) {
		this.jedisPool = jedisPool;
	}
	
	/**
	 * 功能描述: 返回集合队列中的元素个数，没有返回0,异常返回Null<br/> 
	 * @param listKey
	 * @return 
	 * @author shixiangjian
	 * 日期:2013-8-28 上午09:23:18
	 */
	public Long llenList(String listKey){
		Jedis jedis = null;
		Long rest = null;
		try {
			jedis = jedisPool.getResource();
			rest = jedis.llen(listKey);
		}catch (JedisConnectionException e) {
			Jedis brokenJedis = jedis;
			jedis = null;
			this.jedisPool.returnBrokenResource(brokenJedis);
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e.getLocalizedMessage());
		} finally {
			if (jedis != null) {
				this.jedisPool.returnResource(jedis);
			}
		}
		return rest;
	}



	/**
	 * 功能描述: 移除并返回队列中队头元素<br/> 
	 * @param listKey
	 * @return 对头元素，没有返回NULL
	 * @author shixiangjian
	 * 日期:2013-8-28 上午09:19:25
	 */
	public String lpopFromList(String listKey){
		Jedis jedis = null;
		String rest = null;
		try {
			jedis = jedisPool.getResource();
			rest = jedis.lpop(listKey);
		}catch (JedisConnectionException e) {
			Jedis brokenJedis = jedis;
			jedis = null;
			this.jedisPool.returnBrokenResource(brokenJedis);
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e.getLocalizedMessage());
		} finally {
			if (jedis != null) {
				this.jedisPool.returnResource(jedis);
			}
		}
		return rest;
	}
	
	/**
	 * 功能描述: 用不过期右边入队方式存入缓存列表<br/> 
	 * @param listKey
	 * @param values 
	 * @author shixiangjian
	 * @return 返回插入记录数 ，返回Long.MAX_VALUE为未插入
	 * 日期:2013-8-28 上午09:12:25
	 */
	public Long rpushListNoExpire(String listKey,List<String> values){
		Jedis jedis = null;
		Long rest = Long.MAX_VALUE;
		try {
			jedis = jedisPool.getResource();
			if(values!=null&&!values.isEmpty()){
//				String[] strs = new String[values.size()];
//				for(int i =0;i<values.size();i++){
//					strs[i]=values.get(i);
//				}
//				rest = jedis.rpush(listKey, strs);
				
				for(int i =0;i<values.size();i++){
					rest = jedis.rpush(listKey, values.get(i));
				}
			}
		}catch (JedisConnectionException e) {
			Jedis brokenJedis = jedis;
			jedis = null;
			this.jedisPool.returnBrokenResource(brokenJedis);
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e.getLocalizedMessage());
		} finally {
			if (jedis != null) {
				this.jedisPool.returnResource(jedis);
			}
		}
		return rest;
	}
	
	/**
	 * 功能描述: 通过前缀和key方式存入缓存<br/> 
	 * @param prefix
	 * @param key
	 * @param obj
	 * @param outTime 
	 * @author shixiangjian
	 * 日期:2013-8-2 下午05:09:53
	 */
	public void putIntoCacheWithExpire(String prefix, Object key,Object obj,int outTime){
		this.set(this.buildCacheKey(prefix, key), obj, outTime);
	}
	
	/**
	 * 功能描述: 默认过期时间1天<br/> 
	 * @param prefix
	 * @param key
	 * @param obj 
	 * @author shixiangjian
	 * 日期:2013-8-2 下午05:12:24
	 */
	public void putIntoCacheWithDefaultExpire(String prefix, Object key,Object obj){
		this.set(this.buildCacheKey(prefix, key), obj, 60*60*24*1);
	}
	
	/**
	 * 功能描述: 无过期<br/> 
	 * @param prefix
	 * @param key
	 * @param obj 
	 * @author shixiangjian
	 * 日期:2013-8-2 下午05:13:19
	 */
	public void putIntoCache(String prefix, Object key,Object obj){
		this.set(this.buildCacheKey(prefix, key), obj, -1);
	}
	
	/**
	 * 功能描述: 从缓存获取<br/> 
	 * @param prefix
	 * @param key
	 * @return 
	 * @author shixiangjian
	 * 日期:2013-8-2 下午05:14:50
	 */
	public Object getFromCache(String prefix, Object key) {
		return this.get(this.buildCacheKey(prefix, key));
	}
	
	public String buildCacheKey(String prefix, Object key) {
		StringBuilder ret = new StringBuilder();
		ret.append(prefix);
		ret.append(key);
		logger.debug(ret.toString());
		return ret.toString();
	}
	
	public void setStr(String key, String value, int outTime) {
		Jedis jedis = null;
		try {
			jedis = jedisPool.getResource();
			jedis.set(key, value);
			if (outTime > 0) {
				jedis.expire(key, outTime); // 设置过期时间秒
			}
		}catch (JedisConnectionException e) {
			Jedis brokenJedis = jedis;
			jedis = null;
			this.jedisPool.returnBrokenResource(brokenJedis);
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e.getLocalizedMessage());
		} finally {
			if (jedis != null) {
				this.jedisPool.returnResource(jedis);
			}
		}
	}

	public String getStr(String key) {
		if(StringUtils.isBlank(key)){return null;}
		String value = "";
		Jedis jedis = null;
		try {
			jedis = jedisPool.getResource();
			value = jedis.get(key);
		} catch (JedisConnectionException e) {
			Jedis brokenJedis = jedis;
			jedis = null;
			this.jedisPool.returnBrokenResource(brokenJedis);
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e.getLocalizedMessage());
		} finally {
			if (jedis != null) {
				this.jedisPool.returnResource(jedis);
			}
		}
		return value;
	}

	/**
	 * 获得一个对象
	 */
	public Object get(String key) {
		logger.debug("---in cache get:" + key);
		if(StringUtils.isBlank(key)){return null;}
		Object obj = null;
		Jedis jedis = null;
		try {
			jedis = jedisPool.getResource();
			obj = byte2Object(jedis.get(getKey(key)));
		} catch (JedisConnectionException e) {
			Jedis brokenJedis = jedis;
			jedis = null;
			this.jedisPool.returnBrokenResource(brokenJedis);
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e.getLocalizedMessage());
		} finally {
			if (jedis != null) {
				this.jedisPool.returnResource(jedis);
			}
		}
		logger.debug("--return obj:" + obj);
		return obj;
	}

	@SuppressWarnings("unchecked")
	public Map<String, Object> getCacheMap(String key) {
		if(StringUtils.isBlank(key)){return null;}
		Object obj = this.get(key);
		if (obj != null && obj instanceof Map) {
			return (Map<String, Object>) obj;
		} else {
			return null;
		}
	}

	public void setCacheMap(String key, Map<String, Object> map, int outTime) {
		this.set(key, map, outTime);
	}





	/**
	 * Description : 获取redis Map
	 * 
	 * @param key
	 * @return Datetime : Mar 9, 2013 1:12:15 PM
	 * @author : shixiangjian
	 */
	public Map<String, String> getRedisMap(String key) {
		if(StringUtils.isBlank(key)){return null;}
		Jedis jedis = null;
		Map<String, String> map = new HashMap<String, String>();
		try {
			jedis = jedisPool.getResource();
			map = jedis.hgetAll(key);
		} catch (JedisConnectionException e) {
			Jedis brokenJedis = jedis;
			jedis = null;
			this.jedisPool.returnBrokenResource(brokenJedis);
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e.getLocalizedMessage());
		}finally {
			if (jedis != null) {
				jedisPool.returnResource(jedis);
			}
		}
		return map;
	}

	/**
	 * Description : 设置redis Map
	 * 
	 * @param key
	 * @param map
	 * @param outTime
	 *            Datetime : Mar 9, 2013 1:12:26 PM
	 * @author : shixiangjian
	 */
	public void setRedisMap(String key, Map<String, String> map, int outTime) {
		Jedis jedis = null;
		try {
			jedis = jedisPool.getResource();
			if (map != null && !map.isEmpty()) {
//				for (Map.Entry<String, String> m : map.entrySet()) {
//					jedis.hset(key, m.getKey(), m.getValue());
//				}
				jedis.hmset(key, map);
				if (outTime > 0) {
					jedis.expire(key, outTime);// 设置过期时间
				}
			}
		} catch (JedisConnectionException e) {
			Jedis brokenJedis = jedis;
			jedis = null;
			this.jedisPool.returnBrokenResource(brokenJedis);
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e.getLocalizedMessage());
		} finally {
			if (jedis != null) {
				jedisPool.returnResource(jedis);
			}
		}
	}

	/**
	 * Description : 往redis中map里设置新增或更新旧值
	 * 
	 * @param key
	 * @param mapKey
	 * @param value
	 *            Datetime : Mar 9, 2013 1:11:43 PM
	 * @author : shixiangjian
	 */
	public void putIntoRedisMap(String key, String mapKey, String value,int outTime) {
		Jedis jedis = null;
		try {
			jedis = jedisPool.getResource();
			jedis.hset(key, mapKey, value);
			if (outTime > 0) {
				jedis.expire(key, outTime);// 设置过期时间
			}
		} catch (JedisConnectionException e) {
			Jedis brokenJedis = jedis;
			jedis = null;
			this.jedisPool.returnBrokenResource(brokenJedis);
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e.getLocalizedMessage());
		} finally {
			if (jedis != null) {
				jedisPool.returnResource(jedis);
			}
		}
	}

	public void putListKeyAndValueIntoRedis(List<String> keys, List<String> values){
		Jedis jedis = null;
        try{
            jedis = jedisPool.getResource();
            Pipeline p = jedis.pipelined();
            Iterator<String> itK = keys.iterator();
            Iterator<String> itV = values.iterator();
            while(itK.hasNext() && itV.hasNext()){
            	p.set(itK.next(), itV.next());
            }
            p.sync();
        }catch (JedisConnectionException e) {
            Jedis brokenJedis = jedis;
            jedis = null;
            this.jedisPool.returnBrokenResource(brokenJedis);
        } catch (Exception e) {
            e.printStackTrace();
            logger.error(e.getLocalizedMessage());
        } finally {
            if (jedis != null) {
                this.jedisPool.returnResource(jedis);
            }
        }
	}
	
	/**
	 * 删除keys集合.
	 * @param keys
	 */
	public void delListKey(List<String> keys){
        Jedis jedis = null;
        try {
            jedis = jedisPool.getResource();
            String[] strArray = keys.toArray(new String[keys.size()]);
            jedis.del(strArray);
        } catch (JedisConnectionException e) {
            Jedis brokenJedis = jedis;
            jedis = null;
            this.jedisPool.returnBrokenResource(brokenJedis);
        } catch (Exception e) {
            e.printStackTrace();
            logger.error(e.getLocalizedMessage());
        } finally {
            if (jedis != null) {
                jedisPool.returnResource(jedis);
            }
        }
	}
	/**
	 * 删除keys集合.
	 * @param keys
	 */
	public void delKey(String key){
        Jedis jedis = null;
        try {
            jedis = jedisPool.getResource();
            jedis.del(key);
        } catch (JedisConnectionException e) {
            Jedis brokenJedis = jedis;
            jedis = null;
            this.jedisPool.returnBrokenResource(brokenJedis);
        } catch (Exception e) {
            e.printStackTrace();
            logger.error(e.getLocalizedMessage());
        } finally {
            if (jedis != null) {
                jedisPool.returnResource(jedis);
            }
        }
	}
	
	
	public List<String> getListValueFromRedis(List<String> keys){
		List<String>  result = new ArrayList<String>(0);
        Jedis jedis = null;
        try {
            jedis = jedisPool.getResource();
            String[] strArray = keys.toArray(new String[keys.size()]);
            result = jedis.mget(strArray);
        } catch (JedisConnectionException e) {
            Jedis brokenJedis = jedis;
            jedis = null;
            result = new ArrayList<String>(0);
            this.jedisPool.returnBrokenResource(brokenJedis);
        } catch (Exception e) {
            e.printStackTrace();
            result = new ArrayList<String>(0);
            logger.error(e.getLocalizedMessage());
        } finally {
            if (jedis != null) {
                jedisPool.returnResource(jedis);
            }
        }
        return result;
	}
	
	
	/**
	 * Description : 从redis map中获取
	 * 
	 * @param key
	 * @param mapKey
	 * @return Datetime : Mar 9, 2013 1:16:01 PM
	 * @author : shixiangjian
	 */
	public String getFromRedisMap(String key, String mapKey) {
		if(StringUtils.isBlank(key)||StringUtils.isBlank(mapKey)){return "";}
		Jedis jedis = null;
		String value = null;
		try {
			jedis = jedisPool.getResource();
			value = jedis.hget(key, mapKey);
		} catch (JedisConnectionException e) {
			Jedis brokenJedis = jedis;
			jedis = null;
			this.jedisPool.returnBrokenResource(brokenJedis);
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e.getLocalizedMessage());
		} finally {
			if (jedis != null) {
				jedisPool.returnResource(jedis);
			}
		}
		return value;
	}

	/**
	 * 
	 * 判断对象是否存在
	 * 
	 * @param key
	 * @return
	 */
	public boolean isExist(String key) {
		if(StringUtils.isBlank(key)){return false;}
		Jedis jedis = null;
		boolean rest = false;
		try {
			jedis = jedisPool.getResource();
			rest = jedis.exists(key);
		} catch (JedisConnectionException e) {
			Jedis brokenJedis = jedis;
			jedis = null;
			this.jedisPool.returnBrokenResource(brokenJedis);
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e.getLocalizedMessage());
		} finally {
			if (jedis != null) {
				jedisPool.returnResource(jedis);
			}
		}
		return rest;
	}

	/**
	 * 功能描述: 查看哈希表 key 中，给定域 mapKey 是否存在<br/> 
	 * @param key
	 * @param mapKey
	 * @return 
	 * @author shixiangjian
	 * 日期:2013-4-10 下午03:02:44
	 */
	public boolean isHexists(String key,String mapKey){
		if(StringUtils.isBlank(key)){return false;}
		Jedis jedis = null;
		boolean rest = false;
		try {
			jedis = jedisPool.getResource();
			rest = jedis.hexists(key, mapKey);
		} catch (JedisConnectionException e) {
			Jedis brokenJedis = jedis;
			jedis = null;
			this.jedisPool.returnBrokenResource(brokenJedis);
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e.getLocalizedMessage());
		} finally {
			if (jedis != null) {
				jedisPool.returnResource(jedis);
			}
		}
		return rest;
	}

    /**
     * 获取存在key值.
     * @param key
     * @param fields
     * @return
     */
    public List<String> getFromMapByListKey(String key, List<String> fields){
        List<String>  result = new ArrayList<String>(0);
        Jedis jedis = null;
        try {
            jedis = jedisPool.getResource();
            String[] strArray = fields.toArray(new String[fields.size()]);
            result = jedis.hmget(key,strArray);
        } catch (JedisConnectionException e) {
            Jedis brokenJedis = jedis;
            jedis = null;
            result = new ArrayList<String>(0);
            this.jedisPool.returnBrokenResource(brokenJedis);
        } catch (Exception e) {
            e.printStackTrace();
            result = new ArrayList<String>(0);
            logger.error(e.getLocalizedMessage());
        } finally {
            if (jedis != null) {
                jedisPool.returnResource(jedis);
            }
        }
        return result;
    }




    /**
     * 仅仅设置存在的标志
     * @param key
     * @param values
     */
    public void setListJustForExist(String key, List<String> values){
        Jedis jedis =  null;
        try{
            jedis = jedisPool.getResource();
            Pipeline p = jedis.pipelined();
            for(String filed :  values) {
                p.hset(key, filed,"1");
            }
            p.sync();
        }  catch (JedisConnectionException e) {
            Jedis brokenJedis = jedis;
            jedis = null;
            this.jedisPool.returnBrokenResource(brokenJedis);
        } catch (Exception e) {
            e.printStackTrace();
            logger.error(e.getLocalizedMessage());
        } finally {
            if (jedis != null) {
                this.jedisPool.returnResource(jedis);
            }
        }
    }

	/**
	 * 保存一个对象
	 * 
	 * @param key
	 * @param value
	 */
	public void set(String key, Object value, int outTime) {
		logger.debug("---in cache set--" + key);
		Jedis jedis = null;
		try {
			jedis = jedisPool.getResource();
			logger.debug("--jedis:" + jedis);
			jedis.set(getKey(key), object2Bytes(value));
			if (outTime > 0) {
				jedis.expire(getKey(key), outTime);// 设置过期时间
			}
		} catch (JedisConnectionException e) {
			Jedis brokenJedis = jedis;
			jedis = null;
			this.jedisPool.returnBrokenResource(brokenJedis);
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e.getLocalizedMessage());
		} finally {
			if (jedis != null) {
				jedisPool.returnResource(jedis);
			}
		}
	}

	/**
	 * Description : 重置过期时间
	 * 
	 * @param key
	 * @param outTime
	 *            Datetime : Mar 9, 2013 12:34:48 PM
	 * @author : shixiangjian
	 */
	public void resetExpire(String key, int outTime) {
		Jedis jedis = null;
		try {
			jedis = jedisPool.getResource();
			jedis.expire(getKey(key), outTime);// 设置过期时间
		} catch (JedisConnectionException e) {
			Jedis brokenJedis = jedis;
			jedis = null;
			this.jedisPool.returnBrokenResource(brokenJedis);
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e.getLocalizedMessage());
		} finally {
			if (jedis != null) {
				jedisPool.returnResource(jedis);
			}
		}
	}

	public Long del(String key) {
		if(StringUtils.isBlank(key)){return 0L;}
		Jedis jedis = null;
		Long rest = null;
		try {
			jedis = jedisPool.getResource();
			rest = jedis.del(key);
			// return 1L;
		} catch (JedisConnectionException e) {
			Jedis brokenJedis = jedis;
			jedis = null;
			this.jedisPool.returnBrokenResource(brokenJedis);
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e.getLocalizedMessage());
		} finally {
			if (jedis != null) {
				jedisPool.returnResource(jedis);
			}
		}
		return rest;
	}

	/**
	 * 字节转化为对象
	 * 
	 * @param bytes
	 * @return
	 */
	private Object byte2Object(byte[] bytes) {
		if (bytes == null || bytes.length == 0)
			return null;
		try {
			ObjectInputStream inputStream;
			inputStream = new ObjectInputStream(new ByteArrayInputStream(bytes));
			Object obj = inputStream.readObject();
			return obj;
		} catch (IOException e) {
			e.printStackTrace();
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		return null;
	}

	/**
	 * 对象转化为字节
	 * 
	 * @param value
	 * @return
	 */
	private byte[] object2Bytes(Object value) {
		if (value == null)
			return null;
		ByteArrayOutputStream arrayOutputStream = new ByteArrayOutputStream();
		ObjectOutputStream outputStream;
		try {
			outputStream = new ObjectOutputStream(arrayOutputStream);
			outputStream.writeObject(value);
			outputStream.flush();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			try {
				arrayOutputStream.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return arrayOutputStream.toByteArray();
	}

	private byte[] getKey(String key) {
		return key.getBytes();
	}
}
