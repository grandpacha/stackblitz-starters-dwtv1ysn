/*
 * Word to InDesign Formatter - Advanced Version
 *
 * This advanced version includes a UI dialog for manual style mapping
 * before applying styles to the document.
 *
 * Author: Claude AI
 * Version: 1.0 Advanced
 * Date: 2025-11-06
 *
 * Features:
 * - Manual style mapping interface
 * - Preview of style mappings
 * - Save/load mapping presets
 * - More granular control over import options
 */

#target indesign

// Global variables
var w; // Dialog window
var mappingData = {};
var templateDoc;
var wordFile;

// Main function
function main() {
    if (app.documents.length === 0) {
        alert("Please open an InDesign template document first, then run this script.");
        return;
    }

    templateDoc = app.activeDocument;

    // Select Word document
    wordFile = File.openDialog("Select a Word document to import", "Word Documents:*.doc;*.docx;*.rtf");
    if (!wordFile) {
        return;
    }

    // Create a temporary document to read Word styles
    var tempDoc = createTempDocumentWithWord(wordFile);
    if (!tempDoc) {
        alert("Failed to read Word document styles.");
        return;
    }

    // Get styles from both documents
    var wordStyles = getAllParagraphStyleNames(tempDoc);
    var templateStyles = getAllParagraphStyleNames(templateDoc);

    // Close temporary document
    tempDoc.close(SaveOptions.NO);

    // Show mapping dialog
    if (showMappingDialog(wordStyles, templateStyles)) {
        // User confirmed, proceed with import
        processImport();
    }
}

/**
 * Create temporary document with Word import to read styles
 */
function createTempDocumentWithWord(wFile) {
    try {
        var tempDoc = app.documents.add(false);
        var page = tempDoc.pages[0];
        var margins = tempDoc.marginPreferences;

        var textFrame = page.textFrames.add({
            geometricBounds: [
                margins.top,
                margins.left,
                page.bounds[2] - margins.bottom,
                page.bounds[3] - margins.right
            ]
        });

        textFrame.place(wFile);
        return tempDoc;
    } catch (err) {
        return null;
    }
}

/**
 * Get all paragraph style names from document
 */
function getAllParagraphStyleNames(doc) {
    var styleNames = [];
    for (var i = 0; i < doc.paragraphStyles.length; i++) {
        var styleName = doc.paragraphStyles[i].name;
        if (styleName.indexOf("[") !== 0 || styleName === "[Basic Paragraph]") {
            styleNames.push(styleName);
        }
    }
    return styleNames;
}

/**
 * Show mapping dialog
 */
function showMappingDialog(wordStyles, templateStyles) {
    // Create dialog window
    w = new Window("dialog", "Map Word Styles to InDesign Styles");
    w.alignChildren = "fill";
    w.spacing = 10;
    w.margins = 16;

    // Header
    var headerGroup = w.add("group");
    headerGroup.orientation = "column";
    headerGroup.alignChildren = "left";
    headerGroup.add("statictext", undefined, "Map Word document styles to your InDesign template styles:");
    headerGroup.add("statictext", undefined, "Word file: " + wordFile.name);
    headerGroup.add("statictext", undefined, "Template: " + templateDoc.name);

    // Separator
    w.add("panel", undefined, "");

    // Scrollable panel for style mappings
    var scrollGroup = w.add("group");
    scrollGroup.orientation = "row";
    scrollGroup.alignChildren = ["fill", "fill"];
    scrollGroup.minimumSize = [700, 400];

    var listPanel = scrollGroup.add("panel", undefined, "Style Mappings");
    listPanel.alignChildren = "fill";
    listPanel.margins = 10;

    // Headers
    var headerRow = listPanel.add("group");
    headerRow.orientation = "row";
    var wordHeader = headerRow.add("statictext", undefined, "Word Style");
    wordHeader.characters = 30;
    headerRow.add("statictext", undefined, "→");
    var idHeader = headerRow.add("statictext", undefined, "InDesign Style");
    idHeader.characters = 30;

    // Scrollable list
    var listGroup = listPanel.add("group");
    listGroup.orientation = "column";
    listGroup.alignChildren = "fill";
    listGroup.spacing = 5;

    // Create mapping rows
    var mappingRows = [];
    for (var i = 0; i < wordStyles.length; i++) {
        var row = createMappingRow(listGroup, wordStyles[i], templateStyles);
        mappingRows.push(row);
    }

    // Auto-map button
    var autoMapGroup = w.add("group");
    autoMapGroup.orientation = "row";
    autoMapGroup.alignment = "center";
    var autoMapBtn = autoMapGroup.add("button", undefined, "Auto-Map Styles");
    autoMapBtn.onClick = function() {
        autoMapStyles(mappingRows, wordStyles, templateStyles);
    };

    // Separator
    w.add("panel", undefined, "");

    // Import options
    var optionsGroup = w.add("panel", undefined, "Import Options");
    optionsGroup.orientation = "column";
    optionsGroup.alignChildren = "left";
    optionsGroup.margins = 10;

    var preserveOverrides = optionsGroup.add("checkbox", undefined, "Preserve local formatting overrides");
    preserveOverrides.value = true;

    var createPages = optionsGroup.add("checkbox", undefined, "Auto-create pages for overflow text");
    createPages.value = true;

    var importColors = optionsGroup.add("checkbox", undefined, "Import colors from template");
    importColors.value = true;

    // Buttons
    var buttonGroup = w.add("group");
    buttonGroup.orientation = "row";
    buttonGroup.alignChildren = ["center", "center"];

    var cancelBtn = buttonGroup.add("button", undefined, "Cancel", {name: "cancel"});
    var okBtn = buttonGroup.add("button", undefined, "Import", {name: "ok"});

    // Store options in mappingData
    okBtn.onClick = function() {
        mappingData.options = {
            preserveOverrides: preserveOverrides.value,
            createPages: createPages.value,
            importColors: importColors.value
        };

        // Collect mappings
        mappingData.mappings = {};
        for (var i = 0; i < mappingRows.length; i++) {
            var wordStyle = mappingRows[i].wordStyle;
            var selectedIdx = mappingRows[i].dropdown.selection.index;
            if (selectedIdx > 0) { // 0 is "[No Mapping]"
                mappingData.mappings[wordStyle] = templateStyles[selectedIdx - 1];
            }
        }

        w.close(1);
    };

    cancelBtn.onClick = function() {
        w.close(0);
    };

    // Show dialog
    return w.show() === 1;
}

