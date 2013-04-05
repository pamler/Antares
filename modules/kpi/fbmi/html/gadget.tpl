{@each list as lt}
	{@if lt.readyTp == 2}
		<div class="span5 gadget disabled" data-ruletp=@{lt.ruleTp} data-ruleid=@{lt.ruleId}>
	  		<div class="info">
	    		<p class="type">@{lt.ruleNm}</p>
					<p class="score">得分/权重：<span><b style="font-size:16px;">@{lt.totalPercent}</b> / @{lt.weight}</span></p>
	  		</div>
	  		<div class="rank"></div>
	  	</div>
	{@else if lt.readyTp == 3}
		<div class="span5 gadget disabled" data-ruletp=@{lt.ruleTp} data-ruleid=@{lt.ruleId}>
	  		<div class="info">
	    		<p class="type">@{lt.ruleNm}</p>
					<p class="score">得分/权重：<span><b style="font-size:16px;">@{lt.totalPercent}</b> / @{lt.weight}</span></p>
	  		</div>
	  		<div class="rank"><p style="font-size:12px;margin-left:8px;">未生成</p></div>
	  	</div>
	{@else}
		<div class="span5 gadget enabled" data-ruletp=@{lt.ruleTp} data-ruleid=@{lt.ruleId}>
	  		<div class="info">
	    		<p class="type">@{lt.ruleNm}</p>
					<p class="score">得分/权重：<span><b style="font-size:16px;">@{lt.totalPercent}</b> / @{lt.weight}</span></p>
	  		</div>
	  		{@if (lt.changeInRank > 0 || lt.changeInRank == '--')}
		    	<div class="rank red">
		    		<p>@{lt.scoreValRank}</p>
		  		</div>
		  	{@else if lt.changeInRank == 0}
		  		<div class="rank blue">
		    		<p>@{lt.scoreValRank}</p>
		  		</div>
		  	{@else if lt.changeInRank < 0}
		  		<div class="rank green">
		    		<p>@{lt.scoreValRank}</p>
		  		</div>
		  	{@/if}
	  	</div>
	 {@/if}
{@/each}