  <h2>备份主机信息</h2>
  <hr>
   <div class="control-group">
     <label class="control-label">备份JMX主机名称:</label>
     <label class="qbi-label">@{jmxServerName}</label>
     <label class="control-label">备份SMX主机名称:</label>
     <label class="qbi-label">@{smxServerName}</label>
     <label class="control-label">备份主机IP:</label>
     <label class="qbi-label">@{ip}</label>
  </div>
  <div class="control-group">
     <label class="control-label">装载备份共享内存:</label>
     <label class="qbi-label" name="bk-memory">状态：未进行<img src="resources/img/no-run.png"/></label>
     <button class="btn btn-mini btn-info" name="bk-memory">装载备份</button>
  </div>
  <div class="control-group">
     <label class="control-label">备份后台侦听任务:</label>
     <label class="qbi-label" name="bk-listenTaskSt">状态：@{listenTaskStDesc}<img src="resources/img/no-run.png"/></label>
     <button class="btn btn-mini btn-info" name="bk-listenTaskSt"></button>
  </div>
  <div class="control-group">
     <label class="control-label">备份后台调度程序:</label>
     <label class="qbi-label" name="bk-scheduleTaskSt">状态：@{scheduleTaskStDesc}<img src="resources/img/no-run.png"/></label>
     <button class="btn btn-mini btn-info" name="bk-scheduleTaskSt"></button>
  </div>
  <div class="control-group">
     <label class="control-label">备份JMX服务:</label>
     <label class="qbi-label" name="bk-jmxSt">状态：@{jmxStDesc}<img src="resources/img/no-run.png"/></label>
  </div>
  <div class="control-group">
     <label class="control-label">备份SMX服务:</label>
     <label class="qbi-label" name="bk-smxSt">状态：@{smxStDesc}<img src="resources/img/no-run.png"/></label>
  </div>