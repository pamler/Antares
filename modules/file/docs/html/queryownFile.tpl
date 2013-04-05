<div class="span24 header-box">
	<h2 class="title">
		我的上传
		<a class="upload-link" href="#">上传文档&nbsp;&nbsp;&nbsp;<i class="icon-arrow-left"></i></a>
	</h2>
</div>
<div class="span24">
	<form class="form-horizontal">
         <fieldset>
             <div class="control-group">
                 <label class="control-label" for="filename">文件名称：</label>
                 <div class="controls">
                     <input type="text" class="input-medium" id="filename" name="fileNm">
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
             <div class="span18 form-actions">
                 <button class="btn btn-primary submit"><i class="icon-search icon-white"></i>&nbsp;查询</button>
                 <button class="btn clear">清空</button>
             </div>
         </fieldset>
    </form>
    <div class="udp-grid">
	    <table id="file-docs-list2"></table>
	    <div id="file-docs-pager2"></div>
	</div>
</div>

