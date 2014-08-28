package com.ziteng.service.travelGuide;

import java.util.List;

import com.ziteng.dto.query.travelGuide.TravelGuideCommentQuery;
import com.ziteng.entity.travelGuide.TravelGuideComment;

public interface ITravelGuideCommentService {
    public boolean addTravelGuideComment(TravelGuideComment travelGuideComment);
    public boolean updateTravelGuideComment(TravelGuideComment travelGuideComment);
    public boolean deleteTravelGuideComment(TravelGuideComment travelGuideComment);
    public boolean deleteTravelGuideComments(List<TravelGuideComment> travelGuideComments);
    public List<TravelGuideComment> queryTravelGuideComment(TravelGuideCommentQuery query);
}
