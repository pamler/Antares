{@each list as lt,k}
	<a class="bmi-label" data-ruleid=@{lt.ruleId} data-ruletp=0>@{lt.ruleNm}</a>
	{@if k == 0 || k == 4 || k == 7 }
		<div class="bmi-split"></div>
	{@/if}
{@/each}