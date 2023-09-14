$(function() {
  // Change settings tabs
	$('#settings-tabs li').click(function(){
		var tab_id = $(this).attr('data-tab');

		$('#settings-tabs li').removeClass('active');
		$('.settings-content').removeClass('active');

		$(this).addClass('active');
		$("#"+tab_id).addClass('active');
	})
});