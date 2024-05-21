import os
import json

# Path to the folder containing PDFs
pdf_folder = 'letters'

# Get list of PDF files
pdf_files = [f for f in os.listdir(pdf_folder) if f.endswith('.pdf')]

# Create a dictionary to hold the PDF list
pdf_list = {"pdfs": pdf_files}

# Write the dictionary to a JSON file
with open('pdf_list.json', 'w') as json_file:
    json.dump(pdf_list, json_file, indent=4)
