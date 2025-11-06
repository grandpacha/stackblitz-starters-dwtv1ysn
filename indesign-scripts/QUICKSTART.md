# Quick Start Guide

Get up and running with the Word to InDesign Formatter in 5 minutes.

## Installation (2 minutes)

### For Mac Users

1. Copy `WordToInDesignFormatter.jsx`
2. Press `Cmd + Shift + G` in Finder
3. Paste this path and press Enter:
   ```
   ~/Library/Preferences/Adobe InDesign/Version [Your Version]/en_US/Scripts/Scripts Panel/
   ```
4. Paste the script file
5. Restart InDesign (if open)

### For Windows Users

1. Copy `WordToInDesignFormatter.jsx`
2. Press `Win + R`
3. Paste this path and press Enter:
   ```
   %APPDATA%\Adobe\InDesign\Version [Your Version]\en_US\Scripts\Scripts Panel\
   ```
4. Paste the script file
5. Restart InDesign (if open)

## First Use (3 minutes)

### Step 1: Prepare Your Template
```
✓ Open InDesign
✓ Create or open your template document
✓ Ensure you have these styles defined:
  - Body Text
  - Heading 1
  - Heading 2
  - Heading 3
  - Quote
  - Caption
```

### Step 2: Run the Script
```
✓ Window > Utilities > Scripts
✓ Expand "User" folder
✓ Double-click "WordToInDesignFormatter.jsx"
```

### Step 3: Select Your Word File
```
✓ Browse to your Word document
✓ Select it and click Open
✓ Click OK on the confirmation dialog
```

### Step 4: Done!
```
✓ New InDesign document is created
✓ Your Word content is imported
✓ Template styles are applied automatically
✓ Review and adjust as needed
```

## Common Scenarios

### Scenario 1: Simple Document
**You have**: A Word doc with basic formatting
**Steps**:
1. Open template with Body Text + Heading 1-3 styles
2. Run script
3. Select Word file
4. Done!

### Scenario 2: Complex Document
**You have**: A Word doc with many custom styles
**Steps**:
1. Use the Advanced version: `WordToInDesignFormatter_Advanced.jsx`
2. This shows a dialog to map styles manually
3. Auto-map first, then adjust
4. Import

### Scenario 3: Repeating Work
**You have**: Multiple similar Word docs to import
**Steps**:
1. Set up your template once with all needed styles
2. Name InDesign styles to match Word styles
3. Run the basic script for each document
4. Styles will auto-map based on names

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Script doesn't appear | Restart InDesign |
| No styles found | Open template document first |
| Styles not matching | Check style names in both documents |
| Text overflow | Script auto-creates pages |
| Script error | Check you have latest InDesign version |

## Tips for Best Results

1. **Consistent Naming**: Use same style names in Word and InDesign
   - Word: "Heading 1" → InDesign: "Heading 1" ✓
   - Word: "Heading 1" → InDesign: "H1" (still works, but not ideal)

2. **Clean Word First**: Remove manual formatting
   - Select All (Ctrl/Cmd + A)
   - Clear formatting
   - Re-apply styles

3. **Test Small**: Try with a short document first
   - 1-2 pages is perfect
   - Verify styles work correctly
   - Then process larger documents

4. **Save Template**: Keep a master template file
   - All your styles defined
   - Proper margins and page setup
   - Reuse for every import

## Next Steps

- Read the full [README.md](README.md) for detailed documentation
- Check [StyleMappingConfig.txt](StyleMappingConfig.txt) for style naming tips
- Try the Advanced version for more control
- Customize the script for your workflow

## Need Help?

Common issues and solutions:

**"Please open an InDesign template document first"**
→ Open your template file before running the script

**"No paragraph styles found in the template"**
→ Create at least one custom paragraph style in your template

**Styles aren't mapping correctly**
→ Check that style names are similar between Word and InDesign

**Text is too small/large**
→ Adjust font sizes in your InDesign template styles

**Images don't import**
→ This is normal. Place images manually after import using File > Place

## Version Comparison

| Feature | Basic | Advanced |
|---------|-------|----------|
| Auto-import Word | ✓ | ✓ |
| Auto-style mapping | ✓ | ✓ |
| Manual style mapping | - | ✓ |
| UI dialog | - | ✓ |
| Import options | - | ✓ |
| Best for | Quick daily use | Complex documents |

Start with the **Basic** version for most work. Use **Advanced** when you need precise control over style mappings.

---

**Ready?** Open InDesign, open your template, and run the script!
