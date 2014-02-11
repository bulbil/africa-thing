// 				<コ:彡
//
//africa-thing
// 
//
// nabil kashyap (www.nabilk.com)
// hodge podge of things to get this web/essay off the ground

var at = {

	width: $(window).width(),
	panels: $("div.panel").size(),
	border: $(window).width() / $("div.panel").size(),
	anchors: [],

	resize: function() {

		$("div.panel").wrap("<div class='outer'>");
		$("div.outer").css("width", at.width + at.border);
		$(".panel").css("width", at.width);
		$("body").css("width", (at.panels + 1) * at.width);
		at.title('title');
	},

	index: function(bool){

		$.getJSON('http://www.nabilk.com/africa-thing/json.php?callback=?', function(d){

			if(bool === false) {

				if(d.row_count !== d.row_check) at.updatePhotos(d,'change');
				else console.log('update exit'); at.updatePhotos(d,'exit');

			} else { at.updatePhotos(d,'change'); }
			
		});		
	},

	updatePhotos: function(d,p) {
		var photos = [];
		switch(p) {

			case('change'):

				var tags = $.map(d.emails, function(e) { return e.subject; })
				$.each(tags, function(i, f) {
					
					var url = "http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=4cb30dd217e4e782643dbeac982b4b50&tags=" + f + "&sort=relevance&format=json&jsoncallback=?";

					$.getJSON(url, function(g){

						for(var i = 0; i < 3; i++) {
							Object.defineProperty(g.photos.photo[i], "tag", {value : f});
							photos.push(g.photos.photo[i]);
						}

						at.addPhotos(photos);
					});
				});
				break;

			case('exit'):
				at.remove();
				break;
		}
	},

	remove: function() {

		d3.select("div#overlay").selectAll("img")
			.transition()
			.duration(500)
			.style("opacity", 0)
			.remove();
	},

	oldPhotos: function(data) {

		var overlay = d3.select("div#overlay").selectAll("img.flickr")
			.data(data);

		overlay.exit()
			.transition()
			.delay(function(d, i) { return 500 * ++i; })
			.duration(function(d, i) { return 500 * ++i; })
			.style("opacity", 0)			
			.remove();

		overlay.enter()
			.append("img")
			.attr("class", "flickr")
			.attr("src", function(d,i) {
					var url = 'http://farm' + d.farm + '.staticflickr.com/' 
					+ d.server + '/' + d.id + '_' + d.secret + '.jpg'; 
					return url;})
			// .style("background-image", function(d, i) {
			// 	var url = 'url("http://farm' + d.farm + '.staticflickr.com/' 
			// 	+ d.server + '/' + d.id + '_' + d.secret + '.jpg")'; 
			// 	console.log(url);
			// 	return url;})
				// return 'url("img/' + i + '.jpg")'; })
			.style("opacity", 0)
			.transition()
			.delay(function(d,i) { return 500 * ++i;})
			.duration(function(d, i) { return 1000 * ++i;})
			.style("opacity", 9);
	},	

	addPhotos: function(data) {


		var n = $("img.flickr").length;
		var p = data.length;

		var offset = 5000;

		console.log("n " + n);
		console.log("p " + p);

		// overlay.transition()
		// 	// .delay(function(d,i) { return offset * i/n; } )			
		// 	.delay(function() { console.log('remove'); return 0;})
		// 	.duration(200)
		// 	.style("opacity", 0)
		// 	.remove();
		$("img.flickr").removeClass("flickr")
			.addClass("old");


		d3.select("div#overlay").selectAll("img.flickr")
			.data(data)
			.enter()
			.append("img")
			.classed("flickr", true)
			.attr("src", function(d,i) {
					var url = 'http://farm' + d.farm + '.staticflickr.com/' 
					+ d.server + '/' + d.id + '_' + d.secret + '.jpg'; 
					return url;})
			.style("opacity", 0)
			.transition()
			.delay(function(d,i) { return offset * i/p; } )
			.duration(1500)
			.style("opacity", function() {return Math.random(); });

		$("img.old").fadeTo(500, 0).remove();
	},

	addPhoto: function(d){
		$("img.flickr").fadeTo(2000, .25).remove();
		$("div#overlay").append("<img class='flickr'>");
		$("img.flickr").attr("src", function() {
					
					var url = 'http://farm' + d.farm + '.staticflickr.com/' 
					+ d.server + '/' + d.id + '_' + d.secret + '.jpg'; 
					return url;
			})
			.css("opacity", 0)
			.fadeTo(1000, 1);
	},

	title: function(p, bool) {

		var heading = "preamble to an essay on africa";
		heading = heading.split(" ");
		var poem = "what were we then before the being of ourselves began nothing so far but strangeness there the movements of mind return nearly place was lost in that we went to stranger places nothing so far but merely the long familiar pang never having gone";
		poem = poem.split(" ");
		var data = (p == 'title') ? heading : poem;

		var n = data.length;
		function rand(n) { return Math.floor(Math.random() * n); }

		var titling = d3.select("div#preamble div.title h1").selectAll("span");
		
		titling.transition()
			.duration(1000)
			.delay(function(d,i) { return rand(n)/n * 200})
			.style("opacity", 0)
			.remove();

		titling = titling.data(data);

		titling.enter()
			.append("span")
			.text(function(d, i) { if(i < 13) return (p !== 'title') ? data[rand(n)] + " " : d + " "; })
			.style("opacity", 0)
			.transition()
			.duration(500)
			.delay(function(d,i) { return rand(n)/n * 500})
			.style("opacity", 1);
	},

	instructions: function(bool) {
		console.log(bool);
		var instructions = $('div#instructions');

		instructions.css("opacity", bool)
			.fadeTo(1000, bool);
	},

	slideshow: function(bool) {

		var n = 65;
		var rand = Math.floor(Math.random() * n);
		console.log('rand ' + rand);

		var slides = $("div#slideshow div");

		slides.find("img")
			.remove();

		slides.find("div")
			.remove();
		
		if(rand < 55) {
			slides.append("<img>")
				.find("img")
				.attr("src", "img/slideshow/" + rand + ".jpg")
				.css("margin-left", "100%")
				.animate({marginLeft: "-200%"}, 3000);
		} else {

			slides.append("<div>")
				.find("div")
				.attr("class", "block")
				.css("width", function() { console.log((rand/n * 100) + "%"); return (rand/n * 100) + "%";})
				.css("margin-left", "100%")
				.animate({marginLeft: "-200%", easing: 'linear'}, rand/n * 3000);
		}
	}
}

