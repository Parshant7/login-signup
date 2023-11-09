const messages = {
    register: "User registered successfully ",
    registerError:"Registration unsuccessfull",
    userExists: "Users EmailId already exists",
    unauthorizedEmail: "Invalid email ",
    UnauthorizedPassword: "Invalid password",
    loginSuccess: "Successful login",
    loginError:"Login unsuccessfull",
    TokenError: "Enter token generated for authorization",
    UnauthorizedUser: "You are not allowed to perform this action",
    productAdded: "product successfully added",
    productAddedError: "error in adding products",
    productGetSuccess: "Successfully fetched products",
    productGetFailure: "Failed to Get products",
    productExistFailure: "Product does not exist",
    likeAdded: "liked product successfully",
    likeRemoved: "unliked product",
    dislikeAdded: "liked product successfully",
    dislikeRemoved: "undisliked product", // don't if the term "undisliked" even exists
    uploadfileError: "Please upload an image",
    serverError: "Server Error, Please try again after some time",
    fieldsError: "Please fill the fields correctly"
  };
  
  const responseStatus = {
    success: 1,
    failure: 0,
  };
  
  const statusCode = {
    Ok: 200,
    Created: 201,
    Bad_request: 400,
    Unauthorized: 401,
    Not_Found: 404,
  };
  
  export { messages, responseStatus, statusCode };
  