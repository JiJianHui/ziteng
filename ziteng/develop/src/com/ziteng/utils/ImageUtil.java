package com.ziteng.utils;

import java.awt.Dimension;
import org.apache.log4j.Logger;
import magick.ImageInfo;
import magick.MagickImage;

public class ImageUtil {
	private static Logger logger = Logger.getLogger(ImageUtil.class);
	/**
	 * 缩放图片
	 * @param srcPath 图片源路径   windows下路径等转义不能 D:\temp\53\201303\2\1362565577996.jpg形式，
	 * 应为D:\\temp\\53\\201303\\2\\1362565577996.jpg 或D:\\temp/53/201303/2/1362565577996.jpg
	 * 否则会报错
	 * @param tagPath 图片缩放后的目标路径
	 * @param width 缩放的目标宽度
	 * @param height 缩放的目标高度
	 */
	public static void scaleImg(String srcPath,String tagPath,int width,int height){
		try{
			  System.setProperty("jmagick.systemclassloader","no");   
			  ImageInfo info = new ImageInfo(srcPath);
			  MagickImage image = new MagickImage(info);
			  Dimension dim = image.getDimension();
			  double src_w = dim.getWidth();
			  double src_h = dim.getHeight();
			  if(src_w<width){
				  width = (int)src_w;
			  }
			  if(src_h<height){
				  height = (int)src_h;
			  }
			  //resize image   
			  MagickImage scaleImg = image.scaleImage(width, height);   
			  //write image to file   
			  scaleImg.setFileName(tagPath);   
			  scaleImg.writeImage(info);   
			  scaleImg.destroyImages();
			  image.destroyImages();
		}catch(Exception e){
			e.printStackTrace();
			logger.error("缩放图片err:"+e.getMessage());
		}
	}
	
	/**
	 *Description : 按照某一边进行缩放
	 *@param srcPath
	 *@param tagPath
	 *@param size 某边缩放大小
	 *@param position  1：小的一边   2:大的一边
	 *Datetime    : Mar 17, 2013 2:32:00 PM
	 *@author     : shixiangjian 
	 */
	public static void scaleImgByPosition(String srcPath,String tagPath,int size,int position){
		if(size<1){size=20;}
		try{
			  ImageInfo info = new ImageInfo(srcPath);
			  MagickImage image = new MagickImage(info);
			  Dimension dim = image.getDimension();
			  double src_w = dim.getWidth();
			  double src_h = dim.getHeight();
			  int width = (int)src_w;
			  int height = (int)src_h;
			  if(position==1){
				  if(src_w<=src_h&&src_w>size){
					  width = size;
					  height= (int)(src_h*size/src_w);
				  }else if(src_h<src_w&&src_h>size){
					  height = size;
					  width = (int)(src_w*size/src_h);
				  }
			  }else if(position==2){
				  if(src_w>=src_h&&src_w>size){
					  width = size;
					  height = (int)(size/src_w*src_h);
				  }else if(src_h>src_w&&src_h>size){
					  height = size;
					  width = (int)(size/src_h*src_w);
				  }
			  }
			  //resize image   
			  MagickImage scaleImg = image.scaleImage(width, height);   
			  //write image to file   
			  scaleImg.setFileName(tagPath);   
			  scaleImg.writeImage(info);   
			  scaleImg.destroyImages();
			  image.destroyImages();
		}catch(Exception e){
			e.printStackTrace();
			logger.error("缩放图片err:"+e.getMessage());
		}
	}
	
}
