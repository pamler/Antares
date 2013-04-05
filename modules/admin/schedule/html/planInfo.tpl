<ul id="schedule-planInfo-tab" class="nav nav-tabs">
    <li class="active">
        <a href="#planInfo-grid" data-toggle="tab" id="planInfo-grid-tab">计划列表</a>
    </li>
    <li>
        <a href="#planInfo-detail" data-toggle="tab" id="planInfo-detail-tab">计划详情</a>
    </li>
</ul>
<div class="slider">
</div>
<div class="tab-content span23">
    <div class="tab-pane active" id="planInfo-grid">
        <form class="form-widget form-inline" >
            <h2>查询计划</h2>
            <hr>
            <div class="control-group">
                <label class="control-label" for="planInfo-inputJobID">JobID:</label>
                <input type="text" id="planInfo-inputJobID" name="jobId" class="span3" placeholder="请输入字符">
                <label class="control-label" for="planInfo-inputSubSystem">子系统:</label>
                <select id="planInfo-inputSubSystem" name="systemId" class="span4">
                    <option value="">全部</option>
                </select>
                <label class="control-label" for="planInfo-inputMethod">执行方法:</label>
                <select id="planInfo-inputMethod" name="funDtlId" class="span4">
                    <option value="">全部</option>
                </select>
                <label class="control-label" for="planInfo-inputService">执行服务:</label>
                <select id="planInfo-inputService" name="svcDtlId" class="span4">
                    <option value="">全部</option>
                </select>
            </div>
            <div class="control-group">
                <label class="control-label" for="planInfo-inputScheduleId">调度计划ID:</label>
                <input type="text" id="planInfo-inputScheduleID" name="scheduleId" class="span3" placeholder="请输入数字">
                <label class="control-label" for="planInfo-inputTaskId">任务周期ID:</label>
                <input type="text" id="planInfo-inputTaskId" name="taskId" class="span4" placeholder="请输入数字">
            	<label class="control-label" for="planInfo-inputTaskPeriod">任务周期:</label>
            	<select id="planInfo-inputTaskPeriod" name="taskPeriod" class="span4">
                    <option value="">全部</option>
                    <option value="D">每日任务</option>
                    <option value="W">每周任务</option>
                    <option value="M">每月任务</option>
                    <option value="Y">每年任务</option>
                    <option value="S">系统任务</option>
                </select>
                <label class="control-label" for="planInfo-inputTaskDate">任务日期:</label>
                <input type="text" id="planInfo-inputTaskDate" name="taskDate" class="span4" placeholder="请输入8位内字符">
            </div>
            <div class="control-group">
                <label class="control-label" for="planInfo-inputTaskTime">任务时间:</label>
                <input type="text" id="planInfo-inputTaskTime" name="taskTime" class="span4" placeholder="请输入数字">
            </div>
            <div class="form-actions">
                <button class="btn btn-small btn-primary create">
                    <i class="icon-arrow-up icon-white"></i>新增</button>
                <button class="btn btn-small btn-primary submit">
                    <i class="icon-search icon-white"></i>查询</button>
            </div>
        </form>
        <div class="udp-grid">
	        <table id="list-schedule-planInfo"></table>
	        <div id="pager-schedule-planInfo"></div>
        </div>
    </div>
    <div class="tab-pane" id="planInfo-detail">
    </div>
</div>