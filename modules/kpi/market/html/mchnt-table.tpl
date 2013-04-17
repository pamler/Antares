<table class="table table-condensed table-striped">
	<tr>
		<th>主要发卡行<br>交易金额占比</th>
		<th>2012.06</th>
		<th>2012.05</th>
		<th>2012.04</th>
		<th>2012.03</th>
		<th>2012.02</th>
		<th>2012.01</th>
	</tr>
	{@each list as lt}
		<tr>
			<td>@{lt.instNm}</td>
			{@each lt.vRlist as vr}
				<td>@{vr}</td>
			{@/each}
		</tr>
	{@/each}
</table>