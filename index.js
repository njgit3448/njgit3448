
$('img[usemap]').rwdImageMaps();

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
  $(".p-title").text(no);
  $(".play-btn").show();
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