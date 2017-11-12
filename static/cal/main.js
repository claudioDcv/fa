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
      success: function(data) {
        return data.map(function(d) {
          var _d = d;
          _d.backgroundColor = '#' + d.status.color;
          _d.textColor = '#000000';
          _d.editable = d.owner === USER_ID;
          return _d;
        });
      }
	}
];



/*
 * Sends a request to modify start/end date of an event to the server
 */
var sendEvent = function(event, revertFunc) {
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
}


function updateEventTimes( event, delta, revertFunc, jsEvent, ui, view )
{

  if (event.accepted_users.length > 0 || event.notified_users > 0 ) {
    mscConfirm({
      title: 'Confirmar Cambio de Evento',
      subtitle: 'Este evento tiene musicos agregados, si modifica el evento, se notificara a los participantes',
      onOk: function() {
        sendEvent(event, revertFunc);
      },
      onCancel: function() {
        revertFunc();
      },
      okText: 'Confirmar',
      cancelText: 'Cancelar'
    }, function() {
      console.log('e');
    });
  } else {
    sendEvent(event, revertFunc);
  }
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
      viewRender: function (view, element) {
        var b = $('#calendar').fullCalendar('renderEvents', []);
        // alert(b.format('L'));
      },
		});

	});
