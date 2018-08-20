	HTMLDivElement.prototype.marqueAlex = function(obj){ 	 
	var userDiv = this,
	 		userWidth,
			animationSpeed,
	    userHeight = parseInt(getComputedStyle(userDiv).height,10),  
	    str = userDiv.innerHTML,
			animateString = 0,
			defineStringWidth,
			userOffset = 0,
			
			_defineStringWidth = function(){
				var obj = document.querySelector(".outer");
				var s = document.createElement("span")
				s.innerHTML=obj.innerHTML;
				s.style.visibility="hidden";
				s.style.whiteSpace="nowrap";
				obj.appendChild(s);
				var stringWidth = s.offsetWidth;
				obj.removeChild(s);
				return stringWidth;
			},

			_defineUserWidth = function(userOffset){
				var outerWidth = parseInt(getComputedStyle(userDiv).width,10);
				if (defineStringWidth < outerWidth){
					return outerWidth + userOffset;
				}
				else{
					return defineStringWidth + userOffset;
				}
			},

			_configurationData = function(){
				for (var i in obj) {
					if (obj.hasOwnProperty(i)) {
						if (i == "speed"){
							animationSpeed = obj[i];
						}
						if (i == "direction"){
							if (obj[i] == "left"){
								userDiv.direction = 0;
							}
							else {
								userDiv.direction = 1;
							}
						}
						if (i == "offset"){
							userOffset = obj[i];
						}
					}
				}
			},
			_userDivRestyling = function(){
				userDiv.style.position = 'relative';	
				userDiv.style.overflow = 'hidden';
				userDiv.innerHTML = "";
			},

			_innerOutCreation = function(){
				var innerOutDiv = document.createElement('div');
				innerOutDiv.className = 'innerOut';
				userDiv.insertBefore(innerOutDiv, userDiv.children[0]);
				document.querySelector('.innerOut').style.cssText = "white-space: nowrap;position: absolute;width:"+userWidth*2+"px;height:"+userHeight+"px;margin-left: 0px;"; 
			},

			_insertDiv = function(){
				var innerOut = document.querySelector('.innerOut');
				innerOut.style.marginLeft = 0 + 'px';
				var div = document.createElement('div');	
				div.className = 'inner';
				div.innerHTML = str;
				innerOut.insertBefore(div, innerOut.children[0]);
				innerOut.firstChild.style.cssText = "position: relative;display:inline-block;width:"+userWidth+"px;height:"+userHeight+"px;margin: 0;padding: 0; ";
			},

			_timeCalculation = function(){
				return (userWidth*20)/animationSpeed;
			},

			_reanimate = function(){
				animateString = innerOut.animate([
					{marginLeft: '-'+userWidth+'px'},
					{marginLeft: '0px'}
				], { 
					duration: _timeCalculation(),
					iterations: 1,
					}); 
					return animateString;
			},

			_animationEnd = function() {
				animateString.onfinish = function() { 
					_reanimate();
						
						if (userDiv.direction == 1 ){
							animateString.play();
							return _animationEnd();
						}
						if( userDiv.direction == 0 ){
							animateString.play();
							animateString.reverse();
							return _animationEnd();
						}
 				};
			},

			_windowChangSizeChecker = function(){
				window.onresize = function(){
					_windowSizeChanger();
				}
			},

			_windowSizeChanger = function(){
				userWidth = _defineUserWidth(userOffset);
				animationTime = _timeCalculation();
				innerOut.style.width = ""+userWidth*2+"px";
				document.querySelector(".inner").style.width = ""+	+"px";
				innerOut.firstChild.style.width = ""+userWidth+"px";
				innerOut.lastChild.style.width = ""+userWidth+"px";				
			},

			_insertAnim = function(){
				animateString = _reanimate();
				animateString.pause();
			};

	userDiv.direction = 1;
	this.run = function(){
		if (userDiv.direction == 1){
			animateString.play();
		}
		else{
			animateString.reverse();
 		}
 	}

	this.stop = function(){
		animateString.cancel();
	}

	this.pause = function(){
		animateString.pause();
	}

	this.reverse = function(){
		animateString.reverse();
		userDiv.direction ^= true;
	}
	this.userOffset = function(offset){
		userOffset = offset;
		_defineUserWidth(userOffset);
		_windowSizeChanger();
	}
	
	this.speed = function(speed){
		animateString.cancel();
		animationSpeed = speed;
		_reanimate();
						
		if (userDiv.direction == 1 ){
			animateString.play();
			return _animationEnd();
		}
		if( userDiv.direction == 0 ){
			animateString.play();
			animateString.reverse();
			return _animationEnd();
		}
 	}

	_configurationData();
	defineStringWidth = _defineStringWidth();    
	userWidth = _defineUserWidth(userOffset);   
	_userDivRestyling();
	_innerOutCreation();   var innerOut = document.querySelector('.innerOut');
	_insertDiv();	
	_insertDiv();
	_insertAnim();
	_animationEnd();
	_windowChangSizeChecker();
}

var myMarquie = document.querySelector(".outer");
