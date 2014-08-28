package com.ziteng.entity.travelGuide;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.ziteng.entity.area.Area;
import com.ziteng.utils.DateUtils;

/**
 * 攻略
 * @author gyb
 * @date 2014-04-15
 *
 */
public class TravelGuide {
	private Integer id;
	private String name;
	private Integer priceWayId;
	private Integer departAreaId;
	private Integer arriveAreaId;
	private Float kms;
	private Float days;
	private String detail;
	private Integer countOrder;
	private String coverImage;
	private Date createTime;
	private Date editTime;
	private String taoBaoLink;			//淘宝链接.
	
	private String departAreaName;
	private List<Area> midArea;
	private String arriveAreaName;
	private Integer finalprice;
	private Integer ordersCount;
	private Integer commentsCount;
	private String latestCommentUser;
	private String latestCommentUserCover;
	private String latestComment;
	private Date latestCommentTime;
	
	
	private TravelGuide2CarDegreePrice carDegreePrice;
	
	public String getLatestCommentTimeString(){
		return DateUtils.yyyy_MM_dd_HH_mm(latestCommentTime);
	}
	public String getCreateTimeString(){
		return DateUtils.yyyy_MM_dd_HH_mm(createTime);
	}
	public String getEditTimeString(){
		return DateUtils.yyyy_MM_dd_HH_mm(editTime);
	}
	public Integer getOrdersCount() {
		return ordersCount;
	}
	public void setOrdersCount(Integer ordersCount) {
		this.ordersCount = ordersCount;
	}
	public Integer getCommentsCount() {
		return commentsCount;
	}
	public void setCommentsCount(Integer commentsCount) {
		this.commentsCount = commentsCount;
	}
	public String getLatestCommentUser() {
		return latestCommentUser;
	}
	public void setLatestCommentUser(String latestCommentUser) {
		this.latestCommentUser = latestCommentUser;
	}
	public String getLatestComment() {
		return latestComment;
	}
	public void setLatestComment(String latestComment) {
		this.latestComment = latestComment;
	}
	public Date getLatestCommentTime() {
		return latestCommentTime;
	}
	public void setLatestCommentTime(Date latestCommentTime) {
		this.latestCommentTime = latestCommentTime;
	}
	public TravelGuide() {
		super();
		midArea = new ArrayList<Area>();
	}
	public String getDepartAreaName() {
		return departAreaName;
	}
	public void setDepartAreaName(String departAreaName) {
		this.departAreaName = departAreaName;
	}
	public List getMidArea() {
		return midArea;
	}
	public void setMidArea(List midArea) {
		this.midArea = midArea;
	}
	public String getArriveAreaName() {
		return arriveAreaName;
	}
	public void setArriveAreaName(String arriveAreaName) {
		this.arriveAreaName = arriveAreaName;
	}
	public Integer getFinalprice() {
		return finalprice;
	}
	public void setFinalprice(Integer finalprice) {
		this.finalprice = finalprice;
	}

	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Integer getPriceWayId() {
		return priceWayId;
	}
	public void setPriceWayId(Integer priceWayId) {
		this.priceWayId = priceWayId;
	}
	public Integer getDepartAreaId() {
		return departAreaId;
	}
	public void setDepartAreaId(Integer departAreaId) {
		this.departAreaId = departAreaId;
	}
	public Integer getArriveAreaId() {
		return arriveAreaId;
	}
	public void setArriveAreaId(Integer arriveAreaId) {
		this.arriveAreaId = arriveAreaId;
	}
	public Float getKms() {
		return kms;
	}
	public void setKms(Float kms) {
		this.kms = kms;
	}
	public Float getDays() {
		return days;
	}
	public void setDays(Float days) {
		this.days = days;
	}
	public String getDetail() {
		return detail;
	}
	public void setDetail(String detail) {
		this.detail = detail;
	}
	public Integer getCountOrder() {
		return countOrder;
	}
	public void setCountOrder(Integer countOrder) {
		this.countOrder = countOrder;
	}
	public Date getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
	public Date getEditTime() {
		return editTime;
	}
	public void setEditTime(Date editTime) {
		this.editTime = editTime;
	}
	public String getCoverImage() {
		return coverImage;
	}
	public void setCoverImage(String coverImage) {
		this.coverImage = coverImage;
	}
	public String getLatestCommentUserCover() {
		return latestCommentUserCover;
	}
	public void setLatestCommentUserCover(String latestCommentUserCover) {
		this.latestCommentUserCover = latestCommentUserCover;
	}
	
	public TravelGuide2CarDegreePrice getCarDegreePrice() {
		return carDegreePrice;
	}
	
	public void setCarDegreePrice(TravelGuide2CarDegreePrice carDegreePrice) {
		this.carDegreePrice = carDegreePrice;
	}
	
	public String getPriceType(){
		String result = "";
		switch(priceWayId){
		case 0:
			result = "按天计价";
			break;
		case 1:
			result = "按公里计价";
			break;
		case 2:
			result = "路线价格*系数";
			break;
		case 3:
			result = "固定价格";
			break;
		default:
			break;
		}
		return result;
	}
	
	public String getTaoBaoLink() {
		return taoBaoLink;
	}
	
	public void setTaoBaoLink(String taoBaoLink) {
		this.taoBaoLink = taoBaoLink;
	}
	
	
}
