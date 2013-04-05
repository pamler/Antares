<div class="row-fluid">
	<div class="bmi-grid-header">指标比较</div>
	<table class="bmi-grid compare-grid">
		<tr>
			{@each list as lt}
				<td><span>@{lt.objName}:</span><br><span style="font-size:20px;font-weight:bold;color:#333;">@{lt.objValue}</span></td>
			{@/each}
		</tr>
	</table>
</div>