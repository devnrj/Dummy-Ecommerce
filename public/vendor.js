$(()=>{
    function refreshList(){
        $.get('/vendors',(data)=>{
            $('#vendorList').empty();
            for (let vendor of data) {
                $('#vendorList').append(
                  `<li class='list-group-item'> ${vendor.name}</li>`
                )
              }
        })
    }
    refreshList()

    $('#addVendor').click(() => {
        $.post(
          '/vendors',
          {
            vendorName: $('#vendorName').val(),
          },
          (data) => {
            if (data.success) {
              refreshList()
            } else {
              alert(data.err)
            }
          }
        )
      })
    
})