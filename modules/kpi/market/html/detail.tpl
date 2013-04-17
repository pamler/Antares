<div class="widget-header">
	<h3>Top200重点优质商户交易量分流概率表</h3>
	<h4 class="toback">返回上一页</h4>
</div>
<div class="widget-content">
	<div class="udp-grid">
	    <table id="kpi-market-list"></table>
	</div>
	<div class="row-fluid">
		<div class="span12 mchnt-info">
			<form class="mchnt-form">
				<fieldset>
					<legend>商户详细信息</legend>
					<div class="content">
						 <label name="mchntId">商户编码:&nbsp;&nbsp;<span></span></label>
						 <label name="mchntNm">商户名称:&nbsp;&nbsp;<span></span></label>
						 <label name="mcc">MCC/细分行业类型:&nbsp;&nbsp;<span></span></label>
						 <label name="flrate">交易量被分流的概率:&nbsp;&nbsp;<span></span><a class="mchnt-detail">近6月该商户分流率详情</a></label>
						 <label name="address">注册地址:&nbsp;&nbsp;<span></span></label>
						 <label name="acqInstId">受理机构代码/名称:&nbsp;&nbsp;<span></span></label>
						 <label name="regDate">注册时间/更新时间:&nbsp;&nbsp;<span></span></label>
					</div>
				</fieldset>
			</form>
			<form class="mchnt-table">
				<fieldset>
					<legend>近3月商户交易变化</legend>
					<div class="content">
						<table class="table table-striped">
						</table>
					</div>
				</fieldset>
			</form>
		</div>
		<div class="span12">
			<form class="mchnt-input">
				<fieldset>
					<legend>分公司填写部分</legend>
					<div class="content">
						<label>确实存在交易分流情况:
							<span>
								<input type="radio" name="ifFenliu" value=1>是
								<input type="radio" name="ifFenliu" value=2>否
							</span>
						</label>
						<label>交易异常原因:</label>
						<textarea name="flReason" rows="4"></textarea>
						<label>采取相关措施:</label>
						<textarea name="flMeasure" rows="4"></textarea>
					</div>
				</fieldset>
			</form>
		</div>
	</div>
</div>
