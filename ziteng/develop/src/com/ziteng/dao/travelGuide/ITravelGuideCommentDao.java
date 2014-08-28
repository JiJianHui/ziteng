package com.ziteng.dao.travelGuide;

import java.util.List;

import com.ziteng.dao.base.IBaseDao;
import com.ziteng.entity.travelGuide.TravelGuideComment;

/**
 * 攻略评论dao层
 * @author gyb
 * @date 2014-04-15
 *
 */
public interface ITravelGuideCommentDao extends IBaseDao<TravelGuideComment> {
	public Integer getCommentsCountByTravelGuideId(Integer travelGuideId);
	public TravelGuideComment getLatestCommentByTravelGuideId(Integer travelGuideId);
	public List<TravelGuideComment> getCommentsByTravelGuideId(Integer id);
	
	/**
	 * delete by guideId.
	 * @param id
	 */
	public void deleteByGuideId(Integer id);
}
