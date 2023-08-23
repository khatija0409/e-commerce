//adding search filter pagination options in website
//querystring is something after ? in url. It is a key value pair.Ex: ehn user searches for something in website
//query is req for something
class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }
  //adding search feature
  search() {
    //this.queryStr value will be obtained whenever an object is made by calling the above constructor
    const keyword = this.queryStr.keyword
      ? {
          //if keyword is obtained then we search by the name of product
          name: {
            //below is used to search a particular string
            $regex: this.queryStr.keyword,
            $options: "i", //case insens
          },
        }
      : {
          //if name is not found , then keyword val will be assigned with name val which is not present and we get empty product list
        };

    //changing query product.find to below where only the prod having the keyword is searched
    this.query = this.query.find({ ...keyword }); //val of name that is assigned to the keyword var above
    return this;
  }
  //filtering is done for a category
  filter() {
    const queryCopy = { ...this.queryStr }; //having a copy of queryStr since well make changes to it.We use a spread operator instead of this.queryString since changes will be made in original val due to referencing. queryStr is list of all key value pairs after ?
    //removing some fields after ? and keep only category
    //fileds to be removed are

    const removeFields = ["keyword", "page", "limit"];
    removeFields.forEach((key) => delete queryCopy[key]);

    //for price and rating we are writing this to include range of price not exact price
    // we use gt and lt in params
    //since querycopy is an obj to add $gt we convert it to string
    let queryStr = JSON.stringify(queryCopy);

    //replacing $gt and all others with equivalent gt using reg exp at once
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`); //$gt

    //below is same like product.find
    //this.query=this.query.find(queryCopy);//querycopy has category field only with the url
    //converting string to obj
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }
  pagination(resultsPerPage){
    //querystr is everything that comes after ? in urland querystr.page gives only page val in url
    const currentPage=Number(this.queryStr.page )|| 1;//if page value not given then it is 1
    //skip Ex:tot prods=50>> prods per page :10>>pages=5>>in page1 :no skip since first 10 prods will be shown>>in second page : prods from 11 to 20 will be shown by skipping prev 10 prods
    const skip=resultsPerPage*(currentPage-1);
    //this.query isprod.find on which limit and skip is added
    this.query=this.query.limit(resultsPerPage).skip(skip);
    return this;
  }
}
module.exports = ApiFeatures;
