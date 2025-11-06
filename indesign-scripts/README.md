# Word to InDesign Formatter Script

An Adobe InDesign script that automatically imports Word documents and applies character and paragraph styles from your InDesign template.

## Features

- **Automatic Word Import**: Import .doc, .docx, and .rtf files directly into InDesign
- **Style Mapping**: Automatically maps Word styles to your InDesign template styles
- **Intelligent Matching**: Uses fuzzy matching to find corresponding styles (e.g., "Heading 1" → "Header 1")
- **Auto-Flow Text**: Automatically creates new pages when text overflows
- **Preserves Formatting**: Maintains text structure while applying InDesign styles
- **Template Properties**: New documents inherit page size, margins, and other settings from your template

## Installation

### Method 1: InDesign Scripts Panel

1. Copy the `WordToInDesignFormatter.jsx` file
2. Navigate to your InDesign Scripts folder:
   - **macOS**: `~/Library/Preferences/Adobe InDesign/[Version]/[Language]/Scripts/Scripts Panel/`
   - **Windows**: `C:\Users\[Username]\AppData\Roaming\Adobe\InDesign\[Version]\[Language]\Scripts\Scripts Panel\`
3. Paste the script file into this folder
4. The script will appear in InDesign under **Window > Utilities > Scripts > User**

### Method 2: Application Scripts Folder (All Users)

1. Copy the `WordToInDesignFormatter.jsx` file
2. Navigate to the application scripts folder:
   - **macOS**: `/Applications/Adobe InDesign [Version]/Scripts/Scripts Panel/`
   - **Windows**: `C:\Program Files\Adobe\Adobe InDesign [Version]\Scripts\Scripts Panel\`
3. Paste the script file into this folder
4. The script will appear in InDesign under **Window > Utilities > Scripts > Application**

## Usage

### Basic Workflow

1. **Prepare Your Template**
   - Open your InDesign template document
   - Ensure it has all the paragraph and character styles you want to use
   - Common styles: Body Text, Heading 1, Heading 2, Heading 3, Quote, Caption, etc.

2. **Run the Script**
   - With your template open, go to **Window > Utilities > Scripts**
   - Double-click **WordToInDesignFormatter.jsx**

3. **Select Word Document**
   - A file dialog will appear
   - Browse and select your Word document (.doc, .docx, or .rtf)
   - Click **Open**

4. **Confirm Import**
   - Review the confirmation dialog showing:
     - Word file name
     - Template document name
   - Click **OK** to proceed

5. **Review Results**
   - The script creates a new InDesign document
   - Word content is imported with template styles applied
   - A summary shows pages created and styles mapped

### Style Mapping Logic

The script uses intelligent matching to map Word styles to InDesign styles:

1. **Exact Match**: Looks for identical style names first
2. **Normalized Match**: Ignores spaces, punctuation, and case
3. **Partial Match**: Finds styles that contain similar text
4. **Common Mappings**: Uses predefined mappings for standard styles:

| Word Style | Maps To InDesign |
|------------|------------------|
| Heading 1  | Heading 1, H1, Title, Header 1 |
| Heading 2  | Heading 2, H2, Subtitle, Header 2 |
| Heading 3  | Heading 3, H3, Header 3 |
| Normal     | Body, Text, Paragraph, Body Text |
| Quote      | Quotation, Blockquote, Citation |
| Caption    | Figure, Image Caption |

## Template Setup Best Practices

### Essential Paragraph Styles

Create these paragraph styles in your template for best results:

- **Body Text** / **Normal**: Main body paragraphs
- **Heading 1** - **Heading 6**: Hierarchical headings
- **Subhead**: Section subheadings
- **Quote** / **Blockquote**: Pull quotes and citations
- **Caption**: Image and table captions
- **List**: Bulleted lists
- **List Numbered**: Numbered lists
- **Footnote**: Footnote text

### Essential Character Styles

- **Bold**: Bold emphasis
- **Italic**: Italic emphasis
- **Hyperlink**: Links and references
- **Code**: Inline code or technical terms

### Style Naming Tips

- Use descriptive, consistent names
- Match common Word style names when possible
- Avoid special characters in style names
- Use title case (e.g., "Body Text" not "body_text")

## Customization

### Modifying Import Options

Edit the `importOptions` object in the script (around line 217):

```javascript
var importOptions = {
    convertPageBreaks: ConvertPageBreaks.COLUMN_BREAK,  // How to handle page breaks
    convertTablesTo: ConvertTablesOptions.UNFORMATTED_TABBED_TEXT,  // Table conversion
    preserveLocalOverrides: true,  // Keep manual formatting
    importStyles: true,  // Import Word styles
    resolveTextStyleConflict: ResolveStyleConflict.RESOLVE_USING_INDESIGN_STYLE  // Use InDesign styles
};
```

### Adding Custom Style Mappings

Edit the `commonMappings` object (around line 366) to add your own mappings:

```javascript
var commonMappings = {
    'heading1': ['heading 1', 'h1', 'title', 'header 1'],
    'yourwordstyle': ['your indesign style', 'alternative name'],
    // Add more mappings here
};
```

## Troubleshooting

### Problem: No styles are being applied

**Solution**:
- Ensure your template document is open before running the script
- Check that your template has defined paragraph styles
- Verify style names match or are similar to Word styles

### Problem: Text overflows or doesn't fit

**Solution**:
- Check your template's margin settings
- Adjust font sizes in your paragraph styles
- The script auto-creates pages, but verify page size matches your needs

### Problem: Tables look wrong

**Solution**:
- The script converts tables to tabbed text by default
- Change `convertTablesTo` option to `ConvertTablesOptions.UNFORMATTED_TABLE`
- Format tables manually after import

### Problem: Images don't import

**Solution**:
- InDesign has limited support for embedded Word images
- Extract images from Word and place them manually in InDesign
- Use **File > Place** to add images after text import

### Problem: Script won't run

**Solution**:
- Verify the script is saved with `.jsx` extension
- Check that you have write permissions in the Scripts folder
- Restart InDesign after installing the script
- Look for error messages in the JavaScript console

## Advanced Features

### Auto-Flow Text

The script automatically creates new pages when imported text overflows the first page. It:
- Links text frames automatically
- Maintains consistent margins across pages
- Has a safety limit of 1000 pages to prevent runaway processes

### Style Inheritance

Copied template styles maintain:
- Font family and size
- Leading and tracking
- Colors and fills
- Paragraph spacing
- Indentation
- Justification

### Color Preservation

The script copies color swatches from the template, ensuring:
- Consistent brand colors
- Proper color space (CMYK/RGB)
- Named colors for easy editing

## Compatibility

- **Adobe InDesign**: CC 2015 and later (tested up to 2026)
- **Word Formats**: .doc, .docx, .rtf
- **Operating Systems**: macOS and Windows

## Workflow Tips

1. **Standardize Your Word Styles**: Use consistent style names in Word documents
2. **Clean Up Before Import**: Remove manual formatting in Word for better results
3. **Save Template**: Keep a master template with all your styles
4. **Batch Processing**: Run the script multiple times for multiple documents
5. **Review and Refine**: Always review imported content and adjust as needed

## Limitations

- **Tables**: Complex table formatting may not transfer perfectly
- **Images**: Embedded images have limited support; manual placement recommended
- **Track Changes**: Word's tracked changes are not preserved
- **Comments**: Word comments are not imported
- **Forms**: Form fields and controls are not supported

## Version History

- **v1.1** (2025-11-06): InDesign 2026 compatibility fix
  - Fixed document creation method for InDesign 2026
  - Updated API call for app.documents.add()
  - Verified compatibility with InDesign CC 2015-2026

- **v1.0** (2025-11-06): Initial release
  - Word document import
  - Automatic style mapping
  - Auto-flow text
  - Template property inheritance

## Support

For issues, questions, or feature requests, please refer to the script comments or modify the code to suit your specific needs.

## License

This script is provided as-is for use with Adobe InDesign. Modify and distribute freely.
