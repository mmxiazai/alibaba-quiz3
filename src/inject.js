/**
 * Date: 2013-08-15
 * Desc:
 */
function start(){
  var title2Step = [
    '突破，带锁的门',
    '激光，前进的方向',
    '坐标，隐藏的线索',
	'图案，疯狂的猜测',
	'寻找，无尽的房间',
	'消除! 最后的任务',
	'X，新的任务...'
  ];

  var step = {
    '0': function(){
      window.location = Base64.decode($("#page").attr('data-t'));
    },
    '1': function(){
      $('#ma').css({top: 557,
        left: 759,'-webkit-transform':'rotateZ(-40deg)'});
      $('#mb').css({top: 450,
        left: 785,'-webkit-transform':'rotateZ(-134deg)'});
    },
	'2': function() {
		$.each($('body').html().match(/<!--([\s\S]+)-->/)[1].split(' '), function(i, e) {
			var t = e.split(',');
			var c = document.getElementById('qr-canvas').getContext('2d');
			c.fillRect(t[0], t[1], t[2], t[3]);
		})
	},
	'3': function() {
		$.post('index.php?action=guess', {'key':'3', 'value':''} , function(resp){
			window.location = resp.jump;
		}, "json");
	},
	'4': function() {
		var mainUrl = window.location.href.match('^[^&]+');
		var nextRoom = $('#next-room').html();
		var msg = $('#message').html();
		while (true) {
			if (nextRoom.length == 0) break;
			$.ajax({
				url : mainUrl + '&room=' + nextRoom,
				success : function(resp) {
					nextRoom = $(resp).find('#next-room').html();
					msg += $(resp).find('#message').html();
				},
				async : false
			})
		}
		window.location = msg.match('/quiz3.*$');
	},
	'5': function() {
		window.location = Base64.decode($("body").attr('data-p'));
	},
    '6': function(){
      localStorage.removeItem('autoStart');
      console.log('[http://weibo.com/acmicpc]已经作弊通关！双击重新玩!');
      $('body').on('dblclick', function(){
        window.location = 'index.php?t=undefined';
      });
    }
  };

  for(var i = 0;i < title2Step.length;i ++){
    if ( document.title.indexOf( title2Step[i] ) > -1 ){
      step[i]();
      break;
    }
  }

  $.cookie('hacker', 'acmicpc.info', { expires: 1 });
}
$('body').on('dblclick', function(){
  start();

}).on('contextmenu', function(e){
    e.preventDefault();
  localStorage.setItem('autoStart','enable');
  start();

});

if ( localStorage.getItem('autoStart') == 'enable' ){
  start();
}else
  console.log('一键通关已经准备好了，右键作弊通关,双击只过本关！');
