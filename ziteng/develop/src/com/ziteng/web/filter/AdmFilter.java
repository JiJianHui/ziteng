package com.ziteng.web.filter;

import java.io.IOException;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;

import com.ziteng.common.Constants;
import com.ziteng.dto.biz.Result;
import com.ziteng.entity.user.User;

/**
 * 网站管理员登陆过滤器，拦截/v/w.. 之类的请求
 * @author lusar
 *
 */
public class AdmFilter implements Filter {
	private Logger logger = Logger.getLogger(this.getClass());

	@Override
	public void destroy() {
		logger.info("---login filter destory---");
	}
	
	/**
	 * 
	 * <b>Summary: </b>
	 *     stet(请用一句话描述这个方法的作用)
	 */
	public void stet(){
	    
	}

	/**
	 * 
	 * <b>Summary: </b>
	 *     复写方法 doFilter
	 * @param req
	 * @param res
	 * @param chain
	 * @throws IOException
	 * @throws ServletException 
	 * @see javax.servlet.Filter#doFilter(javax.servlet.ServletRequest, javax.servlet.ServletResponse, javax.servlet.FilterChain)
	 */
	@Override
	public void doFilter(ServletRequest req, ServletResponse res,
			FilterChain chain) throws IOException, ServletException {
		HttpServletRequest request = (HttpServletRequest) req;
		HttpServletResponse response = (HttpServletResponse) res;
		HttpSession session = request.getSession();
		if(session!=null && session.getAttribute(Constants.USER_INFO)!=null){
			User user = (User) session.getAttribute(Constants.USER_INFO);
			if(user.getType()!=null && user.getType()==User.T_adm){
				chain.doFilter(request, response);
			}else{
				Result result = new Result();
				result.setErrorMsg("你不是管理员，不能进行该操作!");
				ServletOutputStream out = response.getOutputStream();
				out.print(result.toJsonString());
			}
		} else {
			Result result = new Result();
			result.setErrorMsg("please login!");
			ServletOutputStream out = response.getOutputStream();
			out.print(result.toJsonString());
		}
	}
	

	/**
	 * 
	 * <b>Summary: </b>
	 *     复写方法 init
	 * @param arg0
	 * @throws ServletException 
	 * @see javax.servlet.Filter#init(javax.servlet.FilterConfig)
	 */
	@Override
	public void init(FilterConfig arg0) throws ServletException {
		
	}

}
