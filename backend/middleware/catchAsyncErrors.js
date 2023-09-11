//we use promises with resolve and reject and later use then and catch to handle the promise returned
//rhis below mehtos is called currying
//functions having re re next is known as middleware func
module.exports = (func) => (req, res, next) => {
  //calling resolve method of promise
  //next refers to callback function in error.js and we get success false if no name is entered etc..
  Promise.resolve(func(req, res, next)).catch(next);
};
