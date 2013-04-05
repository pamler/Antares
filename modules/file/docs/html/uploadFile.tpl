<div class="span20 file-upload">
	<div class="span24 header-box">
		<h2 class="title">
			上传文档
			<a class="query-link" href="#">我的上传&nbsp;&nbsp;&nbsp;<i class="icon-arrow-right"></i></a>
		</h2>
	</div>
	<div class="span24 f-box" id="file-upload-ie7">
		<div class="span3 f-lbox">
			<h3>文档信息</h3>
			<a class="add-btn" href="#" id="pickfiles"></a>
		</div>
		<div class="span21 f-rbox files-to-upload">
			<span class="info">单个文件大小不能超过10M，支持多文件选取</span>
			<div class="tag-list"></div>
		</div>
	</div>
	<div class="span24 f-box">
		<div class="span3 f-lbox">
			<h3>标签信息</h3>
			<a class="add-btn add-labels" href="#"></a>
		</div>
		<div class="span21 f-rbox labels-to-upload">
			<span class="info">添加标签，用英文分号分割，若不填标签默认为其他</span>
			<div class="tag-list"></div>
		</div>
	</div>
	<div class="span24 f-box">
		<div class="span3 f-lbox">
			<h3>可见人信息</h3>
			<input class="check-all" type="checkbox" checked="checked">所有人可见</input>
		</div>
		<div class="span21 f-rbox persons-to-upload">
			<span class="info">所有人可见</span>
			<div class="tag-list">
			</div>
			<div class="persons-detail">
				<div class="persons-query">
					<div class="prepend">
					    <span>姓名:</span>
					    <input type="text" class="input-small" name="username" />
					</div>
					<div class="prepend">
					    <span>机构:</span>
					    <select type="text" name="instname">
					  		<option value="">全部</option>
					  		<option value="0801020000">工商银行</option>
					  		<option value="0801030000">农业银行</option>
					  		<option value="0801040000">中国银行</option>
					  		<option value="0801050000">建设银行</option>
					  		<option value="0803010000">交通银行</option>
					  		<option value="0801000000">邮政储汇</option>
					  		<option value="0803020000">中信银行</option>
					  		<option value="0803030000">光大银行</option>
					  		<option value="0803040000">华夏银行</option>
					  		<option value="0803050000">民生银行</option>
					  		<option value="0803060000">广发银行</option>
					  		<option value="0803080000">招商银行</option>
					  		<option value="0803090000">兴业银行</option>
					  		<option value="0803100000">浦发银行</option>
					  		<option value="0804012900">上海银行</option>
					  		<option value="0804031000">北京银行</option>
					  		<option value="0805450000">平安银行</option>
					  		<option value="0800010000">中国银联</option>
					    </select>
					</div>
					<div class="prepend">
					    <span>部门:</span>
					    <input type="text" class="input-small" name="deptname" />
					</div>
				    <button class="btn btn-mini query-person">查询</button>
				</div>
				<div class="persons-list">
					<select multiple="true">
			    	</select>
		        	<span class="help-block">双击添加可见人信息</span>
				</div>
			</div>
		</div>
	</div>
	<div class="span24 f-box">
		<div class="span3 f-lbox">
			<h3>文件说明</h3>
		</div>
		<div class="span21 f-rbox">
			<div class="info">可不填</div>
			<textarea id="desc-to-upload" rows="3"></textarea>
		</div>
	</div>
	<div class="span24 footer-box">
		<button class="btn btn-primary upload"><i class="icon-arrow-up icon-white"></i>&nbsp;上传</button>
		<button class="btn clear-all">重置</button>
	</div>
</div>
