package com.ziteng.spring.expand;

import java.util.Map;

import org.springframework.web.servlet.view.json.MappingJacksonJsonView;

/** 
 * <b>类描述：处理当只有一个值的时候去除根节点</b><br/>  
 * <b>@author </b>shixiangjian<br/>  
 * <b>修改时间：</b>2013-1-18 上午09:52:06<br/> 
 * <b>修改备注：</b><br/> 
 *
 */
public class MyMappingJacksonJsonView extends MappingJacksonJsonView{

	@Override
	protected Object filterModel(Map<String, Object> model) {
		Map<?, ?> result = (Map<?, ?>) super.filterModel(model);  
        if (result.size() == 1) {  
            return result.values().iterator().next();  
        } else {  
            return result;  
        }  
//		return super.filterModel(model);
	}
}
