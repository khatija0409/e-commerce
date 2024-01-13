//Adding search, filter, pagination options 
class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }
  //Search function
  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i", //case insensitive
          },
        }
      : {
  
        };

    this.query = this.query.find({ ...keyword }); 
    return this;
  }
  //filter function
  filter() {
    const queryCopy = { ...this.queryStr }; 
    //fields to be removed are
    const removeFields = ["keyword", "page", "limit"];
    removeFields.forEach((key) => delete queryCopy[key]);
    //Convert to string
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`); //$gt
    //Convert string to object
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }
  pagination(resultsPerPage){
    const currentPage=Number(this.queryStr.page )|| 1;
    const skip=resultsPerPage*(currentPage-1);
    this.query=this.query.limit(resultsPerPage).skip(skip);
    return this;
  }
}
module.exports = ApiFeatures;
