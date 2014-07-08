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
		    var div13 = document.createElement('div');
			div13.setAttribute("id", "container");


			var div14 = document.createElement('div');
			div14.setAttribute("id", "content_main");
			
			div13.appendChild(div14);
			divGlobal.appendChild(div13);
		    for (i = 0; i < the_object.length; i++) {
			var div = document.createElement('div');
			div.setAttribute("id", "jquery_jplayer_" + i);
			div.setAttribute("class", "jp-jplayer");
			div14.appendChild(div);


			var div2 = document.createElement('div');
			div2.setAttribute("id", "jp_container_" + i);
			div2.setAttribute("class", "jp-audio");
			div14.appendChild(div2);

			var div3 = document.createElement('div');
			div3.setAttribute("class", "jp-type-single");
			div2.appendChild(div3);

			var div4 = document.createElement('div');
			div4.setAttribute("class", "jp-gui jp-interface");
			div3.appendChild(div4);

			var ul1 = document.createElement('ul');
			ul1.setAttribute("class", "jp-controls");

			var li1 = document.createElement('li');
			var a1 = document.createElement('a');
			a1.setAttribute("href", "javascript:;");
			a1.setAttribute("class", "jp-play");
			a1.setAttribute("tabindex", "1");
			li1.appendChild(a1);
			ul1.appendChild(li1);

			var li2 = document.createElement('li');
			var a2 = document.createElement('a');
			a2.setAttribute("href", "javascript:;");
			a2.setAttribute("class", "jp-pause");
			a2.setAttribute("tabindex", "1");
			li2.appendChild(a2);
			ul1.appendChild(li2);

			var li3 = document.createElement('li');
			var a3 = document.createElement('a');
			a3.setAttribute("href", "javascript:;");
			a3.setAttribute("class", "jp-stop");
			a3.setAttribute("tabindex", "1");
			li3.appendChild(a3);
			ul1.appendChild(li3);

			var li4 = document.createElement('li');
			var a4 = document.createElement('a');
			a4.setAttribute("href", "javascript:;");
			a4.setAttribute("class", "jp-mute");
			a4.setAttribute("tabindex", "1");
			a4.setAttribute("title", "mute");
			li4.appendChild(a4);
			ul1.appendChild(li4);

			var li5 = document.createElement('li');
			var a5 = document.createElement('a');
			a5.setAttribute("href", "javascript:;");
			a5.setAttribute("class", "jp-unmute");
			a5.setAttribute("tabindex", "1");
			a5.setAttribute("title", "unmute");
			li5.appendChild(a5);
			ul1.appendChild(li5);

			var li6 = document.createElement('li');
			var a6 = document.createElement('a');
			a6.setAttribute("href", "javascript:;");
			a6.setAttribute("class", "jp-volume-max");
			a6.setAttribute("tabindex", "1");
			a6.setAttribute("title", "max volume");
			li6.appendChild(a6);
			ul1.appendChild(li6);
			div4.appendChild(ul1);

			var div5 = document.createElement('div');
			div5.setAttribute("class", "jp-progress");
			div4.appendChild(div5);

			var div6 = document.createElement('div');
			div6.setAttribute("class", "jp-seek-bar");
			div5.appendChild(div6);

			var div7 = document.createElement('div');
			div7.setAttribute("class", "jp-play-bar");
			div6.appendChild(div7);

			var div8 = document.createElement('div');
			div8.setAttribute("class", "jp-volume-bar");
			div4.appendChild(div8);

			var div9 = document.createElement('div');
			div9.setAttribute("class", "jp-volume-bar-value");
			div8.appendChild(div9);

			var div10 = document.createElement('div');
			div10.setAttribute("class", "jp-current-time");
			div4.appendChild(div10);

			var div11 = document.createElement('div');
			div11.setAttribute("class", "jp-duration");
			div4.appendChild(div11);

			var ul2 = document.createElement('ul');
			ul2.setAttribute("class", "jp-toggles");

			var li7 = document.createElement('li');
			var a7 = document.createElement('a');
			a7.setAttribute("href", "javascript:;");
			a7.setAttribute("class", "jp-repeat");
			a7.setAttribute("tabindex", "1");
			a7.setAttribute("title", "repeat");
			li7.appendChild(a7);
			ul2.appendChild(li7);

			var li8 = document.createElement('li');
			var a8 = document.createElement('a');
			a8.setAttribute("href", "javascript:;");
			a8.setAttribute("class", "jp-repeat-off");
			a8.setAttribute("tabindex", "1");
			a8.setAttribute("title", "repeat off");
			li8.appendChild(a8);
			ul2.appendChild(li8);

			div4.appendChild(ul2);

			var div12 = document.createElement('div');
			div12.setAttribute("class", "jp-details");
			div3.appendChild(div12);

			var ul3 = document.createElement('ul');

			var li9 = document.createElement('li');
			var span = document.createElement('span');
			span.setAttribute("class", "jp-title");
			li9.appendChild(span);
			ul3.appendChild(li9);
			div12.appendChild(ul3);

			div14.appendChild(div2);
			
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
			    keyEnabled: true,
			    solution:"flash"
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