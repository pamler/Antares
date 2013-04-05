<style type="text/css">
    .modal{ width: 1000px; margin-left: -500px; }
    #planInfo-create-form .control-group label{ width:100px; }
</style>
<form class="form-widget form-inline" id="planInfo-create-working-form">
    <div class="group">
        <h2>基本信息</h2>
        <hr>
        <div class="control-group">
            <label class="control-label">调度计划ID:</label>
            <input type="text" class="span5" name="scheduleId" placeholder="请输入数字">
            <label class="control-label">有效开始时间:</label>
            <input type="text" class="span6" id="planInfo-startDate" name="startDate" placeholder="请选择">
            <label class="control-label">有效结束时间:</label>
            <input type="text" class="span6" id="planInfo-endDate" name="endDate" placeholder="请选择">
        </div>
        <div class="control-group">
            <label class="control-label">重试次数:</label>
            <input type="text" class="span6" name="retry" placeholder="请输入数字">
            <label class="control-label">超时时间:</label>
            <input type="text" class="span6" name="timeout" placeholder="请输入数字">
        </div>
        <div class="control-group">
            <label class="control-label">运行条件:</label>
            <input type="text" class="span20" name="condition" placeholder="请输入100位内字符">
        </div>
    </div>
    <div class="group">
        <h2>任务周期</h2>
        <hr>
        <div class="control-group">
            <label class="control-label">任务周期ID:</label>
            <input type="text" class="span4" name="task[taskId]" placeholder="请输入数字">
            <label class="control-label">任务周期名称:</label>
            <input type="text" class="span4" name="task[taskName]" placeholder="请输入30位内字符">
            <label class="control-label">任务周期:</label>
            <select name="task[taskPeriod]" class="span4">
                <option value="D">每日任务</option>
                <option value="W">每周任务</option>
                <option value="M">每月任务</option>
                <option value="Y">每年任务</option>
                <option value="S">系统任务</option>
            </select>
        </div>
        <div class="control-group">
            <label class="control-label">任务日期:</label>
            <input type="text" class="span5" name="task[taskDate]" placeholder="请输入8位内字符">
            <label class="control-label">任务时间:</label>
            <input type="text" class="span4" name="task[taskTime]" placeholder="请输入数字">
        </div>
        <div class="control-group">
            <label class="control-label">描述信息:</label>
            <input type="text" class="span20" name="task[describe]" placeholder="请输入100位内字符">
        </div>
    </div>
    <div class="group">
        <h2>任务信息</h2>
        <hr>
        <div class="control-group">
            <label class="control-label">子系统:</label>
            <select name="job[systemID]" class="span4"></select>
            <label class="control-label">JobID:</label>
            <input type="text" class="span4" name="job[jobID]" placeholder="请输入8位字符">
            <label class="control-label">Job名称:</label>
            <input type="text" class="span4" name="job[jobCnNM]" readonly>
            <label class="control-label">方法名称:</label>
            <input type="text" class="span3" name="job[func][funName]" readonly>
        </div>
        <div class="control-group">
            <label class="control-label">方法路径:</label>
            <input type="text" class="span4" name="job[func][funPath]" readonly>
            <label class="control-label">方法类别:</label>
            <input type="text" class="span4" name="job[func][funType]" readonly>
            <label class="control-label">参数:</label>
            <input type="text" class="span4" name="job[func][funParameter]" readonly>
            <label class="control-label">日志路径:</label>
            <input type="text" class="span3" name="job[func][logPath]" readonly>
        </div>
        <div class="control-group">
            <label class="control-label">服务名称:</label>
            <input type="text" class="span4" name="job[srvc][svcName]" readonly>
            <label class="control-label">服务类型:</label>
            <input type="text" class="span4" name="job[srvc][svcType]" readonly>
            <label class="control-label">服务描述:</label>
            <input type="text" class="span4" name="job[srvc][svcDescribe]" readonly>
            <label class="control-label">传输协议:</label>
            <input type="text" class="span3" name="job[srvc][transType]" readonly>
        </div>
        <div class="control-group">
            <label class="control-label">服务IP:</label>
            <input type="text" class="span4" name="job[srvc][ip]" readonly>
            <label class="control-label">服务端口:</label>
            <input type="text" class="span4" name="job[srvc][port]" readonly>
            <label class="control-label">用户名:</label>
            <input type="text" class="span4" name="job[srvc][userName]" readonly>
            <label class="control-label">密码:</label>
            <input type="text" class="span3" name="job[srvc][password]" readonly>
        </div>
        <div class="control-group">
            <label class="control-label">服务路径:</label>
            <input type="text" class="span20" name="job[srvc][svcPath]" readonly>
        </div>
    </div>
    <div class="form-actions">
        <button class="btn btn-primary submit-confirm">
            <i class="icon-arrow-up icon-white"></i>新增确认
        </button>
        <button class="btn clear">清空
        </button>
    </div>
