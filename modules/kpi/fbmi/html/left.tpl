<h3>@{ruleNm}</h3>
<div>
	{@if ruleId != 0}
		<p class="belong-type"></p>
	{@/if}
	<a class="view-detail"></a>
</div>
<table class="table">
	<tr>
		<td>@{scoreValRank}</td>
		<td>排名</td>
	</tr>
	<tr>
		<td>
			{@if changeInRank > 0}
				@{changeInRank} <img src="resources/img/rank-up.png">
			{@else if changeInRank == 0}
				<img src="resources/img/rank-zero.png">
			{@else if changeInRank < 0}
				@{changeInRank*(-1)} <img src="resources/img/rank-down.png">
			{@else}
				无
			{@/if}
		</td>
		<td>较上月排名</td>
	</tr>
	<tr>
		{@if ruleId == 0}
			<td>@{scoreVal}</td>
		{@else}
			<td>@{totalPercent}</td>
		{@/if}
		<td>本月得分</td>
	</tr>
	{@if ruleId != 0}
		<tr>
			<td>@{weight}</td>
			<td>指标权重</td>
		</tr>
	{@/if}
</table>