var listener = function (event) {
    // Get the list of selected files by change-event parameter called event
    var selectedInput = event.target;
    var selectedFiles = selectedInput.files;

    // Check if there is any selected file
    if (!selectedFiles || selectedFiles.length === 0)
        return;

    // Check if there is only one selected file
    if (selectedFiles.length === 1) {
        // Get a URL to the selected file
        var localUrl = URL.createObjectURL(selectedFiles[0]);

        // Get img-element using DOM-API
        var imageHTMLElement = document.getElementById("image-preview");

        // Cast to HTMLImageElement
        var imageElement = imageHTMLElement;

        // Check if imageElement is null
        if (!imageElement)
            return;

        // Show the selected image
        // Set the src property of the img element to the generated URL
        imageElement.src = localUrl;

        // Remove the Tailwind class `hidden` to display the image
        imageElement.classList.remove("hidden");
    }
};

// Get the input element from the DOM
var fileInput = document.getElementById("file-input");

// Add the event listener if the input element exists
if (fileInput) {
    fileInput.addEventListener("change", listener);
}