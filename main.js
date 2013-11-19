// 				<コ:彡
//
//boxer
// 
//
// nabil kashyap (www.nabilk.com)
//

var at = {

	v1: "http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=4cb30dd217e4e782643dbeac982b4b50&tags=wing&sort=relevance&format=json&jsoncallback=?",
	v2: "http://api.flickr.com/services/rest/?method=flickr.commons.getInstitutions&api_key=4cb30dd217e4e782643dbeac982b4b50",
	photos: [],

	data: function(){

		$.getJSON(at.v1, 
			function(d){
				at.photos.push(d.photos.photo[0]);
				d3.select("#container").selectAll("img")
					.data(at.photos)
					.enter()
					.append("img")
					.property("src", function(d){
						console.log('fire');
						console.log(d);
						return "http://farm" + d.farm + ".staticflickr.com/" + d.server + "/" + d.id + "_" + d.secret + ".jpg";
					});
		});
	},

}

at.data();