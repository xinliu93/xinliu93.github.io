
(function(){
	var oInfo = document.getElementById('info');
	var aLis = oInfo.getElementsByTagName('li');
	var oHint = document.getElementById('hint');
	var oDownHint = oHint.getElementsByClassName('scrollHint')[0];
	var oUpHint = oHint.getElementsByClassName('returnTop')[0];
	var oSubCode = document.getElementById('subCode');
	var aSubCodeSpan = document.getElementsByTagName('span');
	
	var device = mobilecheck();
	var num = 0;//褰撳墠鏄剧ず绗嚑涓�
	var H = window.innerHeight;
	var len = aLis.length;
	
	var onOff = true;//鎺у埗鍒囨崲閫熷害
	var origin = 'top';//鎺у埗鏃嬭浆鐨勪腑蹇冪嚎
	var deg = 90;//鎺у埗鏃嬭浆鐨勮搴�
	
	
	//璁剧疆鍏冪礌鐨剅em鍊�
	setRem();
	
	//娓叉煋宸︿晶灏忔爣
	renderSubCode()
	
	//閫氳繃鏀瑰彉translateY瀵筶i鐨勪綅缃繘琛屽垵濮嬪寲
	initLis();
	
	//婊氳疆浜嬩欢锛屽垏鎹㈡樉绀哄唴瀹�
	wheel(document,fnWheel);
	
	//绉诲姩绔粦鍔ㄥ睆骞曪紝鍒囨崲鏄剧ず鍐呭
	nChange();
	
	//鏍规嵁褰撳墠num鏄剧ず闅愯棌hint鎸夐挳
	showHidHint()
	
	//涓や釜hint鎸夐挳鐨勪簨浠跺嚱鏁�
	fnHint('click');
	
	
	//閫氳繃鏀瑰彉translateY瀵筶i鐨勪綅缃繘琛屽垵濮嬪寲
	function initLis() {
		for (var i=0; i<aLis.length; i++) {
			if ( i === num ) {
				move.css(aLis[i],'translateY',0);
			} else if (i>num) {
				move.css(aLis[i],'translateY',H);
			} else {
				move.css(aLis[i],'translateY',-H);
			}
			move.css(aLis[i],'rotateX',0);
			move.css(aLis[i],'opacity',100);
		}
	}
	//鏍规嵁褰撳墠num鏄剧ず闅愯棌hint鎸夐挳
	function showHidHint() {
		if ( num === 0 ) {
			oDownHint.style.display = 'block';
			oUpHint.style.display = 'none';
		} else {
			oDownHint.style.display = 'none';
			oUpHint.style.display = 'block';
		}
	}
	
	//璁剧疆宸︿晶灏忔爣鐨勬牱寮�
	function setSubCodeSty() {
		for ( var i=0; i<len; i++ ) {
			if ( i === num ) {
				aSubCodeSpan[i].className = 'active';
			} else {
				aSubCodeSpan[i].className = '';
			}
		}
	}
	
	//娓叉煋宸︿晶灏忔爣
	function renderSubCode() {
		var str = '';
		for ( var i=0; i<len; i++ ) {
			if ( i === num ) {
				str += '<span class="active"></span>';
			} else {
				str += '<span></span>';
			}
		}
		oSubCode.innerHTML = str;
	}
	
	
	//涓や釜hint鎸夐挳鐨勪簨浠跺嚱鏁�
	function fnHint(Event) {
		oDownHint.addEventListener(Event,fnBtnDown);
		oUpHint.addEventListener(Event,fnBtnUp);
		
		function fnBtnDown(ev) {
			
			fnWheel(true);
			
		}
		
		function fnBtnUp(ev) {
			var timer = setInterval(function(){
				fnWheel(false,200);
				if ( num === 0 ) {
					clearInterval(timer);
				}
			},250);
		}
	}
	
	
	
	
	//婊氳疆浜嬩欢锛屽垏鎹㈡樉绀哄唴瀹�
	function fnWheel(down,delay) {
		
		if (!onOff) return;
		var nowNum = num;
		
		onOff = false;
		
		delay = delay || 800;
		
		if ( down ) {
			num ++;
			if (num > aLis.length-1){
				num = aLis.length-1;
				onOff = true;
				return;
			};
			origin = 'top';
			deg = -90;
			//aLis[nowNum].style.transformOrigin = 'top';
			//move.mTween(aLis[nowNum],{'rotateX':-90},800,'easeOut');
		} else {
			num --;
			if(num < 0){
				num = 0;
				onOff = true;
				return;
			};
			origin = 'bottom';
			deg = 90;
		}
		
		aLis[num].style.zIndex = 10;
		
		move.mTween(aLis[num],{'translateY':0},delay,'easeOut',function(){
			onOff = true;
			aLis[num].style.zIndex = 0;
			initLis();
			
		})
		aLis[nowNum].style.transformOrigin = origin;
		
		aLis[nowNum].style.opacity = '0';
		move.mTween(aLis[nowNum],{'rotateX':deg},delay,'easeOut');
		
		
		//鏍规嵁褰撳墠num鏄剧ず闅愯棌hint鎸夐挳
		showHidHint();
		//璁剧疆宸︿晶灏忔爣鐨勬牱寮�
		setSubCodeSty();
		
	}
	
	//绉诲姩绔粦鍔ㄥ睆骞曪紝鍒囨崲鏄剧ず鍐呭
	function nChange() {
		//var onOff = true;
		var startY, disY, nowNum;
		var origin = 'top';
		var deg = 0;
		
		slide({
			fnStart:fnStart,
			fnMove:fnMove,
			fnEnd:fnEnd
		});
		
		function fnStart(obj) {
			nowNum = num;
			startY = obj.y;
			deg = 0;
		}
		function fnMove(obj) {
			
			if (!onOff) return;
			if ( obj.y > 0 ) {
				if (num === 0) return;
				if ( aLis[num+1] && move.css(aLis[num+1],'translateY')<H ) {
					aLis[num+1].style.zIndex = 0;
					move.css(aLis[num+1],'translateY',H);
				}
				nowNum = num - 1;
				aLis[nowNum].style.zIndex = 10;
				move.css(aLis[nowNum],'translateY',-H+obj.y);
				
				origin = 'bottom';
				//deg = 90;
			} else {
				if (num === aLis.length-1) return;
				if ( aLis[num-1] && move.css(aLis[num-1],'translateY')>-H ) {
					aLis[num-1].style.zIndex = 0;
					move.css(aLis[num-1],'translateY',H)
				}
				
				nowNum = num + 1;
				aLis[nowNum].style.zIndex = 10;
				move.css(aLis[nowNum],'translateY',H+obj.y);
				origin = 'top';
			}
			
			deg = (obj.y/H)*90;
			
			aLis[num].style.transformOrigin = origin;
			move.css(aLis[num],'rotateX',deg);
			aLis[num].style.opacity = deg/90;
		}
		function fnEnd(obj) {
			if (!onOff || deg ===0 ) return;
			
			move.mTween(aLis[num],{'rotateX':90*(deg/Math.abs(deg))},800,'easeOut')
			aLis[num].style.opacity = 0;
			
			onOff = false;
			
			move.mTween(aLis[nowNum],{'translateY':0},800,'easeOut',function(){
				onOff = true;
				aLis[nowNum].style.zIndex = 0;
				initLis();
			});
			
			num = nowNum;
			
			//鏍规嵁褰撳墠num鏄剧ず闅愯棌hint鎸夐挳
			showHidHint();
			//璁剧疆宸︿晶灏忔爣鐨勬牱寮�
			setSubCodeSty();
		}
	}
	
	//缁欏璞℃坊鍔犵Щ鍔ㄧ婊戝睆浜嬩欢
	function slide(json) {
		var settings = {
			obj: json.obj || document,
			fnStart:json.fnStart || function () {},
			fnMove:json.fnMove || function () {},
			fnEnd:json.fnEnd || function () {}
		}
		var startX, startY, disX, disY;
		
		settings.obj.addEventListener('touchstart',fnStart);
		settings.obj.addEventListener('touchmove',fnMove);
		settings.obj.addEventListener('touchend',fnEnd);
		
		function fnStart(ev) {
			var obj = ev.changedTouches[0];
			startX = obj.pageX;
			startY = obj.pageY;
			settings.fnStart({x:startX,y:startY});
			
		}
		function fnMove(ev) {
			var obj = ev.changedTouches[0];
			disX = obj.pageX - startX;
			disY = obj.pageY - startY;
			settings.fnMove({x:disX,y:disY});
			ev.preventDefault();
		}
		function fnEnd(ev) {
			settings.fnEnd({x:disX,y:disY});
		}
	}
	
	//婊氳疆婊氬姩鍏煎锛屽垽鏂粴鍔ㄦ柟鍚�
	function wheel(obj,callBack) {
		obj.addEventListener('mousewheel',fnWheel);
		obj.addEventListener('DOMMouseScroll',fnWheel);
		
		function fnWheel(ev) {
			var down = true;
			if (ev.detail) {
				down = ev.detail>0? true: false;
			} else {
				down = ev.wheelDelta>0? false: true;
			}
			callBack(down);
		}
	}
	//璁剧疆鍏冪礌鐨剅em鍊�
	function setRem() {
		var html = document.documentElement;
		var r = 20; 
		html.style.fontsize = html.clientWidth/16;
		
		if (device) {
			//璁剧疆鍚戜笅婊氬姩鎻愮ず妗嗗唴鐨勬枃瀛楀唴瀹�
			oDownHint.getElementsByTagName('p')[0].innerHTML = '婊戝姩灞忓箷';
			
			//涓や釜hint鎸夐挳鐨勪簨浠跺嚱鏁�
			fnHint('mousestart');
			
			//閫傞厤绉诲姩绔厓绱犲ぇ灏�
			var aDls = oInfo.getElementsByTagName('dl');
			var aDts = oInfo.getElementsByTagName('dt');
			var aDds = oInfo.getElementsByTagName('dd');
			var oH1 = oInfo.getElementsByTagName('h1')[0];
			var oPortrait = oInfo.getElementsByClassName('portrait')[0];
			
			
			
			for ( var i=0; i<aDls.length; i++ ) {
				aDls[i].style.margin = 10/r+'rem auto';
				aDts[i].style.fontSize = 30/r+'rem';
			}
			for ( var i=0; i<aDts.length; i++ ) {
				aDts[i].style.lineHeight = 50/r+'rem';
			}
			for ( var i=0; i<aDds.length; i++ ) {
				aDds[i].style.margin = 6/r+'rem';
				aDds[i].style.padding = '0 '+10/r+'rem';
				aDds[i].style.fontSize = 16/r+'rem';
				aDds[i].style.lineHeight = 30/r+'rem';
			}
			
			oH1.style.height = 100/r+'rem';
			oH1.style.fontSize = 30/r+'rem';
			oH1.style.lineHeight = 100/r+'rem';
			oPortrait.style.marginBottom = 50/r+'rem';
			oPortrait.style.height = oPortrait.style.width = 160/r+'rem';
			oPortrait.style.padding = 3/r+'rem';
			
			
			
			var aIntDl = oInfo.getElementsByClassName('interest')[0].getElementsByTagName('dl');
			var aAddDt = oInfo.querySelectorAll('.add dt');
			var aAddDd = oInfo.querySelectorAll('.add dd');
			var aDesDt = oInfo.querySelectorAll('.describe dt');
			var aSkiDt = oInfo.querySelectorAll('.skill dt');
			for ( var i=0; i<aIntDl.length; i++ ) {
				aIntDl[i].style.margin = 50/r+'rem auto';
			}
			for ( var i=0;i<aIntDl.length; i++ ) {
				aIntDl[i].style.margin = 50/r+'rem auto';
			}
			/*for ( var i=0; i<aAddDt.length; i++ ) {
				aAddDt[i].style.fontSize = 16/r+'rem';
				aAddDt[i].style.lineHeight = 20/r+'rem';
			}
			for ( var i=0; i<aAddDd.length; i++ ) {
				aAddDd[i].style.fontSize = 30/r+'rem';
			}*/
			for ( var i=0; i<aDesDt.length; i++ ) {
				aDesDt[i].style.marginBottom = 50/r+'rem';
			}
			for ( var i=0; i<aSkiDt.length; i++ ) {
				aSkiDt[i].style.marginBottom = 50/r+'rem';
			}
		}
	}
	function mobilecheck() {
	    var check = false;
	    (function (a) {
	        if (/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))check = true
	    })(navigator.userAgent || navigator.vendor || window.opera);
	    return check;
	}
})()