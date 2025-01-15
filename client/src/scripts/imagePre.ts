const listener = (event: Event) => {
    // Get the list of selected files by change-event parameter called event
    const selectedInput: HTMLInputElement = event.target as HTMLInputElement;
    const selectedFiles: FileList | null = selectedInput.files;
    // Check if there is any selected file
    if (!selectedFiles || selectedFiles.length === 0) return;
    // Check if there is only one selected file
    if (selectedFiles.length === 1) {
      // Get a url to the selected file
      const localUrl = URL.createObjectURL(selectedFiles[0]);
      // Get img-element using DOM-API
      // Nutzen Sie die DOM-API, um auf das img-Element zurückzugreifen
      const imageHTMLElement: HTMLElement | null = document.getElementById("image-preview");
      // Cast to HTMLImageElement
      const imageElement: HTMLImageElement = imageHTMLElement as HTMLImageElement;
      // Check if imageElement is null
      if (!imageElement) return;
      // Show the selected image
      //Setzen Sie die src-Property des img-Elements auf die Variable `localUrl`
      /**
       * Hier fehlt noch etwas (REPLACE_ME)
       */
      // Zeigen Sie das img-Element an bspw. über das Entfernen der Tailwind-Klasse `hidden`
      /**
       * Hier fehlt noch etwas (REPLACE_ME)
       */
       // Setzt die src-Property des img-Elements auf die generierte URL
       imageElement.src = localUrl;
  
       // Entfernt die Tailwind-Klasse `hidden`, um das Bild anzuzeigen
       imageElement.classList.remove("hidden");
    }
  };
  // Holt das input-Element aus dem DOM
  const fileInput: HTMLInputElement | null = document.getElementById("file-input") as HTMLInputElement;
  
  // Fügt den Event-Listener hinzu, wenn das input-Element existiert
  if (fileInput) {
    fileInput.addEventListener("change", listener);
  }