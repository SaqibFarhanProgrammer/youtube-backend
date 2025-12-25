import asyncHandler from '../utils/asyncHandler.js';

const registerUser = asyncHandler(async (req, res) => {
  /*
// Step 1: Extract user data from request body

// Step 2: Validate that required fields are present


// Step 3: Hash the password
// Step 4: Save user to database

// Step 5: Return success response




*/

const {email , password} = req.body;
console.log(email,password);



});

export { registerUser };
