/*
 * Word to InDesign Formatter
 *
 * This script imports a Word document into InDesign and applies
 * character and paragraph styles from an InDesign template.
 *
 * Author: Claude AI
 * Version: 1.0
 * Date: 2025-11-06
 *
 * Usage:
 * 1. Open your InDesign template document (or have it open)
 * 2. Run this script from File > Scripts > User
 * 3. Select the Word document to import
 * 4. The script will create a new document and format it using template styles
 */

#target indesign

// Main function
function main() {
    // Check if InDesign is running
    if (app.documents.length === 0) {
        alert("Please open an InDesign template document first, then run this script.");
        return;
    }

    // Get the current template document
    var templateDoc = app.activeDocument;
    var templateStyles = {
        paragraph: getAllParagraphStyles(templateDoc),
        character: getAllCharacterStyles(templateDoc)
    };

    if (templateStyles.paragraph.length === 0) {
        alert("No paragraph styles found in the template. Please ensure your template has defined styles.");
        return;
    }

    // Prompt user to select Word document
    var wordFile = File.openDialog("Select a Word document to import", "Word Documents:*.doc;*.docx;*.rtf");

    if (!wordFile) {
        return; // User cancelled
    }

    // Confirm operation
    var proceed = confirm(
        "This will create a new InDesign document and import:\n\n" +
        "Word file: " + wordFile.name + "\n" +
        "Using styles from: " + templateDoc.name + "\n\n" +
        "Do you want to continue?"
    );

    if (!proceed) {
        return;
    }

    // Start processing
    app.scriptPreferences.userInteractionLevel = UserInteractionLevels.INTERACT_WITH_ALL;

    try {
        // Create new document with template properties
        var newDoc = createDocumentFromTemplate(templateDoc);

        // Import Word document
        var importResult = importWordDocument(newDoc, wordFile, templateStyles);

        if (importResult.success) {
            // Show summary
            alert(
                "Import completed successfully!\n\n" +
                "Document: " + wordFile.name + "\n" +
                "Pages created: " + newDoc.pages.length + "\n" +
                "Styles mapped: " + importResult.stylesMapped + "\n\n" +
                "Review the document and adjust styles as needed."
            );
        } else {
            alert("Import completed with warnings:\n\n" + importResult.message);
        }

    } catch (err) {
        alert("Error during import:\n\n" + err.message + "\n\nLine: " + err.line);
    }
}

/**
 * Get all paragraph styles from a document
 */
function getAllParagraphStyles(doc) {
    var styles = [];
    for (var i = 0; i < doc.paragraphStyles.length; i++) {
        var styleName = doc.paragraphStyles[i].name;
        // Skip the [No Paragraph Style] and [Basic Paragraph]
        if (styleName.indexOf("[") !== 0 || styleName === "[Basic Paragraph]") {
            styles.push({
                name: styleName,
                style: doc.paragraphStyles[i]
            });
        }
    }
    return styles;
}

/**
 * Get all character styles from a document
 */
function getAllCharacterStyles(doc) {
    var styles = [];
    for (var i = 0; i < doc.characterStyles.length; i++) {
        var styleName = doc.characterStyles[i].name;
        // Skip the [None] style
        if (styleName !== "[None]") {
            styles.push({
                name: styleName,
                style: doc.characterStyles[i]
            });
        }
    }
    return styles;
}

/**
 * Create a new document based on template properties
 */
function createDocumentFromTemplate(templateDoc) {
    var docPreset = app.documentPresets.add();

    // Copy template document settings
    docPreset.pageHeight = templateDoc.documentPreferences.pageHeight;
    docPreset.pageWidth = templateDoc.documentPreferences.pageWidth;
    docPreset.facingPages = templateDoc.documentPreferences.facingPages;
    docPreset.top = templateDoc.marginPreferences.top;
    docPreset.bottom = templateDoc.marginPreferences.bottom;
    docPreset.left = templateDoc.marginPreferences.left;
    docPreset.right = templateDoc.marginPreferences.right;

    // Create new document
    var newDoc = app.documents.add(docPreset);

    // Remove the preset (cleanup)
    docPreset.remove();

    // Copy paragraph styles from template
    copyStyles(templateDoc, newDoc);

    return newDoc;
}

/**
 * Copy styles from template to new document
 */
