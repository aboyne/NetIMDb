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
		setResults(result.imdbRating,result.tomatoMeter	);
	}
	else{
		//If the initial query contained the year but failed, we should try again without the year
		if ( year != 0 ){
			year = 0;
			getRating(title,year);
		}	
		else{
			setResults("Unknown","Unknown");
		}
	}
}

//Handle ajax errors
function ajaxFailed(result) {
	addResults(undefined);
}

//This function handles adding the results to the page
function setResults(imdb,tomato){
		imdbRating = imdb;
		tomatoMeter = tomato;
		if ( pageType == "LIST" ){
			//Create the div for the results
			if($(".bobMovieHeader").children(".year").children(".ratings").length == 0){
				$(".bobMovieHeader").children(".year").append("<div class='ratings'></div>");
			}
			
			ratingsInfo = title=$(".bobMovieHeader").children(".year").children(".ratings");
			ratingsInfo.empty();
			
			ratingsInfo.append("<hr>");
			ratingsInfo.append("<div>IMDb: "+imdbRating);
			ratingsInfo.append("<div>Rotten Tomatoes: "+tomatoMeter+"%");
			ratingsInfo.append("<hr>");
		}
		else{
			ratingsInfo = $(".ratingsInfo");
			ratingsInfo.append("<br>");
			ratingsInfo.append("<div class='starbar starbar-pred stbrWrapStc clearfix'><p class='label'>IMDb: </p><span class='rating'> "+imdbRating+" </span></div>");
			ratingsInfo.append("<div class='starbar starbar-avg stbrWrapStc clearfix'><p class='label'>Rotten Tomatoes: </p><span class='rating'> "+tomatoMeter+"% </span></div>");
		}
}

// Gets the title and year from the page and calls getRating to find the results
function newRatings(){
	if(pageType=="LIST"){
		title=$(".bobMovieHeader").children(".title").text();
		year=$(".bobMovieHeader").children(".year").text().split('-')[0];
		if(lastTitle!=title){
			lastTitle=title
			getRating(title,year)
		}
		else{
			setResults(imdbRating,tomatoMeter);
		}
	}
	else{
		title = $('.title-wrapper').children('.title').text();
		year = $('.titleArea').children(".year").text().split('-')[0];
		getRating(title,year);
	}
}

//returns which page we are on
function pageType(){
	if ($("body").attr("id") == "page-WiHome"){
		return "LIST";
	}
	else{
		return "DETAIL";
	}
}
var lastTitle = "";
var year = 0;
var imdbRating = "Unknown";
var tomatoMeter = "Unknown";
var pageType = pageType();

//Need to periodically check the page for a hovered movie if this is a list.
if (pageType == "LIST"){
	setInterval(newRatings, 2000);
}
else{
	newRatings();
}

