function opens(ids){  
  window.scrollTo(0,0);
  var divs="";
  divs+="<body>";
  divs+="<form id=\"options\" name=\"options\">";
  divs+="<table width=\"230\" height=\"140\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" style=\"text-align:left\" background=\"images/info_bg.gif\">";
  divs+="<tr><td>&nbsp;</td></tr>";
  divs+="<tr><td><table width=\"206\" border=\"0\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\">";
  divs+="<tr><td width=\"20\"><input type=\"radio\" name=\"steps\" value=\"1\" /></td>";
  divs+="<td width=\"180\"><span class=\"black\">ѡ����������֧��</span></td></tr>"; 
  divs+="<tr><td><input type=\"radio\" name=\"steps\" value=\"2\" checked/></td>";
  divs+="<td><span class=\"black\">���֧��,�رմ���</span></td></tr>";  
  divs+="<tr><td><input type=\"radio\" name=\"steps\" value=\"4\" /></td>";
  divs+="<td><span class=\"black\">�鿴����֧�����,�̳�ȡ��</span></td></tr>"; 
  //divs+="<tr><td><input type=\"radio\" name=\"steps\" value=\"5\" /></td>";
  //divs+="<td><span class=\"black\">���������<span></td></tr>";
  divs+="<tr><td><input type=\"radio\" name=\"steps\" value=\"6\" /></td>";
  divs+="<td><span class=\"black\">��ϵ�ͷ�<span></td></tr>";
  divs+="<tr><td>&nbsp;</td><td>";
  divs+="<input type=\"button\" name=\"button\" value=\"ȷ ��\" onclick=\"next('"+ids+"')\"/></table></td></tr>"; 
  divs+="  </table>";              
  divs+="  </form>"; 
  divs+="<p>&nbsp;</p>"; 
  divs+="</body>"; 
    
  window.status="�������߰�ȫ֧��,֧��������....";
  document.getElementById("payBottom").style.visibility = "visible"; 
  document.getElementById("payTop").innerHTML=divs;
  document.getElementById("payTop").style.visibility = "visible";  
  document.getElementById("payBottom").style.width = document.body.clientWidth;
  document.getElementById("payBottom").style.height = document.body.clientHeight;    
  document.getElementById("bankform").submit();  
  return false;
}
function next(ids){          
	      for(var i=0;i<document.getElementById("options").steps.length;i++){
	        if(document.getElementById("options").steps[i].checked==true){	
	          var result=document.getElementById("options").steps[i].value; 
	          if("1"==result){	          	          	
	          	document.getElementById("payTop").style.visibility="hidden";
	          	document.getElementById("payBottom").style.visibility ="hidden";	          	
	          	window.status="����֧��";
	          }
	          if("2"==result||"3"==result){
			     window.opener=null;
			     window.close();    //�ر�֧������
			  }
			  if("4"==result){			    
			     document.getElementById("payTop").style.visibility="hidden";
			     document.location.href="/PayResult.do?xids="+ids;			     	    
			  }
			  if("5"==result){
			     window.status="��л���ı������";
			  	 advice(ids);
			  }
			  if("6"==result){
			     window.status="���߿ͷ�����Ӧ��������..";
			  	 advice_online(ids);
			  }
	        }     
          }         
       
}
function advice(ids){
    try{
      var d = new Date();
      var wName = "PAY_" + d.getTime();    
	  var pw1 = window.open("/go?to=/ext/advice_idx&idx="+ids,wName,"width=600,height=600",true);
	  if(pw1==null){
	  	window.alert("����ʱ�ر�������������ڲ������");
	  }
	}catch(ex){
		null;     
    }
}
function advice_online(ids){
    try{
      var d = new Date();
      var wName = "PAY1_" + d.getTime();    
	  var pw1 = window.open("https://www.chat4support.com.cn:8443/main.asp?sid=4312&sTag=CBP&mid=&url=http%253A//chinabank.com.cn/&idx="+ids,wName,"width=600,height=600",true);
	  if(pw1==null){
	  	window.alert("����ʱ�ر�������������ڲ������");
	  }
	}catch(ex){
		null;     
    }
}
