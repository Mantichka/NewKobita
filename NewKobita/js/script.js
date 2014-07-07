var divGlobal = document.createElement('div');
divGlobal.setAttribute("class", "divGlob");
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
			div.setAttribute("id", "jquery_jplayer_" + i);
			div.setAttribute("class", "jp-jplayer");
			//<div id="jquery_jplayer_4" class="jp-jplayer"></div>
			divGlobal.appendChild(div);
			
			
			var div2 = document.createElement('div');
			div2.setAttribute("id", "jp_container_" + i);
			div2.setAttribute("class", "jp-audio");
			
			var div3 = document.createElement('div');
			div3.setAttribute("class", "jp-type-single");
			div2.appendChild(div3);
			
			divGlobal.appendChild(div2);
			
			$("#jquery_jplayer_" + i).jPlayer({
			    ready: function() {
				$(this).jPlayer("setMedia", {
				    mp3: "http://vpleer.ru" + the_object[i].url
				});
			    },
			    play: function() { // To avoid multiple jPlayers playing together.
				$(this).jPlayer("pauseOthers");
			    },
			    swfPath: "../NewKobita/js",
			    supplied: "mp3",
			    cssSelectorAncestor: "#jp_container_" + i,
			    wmode: "window",
			    globalVolume: true,
			    smoothPlayBar: true,
			    keyEnabled: true
			});
		    }
		}
	    } else {
		alert('There was a problem with the URL.');
	    }
	    http_request = null;
	}
    };
    return false;
}
;
function encode(unencoded) {
    unencoded = unencoded.replace(/&amp;/g, '&');
    return  encodeURIComponent(unencoded).replace(/'/g, "%27").replace(/"/g, "%22");

}