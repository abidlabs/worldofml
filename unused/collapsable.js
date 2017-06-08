
    // var chart_config = {
    //     chart: {
    //         container: "#collapsable-example",

    //         animateOnInit: true,
            
    //         node: {
    //             collapsable: true
    //         },
    //         animation: {
    //             nodeAnimation: "easeOutBounce",
    //             nodeSpeed: 700,
    //             connectorsAnimation: "bounce",
    //             connectorsSpeed: 700
    //         }
    //     },
    //     nodeStructure: {
    //         text: {
    //             name: "1. Overview of Machine Learning",
    //             title: "► Play (6:58)",
    //         },
    //         children: [
    //             {
    //             text: {
    //                 name: "2. Linear Regression",
    //                 title: "► Play (6:58)",
    //             },
    //                 collapsed: true,
    //                 children: [
    //                     {
    //                         image: "img/figgs.png"
    //                     }
    //                 ]
    //             },
    //             {
    //                 image: "img/sterling.png",
    //                 childrenDropLevel: 1,
    //                 children: [
    //                     {
    //                         image: "img/woodhouse.png"
    //                     }
    //                 ]
    //             },
    //             {
    //                 pseudo: true,
    //                 children: [
    //                     {
    //                         image: "img/cheryl.png"
    //                     },
    //                     {
    //                         image: "img/pam.png"
    //                     }
    //                 ]
    //             }
    //         ]
    //     }
    // };

 // Array approach
    var config = {
        container: "#collapsable-example",

        animateOnInit: true,
        
        node: {
            collapsable: true
        },
        animation: {
            nodeAnimation: "easeOutBounce",
            nodeSpeed: 700,
            connectorsAnimation: "bounce",
            connectorsSpeed: 700
        }
    },
    malory = {
        text: {
            name: "1. Overview of Machine Learning",
            title: "► Play (6:58)",
        },
    },

    lana = {
        parent: malory,
        text: {
            name: "2. Linear Regression",
            title: "► Play (9:58)",
        },
    }

    figgs = {
        parent: lana,
        text: {
            name: "3. Shuffle Linear Regression",
            title: "► Play (2:58)",
        },
    }

    sterling = {
        parent: malory,
        text: {
            name: "4. Supervised Learning",
            title: "► Play (3:33)",
        },
    },


    cheryl = {
        parent: malory,
        text: {
            name: "5. Unsupervised Learning",
            title: "► Play (4:23)",
        },
    },

    pam = {
        parent: malory,
        text: {
            name: "6. Deep Learning",
            title: "► Play (13:33)",
        },
    },

    chart_config = [config, malory, lana, figgs, sterling, pam, cheryl];

