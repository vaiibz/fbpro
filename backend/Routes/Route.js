import express from 'express';
import AuthModel from '../Model/Auth_Schema.js';
import ProductModel from '../Model/Product.js';
import multer from 'multer';


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '_' + Date.now() + '.jpg');
  }
});
const upload = multer({ storage: storage });



const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { username, email, number, password } = req.body;
    console.log(req.body);

    // Check if any required fields are missing
    if (!username || !email || !password) {
      return res.status(400).json({ error: "Please provide all required fields." });
    }

    // Check if username or email already exists
    const existingUser = await AuthModel.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(409).json({ error: "Username or email already exists." });
    }

    // Create a new user
    const newUser = new AuthModel({
      username,
      email,
      number,
      password,
    });

    // Save the user to the database
    await newUser.save();

    // Return success response
    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ error: "An internal server error occurred." });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { LogInemail, LogInpassword } = req.body;

    // Check if email and password are provided
    if (!LogInemail || !LogInpassword) {
      return res.status(400).json({ error: "Please provide email and password." });
    }

    // Find the user by email
    const user = await AuthModel.findOne({ email: LogInemail });

    // Check if user exists and password is correct
    if (!user || user.password !== LogInpassword) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    // User is authenticated, return success response
    res.status(200).json({ message: "Login successful." });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "An internal server error occurred." });
  }
});

router.post("/products", upload.single('image'), async (req, res) => {
  try {
    const image = req.file.path;
    const { companyName, category, productLink, description } = req.body;

    // Create a new instance of the Product model
    const newProduct = new ProductModel({
      companyName,
      category,
      productLink,
      description,
      image: req.file.path,
      // comments: comments || [],
    });

    // Save the product to the database
    const savedProduct = await newProduct.save();

    res.status(201).json(savedProduct);
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ error: "Failed to save the product" });
  }
});

router.get("/AllProducts", async (req, res) => {
  try {
    // Fetch all products from the database
    const products = await ProductModel.find();

    res.status(200).json(products);
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

router.get("/all", async () => {
  try {
    const users = await AuthModel.find();
    console.log(users); // Array of all user documents
    return users;
  } catch (error) {
    console.error('Error while retrieving users:', error);
    throw error;
  }
})

router.delete('/allDell', async (req, res) => {
  try {
    await ProductModel.deleteMany();
    res.json({ message: 'Database cleared successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
})

router.put("/products/:productId/comments", async (req, res) => {
  const { productId } = req.params;
  const { commit } = req.body;
  console.log(commit);

  try {
    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    product.comments = product.comments.concat(commit);
    await product.save();
    res.json({ message: "Comments updated successfully", product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;