const url = '../docs/pdf.pdf';

let pdfDoc = null,
    pageNum = 1,
    pageIsRendering = false,
    pageNumisPending = null;

const scale = 1.5,
    canvas = document.querySelector('#pdf-render'),
    ctx = canvas.getContext('2d');

// Render the Page
const renderPage = num => {
    pageIsRendering = true;

    // Get Page
    pdfDoc.getPage(num).then(page => {
        const viewport = page.getViewport({scale});
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderCtx = {
            canvasContext: ctx,
            viewport
        }
        
        page.render(renderCtx).promise.then(() => {
            pageIsRendering = false;

            if(pageNumisPending !== null){
                renderPage(pageNumisPending);
                pageNumisPending = null;
            }
        });

        // Output Current Page
        document.querySelector('#page-num').textContent = num;
    });
};

// Check for Pages Rendering
const queueRenderPage = num => {
    if(pageIsRendering){
        pageNumisPending = num;
    } else {
        renderPage(num);
    }
}

// Show Previous Page
const showPrevPage = () => {
    if(pageNum <= 1)
        return;
    pageNum--;
    queueRenderPage(pageNum);
}

// Show Next Page
const showNextPage = () => {
    if(pageNum >= pdfDoc.numPages)
        return;
    pageNum++;
    queueRenderPage(pageNum);
}

// Get Document
pdfjsLib.getDocument(url).promise.then(pdfDoc_ => {
    pdfDoc = pdfDoc_;

    document.querySelector('#page-count').textContent = pdfDoc.numPages;

    renderPage(pageNum);
})
  .catch(err => {
    // Display Error
    const div = document.createElement('div');
    div.className = 'error';
    div.appendChild(document.createTextNode(err.message));
    document.querySelector('body').insertBefore(div, canvas);

    // Remove Top Bar
    document.querySelector('.top-bar').style.display = 'none';
  });

// Button Events
document.querySelector('#prev-page').addEventListener('click', showPrevPage);
document.querySelector('#next-page').addEventListener('click', showNextPage);