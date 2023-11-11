import mongoose from "mongoose";

const transactionHistorySchema = mongoose.Schema({
  time: { type: String },
  price: { type: Number },
  purchasedPages: { type: Number },
});

const printingHistorySchema = mongoose.Schema({
  filename: { type: String },
  time: { type: String },
  printedPages: { type: Number },
  paperType: { type: String },
  location: { type: String },
});

const studentSchema = mongoose.Schema({
  studentID: { type: String, required: true },
  studentName: { type: String, required: true },
  studentEmail: { type: String, required: true },
  studentFaculty: { type: String, required: true },
  remainingPages: { type: Number, required: true },
  transactionHistory: [transactionHistorySchema],
  printingHistory: [printingHistorySchema],
});

export const Student = mongoose.model("Student", studentSchema);