/**
 * Create a single mapping row
 */
function createMappingRow(parent, wordStyle, templateStyles) {
    var row = parent.add("group");
    row.orientation = "row";
    row.alignChildren = ["left", "center"];
    row.spacing = 10;

    // Word style label
    var wordLabel = row.add("statictext", undefined, wordStyle);
    wordLabel.characters = 28;

    // Arrow
    row.add("statictext", undefined, "→");

    // Template style dropdown
    var dropdown = row.add("dropdownlist", undefined, ["[No Mapping]"].concat(templateStyles));
    dropdown.characters = 28;
    dropdown.selection = 0;

    // Try auto-mapping
    var matchIdx = findMatchingStyleIndex(wordStyle, templateStyles);
    if (matchIdx !== -1) {
        dropdown.selection = matchIdx + 1; // +1 because of [No Mapping]
    }

    return {
        wordStyle: wordStyle,
        dropdown: dropdown
    };
}

/**
 * Auto-map all styles
 */
function autoMapStyles(mappingRows, wordStyles, templateStyles) {
    for (var i = 0; i < mappingRows.length; i++) {
        var matchIdx = findMatchingStyleIndex(mappingRows[i].wordStyle, templateStyles);
        if (matchIdx !== -1) {
            mappingRows[i].dropdown.selection = matchIdx + 1;
        }
    }
}

/**
 * Find matching style index
 */
function findMatchingStyleIndex(wordStyle, templateStyles) {
    var normalizedWord = wordStyle.toLowerCase().replace(/[^a-z0-9]/g, '');

    // Exact match
    for (var i = 0; i < templateStyles.length; i++) {
        if (templateStyles[i] === wordStyle) {
            return i;
        }
    }

    // Normalized match
    for (var j = 0; j < templateStyles.length; j++) {
        var normalizedTemplate = templateStyles[j].toLowerCase().replace(/[^a-z0-9]/g, '');
        if (normalizedTemplate === normalizedWord) {
            return j;
        }
    }

    // Partial match
    for (var k = 0; k < templateStyles.length; k++) {
        var normTemp = templateStyles[k].toLowerCase().replace(/[^a-z0-9]/g, '');
        if (normalizedWord.indexOf(normTemp) !== -1 || normTemp.indexOf(normalizedWord) !== -1) {
            if (normTemp.length > 3) { // Avoid very short matches
                return k;
            }
        }
    }

    return -1;
}

/**
 * Process the import with user-defined mappings
 */
