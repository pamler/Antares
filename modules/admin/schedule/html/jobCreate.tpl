<style type="text/css">
    .modal{ width: 1000px; margin-left: -480px; } 
</style>
<form class="form-widget form-inline" id="jobInfo-create-working-form">
    <div class="group">
        <h2>
            基本信息
        </h2>
        <hr>
        <div class="control-group">
            <label class="control-label">
                JobID:
            </label>
        
            <input type="text" class="span3" name="jobID" placeholder="请输入8位内字母数字">
            <label class="control-label">
                子系统:
            </label>
            <select id="jobInfo-systemID" name="systemID" class="span4">
            </select>
            <label class="control-label">
                英文名称:
            </label>
            <input type="text" class="span4" name="jobEnNM" placeholder="请输入30位内字母数字">
            <label class="control-label">
                中文名称:
            </label>
            <input type="text" class="span4" name="jobCnNM" placeholder="请输入15位内中文">
        </div>
    </div>
    <div class="group">
        <h2>
            执行方法
        </h2>
        <hr>
        <div class="control-group">
            <label class="control-label">
                方法ID:
            </label>
            <input type="text" class="span4" name="func[funDtlID]" placeholder="请输入数字">
            <label class="control-label">
                方法类别:
            </label>
            <input type="text" class="span4" name="func[funType]" placeholder="请输入2位字母">
            <label class="control-label">
                方法名称:
            </label>
            <input type="text" class="span4" name="func[funName]" placeholder="请输入50位内字符">
        </div>
        <div class="control-group">
            <label class="control-label">
                方法路径:
            </label>
            <input type="text" class="span5" name="func[funPath]" placeholder="请输入50位内字符">
            <label class="control-label">
                日志路径:
            </label>
            <input type="text" class="span4" name="func[logPath]" placeholder="请输入50位内字符">
        </div>
        <div class="control-group">
            <label class="control-label">
                参数:
            </label>
            <input type="text" class="span10" name="func[funParameter]" placeholder="请输入100位内字符">
        </div>
        <div class="control-group">
            <label class="control-label">
                其他信息:
            </label>
            <input type="text" class="span10" name="func[funDescribe]" placeholder="请输入100位内字符">
        </div>
    </div>
    <div class="group">
        <h2>
            执行服务
        </h2>
        <hr>
        <div class="control-group">
            <label class="control-label">
                服务ID:
            </label>
            <input type="text" class="span3" name="srvc[svcDtlID]" placeholder="请输入数字">
            <label class="control-label">
                传输协议:
            </label>
            <input type="text" class="span4" name="srvc[transType]" placeholder="请输入4位内字母数字">
            <label class="control-label">
                服务类型:
            </label>
            <input type="text" class="span4" name="srvc[svcType]" placeholder="请输入2位内字母数字">
            <label class="control-label">
                服务名称:
            </label>
            <input type="text" class="span4" name="srvc[svcName]" placeholder="请输入100位内字符">
        </div>
        <div class="control-group">
            <label class="control-label">
                服务IP:
            </label>
            <input type="text" class="span4" name="srvc[ip]" placeholder="请输入15位内字符">
            <label class="control-label">
                服务端口:
            </label>
            <input type="text" class="span4" name="srvc[port]" placeholder="请输入数字">
        </div>
        <div class="control-group">
            <label class="control-label">
                用户名:
            </label>
            <input type="text" class="span4" name="srvc[userName]" placeholder="请输入20位内字符">
            <label class="control-label">
                密码:
            </label>
            <input type="text" class="span4" name="srvc[password]" placeholder="请输入20位内字符">
        </div>
        <div class="control-group">
            <label class="control-label">
                服务路径:
            </label>
            <input type="text" class="span10" name="srvc[svcPath]" placeholder="请输入50位内字符">
        </div>
        <div class="control-group">
            <label class="control-label">
                其他信息:
            </label>
            <input type="text" class="span10" name="srvc[svcDescribe]" placeholder="请输入100位内字符">
        </div>
    </div>

    <fieldset class="form-actions">
  <button class="btn btn-primary submit-confirm">
        <i class="icon-arrow-up icon-white">
        </i>
        新增确认
    </button>
    <button class="btn clear">
        清空
    </button>
  </fieldset>
    
