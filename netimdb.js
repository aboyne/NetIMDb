//Function to do the actual query for the IMDB data
function getRating(title,year) {
	if(year!=0)
	{
		urlToQuery = "http://www.omdbapi.com/?t=" + title + "&tomatoes=true&y=" + year;
	}
	else{
		urlToQuery = "http://www.omdbapi.com/?t=" + title + "&tomatoes=true";
	}
	
	$.ajax({
		type: "GET",
		url: urlToQuery,
		dataType: "json",
		async: false,
		success: ajaxSuccess,
		error: ajaxFailed
	});
}

//When results are returned, this function adds them to the page
 function ajaxSuccess(result) {
	if (result.imdbRating != undefined){
		ratingsInfo.append("<br>");
		ratingsInfo.append("<div class='starbar starbar-pred stbrWrapStc clearfix'><p class='label'>IMDb: </p><span class='rating'> "+result.imdbRating+" </span></div>");
		ratingsInfo.append("<div class='starbar starbar-avg stbrWrapStc clearfix'><p class='label'>Rotten Tomatoes: </p><span class='rating'> "+result.tomatoMeter+"% </span></div>");
	}
	else{
		//If the initial query contained the year but failed, we should try again without the year
		if ( year != 0 ){
			year = 0;
			getRating(title,year);
		}	
		else{
			ratingsInfo.append("<br>");
			ratingsInfo.append("<div class='starbar starbar-pred stbrWrapStc clearfix'><p class='label'>IMDB: </p><span class='rating'> unknown </span></div>");
			ratingsInfo.append("<div class='starbar starbar-avg stbrWrapStc clearfix'><p class='label'>Rotten Tomatoes: </p><span class='rating'> unknown </span></div>");	
		}
	}
}

//Handle ajax errors
function ajaxFailed(result) {
	ratingsInfo.append("<br>");
	ratingsInfo.append("<div class='starbar starbar-pred stbrWrapStc clearfix'><p class='label'>IMDB: </p><span class='rating'> unknown </span></div>");
	ratingsInfo.append("<div class='starbar starbar-avg stbrWrapStc clearfix'><p class='label'>Rotten Tomatoes: </p><span class='rating'> unknown </span></div>");
}

//Get the parameters we will be using
var ratingsInfo = $(".ratingsInfo");
var title = $('.title-wrapper').children('.title').text();
var year = $('.titleArea').children(".year").text().split('-')[0];

//Get the imdb data, will use the year first to try and ensure we get the right title.
getRating(title,year)
