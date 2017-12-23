function drawGraph(svg, graph, callback, options) {
    var opts = options || {};
	var vert_dist = opts.vert_dist || 130;
	var horiz_dist = opts.vert_dist || 220;

    var svg_obj = d3.select(svg[0]);
    var line_g = svg_obj.append('g')
    var g = svg_obj.append('g')
    var height = svg.height();
    var width = svg.width();

    var levels = getLevels(graph)
    for (var i=0; i<levels.length; i++)
    {
    	var level = levels[i];
    	for (var j=0; j<level.length; j++)
    	{
    		var nodeId = level[j];
    		var node = graph[nodeId];
    		node.loc = {x: width/2 - (level.length-1)/2*horiz_dist + horiz_dist*j,
		    	y: (i+0.5) * vert_dist}
    		for (var d=0; d<node.dependencies.length; d++) {
    			drawLine(line_g, node, graph[node.dependencies[d]], opts)
    		}
		    drawBox(g, node, opts)
    	}
    }
    var drag = d3.drag();

    d3.selectAll('.box-g')
		.on("click", function() {
			callback(d3.select(this).attr('node_id'))
		})
		.call(drag);

	svgPanZoom("#"+svg.attr('id'));
}
function drawLine(g, node1, node2, opts) {
	var line = g.append("line")
		.attr("x1", node1.loc.x)
		.attr("y1", node1.loc.y)
		.attr("x2", node2.loc.x)
		.attr("y2", node2.loc.y)
		.attr("stroke", "#CCCCCC")
		.attr("stroke-width", "5")
}
function drawBox(g, node, opts) {
	var box_margin = opts.box_margin || 5;
	var font_size = opts.font_size || 12;

	var width = 190
	var height = 70
	var loc = node.loc
	var xloc = loc.x - width / 2
	var yloc = loc.y - height / 2

    var box_g = g.append("g")
    	.attr("class", "box-g")
    	.attr('node_id', node.id)
    box_g.append('rect')
    	.attr('class', 'box')
    	.attr('class', 'shape')
    	.attr('fill', node.fill_color)
    	.attr('x', xloc)
    	.attr('y', yloc)    	
    	.attr('width', width)
    	.attr('height', height)
    	.attr('rx', 2)
    box_g.append('circle')
    	.attr('class', 'box-circle')
    	.attr('stroke', node.fill_color)
    	.attr('cx', loc.x - width / 2)
    	.attr('cy', loc.y)
    	.attr('r', height / 4 - 2)
    var textbox = box_g.append('text')
    	.attr('x', loc.x + height / 8 - 2)
    	.attr('y', loc.y)
    	.text(node.description)
    	.call(wrap, width * 0.85)
}

function getLevels(graph) {
	var nodeLevels = new Array(graph.length);
	var depths = {};
	var levels = [];
	var nodeIds = Object.keys(graph)
	while (Object.keys(depths).length < Object.keys(graph).length)
	{
		for (var i=0; i<nodeIds.length; i++)
		{
			var nodeId = nodeIds[i]
			var node = graph[nodeId]
			if (nodeId in depths) {
				continue;
			}
			var dependencyFlag = true;
			var maxDependency = 0;
			for (var d=0; d<node.dependencies.length; d++)
			{
				var dependency = node.dependencies[d];
				if (!(dependency in depths)) {
					dependencyFlag = false;
					break;
				}
				maxDependency = Math.max(maxDependency, 1 + depths[dependency])
			}
			if (dependencyFlag) {
				depths[nodeId] = maxDependency
				if (levels.length < maxDependency + 1) {
					levels.push([])
				}
				levels[maxDependency].push(nodeId)
			}
		}
	}
	return levels
}

function wrap(text, width) {
  text.each(function() {
    var text = d3.select(this),
        words = text.text().split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 24,
        y = text.attr("y"),
        x = text.attr("x"),
        tspan = text.text(null).append("tspan").attr("x", x).attr("y", y),
        lines = []
    while (word = words.pop()) {
      line.push(word);
      tspan.text(line.join(" "));
      if (tspan.node().getComputedTextLength() > width) {
        line.pop();
        lines.push(line);
        tspan.text(line.join(" "));
        line = [word];
        tspan = text.append("tspan").attr("x", x).attr("y", y).text(word);
      }
    }
    lines.push(line);
    text.selectAll("*").remove();
    for (var i=0; i<lines.length; i++) {
        var lineText = lines[i].join(" ");
        text.append("tspan")
            .attr("y", parseFloat(y) + lineHeight*i - (lines.length-1)/2*lineHeight )
            .attr("x", x)
            .text(lineText);
    }
  });
}
