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
    $('#title').html(id + '. ' + title);
}

function setVideo(slug){
    var url = content[slug]['video_url'];
    var embed_url = url.replace("watch?v=", "embed/");
    $('#videoEmbedIframe').attr('src', embed_url)
    //$('#title').html(id + '. ' + title);

}

function setPrereqs(slug){
    var prereqsList = prereqs[slug]
    if (prereqsList==null)
        return //if no prereqs are listed
    for (var i = 0; i < prereqsList.length; i++) {
        req = prereqsList[i]
        idx = order.indexOf(req)
        title = content[order[idx]]['title']
        $('#prereqsList').append('<li><a href="?id='+idx+'">'+title+'</a> [4:23]</li>')
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

    for (var i = 0; i < postreqsList.length; i++) {
        req = postreqsList[i]
        idx = order.indexOf(req)
        title = content[order[idx]]['title']
        $('#postreqsList').append('<li><a href="?id='+idx+'">'+title+'</a> [4:23]</li>')
    } 
    $('#postreqsCount').html(postreqsList.length)
}


var id = qs["id"]; //gets the GET parameter 'id' from the URL
if (id==null){ //no ID provided
    //In the future, show a home page with a jumbotron and two 
    // buttons: "start from beginning" and "random video"
    // Underneath, show screenshots of list view 
    // as well as graph view
    $('body').html('No ID provided');
} else if (order[id]==null) {
    $('body').html('Something went wrong... probably an invalid ID');
} else {
    slug = order[id];
    setTitle(id, slug);
    setVideo(slug);
    setPrereqs(slug);
    setPostreqs(slug);
}
