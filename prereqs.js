
/*
The variable 'prereqs' stores relational information that describes which videos are prereqs of other videos.
*/

var prereqs = 
{
	"naive_bayes":[
		"bayes_theorem",
	],
	"bayesian_network":[
		"bayes_theorem",
	],
	"bayesian_inference":[
		"bayes_theorem",
	],
	"conjugate_prior":[
		"bayesian_inference",
		"exponential_families_definition",
	],
	"gaussian_mixture_model":[
		"PSD_matrix"
	],
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