<div class="widget" id="queryfile-form">
    <div class="widget-header">
    	<i class="icon-edit"></i>
    	<h3>文档查询条件</h3>
    </div>
    <div class="widget-content">
	    <form class="form-horizontal">
	         <fieldset>
	             <div class="control-group">
	                 <label class="control-label" for="filename">文件名称：</label>
	                 <div class="controls">
	                     <input type="text" class="input-medium" id="filename" name="fileNm">
	                 </div>
	             </div>
	             <div class="control-group">
	                 <label class="control-label" for="ownername">上传人：</label>
	                 <div class="controls">
	                     <input type="text" class="input-medium" id="ownername" name="uploaderNm">
	                 </div>
	             </div>
	             <div class="control-group">
	                 <label class="control-label" for="labelname">标签名：</label>
	                 <div class="controls">
	                     <input type="text" class="input-medium" id="labelname" name="labelNm">
	                 </div>
	             </div>
	             <div class="control-group">
	                 <label class="control-label" for="date">时间选择：</label>
	                 <div class="controls">
	                     <input type="text" class="input-medium startTime" name="startTime"> - 
	                     <input type="text" class="input-medium endTime" name="endTime">
	                 </div>
	             </div>
	             <div class="form-actions">
	                 <button class="btn btn-primary submit"><i class="icon-search icon-white"></i>&nbsp;查询</button>
	                 <button class="btn clear">清空</button>
	             </div>
	         </fieldset>
	    </form>
    </div>
</div>
<div class="udp-grid">
    <table id="file-docs-list1"></table>
    <div id="file-docs-pager1"></div>
</div>
