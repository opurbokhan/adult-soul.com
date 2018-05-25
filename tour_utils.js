// Resolution definition		
        // Globals
		// Major version of Flash required
		var requiredMajorVersion = 8;
		// Minor version of Flash required
		var requiredMinorVersion = 0;
		// Minor version of Flash required
		var requiredRevision = 0;
		
		var datasize = 11301;
		var highBandwidth = false;			
		var defaultheight = 1200;		
		function setCookie(name, value){
			var expdate = new Date();
			expdate.setHours(expdate.getHours() + 9999);
			document.cookie = name + '=' + value + '; expires=' + expdate.toGMTString() + '; path=/';
		}		
		
// Tour exit
		var _exit_url = "http://" + document.domain + "/dating/exit";
		var css_name = null;


		var show_exit=true;
		var brd = 0;
		var mouseX,mouseY;
		var is_loaded = false;
		var IE = document.all?true:false;
		var x_left = 0;
		var x_right = 0;
		var y_top = 0;
		var y_bottom = 0;
		
		function get_pl_domain()
		{
			var domains = document.domain.split(".");
			return domains[domains.length -2] + "." + domains[domains.length -1];
		}

		function tour_setCookie(name, value){
		    document.cookie = name + '=' + value + '; path=/; domain=' + get_pl_domain();
		}

		function tour_getCookie(name) {
		    var cookies = document.cookie.toString().split('; ');
		    var cookie, c_name, c_value;

		    for (var n=0; n<cookies.length; n++) {
		    	cookie  = cookies[n].split('=');
		    	c_name  = cookie[0];
		    	c_value = cookie[1];

		    	if ( c_name == name ) {
		    		return c_value;
		    	}
		    }

		    return null;
		}

		function getMouseXY(e)
		{
			if( !is_loaded )
			{
				setup_exit( );
				is_loaded = true;
			}

			if (IE)
			{
				 tempX = event.clientX;
				 tempY = event.clientY;
			}
			else
			{
				tempX = e.clientX;
				tempY = e.clientY;
		 	}

			 mouseX=tempX;
			 mouseY=tempY;

			//set_height();

		 	if (mouseX <= x_left || mouseX >=x_right || mouseY <= y_top || mouseY >= y_bottom)
		 	{
			 	//console.log('out');
			 	show_exit=true;
		 	}
		 	else
		 	{
		 		if (show_exit)
		 		{
		 			//console.log('back');
		 		}
		 		show_exit=false;
		 	}

		    //console.log(mouseX + ", " +  mouseY + "," + show_exit + ", " + y_bottom);
		}


		function setup_exit()
		 {
		 	x_left=brd;
		 	y_top=15;


		 	if (typeof window.innerWidth != 'undefined')
		 	{
		 		x_right = window.innerWidth - brd;
		 		y_bottom = window.innerHeight - brd;
		 	}
		 	else if (typeof document.documentElement != 'undefined' && typeof document.documentElement.clientWidth != 'undefined' && document.documentElement.clientWidth != 0)
		 	{
		 		// IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
		 		x_right = document.documentElement.clientWidth - brd;
		 		y_bottom = document.documentElement.clientHeight - brd;
		 	}
		 	else
		 	{
				// older versions of IE
		 		x_right = document.getElementsByTagName('body')[0].clientWidth - brd;
		 		y_bottom = document.getElementsByTagName('body')[0].clientHeight - brd;
		 	}
		 	
		 }


		 function changeMetaTag()
		 {		
			 var cookies_array = decodeURIComponent(tour_getCookie("referral_path")).split('/');
			 $('meta[name="WT.seg_1"]').attr('content', cookies_array[1]);	 
		 }
		 changeMetaTag();
		 function exit_tour()
		 {    
		     window.onbeforeunload = null;            
		     tour_setCookie("ExitCookie", "1");     
		     $('#content').hide();
		     if(css_name != null && css_name != undefined)
		     {
		         $('#exitiframe').removeAttr("style");
		         $('#exitiframe').toggleClass(css_name);
		     }		     
		     else
		     {
		    	 $('body').removeAttr("style");
		    	 //$('#exitiframe').height(defaultheight);
		     }
		     $('#exitiframe').show();     
		     window.onbeforeunload = null;
		 }
		 
		 function deleteCookie ( cookie_name )
		 {
		   var cookie_date = new Date ( );  // current date & time
		   cookie_date.setTime ( cookie_date.getTime() - 1 );
		   document.cookie = cookie_name += "=; expires=" + cookie_date.toGMTString();
		 }
		 
		jQuery(document).ready(function(){			
		    if(window._isPopUnder !== true) window.focus();
		    is_loaded = false;
		    $('form').submit(function(){
		        window.onbeforeunload = null;
		    });		    
		    if(document.location.href.indexOf(_exit_url) > -1 || document.location.href.indexOf("/dating/exit") > -1 || _exit_url == "NOEXIT" || window.name == "exitiframe" || !highBandwidth)
		        {
		            window.onbeforeunload = null;
		            return false;
		        }
		    if(needtosetiframe())
		        {
		            document.onmousemove = getMouseXY;
		            putiframe();            
		        }
		    else window.onbeforeunload = null;
		    
			//Render pixels(if any)
			var cName = "pixels";
			var results = document.cookie.match ( '(^|;) ?' + cName + '=([^;]*)(;|$)' );
			if ( results ) {
				var pixel = decodeURIComponent(results[2]) ;
				if (pixel) {
				    pixel = pixel.replace(/%20/g, " ");
				    deleteCookie(cName);
				    deleteCookie('click_pixel');
				    $("body").append(pixel);			
				}
			}

		});

		window.onbeforeunload = function()
		{
		    if(show_exit && highBandwidth)
		    {		        	        	
		        exit_tour();
		        window.onbeforeunload = null;
		        return "";
		   }
		    
		}

		function needtosetiframe()
		{			
			var cookies_array = decodeURIComponent(tour_getCookie("referral_path")).split('/');
		    if(cookies_array.length != 6) return false;
		    else if(cookies_array[5] != "1") return false;
		    else if(tour_getCookie("ExitCookie") != null) return false;

		    return true
		}

		function putiframe()
		{
			if(_exit_url == "NOEXIT") return false;
			
		    if(_exit_url == undefined || _exit_url == null )
		    {
		        _exit_url = "http://" + document.domain + "/dating/exit";
		    }      
		    $('body').prepend('<iframe id="exitiframe" name="exitiframe" frameborder="0" src= ' + _exit_url + ' style="display: none; width: 100%; height: 100%; border: none; overflow-y: auto; overflow-x: hidden; min-height: 100%; max-height: 100%;">If you can see this, your browser doesn\'t understand IFRAME.</iframe>')    
		    var _exit_height = document.documentElement.clientHeight;
		    _exit_height -= document.getElementById('exitiframe').offsetTop;		    
		    $('#exitiframe').height(_exit_height);    
		}
		
		function open_url(pl, action)
		{						
			window.open('http://' + pl + action , 'mywindow');
		}
		