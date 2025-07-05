
// import React, { useEffect, useState } from 'react';
// import { Document, Page, pdfjs } from 'react-pdf';
// import './PDFViewer.css';

// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// const PDFViewer = ({ bookId }) => {
//     const [pdfUrl, setPdfUrl] = useState('');
//     const [numPages, setNumPages] = useState(null);

//     useEffect(() => {
//         const token = localStorage.getItem('token');
//         setPdfUrl(`http://localhost:8000/api/payment/pdf/${bookId}?token=${token}`);
//     }, [bookId]);

//     const onDocumentLoadSuccess = ({ numPages }) => {
//         setNumPages(numPages);
//     };

//     return (
//         <div className="pdf-viewer-container">
//             {pdfUrl && (
//                 <Document file={{ url: pdfUrl }} onLoadSuccess={onDocumentLoadSuccess}>
//                     {Array.from(new Array(numPages), (el, index) => (
//                         <Page
//                             key={`page_${index + 1}`}
//                             pageNumber={index + 1}
//                             renderTextLayer={false}
//                             renderAnnotationLayer={false}
//                         />
//                     ))}
//                 </Document>
//             )}
//         </div>
//     );
// };

// export default PDFViewer;


// import React, { useEffect, useState } from 'react';
// import { Document, Page, pdfjs } from 'react-pdf';
// import './PDFViewer.css';

// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// const PDFViewer = ({ bookId }) => {
//     const [pdfFile, setPdfFile] = useState(null);
//     const [numPages, setNumPages] = useState(null);

//     useEffect(() => {
//         const fetchPDF = async () => {
//             const token = localStorage.getItem('token');
//             try {
//                 const response = await fetch(`http://localhost:8000/api/payment/pdf/${bookId}`, {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 });

//                 if (!response.ok) throw new Error("Failed to load PDF");

//                 const blob = await response.blob();
//                 const url = URL.createObjectURL(blob);
//                 setPdfFile(url);
//             } catch (error) {
//                 console.error("PDF load error:", error);
//             }
//         };

//         if (bookId) fetchPDF();
//     }, [bookId]);

//     const onDocumentLoadSuccess = ({ numPages }) => {
//         setNumPages(numPages);
//     };

//     return (
//         <div className="pdf-viewer-container">
//             {pdfFile && (
//                 <Document
//                     file={pdfFile}
//                     onLoadSuccess={onDocumentLoadSuccess}
//                     loading={<p>Loading PDF...</p>}
//                 >
//                     {Array.from(new Array(numPages), (_, index) => (
//                         <Page
//                             key={`page_${index + 1}`}
//                             pageNumber={index + 1}
//                             renderTextLayer={false}
//                             renderAnnotationLayer={false}
//                         />
//                     ))}
//                 </Document>
//             )}
//         </div>
//     );
// };

// export default PDFViewer;

// import React, { useEffect, useState } from 'react';
// import { Document, Page, pdfjs } from 'react-pdf';
// import './PDFViewer.css';

// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// const PDFViewer = ({ bookId }) => {
//     const [pdfBlobUrl, setPdfBlobUrl] = useState(null);
//     const [numPages, setNumPages] = useState(null);

//     useEffect(() => {
//         const fetchPdf = async () => {
//             try {
//                 const token = localStorage.getItem('token');
//                 const response = await fetch(`http://localhost:8000/api/payment/pdf/${bookId}`, {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 });

//                 if (!response.ok) {
//                     console.error("PDF fetch failed:", await response.text());
//                     return;
//                 }

//                 const blob = await response.blob();
//                 const url = URL.createObjectURL(blob);
//                 setPdfBlobUrl(url);
//             } catch (error) {
//                 console.error("Error loading PDF:", error);
//             }
//         };

//         if (bookId) fetchPdf();
//     }, [bookId]);

//     const onDocumentLoadSuccess = ({ numPages }) => {
//         setNumPages(numPages);
//     };

//     return (
//         <div className="pdf-viewer-container">
//             {pdfBlobUrl ? (
//                 <Document
//                     file={pdfBlobUrl}
//                     onLoadSuccess={onDocumentLoadSuccess}
//                     loading={<p>Loading PDF...</p>}
//                 >
//                     {Array.from(new Array(numPages), (_, index) => (
//                         <Page
//                             key={`page_${index + 1}`}
//                             pageNumber={index + 1}
//                             renderTextLayer={false}
//                             renderAnnotationLayer={false}
//                         />
//                     ))}
//                 </Document>
//             ) : (
//                 <p>Loading PDF or unauthorized...</p>
//             )}
//         </div>
//     );
// };

// export default PDFViewer;



// import React, { useEffect, useState } from 'react';
// import { Document, Page, pdfjs } from 'react-pdf';
// import './PDFViewer.css';

// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// const PDFViewer = ({ bookId }) => {
//     const [pdfBlobUrl, setPdfBlobUrl] = useState(null);
//     const [numPages, setNumPages] = useState(null);

//     useEffect(() => {
//         const fetchPdf = async () => {
//             const token = localStorage.getItem("token");
//             const res = await fetch(`http://localhost:8000/api/payment/pdf/${bookId}`, {
//                 headers: { Authorization: `Bearer ${token}` }
//             });
//             const blob = await res.blob();
//             const url = URL.createObjectURL(blob);
//             setPdfBlobUrl(url);
//         };

//         fetchPdf();
//     }, [bookId]);

//     const onDocumentLoadSuccess = ({ numPages }) => {
//         setNumPages(numPages);
//     };

//     return (
//         <div className="pdf-viewer-container">
//             {pdfBlobUrl ? (
//                 <Document file={pdfBlobUrl} onLoadSuccess={onDocumentLoadSuccess}>
//                     {Array.from(new Array(numPages), (_, index) => (
//                         <Page
//                             key={`page_${index + 1}`}
//                             pageNumber={index + 1}
//                             renderTextLayer={false}
//                             renderAnnotationLayer={false}
//                         />
//                     ))}
//                 </Document>
//             ) : (
//                 <p>Loading PDF...</p>
//             )}
//         </div>
//     );
// };

// export default PDFViewer;


import React, { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import './PDFViewer.css';


import workerSrc from 'pdfjs-dist/build/pdf.worker.entry';
pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

const PDFViewer = ({ bookId }) => {
    const [pdfBlobUrl, setPdfBlobUrl] = useState(null);
    const [numPages, setNumPages] = useState(null);

    useEffect(() => {
        const fetchPdf = async () => {
            const token = localStorage.getItem("token");
            const res = await fetch(`http://localhost:8000/api/payment/pdf/${bookId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const blob = await res.blob();
            setPdfBlobUrl(URL.createObjectURL(blob));
        };

        fetchPdf();
    }, [bookId]);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    return (
        <div className="pdf-viewer-container">
            {pdfBlobUrl ? (
                <Document file={pdfBlobUrl} onLoadSuccess={onDocumentLoadSuccess}>
                    {Array.from(new Array(numPages), (_, index) => (
                        <Page
                            key={`page_${index + 1}`}
                            pageNumber={index + 1}
                            renderTextLayer={false}
                            renderAnnotationLayer={false}
                        />
                    ))}
                </Document>
            ) : (
                <p>Loading PDF...</p>
            )}
        </div>
    );
};

export default PDFViewer;
