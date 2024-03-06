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

// Function to post data to each URL
const postData = async (item) => {
  if(!item.Names){
    console.log('Data Over',item.Names)
    return
}
  // Launch Puppeteer browser
  // const browser = await puppeteer.launch();
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  try {
    await page.goto(item.Url.toString());
    await page.type("#name", item.Names.toString());
    await page.click("#submit");
    // await page.waitForTimeout(1000);
     // Wait for 1000 milliseconds (1 second) using setTimeout
     await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Data filled in the input field and submitted successfully!");
  } catch (error) {
    console.error("Error:", error);
  } finally {
    // Close the browser
    console.log("finally closed");
    await browser.close();
  }
};

// Iterate over each item in the data array and post data
data.forEach((item) => {
  postData(item);
});
