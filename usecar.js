mini.parse();
var grid = mini.get("datagrid1");
grid.load({tablename:'oa_usecar',activitiKey:'usecar',whereString:"1=1",orderByString:"id desc"});

$('#addBtn').live('click',function(){
	mini.open({
                url: "content/usecar/addUseCar.jsp",
                title: "新增用车", width: 480, height: 230,
                onload: function () {
                    var iframe = this.getIFrameEl();
                },
                ondestroy: function (action) {
                    grid.reload();
                    grid.fire('selectionchanged');
                }
            });
});

$('#backBtn').live('click',function(){
	var row = grid.getSelected();
	$.ajax({
        url: "jump.do",
        type: 'post',
        data: { proid: row.processinstanceId},
        cache: false,
        success: function (text) {
            CloseWindow("save");
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR.responseText);
            CloseWindow();
        }
    });
});

$('#editBtn').live('click',function(){
    var row = grid.getSelected();
    mini.open({
                url: "content/usecar/addUseCar.jsp",
                title: "编辑用车", width: 480, height: 230,
                onload: function () {
                    var iframe = this.getIFrameEl();
                    var data = mini.clone(row);
                    data.action = "edit";
                    if(data.applytime)
                    {
                        data.applytime = new Date(data.applytime);
                    }
                    iframe.contentWindow.SetData(data);
                },
                ondestroy: function (action) {
                    grid.reload();
                    grid.fire('selectionchanged');
                }
            });
});

$('#auditBtn').live('click',function(){
    var row = grid.getSelected();
    mini.open({
                url: "content/usecar/addUseCar.jsp",
                title: "用车审核", width: 480, height: 230,
                onload: function () {
                    var iframe = this.getIFrameEl();
                    var data = mini.clone(row);
                    data.action = "edit";
                    if(data.applytime)
                    {
                        data.applytime = new Date(data.applytime);
                    }
                    iframe.contentWindow.SetData(data);
                },
                ondestroy: function (action) {
                    grid.reload();
                    grid.fire('selectionchanged');
                }
            });
});

$('#workflowViewBtn').live('click',function(){
    var obj = grid.getSelected();
    showFlowView(obj.processinstanceId);
});

function showFlowView(pid)
{
    mini.open({
                url: "common/workflow.jsp",
                title: "查看流程图", width: 600, height: 400,
                onload: function () {
                    var iframe = this.getIFrameEl();
                    var img = iframe.contentWindow.document.getElementById('flowImg')
                    img.setAttribute('src','../workflow/process/trace/auto.do?executionId='+pid);
                },
                ondestroy: function (action) {
                    grid.reload();
                }
            });
}

$('#deleteBtn').live('click',function(){
    var rows = grid.getSelecteds();
    mini.confirm('是否确认删除这'+rows.length+'条数据','',function(state){
        if(state=='ok')
        {
            var whereString = "id in (";
            for(var i=0;i<rows.length;i++)
            {
                whereString+=rows[i].id + ',';
            }
            whereString = whereString.substring(0, whereString.length-1) + ')';
            
            $.ajax({
                url: "delData.do",
                type: 'post',
                data: { whereString: whereString,tablename:'oa_usecar' },
                cache: false,
                success: function (text) {
                    grid.reload();
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert(jqXHR.responseText);
                }
            });
        }
    });
});

grid.on('selectionchanged',function(e){
    var rows = grid.getSelecteds();
    if(rows.length>1)
    {
        Utils.disableBtn($('#editBtn'));
        Utils.disableBtn($('#auditBtn'));
        Utils.disableBtn($('#workflowViewBtn'));
        var showDel = true;
        for(var i=0;i<rows.length;i++)
        {
            if(rows[i].processinstanceId)
            {
                showDel = false;
                break;
            }
        }

        if(showDel)
           Utils.enableBtn($('#deleteBtn'));
        else
           Utils.disableBtn($('#deleteBtn'));
    }
    else if(rows.length==1)
    {
        if(rows[0].processinstanceId)
        {
            Utils.disableBtn($('#editBtn'));
            Utils.enableBtn($('#auditBtn'));
            Utils.enableBtn($('#workflowViewBtn'));
            Utils.disableBtn($('#deleteBtn'));
        }
        else
        {
            Utils.enableBtn($('#editBtn'));
            Utils.disableBtn($('#auditBtn'));
            Utils.disableBtn($('#workflowViewBtn'));
            Utils.enableBtn($('#deleteBtn'));
        }
    }
    else
    {
        Utils.disableBtn($('#editBtn'));
        Utils.disableBtn($('#auditBtn'));
        Utils.disableBtn($('#deleteBtn'));
        Utils.disableBtn($('#workflowViewBtn'));
    }
});

grid.on("drawcell",function (e){
    if(e.field == "applytime" || e.field == "endtime") 
    {
        if(e.value)
        {
            var data = new Date(e.value);
            e.cellHtml = mini.formatDate(data, "yyyy-MM-dd");
        }
    }
});

grid.fire('selectionchanged');

function taskRender(e)
{
    if(e.row.processinstanceId && e.row.task_state!="已结束" && e.row.taskId)
    {
        return '<a href="javascript:void(0)" style="color:red;" onclick="showFlowView('+e.row.processinstanceId+');">'+e.cellHtml+'</a>';
    }
    else
    {
        return e.cellHtml;
    }
}