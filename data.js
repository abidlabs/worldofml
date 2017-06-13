/*
The variable 'content' stores primary information about all topics, including key/slug (required), video_url (required), title, etc.
*/

var content = 
{
	"intro_ml":{
		"title":"Introduction to Machine Learning",
		"video_url":"youtube.com",
		"description":"This video serves as an introduction both to machine learning as well as how to use this site",
	},
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
	"k_means":{
		"title":"K-means Clustering",
		"video_url":"https://www.youtube.com/watch?v=_aWzGGNrcic",
		"description":"The K-means algorithm starts by placing K points (centroids) at random locations in space. We then perform the following steps iteratively: (1) for each instance, we assign it to a cluster with the nearest centroid, and (2) we move each centroid to the mean of the instances assigned to it. The algorithm continues until no instances change cluster membership."
	},
	"spectral_clustering":{
		"title":"Spectral Clustering",
		"video_url":"https://www.youtube.com/watch?v=P-LEH-AFovE",
		"description":'In multivariate statistics and the clustering of data, spectral clustering techniques make use of the spectrum (eigenvalues) of the similarity matrix of the data to perform dimensionality reduction before clustering in fewer dimensions. The similarity matrix is provided as an input and consists of a quantitative assessment of the relative similarity of each pair of points in the dataset. In application to image segmentation, spectral clustering is known as segmentation-based object categorization.'
	},
	"monte_carlo_method":{
		"title":"Monte Carlo Method",
		"video_url":"https://www.youtube.com/watch?v=5nM5e2_1OQ0",
	},
	"mcmc":{
		"title":"Markov Chain Monte Carlo (MCMC)",
		"video_url":"https://www.youtube.com/watch?v=12eZWG0Z5gY",
	},
	"markov_chain":{
		"title":"Markov Chains",
		"video_url":"https://www.youtube.com/watch?v=nnssRe5DewE",
	},
	"importance_sampling":{
		"title":"Importance Sampling",
		"video_url":"https://www.youtube.com/watch?v=S3LAOZxGcnk",
		"description":"In statistics, importance sampling is a general technique for estimating properties of a particular distribution, while only having samples generated from a different distribution than the distribution of interest."
	}
	// "agglomerative_clustering":{"video_url":"https://www.youtube.com/watch?v=XJ3194AmH40"},
}

//This is actually the reverse order, making it easier to add new elements (they can be just added to the beginning)
var order = [
	"intro_ml",
	"importance_sampling",
	"markov_chain",
	"mcmc",
	"monte_carlo_method",
	"information_entropy",
	"kl_divergence",
	"spectral_clustering",
	"k_means",
].reverse();

/*
Future Topics
- Rejection sampling
- variational inferece / methods
- Message passing
*/

/*
The variable 'prereqs' stores relational information that describes which videos are prereqs of other videos.
*/

var prereqs = 
{
	"k_means":[
		"intro_ml"
	],
	"information_entropy":[
		"intro_ml"
	],
	"monte_carlo_method":[
		"intro_ml"
	],
	"markov_chain":[
		"intro_ml"
	],
	"kl_divergence":[
		"information_entropy",
		"intro_ml",
	],
	"spectral_clustering":[
		"k_means",
		"intro_ml",
	],
	"mcmc":[
		"monte_carlo_method",
		"markov_chain",
	],
	"importance_sampling":[
		"monte_carlo_method",
		"intro_ml",
	]
}

/* Git integration tests that should be done
1. Everything that is in 'order' is defined in content (vice versa doesn't have to be true)
2. Everything value (and key I guess because of postrequisites) that is in 'prereqs' should be in both 'order' and in 'content' 
3. No videos longer than 20 minutes or shorter than 2 minutes 
4. No duplicate slugs in any of the arrays
5. All of the javascript runs without syntax errors
6. Nothing should have more than 5 immediate prereqs or postreqs (maybe except "intro_ml")
7. Evertything needs to have at least one prereq (except "intro_ml")
In theory, we could do a check on the front end for these if git integration tests are hard to set up

*/