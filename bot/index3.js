import puppeteer from "puppeteer";
import xlsx from "xlsx";

// Function to read data from Excel file
function readExcel(filePath) {
  const workbook = xlsx.readFile(filePath);
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  return xlsx.utils.sheet_to_json(worksheet);
}

// Define the path to the Excel file
const excelFilePath = "../name.xlsx";

// Read data from Excel file
const data = readExcel(excelFilePath);

// Launch Puppeteer browser and create a new page
(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  try {
    const URL = "http://localhost:5173/";
    await page.goto(URL);

    // Iterate over each item in the data array and post data
    for (const item of data) {
      await postData(page, item);
    }

    console.log("All data filled in the input field and submitted successfully!");

    // Write the updated Excel data back to the file
    const newWorkbook = xlsx.utils.book_new();
    const newWorksheet = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(newWorkbook, newWorksheet);
    xlsx.writeFile(newWorkbook, excelFilePath);
    console.log("Excel file updated with success and error status.");
  } catch (error) {
    console.error("Error:", error);
  } finally {
    // Close the browser
    console.log("Finally closed");
    await browser.close();
  }
})();

// Function to post data to the URL using the provided page instance
const postData = async (page, item) => {
    if(!item.Names){
        console.log('Data Over',item.Names)
        return
    }
    try {
      const initialURL = page.url(); // Get the initial URL before submission
      await page.type("#name", item.Names.toString());
      await page.click("#submit");
    //   await page.waitForTimeout(1000); // Wait for a short delay after submission
      const currentURL = page.url(); // Get the current URL after submission
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Check if the URL changes after submission
    //   if (initialURL !== currentURL) {
    //     item.Success = "Success"; // Update the "Success" field of the item
    //     console.log("Data filled in the input field and submitted successfully for:", item);
    //   } else {
    //     item.Error = "Error"; // Update the "Error" field of the item
    //     console.log("Error submitting data for:", item);
    //   }
    } catch (error) {
      console.error("Error:", error);
      item.Error = "Error"; // Update the "Error" field of the item
    }
  };


  // Function to post data to the URL using the provided page instance
// const postData = async (page, item) => {
//     try {
//       const initialURL = page.url(); // Get the initial URL before submission
//       await page.type("#name", item.Names.toString());
//       await page.click("#submit");
//       await page.waitForTimeout(1000); // Wait for a short delay after submission
//       const currentURL = page.url(); // Get the current URL after submission
  
//       // Check if the URL changes after submission
//       if (initialURL !== currentURL) {
//         item.Success = "Success"; // Update the "Success" field of the item
//         console.log("Data filled in the input field and submitted successfully for:", item);
//       } else {
//         item.Error = "Error"; // Update the "Error" field of the item
//         console.log("Error submitting data for:", item);
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       item.Error = "Error"; // Update the "Error" field of the item
//     }
//   };