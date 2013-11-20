// 				<コ:彡
//
//boxer
// 
//
// nabil kashyap (www.nabilk.com)
//

var at = {

	photos: [],

	data: function(){

		$.getJSON('http://localhost:8888/sftp/africa-thing/json.php', function(d){

			for (i in d) {
				var tag = d[i];
				at.getPhoto(tag);
				}	
			});
		},

	getPhoto: function(tag) {

				var url = "http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=4cb30dd217e4e782643dbeac982b4b50&tags=" + tag + "&sort=relevance&format=json&jsoncallback=?";
				$.getJSON(url, function(d){
					Object.defineProperty(d.photos.photo[0], "tag", {value : tag});
					at.photos.push(d.photos.photo[0]);
					at.addPhotos();
				});

		},

	addPhotos: function() {

		d3.select("#container").selectAll("div.group")
			.data(at.photos)
			.enter()
			.append("div")
			.attr("class", "group")
			.append("h3")
			.text(function(d){return d.tag;})
			.append("img")
			.property("src", function(d){
				console.log(d);
				return "http://farm" + d.farm + ".staticflickr.com/" + d.server + "/" + d.id + "_" + d.secret + ".jpg";
			});
		}
	}
at.data();