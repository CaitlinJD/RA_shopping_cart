export default class ShoppingCart {
    constructor(){
        // initialize the shopping cart
        this.ss = null;
        this.initializeCart()
    }
    
    initializeCart () {
        if (typeof (Storage) != undefined){
            this.ss= sessionStorage;
        }  else {
            console.log('Cody says you need a new browser! boo');
            return
        }
    }
    
    addItemToCart(qty=0, item){
        if (this.ss == null ) {return};
        if (qty<=0) {return;}
        if (item == null || typeof (item)=='undefined') {return;}
        
        //console.log('the # of items in storage session is ' + this.ss.length);
        let numberOfItemsInCart = this.ss.length;
        
        // case: we're the 1st product
        if (numberOfItemsInCart == 0){
            this.ss.setItem(item.toString(), qty.toString());
            this.totalCartItems();
            return;
        } else {
            let numMatches = 0;
            //check to see if the item is already in ss
            for (let theKey in this.ss) {
                console.log('the Key =' + theKey);
                if (theKey == item.toString()) {
                    // update quantity value;
                    let newValue = (parseInt(this.ss.getItem(theKey)) + parseInt(qty)).toString();
                    this.ss.setItem(theKey, newValue);
                    numMatches = 1;
                    this.totalCartItems();
                } else {
                    console.log('no match');
                }
            }
            // add the item if not already in ss
            if (numMatches == 0) {
                this.ss.setItem(item.toString(), qty.toString());
                this.totalCartItems();
            }
        }
    }
    
    deleteItemFromCart(qty=0, item){        
        if (this.ss == null ) {return};
        if (qty<=0) {return;}
        if (item == null || typeof (item)=='undefined') {return;}
        // check for ss
        
        let numberOfItemsInCart = this.ss.length;
        if (numberOfItemsInCart == 0) {return;}
        // check that there are items
        let numMatches = 0;
        for (let theKey in this.ss){
            if (theKey == item.toString()) {
                // update quantity value;
                let newValue = (parseInt(this.ss.getItem(theKey)) - parseInt(qty)).toString();
                this.ss.setItem(theKey, newValue.toString());
                numMatches = 1; 
                // update the input value
                $('#input-'+theKey).attr('value',newValue);
                $('#input-'+theKey).val(newValue);

                if (newValue == 0){
                    this.ss.removeItem(theKey);
                    $('#input-'+theKey).parent().remove();
                    break;
                    //return;
                }
            } else {
                console.log('no match');
            }
        }
        if (numMatches == 0) {return;}
        this.totalCartItems();
    }
    
    updateCart() {
        //console.log('you are in the update cart button function');
        let currentItems = $('#shoppingCartContent').children('li');
        console.log(currentItems);

        for (var i = 0; i < currentItems.length; i++) {
            let itemSku = $(currentItems[i]).children('input').data('sku');
            let itemQty = $(currentItems[i]).children('input').val();
            //console.log(itemSku);
            //console.log(itemQty);
            // check item sku to make sure it's not undefined
            if (itemSku == undefined) {
                console.log('no match');
            } else {
                // loop through session storage
                for (let theKey in this.ss) {
                    //look for a match in sku
                    if (theKey == itemSku) {
                        this.ss.setItem(theKey, itemQty);
                        // remove item from cart if qty is 0
                        if (itemQty == 0) {
                            this.ss.removeItem(theKey);
                            $('#input-' + theKey).parent().remove();
                            break;
                        }
                    }
                }
            }
        }
        this.totalCartItems();
    }

    //update the total number of items in cart shown in header
    totalCartItems() {
        //loop through ss and add all the qty's
        let total = 0;
        for (let theKey in this.ss) {
            let qty = (parseInt(this.ss.getItem(theKey)));
            total += qty;
            console.log("The total number of items is: " + total);
        }
        $('.total-items').html(total);
    }

    showCart(evt, context){
        //console.log('you made it to the shopping cart!');
        $('#content').html("");
        $('#content').html("<h1>Shopping Cart</h1>");
        $('#shoppingCartContent').html("");
        let cartContent = "";
        let cartQty = this.ss.length;
        //console.log('cart-Qty: '+cartQty);
        if (this.ss == null || cartQty<=0) {
            cartContent = "<li><b>You have no items in the shopping cart.</b></li>";
        }else {
            for(let theKey in this.ss){
                let criteriaFn = function(product){
                    return product['sku'] == theKey;
                };
                let result = context.products.filter(criteriaFn);
                console.log(result);
                let qty = parseInt(this.ss.getItem(theKey));
                console.log(qty);
                cartContent += "<li><img src='"+result[0].thumbnailImage+"' alt='"+result[0].name+"' title='"+result[0].name+"'><h2 class='prodName'>"+result[0].name+"</h2><p>$"+result[0].salePrice+"</p><input id='input-"+result[0].sku+"' data-sku='"+result[0].sku+"'type='number' value='"+qty+"'><button id='delete-"+result[0].sku+"' data-sku='"+result[0].sku+"'>Remove Item</button></li>"
            }
            $('#shoppingCartContent').append(cartContent);
            

            // ADDING EVENT HANDLERS
            for(let btnCount=0; btnCount<context.products.length; btnCount++){
                let currentItem = context.products[btnCount];
                // DELETE BUTTONS
                $("#delete-"+currentItem['sku']).on('click',null,{},function(event){
                    let item = $("#delete-"+currentItem['sku']).data('sku');
                    context.shoppingCart.deleteItemFromCart(1, item);
                })
            }

            let updateBtn = "<button id='updateBtn'>Update Cart</button><button>Checkout</button>";
            $('#shoppingCartContent').append(updateBtn);
            $('#updateBtn').on('click',null,{} ,function(event){
                context.shoppingCart.updateCart();
            })
        }
    }
}