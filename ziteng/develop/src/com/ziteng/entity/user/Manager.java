package com.ziteng.entity.user;

/**
 * 网站管理员
 *@author Lusar
 *@date 2014-1-13
 * 
 */
public class Manager {
    private Integer id;             //主键id
    private String  name;           //姓名
    private String  password;       //MD5后的密码
    
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
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
}
