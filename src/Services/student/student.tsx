import axios from "axios";
import { axiosservice } from "../config/API";

//list student
export const getAllstudents = async () => {
  try {
    const { data } = await axiosservice.get("manager/student"); // endpoint -> student
    return data;
  } catch (error) {
    console.log(error);
  }
};
