function prepareExportableQSTable(element) {

  $(element).wrap('<div class="qs-export-table-frame">').before(
    '<ul class="qs-capsule qs-export-table" data-qs-collapsed="true" data-qs-position="right">' + 
      '<li class="qs-capsule-item">' +
        '<div class="qs-capsule-label" href="#">Export</div>' +
        '<ul class="qs-capsule">' +
          '<li class="qs-capsule-item">' +
            '<a class="qs-capsule-label" data-qs-icon="pdf" href="#"></a>' +
          '</li>' +
          '<li class="qs-capsule-item">' +
            '<a class="qs-capsule-label" data-qs-icon="letter" href="#"></a>' +
          '</li>' +
        '</ul>' +
      '</li>' +
    '</ul>'
  );

  // Add click event.
  $(element).prev('.qs-export-table').click(function(event){

    event.preventDefault();

    var cloneElementHTML = $(element).clone()[0].outerHTML;

    // Remove extra labels.
    cloneElementHTML = cloneElementHTML.replace(/<div class="qs-table-label">.*<\/div>/g,'');

    console.log(cloneElementHTML);

  });

}

function prepareResponsiveQSTable(element) {

  if ($(element).children('caption').length) {
    $(element).attr('data-qs-hasCaption', 'true');
  }


  // Get cell count
  var rowCount = $(element).children('tbody').find('td').length;

  // Get label count
  var labelCount = $(element).children('tbody').find('.qs-table-label').length;

  var columnHeaders = [];

  // If not all cell have labels...
  if (rowCount > labelCount) {

    // Build an array of column headers.
    $(element).children('thead').find('th').each(function(){
      columnHeaders.push( $(this).html() );
    });

    // Loop thorugh tbody rows.
    $(element).children('tbody').find('tr').each(function(){

      var columnIndex = 0;

      // Loop thorugh row cells.
      $(this).children('td').each(function(){
    
        $(this).prepend('<div class="qs-table-label">' + columnHeaders[columnIndex] + '</div>')

        columnIndex++;

      });
      
    });
    

  }

}




$(function(){

  $('.qs-table[data-qs-phoneView],.qs-table[data-qs-tabletView]').each(function(){
    prepareResponsiveQSTable($(this));
  });

  $('.qs-table[data-qs-exportable = "true"]').each(function(){
    prepareExportableQSTable($(this));
  });

});