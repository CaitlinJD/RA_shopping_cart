export default class Catalog {


    constructor(){
        this.carousel = {};
    }
    
    showCatalogProducts(products){


        console.log('createTableOfItems();');
        let productCell ="";
        // count the number of products (should be 10)
        for (let itemCount=0; itemCount<products.length; itemCount++){
            console.log('in for loop');
            // produce a "table" of items
            let currentItem = products[itemCount];
            productCell += '<div class="product-wrapper" style="position: absolute; left:'+itemCount*530+'" >';
            productCell += '<img src="'+currentItem["image"]+'" alt="'+currentItem["name"]+'" title="'+currentItem["name"]+'" height="250" width="250">';
            productCell += '<p>'+currentItem["name"]+'<br>'+currentItem["salePrice"]+'</p>';
            productCell += `<button type='button' id='quickView-` +currentItem['sku'] + `' data-sku='` + currentItem['sku'] + `'>Quick View</button>`;
            productCell += `<button type='button' id='` +currentItem['sku'] + `' data-sku='` + currentItem['sku'] + `'>Add To Cart</button>`;
            productCell += '</div>';
            productCell += '\n';



        }
        return productCell;
        //$carousel.flickity( 'prepend', productCell );
    }

}