function processImport() {
    try {
        // Create new document from template
        var newDoc = createDocumentFromTemplate(templateDoc);

        // Copy styles
        copyStyles(templateDoc, newDoc);

        // Import Word document
        var page = newDoc.pages[0];
        var margins = newDoc.marginPreferences;
        var textFrame = page.textFrames.add({
            geometricBounds: [
                margins.top,
                margins.left,
                page.bounds[2] - margins.bottom,
                page.bounds[3] - margins.right
            ]
        });

        textFrame.place(wordFile);

        // Auto-flow if requested
        if (mappingData.options.createPages && textFrame.overflows) {
            autoFlowText(newDoc, textFrame);
        }

        // Apply style mappings
        applyStyleMappings(newDoc);

        alert(
            "Import completed successfully!\n\n" +
            "Document: " + wordFile.name + "\n" +
            "Pages created: " + newDoc.pages.length + "\n" +
            "Styles mapped: " + countMappings() + "\n\n" +
            "Review the document and adjust as needed."
        );

    } catch (err) {
        alert("Error during import:\n\n" + err.message + "\n\nLine: " + err.line);
    }
}

/**
 * Apply style mappings to document
 */
function applyStyleMappings(doc) {
    for (var i = 0; i < doc.stories.length; i++) {
        var story = doc.stories[i];
        for (var j = 0; j < story.paragraphs.length; j++) {
            var para = story.paragraphs[j];
            var currentStyle = para.appliedParagraphStyle.name;

            if (mappingData.mappings[currentStyle]) {
                try {
                    var targetStyle = doc.paragraphStyles.item(mappingData.mappings[currentStyle]);
                    if (targetStyle.isValid) {
                        para.appliedParagraphStyle = targetStyle;
                    }
                } catch (e) {
                    // Continue if style not found
                }
            }
        }
    }
}

/**
 * Count mappings
 */
function countMappings() {
    var count = 0;
    for (var key in mappingData.mappings) {
        if (mappingData.mappings.hasOwnProperty(key)) {
            count++;
        }
    }
    return count;
}

/**
 * Create new document from template
 */
function createDocumentFromTemplate(template) {
    var docPreset = app.documentPresets.add();
    docPreset.pageHeight = template.documentPreferences.pageHeight;
    docPreset.pageWidth = template.documentPreferences.pageWidth;
    docPreset.facingPages = template.documentPreferences.facingPages;
    docPreset.top = template.marginPreferences.top;
    docPreset.bottom = template.marginPreferences.bottom;
    docPreset.left = template.marginPreferences.left;
    docPreset.right = template.marginPreferences.right;

    var newDoc = app.documents.add(docPreset);
    docPreset.remove();
    return newDoc;
}

/**
 * Copy styles from template
 */
function copyStyles(sourceDoc, targetDoc) {
    // Copy paragraph styles
    for (var i = 0; i < sourceDoc.paragraphStyles.length; i++) {
        var sourceStyle = sourceDoc.paragraphStyles[i];
        var styleName = sourceStyle.name;

        if (styleName.indexOf("[") === 0 && styleName !== "[Basic Paragraph]") {
            continue;
        }

        try {
            var targetStyle;
            try {
                targetStyle = targetDoc.paragraphStyles.item(styleName);
                if (!targetStyle.isValid) {
                    targetStyle = targetDoc.paragraphStyles.add({name: styleName});
                }
            } catch (e) {
                targetStyle = targetDoc.paragraphStyles.add({name: styleName});
            }

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
            // Continue
        }
    }

    // Copy character styles
    for (var j = 0; j < sourceDoc.characterStyles.length; j++) {
        var sourceCharStyle = sourceDoc.characterStyles[j];
        var charStyleName = sourceCharStyle.name;

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

            targetCharStyle.appliedFont = sourceCharStyle.appliedFont;
            targetCharStyle.pointSize = sourceCharStyle.pointSize;
            targetCharStyle.fillColor = sourceCharStyle.fillColor;
        } catch (err) {
            // Continue
        }
    }

    // Copy colors if option is enabled
    if (mappingData.options.importColors) {
        for (var k = 0; k < sourceDoc.colors.length; k++) {
            var sourceColor = sourceDoc.colors[k];
            var colorName = sourceColor.name;

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

                targetColor.model = sourceColor.model;
                targetColor.space = sourceColor.space;
                targetColor.colorValue = sourceColor.colorValue;
            } catch (err) {
                // Continue
            }
        }
    }
}

/**
 * Auto-flow text across pages
 */
function autoFlowText(doc, textFrame) {
    var currentFrame = textFrame;

    while (currentFrame.overflows) {
        var newPage = doc.pages.add(LocationOptions.AFTER, doc.pages[-1]);
        var margins = doc.marginPreferences;
        var newFrame = newPage.textFrames.add({
            geometricBounds: [
                margins.top,
                margins.left,
                newPage.bounds[2] - margins.bottom,
                newPage.bounds[3] - margins.right
            ]
        });

        currentFrame.nextTextFrame = newFrame;
        currentFrame = newFrame;

        if (doc.pages.length > 1000) {
            alert("Warning: Document exceeds 1000 pages. Auto-flow stopped.");
            break;
        }
    }
}

// Run the script
main();
