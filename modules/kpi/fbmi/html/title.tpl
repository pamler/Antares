<div class="bmi-branch-logo span4">
    <img src="resources/img/branchlogo/@{acqIntnlOrgCd}.png">
</div>
<div class="split"></div>
<div class="bmi-info span16">
	本分公司 <b style="font-size:16px;"> @{convertDate} </b><span class="bmi-calendar">切换月份</span>分公司考核总分排名:
	{@if changeInRank > 0 || changeInRank == '--'}
		<b style="font-size:24px;color:#c81e1e">@{scoreValRank}</b>
	{@else if changeInRank == 0}
		<b style="font-size:24px;color:#1e5ab4">@{scoreValRank}</b>
	{@else if changeInRank < 0}
		<b style="font-size:24px;color:#319500">@{scoreValRank}</b>
	{@/if}
	，&nbsp;
	{@if changeInRank > 0}比上个月排名上升<b>@{changeInRank}</b>名 <img src="resources/img/rank-up.png"/>
	{@else if changeInRank == 0}与上月排名持平 <img src="resources/img/rank-zero.png"/>
	{@else if changeInRank < 0 && changeInRank > -999999}比上个月排名下降<b>@{changeInRank*(-1)}</b>名 <img src="resources/img/rank-down.png"/>
	{@else if changeInRank == -999999}与上月排名无
	{@/if}
</div>
<div class="bmi-tool span4">
	<span class="bmi-phone"></span><span class="bmi-email"></span>
	<a class="msg-bind">消息订阅</a>
</div>