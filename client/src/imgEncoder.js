export function encodeImageFileAsBase64(blob) {
    return new Promise((resolve, reject) => {
      // Validate input
      if (!(blob instanceof Blob)) {
        reject(new Error('Invalid input: Expected a Blob object.'));
        return;
      }
  
      // Validate file type (optional)
      if (!blob.type.startsWith('image/')) {
        reject(new Error('Invalid file type: Expected an image file.'));
        return;
      }
  
      // Validate file size (optional)
      const maxSize = 5 * 1024 * 1024; // 5 MB
      if (blob.size > maxSize) {
        reject(new Error('File size exceeds the limit of 5 MB.'));
        return;
      }
  
      // Create a FileReader object
      const reader = new FileReader();
  
      // Event: File reading is complete
      reader.onloadend = () => {
        resolve(reader.result); // Resolve with the Base64 data URL
      };
  
      // Event: Error during file reading
      reader.onerror = () => {
        reject(reader.error); // Reject with the error
      };
  
      // Read the file as a Base64 data URL
      reader.readAsDataURL(blob);
    });
  }