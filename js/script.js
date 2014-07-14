var divGlobal = document.createElement('div');
divGlobal.setAttribute("class", "divGlob");
var centr = document.createElement('center');
document.body.appendChild(centr);
centr.appendChild(divGlobal);

function mp3() {
    // var i;
    //var the_object;
    
    i = 0;
    var http_request = new XMLHttpRequest();
    divGlobal.innerHTML = "<center><img src=\"http://www.defencejobs.gov.au/global/images/refresh/page-tools/loader.gif\"><br>Loading ...</center>";
    var txt = document.getElementById("Fsearch").value;
    http_request.open('GET', '/search.php?search=' + txt, true);
    http_request.send(null);
    http_request.onreadystatechange = function() {
	if (http_request.readyState === 4) {
	    console.log(http_request.status);
	    if (http_request.status === 200) {
		var str = http_request.responseText;
		str = str.substr(0, str.indexOf("<!-- www.1freehosting."));
		the_object = JSON.parse(str.replace(/\t/g, '&nbsp;'));
		divGlobal.innerHTML = "";
		if (the_object.length === 0) {
		    divGlobal.innerHTML = txt + " not found";
		} else {
		    $("#container")[0].setAttribute("style","");
		    $("#jquery_jplayer").jPlayer({
			ready: function(e) {
			    $(this).jPlayer("setMedia", {
				mp3: e.jPlayer.options.mp3,
				title: e.jPlayer.options.title
			    });
			},
			pause: function(e) {
			    playPause(false, e.jPlayer.options.index);
			},
			ended: function(e) {
			    playPause(false, e.jPlayer.options.index);
			    pause(parseInt(e.jPlayer.options.index));
			    play(((parseInt(e.jPlayer.options.index)) + 1) % the_object.length);
			    playPause(true, parseInt(e.jPlayer.options.index) + 1);
			},
			play: function(e) {
			    playPause(true, e.jPlayer.options.index);
			},
			swfPath: "/swf",
			cssSelectorAncestor: "#jp_container",
			wmode: "window",
			globalVolume: true,
			/*smoothPlayBar: true,*/
			keyEnabled: true,
			title: the_object[i].artist + " ~ " + the_object[i].name,
			mp3: "http://vpleer.ru" + encode(the_object[i].url),
			index: i
		    });
		    for (i = 0; i < the_object.length; i++) {
			var item = document.createElement('div');
			item.setAttribute("class", "div-item item");
			var button = document.createElement('div');
			button.setAttribute("class", "button-play");
			button.setAttribute("id", "button-play_" + i);
			button.setAttribute("onclick", "play(this.id.substr(12));");
			var button_pause = document.createElement('div');
			button_pause.setAttribute("class", "button-pause");
			button_pause.setAttribute("id", "button-pause_" + i);
			button_pause.setAttribute("onclick", "pause(this.id.substr(13));");
			button_pause.setAttribute("style", "display:none;");
			
			item.appendChild(button);
			item.appendChild(button_pause);
			var itemInfo = document.createElement("div");
			itemInfo.setAttribute("class", "item");
			itemInfo .appendChild( document.createTextNode(the_object[i].artist + " ~ " + the_object[i].name));
			item.appendChild(itemInfo);
			divGlobal.appendChild(item);
			divGlobal.appendChild(document.createElement('br'));
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
function playPause(play, index) {
    $("#button-play_" + index)[0].setAttribute("style", play ? "display:none;" : "");
    $("#button-pause_" + index)[0].setAttribute("style", play ? "" : "display:none;");
}
function play(el) {
    $("#jquery_jplayer").jPlayer("setMedia", {
	mp3: "http://vpleer.ru" + encode(the_object[el].url),
	title: the_object[el].artist + " ~ " + the_object[el].name
    });
    $("#jquery_jplayer").jPlayer("option", "index", el);
    $("#jquery_jplayer").jPlayer("play");
}
function pause(el) {
    $("#jquery_jplayer").jPlayer("pause");
}
function encode(unencoded) {
    //unencoded = unencoded.replace(/&amp;/g, '&');
    return unencoded.replace(/&amp;/g, '&');
}
$('#download_link').click(function() {
    $(this).attr("href", $("#jquery_jplayer").jPlayer("getOption", "mp3"));
});