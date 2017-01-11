export default class BBProductAPIService {
    constructor(){
        this.bbURL = "https://api.remix.bestbuy.com/v1/products((categoryPath.id=abcat0501000))?apiKey=8ccddf4rtjz5k5btqam84qak&format=json&show=image,thumbnailImage,shortDescription,name,regularPrice,salePrice,sku";
    }
    
    loadDataUsingJS(){
        let _promiseFn = (_success, _reject) => {
            let request = new XMLHttpRequest();
            request.onload = () => {
                switch(request.status){
                    case 200:
                        _success(request.response );
                        break;
                    case 404:
                        console.log('error: service url not found');
                        _reject(Error(request.statusText));
                        break;
                    default: 
                        _reject(Error(request.statusText));
                        break;
                }  
            };
            // Handle network errors
            request.onerror = function () {
                _reject(Error('Network Error'));
            }
            request.open('GET', this.bbURL);
            request.send();
        }
        let promise = new Promise(_promiseFn);
        return promise;
    }
    
}