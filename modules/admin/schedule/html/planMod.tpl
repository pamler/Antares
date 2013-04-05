<style type="text/css">
 #planInfo-origin-form{ float: left; width: 450px; }
 #planInfo-mod-form{ float: right; width: 450px; }
 select.highlight,input.highlight{ border: 1px solid red; }
</style>
<form class="form-widget form-inline" id="planInfo-mod-working-form">
    <div class="group">
        <h2>基本信息</h2>
        <hr>
        <div class="control-group">
            <label class="control-label">调度计划ID:</label>
            <input type="text" class="span5" name="scheduleId" readonly>
            <label class="control-label">有效开始时间:</label>
            <input type="text" class="span6" id="planInfo-startDateMod" name="startDate" placeholder="请选择">
            <label class="control-label">有效结束时间:</label>
            <input type="text" class="span6" id="planInfo-endDateMod" name="endDate" placeholder="请选择">
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
            <input type="text" class="span10" name="task[taskDate]" placeholder="请输入8位内数字">
            <label class="control-label">任务时间:</label>
            <input type="text" class="span8" name="task[taskTime]" placeholder="请输入数字">
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
            <select name="job[systemID]" class="span4">
            </select>
            <label class="control-label">JobID:</label>
            <input type="text" class="span4" name="job[jobID]" placeholder="请输入8位内字符">
            <label class="control-label">Job名称:</label>
            <input type="text" class="span5" name="job[jobCnNM]" readonly>
        </div>
        <div class="control-group">
            <label class="control-label">方法名称:</label>
            <input type="text" class="span4" name="job[func][funName]" readonly>
            <label class="control-label">方法路径:</label>
            <input type="text" class="span4" name="job[func][funPath]" readonly>
            <label class="control-label">方法类别:</label>
            <input type="text" class="span5" name="job[func][funType]" readonly>
        </div>
        <div class="control-group">
            <label class="control-label">参数:</label>
            <input type="text" class="span4" name="job[func][funParameter]" readonly>
            <label class="control-label">日志路径:</label>
            <input type="text" class="span4" name="job[func][logPath]" readonly>
            <label class="control-label">服务名称:</label>
            <input type="text" class="span5" name="job[srvc][svcName]" readonly>
        </div>
        <div class="control-group">
            <label class="control-label">服务类型:
            </label>
            <input type="text" class="span4" name="job[srvc][svcType]" readonly>
            <label class="control-label">
                传输协议:
            </label>
            <input type="text" class="span4" name="job[srvc][transType]" readonly>
            <label class="control-label">
                服务IP:
            </label>
            <input type="text" class="span5" name="job[srvc][ip]" readonly>
        </div>
        <div class="control-group">
            <label class="control-label">
                服务端口:
            </label>
            <input type="text" class="span4" name="job[srvc][port]" readonly>
            <label class="control-label">
                用户名:
            </label>
            <input type="text" class="span4" name="job[srvc][userName]" readonly>
            <label class="control-label">
                密码:
            </label>
            <input type="text" class="span5" name="job[srvc][password]" readonly>
        </div>
        <div class="control-group">
            <label class="control-label">
                服务路径:
            </label>
            <input type="text" class="span20" name="job[srvc][svcPath]" readonly>
        </div>
        <div class="control-group">
            <label class="control-label">
                服务描述:
            </label>
            <input type="text" class="span20" name="job[srvc][svcDescribe]" readonly>
        </div>
        <div class="control-group">
        </div>
    </div>
    <fieldset class="form-actions">
        <button class="btn  btn-primary submit-confirm">
            <i class="icon-arrow-up icon-white">
            </i>
            修改确认
        </button>
        <button class="btn  btn-primary log">运行日志</button>
        <button class="btn  btn-primary mannual">手工运行</button>
    </fieldset>
</form>
<div id="planInfo-logState" style="display:none;" class="udp-grid">
	<table id="list-schedule-planInfo-dialog"></table>
</div>
<div id="planInfo-runTime" style="display:none;">
	<label style="display:inline;">运行日期：</label>
    <input class="input-medium" name="scheduleRunTime" type="text" style="margin-top:5px;">
