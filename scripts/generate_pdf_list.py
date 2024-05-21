import os
import json
from collections import defaultdict

# Path to the folder containing PDFs
pdf_folder = 'letters'

# Get list of PDF files
pdf_files = [f for f in os.listdir(pdf_folder) if f.endswith('.pdf')]

# Dictionary to hold grouped PDFs by month
pdf_groups = defaultdict(list)

# Group PDFs by month
for filename in pdf_files:
    # Extract the month from the filename
    month = filename[:7]  # Extract yyyy-mm from yyyy-mm-dd.pdf
    # Add the filename to the corresponding month group
    pdf_groups[month].append(filename)

# Convert the dictionary to a list of dictionaries for JSON serialization
pdf_list = [{"month": month, "pdfs": pdfs} for month, pdfs in pdf_groups.items()]

# Write the list of dictionaries to a JSON file
with open('pdf_list.json', 'w') as json_file:
    json.dump(pdf_list, json_file, indent=4)
