document.addEventListener('DOMContentLoaded', function() {
  $("#open_check_list").click(function(){
    var links=["http://www.baidu.com",
    "http://www.google.com"];
    for (var i = links.length - 1; i >= 0; i--) {
        window.open(links[i],'_blank');
    };
  });
});



