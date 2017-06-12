function populateList(){
    for (var i = 0; i < order.length; i++) {
        item = order[i]
        title = content[order[i]]['title']
        isBasic = !(order[i] in prereqs)
        if (isBasic){
            $('#content-list').append('<a href="video.html?id='+i+'" class="list-group-item"><span class="badge badge-success">'+1+'</span>'+title+'</a>')
        } else {
            $('#content-list').append('<a href="video.html?id='+i+'" class="list-group-item"><span class="badge">'+2+'</span>'+title+'</a>')
        }
        
    } 
}

populateList();