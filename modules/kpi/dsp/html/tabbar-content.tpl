<div class="tab-pane {@if first===true}active {@/if} " id="tab-@{insIdCd}-@{tabCounter}">
    <div class="row">
        <div class="tab-bar-options">
        	{@each tabOptions as item, k}
        		<input type="radio" name="@{item.optionType}-@{insIdCd}" value="@{item.optionValue}">
        		@{item.optionNm}
        	{@/each}
         </div>
    </div>
</div>