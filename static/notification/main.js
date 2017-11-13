$(document).ready(function() {

var tableconfig = function(url, name) {
  return {
    tableClass: 'table table-hover',
    csrftoken: window.getCookie('csrftoken'),
    text: {
      previous: '<i class="fa fa-angle-left" aria-hidden="true"></i>',
      next: '<i class="fa fa-angle-right" aria-hidden="true"></i>',
      emptyTable: 'No se encontraron resultados',
      search: 'Busqueda por Usuario / Titulo',
    },
    url: url,
    name: name,
    actions: {
      view: {
        action: (data) => {
          window.location.href = '/home/notification/' + data.model.id + '/'
        },
        node: '<i class="fa fa-eye" aria-hidden="true"></i>',
        class: 'btn btn-outline-info btn-sm'
      },
      edit: {
        action: (data) => { console.log(data)},
        node: '<i class="fa fa-pencil" aria-hidden="true"></i>',
        class: 'btn btn-outline-warning btn-sm'
      },
      delete: {
        action: (data) => { console.log(data)},
        node: '<i class="fa fa-trash-o" aria-hidden="true"></i>',
        class: 'btn btn-outline-danger btn-borderer btn-sm'
      },
    },
    columns: [
      { name: 'id', title: 'Id' },
      { name: 'name', title: 'Titulo' },
      { name: 'collaborate_in', title: 'Colaborar en' },
      { name: 'date', title: 'Fecha de envío' },
      { name: 'owner.name', title: 'Enviado por' },
      { name: 'user_invited.name', title: 'Notificado a' },
    ],
  }
}


window.table(tableconfig('/api/invitations/?user_type=owner', 'notification-table-owner'))

var c = tableconfig('/api/invitations/?user_type=user_invited', 'notification-table-user-invited')
window.table(c)

})
