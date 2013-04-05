define(function(require,exports,module){
	"use strict";

	var Tab = Backbone.Model.extend({
		idAttribute:'pageId',
		defaults:{
			tabNm:"",
			tabId:"",
			pageId:"",
			paraList:"",
			tabOptions:[]
		},
		
		initialize: function(){
        	this.formatData();
        },
        
        formatData: function(){
        	var ftTabNm, ftTabOptions, ftTabTC;
        	switch(this.get('pageId')){
        		case 'page1': 
        			ftTabNm = '跨行概览';
        			ftTabOptions = [];
        			break;
    			case 'page2': 
	    			ftTabNm = '卡品牌';
        			ftTabOptions = [];
        			break;
        		case 'page3': 
        			ftTabNm = '受理地';
        			ftTabOptions = [];
        			break;
        		case 'page4': 
        			ftTabNm = '渠道';
        			ftTabOptions = [{
                        "optionNm": "总体",
                        "optionType": "qudao",
                        "optionValue":"g"
                    },{
                        "optionNm": "ATM交易结构图",
                        "optionType": "qudao",
                        "optionValue":"atm-pie"
                    },{
                        "optionNm": "ATM趋势图",
                        "optionType": "qudao",
                        "optionValue":"atm-line"
                    },{
                        "optionNm": "POS趋势图",
                        "optionType": "qudao",
                        "optionValue":"pos-line"
                    }];
        			break;
        		case 'page5': 
        			ftTabNm = '商户结构';
        			ftTabOptions = [{
                        "optionNm": "商户结构图",
                        "optionType": "shanghujiegou",
                        "optionValue":"sh-pie"
                    },{
                        "optionNm": "餐娱类趋势图",
                        "optionType": "shanghujiegou",
                        "optionValue":"sh-line"
                    }];
        			break;
        		case 'page6': 
        			ftTabNm = '交易质量';
        			ftTabOptions = [{
                        "optionNm": "卡均金额趋势",
                        "optionType": "jiaoyizhiliang",
                        "optionValue":"kj"
                    },{
                        "optionNm": "笔均金额趋势",
                        "optionType": "jiaoyizhiliang",
                        "optionValue":"bj"
                    }];
        			break;
    			case 'page7': 
        			ftTabNm = '高端卡';
        			ftTabOptions = [{
                    	"optionNm": "高端卡商户结构图",
                        "optionType": "gdka",
                        "optionValue":"gd-pie"
                    },{
                        "optionNm": "高端卡趋势图",
                        "optionType": "gdka",
                        "optionValue":"gd-line"
                    }];
        			break;
    			case 'page8': 
        			ftTabNm = '公务卡';
        			ftTabOptions = [{
                    	"optionNm": "公务卡商户结构图",
                        "optionType": "gwka",
                        "optionValue":"gw-pie"
                    },{
                        "optionNm": "公务卡趋势图",
                        "optionType": "gwka",
                        "optionValue":"gw-line"
                    }];
        			break;
    			case 'page9': 
        			ftTabNm = 'IC卡';
        			ftTabOptions = [{
                    	"optionNm": "IC卡总体趋势图",
                        "optionType": "icka",
                        "optionValue":"ic-line"
                    },{
                        "optionNm": "商户结构",
                        "optionType": "icka",
                        "optionValue":"mchnt"
                    },{
                        "optionNm": "接触/非接触",
                        "optionType": "icka",
                        "optionValue":"touch"
                    },{
                        "optionNm": "借贷记/电子现金",
                        "optionType": "icka",
                        "optionValue":"ap"
                    }];
        			break;
    			case 'page10': 
        			ftTabNm = '跨行概览';
        			ftTabOptions = [];
        			break;
    			case 'page11': 
        			ftTabNm = '受理地';
        			ftTabOptions = [];
        			break;
    			case 'page12': 
        			ftTabNm = '活动终端';
        			ftTabOptions = [];
        			break;
    			case 'page13': 
        			ftTabNm = '商户结构';
        			ftTabOptions = [];
        			break;
        		default:break;
        	}
        	this.set({
        		tabNm:ftTabNm,
        		tabId:this.get('pageId'),
        		tabOptions:ftTabOptions
    		});
        }
		
	});

	return Tab;

});