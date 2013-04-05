define(function(require, exports, module) {
    "use strict";
   	
    var ChartView = Backbone.View.extend({
        container: '',
        className: 'chart-svg',
        
    	initialize: function() {
    		this.container = this.options.container;
        },
        
        redrawBarChart: function(data){
        	if(data.length){
	        	this.drawBarChart(data);
        	}
        },
        
        redrawLineChart: function(data){
        	if(data.length){
	        	this.$el.html('');
	        	this.drawLineChart(data);
        	}
        },

        drawBarChart: function(data){
        	var width = this.container.width() - 40,
        		barMaxWidth = width - 110, // 减去y轴label的长度
        		height = this.container.height() - 15;
        	
        	var r = Raphael(this.el, width, height);
        	var h = height, 	// barChart总高度
        		hv = data.length, // 柱子数
        		gutter = 3,	// 柱子间隙
        		upgutter = 1,	// 上边界间隙
        		downgutter = 1, // 下边界间隙
        		bh = Math.round((h - (upgutter+downgutter+(hv-1)*gutter))/5); // 每个柱子的高度
        	
//        	$(this.el).tooltip({
//				track: true,
//				items: "rect",
//				tooltipClass: 'barchart-tooltip',
//				content: function(){
//					var rt = r.getById(this.raphaelid);
//					if(rt){
//						return rt.data('label')+": "+rt.data('value').toFixed(2);
//					}
//				}
//			});	
        	
        	//坐标标签
		    var labelArr = [], maxWidth = 0, maxValue = 0, minValue = 100;
		    for(var i = 0; i < hv; i++){
		    	var label = r.text(0, bh/2 + i*(bh+gutter),data[i].objName).attr({
		    		font: '13px Helvetica, Arial',
		    		'text-anchor':'end'
	    		});
		    	
		    	maxWidth = (label.getBBox().width > maxWidth) ? label.getBBox().width : maxWidth;
		    	maxValue = (data[i].objValue > maxValue) ? data[i].objValue : maxValue;
		    	minValue = (data[i].objValue < minValue) ? data[i].objValue : minValue;
		    	
		    	labelArr.push(label);
		    }
		    _.each(labelArr,function(item){
		    	item.attr({x: maxWidth});
		    });
		    
		    //坐标轴
		    var x = maxWidth + 10, y = 0;
		    var path = ["M", x, y, "L", x, h];
		    for (var i = 0; i < hv; i++) {
		        path = path.concat(["M", x, y + upgutter + bh/2 + i * (bh + gutter), "H", (x - 7)]);
		    }
		    r.path(path.join(",")).attr({stroke: '#000'});
		    
		    //矩形
		    var colorMap = ['#777777','#94ba65','#2790b0','#2b4e72','#c82b2b'];
		    if(maxValue > minValue){
		    	minValue = (Math.round(minValue-1)<=0)?0:Math.round(minValue-1);
		    	var pxLen = barMaxWidth/(maxValue-minValue),
		    		rectLen;
		    	for (var i = 0; i < hv; i++){
			    	rectLen = (data[i].objValue-minValue)*pxLen;
			    	r.rect(x, y+upgutter+i*(bh+gutter), 0, bh).
			    		attr({fill: colorMap[i], 'stroke-width':0}).
			    		data({'label':data[i].objName, 'value':data[i].objValue}).
			    		animate({width:rectLen}, 300).
			    		hover(function(){
			    			this.attr({opacity:0.8});
			    		},function(){
			    			this.attr({opacity:1});
			    		});
			    	if(rectLen > 35){
				    	r.text(x + rectLen - 10, bh/2 + i*(bh+gutter),data[i].objValue.toFixed(2)).attr({
				    		font: '12px Helvetica, Arial',
				    		fill: '#fff',
				    		'text-anchor':'end'
			    		});
		    		} else {
		    			r.text(x + rectLen + 10, bh/2 + i*(bh+gutter),data[i].objValue.toFixed(2)).attr({
				    		font: '12px Helvetica, Arial',
				    		fill: '#000',
				    		'text-anchor':'start'
			    		});
		    		}
			    }
		    } else if((maxValue == minValue) && (minValue != 0)){
		    	for (var i = 0; i < hv; i++){
			    	r.rect(x, y+upgutter+i*(bh+gutter), 0, bh).
			    		attr({fill: colorMap[i], 'stroke-width':0}).
			    		animate({width:minValue/100*barMaxWidth}, 300);
			    }
		    }
        },
        
        drawLineChart: function(value){
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
		    // Grab the data
        	var labels = [], data = [], unit = value[0].unit;
        	for(var i=0; i < value.length; i++){
	    		labels.push(value[i].lineName);
	    		data.push(value[i].lineValUnit);
	    	}
		    // Draw
		    var width = 740,
		        height = 200,
		        leftgutter = 15,
		        bottomgutter = 25,
		        topgutter = 20,
		        colorhue = .6 || Math.random(),
		        color = "hsl(" + [colorhue, .5, .5] + ")",
		        r = Raphael(this.el, width, height), // canvas
		        txt = {font: '12px Helvetica, Arial', fill: "#fff"},
		        X = (labels.length == 1) ? 0 : (width - leftgutter - 40) / (labels.length-1), // x-axis 间距
		        max = Math.max.apply(Math, data),
		        min = Math.min.apply(Math, data),
		        rowHeight = (height - topgutter - bottomgutter) / 5; // y-axis 间距
		    
		    if(min > 0){min = 0;}
		    
		    var Y = (max == 0) ? (height - bottomgutter - topgutter) : (height - bottomgutter - topgutter) / (max-min);
		    r.drawGrid(leftgutter + 20 + .5, topgutter + .5, width - leftgutter - 40, height - topgutter - bottomgutter, 1, 5, "#999");
		    
		    
		    
		    // 画x坐标轴刻度线及刻度值
		    var scaleXPath = [];
		    for (var i = 1; i <= labels.length; i++) {
		        if(i > 1 && i < labels.length){
		        	scaleXPath = scaleXPath.concat(["M", leftgutter + 20 + X*(i-1), height - bottomgutter + .5, "V", (height - bottomgutter + .5 - 5)]);
		        }
		        r.text(leftgutter + X*(i-1) + 20, height - bottomgutter + 15, labels[i-1]).attr({
		    		font: '12px Helvetica, Arial',
		    		fill: '#000'
	    		});
		    }
		    r.path(scaleXPath.join(",")).attr({stroke: '#333'});
		    
		    // 画y坐标轴刻度值
		    for (var i = 0; i < 6; i++) {
		        r.text(leftgutter, topgutter + .5 + i*rowHeight, (max-(max-min)/5*i).toFixed(2)).attr({
		    		font: '12px Helvetica, Arial',
		    		fill: '#000'
	    		});
		    }

			var path = r.path().attr({stroke: color, "stroke-width": 4, "stroke-linejoin": "round"}),
		        bgp = r.path().attr({stroke: "none", opacity: .3, fill: color}),
		        label = r.set(),
		        lx = 0, ly = 0,
		        is_label_visible = false,
		        leave_timer,
		        blanket = r.set();
		    label.push(r.text(60, 12, data[0] + unit).attr(txt));
		    label.hide();
		    var frame = r.popup(100, 100, label, "right").attr({fill: "#000", stroke: "#666", "stroke-width": 2, "fill-opacity": .7}).hide(); //弹出框隐藏
		
		    var p, bgpp;
		    for (var i = 0, ii = labels.length; i < ii; i++) {
		        var y = Math.round(height - bottomgutter - Y * (data[i]-min)),
		            x = Math.round(leftgutter + 20 + X*i),
		            t = r.text(x, height - 6, labels[i]).attr(txt).toBack(); // paper.text() return element; toBack 控制z-index
				if (!i) {
		            p = ["M", x, y, "C", x, y];
		            bgpp = ["M", leftgutter + 20, height - bottomgutter, "L", x, y, "C", x, y];
		        }
		        if (i && i < ii - 1) {
		            var Y0 = Math.round(height - bottomgutter - Y * (data[i - 1]-min)),
		                X0 = Math.round(leftgutter + X * (i - .5)),
		                Y2 = Math.round(height - bottomgutter - Y * (data[i + 1]-min)),
		                X2 = Math.round(leftgutter + X * (i + 1.5));
		            var a = getAnchors(X0, Y0, x, y, X2, Y2);
		            p = p.concat([a.x1, a.y1, x, y, a.x2, a.y2]);
		            bgpp = bgpp.concat([a.x1, a.y1, x, y, a.x2, a.y2]);
		        }
		        var dot = r.circle(x, y, 4).attr({fill: '#f9fbff', stroke: color, "stroke-width": 2}); //画圆圈
		        blanket.push(r.rect(leftgutter + X * i, 0, X, height - bottomgutter).attr({stroke: "none", fill: "#fff", opacity: 0})); //画矩形，提供hover区域
		        var rect = blanket[blanket.length - 1];
		        
				// 立即为矩形添加hover事件
				(function (x, y, data, lbl, dot) {
		            var timer, i = 0;
		            rect.hover(function () {
		                clearTimeout(leave_timer);
		                var side = "right";
		                if (x + frame.getBBox().width > width) {
		                    side = "left";
		                }
		                var ppp = r.popup(x, y, label, side, 1),
		                    anim = Raphael.animation({
		                        path: ppp.path,
		                        transform: ["t", ppp.dx, ppp.dy]
		                    }, 200 * is_label_visible);
		                lx = label[0].transform()[0][1] + ppp.dx;
		                ly = label[0].transform()[0][2] + ppp.dy;
		                frame.show().stop().animate(anim);
		                label[0].attr({text: data + unit}).show().stop().animateWith(frame, anim, {transform: ["t", lx, ly]}, 200 * is_label_visible);
		                dot.attr("r", 6);
		                is_label_visible = true;
		            }, function () {
		                dot.attr("r", 4);
		                leave_timer = setTimeout(function () {
		                    frame.hide();
		                    label[0].hide();
		                    is_label_visible = false;
		                }, 1);
		            });
		        })(x, y, data[i], labels[i], dot);
		    }
		    p = p.concat([x, y, x, y]);
		    bgpp = bgpp.concat([x, y, x, y, "L", x, height - bottomgutter, "z"]);
		    path.animate({path: p},300); //将点连成线
		    bgp.attr({path: bgpp}); //阴影区
		    frame.toFront(); 
		    label[0].toFront();
		    blanket.toFront();
        }
        

    });
    
    return ChartView;
});