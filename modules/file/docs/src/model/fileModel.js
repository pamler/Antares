define(function(require, exports, module) {
	"use strict";
	
	var FileModel = Backbone.Model.extend({
	    defaults: {
	    	fileId: 0,
			fileNm: '',
    		filePath: '',
    		uploaderId: '',
    		uploaderInsIdCd: '',
    		desc: '',
    		fileStatus: '',
    		createTs: '',
    		resType: '',
    		downloadTimes: 0
	    }
	   
	  });
	return FileModel;
});