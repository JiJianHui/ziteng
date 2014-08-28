package com.ziteng.web.controller.tools;

import java.io.File;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.ziteng.dto.biz.Result;
import com.ziteng.utils.SystemProperties;
import com.ziteng.utils.ValidateUtil;

/**
 * 上传文件控制器
 * @author lusar
 *
 */
@Controller
public class UploadFileController {
	
	
	/**
	 * 异步上传图片
	 * @param type			activity | guide | hotel | user | car
	 * @param file
	 * @return				上传成功，返回json的success=true和datas.filePath=图片相对路径。
	 */
    @RequestMapping("/v/tools/uploadImage.do")
    @ResponseBody
    public String uploadImageFile(HttpServletRequest  		 request,
                                                    String   type, 
                                             MultipartFile   file){
    	return uploadFile(request,type,file).toJsonString();
    }
    
    
    /**
     * upload file.
     * @param request
     * @param type
     * @param file
     * @return
     */
    public static Result uploadFile(HttpServletRequest  		 request,
    								String type, 
    								MultipartFile file){
    	Result result = new Result();
    	if(StringUtils.isBlank(type) ||
    			( !"activity".equals(type) && !"guide".equals(type) 
    					&& !"car".equals(type) 
    					&& !"hotel".equals(type) && !"user".equals(type))){
    		return result.setErrorMsg("请输入上传图片的所属类型");
    	}
        
        if(file==null || file.isEmpty()){
            return result.setErrorMsg("请选择上传图片");
        }
        
        String fileName = 	file.getOriginalFilename();
        String fileType =   fileName.substring(fileName.lastIndexOf(".")+1).toLowerCase();//检查文件格式
        if(!ValidateUtil.checkPicType(fileType)){ //---判断是否存在不支持的后缀名称
        	return result.setErrorMsg("上传的文件格式不正确"+fileType);
        }
        
        String fileStoreDir     =   SystemProperties.getInstance().getProperties(type+"_img") ;
        String filePath         =   request.getSession().getServletContext().getRealPath(fileStoreDir);
        String newName          =   System.currentTimeMillis() + "." + fileType;    //文件重命名
        File targetFile         = new File(filePath, newName); 
        if(!targetFile.exists()){
            targetFile.mkdirs();//保存
        }
        try {
            file.transferTo(targetFile);
			String fileRelatePath = fileStoreDir + "/" + newName;
            result.setSuccess(true);
            result.setMsg("上传成功");
            result.putObject("filePath", fileRelatePath);
            
            System.out.println("fileRelatePath:" + fileRelatePath);
        }catch (Exception e) {
            result.setErrorMsg("上传文件失败,服务器端出现错误");
            e.printStackTrace();
        }
        return result;
    }

}
