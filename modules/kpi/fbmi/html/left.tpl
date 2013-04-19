<h3>@{ruleNm}</h3>
{@if ruleId != 0}
	<span class="belong-type"></span>
{@/if}
<div>
	<a class="view-detail"></a>
</div>
<table class="table">
	<tr>
		<td class="first-item">@{scoreValRank}</td>
		<td class="last-item">排名</td>
	</tr>
	<tr>
		<td class="first-item">
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
		<td class="last-item">较上月排名</td>
	</tr>
	<tr>
		{@if ruleId == 0}
			<td class="first-item">@{scoreVal}</td>
		{@else}
			<td class="first-item">@{totalPercent}</td>
		{@/if}
		<td class="last-item">本月得分</td>
	</tr>
	{@if ruleId != 0}
		<tr>
			<td class="first-item">@{weight}</td>
			<td class="last-item">指标权重</td>
		</tr>
	{@/if}
</table>