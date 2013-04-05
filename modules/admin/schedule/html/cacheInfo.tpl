<form class="form-widget form-inline">
	  <div class="group">
	  	  <h2>缓存管理</h2>
  	  	  <hr>
  	  	  <div class="control-group">
              <label class="control-label">缓存类型:</label>
              <select class="span2">
                  <option value="local">本地</option>
                  <option value="remote">远程</option>
              </select>
              <label class="control-label">缓存名称:</label>
              <input type="text" class="span3" name="user-input" placeholder="请输入字符">
              <a class="btn btn-small btn-danger" href="#"><i class="icon-ban-circle icon-white"></i> 删除缓存</a>
          </div>
	  </div>
	  <div class="group">
	  	  <h2>二级缓存（本地）<span class="label label-info">刷新</span></h2>
  	  	  <hr>
  	  	  <div name="local-sndcache"></div>
	  </div>
	  <div class="group">
	  	  <h2>二级缓存（远程）<span class="label label-info">刷新</span></h2>
  	  	  <hr>
  	  	  <div name="remote-sndcache"></div>
	  </div>
	  <div class="group">
	  	  <h2>用户缓存（本地）<span class="label label-info">刷新</span></h2>
  	  	  <hr>
  	  	  <div name="local-custcache"></div>
	  </div>
	  <div class="group">
	  	  <h2>用户缓存（远程）<span class="label label-info">刷新</span></h2>
  	  	  <hr>
  	  	  <div name="remote-custcache"></div>
	  </div>
</form>