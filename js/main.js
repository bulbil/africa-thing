// 				<コ:彡
//
//africa-thing
// 
//
// nabil kashyap (www.nabilk.com)
// hodge podge of things to get this web/essay off the ground

var at = {

	photos: [],

	index: function(){

		$.getJSON('http://localhost:8888/sftp/africa-thing/json.php', function(d){

			for (i in d) {
				var tag = d[i].subject;
				at.updatePhotos(tag);
				}
			});

		function purge() { console.log('purge'); at.photos = []; }
		purge();
		},

	updatePhotos: function(tag) {

			var url = "http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=4cb30dd217e4e782643dbeac982b4b50&tags=" + tag + "&sort=relevance&format=json&jsoncallback=?";
			$.getJSON(url, function(d){
				Object.defineProperty(d.photos.photo[0], "tag", {value : tag});
				at.photos.push(d.photos.photo[0]);
				at.addPhotos();
			});
		},

	addPhotos: function() {

		var overlay = d3.select("div#overlay").selectAll("img.flickr")
			.data(at.photos, function() { console.log(at.photos); });

		overlay.exit()
			.transition()
			.duration(function(d) { console.log('Exit'); return 100;})
			.style("opacity", 0)			
			.remove();

		overlay.enter()
			.append("img")
			.attr("class", "flickr")
			.style("opacity", 0)
			.transition()
			.duration(5000 * at.photos.length)
			.style("opacity", 1)
			.transition()
			.style("opacity", 0)			
			.remove();

		overlay.property("src", function(d){
				return "http://farm" + d.farm + ".staticflickr.com/" + d.server + "/" + d.id + "_" + d.secret + ".jpg";
			});
		}
	}

setInterval(at.index, 5000);

var webcam = new Jscii({

	container: document.getElementById("jscii-webrtc"),
	el: document.getElementById("webrtc"),
	webrtc: true
});

$(document).keydown(function(d) { 

	var panelWidth = $(document).width() / $("div.panel").size();
	console.log('fire ' + d.keyCode);
	var xCurrent = $(document).scrollLeft();
	
	function skipAround(offset){
		offset = (offset < 0) ? 0 : offset;
	    $('html,body').animate( {scrollLeft: offset } , 'slow');
	}

	switch(d.keyCode) {
		case(37): skipAround(xCurrent - panelWidth); break;
		case(39): skipAround(xCurrent + panelWidth); break;
		case(13): webcam.play(); break;
		case(32): webcam.pause(); break;
	}

	;})