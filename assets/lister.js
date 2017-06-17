function setRank(item){
    if (item in ranks) {return ranks[item]} //if it's already in the dictionary, return. Otherwise..
    if (!(item in prereqs)) {
        ranks[item] = 0; return 0; //if it doesn't have prereqs, it's a root node
    } else {
        prereqRanks = []
        for (var j = 0; j < prereqs[item].length; j++){
            var r = setRank(prereqs[item][j])
            prereqRanks.push(r)
        }
        r = Math.max(...prereqRanks)+1 //the triple dots are for 'spread' operator
        ranks[item] = r; return r;
    }
}

function calculateRanksRecursively(){
    var keys = Object.keys(content);
    for (var i = 0; i < keys.length; i++) {
        setRank(keys[i]);
        if (Object.keys(ranks).length==keys.length) //if all of the elements have a rank, we're done
            break
    } 
}

//this function ensures that the videos are sorted in order of depth
function sortByDepth(a, b){
    return ranks[a] - ranks[b]
}

function populateList(){
    var keys = Object.keys(content);
    var deepOrder = keys.slice().sort(sortByDepth) //ensuring that the videos are sorted in order of depth
    for (var i = 0; i < deepOrder.length; i++) {
        var item = deepOrder[i]
        var title = content[deepOrder[i]]['title']
        //var idx = order.indexOf(item);
        $('#content-list').append('<a href="video.html?id='+item+'" class="list-group-item"><span class="badge badge-toggle" data-item="'+item+'" id="badge-'+item+'">'+ranks[item]+'</span>'+title+'</a>')
        if (item in localVisitedVideos)
            $("#badge-"+item).addClass('badge-visited')
    } 
}

function bindBadges(){
    $('.badge-toggle').click(function(){
        if ($(this).hasClass('badge-visited')){
            $(this).removeClass('badge-visited')
            delete localVisitedVideos[$(this).attr('data-item')]
            window.localStorage.visitedVideos = JSON.stringify(localVisitedVideos);
        } else {
            $(this).addClass('badge-visited') 
            localVisitedVideos[$(this).attr('data-item')] = true;
            window.localStorage.visitedVideos = JSON.stringify(localVisitedVideos);
        }
        return false;
    })
}

var localVisitedVideos;
if (window.localStorage.visitedVideos == null) {localVisitedVideos = {}} else {localVisitedVideos = JSON.parse(window.localStorage.visitedVideos);}
var ranks = {};
calculateRanksRecursively();
populateList();
bindBadges();