$(document).ready(at.resize());

at.videoFeed = new Jscii({

	container: document.getElementById("jscii-webrtc"),
	el: document.getElementById("webrtc"),
	webrtc: true

});

var fBool = vBool = tBool = iBool = wBool = sBool
 = false;
 
$(document).keydown(function(d) { 

	console.log('keyCode ' + d.keyCode);
	var xCurrent = $(window).scrollLeft();
	var panelWidth = at.width + at.border;

	function skipAround(offset){
		offset = (offset < 0) ? 0 : offset;
		var end = $("body").width() - panelWidth;
		if(offset > end) offset = xCurrent;
	    $('html,body').animate( {scrollLeft: offset } , 'slow');
	}

	switch(d.keyCode) {

		//down arrow
		case(40): $("img.flickr").remove(); break;
		//e
		case(69): $(window).scrollLeft(at.width * at.panels - at.border); break;
		//f
		case(70):
			
			at.remove();
			if(!fBool) { 
				clearInterval(at.indexTimer); 
			}
			at.indexTimer = setInterval( function() { at.index(fBool); }, 6000);			
			fBool = !fBool;
			break;

		//h
		case(72): $(window).scrollLeft(0); break;
		//i
		case(73): iBool = !iBool; at.instructions(iBool); break;
		// left arrow + j
		case(74):
		case(37): skipAround(xCurrent - panelWidth); break;
		// right arrow + l
		case(76):
		case(39): skipAround(xCurrent + panelWidth); break;
		// space
		case(32): 

			if(vBool) at.videoFeed.play();
			else at.videoFeed.pause();
			vBool = !vBool;
			break;

		// s
		case(83): 
				if(sBool) clearInterval(at.slideTimer);
				else at.slideTimer = setInterval(function() {at.slideshow(sBool) }, 4000) ; 
				sBool = !sBool; 
				break;
		// t
		case(84): 
			tBool = !tBool;
			if(!tBool) clearInterval(at.titleTimer);
			else at.titleTimer = setInterval( function() { at.title() }, 3000);
			break;
		// w
		case(87):
			$("iframe")
				.fadeTo(500, !wBool)
				.attr("src", function(){ 
					url = (!wBool) ? "http://www.marrakeshdining.com/" : ""; 
					return url;
				});
			wBool = !wBool;
			break;

	}

	;})

$("div.iframe").click(function() { 
	
	$("iframe")
		.css("opacity", 0)
		.attr("src", function(){ 
		url = (!wBool) ? "http://www.marrakeshdining.com/" : ""; 
		return url;
		})
		.fadeTo(1000, 1);

	wBool = !wBool;
});