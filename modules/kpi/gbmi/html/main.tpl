<div class="span24 gbmi-header">
	<h4>36家分公司数据明细</h4>
	<ul class="nav nav-tabs">
	  {@each list as lt, k}
	  	  {@if k == 0}
	          <li class="active"><a href="#gbmi-tab-@{lt.objValue}" data-ruleid=@{lt.objValue} data-rendered=true data-toggle="tab">@{lt.objName}</a></li>
	      {@else}
	 		  <li><a href="#gbmi-tab-@{lt.objValue}" data-ruleid=@{lt.objValue} data-rendered=false data-toggle="tab">@{lt.objName}</a></li>
	 	  {@/if}
	  {@/each}
	</ul>
</div>
<div class="span24 tab-content">
	{@each list as lt, k}
	    {@if k == 0}
	  	    <div class="tab-pane active" id="gbmi-tab-@{lt.objValue}"></div>
	  	{@else}
	  	  	<div class="tab-pane" id="gbmi-tab-@{lt.objValue}"></div>
	   {@/if}
	{@/each}
</div>
