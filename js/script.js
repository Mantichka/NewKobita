var divGlobal = document.createElement('div');
divGlobal.setAttribute("class","divGlob");
document.body.appendChild(divGlobal);

//new audio pleyer
 /* audiojs.events.ready(function() {
    var as = audiojs.createAll();
  });*/


function mp3() {
    var i;
    var the_object;
    var http_request = new XMLHttpRequest();
    divGlobal.innerHTML = "Loading ...";
    var txt = document.getElementById("Fsearch").value;
    http_request.open('GET', '/search.php?search=' + txt, true);
    http_request.send(null);
    http_request.onreadystatechange = function() {
	if (http_request.readyState == 4) {
	    console.log(http_request.status);
	    if (http_request.status == 200) {
		var str = http_request.responseText;
		str = str.substr(0, str.indexOf("<!-- www.1freehosting."));
		the_object = JSON.parse(str.replace(/\t/g, '&nbsp;'));
		divGlobal.innerHTML = "";
		if (the_object.length == 0) {
		    divGlobal.innerHTML = txt + " not found";
		} else {
		    for (i = 0; i < the_object.length; i++) {

			var div = document.createElement('div');
			var c = 0;
			c = divGlobal.appendChild(div);
			/*c.innerHTML = "<div class=\"artnameplay\"><div class=\"artname\">" + the_object[i].artist + "&nbsp;~&nbsp;" + the_object[i].name + "</div><div class=\"play\"><object classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" width=\"300\" height=\"20\"\
                    codebase=\"http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab\"> \
                <param name=\"movie\" value=\"swf/singlemp3player.swf?file=http%3A%2F%2Fvpleer.ru" + encode(the_object[i].url)
				+ "&autoStart=false&backColor=000000&frontColor=ffffff&songVolume=100\" />\
                <param name=\"wmode\" value=\"transparent\" />\
                <embed wmode=\"transparent\" width=\"300\" height=\"20\" src=\"swf/singlemp3player.swf?file=http%3A%2F%2Fvpleer.ru" + encode(the_object[i].url)
				+ "&autoStart=false&backColor=000000&frontColor=ffffff&songVolume=100\"\
                       type=\"application/x-shockwave-flash\" pluginspage=\"http://www.macromedia.com/go/getflashplayer\" />\
            </object></div></div><br>";*/
			
			
			c.innerHTML = "<div class=\"artnameplay\"><div class=\"artname\">" + the_object[i].artist + "&nbsp;~&nbsp;" + the_object[i].name + "</div><div class=\"play\"><audio src=\"\
                   http://vpleer.ru" + the_object[i].url+"\"preload=\"none\" /></div></div><br>";
			 }
			 
		    var playerList = audiojs.createAll();
		    for (i = 0; i < playerList.length; i++) {
			playerList[i].onplay = function() {
			    if (currentPlayer) {
				currentPlayer.pause();
			    }
			    currentPlayer = this;
			    this.pause();
			};
		    }
		}

	    } else {
		alert('There was a problem with the URL.');
	    }
	    http_request = null;
	}
    };
    return false;
};
function encode(unencoded) {
    unencoded = unencoded.replace(/&amp;/g, '&');
    return  encodeURIComponent(unencoded).replace(/'/g, "%27").replace(/"/g, "%22");

}