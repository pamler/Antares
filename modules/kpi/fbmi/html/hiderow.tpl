<tr class="bmi-subgrid" style="display:none;">
	<td style="width:20%"></td>
	<td style="width:80%">
		<div style="display:none;"><table class="bmi-grid">
			{@each responseData as lt, k}
			<tr>
				<td class="subgrid-group-title" colspan="2" style="padding:5px 10px;"><span data-control=@{k} class="subgrid-icon"></span> @{lt.title}</td>
			</tr>
			{@each lt.content as lt2, m}
				<tr role=@{k} class="subgrid-row">
                	<td style="width:20%; padding:5px 10px;">@{lt2.objName}:</td>
                	{@if m == 2}
      					<td style="width:80%;padding:5px 10px;">@{lt2.objValue}&nbsp;&nbsp;&nbsp;<span class="label label-success kj-desc" >口径说明</span></td>
          			{@else}
          				<td style="width:80%;padding:5px 10px;">@{lt2.objValue}</td>
          			{@/if}
            	</tr>
        	{@/each}
        	{@/each}
        </table></div>
    </td>
</tr>