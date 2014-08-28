package com.ziteng.service.car.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ziteng.dao.car.ICarImageDao;
import com.ziteng.dto.query.car.CarImageQuery;
import com.ziteng.entity.car.CarImage;
import com.ziteng.service.car.ICarImageService;

@Service
@Transactional
public class CarImageServiceImpl implements ICarImageService {

	@Autowired
	private ICarImageDao carImageDao;

	@Override
	public boolean addCarImage(CarImage carImage) {
		carImage.setCreateTime(new Date());
		carImage.setEditTime(new Date());
		int code = carImageDao.insert(carImage);
		return code > 0;
	}

	@Override
	public boolean updateCarImage(CarImage carImage) {
		// TODO Auto-generated method stub
		int code = carImageDao.update(carImage);
		return code > 0;
	}

	@Override
	public boolean deleteCarImage(CarImage carImage) {
		// TODO Auto-generated method stub
		carImageDao.delete(carImage);
		return true;
	}

	@Override
	public boolean deleteCarImages(List<CarImage> carImages) {
		// TODO Auto-generated method stub
		for(CarImage c : carImages)
			carImageDao.delete(c);
		return true;
	}

	@Override
	public List<CarImage> queryCarImage(CarImageQuery query) {
		// TODO Auto-generated method stub
		List<CarImage> carImages = carImageDao.selectEntityList(query);
		return carImages == null ? new ArrayList<CarImage>(0) : carImages;
	}

	@Override
	public List<CarImage> getAllCarImages() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean deleteCarImageById(Integer id) {
		// TODO Auto-generated method stub
		CarImage carImage = new CarImage();
		carImage.setId(id);
		return deleteCarImage(carImage);
	}
	
	@Override
	public List<CarImage> getCarImages(int carId){
		List<CarImage> carImages = carImageDao.getCarImagesByCarId(carId);
		return  carImages == null ? new ArrayList<CarImage>(0) : carImages;
	}
}