</div>
<div id="planInfo-modModal" class="modal hide fade" tabindex="-1" role="dialog"
aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
            ×
        </button>
        <h3>
            修改确认
        </h3>
    </div>
    <div class="modal-body">
        <p>
        </p>
        <form class="form-widget form-inline" id="planInfo-origin-form">
            <div class="group">
                <h2>
                    基本信息(旧)
                </h2>
                <hr>
                <div class="control-group">
                    <label class="control-label">
                        调度计划ID:
                    </label>
                    <input type="text" class="span4" name="scheduleId" readonly>
                    <label class="control-label">
                        有效开始时间:
                    </label>
                    <input type="text" class="span6" name="startDate" readonly>
                </div>
                <div class="control-group">
                    <label class="control-label">
                        有效结束时间:
                    </label>
                    <input type="text" class="span6" name="endDate" readonly>
                    <label class="control-label">
                        重试次数:
                    </label>
                    <input type="text" class="span4" name="retry" readonly>
                </div>
                <div class="control-group">
                    <label class="control-label">
                        超时时间:
                    </label>
                    <input type="text" class="span4" name="timeout" readonly>
                </div>
                <div class="control-group">
                    <label class="control-label">
                        运行条件:
                    </label>
                    <input type="text" class="span16" name="condition" readonly>
                </div>
            </div>
            <div class="group">
                <h2>
                    任务周期(旧)
                </h2>
                <hr>
                <div class="control-group">
                    <label class="control-label">
                        任务周期ID:
                    </label>
                    <input type="text" class="span4" name="task[taskId]" readonly>
                    <label class="control-label">
                        任务周期名称:
                    </label>
                    <input type="text" class="span6" name="task[taskName]" readonly>
                </div>
                <div class="control-group">
                    <label class="control-label">
                        任务周期:
                    </label>
                    <input type="text" name="task[taskPeriod]" class="span5" readonly>
                </div>
                <div class="control-group">
                    <label class="control-label">
                        任务日期:
                    </label>
                    <input type="text" class="span4" name="task[taskDate]" readonly>
                    <label class="control-label">
                        任务时间:
                    </label>
                    <input type="text" class="span4" name="task[taskTime]" readonly>
                </div>
                <div class="control-group">
                    <label class="control-label">
                        描述信息:
                    </label>
                    <input type="text" class="span6" name="task[describe]" readonly>
                </div>
            </div>
            <div class="group">
                <h2>
                    任务信息(旧)
                </h2>
                <hr>
                <div class="control-group">
                    <label class="control-label">
                        子系统:
                    </label>
                    <input type="text" name="job[systemID]" class="span6" readonly>
                    <label class="control-label">
                        JobID:
                    </label>
                    <input type="text" class="span4" name="job[jobID]" readonly>
                </div>
                <div class="control-group">
                    <label class="control-label">
                        Job名称:
                    </label>
                    <input type="text" class="span4" name="job[jobCnNM]" readonly>
                    <label class="control-label">
                        方法名称:
                    </label>
                    <input type="text" class="span6" name="job[func][funName]" readonly>
                </div>
                <div class="control-group">
                    <label class="control-label">
                        方法路径:
                    </label>
                    <input type="text" class="span6" name="job[func][funPath]" readonly>
                    <label class="control-label">
                        方法类别:
                    </label>
                    <input type="text" class="span4" name="job[func][funType]" readonly>
                </div>
                <div class="control-group">
                    <label class="control-label">
                        参数:
                    </label>
                    <input type="text" class="span16" name="job[func][funParameter]" readonly>
                </div>
                <div class="control-group">
                    <label class="control-label">
                        日志路径:
                    </label>
                    <input type="text" class="span16" name="job[func][logPath]" readonly>
                </div>
                <div class="control-group">
                    <label class="control-label">
                        服务名称:
                    </label>
                    <input type="text" class="span6" name="job[srvc][svcName]" readonly>
                    <label class="control-label">
                        服务类型:
                    </label>
                    <input type="text" class="span4" name="job[srvc][svcType]" readonly>
                </div>
                <div class="control-group">
                    <label class="control-label">
                        传输协议:
                    </label>
                    <input type="text" class="span4" name="job[srvc][transType]" readonly>
                    <label class="control-label">
                        服务IP:
                    </label>
                    <input type="text" class="span6" name="job[srvc][ip]" readonly>
                </div>
                <div class="control-group">
                    <label class="control-label">
                        服务端口:
                    </label>
                    <input type="text" class="span4" name="job[srvc][port]" readonly>
                    <label class="control-label">
                        用户名:
                    </label>
                    <input type="text" class="span6" name="job[srvc][userName]" readonly>
                </div>
                <div class="control-group">
                    <label class="control-label">
                        密码:
                    </label>
                    <input type="text" class="span6" name="job[srvc][password]" readonly>
                </div>
                <div class="control-group">
                    <label class="control-label">
                        服务路径:
                    </label>
                    <input type="text" class="span16" name="job[srvc][svcPath]" readonly>
                </div>
                <div class="control-group">
                    <label class="control-label">
                        服务描述:
                    </label>
                    <input type="text" class="span16" name="job[srvc][svcDescribe]" readonly>
                </div>
                <div class="control-group">
                </div>
            </div>
        </form>
        <form class="form-widget form-inline" id="planInfo-mod-form">
            <div class="group">
                <h2>
                    基本信息(新)
                </h2>
                <hr>
                <div class="control-group">
                    <label class="control-label">
                        调度计划ID:
                    </label>
                    <input type="text" class="span4" name="scheduleId" readonly>
                    <label class="control-label">
                        有效开始时间:
                    </label>
                    <input type="text" class="span6" name="startDate" readonly>
                </div>
                <div class="control-group">
                    <label class="control-label">
                        有效结束时间:
                    </label>
                    <input type="text" class="span6" name="endDate" readonly>
                    <label class="control-label">
                        重试次数:
                    </label>
                    <input type="text" class="span4" name="retry" readonly>
                </div>
                <div class="control-group">
                    <label class="control-label">
                        超时时间:
                    </label>
                    <input type="text" class="span4" name="timeout" readonly>
                </div>
                <div class="control-group">
                    <label class="control-label">
                        运行条件:
                    </label>
                    <input type="text" class="span16" name="condition" readonly>
                </div>
            </div>
            <div class="group">
                <h2>
                    任务周期
                </h2>
                <hr>
                <div class="control-group">
                    <label class="control-label">
                        任务周期ID:
                    </label>
                    <input type="text" class="span4" name="task[taskId]" readonly>
                    <label class="control-label">
                        任务周期名称:
                    </label>
                    <input type="text" class="span6" name="task[taskName]" readonly>
                </div>
                <div class="control-group">
                    <label class="control-label">
                        任务周期:
                    </label>
                    <input type="text" name="task[taskPeriod]" class="span5" readonly>
                </div>
                <div class="control-group">
                    <label class="control-label">
                        任务日期:
                    </label>
                    <input type="text" class="span4" name="task[taskDate]" readonly>
                    <label class="control-label">
                        任务时间:
                    </label>
                    <input type="text" class="span4" name="task[taskTime]" readonly>
                </div>
                <div class="control-group">
                    <label class="control-label">
                        描述信息:
                    </label>
                    <input type="text" class="span6" name="task[describe]" readonly>
                </div>
            </div>
            <div class="group">
                <h2>
                    任务信息
                </h2>
                <hr>
                <div class="control-group">
                    <label class="control-label">
                        子系统:
                    </label>
                    <input type="text" name="job[systemID]" class="span6" readonly>
                    <label class="control-label">
                        JobID:
                    </label>
                    <input type="text" class="span4" name="job[jobID]" readonly>
                </div>
                <div class="control-group">
                    <label class="control-label">
                        Job名称:
                    </label>
                    <input type="text" class="span4" name="job[jobCnNM]" readonly>
                    <label class="control-label">
                        方法名称:
                    </label>
                    <input type="text" class="span6" name="job[func][funName]" readonly>
                </div>
                <div class="control-group">
                    <label class="control-label">
                        方法路径:
                    </label>
                    <input type="text" class="span6" name="job[func][funPath]" readonly>
                    <label class="control-label">
                        方法类别:
                    </label>
                    <input type="text" class="span4" name="job[func][funType]" readonly>
                </div>
                <div class="control-group">
                    <label class="control-label">
                        参数:
                    </label>
                    <input type="text" class="span16" name="job[func][funParameter]" readonly>
                </div>
                <div class="control-group">
                    <label class="control-label">
                        日志路径:
                    </label>
                    <input type="text" class="span16" name="job[func][logPath]" readonly>
                </div>
                <div class="control-group">
                    <label class="control-label">
                        服务名称:
                    </label>
                    <input type="text" class="span6" name="job[srvc][svcName]" readonly>
                    <label class="control-label">
                        服务类型:
                    </label>
                    <input type="text" class="span4" name="job[srvc][svcType]" readonly>
                </div>
                <div class="control-group">
                    <label class="control-label">
                        传输协议:
                    </label>
                    <input type="text" class="span4" name="job[srvc][transType]" readonly>
                    <label class="control-label">
                        服务IP:
                    </label>
                    <input type="text" class="span6" name="job[srvc][ip]" readonly>
                </div>
                <div class="control-group">
                    <label class="control-label">
                        服务端口:
                    </label>
                    <input type="text" class="span4" name="job[srvc][port]" readonly>
                    <label class="control-label">
                        用户名:
                    </label>
                    <input type="text" class="span6" name="job[srvc][userName]" readonly>
                </div>
                <div class="control-group">
                    <label class="control-label">
                        密码:
                    </label>
                    <input type="text" class="span6" name="job[srvc][password]" readonly>
                </div>
                <div class="control-group">
                    <label class="control-label">
                        服务路径:
                    </label>
                    <input type="text" class="span16" name="job[srvc][svcPath]" readonly>
                </div>
                <div class="control-group">
                    <label class="control-label">
                        服务描述:
                    </label>
                    <input type="text" class="span16" name="job[srvc][svcDescribe]" readonly>
                </div>
                <div class="control-group">
                </div>
            </div>
        </form>
    </div>
    <div class="modal-footer">
        <button class="btn" data-dismiss="modal" aria-hidden="true">
            取消
        </button>
        <button class="btn btn-primary submit">
            确认修改
        </button>
    </div>
</div>