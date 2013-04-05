<form class="form-widget form-inline" id="schLog-mod-working-form">
    <div class="group">
        <h2>当前状态</h2>
        <hr>
        <div class="control-group">
            <label class="control-label">调度计划ID:</label>
            <input type="text" class="span3" name="scheduleId" readonly>
            
            <label class="control-label">运行状态:</label>
            <input type="text" class="span4" name="taskSt">
            
            <label class="control-label">调度时间:</label>
            <input type="text" class="span4" name="scheduleTime" readonly>
            
            <label class="control-label">重试次数:</label>
            <input type="text" class="span4" name="schInfo[retry]" readonly>
            
        </div>
        <div class="control-group">
            <label class="control-label">剩余次数:</label>
            <input type="text" class="span3" name="remain">
            
            <label class="control-label">超时时间:</label>
            <input type="text" class="span4" name="schInfo[timeout]" readonly>
        </div>
        <div class="control-group">
            <label class="control-label">运行条件:</label>
            <input type="text" class="span16" name="schInfo[condition]" readonly>
        </div>
        <div class="control-group">
            <label class="control-label">描述信息:</label>
            <input type="text" class="span16" name="describe" readonly>
        </div>
    </div>
    <div class="group">
        <h2>调度计划</h2>
        <hr>
        <div class="control-group">
            <label class="control-label">任务周期ID:</label>
            <input type="text" class="span3" name="schInfo[task][taskId]" readonly>
            
            <label class="control-label">任务日期:</label>
            <input type="text" class="span4" name="schInfo[task][taskDate]" readonly>
            
            <label class="control-label">任务周期:</label>
            <input type="text" class="span4" name="schInfo[task][taskPeriod]" readonly>
            
            <label class="control-label">任务时间:</label>
            <input type="text" class="span4" name="schInfo[task][taskTime]" readonly>
            
        </div>
        <div class="control-group">
            <label class="control-label">描述信息:</label>
            <input type="text" class="span3" name="schInfo[task][describe]" readonly>
        
  			<label class="control-label">子系统:</label>
            <input type="text" class="span4" name="schInfo[job][systemID]" readonly>
            
            <label class="control-label">JobID:</label>
            <input type="text" class="span4" name="schInfo[job][jobID]" readonly>
            
            <label class="control-label">方法名称:</label>
            <input type="text" class="span4" name="schInfo[job][func][funDescribe]" readonly>
            
        </div>
        <div class="control-group">
        	<label class="control-label">方法类别:</label>
            <input type="text" class="span3" name="schInfo[job][func][funType]" readonly>
        
  			<label class="control-label">方法路径:</label>
            <input type="text" class="span4" name="schInfo[job][func][funPath]" readonly>
            
            <label class="control-label">服务名称:</label>
            <input type="text" class="span4" name="schInfo[job][srvc][svcName]" readonly>
            
            <label class="control-label">传输协议:</label>
            <input type="text" class="span4" name="schInfo[job][srvc][transType]" readonly>
        </div>
        <div class="control-group">
  			<label class="control-label">服务路径:</label>
            <input type="text" class="span3" name="schInfo[job][srvc][svcPath]" readonly>
            
            <label class="control-label">服务描述:</label>
            <input type="text" class="span4" name="schInfo[job][srvc][svcDescribe]" readonly>
            
            <label class="control-label">服务类型:</label>
            <input type="text" class="span4" name="schInfo[job][srvc][svcType]" readonly>
            
            <label class="control-label">参数:</label>
            <input type="text" class="span4" name="schInfo[job][func][funParameter]" readonly>
        </div>
        <div class="control-group">
            <label class="control-label">服务IP:</label>
            <input type="text" class="span3" name="schInfo[job][srvc][ip]" readonly>
            
            <label class="control-label">传输端口:</label>
            <input type="text" class="span4" name="schInfo[job][srvc][port]" readonly>
        </div>
    </div>
    
    <fieldset class="form-actions">
        <button class="btn  btn-primary mod-status">修改状态</button>
        <button class="btn  btn-primary log-detail">日志详情</button>
        <button class="btn  btn-primary plan-detail">调度详情</button>
    </fieldset>

</form>
<div id="schLog-logState" style="display:none;" class="udp-grid">
	<table id="list-schedule-schLog-dialog"></table>
</div>
