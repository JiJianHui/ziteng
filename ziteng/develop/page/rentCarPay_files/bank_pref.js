var sset=new Array("305","301","0800","313","0700","0701","0702","104","zx1","1100","081");

function displaysub(subid,defaultarg){   
   document.getElementById("SUB_"+subid).style.display="block"; 
   for(i=0;i<sset.length;i++){
   	 if(subid!=sset[i]){
   	    var obj= document.getElementById("SUB_"+sset[i]);
   	    if(obj!=null&&typeof(obj)!='undefined') obj.style.display="none";
   	 }
   }   
   if(defaultarg!='0'){
     setPayment(defaultarg);
   }
}
function setPaygate(arg,key){
   setPayment(arg);
   for(i=0;i<sset.length;i++){       
   	   var obj= document.getElementById("SUB_"+sset[i]);
   	  if(obj!=null&&typeof(obj)!='undefined')obj.style.display="none";
   } 
}
function setPayment(arg){
   document.forms["bankform"].pmode_id.value=arg;
   document.forms["bankform"].action.value="";
   if("0801"==arg||"0802"==arg||"0803"==arg||"081"==arg){
   	document.forms["bankform"].action.value="input";
   }
   if("1100"==arg){
   	document.forms["bankform"].action.value="callerinput";
   }
   if("046"==arg){
   	document.forms["bankform"].action.value="input";
   }
}
function tips(subid){
   alert(subid);  
}
function MM_openBrWindow(theURL,winName,features) { //v2.0
  window.open(theURL,winName,features);
}