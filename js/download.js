function downloadFile(fileUrl, filename, mimeType) {
  fetch(fileUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('File fetch failed.');
      }
      return response.blob();
    })
    .then(blob => {
      const blobUrl = URL.createObjectURL(blob);

      const isIOS = /iP(ad|hone|od)/.test(navigator.userAgent);
      if (isIOS) {
        // iOS doesn't support download attribute; fallback
        window.location.href = fileUrl;
        // alert("iOS detected: Long press and choose 'Save to Files' to download.");
      } else {
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = filename || 'download';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(blobUrl);
      }
    })
    .catch(err => {
      console.error('Download error:', err);
      alert('Failed to download file.');
    });
}
