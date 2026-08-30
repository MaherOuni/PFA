import { Injectable } from '@angular/core';

/**
 * Prints the receipt shown in the open modal.
 *
 * This used to go through the cloudformatter/xepOnline service, which posted
 * the receipt markup to a third-party server and opened the returned PDF in a
 * popup. That path could not be made to work:
 *
 *  - its endpoints are hardcoded to http://, which a browser blocks as mixed
 *    content once the app is served over https;
 *  - it finishes by calling window.open() from an AJAX callback, which is no
 *    longer a user gesture, so the popup is blocked and the library throws
 *    "Cannot read properties of null (reading 'document')";
 *  - and even with both worked around, the service answers 503 for this
 *    receipt's markup, while accepting simpler payloads of the same size.
 *
 * Native printing avoids all of it, keeps customer data off a third-party
 * server, and still produces a PDF through the browser's own
 * "Save as PDF" destination. The layout is controlled by the @media print
 * block in src/styles.scss, which hides everything except #content.
 */
@Injectable({
  providedIn: 'root'
})
export class ReceiptPdfService {

  print() {
    window.print();
  }
}
