const mongoose = require("mongoose");

//function to connect

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODDB_URl);
    console.log("DB has been connected");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};
dbConnect();
