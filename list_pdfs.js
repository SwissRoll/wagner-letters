document.addEventListener("DOMContentLoaded", () => {
    const pdfListElement = document.getElementById('pdf-list');
    const paginationElement = document.getElementById('pagination');
    const filterElement = document.getElementById('filter');
    const itemsPerPage = getItemsPerPage();
    let currentPage = 1;
    let pdfData = [];
    let filteredData = [];

    filterElement.addEventListener("change", applyFilter)

    fetch('pdf_list.json')
      .then(response => response.json())
      .then(data => {
        pdfData = data.pdfs;
        populateFilterOptions(pdfData);
        filteredData = pdfData;
        renderPage();
      })
      .catch(error => {
        console.error('Error fetching the PDF list:', error);
        // Running locally, use hard-coded pdf_list below
        pdfData = pdf_list.pdfs;
        populateFilterOptions(pdfData);
        filteredData = pdfData;
        renderPage();
      });
    
    window.addEventListener('resize', () => {
      itemsPerPage = getItemsPerPage();
      renderPage();
    });

    function getItemsPerPage() {
      return window.innerWidth <= 600 ? 10 : 25;
    }

    function populateFilterOptions(data) {
      const years = new Set();
      const yearMonths = new Set();

      data.forEach(file => {
        const [year, month] = file.split('.');
        years.add(year);
        yearMonths.add(`${year}.${month}`);
      });

      years.forEach(year => {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        filterElement.appendChild(option);
      });

      yearMonths.forEach(yearMonth => {
        const option = document.createElement('option');
        option.value = yearMonth;
        option.textContent = yearMonth;
        filterElement.appendChild(option);
      });
    }

    function applyFilter() {
      const filterValue = filterElement.value;

      if (filterValue === 'all') {
        filteredData = pdfData;
      } else {
        filteredData = pdfData.filter(file => file.startsWith(filterValue));
      }

      currentPage = 1;
      renderPage();
    }

    function renderPage() {
      pdfListElement.innerHTML = '';
      paginationElement.innerHTML = '';

      const start = (currentPage - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      const paginatedData = filteredData.slice(start, end);

      paginatedData.forEach(file => {
        const listItem = document.createElement('li');
        listItem.classList.add('pdf-list-item');
        const link = document.createElement('a');
        link.href = `letters/${file}`;
        link.textContent = file;
        link.target = "_blank";
        listItem.appendChild(link);
        pdfListElement.appendChild(listItem);
      });

      renderPagination();
    }

    function renderPagination() {
      const totalPages = Math.ceil(filteredData.length / itemsPerPage);

      for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        pageButton.onclick = () => {
          currentPage = i;
          renderPage();
        };

        if (i === currentPage) {
          pageButton.disabled = true;
        }

        paginationElement.appendChild(pageButton);
      }
    }
  });

