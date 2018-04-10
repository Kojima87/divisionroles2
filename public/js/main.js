function initProc(){
  // エリアの初期化
  $('#myentry input:checkbox').each(function(i, v){
    myentry.rows[i].cells[2].innerText = "";
  });
}

$(function() {
  // 担当決め
  $("p:first").click(function(){
    initProc();
    var entry_cnt = $('#myentry input:checkbox:checked').length;
    var roles = ['ゴミ全般', '床・掃除機', 'トイレ・シンクなど水回り'];

    // エントリー数が役割より多い場合、免除を加える（少ない場合はアラート）
    if (entry_cnt > roles.length){
      var counter = roles.length;
      while (entry_cnt > counter) {
        roles.push('免除！');
        counter++;
      }
    } else if (entry_cnt < roles.length){
      alert('人数を増やしてください');
      return;
    }
    for (var i = roles.length - 1; i >= 0; i--){
      // 0~iのランダムな数値を取得
      var rand = Math.floor( Math.random() * ( i + 1 ) );
      // 配列の数値を入れ替える
      [roles[i], roles[rand]] = [roles[rand], roles[i]]
    }
    var index = 0;
    $('#myentry input:checkbox:checked').each(function(i, v){
      var rowIndex = $("[id=id]").index(this);
      myentry.rows[rowIndex].cells[2].innerText = roles[index];
      index ++;
    });
  });

  // エントリー追加
  $('input#add_btn').click(function(event){
    var input_name = $('#new_entry').val();
    if (input_name != "") {
      idx = $('#myentry').prop('rows').length
      $('#myentry').append('<tr><td><input type="checkbox" id="id" name="entry" class="list" value=' + input_name + '></td><td>' + input_name + '</td><td></td></tr>');
      $('#new_entry').val("");
    } else {
      alert ('エントリー名を入力してください');
    }
  });

  // エントリー削除
  $('input#delete_btn').click(function(event){
    if(!confirm('本当に削除しますか？')){
        /* キャンセルの時の処理 */
        return false;
    }else{
        /*　OKの時の処理 */
        $('#myentry input[type=checkbox]:checked').each(function() {
            $(this).closest('tr').remove();
        });
    }
  });

  // 行クリックでチェックボックスをチェック
  $('[name=entry]').click(function(e){
      e.stopPropagation();
  }).parents('tr').click(function(){
      $(this).find('[name=entry]').prop('checked', !$(this).find('[name=entry]').prop('checked'));
  });

  // 全選択・全解除
  $('#entry_all').click(function(){
    $('.list').prop("checked", $(this).prop("checked"));
  });

})
