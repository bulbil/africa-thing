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

		$.getJSON('http://www.nabilk.com/africa-thing/json.php', function(d){

			if(d.row_count !== d.row_check) {
				for (i in d.emails) {
					var tag = d.emails[i].subject;
					at.updatePhotos(tag);
					}
			}
			});

		at.photos = [];
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

		var overlay = d3.select("div#overlay").selectAll("div.flickr")
			.data(at.photos);

		overlay.exit()
			.transition()
			.duration(function(d, i) { console.log('Exit'); return 500 * i;})
			.style("opacity", 0)			
			.remove();

		overlay.enter()
			.append("div")
			.attr("class", "flickr")
			.style("height", function() { return $(document).height()/2 + 'px'; })
			.style("opacity", 0)
			.transition()
			.duration(1000 * at.photos.length)
			.style("opacity", 1);
			// .transition()
			// .style("opacity", 0)			
			// .remove();

		overlay.style("background-image", function(d) {
			return 'url("http://farm' + d.farm + '.staticflickr.com/' + d.server + '/' + d.id + '_' + d.secret + '.jpg")'; });
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