var _ = function(e) {
  return document.getElementById(e);
}

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

var csrftoken = getCookie('csrftoken');
var eventURL = '/home/event/'
var api = '/api/events/'
var source = [
	{
			url: api,
			headers: {
				"X-CSRFToken": csrftoken,
			},
	}
];



/*
 * Sends a request to modify start/end date of an event to the server
 */
function updateEventTimes( event, delta, revertFunc, jsEvent, ui, view )
{
  $.ajax({
    type: 'patch',
    url: api + event.id + '/',
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    headers: {
      'X-CSRFToken': csrftoken,
    },
    data: JSON.stringify({
      id: event.id,
      start: event.start.toISOString(),
      end: event.end.toISOString(),
    }),
    success: function(data, textStatus) {
      if (!data)
      {
        revertFunc();
        return;
      }
      $('#calendar').fullCalendar('updateEvent', event);
    },
    error: function() {
      revertFunc();
    }
  });
};







	$(document).ready(function() {

		$('#calendar').fullCalendar({
			header: {
				left: 'prev,next today',
				center: 'title',
				right: 'month,agendaWeek,agendaDay,listWeek'
			},
			navLinks: true, // can click day/week names to navigate views
			editable: true,
			eventLimit: true, // allow "more" link when too many events
			eventSources: source,

      eventClick:  function(event, jsEvent, view) {  // when some one click on any event
          var endtime = $.fullCalendar.moment(event.end).format('h:mm');
          var starttime = $.fullCalendar.moment(event.start).format('dddd, MMMM Do YYYY, h:mm');
          var mywhen = starttime + ' - ' + endtime;
          _('modalTitle').innerText = event.title;
          _('modalWhen').innerText = mywhen;
          _('calendarModal').dataset.id = event.id;
          _('eventLink').href = eventURL + event.id;
          $('#calendarModal').modal();
      },
      eventResize: updateEventTimes,
      eventDrop: updateEventTimes,
		});

	});
