define(function(require, exports, module) {
    "use strict";
    
    /*
     * @param 
     * x: 横轴起点
     * y: 纵轴起点
     * w: 宽度
     * h: 高度
     * wv: 横轴刻度数
     * hv：纵轴刻度数
     * color: 边框颜色
     */
    Raphael.fn.drawGrid = function (x, y, w, h, wv, hv, color) {
        color = color || "#000";
        var path = ["M", Math.round(x) + .5, Math.round(y) + .5, "L", Math.round(x + w) + .5, Math.round(y) + .5, Math.round(x + w) + .5, Math.round(y + h) + .5, Math.round(x) + .5, Math.round(y + h) + .5, Math.round(x) + .5, Math.round(y) + .5],
            rowHeight = h / hv,
            columnWidth = w / wv;
        this.path(path.join(",")).attr({stroke: color, 'stroke-width': '2px'});
        
        var path = [];
        for (var i = 1; i < hv; i++) {
            path = path.concat(["M", Math.round(x) + .5, Math.round(y + i * rowHeight) + .5, "H", Math.round(x + w) + .5]);
        }
        for (i = 1; i < wv; i++) {
            path = path.concat(["M", Math.round(x + i * columnWidth) + .5, Math.round(y) + .5, "V", Math.round(y + h) + .5]);
        }
        return this.path(path.join(",")).attr({stroke: '#ddd', 'stroke-width': '1px'});
    };
   	
    var ChartView = Backbone.View.extend({
        container: '',
        className: 'chart-svg',
        
    	initialize: function() {
    		this.container = this.options.container;
        },
        
        redrawColumnChart: function(data, instId, flag){
        	if(data.length){
        		this.$el.html('');
        		this.drawColumnChart(data, instId, flag);
        	}
        },
        
        drawColumnChart: function(data, instId, flag){
        	var width = this.container.width(),
        		height = this.container.height();
        	
        	var gutter = 3, // 柱子间隙
        		x = 40,
        		y = 10,
        		wh = (width - 10 - x)/(data.length+1),
        		vh = (height - 50 - y)/4;
        	var r = Raphael(this.el, width, height);
        	
        	var grid = r.drawGrid(x, y, width - 10 - x, height - 50 - y, data.length+1, 4, "#545454");

    		// 横轴标签
			var maxValue = 0, minValue = 100, totalValue = 0;
    		for(var i = 0; i < data.length; i++){
    			if(data.length == 36){
	    			var label = r.text((i+1)*wh + x, height - 50, data[i].instName).attr({
			    		'font-family': 'Helvetica, Arial',
			    		'font-size': '12px',
			    		'text-anchor': 'start'
		    		});
    		    	$(label.node).css({
    		    		'writing-mode': 'tb'
    		    	});
		    	} else {
		    		var label = r.text((i+1)*wh + x, height - 40, data[i].date).attr({
			    		'font-family': 'Helvetica, Arial',
			    		'font-size': '12px'
		    		});
		    	}
		    	
		    	maxValue = (data[i].instValue > maxValue) ? data[i].instValue : maxValue;
		    	minValue = (data[i].instValue < minValue) ? data[i].instValue : minValue;
		    	if(data[i].avgValue){
		    		maxValue = (data[i].avgValue > maxValue) ? data[i].avgValue : maxValue;
		    	}
		    	
		    	totalValue += data[i].instValue;
    		}
        	r.rect(0, height - 50, width, 50).attr({fill:'#fff', 'stroke-width':0}).toBack();
    		
        	// 绘制图形
    		if(maxValue > minValue){
    			maxValue = Math.ceil(maxValue / 10) * 10; // 向上取整十
    			
    			// 纵轴标签
            	for(var i = 0; i < 5; i++){
    	        	r.text(x-3, height - 50 - i*vh, (0 + maxValue/4*i) + '%').attr({
    		    		'font-family': 'Helvetica, Arial',
    		    		'font-size': '10px',
    		    		'text-anchor': 'end'
    	    		});
            	}
    			
    			// columnBar
    			var pxLen = (height - 50 - y) / maxValue,
		    		rectLen;
		    	for (var i = 0; i < data.length; i++){
			    	rectLen = data[i].instValue * pxLen;
			    	if(instId == data[i].instId){
				    	r.rect(wh/2+2+i*(wh)+x, height - 50, wh-4, rectLen).toBack().
				    		attr({fill: '#2b4e72', 'stroke-width':0}).
				    		data({'instid':data[i].instId, 'value':data[i].instValue}).
				    		animate({y:height-50-rectLen}, 300).attr({title:data[i].instValue+'%'}).
				    		hover(function(){
				    			this.attr({opacity:0.7});
				    		},function(){	
				    			this.attr({opacity:1});
				    		});
			    	} else {
			    		r.rect(wh/2+2+i*(wh)+x, height - 50, wh-4, rectLen).toBack().
			    		attr({fill: '#94ba65', 'stroke-width':0}).
			    		data({'instid':data[i].instId, 'value':data[i].instValue}).
			    		animate({y:height-50-rectLen}, 300).attr({title:data[i].instValue+'%'}).
			    		hover(function(){
			    			this.attr({opacity:0.7});
			    		},function(){
			    			this.attr({opacity:1});
			    		});
			    	}
			    }
		    	grid.toBack();
		    	
		    	if(!flag){
			    	var me = this;
			    	if(data.length == 36){
			    		var avgValue = totalValue / 36;
			    		setTimeout(function(){
	    		    		me.drawHorizenLine(r, x, y, width, height, pxLen, avgValue);
	    		    		
	    		    	}, 400);	
			    	} else {
			    		
			    		setTimeout(function(){
	    		    		me.drawTrendLine(r, x, y, width, height, data);
	    		    		
	    		    	}, 400);
			    	}
		    	}
        	}
        },
        
        drawHorizenLine: function(r, x, y, width, height, v1, v2){
    		var horizenLine = ["M", 20 + x, height-40-y, "L", width-20, height-40-y],
    			t = "t"+0+","+v1*v2*(-1);
    		
	    	r.path(horizenLine.join(",")).attr({stroke: "#0f6d8a", 'stroke-width': '3px'}).
	    		attr({title:v2.toFixed(2)+'%'}).
	    		hover(function(){
	    			this.attr({opacity:0.7});
	    		},function(){
	    			this.attr({opacity:1});
	    		}).
	    		animate({transform: t}, 300);
    	},
    	
    	drawTrendLine: function(r, xPolar, yPolar, width, height, v){
    		function getAnchors(p1x, p1y, p2x, p2y, p3x, p3y) {
		        var l1 = (p2x - p1x) / 2,
		            l2 = (p3x - p2x) / 2,
		            a = Math.atan((p2x - p1x) / Math.abs(p2y - p1y)),
		            b = Math.atan((p3x - p2x) / Math.abs(p2y - p3y));
		        a = p1y < p2y ? Math.PI - a : a;
		        b = p3y < p2y ? Math.PI - b : b;
		        var alpha = Math.PI / 2 - ((a + b) % (Math.PI * 2)) / 2,
		            dx1 = l1 * Math.sin(alpha + a),
		            dy1 = l1 * Math.cos(alpha + a),
		            dx2 = l2 * Math.sin(alpha + b),
		            dy2 = l2 * Math.cos(alpha + b);
		        return {
		            x1: p2x - dx1,
		            y1: p2y + dy1,
		            x2: p2x + dx2,
		            y2: p2y + dy2
		        };
		    }
    		width = width - 10 - xPolar;
    		height = height - 50 - yPolar;
    		
    		var data = [], instdata = [];
        	for(var i=0; i < v.length; i++){
	    		data.push(v[i].avgValue);
	    		instdata.push(v[i].instValue);
	    	}
    		var X = width / (v.length + 1),
				max = Math.max.apply(Math, data),
		        min = Math.min.apply(Math, data),
		        instMax = Math.max.apply(Math, instdata);
    		
    		max = ((max > instMax) ? max : instMax);
    		max = Math.ceil(max / 10) * 10; // 向上取整十
    			
	        if(min > 0){min = 0;}
		    var Y = (max == 0) ? height : height / (max-min);
		    
    		var p;
    		var path = r.path().attr({stroke: "#0f6d8a", "stroke-width": 3, "stroke-linejoin": "round"});
    		
    		for(var i = 0; i < v.length; i++){
    			var y = Math.round(height - Y * (data[i]-min) + yPolar),
    				x = Math.round(X*(i+1)+xPolar);
    			
				if (!i) {
		            p = ["M", x, y, "C", x, y];
		        }
		        if (i && i < v.length - 1) {
		            var Y0 = Math.round(height - Y * (data[i - 1]-min)),
		                X0 = Math.round(X * (i - .5) + xPolar),
		                Y2 = Math.round(height - Y * (data[i + 1]-min)),
		                X2 = Math.round(X * (i + 1.5) + xPolar);
		            var a = getAnchors(X0, Y0, x, y, X2, Y2);
		            p = p.concat([a.x1, a.y1, x, y, a.x2, a.y2]);
		        }
		        var dot = r.circle(x, y, 4).
		        		attr({fill: '#f9fbff', stroke: "#0f6d8a", "stroke-width": 2}).
		        		attr({title:data[i]+'%'});
		        dot.hover(function(){
	    			this.attr({"r":6});
	    		},function(){
	    			this.attr({"r":4});
	    		});
    		}
    		
    		var t = "t"+0+","+100;
    		p = p.concat([x, y, x, y]);
    		path.attr({path: p});
    		
    		this.drawLegend(r, width/2 - 40 , height + 35, [{color:"#2b4e72",title:"当月分流率"},{color:"#0f6d8a",title:"平均分流率"}]);
    	},
    	
    	drawLegend: function(r, x, y, opt){    		
    		var xPolar = x,
    			width = 15,
    			height = 10;
    		for(var i = 0; i < opt.length; i++){
    			r.rect(x, y, width, height).attr({'fill':opt[i].color, 'stroke-width':0});
    			var label = r.text(x+width+5, y+5, opt[i].title).attr({
		    		'font-family': '微软雅黑',
		    		'font-size': '10px',
		    		'text-anchor': 'start'
	    		});
    			x = x + width + 5 + label.getBBox().width + 10;
    		}
    		r.rect(xPolar - 5, y - 5, x-xPolar, 20).attr({'stroke-width':1, stroke: "#666"})
    	}
    });
    
    return ChartView;
});