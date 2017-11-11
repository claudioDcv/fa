$(document).ready(function() {

		$('#calendar').fullCalendar({
			header: {
				left: 'prev,next today',
				center: 'title',
				right: 'month,agendaWeek,agendaDay,listWeek'
			},
			defaultDate: '2017-10-12',
			navLinks: true, // can click day/week names to navigate views
			editable: true,
			eventLimit: true, // allow "more" link when too many events
			events: [
				{
					title: 'All Day Event',
					start: '2017-10-01',
				},
				{
					title: 'Long Event',
					start: '2017-10-07',
					end: '2017-10-10'
				},
				{
					id: 999,
					title: 'Repeating Event',
					start: '2017-10-09T16:00:00'
				},
				{
					id: 999,
					title: 'Repeating Event',
					start: '2017-10-16T16:00:00'
				},
				{
					title: 'Conference',
					start: '2017-10-11',
					end: '2017-10-13'
				},
				{
					title: 'Meeting',
					start: '2017-10-12T10:30:00',
					end: '2017-10-12T12:30:00'
				},
				{
					title: 'Lunch',
					start: '2017-10-12T12:00:00'
				},
				{
					title: 'Meeting',
					start: '2017-10-12T14:30:00'
				},
				{
					title: 'Happy Hour',
					start: '2017-10-12T17:30:00'
				},
				{
					title: 'Dinner',
					start: '2017-10-12T20:00:00'
				},
				{
					title: 'Birthday Party',
					start: '2017-10-13T07:00:00'
				},
				{
					title: 'Click for Google',
					url: 'http://google.com/',
					start: '2017-10-28'
				}
			]
		});

	});


// $(function() {
//
// 	var todayDate = moment().startOf('day');
// 	var YM = todayDate.format('YYYY-MM');
// 	var YESTERDAY = todayDate.clone().subtract(1, 'day').format('YYYY-MM-DD');
// 	var TODAY = todayDate.format('YYYY-MM-DD');
// 	var TOMORROW = todayDate.clone().add(1, 'day').format('YYYY-MM-DD');
//
// 	$('#calendar').fullCalendar({
// 		header: {
// 			left: 'prev,next today',
// 			center: 'title',
// 			right: 'month,agendaWeek,agendaDay,listWeek'
// 		},
// 		editable: true,
// 		eventLimit: true, // allow "more" link when too many events
// 		navLinks: true,
// 		events: [
// 			{
// 				title: 'All Day Event',
// 				start: YM + '-01'
// 			},
// 			{
// 				title: 'Long Event',
// 				start: YM + '-07',
// 				end: YM + '-10'
// 			},
// 			{
// 				id: 999,
// 				title: 'Repeating Event',
// 				start: YM + '-09T16:00:00'
// 			},
// 			{
// 				id: 999,
// 				title: 'Repeating Event',
// 				start: YM + '-16T16:00:00'
// 			},
// 			{
// 				title: 'Conference',
// 				start: YESTERDAY,
// 				end: TOMORROW
// 			},
// 			{
// 				title: 'Meeting',
// 				start: TODAY + 'T10:30:00',
// 				end: TODAY + 'T12:30:00'
// 			},
// 			{
// 				title: 'Lunch',
// 				start: TODAY + 'T12:00:00'
// 			},
// 			{
// 				title: 'Meeting',
// 				start: TODAY + 'T14:30:00'
// 			},
// 			{
// 				title: 'Happy Hour',
// 				start: TODAY + 'T17:30:00'
// 			},
// 			{
// 				title: 'Dinner',
// 				start: TODAY + 'T20:00:00'
// 			},
// 			{
// 				title: 'Birthday Party',
// 				start: TOMORROW + 'T07:00:00'
// 			},
// 			{
// 				title: 'Click for Google',
// 				url: 'http://google.com/',
// 				start: YM + '-28'
// 			}
// 		]
// 	});
// });
//
// // function getCookie(name) {
// //     var cookieValue = null;
// //     if (document.cookie && document.cookie !== '') {
// //         var cookies = document.cookie.split(';');
// //         for (var i = 0; i < cookies.length; i++) {
// //             var cookie = jQuery.trim(cookies[i]);
// //             // Does this cookie string begin with the name we want?
// //             if (cookie.substring(0, name.length + 1) === (name + '=')) {
// //                 cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
// //                 break;
// //             }
// //         }
// //     }
// //     return cookieValue;
// // }
// //
// // var csrftoken = getCookie('csrftoken');
// //
// // $(function() {
// //
// //   var source = [
// //     {
// //         url: '/api/events/',
// //         headers: {
// //           "X-CSRFToken": csrftoken,
// //         },
// //     }
// //   ];
// //
// //   $(document).ready(function(){
// //         var calendar = $('#calendar').fullCalendar({  // assign calendar
// //             eventSources: source,
// //             header:{
// //                 left: 'prev,next today',
// //                 center: 'title',
// //                 right: 'agendaWeek,agendaDay'
// //             },
// //             // defaultView: 'agendaWeek',
// //             eventStartEditable: true,
// //             eventDurationEditable: true,
// //             editable: true,
// //             selectable: true,
// //             allDaySlot: false,
// //
            // eventClick:  function(event, jsEvent, view) {  // when some one click on any event
            //     endtime = $.fullCalendar.moment(event.end).format('h:mm');
            //     starttime = $.fullCalendar.moment(event.start).format('dddd, MMMM Do YYYY, h:mm');
            //     var mywhen = starttime + ' - ' + endtime;
            //     $('#modalTitle').html(event.title);
            //     $('#modalWhen').text(mywhen);
            //     $('#eventID').val(event.id);
            //     $('#calendarModal').modal();
            // },
