var serializeForm = function(form, opt) {
    if (!form || form.nodeName !== "FORM") {
        return;
    }

    var enc = function(data){
      if (opt) {
        if (opt.encodeURIComponent) {
          return encodeURIComponent(data);
        }
      }
      return data;
    }

    var i, j,
        obj = {};
    var files = {}
    for (i = form.elements.length - 1; i >= 0; i = i - 1) {
        if (form.elements[i].name === "") {
            continue;
        }
        switch (form.elements[i].nodeName) {
            case 'INPUT':
                switch (form.elements[i].type) {
                    case 'text':
                    case 'hidden':
                    case 'password':
                    case 'button':
                    case 'reset':
                    case 'submit':
                        obj[form.elements[i].name] = enc(form.elements[i].value);
                        break;
                    case 'checkbox':
                    case 'radio':
                        if (form.elements[i].checked) {
                            obj[form.elements[i].name] = enc(form.elements[i].value);
                        }
                        break;
                    case 'file':
                        var name = form.elements[i].name
                        var value = form.elements[i].files[0]
                        files[name] = value;
                        break;
                }
                break;
            case 'TEXTAREA':
                obj[form.elements[i].name] = enc(form.elements[i].value);
                break;
            case 'SELECT':
                switch (form.elements[i].type) {
                  case 'select-one':
                      obj[form.elements[i].name] = enc(form.elements[i].value);
                      break;
                  case 'select-multiple':
                      obj[form.elements[i].name] = []
                      for (j = form.elements[i].options.length - 1; j >= 0; j = j - 1) {
                          if (form.elements[i].options[j].selected) {
                              obj[form.elements[i].name].push(enc(form.elements[i].options[j].value));
                          }
                      }
                      break;
                }
                break;
            case 'BUTTON':
                switch (form.elements[i].type) {
                    case 'reset':
                    case 'submit':
                    case 'button':
                        obj[form.elements[i].name] = enc(form.elements[i].value);
                        break;
                }
                break;
        }
    }
    if (form.dataset.files !== 'undefined') {
      obj.files = files
    }
    return obj;
}
