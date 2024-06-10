const fs = require("fs");
const { Transform } = require("stream");

function processData(inputFilePath, outputFilePath) {

  const transformStream = new Transform({
    transform(chunk, encoding, callback) {

      const processedChunk = chunk.toString().toUpperCase();
      this.push(processedChunk);
      callback();
    },
  });

  const inputStream = fs.createReadStream(inputFilePath);
  const outputStream = fs.createWriteStream(outputFilePath);


  inputStream.pipe(transformStream).pipe(outputStream);

  outputStream.on("finish", () => {
    console.log("Data processing complete. Output written to", outputFilePath);
  });

  outputStream.on("error", (error) => {
    console.error("Error processing data:", error);
  });
}

processData("input.txt", "output.txt");
