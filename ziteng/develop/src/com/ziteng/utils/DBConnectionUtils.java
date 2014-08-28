package com.ziteng.utils;

import java.sql.Connection;
import java.sql.DriverManager;

/** 数据库连接类 */
public class DBConnectionUtils {
	
 
	private static final String DBUrl       =   "jdbc:oracle:thin:@222.79.222.136:13802:sjzcadp";
	private static final String DBDriver    =   "oracle.jdbc.OracleDriver";
	private static final String DBUser       =  "mkk";
	private static final String DBPassword  =   "mkk#3123";


 

    /**取得数据库连接*/
	public  static Connection getConnection(){
        Connection conn = null;
        try{
            Class.forName(DBDriver);
            conn = DriverManager.getConnection(DBUrl, DBUser, DBPassword);
          
        }catch(Exception e){
            System.err.println(e.getMessage());
        }

		return conn;
	}
	/**关闭数据库连接*/
	public static void close(Connection conn){
		try{
			if(conn!=null)
			conn.close();
 
		}catch(Exception e){
		}
	}
	
	/**
	 * 获取数据库连接,Oracle 链接方式.
	 * @param ip
	 * @param port
	 * @param sid
	 * @param user
	 * @param pwd
	 * @return
	 */
	public static Connection getConnectionFrom(String ip, String port, String sid, String user, String pwd){
		Connection conn = null;
        try{
            Class.forName(DBDriver);
            String dburl = "jdbc:oracle:thin:@" + ip +":"+port+":"+sid;
            conn = DriverManager.getConnection(dburl, user, pwd);
          
        }catch(Exception e){
         
        }
		return conn;
	}


	
}
