package com.ziteng.dto.query.base;

import org.apache.commons.lang.StringEscapeUtils;
import org.apache.commons.lang.StringUtils;

/**
 * 基本查询条件
 */
public abstract class Query {
	public static final String SORT_ORDER_DEFAULT="desc";	//默认排序,降序
	public static final String SORT_ORDER_DESC="desc";		//降序
	public static final String SORT_ORDER_ASC="asc";		//升序
	
	private Integer pageSize=15;							// 每页显示条数
	private Integer rows=15;  								//作用同pageSize，兼容jquery easyui时候分页用					
	private Integer pageNo=1;								// 页码 ，从1开始
	private Integer page=1;									//作用同pageNo，兼容jquery easyui时候分页用	
	private String sortname;								//排序字段
	private String sortorder=SORT_ORDER_DEFAULT;			//升序，降序
	@SuppressWarnings("unused")
	private Integer offset;									//mysql分页偏移数
	@SuppressWarnings("unused")
	private Integer startRow;								//作用同offset,开始行，兼容oracle分页
	@SuppressWarnings("unused")
	private Integer endRow;									//oracle分页，结束行
	private boolean usePagination=true;						//是否使用分页效果,默认使用分页
	
	public Integer getPageSize() {
		return getUsePagination()?pageSize:null;
	}
	
	public void setPageSize(Integer pageSize) {
		this.pageSize = pageSize;
		this.rows = pageSize;
	}

	public Integer getPageNo() {
		return pageNo;
	}

	public void setPageNo(Integer pageNo) {
		this.pageNo = pageNo!=null&&pageNo>0?pageNo:1;
		this.page = pageNo!=null&&pageNo>0?pageNo:1;
	}

	public Integer getOffset() {
		if(getUsePagination()){
			return (getPageNo()-1) * (getPageSize()!=null?getPageSize():0);
		}else {
			return null;
		}
	}
	/**
     * Orcale 分页的起始行
     * @author luchuan
     * @return Integer
     * @date   2013/7/30 14:44
     */
	public Integer getStartRow(){
		if(getUsePagination()){
			return (getPageNo()-1) * (getPageSize()!=null?getPageSize():0);
		}else {
			return null;
		}
	}
	/**
     * Orcale 分页的结束行
     * @author luchuan
     * @return Integer
     * @date   2013/7/30 14:44
     */
	public Integer getEndRow(){
		if(getStartRow()!=null){
			return getStartRow()+(getPageSize()!=null?getPageSize():0);
		}else {
			return null;
		}
	}
	public String getSortname() {
		return sortname;
	}

	public void setSortname(String sortname) {
		this.sortname = StringEscapeUtils.escapeSql(sortname);
	}

	public String getSortorder() {
		return sortorder;
	}

	public void setSortorder(String sortorder) {
		if(StringUtils.isNotBlank(sortorder)){
			if(!sortorder.toLowerCase().equals("asc")&&!sortorder.toLowerCase().equals("desc")){
				sortorder = "desc";
			}
		}
		this.sortorder = sortorder;
	}

	public void setRows(Integer rows) {
		this.rows = rows;
		this.pageSize=rows;
	}

	public void setPage(Integer page) {
		this.page = page!=null&&page>0?page:1;
		this.pageNo=this.page;
	}
	
	
	public Integer getRows() {
        return rows;
    }

    public Integer getPage() {
        return page;
    }

    public void setOffset(Integer offset) {
        this.offset = offset;
    }

    public void setStartRow(Integer startRow) {
        this.startRow = startRow;
    }

    public void setEndRow(Integer endRow) {
        this.endRow = endRow;
    }

    public void setUsePagination(boolean usePagination) {
        this.usePagination = usePagination;
    }

    /**
	 * 功能描述: 是否使用分页效果<br/> 
	 * @param isUse 
	 * @author lusar
	 * 日期:2013-5-9 下午01:20:08
	 */
	public void isUsePagination(boolean isUse){
		this.usePagination = isUse;
	}
	
	private boolean getUsePagination(){
		return this.usePagination;
	}
}
