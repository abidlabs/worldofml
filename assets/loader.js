// var content = 
// {
// 	"kl_divergence":{"video_url":"https://www.youtube.com/watch?v=iYYX0M4sp1g"},
// 	"information_entropy":{"video_url":"https://www.youtube.com/watch?v=LodZWzrbayY"},
// 	"k_means":{"video_url":"https://www.youtube.com/watch?v=_aWzGGNrcic"},
// 	"spectral_clustering":{
// 		"title":"Spectral Clustering",
// 		"video_url":"https://www.youtube.com/watch?v=P-LEH-AFovE"}
// 	"agglomerative_clustering":{"video_url":"https://www.youtube.com/watch?v=XJ3194AmH40"}
// }


// var prereqs = 
// {
// 	"kl_divergence":[
// 		"information_entropy",
// 	],
// 	"spectral_clustering":[
// 		"k_means",
// 	],
// 	"agglomerative_clustering":[
// 		"k_means",
// 	]
// }

//a function to retrieve GET parameters from the URL
var qs = (function(a) {
    if (a == "") return {};
    var b = {};
    for (var i = 0; i < a.length; ++i)
    {
        var p=a[i].split('=', 2);
        if (p.length == 1)
            b[p[0]] = "";
        else
            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
    }
    return b;
})(window.location.search.substr(1).split('&'));

function setTitle(id, slug){
    var title = content[slug]['title'];
    $('#title').html(title);
    //$('#title').html(id + '. ' + title);
}

function setVideo(slug){
    var url = content[slug]['video_url'];
    var embed_url = url.replace("watch?v=", "embed/");
    $('#videoEmbedIframe').attr('src', embed_url)
    //$('#title').html(id + '. ' + title);

}

//Helper method to convert a string in ISO 8601 format to a more readable format
function parseDuration(iso8601Duration) {
    var iso8601DurationRegex = /(-)?P(?:([\.,\d]+)Y)?(?:([\.,\d]+)M)?(?:([\.,\d]+)W)?(?:([\.,\d]+)D)?T(?:([\.,\d]+)H)?(?:([\.,\d]+)M)?(?:([\.,\d]+)S)?/;

    var matches = iso8601Duration.match(iso8601DurationRegex);

    return {
        sign: matches[1] === undefined ? '+' : '-',
        years: matches[2] === undefined ? 0 : matches[2],
        months: matches[3] === undefined ? 0 : matches[3],
        weeks: matches[4] === undefined ? 0 : matches[4],
        days: matches[5] === undefined ? 0 : matches[5],
        hours: matches[6] === undefined ? 0 : matches[6],
        minutes: matches[7] === undefined ? 0 : matches[7],
        seconds: matches[8] === undefined ? 0 : matches[8]
    };
};

function setDuration(slug){
    var url = content[slug]['video_url'];
    var urlID = url.split("watch?v=")[1];
    var urlAPI =  "https://www.googleapis.com/youtube/v3/videos?"
    
    $.getJSON( urlAPI, {'id':urlID, 'key':config.apiKey, 'part':'contentDetails'} )
        .done(function( json ) {
            var duration = json['items'][0]['contentDetails']['duration'];
            var readable_duration = parseDuration(duration)
            var minutes = readable_duration['minutes']
            var seconds = readable_duration['seconds']
            $('#video-duration').html(minutes + ':' + seconds)
        })
        .fail(function( jqxhr, textStatus, error ) {
            var err = textStatus + ", " + error;
            console.log( "Request Failed: " + err );
        });    
}

function setDescription(slug){
    var description = content[slug]['description'];
    if (description!=null){ //if a description is hard-coded
        $('#video-description').html(description)
        return
    }
    var url = content[slug]['video_url'];
    var urlID = url.split("watch?v=")[1];
    var urlAPI =  "https://www.googleapis.com/youtube/v3/videos?"
    $.getJSON( urlAPI, {'id':urlID, 'key':config.apiKey, 'part':'snippet'} )
        .done(function( json ) {
            var description = json['items'][0]['snippet']['description'];
            $('#video-description').html(description)
        })
        .fail(function( jqxhr, textStatus, error ) {
            var err = textStatus + ", " + error;
            console.log( "Request Failed: " + err );
        });    
}

function setSpanDuration(span_id, video_id){
    var url = content[order[video_id]]['video_url'];
    var urlID = url.split("watch?v=")[1];
    var urlAPI =  "https://www.googleapis.com/youtube/v3/videos?"
    
    $.getJSON( urlAPI, {'id':urlID, 'key':config.apiKey, 'part':'contentDetails'} )
        .done(function( json ) {
            var duration = json['items'][0]['contentDetails']['duration'];
            var readable_duration = parseDuration(duration)
            var minutes = readable_duration['minutes']
            var seconds = readable_duration['seconds']
            $('#'+span_id).html(minutes + ':' + seconds)
        })
        .fail(function( jqxhr, textStatus, error ) {
            var err = textStatus + ", " + error;
            console.log( "Request Failed: " + err );
        });    
}

function setPrereqs(slug){
    var prereqsList = prereqs[slug]
    if (prereqsList==null)
        return //if no prereqs are listed
    for (var i = 0; i < prereqsList.length; i++) {
        req = prereqsList[i]
        idx = order.indexOf(req)
        title = content[order[idx]]['title']
        $('#prereqsList').append('<li><a href="?id='+idx+'">'+title+'</a> [<span id="prereq-'+i+'">4:23</span>]</li>')
        setSpanDuration('prereq-'+i, idx);        
    } 
    $('#prereqsCount').html(prereqsList.length)
}

function setPostreqs(slug){
    var postreqsList = [];
    for (var key in prereqs) {
        // first check is just to make sure they are valid keys, and the second checks to see if that key has 'slug' as one of the prepreqs
        if (prereqs.hasOwnProperty(key) && prereqs[key].indexOf(slug)>-1) {
            postreqsList.push(key);
        }
    }
    
    if (postreqsList.length==0)
        return //if no postreqs are listed

    console.log(postreqsList)
    for (var i = 0; i < postreqsList.length; i++) {
        req = postreqsList[i]
        idx = order.indexOf(req)
        title = content[order[idx]]['title']
        $('#postreqsList').append('<li><a href="?id='+idx+'">'+title+'</a> [<span id="postreq-'+i+'">4:23</span>]</li>')
        setSpanDuration('postreq-'+i, idx);
    } 
    $('#postreqsCount').html(postreqsList.length)
}

function renderHomepage(){
    $("#main-row").html('<div class="jumbotron"><div class="container"><h2 style="text-align:center">Learn Machine Learning...</h2><p></p>&nbsp;<p style="text-align:center">from well-explained videos</p><p style="text-align:center">with defined prerequisites</p><p style="text-align:center">curated by the crowd</p>      </div> </div><p style="text-align:center"><a class="btn btn-primary btn-lg" href="#" role="button">Intro Video &raquo;</a> &nbsp; <a class="btn btn-success btn-lg" href="#" role="button">Random &raquo;</a>  </p>');
}


var id = qs["id"]; //gets the GET parameter 'id' from the URL
if (id==null){ //no ID provided
    //In the future, show a home page with a jumbotron and two 
    // buttons: "start from beginning" and "random video"
    // Underneath, show screenshots of list view 
    // as well as graph view
    renderHomepage();
} else if (order[id]==null) {
    $('body').html('Something went wrong... probably an invalid ID');
} else {
    slug = order[id];
    setTitle(id, slug);
    setVideo(slug);
    setPrereqs(slug);
    setPostreqs(slug);
    setDuration(slug);
    setDescription(slug);
}
