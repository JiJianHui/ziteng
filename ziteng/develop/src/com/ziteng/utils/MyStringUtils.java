/**
 * <b>项目名：</b>kk<br/>  
 * <b>包名：</b>com.kk.utils<br/>  
 * <b>文件名：</b>StringUtils.java<br/> 
 * <b>日期：</b>2013-8-2 下午05:04:47<br/>  
 * <b>Copyright (c)</b> 2013<br/>    
 */
package com.ziteng.utils;

import java.util.Arrays;

/** 
 * <b>类描述：</b><br/>  
 * <b>@author </b>shixiangjian<br/>  
 * <b>修改时间：</b>2013-8-2 下午05:04:47<br/> 
 * <b>修改备注：</b><br/> 
 *
 */
public class MyStringUtils {
	public static String toString(Object o) {
        if (o == null)
            return null;
        if (o.getClass().isArray()) {
            String className = o.getClass().getName();
            if ("[I".equals(className)) {
                int[] a = (int[]) o;
                return Arrays.toString(a);
            } else if ("[J".equals(className)) {
                long[] a = (long[]) o;
                return Arrays.toString(a);
            } else if ("[S".equals(className)) {
                short[] a = (short[]) o;
                return Arrays.toString(a);
            } else if ("[C".equals(className)) {
                char[] a = (char[]) o;
                return Arrays.toString(a);
            } else if ("[B".equals(className)) {
                byte[] a = (byte[]) o;
                return Arrays.toString(a);
            } else if ("[F".equals(className)) {
                float[] a = (float[]) o;
                return Arrays.toString(a);
            } else if ("[D".equals(className)) {
                double[] a = (double[]) o;
                return Arrays.toString(a);
            } else if ("[Z".equals(className)) {
                boolean[] a = (boolean[]) o;
                return Arrays.toString(a);
            } else {
                Object[] a = (Object[]) o;
                return Arrays.toString(a);
            }
        } else {
            return o.toString();
        }
    }


}
