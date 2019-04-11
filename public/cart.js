$(()=>{
    $("#login").click(()=>{
      console.log("in login")
        $.get("/users/"+$("#userName").val(),(user)=>{
                $.post("/cart/getItems/",
                {id : user.id},
                (data)=>{
                    $('#productList').empty()
                    let i = 1
                    console.log(data)
                    for (let product of data) {
                      $('#productList').append(
                        `<tr class='row'>
                          <th scope="row" class="col-sm-2">${i++}</th>
                          <td class="col-sm-2"> ${product.Product.productName}</td>
                          <td class="col-sm-2"> ${product.quantity}</td>
                          <td class="col-sm-2"> ${product.Product.price}</td>
                          <td class="col-sm-2"> 
                            <button id="${product.id}" onclick="deleteProduct(${product.id})" type="button" class="btn btn-primary">Delete</button>
                          </td>
                        </tr>`
                      )
                    }
                })
            }
        )
    })
})