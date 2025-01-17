class ApiFeature{
    constructor(query, queryStr){
        this.query = query;
        this.queryStr = queryStr;

    }

    search() {
        const keyword = this.queryStr.keyword ? {

            name: {
                $regex: this.queryStr.keyword,
                $options: 'i'
            }

        } :{}

        console.log(keyword);
        this.query = this.query.find({...keyword});
        return this;
    }

    filter(){

        const queryCopy = {...this.queryStr};

        //Remove fields from the query
        const removeFields = ['keyword','limit','page'];
        removeFields.forEach(el => delete queryCopy[el]);

        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);

        this.query = this.query.find(queryCopy);
        return this;
    }

    pagination(resPerPage){
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resPerPage * (currentPage - 1);

        this.query = this.query.limit(resPerPage).skip(skip);
        return this;
    }

    category() {
        if (this.queryStr.category) {
            this.query = this.query.find({ category: this.queryStr.category });
        }
        return this;
    }
    
}

module.exports = ApiFeature;