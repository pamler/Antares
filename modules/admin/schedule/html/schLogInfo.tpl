<ul id="schedule-logInfo-tab" class="nav nav-tabs">
    <li class="active"><a href="#logInfo-grid" data-toggle="tab" id="logInfo-grid-tab">运行列表</a></li>
    <li><a href="#logInfo-detail" data-toggle="tab" id="logInfo-detail-tab">运行详情</a></li>
</ul>
<div class="slider"></div>
<div class="tab-content span23">
    <div class="tab-pane active" id="logInfo-grid">
        <form class="form-widget form-inline" >
            <h2>当前任务监控</h2>
            <hr>
            <div class="control-group">
                <label class="control-label" for="logInfo-startDt">调度开始时间: </label>
                <input type="text" id="logInfo-startDt" name="startDt" class="span4" placeholder="请输入字符">
                
                <label class="control-label" for="logInfo-endDt">调度结束时间:</label>
                <input type="text" id="logInfo-endDt" name="endDt" class="span4" placeholder="请输入字符">
                
                <label class="control-label" for="logInfo-taskSt">状态:</label>
                <select id="logInfo-taskSt" name="taskSt" class="span4">
                    <option value="">全部</option>
                    <option value="WS">等待调度</option>
                    <option value="SR">等待运行</option>
                    <option value="RN">正在运行</option>
                    <option value="EF">失败结束</option>
                    <option value="ES">成功结束</option>
                    <option value="TO">任务超时</option>
                </select>
                
                <label class="control-label" for="logInfo-systemId">子系统:</label>
                <select id="logInfo-systemId" name="systemId" class="span3">
                    <option value="">全部</option>
                </select>
            </div>
            <div class="control-group">
                <label class="control-label" for="logInfo-jobId">任务名称:</label>
                <select id="logInfo-jobId" name="jobId" class="span4">
                    <option value="">全部</option>
                </select>
                <label class="control-label" for="logInfo-svcDtlId">执行服务:</label>
                <select id="logInfo-svcDtlId" name="svcDtlId" class="span4">
                    <option value="">全部</option>
                </select>
                
                <label class="control-label" for="logInfo-runStyle">执行方式:</label>
                <select id="logInfo-svcDtlId" name="runStyle" class="span4">
                    <option value="A">自动</option>
                    <option value="M">手动</option>
                    <option value="-1">后台</option>
                </select>
                
                 <label class="control-label" for="logInfo-scheduleId">调度计划ID:</label>
                <input type="text" id="logInfo-scheduleId" name="scheduleId" class="span3"  placeholder="请输入数字">
            </div>
            <div class="control-group">
                <label class="control-label" for="logInfo-taskPeriod">任务周期:</label>
                <select id="logInfo-taskPeriod" name="taskPeriod" class="span4">
                    <option value="">全部</option>
                    <option value="D">每日任务</option>
                    <option value="W">每周任务</option>
                    <option value="M">每月任务</option>
                    <option value="Y">每年任务</option>
                    <option value="S">系统任务</option>
                </select>
                
                <label class="control-label" for="logInfo-taskDate">任务日期:</label>
                <input type="text" id="logInfo-taskDate" name="taskDate" class="span4" placeholder="请输入数字">
                
                <label class="control-label" for="logInfo-taskTime">任务时间:</label>
                <input type="text" id="logInfo-taskTime" name="taskTime" class="span4" placeholder="请输入数字">
            </div>
            <fieldset class="form-actions">
                <button class="btn btn-small btn-primary submit">
                    <i class="icon-search icon-white"></i>查询
                </button>
            </fieldset>
        </form>
        <div class="udp-grid">
	        <table id="list-schedule-logInfo"></table>
	        <div id="pager-schedule-logInfo"></div>
        </div>
    </div>
    <div class="tab-pane" id="logInfo-detail"></div>
</div>