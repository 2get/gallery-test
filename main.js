$(function() {

  var gallery_container_id = '#gallery';

  var source = $('#work-template').html();
  var template = Handlebars.compile(source);

  var loadJsonAndRenderToGallery = function(json_url) {
    $.ajax({
      url: json_url,
      dataType: 'json',
      success: function(data) {
        // 前回表示している要素を空
        $(gallery_container_id).empty()
        // JSON で取得したデータを img タグにして指定要素に追加挿入
        $.each(data.images, function(index, url) {
          $('<li class="thumbnail"><a class="modal_trigger" rel="learnModal" href="#modal_' + (index + 1) + '"><img src="' + url + '" alt="" /></li>').appendTo(gallery_container_id);
        })

        // モーダルの内容要素作成
        $.each(data.works, function(index, work) {
          var context = work;
          context.index = index;
          var html = template(context);
          $('#work-container').html(html);
        });
      }
    });
  };

  // メニュークリックしたら JSON 読み込む処理する
  $('.menu-item').on('click', function() {
    var url = $(this).data('url');
    loadJsonAndRenderToGallery(url);
  });

  // 初期表示
  loadJsonAndRenderToGallery('datas/cats.json');

})