package com.ziteng.dto.page;

import java.io.Serializable;
import java.util.List;

/**
 * 
 *<p>Title       :  </p>
 *<p>Description :  分页对象</p>
 *<p>Datetime    :  2011-8-31下午6:10:36</p>
 *<p>@author     :  shixiangjian</p>
 *
 */
public class PageData implements Serializable {
	private static final long serialVersionUID = 7117550311399670067L;
	public static final int DEFAULT_PAGE_SIZE = 10;
	public static final int DEFAULT_FIRST_RESULT = 0;
	//just only this page's data.
    private List<? extends Serializable> data;
    /** @author shixiangjian :  查询字符串拼接,分页时候自动记忆参数用*/
    private String queryString;
    private int currentPage; // 当前页
    private int firstResult=0; // 当前页的起始记录
    private int totalResults; // 总共记录数
    private int pageSize=10; // 每页的数量
    private int totalPage; // 总共多少页
    private int nextPage; // 下一页
    private int prevPage; // 上一页
	private boolean hasPrev = false;//是否有上页
	private boolean hasNext = false;//是否有下页
/**
 * 
 * @param currentPage 当前页
 * @param pageSize 每页的数量
 * @param totalResults 总共记录数
 */
    public PageData(int currentPage, int pageSize,int totalResults) {
        this.pageSize = pageSize <= 0 ? DEFAULT_PAGE_SIZE : pageSize;
        this.totalResults = totalResults;
        this.resetTotalPage();//重置下总页数
        if(currentPage<1){
        	this.currentPage = 1;
        }else if(currentPage>this.totalPage){
        	this.currentPage = this.totalPage;
        }else {
        	this.currentPage = currentPage;
        }
        hasPrev = currentPage!=1;
        hasNext = currentPage!=totalPage;
        this.firstResult = (this.currentPage - 1) * this.pageSize;
    }
/**
 * 
*Description : 当前页
*@return
*Datetime    : 2011-9-1上午10:30:49
*@author     : shixiangjian
 */
    public int getCurrentPage() {
        return currentPage;
    }
/**
 * 
*Description : 设置当前页
*@param currentPage
*Datetime    : 2011-9-1上午10:31:13
*@author     : shixiangjian
 */
    public void setCurrentPage(int currentPage) {
        this.currentPage = currentPage;
        if (currentPage <= 0)
            this.currentPage = 1;
        if (currentPage > this.totalPage)
            this.currentPage = totalPage;
        hasPrev = currentPage!=1;
        hasNext = currentPage!=totalPage;
        this.firstResult = (this.currentPage - 1) * this.pageSize;
    }

    public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		if(pageSize<=0){
			this.pageSize = DEFAULT_PAGE_SIZE;
		}else {
			this.pageSize = pageSize;
		}
		this.resetTotalPage();
		hasPrev = currentPage!=1;
        hasNext = currentPage!=totalPage;
		this.firstResult = (this.currentPage - 1) * this.pageSize;
	}

	public int getTotalResults() {
        return totalResults;
    }

    public void setTotalResults(int totalResults) {
        this.totalResults = totalResults;
        if(totalResults<1){
        	this.totalPage = 1;
        }else {
        	this.totalPage = (totalResults-1)/this.pageSize+1;
        }
        if (this.currentPage > totalPage) {
            this.currentPage = totalPage;
            this.firstResult = (this.currentPage - 1) * this.pageSize;
        }
        hasPrev = currentPage!=1;
        hasNext = currentPage!=totalPage;
    }

    public int getFirstResult() {
        return firstResult;
    }

    public int getNextPage() {
        if (this.currentPage < this.totalPage) {
            this.nextPage = this.currentPage + 1;
        } else {
            this.nextPage = this.totalPage;
        }
        return nextPage;
    }

    public int getPrevPage() {
    	 if (this.currentPage > 1) {
             this.prevPage = this.currentPage - 1;
         } else {
             this.prevPage = 1;
         }
        return prevPage;
    }

    public int getTotalPage() {
        return totalPage;
    }

    public List<? extends Serializable> getData() {
        return data;
    }

    public void setData(List<? extends Serializable> data) {
        this.data = data;
    }
    
    public boolean isHasPrev() {
		return hasPrev;
	}
	public boolean isHasNext() {
		return hasNext;
	}
	/**
     * 
    *Description : 重新计算总页数
    *Datetime    : 2011-9-1上午10:57:40
    *@author     : shixiangjian
     */
    public void resetTotalPage() {
		if (totalResults == 0)
			totalPage = 1;
		else {
			totalPage = (totalResults + pageSize - 1) / pageSize;
		}
	}
	public String getQueryString() {
		return queryString;
	}
	public void setQueryString(String queryString) {
		this.queryString = queryString;
	}
    
}
