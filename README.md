ProInvoice - Detailed Functional Description

Overview

ProInvoice is a full-featured professional billing application that enables users to create, manage, edit, and print invoices with real-time calculations. Built as a single-page web application with local storage persistence, it offers a complete invoicing solution without requiring any backend server or database setup.

---

Core Features

1. Invoice Dashboard

· Invoice Management: View all created invoices in a responsive grid layout with status indicators (Draft, Sent, Paid, Overdue)
· Filter & Search: Filter invoices by status and search by invoice number, client name, or company name
· Quick Actions: Create new invoices, edit existing ones, or delete invoices directly from the dashboard
· Invoice Count: Display total number of invoices and filtered results count

2. Invoice Creation & Editing

· Invoice Header Fields:
  · Invoice Number: Auto-generated with format "INV-XXXXXX" with manual override option
  · Date & Time: Automatically populates with device's current date/time; fully editable using datetime picker
  · Due Date: Auto-calculated as 15 days from creation date; editable via date picker
  · PO Number: Optional field that intelligently hides in print when left empty
· Business Information:
  · From (Sender): Multi-line text area for company details, address, tax ID, etc.
  · Bill To (Recipient): Multi-line text area for client details, address, email, etc.
  · Both sections are enclosed in distinct bordered boxes with clear headings
· Item Management:
  · Dynamic Line Items: Add unlimited items with the "+ Add Item" button
  · Description: Multi-line textarea supporting line breaks (Enter key) and word wrapping; all text fully visible in print
  · Quantity: Number input with step controls (min: 1)
  · Rate: Number input for per-unit price (supports decimals)
  · Taxable Value: Auto-calculated from Rate based on CGST/SGST percentages; editable
  · Total: Auto-calculated as Quantity × Taxable Value
  · Delete Items: Remove individual items with the × button (minimum 1 item)

3. Real-Time Calculations

· Subtotal: Sum of all item totals, updated instantly with every change
· Discount:
  · Type: Toggle between Percentage (%) or Flat amount
  · Dynamic Symbol: Shows "%" for percentage, currency symbol (e.g., ₹, $, €) for flat discount
  · Calculated based on subtotal and applied before tax
· Taxes:
  · CGST (%): Customizable percentage input
  · SGST (%): Customizable percentage input
  · Applied to the net amount (subtotal - discount)
· Grand Total: Final amount including all taxes, displayed prominently with currency symbol

4. Notes & Terms

· Left-Aligned Section: Notes appear on the left side of the invoice, with totals on the right
· Persistent Storage: Default notes configured in Settings are auto-populated in new invoices
· Conditional Display: If empty, no notes section appears in the printed invoice
· Supports Multi-line Text: Preserves formatting and line breaks in both editor and print

5. Logo Management

· Upload: Click to upload company logo (PNG, JPG, SVG up to 2MB)
· Storage: Logo stored as base64 in localStorage
· Conditional Display: If no logo is uploaded, the logo section is completely hidden in both screen and print views
· Preview: Logo preview shown in Settings and on the invoice header

6. Invoice Layouts

· 8 Distinct Layout Styles:
  1. Formal Tax: Classic bordered design with strong shadow effect
  2. Corporate: Clean layout with prominent top accent bar
  3. Remittance: Bold left-side accent border
  4. Minimal: Clean, borderless design with subtle background
  5. Elegant: Warm color palette with serif font styling
  6. Modern: Gradient backgrounds with soft shadows and rounded corners
  7. Soft: Warm, rounded design with gentle color scheme
  8. Bold: High-contrast layout with thick border and shadow
· Live Preview: Visual preview cards in Settings showing each layout style
· Instant Switching: Click to apply a new layout; changes reflect immediately

7. Printing Features

· Print Mode Options:
  · Black & White: Converts invoice to grayscale, ideal for standard printing
  · Color: Preserves all colors and gradients for vibrant printouts
· Clean Print Output:
  · All input controls (spinners, calendar pickers, dropdowns) are hidden
  · Borders and table formatting optimized for paper
  · Placeholder text (e.g., "Optional") automatically hidden
  · Status badge hidden in print
· Description Box: Textareas are replaced with divs for perfect multi-line text expansion
· Conditional PO #: PO # row completely hidden when empty
· Watermark: Diagonal "INVOICE NUMBER" watermark centered on the page (8% opacity, -30° rotation)

8. Settings Panel

· Currency Selection: 7 currency options (USD, INR, EUR, GBP, JPY, CAD, AUD)
· Default Tax Rates: Set default CGST and SGST percentages for new invoices
· Default Notes: Pre-fill Notes & Terms for all new invoices
· Dark Mode: Toggle dark theme for comfortable night usage
· Layout Selection: Visual layout picker with preview cards
· Logo Upload: Upload and manage company logo
· Data Management:
  · Export: Download all invoices and settings as JSON backup
  · Import: Upload JSON backup to restore data

9. Data Persistence

· Local Storage: All invoices and settings stored in browser's localStorage
· No Internet Required: Fully functional offline
· Auto-Save: Invoices automatically saved when using the Save button
· Keyboard Shortcuts:
  · Ctrl+S / Cmd+S: Save current invoice
  · Escape: Exit editor and return to dashboard

10. User Interface

· Responsive Design: Optimized for all screen sizes (mobile, tablet, desktop)
· Dark Mode: Toggle between light and dark themes
· Toast Notifications: User feedback for actions (save, delete, import, export)
· Clean, Professional Styling: Inter font family applied globally for consistency
· Accessibility: Clear labels, sufficient contrast, and logical tab order

---

Technical Specifications

Technology Stack

· HTML5: Structure and semantic elements
· CSS3: Tailwind CSS for styling, custom CSS for print and responsive behaviors
· JavaScript: Vanilla JS for all functionality (no external libraries)
· Google Fonts: Inter font for consistent typography
· Local Storage: Persistent data storage

Key Interactions

1. Create Invoice: Click "New Invoice" → Fill in fields → Add items → Save
2. Edit Invoice: Click "Edit" on dashboard → Modify fields → Save
3. Print Invoice: Click "Print" → Select B&W/Color → Generate print-friendly version
4. Configure Settings: Click "Settings" → Adjust currency, taxes, notes, logo, layout → Save
5. Export/Import Data: Backup or restore all invoices and settings via JSON

---

User Benefits

· Professional Output: Clean, well-formatted invoices suitable for client presentation
· Time-Saving: Auto-calculations, default values, and templates reduce manual work
· Flexibility: Multiple layouts, print modes, and customization options
· Data Control: Full ownership of data with local storage and export/import capabilities
· No Subscription Costs: Free, self-contained application requiring no hosting or recurring fees
· Cross-Platform: Works on any device with a modern browser (desktop, tablet, phone)

---

Future Enhancement Possibilities

· Multi-currency support per invoice
· Invoice number series management
· Client database and auto-suggest
· PDF export option
· Email sending functionality
· Invoice templates library
· Dashboard analytics (total revenue, pending payments, etc.)