function copyStyles(sourceDoc, targetDoc) {
    // Copy paragraph styles
    for (var i = 0; i < sourceDoc.paragraphStyles.length; i++) {
        var sourceStyle = sourceDoc.paragraphStyles[i];
        var styleName = sourceStyle.name;

        // Skip default styles
        if (styleName.indexOf("[") === 0 && styleName !== "[Basic Paragraph]") {
            continue;
        }

        try {
            // Check if style already exists
            var targetStyle;
            try {
                targetStyle = targetDoc.paragraphStyles.item(styleName);
                if (!targetStyle.isValid) {
                    targetStyle = targetDoc.paragraphStyles.add({name: styleName});
                }
            } catch (e) {
                targetStyle = targetDoc.paragraphStyles.add({name: styleName});
            }

            // Copy style properties
            targetStyle.appliedFont = sourceStyle.appliedFont;
            targetStyle.pointSize = sourceStyle.pointSize;
            targetStyle.leading = sourceStyle.leading;
            targetStyle.tracking = sourceStyle.tracking;
            targetStyle.fillColor = sourceStyle.fillColor;
            targetStyle.justification = sourceStyle.justification;
            targetStyle.spaceBefore = sourceStyle.spaceBefore;
            targetStyle.spaceAfter = sourceStyle.spaceAfter;
            targetStyle.firstLineIndent = sourceStyle.firstLineIndent;
            targetStyle.leftIndent = sourceStyle.leftIndent;
            targetStyle.rightIndent = sourceStyle.rightIndent;
        } catch (err) {
            // Continue if a particular style fails to copy
        }
    }

    // Copy character styles
    for (var j = 0; j < sourceDoc.characterStyles.length; j++) {
        var sourceCharStyle = sourceDoc.characterStyles[j];
        var charStyleName = sourceCharStyle.name;

        // Skip [None] style
        if (charStyleName === "[None]") {
            continue;
        }

        try {
            var targetCharStyle;
            try {
                targetCharStyle = targetDoc.characterStyles.item(charStyleName);
                if (!targetCharStyle.isValid) {
                    targetCharStyle = targetDoc.characterStyles.add({name: charStyleName});
                }
            } catch (e) {
                targetCharStyle = targetDoc.characterStyles.add({name: charStyleName});
            }

            // Copy character style properties
            targetCharStyle.appliedFont = sourceCharStyle.appliedFont;
            targetCharStyle.pointSize = sourceCharStyle.pointSize;
            targetCharStyle.fillColor = sourceCharStyle.fillColor;
        } catch (err) {
            // Continue if a particular style fails to copy
        }
    }

    // Copy colors
    for (var k = 0; k < sourceDoc.colors.length; k++) {
        var sourceColor = sourceDoc.colors[k];
        var colorName = sourceColor.name;

        // Skip default colors
        if (colorName.indexOf("[") === 0) {
            continue;
        }

        try {
            var targetColor;
            try {
                targetColor = targetDoc.colors.item(colorName);
                if (!targetColor.isValid) {
                    targetColor = targetDoc.colors.add({name: colorName});
                }
            } catch (e) {
                targetColor = targetDoc.colors.add({name: colorName});
            }

            // Copy color properties
            targetColor.model = sourceColor.model;
            targetColor.space = sourceColor.space;
            targetColor.colorValue = sourceColor.colorValue;
        } catch (err) {
            // Continue if a particular color fails to copy
        }
    }
}

/**
 * Import Word document and apply styles
 */
function importWordDocument(doc, wordFile, templateStyles) {
    var result = {
        success: false,
        message: "",
        stylesMapped: 0
    };

    // Set import options
    var importOptions = {
        convertPageBreaks: ConvertPageBreaks.COLUMN_BREAK,
        convertTablesTo: ConvertTablesOptions.UNFORMATTED_TABBED_TEXT,
        preserveLocalOverrides: true,
        importStyles: true,
        resolveTextStyleConflict: ResolveStyleConflict.RESOLVE_USING_INDESIGN_STYLE
    };

    try {
        // Get the first page's first text frame or create one
        var page = doc.pages[0];
        var textFrame;

        if (page.textFrames.length > 0) {
            textFrame = page.textFrames[0];
        } else {
            // Create a text frame with margins
            var margins = doc.marginPreferences;
            textFrame = page.textFrames.add({
                geometricBounds: [
                    margins.top,
                    margins.left,
                    page.bounds[2] - margins.bottom,
                    page.bounds[3] - margins.right
                ]
            });
        }

        // Place the Word file
        textFrame.place(wordFile);

        // Auto-flow text to create additional pages if needed
        if (textFrame.overflows) {
            autoFlowText(doc, textFrame);
        }

        // Map and apply styles
        var mappedCount = mapWordStylesToInDesign(doc, templateStyles);

        result.success = true;
        result.stylesMapped = mappedCount;
        result.message = "Successfully imported and formatted document.";

    } catch (err) {
        result.success = false;
        result.message = err.message;
    }

    return result;
}

