import ShoppingCart from './ShoppingCart';
import BBProductAPIService from './BBProductAPIService';
import BBProductData from './model/BBProductData';
import Catalog from './Catalog'; 

export default class App {
    constructor() {
        console.log('creating app');
        this.cartData = [];
        this.getTheData();
        this.catalog = new Catalog();
        this.initModal();
        this.shoppingCart = new ShoppingCart();
        this.displayShoppingCart();
        this.initFlickity();
    }

    initFlickity() {
        this.carousel = $('.productList').flickity({
            initialIndex: 1,
            cellAlign: "left",
            contain: true,
            percentPosition: false,
            imagesLoaded: true,
            autoPlay: true,
            prevNextButtons: false,
            setGallerySize: false,
        });
        this.catalog.carousel = this.carousel;
    }

    displayShoppingCart(){
        //console.log('you are in the app displayShoppingCart function');
        let context = this;
        $('#cart').on('click',function(evt){
            $("#myModal").fadeIn(300);
            context.shoppingCart.showCart(evt, context);
        })
    }
    
    initModal(){
        // Get the modal
        this.modal = document.getElementById('myModal');

        // Get the <span> element that closes the modal
        this.closeSpan = document.getElementsByClassName("close")[0];
        // When the user clicks on <span> (x), close the modal
        this.closeSpan.onclick = function() {
            $("#myModal").fadeOut(200);
        }

        // When the user clicks anywhere outside of the modal, close it
       /* window.onclick = function(event) {
            if (event.target == this.modal) {
                this.modal.style.display = "none";
            }
        }*/
    } 
    
    getTheData(){
        // load the data
        this.bbAPIService = new BBProductAPIService; 
        let context = this;
        this.successCallback = function(response) {
            context.data = JSON.parse(response); context.processResultsIntoUsableData(context.data);
        };
       this.failCallback = function(error) {
           console.error('Failed! \n', error);
       };
       this.bbAPIService.loadDataUsingJS().then(this.successCallback, this.failCallback);
    }
    
    processResultsIntoUsableData(result){
        // from here, extract only the product info
        this.rawData = new BBProductData (result);
        this.products = this.rawData.products;
        this.createTableOfItems(this.products);
    }
    
    createTableOfItems(products){
        // Adding html to flickity $('.productList').flickity
        
        let productCells = this.catalog.showCatalogProducts(products);
        this.carousel.flickity('prepend', $.parseHTML (productCells));
        console.log(productCells);
        //$carousel.flickity( 'prepend', productCells );
        //document.getElementById('productList').innerHTML = productCells;

        // ADDING EVENT LISTENERS TO THE BUTTONS
        for (let btnCount=0; btnCount<products.length; btnCount++){
            let currentItem = products[btnCount];
            //console.log('currentItem is ' + currentItem['sku']); 
            let context = this;
            
            // add to cart
            $('#'+currentItem['sku']).on('click', null, {context:context}, function(event){
                $("#myModal").fadeIn(300);
                context.prepareItemToAddToCart(event, context);
            });
            
            // quick view
            $('#quickView-'+currentItem['sku']).on('click', null, {context:context}, function(event){
                $("#myModal").fadeIn(300);
                context.showQuickView(event, context);
            });
        }
    }
    
    prepareItemToAddToCart(evt, context){
        if(evt==null || typeof (evt) === 'undefined'){
            return;
        }
        let sku = $(evt.target).data('sku');      
        //console.log(sku);
        let productAdded = this.getProductBySku(sku);
        $('#shoppingCartContent').html(""); // Clearing cart content here
        $('#content').last().html('<img src="'+productAdded.thumbnailImage+'" alt="'+productAdded.name+'" title="'+productAdded.name+'"><b>'+ productAdded.name +'</b><br>has been added to the cart.<br>');
        context.shoppingCart.addItemToCart(1, sku);
    }
    
    showQuickView(evt, context){
        if(evt==null || typeof (evt) === 'undefined'){
            return;
        }
        let sku = $(evt.target).data('sku');
        let productAdded = this.getProductBySku(sku);
        $('#shoppingCartContent').html("");
        $('#content').last().html('<img src="'+productAdded.thumbnailImage+'" alt="'+productAdded.name+'" title="'+productAdded.name+'"><b>'+ productAdded.name +'</b><br><b>$'+productAdded.salePrice+'</b><p>'+productAdded.shortDescription+'<p><br>');
    }
    
    getProductBySku(sku=0){
        if (sku==0){ return; };
        let criteriaFn = function(product){
            return product['sku'] == sku;
        };
        let result = this.products.filter(criteriaFn);
        console.log(result);
        return result[0];
    }   
}