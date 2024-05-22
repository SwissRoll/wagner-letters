document.addEventListener("DOMContentLoaded", () => {
    const pdfListElement = document.getElementById('pdf-list');
    const paginationElement = document.getElementById('pagination');
    const filterElement = document.getElementById('filter');
    const itemsPerPage = 25;
    let currentPage = 1;
    let pdfData = [];
    let filteredData = [];

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
      });

    function populateFilterOptions(data) {
      const years = new Set();
      const yearMonths = new Set();

      data.forEach(file => {
        const [year, month] = file.split('-');
        years.add(year);
        yearMonths.add(`${year}-${month}`);
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