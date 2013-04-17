<div class="span22">
    <div class="box">
    <form class="form-horizontal" >
         <fieldset>
         <table>
         	<tr>
	         	<td>
	         	 <div class="control-group">
                 <label class="control-label" for="username">用户：</label>
                 <div class="controls">
                     <input type="text" class="input-medium" id="username" name="username">
                     <span class="help-inline"></span>
                     
                 </div>
                 
	         	</td>
	         	
	         	<td>
	         	 	<div class="control-group">
		                 <label class="control-label" for="operationtp">操作类型：</label>
		                 <div class="controls">
		                     <input type="text" class="input-medium" id="operationtp" name="operationtp">
		                 </div>
             		</div>
	         	</td>
         	</tr>
         	<tr>
         		<td>
	         		<div class="control-group">
	                 <label class="control-label" for="desc">模块：</label>
	                 <div class="controls">
	                     <input type="text" class="input-medium" id="moduleNm" name="moduleNm">
	                 </div>
	             </div>
         		</td>
         		
         		<td>
         		<div class="control-group">
	                 <label class="control-label" for="desc">说明：</label>
	                 <div class="controls">
	                     <input type="text" class="input-medium" id="desc" name="desc">
	                 </div>
	             </div>
         		
         		</td>
         		
         		
         		
         		
         	</tr>
         	<tr>
         	<td>
         	
         	<div class="control-group">
                 <label class="control-label" for="date">时间范围：</label>
                 <div class="controls">
                     <input type="text" class="input-medium startdate" name="startdate"> - 
                     <input type="text" class="input-medium enddate" name="enddate">
                 </div>
             </div>
         	
         	</td>
         	<td></td>
         	</tr>
         	
         	<tr>
         		<td>
         		 	<div class="form-actions">
	                 <button class="btn btn-primary submit">查询</button>
	          		</div>   
         		</td>
         		
         		<td>
         		 <div class="form-actions">
	                 <button class="btn clear">清空</button>
	          		</div>   
         		</td>
         		
         	</tr>
         	
         	
         </table>
         </fieldset>
    </form>
    <div class="udp-grid">
	    <table id="admin-log-list"></table>
	    <div id="admin-log-pager"></div>
    </div>
    </div>
</div>
