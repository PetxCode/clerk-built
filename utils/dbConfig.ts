import { connect } from "mongoose";

export const dbConfig = async () => {
  try {
    await connect(process.env.DB_STRING as string).then(() => {
      console.log("db connected 🚀🚀❤️❤️");
    });
  } catch (error) {
    console.log(error);
  }
};
