var titles = [];
for (var i=0; i<order.length; i++) {
    titles.push(content[order[i]]['title'])
}

$("#mobile-search-bar").typeahead({
    source:titles,  
    afterSelect: function (item) {
        var idx = titles.indexOf(item)
        if (idx>-1) {
            window.location.href = "video.html?id="+idx;
        }
    }
});
