define(function(require, exports, module) {
    "use strict";

    var MainInfo = Backbone.Model.extend({
        defaults: {
            date: "",
            convertDate:"",
            acqIntnlOrgCd: "",
            acqIntnlOrgNm: "",
            weight: "",
            ruleTp: "",
            ruleId: "",
            ruleNm: "",
            weightScoreVal: 0,
            totalPercent: 0,
            changeInRank: 0,
            scoreValRank: 0,
            scoreVal: 0,
            totalScore: 0,
            fmtRuleVal: 0,
            unit: "",
        	prevScoreVal: "",
        	nextScoreVal: "",
	        scoreValMax: "",
	        scoreValMin: "",
	        readyTp: ""
        },
        
		initialize: function(){
			this.formatData();
		},        
        
        formatData: function(){
        	var tmpValue;
        	
        	tmpValue = this.get('acqIntnlOrgCd');
    		this.set('acqIntnlOrgCd',tmpValue.substr(0,10));
    		
    		tmpValue = this.get('date');
    		this.set('convertDate',tmpValue.substr(0,4)+'年'+tmpValue.substr(4,2)+'月');
        	
        	tmpValue = this.get('weightScoreVal');
        	if (tmpValue == -999999){
        		this.set('weightScoreVal','--');
        	} else {
        		this.set('weightScoreVal',tmpValue.toFixed(2));
        	}
        	
        	tmpValue = this.get('totalPercent');
        	if (tmpValue == -999999){
        		this.set('totalPercent','--');
        	} else {
        		this.set('totalPercent',Math.round(tmpValue));
        	}
        	
	    	tmpValue = this.get('changeInRank');
	    	if (tmpValue == -999999){
        		this.set('changeInRank','--');
        	} 
			
        	tmpValue = this.get('scoreValRank');
        	if(tmpValue == -999999 || tmpValue == 0){
        		this.set('scoreValRank','');
        	} else if(tmpValue.toString().length == 1){
        		this.set('scoreValRank','0'+tmpValue);
        	}
        	
        	tmpValue = this.get('scoreVal');
        	if(tmpValue == -999999){
        		this.set('scoreVal','--');
        	} else {
        		this.set('scoreVal',tmpValue.toFixed(2));
        	}
        	
        	tmpValue = this.get('totalScore');
    		this.set('totalScore',tmpValue.toFixed(2));
    		
    		tmpValue = this.get('fmtRuleVal');
        	if(this.get('ruleTp') == 0){
        		this.set('fmtRuleVal','');
        	} else if(tmpValue == -999999){
        		this.set('fmtRuleVal','--');
        	} else {
        		this.set('fmtRuleVal',tmpValue + this.get('unit'));
        	}
    	}
    });
    return MainInfo;
});