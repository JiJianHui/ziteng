package com.ziteng.service.travelGuide.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ziteng.dao.travelGuide.ITravelGuideCommentDao;
import com.ziteng.dto.query.travelGuide.TravelGuideCommentQuery;
import com.ziteng.entity.travelGuide.TravelGuideComment;
import com.ziteng.service.travelGuide.ITravelGuideCommentService;

@Service
@Transactional
public class TravelGuideCommentServiceImpl implements ITravelGuideCommentService {

	@Autowired
	private ITravelGuideCommentDao travelGuideCommentDao;

	@Override
	public boolean addTravelGuideComment(TravelGuideComment travelGuideComment) {
		int code = travelGuideCommentDao.insert(travelGuideComment);
		return code > 0;
	}

	@Override
	public boolean updateTravelGuideComment(TravelGuideComment travelGuideComment) {
		// TODO Auto-generated method stub
		int code = travelGuideCommentDao.update(travelGuideComment);
		return code > 0;
	}

	@Override
	public boolean deleteTravelGuideComment(TravelGuideComment travelGuideComment) {
		// TODO Auto-generated method stub
		travelGuideCommentDao.delete(travelGuideComment);
		return true;
	}

	@Override
	public boolean deleteTravelGuideComments(List<TravelGuideComment> travelGuideComments) {
		// TODO Auto-generated method stub
		for(TravelGuideComment p : travelGuideComments)
			travelGuideCommentDao.delete(p);
		return true;
	}

	@Override
	public List<TravelGuideComment> queryTravelGuideComment(TravelGuideCommentQuery query) {
		// TODO Auto-generated method stub
		List<TravelGuideComment> travelGuideComments = travelGuideCommentDao.selectEntityList(query);
		return travelGuideComments;
	}

}
