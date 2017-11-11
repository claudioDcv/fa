var select2 = function(elm, url, remap) {
  var $elm = $(elm);
  if ($elm) {
    $elm.select2({
      multiple: true,
      ajax: {
        url: url,
        dataType: 'json',
        processResults: function (data) {
        // Tranforms the top-level key of the response object from 'items' to 'results'
          return {
            results: data.map(remap)
          };
        }
        // Additional AJAX parameters go here; see the end of this chapter for the full code of this example
      }
    });
  }
}

select2('#id_musical_styles', '/api/musical-styles/',function(e) {
  return {
    id: e.id,
    text: e.name,
  };
});
select2('#id_permanent_musician', '/api/users/',function(e) {
  return {
    id: e.id,
    text: e.username,
  };
});
select2('#id_guest_musician', '/api/users/',function(e) {
  return {
    id: e.id,
    text: e.username,
  };
});



var ajaxForms = document.querySelectorAll('form.ajax-form');

ajaxForms.forEach(function(e){
  e.addEventListener('submit', event => {
    event.preventDefault()
    var url = event.target.action;
    var data = serializeForm(event.target);
    data.creation_date = data.creation_date.split("/").reverse().join("-");
    var successUrl = event.target.dataset.success;
    console.log(url);
    console.log(serializeForm(event.target));
        $.ajax({
        type: "patch",
        url: url,
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        headers: {
          'X-CSRFToken': data.csrfmiddlewaretoken,
        },
        data: JSON.stringify(data),
        success: function(result) {
            var msg = {
              obj: data,
              model: 'song',
              text: `Tema '${data.name}' actualizado con exito`
            };
            window.localStorage.setItem('msg',JSON.stringify(msg));
            window.location.href = successUrl;
        }
    });
  }, false)
})




window.addEventListener('DOMContentLoaded', function()
        {
            var $min = document.querySelector('.datepicker');
            if ($min) {
              // $max = document.querySelector('.real [name="realDPX-max"]');
              $min.DatePickerX.init({
                  mondayFirst: true,
                  // minDate    : new Date(2017, 8, 13),
                  format: 'dd/mm/yyyy',
                  // maxDate    : $max
              });
              // $max.DatePickerX.init({
              //     mondayFirst: true,
              //     minDate    : $min,
              //     //maxDate    : new Date(2017, 4, 25)
              // });
            }

            if (document.querySelector('[name="duration"]')) {
              window.picker = new JsTimepicker(document.querySelector('[name="duration"]'), {
                hourLeadingZero: true,
                hourStep: 1,
                minuteLeadingZero: true,
                minuteStep: 1,
              });
            }

            audiojs.events.ready(function() {
              var as = audiojs.createAll();
            });


        var msg = window.localStorage.getItem('msg');
        if (msg) {
          window.localStorage.removeItem('msg');
          var obj = JSON.parse(msg);
          console.log(obj);
          var html = `
          <div class="alert alert-success" role="alert">
            ${obj.text}
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          `
          $('#msg').html(html)
        }


});
