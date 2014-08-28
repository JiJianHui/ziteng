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
 * 
 * <b>Summary: </b>
 *      TODO 请在此处简要描述此类所实现的功能。因为这项注释主要是为了在IDE环境中生成tip帮助，务必简明扼要
 * <b>Remarks: </b>
 *        TODO 请在此处详细描述类的功能、调用方法、注意事项、以及与其它类的关系
 */
public class HotelAdmFilter implements Filter {
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
			if(user.getType()!=null && user.getType()==User.T_h_adm){
				chain.doFilter(request, response);
			}else{
				Result result = new Result();
				result.setErrorMsg("你不是酒店管理员，不能进行该操作!");
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
