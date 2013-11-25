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

		$.getJSON('json.php', function(d){

			if(d.row_count !== d.row_check) at.updatePhotos(d,'change');
			else console.log('update exit'); at.updatePhotos(d,'exit');
			at.photos = [];
		});
		
		},

	updatePhotos: function(d,p) {

		switch(p) {

			case('change'):

				var tags = $.map(d.emails, function(e) { return e.subject; })
				
				$.each(tags, function(i, f) {
				
					var url = "http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=4cb30dd217e4e782643dbeac982b4b50&tags=" + f + "&sort=relevance&format=json&jsoncallback=?";

					$.getJSON(url, function(g){
						Object.defineProperty(g.photos.photo[0], "tag", {value : f});
						at.photos.push(g.photos.photo[0]);
						at.addPhotos(at.photos);
					});
				});
				break;

			case('exit'):
				at.addPhotos([]);
				break;
			case('test'):
				at.addPhotos([1,2,3]);
				break;
		}
		},

	addPhotos: function(data) {

		var overlay = d3.select("div#overlay").selectAll("div.flickr")
			.data(data);

		overlay.exit()
			.transition()
			.delay(function(d, i) { console.log('exit delay' + ++i); return 1000 * i; })
			.duration(function(d, i) { console.log('exit dur' + ++i); return 500 * i; })
			.style("opacity", 0)			
			.remove();


		overlay.enter()
			.append("div")
			.attr("class", "flickr")
			.style("height", function() { return $(document).height()/2 + 'px'; })
			.append("img")
			.property("src", function(d,i) {
					var url = 'http://farm' + d.farm + '.staticflickr.com/' 
					+ d.server + '/' + d.id + '_' + d.secret + '.jpg'; 
					console.log(url);
					return url;})
			// .style("background-image", function(d, i) {
			// 	var url = 'url("http://farm' + d.farm + '.staticflickr.com/' 
			// 	+ d.server + '/' + d.id + '_' + d.secret + '.jpg")'; 
			// 	console.log(url);
			// 	return url;})
				// return 'url("img/' + i + '.jpg")'; })
			.style("opacity", 0)
			.transition()
			.delay(function(d,i) { console.log('enter delay ' + i); return 500 * i;})
			.duration(function(d, i) { console.log('enter dur' + ++i); return 1000 * i;})
			.style("opacity", 1);
		}
	}

setInterval(at.index, 6000);

var webcam = new Jscii({

	container: document.getElementById("jscii-webrtc"),
	el: document.getElementById("webrtc"),
	webrtc: true
});

$(document).keydown(function(d) { 

	var panelWidth = $(document).width() / $("div.panel").size();
	console.log('keyCode ' + d.keyCode);
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