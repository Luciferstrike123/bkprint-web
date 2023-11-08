import express from "express";
import { Printer } from "../models/printer.js";

const printerAPI = express.Router();

// Route for creating a new printer
printerAPI.post("/", async (request, response) => {
  try {
    if (
      !request.body.printerID ||
      !request.body.printerBrand ||
      !request.body.printerName
    ) {
      return response.status(400).send({
        message:
          "Send all required fields: printerID, printerBrand, printerName",
      });
    }

    const newPrinter = {
      printerID: request.body.printerID,
      printerBrand: request.body.printerBrand,
      printerName: request.body.printerName,
      location: {
        building: request.body.location?.building || "",
        room: request.body.location?.room || "",
      },
      status: request.body.status || false,
      printedPages: request.body.printedPages || 0,
    };

    const printer = await Printer.create(newPrinter);

    return response.status(201).send(printer);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for getting all printers
printerAPI.get("/", async (request, response) => {
  try {
    const printers = await Printer.find({});

    return response.status(200).json({
      count: printers.length,
      data: printers,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for getting a printer by ID
printerAPI.get("/:printerID", async (request, response) => {
  try {
    const { printerID } = request.params;
    console.log(printerID);
    const printer = await Printer.findOne({ printerID });

    return response.status(200).json(printer);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

printerAPI.put("/:printerID", async (request, response) => {
  try {
    const { printerID } = request.params;
    const updatedPrinterData = request.body;

    // Check if the request body contains the required fields
    if (!updatedPrinterData.printerBrand || !updatedPrinterData.printerName) {
      return response.status(400).send({
        message: "Send all required fields: printerBrand, printerName",
      });
    }

    const updatedPrinter = await Printer.findOneAndUpdate(
      { printerID },
      updatedPrinterData,
      { new: true }
    );

    if (!updatedPrinter) {
      return response.status(404).json({ message: "Printer not found" });
    }

    return response.status(200).json(updatedPrinter);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

printerAPI.delete("/:printerID", async (request, response) => {
  try {
    const { printerID } = request.params;

    // Find the printer by its ID and delete it
    const result = await Printer.findOneAndRemove({ printerID });

    if (!result) {
      return response.status(404).json({ message: "Printer not found" });
    }

    return response
      .status(200)
      .json({ message: "Printer deleted successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default printerAPI;
