var todolist=[];
var id=1;

function addList(){
    var _title=$('#title').val();
    var _message=$('#message').val();

    if(_title =="" || _message==""){
        alert('請輸入內容');
    }else{
        var newtodo={
            '_id':id,
            'title':_title,
            'content':_message,
            'status':false
        };
        todolist.push(newtodo);
        newList(newtodo);
        id++;
        $('#title').val('');
        $('#message').val('');
    }
}
function newList(data){
    var status=(data.status)?"checked":"";
    var titleClass=(data.status)?"title2":"title";
    var messageClass=(data.status)?"message2":"message";
    var editClass=(data.status)?"none":"inline";

    var content=
    `<div class="content" id="${data._id}">
        <div class="${titleClass}">
            <input type="checkbox" onclick="changeStatus('${data._id}',this)"/>
            <text id="title${data._id}">${data.title}</text>
            <button class="i_btn" onclick="removeList('${data._id}')">刪除</button>
            <button class="i_btn" id="edit${data._id}" style="display:${editClass}" onclick="editList('${data._id}')">修改</button>
            <button class="i_btn" id="update${data._id}" style="display:none" onclick="updateList('${data._id}')">確認</button>
        </div>
        <div class="${messageClass}">
            <text id="message${data._id}">${data.content}</text>
        </div>
    `;
    $('body').append(content);
}
function editList(id){
    $('#edit'+id).css("display","none");
    $('#update'+id).css("display","inline");
    var input=document.createElement("input");
    input.type="text";
    input.id="edit_title"+id;
    input.value=$('#title'+id).text();
    input.size=Math.max(20/4*3,4);
    $('#title'+id).css("display","none");
    $('#title'+id).parent().append(input);
    var message_input=document.createElement("input");
    message_input.type="text";
    message_input.id="edit_message"+id;
    message_input.value=$('#message'+id).text();
    message_input.size=Math.max(50/4*3,4);
    $('#message'+id).css("display","none");
    $('#message'+id).parent().append(message_input);
}
function updateList(id){
    var title=$('#edit_title'+id).val();
    var message=$('#edit_message'+id).val();
    $('#title'+id).text(title);
    $('#message'+id).text(message);
    $('#edit'+id).css("display","inline");
    $('#update'+id).css("display","none");
    $('#title'+id).css("display","inline");
    $('#message'+id).css("display","inline");
    $('#edit_title'+id).remove();
    $('#edit_message'+id).remove();
}
function removeList(id){
    var index=todolist.indexOf(id);
    todolist.splice(index,1);
    $('#'+id).remove();
}
function changeStatus(id,btnstatus){
    var title=btnstatus.parentNode;
    var message=title.nextElementSibling;
    if(btnstatus.checked){
        title.className="title2";
        message.className="message2";
        $('#edit'+id).css("display","none");
        $('#update'+id).css("display","none");
        if(document.getElementById("edit_title"+id)){
            $('#title'+id).css("display","inline");
            $('#message'+id).css("display","inline");
            $('#edit_title'+id).remove();
            $('#edit_message'+id).remove();
        }
    }else{
        title.className="title";
        message.className="message";
        $('#edit'+id).css("display","inline");
    }

}