pdf_list = {
    "pdfs": [
        "1916.08.10 - Russel Wagner.pdf",
        "1916.10.29 - Russel Wagner.pdf",
        "1916.11.05 - Russel Wagner.pdf",
        "1916.11.12 - Russel Wagner.pdf",
        "1916.11.19 - Russel Wagner.pdf",
        "1916.11.27 - Russel Wagner.pdf",
        "1916.12.07 - Russel Wagner.pdf",
        "1916.12.15 - Russel Wagner.pdf",
        "1916.12.26 - Russel Wagner.pdf",
        "1916.XX.XX - Russel Wagner.pdf",
        "1917.01.07 - Russel Wagner.pdf",
        "1917.01.14 - Russel Wagner (to Mabel).pdf",
        "1917.01.28 - Russel Wagner.pdf",
        "1917.02.08 - Russel Wagner.pdf",
        "1917.02.11 - Russel Wagner (to Corporal).pdf",
        "1917.02.11 - Russel Wagner.pdf",
        "1917.02.17 - Russel Wagner.pdf",
        "1917.02.23 - Russel Wagner.pdf",
        "1917.03.26 - Russel Wagner.pdf",
        "1917.04.08 - Russel Wagner.pdf",
        "1917.04.29 - Russel Wagner (to Mabel).pdf",
        "1917.04.29 - Russel Wagner.pdf",
        "1917.05.02 - Russel Wagner (opened by censor).pdf",
        "1917.05.05 - Russel Wagner (opened by censor).pdf",
        "1917.05.13 - Russel Wagner.pdf",
        "1917.05.27 - Russel Wagner.pdf",
        "1917.06.04 - Russel Wagner.pdf",
        "1917.06.10 - Russel Wagner.pdf",
        "1917.06.15 - Russel Wagner.pdf",
        "1917.06.24 - Russel Wagner.pdf",
        "1917.07.01 - Russel Wagner.pdf",
        "1917.07.08 - Russel Wagner.pdf",
        "1917.07.15 - Russel Wagner.pdf",
        "1917.07.21 - Russel Wagner.pdf",
        "1917.08.10 - Russel Wagner.pdf",
        "1917.08.23 - Russel Wagner.pdf",
        "1917.08.27 - Russel Wagner.pdf",
        "1917.09.09 - Russel Wagner.pdf",
        "1917.09.15 - Russel Wagner.pdf",
        "1917.09.19 - Russel Wagner.pdf",
        "1917.09.29 - Russel Wagner.pdf",
        "1917.10.07 - Russel Wagner.pdf",
        "1917.10.13 - Russel Wagner.pdf",
        "1917.10.20 - Russel Wagner.pdf",
        "1917.10.25 - Russel Wagner.pdf",
        "1917.11.03 - Russel Wagner.pdf",
        "1917.11.19 - Russel Wagner (a thief story).pdf",
        "1917.11.25 - Russel Wagner.pdf",
        "1917.12.07 - Russel Wagner.pdf",
        "1917.12.20 - Russel Wagner.pdf",
        "1917.12.30 - Russel Wagner.pdf",
        "1918.01.01 - Annis Wagner.pdf",
        "1918.01.03 - Russel Wagner.pdf",
        "1918.01.12 - Neil Poole.pdf",
        "1918.01.12 - Russel Wagner.pdf",
        "1918.01.27 - Russel Wagner.pdf",
        "1918.02.18 - Russel Wagner (put on draft).pdf",
        "1918.02.26 - Russel Wagner.pdf",
        "1918.03.02 - Russel Wagner (just arrived to France).pdf",
        "1918.03.11 - Russel Wagner (on active service).pdf",
        "1918.03.17 - Russel Wagner (on active service).pdf",
        "1918.03.29 - Russel Wagner (on active service).pdf",
        "1918.04.03 - Russel Wagner.pdf",
        "1918.04.11 - Russel Wagner (censored).pdf",
        "1918.04.17 - Russell Wagner (censored).pdf",
        "1918.04.18 - Russel Wagner (on active service).pdf",
        "1918.04.28 - Russel Wagner (on active service).pdf",
        "1918.05.10 - Russel Wagner (on active service).pdf",
        "1918.05.22 - Russel Wagner.pdf",
        "1918.06.22 - Russel Wagner (on active service).pdf",
        "1918.07.01 - Russel Wagner (on active service).pdf",
        "1918.07.09 - Russel Wagner (on active service).pdf",
        "1918.07.18 - Russel Wagner (on active service).pdf",
        "1918.07.26 - Russel Wagner.pdf",
        "1918.07.27 - Russel Wagner (on active service).pdf",
        "1918.08.18 - Russel Wagner.pdf",
        "1918.08.26 - Russel Wagner.pdf",
        "1918.09.12 - Russel Wagner.pdf",
        "1918.09.20 - Russel Wagner (on active service).pdf",
        "1918.10.02 - Russel Wagner.pdf",
        "1918.10.07 + 1918.10.10 - Russel Wagner.pdf",
        "1918.10.16 - Russel Wagner (on active service).pdf",
        "1918.10.22 - Russel Wagner (on active service).pdf",
        "1918.10.28 - Russel Wagner.pdf",
        "1918.11.03 - Russel Wagner.pdf",
        "1918.11.13 + 1918.11.19 - Russel Wagner (on active service).pdf",
        "1918.11.26 - Russel Wagner (on active service).pdf",
        "1918.12.08 - Russel Wagner - Germany.pdf",
        "1918.12.26 - Russel Wagner (on active service).pdf",
        "1919.01.12 - Russel Wagner (on active service) (incomplete).pdf",
        "1919.02.04 - Russel Wagner.pdf",
        "1919.02.20 - Russel Wagner.pdf",
        "1919.02.26 - Russel Wagner (on active service).pdf",
        "1919.07.12 - Mabel Grant.pdf",
        "1927.06.22 - Mabel Grant.pdf"
    ]
}