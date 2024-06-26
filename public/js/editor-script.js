document.addEventListener("DOMContentLoaded", function () {
    const htmlCode = document.getElementById("html-code");

    const cssCode = document.getElementById("css-code");
    const jsCode = document.getElementById("js-code");
    const output = document.getElementById("editor-output");

    function trimLeadingWhitespace(str) {
        return str.replace(/^\s+/gm, "");
    }

    // console.log(htmlCode);
    var trimmedHTML = trimLeadingWhitespace(htmlCode.value);
    var trimmedCSS = trimLeadingWhitespace(cssCode.value);
    var trimmedJS = trimLeadingWhitespace(jsCode.value);

    var editorHTML = ace.edit("editorHTML");
    editorHTML.setValue(trimmedHTML, -1);
    editorHTML.setTheme("ace/theme/monokai");
    editorHTML.session.setMode("ace/mode/html");
    editorHTML.setOption("wrap", true);

    var editorCSS = ace.edit("editorCSS");
    editorCSS.setValue(trimmedCSS, -1);
    editorCSS.setTheme("ace/theme/monokai");
    editorCSS.session.setMode("ace/mode/css");
    editorCSS.setOption("wrap", true);

    var editorJS = ace.edit("editorJS");
    editorJS.setValue(trimmedJS, -1);
    editorJS.setTheme("ace/theme/monokai");
    editorJS.session.setMode("ace/mode/javascript");
    editorJS.setOption("wrap", true);

    function run() {
        htmlCode.value = editorHTML.getValue();
        cssCode.value = editorCSS.getValue();
        jsCode.value = editorJS.getValue();

        // localStorage.setItem("html_code", htmlCode.value);
        // localStorage.setItem("css_code", cssCode.value);
        // localStorage.setItem("js_code", jsCode.value);

        // const htmlContent = localStorage.getItem("html_code");
        // const cssContent = `<link href=" https://cdn.jsdelivr.net/npm/reset-css@5.0.2/reset.min.css " rel="stylesheet"> <style>${localStorage.getItem(
        //     "css_code"
        // )}</style>`;
        // const jsContent = `<script>(function(){${localStorage.getItem(
        //     "js_code"
        // )}})();</script>`;
        // const fullHtmlContent = `<!DOCTYPE html><html><head>${cssContent}</head><body>${htmlContent}${jsContent}</body></html>`;

        const htmlContent = htmlCode.value;
        const cssContent = `<link href=" https://cdn.jsdelivr.net/npm/reset-css@5.0.2/reset.min.css " rel="stylesheet"> <style>${cssCode.value}</style>`;
        const jsContent = `<script>(function(){${jsCode.value}})();</script>`;
        const fullHtmlContent = `<!DOCTYPE html><html><head>${cssContent}</head><body>${htmlContent}${jsContent}</body></html>`;

        // output.contentDocument.open();
        // output.contentDocument.write(cssContent + htmlContent + jsContent);
        // output.contentDocument.close();

        output.contentDocument.open();
        output.contentDocument.writeln(fullHtmlContent);
        output.contentDocument.close();
    }

    let timeoutId;

    // htmlCode.addEventListener("keyup", waitOneSec);

    // cssCode.addEventListener("keyup", waitOneSec);
    // jsCode.addEventListener("keyup", waitOneSec);
    // editor.addEventListener("keyup", waitOneSec);
    editorHTML.session.on("change", waitOneSec);
    editorCSS.session.on("change", waitOneSec);
    editorJS.session.on("change", waitOneSec);

    function waitOneSec() {
        // Clear any existing timeout
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        // Set a new timeout to call the run function after 1 second
        timeoutId = setTimeout(run, 800);
    }

    // Wait for the iframe to load before running the code
    output.onload = run;

    // Set textarea values from localStorage
    // htmlCode.value = localStorage.getItem("html_code");
    // cssCode.value = localStorage.getItem("css_code");
    // jsCode.value = localStorage.getItem("js_code");

    run(); // Run initially
});