/**
 * Auto-flow text across pages
 */
function autoFlowText(doc, textFrame) {
    var currentFrame = textFrame;

    while (currentFrame.overflows) {
        // Add new page
        var newPage = doc.pages.add(LocationOptions.AFTER, doc.pages[-1]);

        // Create new text frame on new page
        var margins = doc.marginPreferences;
        var newFrame = newPage.textFrames.add({
            geometricBounds: [
                margins.top,
                margins.left,
                newPage.bounds[2] - margins.bottom,
                newPage.bounds[3] - margins.right
            ]
        });

        // Link frames
        currentFrame.nextTextFrame = newFrame;
        currentFrame = newFrame;

        // Safety check to prevent infinite loop
        if (doc.pages.length > 1000) {
            alert("Warning: Document exceeds 1000 pages. Auto-flow stopped.");
            break;
        }
    }
}

/**
 * Map Word styles to InDesign template styles
 */
function mapWordStylesToInDesign(doc, templateStyles) {
    var mappedCount = 0;
    var styleMap = {};

    // Create a mapping between similar style names
    for (var i = 0; i < doc.paragraphStyles.length; i++) {
        var docStyle = doc.paragraphStyles[i];
        var docStyleName = docStyle.name;

        // Skip default styles
        if (docStyleName.indexOf("[") === 0) {
            continue;
        }

        // Try to find matching template style
        var matchedStyle = findMatchingStyle(docStyleName, templateStyles.paragraph);

        if (matchedStyle) {
            styleMap[docStyleName] = matchedStyle;
            mappedCount++;
        }
    }

    // Apply the mapped styles to all text in the document
    for (var j = 0; j < doc.stories.length; j++) {
        var story = doc.stories[j];

        for (var k = 0; k < story.paragraphs.length; k++) {
            var para = story.paragraphs[k];
            var currentStyleName = para.appliedParagraphStyle.name;

            if (styleMap[currentStyleName]) {
                para.appliedParagraphStyle = styleMap[currentStyleName];
            }
        }
    }

    return mappedCount;
}

/**
 * Find matching style by name (with fuzzy matching)
 */
function findMatchingStyle(styleName, templateStylesList) {
    // Normalize the style name for comparison
    var normalizedName = styleName.toLowerCase().replace(/[^a-z0-9]/g, '');

    // First, try exact match
    for (var i = 0; i < templateStylesList.length; i++) {
        if (templateStylesList[i].name === styleName) {
            return templateStylesList[i].style;
        }
    }

    // Try normalized match
    for (var j = 0; j < templateStylesList.length; j++) {
        var templateNormalized = templateStylesList[j].name.toLowerCase().replace(/[^a-z0-9]/g, '');
        if (templateNormalized === normalizedName) {
            return templateStylesList[j].style;
        }
    }

    // Try partial match (contains)
    for (var k = 0; k < templateStylesList.length; k++) {
        var templateNorm = templateStylesList[k].name.toLowerCase().replace(/[^a-z0-9]/g, '');
        if (normalizedName.indexOf(templateNorm) !== -1 || templateNorm.indexOf(normalizedName) !== -1) {
            return templateStylesList[k].style;
        }
    }

    // Common style mappings
    var commonMappings = {
        'heading1': ['heading 1', 'h1', 'title', 'header 1'],
        'heading2': ['heading 2', 'h2', 'subtitle', 'header 2'],
        'heading3': ['heading 3', 'h3', 'header 3'],
        'heading4': ['heading 4', 'h4', 'header 4'],
        'normal': ['body', 'text', 'paragraph', 'body text'],
        'quote': ['quotation', 'blockquote', 'citation'],
        'caption': ['figure', 'image caption']
    };

    for (var mapping in commonMappings) {
        if (normalizedName.indexOf(mapping) !== -1) {
            for (var m = 0; m < commonMappings[mapping].length; m++) {
                var searchTerm = commonMappings[mapping][m].replace(/[^a-z0-9]/g, '');
                for (var n = 0; n < templateStylesList.length; n++) {
                    var tempStyleNorm = templateStylesList[n].name.toLowerCase().replace(/[^a-z0-9]/g, '');
                    if (tempStyleNorm.indexOf(searchTerm) !== -1) {
                        return templateStylesList[n].style;
                    }
                }
            }
        }
    }

    return null;
}

// Run the script
main();
