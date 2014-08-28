package com.ziteng.dto.query.user;

import com.ziteng.dto.query.base.Query;

public class ManagerQuery extends Query{
    
    private String name;
    private String password;
    
    
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
