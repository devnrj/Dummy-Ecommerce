function createProductCard(product) {
    return $(`
            <div class="col-sm-2 card m-2 p-4">
                <h4 class="productName">${product.productName}</h4>
                <div class="vendorName">${product.Vendor.name}</div>
                <div class="row">
                    <div class="col m-3 p-3">
                        Rs.${product.price}
                    </div>
                    <button id=${product.id} class="col btn btn-primary m-3" onclick="addCart(${product.id})">Add to cart</button>
                </div> 
            </div>
    `)
}
function refreshProductList() {
    $.get('/products', (data) => {
        $('#productList').empty()
        for (let product of data) {
            $('#productList').append(createProductCard(product)
            )
        }
    })
}

$(() => {
    $("#login").click(() => {
        if($("#userName").val().trim()=="" || typeof $("#userName").val() == 'undefined'){
            alert("Username cant be blank")
        }else{
            $.get('/users/' + $("#userName").val(),
            (user) => {
                if (!user) {
                    $.post('/users',
                        {
                            userName: $("#userName").val()
                        },
                        (data) => {
                            alert(data.message)
                            if (data.success) {
                                refreshProductList()
                            } 
                        })
                }else{
                    refreshProductList()
                }
            })
        }
    })
})


function addCart(product){
    let user= $("#userName").val()
    if(typeof user=="undefined" || user.trim()==""){
       alert("Login first to add a product")
       $("#userName").focus()
    }else{
        console.log(user +" "+product)
        $.get('/users/'+user,
        (user)=>{
            $.post('/cart',{
                userId:user.id,
                productId:product,
                quantity:1
            },
            (data)=>{
                console.log(data)
                alert(data.message)
            })
        })
    }
}
