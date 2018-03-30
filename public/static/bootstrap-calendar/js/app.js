var setCalendar = function($) {

	"use strict";
	function getEventsData () {
		return 1
	}

	// window.collegeSelected = 'dtu' ;

	var options = {
		events_source: '/getevents/' + window.collegeSelected ,
		view: 'month',
		tmpl_path: '/bootstrap-calendar/tmpls/',
		tmpl_cache: false,
		day: getDate(),
		onAfterEventsLoad: function(events) {
			if(!events) {
				return;
			}
			var list = $('#eventlist');
			list.html('');

			$.each(events, function(key, val) {
				$(document.createElement('li'))
					.html('<a href="' + val.url + '">' + val.title + '</a>')
					.appendTo(list);
			});
		},
		onAfterViewLoad: function(view) {
			$('.page-header h3').text(this.getTitle());
			$('.btn-group button').removeClass('active');
			$('button[data-calendar-view="' + view + '"]').addClass('active');
		},
		classes: {
			months: {
				general: 'label'
			}
		}
	};

	var calendar = $('#calendar').calendar(options);
	calendar.setOptions({modal: '#myModal'});
	// calendar.setOptions({modal_t});



	$('.btn-group button[data-calendar-nav]').each(function() {
		var $this = $(this);
		$this.click(function() {
			calendar.navigate($this.data('calendar-nav'));
		});
	});

	$('.btn-group button[data-calendar-view]').each(function() {
		var $this = $(this);
		$this.click(function() {
			calendar.view($this.data('calendar-view'));
		});
	});
}


$.getJSON('getevents/search', function(data) {
    var colleges = data

    var mySelect = $('#mySelect');
    $.each(colleges, function(val, text) {
      mySelect.append(
        $('<option></option>').val(val).html(text)
        );
    });

  })



$('#get-data').click(function() {
	$('#calendar').empty();
	$('.page-header').removeClass('hide');
	window.collegeSelected = $('#mySelect').val() ;
	setCalendar(jQuery);

})

function getDate(){
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!

	var yyyy = today.getFullYear();
	if(dd<10){
		dd='0'+dd;
	} 
	if(mm<10){
		mm='0'+mm;
	} 
	return yyyy+ '-' + mm + '-' + dd;
}
