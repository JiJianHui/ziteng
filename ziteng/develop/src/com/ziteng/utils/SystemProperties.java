package com.ziteng.utils;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

import org.apache.log4j.Logger;

public class SystemProperties {
	private static SystemProperties instance;

	private static final Logger logger = Logger.getLogger(SystemProperties.class);
	private static final String PROFILE = "/system_params.properties";
	public static SystemProperties getInstance() {
		if (instance == null) {
			instance = new SystemProperties();
		}
		return instance;
	}

	private Properties properties = null;

	private SystemProperties() {
	}

	/**
	 * 
	 * @param proName
	 * @return proVal
	 */
	public String getProperties(String proName) {
		String proVal = "";

		if (properties == null) {
			logger.debug("=====read system_properties file =====");
			InputStream in = null;
			try {
				in = SystemProperties.class.getResourceAsStream(PROFILE);
				properties = new Properties();
				properties.load(in);
			} catch (Exception ex) {
				logger.error("[ get properties ] ", ex);
				properties = null;
			} finally {
				if (in != null) {
					try {
						in.close();
					} catch (IOException e) {
						logger.error("[ get properties ] ", e);
					} finally {
						in = null;
					}
				}
			}
		}

		// 从 properties 中获取值
		if (properties != null) {
			proVal = properties.getProperty(proName);
		} else {
			logger.warn("system properties is 'null' .");
		}

		return proVal;
	}
}
