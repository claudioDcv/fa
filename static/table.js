var table = function(options) {

  const _ = id => document.getElementById(id)
  const create = name => document.createElement(name)
  const text = text => document.createTextNode(text)
  const add = (parent, child) => parent.appendChild(child)

  var debounce = function(func, wait, immediate) {
  	var timeout;
  	return function() {
  		var context = this, args = arguments;
  		var later = function() {
  			timeout = null;
  			if (!immediate) func.apply(context, args);
  		};
  		var callNow = immediate && !timeout;
  		clearTimeout(timeout);
  		timeout = setTimeout(later, wait);
  		if (callNow) func.apply(context, args);
  	};
  };
  // > obj = {a:{b:{etc:5}}}
  // > dotNotation(obj,'a.b.etc') 5
  // > dotNotation(obj,['a','b','etc']) 5
  // > dotNotation(obj,'a.b.etc', 123)) 123
  // > dotNotation(obj,'a.b.etc') 123
  var dotNotation = function (obj,is, value) {
      if (typeof is == 'string')
          return dotNotation(obj,is.split('.'), value);
      else if (is.length==1 && value!==undefined)
          return obj[is[0]] = value;
      else if (is.length==0)
          return obj;
      else
          return dotNotation(obj[is[0]],is.slice(1), value);
  }

  var getParameterByName = function(url, name) {
      if (!url) url = window.location.href;
      name = name.replace(/[\[\]]/g, "\\$&");
      var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
          results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return '';
      return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  var updateQueryStringParameter = function(uri, key, value) {
    var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
    var separator = uri.indexOf('?') !== -1 ? "&" : "?";
    if (uri.match(re)) {
      return uri.replace(re, '$1' + key + "=" + value + '$2');
    }
    else {
      return uri + separator + key + "=" + value;
    }
  }

  const remove = elm => {
    let n = elm
    if (!n) {
      return n
    }
    while (n.firstChild) {
        n.removeChild(n.firstChild);
    }
    return n
  }



  this.name = options.name

  var tableClass = options.tableClass || 'table table-hover'
  var csrftoken = options.csrftoken
  var searchValue = ''
  var api = options.url
  var wrap = $('#' + name)
  var columns = options.columns
  var actions = options.actions || {}
  var textEmptyTable = 'Empty Table'
  var search = 'Search'
  var actionsText = 'Acciones'

  if (options.text) {
    if (options.text.search) {
      search = options.text.search
    }
  }

  wrap.html(`
    <div class="table-cont-search">
      <label>${search}</label>
      <input class="form-control search-control" type="search" value="${searchValue}"/>
    </div>
    <div class="table-cont"></div>
    <div class="table-cont-paginator btn-group">
      <button type="button" name="button" class="previous btn btn-default">previous</button>
      <div class="pagination"></div>
      <button type="button" name="button" class="next btn btn-default">next</button>
    </div>
  `)


  var tableNode = $('#' + name + ' .table-cont')
  var btnNext = $('#' + name + ' .btn-group .next')
  var btnPrev = $('#' + name + ' .btn-group .previous')
  var paginationNode = $('#' + name + ' .pagination')
  var tableOptions = null;

  if (options.text) {
    if (options.text.previous) {
      btnPrev.html(options.text.previous);
    }
    if (options.text.next) {
      btnNext.html(options.text.next);
    }
    if (options.text.emptyTable) {
      textEmptyTable = options.text.emptyTable;
    }
    if (options.text.searchValue) {
      api = updateQueryStringParameter(api, 'q', options.text.searchValue)
    }
  }

  var currentpage = function(data) {
    var page = 1;
    if (data.previous) {
      page = parseInt(getParameterByName(data.previous, 'page')) + 1;
    }
    if (data.next) {
      page = parseInt(getParameterByName(data.next, 'page')) - 1;
    }
    return page
  }


  var perPage = function(elementsSize) {
    var num = elementsSize
    if (tableOptions) {
      if (tableOptions.perPage) {
          num = tableOptions.perPage
      }
    }
    return num
  }

  var createTable = function(data) {
    var table= `<table class="${tableClass}">`
    var head = '<thead>'
    var elementsSize = data.results.length
    var columnsSize = columns.length
    var perPageData = perPage(elementsSize)
    var extraPage = (data.count % perPageData) > 0 ? 1 : 0;
    var totalPages = parseInt(data.count / perPageData) + extraPage
    var currentpageNum = currentpage(data)

    var currentUrl = api;
    if (data.previous) {
      currentUrl = updateQueryStringParameter(data.previous, 'page', currentpageNum);
    }
    if (data.next) {
      currentUrl = updateQueryStringParameter(data.next, 'page', currentpageNum);
    }


    // Input Search
    // var searchValue = getParameterByName(currentUrl, 'q') || searchValue

    head += '<tr>'

    for (let i = 0; i < columnsSize; i++) {
      var title = columns[i].title || columns[i].name
      head += '<th>' + title + '</th>'
    }
    if (Object.keys(actions).length > 0) {
      head += `<th>${actionsText}</th>`
    }

    head += '</tr>'



    head += '</thead>'
    table += head



    var createActions = function(index) {
      var actionsNodes = ''
      if (Object.keys(actions).length > 0) {
        actionsNodes += '<td><div class="btn-group">'
        if (actions.view) {
          actionsNodes += `
            <button data-index="${index}" class="actions-view ${actions.view.class}">
              ${actions.view.node || 'View'}
            </button>
            `
        }
        if (actions.edit) {
          actionsNodes += `
            <button data-index="${index}" class="actions-edit ${actions.edit.class}">
              ${actions.edit.node || 'Edit'}
            </button>
            `
        }
        if (actions.delete) {
          actionsNodes += `
            <button data-index="${index}" class="actions-delete  ${actions.delete.class}">
              ${actions.delete.node || 'Delete'}
            </button>
            `
        }
        actionsNodes += '</div></td>'
      }
      return actionsNodes
    }

    table += '<tbody>'

    for (let i = 0; i < elementsSize; i++) {
      table += `<tr data-index="${i}">`
      for (let j = 0; j < columnsSize; j++) {
        table += '<td>' + dotNotation(data.results[i],columns[j].name) + '</td>';
      }
      table += createActions(i)
      table += '</tr>';
    }


    if (elementsSize === 0) {
      table += `
        <tr>
          <td colspan="${columnsSize + (Object.keys(actions).length > 0 ? 1 : 0)}">
            ${textEmptyTable}
          </td>
        </tr>`
    }

    table += '</tbody></table>'

    // Paginator

    var lis = ''

    for (let i = 0; i < totalPages; i++) {
      var n = i + 1
      lis += `
      <li class="page-item${ currentpageNum === n ? ' active': ''}">
        <a class="page-link" href="#" data-num="${n}">
          ${n}
        </a>
      </li>
      `;
    }
    var pagination = `
    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-center">
        ${lis}
      </ul>
    </nav>
    `


    var obj = {
      paginationNode: pagination,
      totalPages: totalPages,
      data: data,
      table: table,
      perPage: perPageData,
      currentpage: currentpageNum,
      next: !!data.next,
      previous: !!data.previous,
      currentUrl: currentUrl,
    };

    btnNext.attr('disabled', !obj.next)
    btnPrev.attr('disabled', !obj.previous)

    return obj;
  }

  var success = function(data) {
    var table = createTable(data)

    tableNode.html(table.table)
    paginationNode.html(table.paginationNode)
    tableOptions = table
  }

  $.ajax({ url: api, headers: { 'X-CSRFToken': csrftoken }, success: success });

  btnNext.on('click', function(){
    if (tableOptions.next) {
      var url = tableOptions.data.next
      $.ajax({ url: url, headers: { 'X-CSRFToken': csrftoken }, success: success });
    }
  });
  btnPrev.on('click', function(){
    if (tableOptions.previous) {
      var url = tableOptions.data.previous
      $.ajax({ url: url, headers: { 'X-CSRFToken': csrftoken }, success: success });
    }
  });

  if (Object.keys(actions).length > 0) {
    if (actions.view) {
      $('#' + name).on('click', '.actions-view', function(event){
        var index = event.target.dataset.index
        if (!index) {
          index = event.target.parentNode.dataset.index
        }
        var obj = {
          action: 'view',
          event: event,
          model: tableOptions.data.results[index],
          options: tableOptions,
        };
        actions.view.action(obj)
      })
    }
    if (actions.edit) {
      $('#' + name).on('click', '.actions-edit', function(event){
        var index = event.target.dataset.index
        if (!index) {
          index = event.target.parentNode.dataset.index
        }
        var obj = {
          action: 'edit',
          event: event,
          model: tableOptions.data.results[index],
          options: tableOptions,
        };
        actions.edit.action(obj)
      })
    }
    if (actions.delete) {
      $('#' + name).on('click', '.actions-delete', function(event){
        var index = event.target.dataset.index
        if (!index) {
          index = event.target.parentNode.dataset.index
        }
        var obj = {
          action: 'delete',
          event: event,
          model: tableOptions.data.results[index],
          options: tableOptions,
        };
        actions.delete.action(obj)
      })
    }
  }

  $('#' + name).on('click', '.pagination li a', function(event){
    event.preventDefault()
    var n = parseInt(event.target.dataset.num);
    $.ajax({
      url: updateQueryStringParameter(tableOptions.currentUrl, 'page', n),
      headers: { 'X-CSRFToken': csrftoken },
      success: success,
    });
  });

  $('#' + name).on('input', '.search-control', debounce(function(event){
    var text = event.target.value
    var query = updateQueryStringParameter(tableOptions.currentUrl, 'q', text)
    query = updateQueryStringParameter(query, 'page', 1),
    $.ajax({
      url: query,
      headers: { 'X-CSRFToken': csrftoken },
      success: success,
    });
  }, 250));
}
