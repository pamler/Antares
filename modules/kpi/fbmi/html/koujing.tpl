<div class="bmi-koujing">
    <div class="weight">指标权重：@{weight}</div>
	<div class="compute-type">记分方法：@{computeType}</div>
	<div class="formula-title">计算公式：</div><div class="formula">@@{formula}</div>
	<div class="koujing-title">指标口径：</div>
    {@each koujing as kj}
		<div class="koujing"><span class="koujing-name">@{kj.kjName}： </span>@@{kj.desc}</div>
	{@/each}
</div>