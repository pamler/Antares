{@each list as lt}
	{@if lt.objValue == '--'}
		<div class="month-panel disable">
			<div class="month-name">@{lt.objName}月</div>
		    <div class="month-rank">排名: @{lt.objValue}</div>
		</div>
	{@else}
		<div class="month-panel">
			<div class="month-name">@{lt.objName}月</div>
		    <div class="month-rank">排名: @{lt.objValue}</div>
		</div>
	{@/if}
{@/each}