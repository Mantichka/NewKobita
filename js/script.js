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
    divGlobal.innerHTML = "<center><img  src=\"/loader.gif\"><br>Loading ...</center>";
    var txt = document.getElementById("Fsearch").value;
    http_request.open('GET', '/search.php?search=' + txt, true);
    http_request.send(null);
    http_request.onreadystatechange = function() {
	if (http_request.readyState === 4) {
	    console.log(http_request.status);
	    if (http_request.status === 200) {
		var str = http_request.responseText;
		str = str.substr(0, str.lastIndexOf("}]") + 2);
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
			item.setAttribute("id", "div-item-" + i);
			var button = document.createElement('a');
			button.setAttribute("href", "javascript:;");
			button.setAttribute("title", "Play");
			button.setAttribute("class", "button-play");
			button.setAttribute("id", "button-play_" + i);
			button.setAttribute("onclick", "play(this.id.substr(12));");
			var img_play = document.createElement('img');
			img_play.setAttribute("src", "/css/play.ico");
			img_play.setAttribute("width", "20");
			img_play.setAttribute("height", "20");
			button.appendChild(img_play);
			var button_pause = document.createElement('a');
			button_pause.setAttribute("class", "button-pause");
			button.setAttribute("href", "javascript:;");
			button_pause.setAttribute("title", "Pause");
			button_pause.setAttribute("id", "button-pause_" + i);
			button_pause.setAttribute("onclick", "pause(this.id.substr(13));");
			button_pause.setAttribute("style", "display:none;");
			var img_stop = document.createElement('img');
			img_stop.setAttribute("src", "/css/pause.ico");
			img_stop.setAttribute("width", "20");
			img_stop.setAttribute("height", "20");
			button_pause.appendChild(img_stop);
			item.appendChild(button);
			item.appendChild(button_pause);
			var itemInfo = document.createElement("div");
			itemInfo.setAttribute("class", "item-info item");
			itemInfo.appendChild(document.createTextNode(the_object[i].artist + " ~ " + the_object[i].name));
			item.appendChild(itemInfo);

			var button_download = document.createElement('a');
			button_download.setAttribute("class", "button-download");
			button_download.setAttribute("title", "Download");
			button_download.setAttribute("id", "button-download_" + i);
			var img_download = document.createElement('img');
			img_download.setAttribute("src", "/css/downloads.png");
			img_download.setAttribute("target", "_blank");
			img_download.setAttribute("width", "20");
			img_download.setAttribute("height", "20");
			button_download.appendChild(img_download);
			button_download.setAttribute("href", "");
			item.appendChild(button_download);
			divGlobal.appendChild(item);
			$('#button-download_' + i).click(function() {
			    $(this).attr("href", "http://vpleer.ru" + encode(the_object[parseInt(($(this).attr("id").substr(16)))].url));
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
function playPause(play, index) {
    $("#button-play_" + index)[0].setAttribute("style", play ? "display:none;" : "");
    $("#button-pause_" + index)[0].setAttribute("style", play ? "" : "display:none;");
}
function play(el) {
    $("#jquery_jplayer").jPlayer("setMedia", {
	mp3: "http://vpleer.ru" + encode(the_object[el].url),
	title: the_object[el].artist + " ~ " + the_object[el].name
    });
    $("#jquery_jplayer").jPlayer("option","mp3", "http://vpleer.ru" + encode(the_object[el].url));
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