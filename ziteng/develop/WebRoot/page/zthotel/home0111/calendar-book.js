function showCalendar(e,t,n,r,i,s,o,u,a,f,l,c,h,p,d){var v,m,g=document.getElementById("CalFrame"),y=window.frames.CalFrame,b=document.getElementById(e);if(!b){alert("\u63a7\u5236\u5bf9\u8c61\u4e0d\u5b58\u5728\uff01");return}if(!n){alert("\u8f93\u5165\u63a7\u4ef6\u672a\u6307\u5b9a\uff01");return}v=document.getElementById(n);if(!v){alert("\u8f93\u5165\u63a7\u4ef6\u4e0d\u5b58\u5728\uff01");return}if(v.tagName!="INPUT"||v.type!="text"){alert("\u8f93\u5165\u63a7\u4ef6\u7c7b\u578b\u9519\u8bef\uff01");return}if(h){m=document.getElementById(h);if(!m){alert("\u53c2\u8003\u63a7\u4ef6\u4e0d\u5b58\u5728\uff01");return}if(m.tagName!="INPUT"||m.type!="text"&&m.type!="hidden"){alert("\u53c2\u8003\u63a7\u4ef6\u7c7b\u578b\u9519\u8bef\uff01");return}}if(!y.bCalLoaded){alert("\u65e5\u5386\u672a\u6210\u529f\u88c5\u8f7d\uff01\u8bf7\u5237\u65b0\u9875\u9762\uff01");return}y.n_position=r,y.n_textdate=i,y.startdate=s,y.enddate=o,y.vailidday=u,y.oddeven=a,y.vailiddate=f,y.nextvailiddate=d,y.objecttype=l,y.thirdfocus=c;if(g.style.display=="block"){g.style.display="none";return}var w=0,E=0,S=b;if(document.body.scrollTop!=0||document.documentElement.scrollTop==0&&document.documentElement.clientHeight==0){var x=document.body.scrollTop,T=document.body.scrollLeft,N=b.height,C=b.width;while(S&&S.tagName!="BODY")w+=S.offsetTop,E+=S.offsetLeft,S=S.offsetParent;g.style.top=(document.body.clientHeight-(w-x)-N>=g.height?w+N:w-g.height)+"px",g.style.left=(document.body.clientWidth-(E-T)>=g.width?E:E+C-g.width)+"px"}else{var x=document.documentElement.scrollTop,T=document.documentElement.scrollLeft,N=b.height,C=b.width;while(S&&S.tagName!="BODY")w+=S.offsetTop,E+=S.offsetLeft,S=S.offsetParent;g.style.top=(document.documentElement.clientHeight-(w-x)-N>=g.height?w+N:w-g.height)+18+"px",g.style.left=(document.documentElement.clientWidth-(E-T)>=g.width?E:E+C-g.width)+"px"}g.style.display="block",y.openbound=t,y.fld1=v,y.fld2=m,y.callback=p,y.initCalendar()}function hideCalendar(e){var t=document.getElementById("CalFrame");t.style.display="none"}