</form>
<div id="jobInfo-createModal" class="modal hide fade" tabindex="-1" role="dialog"
aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
            ×
        </button>
        <h3>
            新增确认
        </h3>
    </div>
    <div class="modal-body">
        <p>
        </p>
        <form class="form-widget form-inline" id="jobInfo-create-form">
            <div class="group">
                <h2>
                    基本信息
                </h2>
                <hr>
                <div class="control-group">
                    <label class="control-label">
                        JobID:
                    </label>
                    <input type="text" class="span4" name="jobID" placeholder="请输入8位内字母数字"
                    readonly>
                    <label class="control-label">
                        子系统:
                    </label>
                    <input type="text" class="span4" name="systemName" readonly>
                </div>
                <div class="control-group">
                    <label class="control-label">
                        英文名称:
                    </label>
                    <input type="text" class="span4" name="jobEnNM" placeholder="请输入30位内字母数字"
                    readonly>
                    <label class="control-label">
                        中文名称:
                    </label>
                    <input type="text" class="span4" name="jobCnNM" placeholder="请输入15位内中文"
                    readonly>
                </div>
            </div>
            <div class="group">
                <h2>
                    执行方法
                </h2>
                <hr>
                <div class="control-group">
                    <label class="control-label">
                        方法ID:
                    </label>
                    <input type="text" class="span4" name="func[funDtlID]" placeholder="请输入数字"
                    readonly>
                    <label class="control-label">
                        方法类别:
                    </label>
                    <input type="text" class="span4" name="func[funType]" placeholder="请输入2位字母"
                    readonly>
                    <label class="control-label">
                        方法名称:
                    </label>
                    <input type="text" class="span4" name="func[funName]" placeholder="请输入50位内字符"
                    readonly>
                </div>
                <div class="control-group">
                    <label class="control-label">
                        方法路径:
                    </label>
                    <input type="text" class="span5" name="func[funPath]" placeholder="请输入50位内字符"
                    readonly>
                    <label class="control-label">
                        日志路径:
                    </label>
                    <input type="text" class="span4" name="func[logPath]" placeholder="请输入50位内字符"
                    readonly>
                </div>
                <div class="control-group">
                    <label class="control-label">
                        参数:
                    </label>
                    <input type="text" class="span10" name="func[funParameter]" placeholder="请输入100位内字符"
                    readonly>
                </div>
                <div class="control-group">
                    <label class="control-label">
                        其他信息:
                    </label>
                    <input type="text" class="span10" name="func[funDescribe]" placeholder="请输入100位内字符"
                    readonly>
                </div>
            </div>
            <div class="group">
                <h2>
                    执行服务
                </h2>
                <hr>
                <div class="control-group">
                    <label class="control-label">
                        服务ID:
                    </label>
                    <input type="text" class="span4" name="srvc[svcDtlID]" placeholder="请输入数字"
                    readonly>
                    <label class="control-label">
                        传输协议:
                    </label>
                    <input type="text" class="span4" name="srvc[transType]" placeholder="请输入4位内字母数字"
                    readonly>
                </div>
                <div class="control-group">
                    <label class="control-label">
                        服务类型:
                    </label>
                    <input type="text" class="span4 uneditable-input" name="srvc[svcType]"
                    placeholder="请输入2位内字母数字" readonly>
                    <label class="control-label">
                        服务名称:
                    </label>
                    <input type="text" class="span4" name="srvc[svcName]" placeholder="请输入100位内字符"
                    readonly>
                </div>
                <div class="control-group">
                    <label class="control-label">
                        服务IP:
                    </label>
                    <input type="text" class="span4" name="srvc[ip]" placeholder="请输入15位内字符"
                    readonly>
                    <label class="control-label">
                        服务端口:
                    </label>
                    <input type="text" class="span4" name="srvc[port]" placeholder="请输入数字"
                    readonly>
                </div>
                <div class="control-group">
                    <label class="control-label">
                        用户名:
                    </label>
                    <input type="text" class="span4" name="srvc[userName]" placeholder="请输入20位内字符"
                    readonly>
                    <label class="control-label">
                        密码:
                    </label>
                    <input type="text" class="span4" name="srvc[password]" placeholder="请输入20位内字符"
                    readonly>
                </div>
                <div class="control-group">
                    <label class="control-label">
                        服务路径:
                    </label>
                    <input type="text" class="span10" name="srvc[svcPath]" placeholder="请输入50位内字符"
                    readonly>
                </div>
                <div class="control-group">
                    <label class="control-label">
                        其他信息:
                    </label>
                    <input type="text" class="span10" name="srvc[svcDescribe]" placeholder="请输入100位内字符"
                    readonly>
                </div>
            </div>
        </form>
    </div>
    <div class="modal-footer">
        <button class="btn" data-dismiss="modal" aria-hidden="true">
            取消
        </button>
        <button class="btn btn-primary submit">
            确认新增
        </button>
    </div>
</div>