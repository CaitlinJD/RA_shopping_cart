export default class BBProductData {
    constructor (data) {
        this.from = data['from'];
        this.to = data['to'];
        this.total = data['total'];
        this.currentPage = data['currentPage'];
        this.totalPages = data['totalPages'];
        this.queryTime = data['queryTime'];
        this.totalTime = data['totalTime'];
        this.partial = data['partial'];
        this.canonicalUrl = data['canonicalUrl'];
        this.products = data['products'];

        // create a product object
    }
}