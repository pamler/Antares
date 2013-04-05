<div class="frozen-table-ct span8">
	<div class="table-header">
		<table class="table table-condensed gbmi-table">
			<thead>
				<tr>
					<th>分公司名称</th>
					<th colspan="3">@{list[0].vRlist[0].ruleNm}<br>@{list[0].vRlist[0].weight}</th>
				</tr>
			</thead>
			<tbody>
				<tr><td></td><td width="20%">得分</td><td width="20%">排名</td><td width="25%">排名变化</td></tr>
			</tbody>
		</table>
	</div>
	<div class="table-body">
		<table class="table table-condensed gbmi-table">
			<tbody>
			{@each list as lt}
				<tr>
					<td>@{lt.acqIntnlOrgNm}</td>
					<td class="sum" width="20%">@{lt.vRlist[0].score}</td>
					<td class="sum" width="20%">@{lt.vRlist[0].rank}</td>
					<td class="sum" width="25%">
						<span class="trend">
						{@if lt.vRlist[0].changeInRank > 0}
							<img src="resources/img/rank-up.png"/>@{lt.vRlist[0].changeInRank}
						{@else if lt.vRlist[0].changeInRank == 0}
							<img src="resources/img/rank-zero.png"/>
						{@else if lt.vRlist[0].changeInRank < 0 && lt.vRlist[0].changeInRank > -36}
							<img src="resources/img/rank-down.png"/>@{lt.vRlist[0].changeInRank*(-1)}
						{@/if}
						</span>
					</td>
				</tr>
			{@/each}
			</tbody>
		</table>
	</div>
</div>
<div class="scroll-table-ct span16">
	<div class="span24 scroll-header-control" style="overflow-x:hidden;">
		<div class="table-header">
			<table class="table table-condensed gbmi-table">
				<thead>
					<tr>
						{@each list[0].vRlist as vr, k}
							{@if k != 0}
								<th colspan="3">@{vr.ruleNm}<br>@{vr.weight}</th>
							{@/if}
						{@/each}
					</tr>
				</thead>
				<tbody>
					<tr>
						{@each list[0].vRlist as vr, k}
							{@if k != 0}
								<td width="42">得分</td><td width="42">排名</td><td width="90">排名变化</td>
							{@/if}
						{@/each}
					</tr>
				</tbody>
			</table>
		</div>
	</div>
	<div class="span24 scroll-body-control">
		<div class="table-body">
			<table class="table table-condensed gbmi-table">
				{@each list as lt}
					<tr>
					{@each lt.vRlist as vr, k}
						{@if k != 0}
							<td width="42">@{vr.score}</td>
							<td width="42">@{vr.rank}</td>
							<td width="90">
								<span class="trend">
								{@if vr.changeInRank > 0}
									<img src="resources/img/rank-up.png"/>@{vr.changeInRank}
								{@else if vr.changeInRank == 0}
									<img src="resources/img/rank-zero.png"/>
								{@else if vr.changeInRank < 0 && vr.changeInRank > -36}
									<img src="resources/img/rank-down.png"/>@{vr.changeInRank*(-1)}
								{@/if}
								</span>
							</td>
						{@/if}
					{@/each}
					</tr>
				{@/each}
			</table>
		</div>
	</div>
</div>	
