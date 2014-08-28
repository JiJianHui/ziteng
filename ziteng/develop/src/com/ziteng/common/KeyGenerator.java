package com.ziteng.common;

import java.util.Date;
import java.util.Random;

import com.ziteng.utils.DateUtils;

/**
 * 流水编号生成器
 * @author lusar
 *
 */
public class KeyGenerator {
	private static Random random = new Random();
	
	/**
	 * get car order seq.
	 * @param uid
	 * @return
	 */
	public static String getNextCarOrderId(Integer uid){
		Date dt=new Date();
		String dateString = DateUtils.Date2yyyyMMddHHmm(dt);
		Integer rand = random.nextInt(500);
		return String.format("CR_%d_%s_%d", uid, dateString, rand);
	}

}
