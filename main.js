$(function() {

  var gallery_container_id = '#gallery';

  var loadJsonAndRenderToGallery = function(json_url) {
    $.ajax({
      url: json_url,
      dataType: 'json',
      success: function(data) {
        // 前回表示している要素を空
        $(gallery_container_id).empty()
        // JSON で取得したデータを img タグにして指定要素に追加挿入
        $.each(data.images, function(index, url) {
          $('<img/>').attr('src', url).appendTo(gallery_container_id);
        })
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