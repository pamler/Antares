<ul id="schedule-jobInfo-tab" class="nav nav-tabs">
    <li class="active"><a href="#jobInfo-grid" data-toggle="tab" id="jobInfo-grid-tab">任务列表</a></li>
    <li><a href="#jobInfo-detail" data-toggle="tab" id="jobInfo-detail-tab">任务详情</a></li>
</ul>
<div class="slider"></div>
<div class="tab-content span23">
    <div class="tab-pane active" id="jobInfo-grid">
        <form class="form-widget form-inline">
            <h2>查询Job</h2>
            <hr>
            <div class="control-group">
                <label class="control-label" for="jobInfo-inputJobID">JobID:</label>
                <input type="text" id="jobInfo-inputJobID" name="jobId" class="span3" placeholder="请输入字符">
                
                <label class="control-label" for="jobInfo-inputSubSystem">子系统:</label>
                <select id="jobInfo-inputSubSystem" name="systemId" class="span4">
                    <option value="">全部</option>
                </select>
                
                <label class="control-label" for="jobInfo-inputMethod">执行方法:</label>
                <select id="jobInfo-inputMethod" name="funDtlId" class="span4">
                    <option value="">全部</option>
                </select>
                
                <label class="control-label" for="jobInfo-inputService">执行服务:</label>
                <select id="jobInfo-inputService" name="svcDtlId" class="span4">
                    <option value="">全部</option>
                </select>
            </div>

            <div class="form-actions">
	   			<button class="btn btn-small btn-primary creat">
    	            <i class="icon-arrow-up icon-white"></i>
         	         新增
            	</button>
            	<button class="btn btn-small btn-primary submit">
                	<i class="icon-search icon-white"></i>
                	查询
            	</button>
  			</div>
        </form>
        <div class="udp-grid">
	        <table id="list-schedule-jobInfo"></table>
	        <div id="pager-schedule-jobInfo"></div>
        </div>
    </div>
    <div class="tab-pane" id="jobInfo-detail"></div>
</div>