// //
// //             select: function(start, end, jsEvent) {  // click on empty time slot
// //                 endtime = $.fullCalendar.moment(end).format('h:mm');
// //                 starttime = $.fullCalendar.moment(start).format('dddd, MMMM Do YYYY, h:mm');
// //                 var mywhen = starttime + ' - ' + endtime;
// //                 start = moment(start).format();
// //                 end = moment(end).format();
// //                 $('#createEventModal #startTime').val(start);
// //                 $('#createEventModal #endTime').val(end);
// //                 $('#createEventModal #when').text(mywhen);
// //                 $('#createEventModal').modal('toggle');
// //            },
// //            eventDrop: function(event, delta){ // event drag and drop
// //                $.ajax({
// //                    url: '/api/events/',
// //                    data: 'action=update&title='+event.title+'&start='+moment(event.start).format()+'&end='+moment(event.end).format()+'&id='+event.id ,
// //                    type: "POST",
// //                    success: function(json) {
// //                    //alert(json);
// //                    }
// //                });
// //            },
// //            eventResize: function(event) {  // resize to increase or decrease time of event
// //                $.ajax({
// //                    url: '/api/events/',
// //                    data: 'action=update&title='+event.title+'&start='+moment(event.start).format()+'&end='+moment(event.end).format()+'&id='+event.id,
// //                    type: "POST",
// //                    success: function(json) {
// //                        //alert(json);
// //                    }
// //                });
// //            }
// //         });
// //
// //        $('#submitButton').on('click', function(e){ // add event submit
// //            // We don't want this to act as a link so cancel the link action
// //            e.preventDefault();
// //            doSubmit(); // send to form submit function
// //        });
// //
// //        $('#deleteButton').on('click', function(e){ // delete event clicked
// //            // We don't want this to act as a link so cancel the link action
// //            e.preventDefault();
// //            doDelete();// send data to delete function
// //        });
// //
// //        function doDelete(){  // delete event
// //            $("#calendarModal").modal('hide');
// //            var eventID = $('#eventID').val();
// //            $.ajax({
// //                url: '/api/events/',
// //                data: 'action=delete&id='+eventID,
// //                type: "POST",
// //                success: function(json) {
// //                    if(json == 1)
// //                         $("#calendar").fullCalendar('removeEvents',eventID);
// //                    else
// //                         return false;
// //
// //
// //                }
// //            });
// //        }
// //        function doSubmit(){ // add event
// //            $("#createEventModal").modal('hide');
// //            var title = $('#title').val();
// //            var startTime = $('#startTime').val();
// //            var endTime = $('#endTime').val();
// //
// //            $.ajax({
// //                url: '/api/events/',
// //                data: 'action=add&title='+title+'&start='+startTime+'&end='+endTime,
// //                type: "POST",
// //                success: function(json) {
// //                    $("#calendar").fullCalendar('renderEvent',
// //                    {
// //                        id: json.id,
// //                        title: title,
// //                        start: startTime,
// //                        end: endTime,
// //                    },
// //                    true);
// //                }
// //            });
// //
// //        }
// //     });
// // });
// //
// // // function getCookie(name) {
// // //     var cookieValue = null;
// // //     if (document.cookie && document.cookie !== '') {
// // //         var cookies = document.cookie.split(';');
// // //         for (var i = 0; i < cookies.length; i++) {
// // //             var cookie = jQuery.trim(cookies[i]);
// // //             // Does this cookie string begin with the name we want?
// // //             if (cookie.substring(0, name.length + 1) === (name + '=')) {
// // //                 cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
// // //                 break;
// // //             }
// // //         }
// // //     }
// // //     return cookieValue;
// // // }
// // //
// // // $(document).ready(function() {
// // //
// // //   // page is now ready, initialize the calendar...
// // //   var csrftoken = getCookie('csrftoken');
// // //   var $calendar = $('#calendar');
// // //   var source = [
// // //     {
// // //         url: '/api/events/',
// // //         headers: {
// // //           "X-CSRFToken": csrftoken,
// // //         },
// // //     }
// // //   ];
// // //
// // //   $('#calendar').fullCalendar({
// // //       eventSources: source,
// // //       header: {
// // //           left: '',
// // //           center: 'prev title next',
// // //           right: ''
// // //       },
// // //       editable: true,
// // //       eventRender: function (event, element) {
// // //           element.attr('href', 'javascript:void(0);');
// // //           element.click(function() {
// // //               $("#startTime").html(moment(event.start).format('MMM Do h:mm A'));
// // //               $("#endTime").html(moment(event.end).format('MMM Do h:mm A'));
// // //               $("#eventTitle").html(event.title);
// // //               $("#eventInfo").html(event.description);
// // //               $("#eventLink").attr('href', event.url);
// // //               // $("#eventContent").dialog({ modal: true, title: event.title, width:350});
// // //               $('#eventContent').modal('toggle')
// // //           });
// // //       },
// // //       eventDragStart: function( event, jsEvent, ui, view ) {
// // //         console.log(event);
// // //       },
// // //       eventDrop: function( event, delta, revertFunc, jsEvent, ui, view ) {
// // //         alert(event.title + " was dropped on " + event.start.format());
// // //         if (!confirm("Are you sure about this change?")) {
// // //             revertFunc();
// // //         }
// // //     }
// // //   });
// // //   //
// // //   // $calendar.fullCalendar({
// // //   //   editable: true,
// // //   //   aspectRatio: 1,
// // //   //   contentHeight: 500,
// // //   //   scrollTime: '24:00:00',
// // //   //   minTime: '01:00:00',
// // //   //   maxTime: '24:00:00',
// // //   //   // defaultView: 'agendaWeek',
// // //   //   header: {
// // //   //       left: '',
// // //   //       center: 'prev title next',
// // //   //       right: ''
// // //   //   },
// // //   //
// // //   //   weekMode: 'liquid',
// // //   //   // events: {
// // //   //   //   url: '/api/events/',
// // //   //   // },
// // //   //   eventClick: function(event, element) {
// // //   //       // debugger;
// // //   //       // event.title = "CLICKED!";
// // //   //       $calendar.fullCalendar('updateEvent', event);
// // //   //   },
// // //   //   eventSources: [
// // //   //     {
// // //   //         url: '/api/events/',
// // //   //         headers: {
// // //   //           "X-CSRFToken": csrftoken,
// // //   //         },
// // //   //     }
// // //   //   ],
// // //   // });
// // //   // $('#calendar').fullCalendar({
// // //   //     // put your options and callbacks here
// // //   //     // events: {
// // //   //     //   url: '/api/events/',
// // //   //     // },
// // //   //     events: [
// // //   //         {
// // //   //             title  : 'event1',
// // //   //             start  : '2010-01-01'
// // //   //         },
// // //   //         {
// // //   //             title  : 'event2',
// // //   //             start  : '2010-01-05',
// // //   //             end    : '2010-01-07'
// // //   //         },
// // //   //         {
// // //   //             title  : 'event3',
// // //   //             start  : '2010-01-09T12:30:00',
// // //   //             allDay : false // will make the time show
// // //   //         }
// // //   //     ],
// // //   //     startParam: 'start_dt',
// // //   //     endParam: 'end_dt',
// // //   // })
// // // });
