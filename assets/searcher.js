var titles = [];
var keys = Object.keys(content);
for (var i=0; i<keys.length; i++) {
    titles.push(content[keys[i]]['title'])
}

$("#mobile-search-bar").typeahead({
    source:titles,  
    afterSelect: function (item) {
        var idx = titles.indexOf(item)
        if (idx>-1) {
            window.location.href = "video.html?id="+keys[idx];
        }
    }
});
