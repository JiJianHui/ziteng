var Showbo={author:'showbo',homepage:'http://www.code-design.cn'};
//�Ƿ�Ϊie�����
Showbo.IsIE=!!document.all;
//ie������汾
Showbo.IEVersion=(function(){if(!Showbo.IsIE)return -1;try{return parseFloat(/msie ([\d\.]+)/i.exec(navigator.userAgent)[1]);}catch(e){return -1;}})();
//��id��ȡ����
Showbo.$=function(Id,isFrame){var o;if("string"==typeof(Id))o= document.getElementById(Id);else if("object"==typeof(Id))o= Id;else return null;return isFrame?(Showbo.IsIE?frames[Id]:o.contentWindow):o;}
//����ǩ���ƻ�ȡ����
//ҳ��ĸߺͿ�******************************
Showbo.isStrict=document.compatMode == "CSS1Compat";
Showbo.BodyScale={x:0,y:0,tx:0,ty:0};//��x��y������ǰ�������������С  ��tx��ty�����ܵ�ҳ�������Ⱥ͸߶�
Showbo.getClientHeight=function(){/*if(Showbo.IsIE)*/return Showbo.isStrict ? document.documentElement.clientHeight :document.body.clientHeight;/*else return self.innerHeight;*/}
Showbo.getScrollHeight=function(){var h=!Showbo.isStrict?document.body.scrollHeight:document.documentElement.scrollHeight;return Math.max(h,this.getClientHeight());}
Showbo.getHeight=function(full){return full?this.getScrollHeight():this.getClientHeight();}
Showbo.getClientWidth=function(){/*if(Showbo.IsIE)*/return Showbo.isStrict?document.documentElement.clientWidth:document.body.clientWidth;/*else return self.innerWidth;*/}
Showbo.getScrollWidth=function(){var w=!Showbo.isStrict?document.body.scrollWidth:document.documentElement.scrollWidth;return Math.max(w,this.getClientWidth());}
Showbo.getWidth=function(full){return full?this.getScrollWidth():this.getClientWidth();}
Showbo.initBodyScale=function(){Showbo.BodyScale.x=Showbo.getWidth(false);Showbo.BodyScale.y=Showbo.getHeight(false);Showbo.BodyScale.tx=Showbo.getWidth(true);Showbo.BodyScale.ty=Showbo.getHeight(true);}
//ҳ��ĸߺͿ�******************************
Showbo.Msg={
    INFO:'info',
    ERROR:'error',
    WARNING:'warning',
    IsInit:false,
    timer:null,
    dvTitle:null,
    dvCT:null,
    dvBottom:null,
    dvBtns:null,
    lightBox:null,
    dvMsgBox:null,
    defaultWidth:350,
    moveProcessbar:function(){
      var o=Showbo.$('dvProcessbar'),w=o.style.width;
      if(w=='')w=20;
      else{
        w=parseInt(w)+20;
        if(w>100)w=0;
      }
      o.style.width=w+'%';
    },
    InitMsg:function(width){
      //ie�²���������¼���ѭ����ִ�У�����Ҫע���ڵ���alert�ȷ���ʱҪ����Ƿ��Ѿ���ʼ��IsInit=true     
      var ifStr='<iframe src="javascript:false" style="position:absolute; visibility:inherit; top:0px;left:0px;width:100%; height:100%; z-index:-1;'
          +'filter=\'progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)\';"></iframe>',
      html='<div class="top"><div class="right"><div class="title" id="dvMsgTitle"></div></div></div>'+
        '<div class="body"><div class="right"><div class="ct" id="dvMsgCT"></div></div></div>'+
        '<div class="bottom" id="dvMsgBottom"><div class="right"><div class="btn" id="dvMsgBtns"></div></div></div>';
      this.dvMsgBox=document.createElement("div");
      this.dvMsgBox.id="dvMsgBox";
      this.dvMsgBox.innerHTML+=html;      
      document.body.appendChild(this.dvMsgBox);
      this.lightBox=document.createElement("div");
      this.lightBox.id="ShowBolightBox";
      document.body.appendChild(this.lightBox);
      if(Showbo.IsIE&&Showbo.IEVersion<7){//��iframe������ie6���޷��ڸ�סselect������
        this.lightBox.innerHTML+=ifStr;
        this.dvMsgBox.innerHTML+=ifStr;
      }
      this.dvBottom=Showbo.$('dvMsgBottom');
      this.dvBtns=Showbo.$('dvMsgBtns');
      this.dvCT=Showbo.$('dvMsgCT');
      this.dvTitle=Showbo.$('dvMsgTitle');
      this.IsInit=true;
    },
    checkDOMLast:function(){//�˷����ǳ��ؼ���Ҫ���޷���ʾ�������ڡ���������dvMsgBox��lightBox���봦��body����������ڵ���
      if(document.body.lastChild!=this.lightBox){
        document.body.appendChild(this.dvMsgBox);
        document.body.appendChild(this.lightBox);
      }
    },
    createBtn:function(p,v,fn){
        var btn=document.createElement("input");
        btn.type="button";
        btn.className='btn';
        btn.value=v;
        btn.onmouseover=function(){this.className='btnfocus';}
        btn.onmouseout=function(){this.className='btn';}
        btn.onclick=function(){
          Showbo.Msg.hide();
          if(fn)fn(p);
        }
        return btn;
    },
    alert:function(msg){
      this.show({buttons:{yes:'ȷ��'},msg:msg});
    },
    confirm:function(msg,fn){
      //fnΪ�ص�������������show������һ��
      this.show({buttons:{yes:'ȷ��',no:'ȡ��'},msg:msg,title:'��ʾ',fn:fn});
    },
    prompt:function(labelWord,defaultValue,txtId,fn){
      if(!labelWord)labelWord='�����룺';
      if(!defaultValue)defaultValue="";
      if(!txtId)txtId="msg_txtInput";
      this.show({title:'������ʾ',msg:labelWord+'<input type="text" id="'+txtId+'" style="width:200px" value="'+defaultValue+'"/>',buttons:{yes:'ȷ��',no:'ȡ��'},fn:fn});
    },
    wait:function(msg,title){
      if(!msg)msg='���ڴ���..';
      this.show({title:title,msg:msg,wait:true});
    },
    show:function(cfg){
      //cfg:{title:'',msg:'',wait:true,icon:'Ĭ��Ϊ��Ϣ',buttons:{yes:'',no:''},fn:function(btn){�ص�����,btnΪ����İ�ť������Ϊyes��no},width:��ʾ��Ŀ�}
      //����ǵȴ���wait��������ò���Ҫ�ˡ��� 
      if(!cfg)throw("û��ָ�������ļ���");
      //��Ӵ����С�ı����
      if(Showbo.IsIE)window.attachEvent("onresize",this.onResize);
      else  window.addEventListener("resize",this.onResize,false);
      
      if(!this.IsInit)this.InitMsg();//��ʼ��dom����
      else this.checkDOMLast();//����Ƿ������
      
      //����Ƿ�Ҫָ����Ĭ��Ϊ300
      if(cfg.width)this.defaultWidth=cfg.width;
      this.dvMsgBox.style.width=this.defaultWidth+'px';
      //����ֱ��ʹ��show����ֹͣΪ�������Ĵ���
      if(this.timer){clearInterval(this.timer);this.timer=null;}      
      this.dvTitle.innerHTML='';
      if(cfg.title)this.dvTitle.innerHTML=cfg.title;
      this.dvCT.innerHTML='';
      if(cfg.wait){
        if(cfg.msg)this.dvCT.innerHTML=cfg.msg;
        this.dvCT.innerHTML+='<div class="pro"><div class="bg" id="dvProcessbar"></div></div>';
        this.dvBtns.innerHTML='';
        this.dvBottom.style.height='10px';
        this.timer=setInterval(function(){Showbo.Msg.moveProcessbar();},1000);
      }
      else{
        //if(!cfg.icon)cfg.icon=Showbo.Msg.INFO;
        if(!cfg.buttons||(!cfg.buttons.yes&&!cfg.buttons.no)){
          cfg.buttons={yes:'ȷ��'};
        }
        if(cfg.icon)this.dvCT.innerHTML='<div class="icon '+cfg.icon+'"></div>';
        if(cfg.msg)this.dvCT.innerHTML+=cfg.msg+'<div class="clear"></div>';
        this.dvBottom.style.height='45px';
        this.dvBtns.innerHTML='<div class="height"></div>';
        if(cfg.buttons.yes){
          this.dvBtns.appendChild(this.createBtn('yes',cfg.buttons.yes,cfg.fn));
          if(cfg.buttons.no)this.dvBtns.appendChild(document.createTextNode('��'));
        }
        if(cfg.buttons.no)this.dvBtns.appendChild(this.createBtn('no',cfg.buttons.no,cfg.fn));
      }
      Showbo.initBodyScale();
      this.dvMsgBox.style.display='block';
      this.lightBox.style.display='block';
      this.onResize(false);
      if(cfg.wait!==true)this.dvBottom.getElementsByTagName('input')[0].focus();
    },
    hide:function(){
      this.dvMsgBox.style.display='none';
      this.lightBox.style.display='none';
      if(this.timer){clearInterval(this.timer);this.timer=null;}
      if(Showbo.IsIE)window.detachEvent('onresize',this.onResize);
      else window.removeEventListener('resize',this.onResize,false);
    },
    onResize:function(isResize){
       if(isResize)Showbo.initBodyScale();
       Showbo.Msg.lightBox.style.width=Showbo.BodyScale.tx+'px';
       Showbo.Msg.lightBox.style.height=Showbo.BodyScale.ty+'px';
       Showbo.Msg.dvMsgBox.style.top=document.documentElement.scrollTop+Math.floor((Showbo.BodyScale.y-Showbo.Msg.dvMsgBox.offsetHeight)/2)+'px';
       Showbo.Msg.dvMsgBox.style.left=Math.floor((Showbo.BodyScale.x-Showbo.Msg.dvMsgBox.offsetWidth)/2)+'px';
    }
}