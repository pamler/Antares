<form class="form-widget form-inline span23">
	  <div class="group">
	  	  <h2>当前主机信息</h2>
  	  	  <hr>
		   <div class="control-group">
		     <label class="control-label">JMX主机名称:</label>
		     <label class="qmi-label">@{jmxServerName}</label>
	         <label class="control-label">SMX主机名称:</label>
	         <label class="qmi-label">@{smxServerName}</label>
	         <label class="control-label">主机IP:</label>
	         <label class="qmi-label">@{ip}</label>
		  </div>
		  <div class="control-group">
		     <label class="control-label">装载共享内存:</label>
	         <label class="qmi-label" name="memory">状态：未进行<img src="resources/img/no-run.png"/></label>
	         <button class="btn btn-mini btn-info" name="memory">装载</button>
		  </div>
		  <div class="control-group">
		     <label class="control-label">后台侦听任务:</label>
	         <label class="qmi-label" name="listenTaskSt">状态：@{listenTaskStDesc}<img src="resources/img/no-run.png"/></label>
	         <button class="btn btn-mini btn-info" name="listenTaskSt"></button>
		  </div>
		  <div class="control-group">
		     <label class="control-label">后台调度程序:</label>
	         <label class="qmi-label" name="scheduleTaskSt">状态：@{scheduleTaskStDesc}<img src="resources/img/no-run.png"/></label>
	         <button class="btn btn-mini btn-info" name="scheduleTaskSt"></button>
		  </div>
		  <div class="control-group">
		     <label class="control-label">JMX服务:</label>
	         <label class="qmi-label" name="jmxSt">状态：@{jmxStDesc}<img src="resources/img/no-run.png"/></label>
	         <button class="btn btn-mini btn-info" name="jmxSt"></button>
		  </div>
		  <div class="control-group">
		     <label class="control-label">SMX服务:</label>
	         <label class="qmi-label" name="smxSt">状态：@{smxStDesc}<img src="resources/img/no-run.png"/></label>
		  </div>
	  </div>
</form>