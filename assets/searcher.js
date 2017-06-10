/*


function populateList(){
    for (var i = 0; i < order.length; i++) {
        item = order[i]
        title = content[order[i]]['title']
        isBasic = !(order[i] in prereqs)
        if (isBasic){
            $('#content-list').append('<a href="index.html?id='+i+'" class="list-group-item"><span class="badge badge-success">'+1+'</span>'+title+'</a>')
        } else {
            $('#content-list').append('<a href="index.html?id='+i+'" class="list-group-item"><span class="badge">'+2+'</span>'+title+'</a>')
        }
        
    } 
}

populateList();

On change
First clear search-results area
Then put this inside it
<div class="list-group" id="content-list">

</div>
Then append everything that matches
*/

function populateSearchResults(searchInput){
    for (var i = 0; i < order.length; i++) {
        item = order[i]
        title = content[order[i]]['title']
        isBasic = !(order[i] in prereqs)
        terms = searchInput.split(" ")
        isMatch = true;
        for (var t=0; t<terms.length; t++) {
            if (title.toLowerCase().indexOf(terms[t].toLowerCase())==-1){
                isMatch = false
            }            
        }
        if (isMatch)
            $('#content-list').append('<a href="index.html?id='+i+'" class="list-group-item">'+title+'</a>')
    } 
} 

var previousSearchInput = ""

$("#mobile-search-bar").on("keyup paste change", function() {
   var currentSearchInput = $(this).val();
   if (currentSearchInput!=previousSearchInput){
       $('#search-results-area').html('<div class="list-group" style="padding-left:5px" id="content-list"></div><div style="text-align:center"><a href="javascript:location.reload();">Return to Original Page</a></div>')
       //console.log(currentSearchInput);
       populateSearchResults(currentSearchInput);
       previousSearchInput = currentSearchInput; 
   } 
});