</form>
<div id="planInfo-createModal" class="modal hide fade" tabindex="-1" role="dialog"
aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
            ×
        </button>
        <h3>
            调度计划信息确认
        </h3>
    </div>
    <div class="modal-body">
        <p>
        </p>
        <form class="form-widget form-inline" id="planInfo-create-form">
            <div class="group">
                <h2>新调度计划基本信息</h2>
                <hr>
                <div class="control-group">
                    <label class="control-label">新调度计划ID:</label>
                    <input type="text" class="span4" name="scheduleId" readonly>
                    <label class="control-label">新有效开始时间:</label>
                    <input type="text" class="span4" id="planInfo-newStartDate" name="startDate" readonly>
                    <label class="control-label">新有效结束时间:</label>
                    <input type="text" class="span4" id="planInfo-newEndDate" name="endDate" readonly>
                </div>
                <div class="control-group">
                	<label class="control-label">新重试次数:</label>
                    <input type="text" class="span4" name="retry" readonly>
                    <label class="control-label">新超时时间:</label>
                    <input type="text" class="span4" name="timeout" readonly>
                </div>
                <div class="control-group">
                	<label class="control-label">运行条件:</label>
                    <input type="text" class="span8" name="condition" readonly>
                </div>
            </div>
            <div class="group">
                <h2>新任务周期信息</h2>
                <hr>
                <div class="control-group">
                    <label class="control-label">新任务周期ID:</label>
                    <input type="text" class="span4" name="task[taskId]" readonly>
                    <label class="control-label">新任务周期名称:</label>
                    <input type="text" class="span4" name="task[taskName]" readonly>
                    <label class="control-label">新任务周期:</label>
                    <input type="text" class="span4" name="task[taskPeriod]" readonly>
                </div>
                <div class="control-group">
                    <label class="control-label">新任务日期:</label>
                    <input type="text" class="span4" name="task[taskDate]" readonly>
                    <label class="control-label">新任务时间:</label>
                    <input type="text" class="span4" name="task[taskTime]" readonly>
                </div>
                <div class="control-group">
                    <label class="control-label">新描述信息:</label>
                    <input type="text" class="span10" name="task[describe]" readonly>
                </div>
            </div>
            <div class="group">
                <h2>新任务信息</h2>
                <hr>
                <div class="control-group">
                    <label class="control-label">新子系统:</label>
                    <input type="text" class="span4" name="job[systemID]" readonly></input>
                    <label class="control-label">新任务名称:</label>
                    <input type="text" class="span4" name="job[jobCnNM]" readonly>
                	<label class="control-label">新方法名称:</label>
                    <input type="text" class="span4" name="job[func][funName]" readonly>
                </div>
                <div class="control-group">
                    <label class="control-label">新方法路径:</label>
                    <input type="text" class="span4" name="job[func][funPath]" readonly>
                    <label class="control-label">新方法类别:</label>
                    <input type="text" class="span4" name="job[func][funType]" readonly>
                    <label class="control-label">新参数:</label>
                    <input type="text" class="span4" name="job[func][funParameter]" readonly>
                </div>
                <div class="control-group">
                	<label class="control-label">新服务名称:</label>
                    <input type="text" class="span4" name="job[srvc][svcName]" readonly>
                	<label class="control-label">新服务路径:</label>
                    <input type="text" class="span4" name="job[srvc][svcPath]" readonly>
                	<label class="control-label">新服务描述:</label>
                    <input type="text" class="span4" name="job[srvc][svcDescribe]" readonly>
                </div>
                <div class="control-group">
                    <label class="control-label">新服务类型:</label>
                    <input type="text" class="span4" name="job[srvc][svcType]" readonly>
                    <label class="control-label">新服务IP:</label>
                    <input type="text" class="span4" name="job[srvc][ip]" readonly>
                    <label class="control-label">新服务端口:</label>
                    <input type="text" class="span4" name="job[srvc][port]" readonly>
                </div>
                <div class="control-group">
                    <label class="control-label">新用户名:</label>
                    <input type="text" class="span4" name="job[srvc][userName]" readonly>
                    <label class="control-label">新密码:</label>
                    <input type="text" class="span4" name="job[srvc][password]" readonly>
                </div>
            </div>
        </form>
    </div>
    <div class="modal-footer">
        <button class="btn" data-dismiss="modal" aria-hidden="true">取消</button>
        <button class="btn btn-primary submit">确认新增</button>
    </div>
</div>