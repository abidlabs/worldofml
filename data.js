/*
The variable 'content' stores primary information about all topics, including key/slug (required), video_url (required), title, etc.
*/

var content = 
{
	"kl_divergence": {
		"title":"K-L Divergence (Relative Entropy)",
		"video_url":"https://www.youtube.com/watch?v=iYYX0M4sp1g",
		"description":"By considering the inefficiency due to using the wrong probability distribution to design a code using Shannon coding, we arrive at the relative entropy."
	},
	"information_entropy": {
		"title":"Entropy (Information Theory)",
		"video_url":"https://www.youtube.com/watch?v=LodZWzrbayY",		
	},
	// "information_entropy":{"video_url":""},
	// "k_means":{"video_url":"https://www.youtube.com/watch?v=_aWzGGNrcic"},
	// "spectral_clustering":{
	// 	"title":"Spectral Clustering",
	// 	"video_url":"https://www.youtube.com/watch?v=P-LEH-AFovE"}
	// "agglomerative_clustering":{"video_url":"https://www.youtube.com/watch?v=XJ3194AmH40"},
}

var order = [
	"information_entropy",
	"kl_divergence",
]

/*
The variable 'prereqs' stores relational information that describes which videos are prereqs of other videos.
*/


var prereqs = 
{
	"kl_divergence":[
		"information_entropy",
	],
	"spectral_clustering":[
		"k_means",
	],
	"agglomerative_clustering":[
		"k_means",
	]
}

/* Git integration tests that should be done
1. Everything that is in 'order' is defined in content (vice versa doesn't have to be true)
2. Everything value (and key I guess because of postrequisites) that is in 'prereqs' should be in both 'order' and in 'content' 
3. No videos longer than 20 minutes or shorter than 2 minutes 
4. No duplicate slugs in any of the arrays

In theory, we could do a check on the front end for these if git integration tests are hard to set up

*/