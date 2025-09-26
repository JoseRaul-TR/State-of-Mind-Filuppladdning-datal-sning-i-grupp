# Group assignment - File upload and data reading

This app was developed in our second semester of our first year of two, during our studies in Frontend Development with React. In this assignment, we were challenged with the task of uploading an .xslx file, parsing the content, displaying it in an editable table and, finally, exporting the altered data as a pdf.

## Features

- File upload, through browse and select or drag and drop
- Editable table with file contents
- Export pdf - local save or open in new tab

## Tech

- **Frontend**: React, JavaScript, Tailwind
- **Libraries**:
  - React icons: For icons in the project
  - TanStack Table: Powering our editable table
  - ExcelJS: Parsing .xlsx into JS objects
  - JsPDF: For generating and exporting PDF from the modified worksheet
  - TailwindCSS: 💅
- **Build tool**: Vite

---

# Assignment as described below, machine translated from Swedish for your convenience

> ## F25D - File Upload and Data Reading (Group)
>
> ## About the assignment
>
> You will build a React application where users can upload an Excel document or a Google Sheet. The application must read the data, show it in an editable table, and after editing the user should be able to export the data as a PDF.
>
> Imagine a scenario where a user uploads a budget file, edits a few rows and then exports it to send to their manager.
> The app should be able to import both Excel files and Google Sheets.
>
> ---
>
> ## Case
>
> ## What you must do
>
> Build a modern React app that contains the following steps:
>
> 1. **Upload** an Excel or Google Sheet. `.xlsx` format
> 2. **Read / parse** the document's contents.
> 3. **Display** the data in an **editable table**.
> 4. **Edit**: the user should be able to change content directly in the table.
> 5. **Export function**: after editing the user should be able to:
>    - Export to **PDF**
>
> ## **Features to implement**
>
> - File upload (browse/select and drag-and-drop)
> - Parse Excel / Google Sheets data
> - Present data in an editable table
> - Allow inline editing in the table
> - Export the edited data as a PDF
>
> ## **Tips and libraries you can use**
>
> ### 📦 Recommended libraries
>
> | Purpose       | Package                                                                                                               |
> | ------------- | --------------------------------------------------------------------------------------------------------------------- |
> | 📥 Read Excel | `exceljs`, `ag-grid`                                                                                                  |
> | 📊 Table      | `react-table` or `material-react-table`                                                                               |
> | ✍️ Editing    | Built-in editing features of the table component                                                                      |
> | 📄 Export PDF | [`jspdf`](https://www.npmjs.com/package/jspdf) and [`jspdf-autotable`](https://www.npmjs.com/package/jspdf-autotable) |
> | 🧱 Styling    | [`tailwindcss`](https://tailwindcss.com/) or Material UI                                                              |
>
> ### Getting started tips
>
> 1. Create a new React app with Vite or Create React App.
> 2. Add a file upload component.
> 3. Use `ExcelJS`, `ag-grid`, or `xlsx` to parse file contents.
> 4. Display the content in an editable table.
> 5. Add export functionality step by step (PDF).
> 6. Split your app into components: `UploadFile`, `EditableTable`, `ExportButton`.
>
> ---
>
> Good luck — build it step by step, test the import → edit → export flow, and keep components small and focused.
