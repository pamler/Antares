<div style="margin:15px 30px 0px 0px; width:100%;">
	<div class="bmi-grid-header">指标概览</div>
	<table border="1" class="bmi-grid">
		{@each list as lt, k}
		{@if k == 2}
			<tr class="row-special">
	  			<td style="width:20%;padding:5px 10px;text-align:right;">@{lt.objName}:</td>
				<td style="width:80%;padding:5px 10px;">@{lt.objValue}&nbsp;&nbsp;&nbsp;<span class="label label-success bmi-expand-subgrid">指标构成</span></td>
			</tr>
		{@else}
			<tr>
	  			<td style="width:20%;padding:5px 10px;text-align:right;">@{lt.objName}:</td>
				<td style="width:80%;padding:5px 10px;">@{lt.objValue}</td>
			</tr>
		{@/if}
		{@/each}
	</table>
</div>