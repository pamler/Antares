define(function(require, exports, module) {
    "use strict";
    return {
        query2Obj: function(str) {
            var query = {};
            str.replace(/\+/g,'%20').replace(/\b([^&=]*)=([^&=]*)/g, function(m, a, d) {

                a = a.replace(/%5B/g, '[').replace(/%5D/g, ']');

                if (typeof query[a] != 'undefined') {
                    query[a] += ',' + decodeURIComponent(d);
                } else {
                    query[a] = decodeURIComponent(d);
                }
            });

            return query;
        },
        compareForm: function($form1, $form2) {
            var form1obj = this.query2Obj($form1.serialize());
            var form2obj = this.query2Obj($form2.serialize());
            var key;


            for (key in form1obj) {


                if (form1obj[key] !== form2obj[key]) {
                    //var keyname = key.replace(/%5B/g, '[').replace(/%5D/g, ']');
                    $form1.find('[name="' + key + '"]').addClass("highlight");

                    $form2.find('[name="' + key + '"]').addClass("highlight");

                }
            }
        },

        copyForm: function($form1, $form2) {

            var obj = this.query2Obj($form1.serialize());
            $form2.populate(obj);


        },
        
        populate: function(job, $form) {
            var obj = this.query2Obj($form.serialize().replace(/\+/g,'%20'));
            var key, 
            	o = job.toJSON();
            for (key in obj) {
                var arr = key.split(/\[|\]/);
				for(var i=0;i<arr.length;i++){  
			        if(!arr[i]||arr[i]==''){  
			     		arr.splice(i,1);  
		     		}  
				}  
                var tmp = o;
                for(var i=0; i<arr.length; i++){
            		if(i == arr.length-1){
            			tmp[arr[i]] = obj[key];
            		} else {
            			if(!tmp[arr[i]]){
            				tmp[arr[i]] = {};
            			}
            			tmp = tmp[arr[i]];
            		}
                }
            }
            job.set(o);
        }
    };
});