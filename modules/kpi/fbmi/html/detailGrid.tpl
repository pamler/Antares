<div class="row-fluid" style="margin-top:25px;">
	<div class="bmi-grid-header">指标详细</div>
	<table class="bmi-grid">
		{@each list as lt, k}
		<tr>
  			<td style="text-align:right;">@{lt.objName}:</td>
  			{@if k == 3}
  				<td>@{lt.objValue}&nbsp;&nbsp;&nbsp;<span class="label label-success kj-desc">口径说明</span></td>
  			{@else}
  				<td>@{lt.objValue}</td>
  			{@/if}
		</tr>
		{@/each}
	</table>
</div>