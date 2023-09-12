
$('img[usemap]').rwdImageMaps();

const $fotoramaDiv = $(".fotorama").fotorama();
const fotorama = $fotoramaDiv.data("fotorama");

change_mode("Map"); // mapモードがデフォルト

$(".open").magnificPopup({
    type: "inline",
    callbacks: {
      open: function() {
        $.magnificPopup.instance.close = function() {
          let ph = $("#photo");
          ph.children("video").remove();  // videoタグがあれば削除
          ph.children("img").remove();    // imgタグがあれば削除
          // Call the original close method to close the popup
          $.magnificPopup.proto.close.call(this);
        };
      }
    }
});

$("area").on('click',function(){
  let no = this.id;
  let src = `photos/${no}.jpeg`;
  let vsrc = `movies/${no}.mp4`;
  $(".p-title").text(no);

  // videoが存在しない場合はプレイボタンを表示しない
  console.log($(this).data("novideo"));
  if ($(this).data("novideo")) {
    $(".play-btn").hide();
  }else{
    $(".play-btn").show();
  }

  // この方法の方が良いが遅い！
  // if (file_exists(vsrc)) {
  //   $(".play-btn").show();
  // }else{
  //   $(".play-btn").hide();
  // }

  let ph = $("#photo");
  ph.append(`<img src='${src}'>`);  // imgタグ追加
  $("#photo").data("no", no);     // videoタグで参照するnoを保存
});

$(".play-btn").on('click',function(){
  $(this).hide();
  let ph = $("#photo");
  let w = ph.children("img").css("width");
  ph.children("img").remove();
  let no = ph.data("no");  // 保存したnoを取得
  let vsrc = `movies/${no}.mp4`;
  // ph.append(`<video autoplay controls width='${w}' src='${vsrc}'></video>`);
  ph.append(`<video autoplay width='${w}' src='${vsrc}'></video>`);
});

$(".mode li").click(function(){
  change_mode($(this).text());
});

function change_mode(new_mode){
  if (new_mode == "Map") {
    console.log($(".mode li:contains('Map')" ));
    $(".mode li:contains('Map')" ).css( "color", "red" );
    $(".mode li:contains('Gallery')" ).css( "color", "grey" );
    $(".fotorama").hide();
    $(".layout").show();
  } else {
    $(".mode li:contains('Gallery')" ).css( "color", "red" );
    $(".mode li:contains('Map')" ).css( "color", "grey" );
    $(".layout").hide();
    $(".fotorama").show();
    fotorama.show(0);
    fotorama.startAutoplay();
  }
}

function file_exists(fp){
  var flg = null;
  $.ajax({
    url: fp,
    cache: false,
    async:false
  }).done(function(data) {
    flg = true;
  })
  .fail(function(jqXHR, textStatus, errorThrown) {
    flg = false;
  });
  return flg;
}