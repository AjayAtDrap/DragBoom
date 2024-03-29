import React, { useEffect } from "react";
import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import "../styles/main.css";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const GrapesEditor = () => {
  const projectID = "1";
  const nav = useNavigate();
  const projectEndpoint = `http://localhost:3001/api/projects/${projectID}`;

  useEffect(() => {
    const editor = grapesjs.init({
      container: "#gjs",
      fromElement: true,
      height: "100vh",
      width: "auto",
      panels: { defaults: [] },

      storageManager: {
        type: "remote",
        stepsBeforeSave: 3,
        options: {
          remote: {
            urlLoad: projectEndpoint,
            urlStore: projectEndpoint,
            // The `remote` storage uses the POST method when stores data but
            // the json-server API requires PATCH.
            fetchOptions: (opts) =>
              opts.method === "POST" ? { method: "PATCH" } : {},
            // As the API stores projects in this format `{id: 1, data: projectData }`,
            // we have to properly update the body before the store and extract the
            // project data from the response result.
            onStore: (data) => ({ id: projectID, data }),
            onLoad: (result) => result.data,
          },
        },
      },
      blockManager: {
        appendTo: "#blocks",
        openBlocks: false,
      },
      layerManager: {
        appendTo: ".layers-container",
      },
      panels: {
        defaults: [
          {
            id: "layers",
            el: ".panel__right",
            resizable: {
              maxDim: 750,
              minDim: 400,
              tc: 0,
              cl: 1,
              cr: 0,
              bc: 0,
              keyWidth: "flex-basis",
            },
          },
        ],
      },
      panels: {
        defaults: [
          // ...
          {
            id: "panel-switcher",
            el: ".panel__switcher",
            buttons: [
              {
                id: "show-layers",
                active: true,
                label: '<i class="bi bi-layers-fill"></i>',
                command: "show-layers",
                // Once activated disable the possibility to turn it off
                togglable: false,
              },
              {
                id: "show-style",
                active: true,
                label: '<i class="bi bi-filetype-css"></i>',
                command: "show-styles",
                togglable: false,
              },
              {
                id: "show-traits",
                active: true,
                label: "Traits",
                command: "show-traits",
                togglable: false,
              },
            ],
          },
        ],
      },

      selectorManager: {
        appendTo: ".styles-container",
      },
      styleManager: {
        appendTo: ".styles-container",
        sectors: [
          {
            name: "Dimension",
            open: false,
            // Use built-in properties
            buildProps: ["width", "min-height", "padding"],
            // Use `properties` to define/override single property
            properties: [
              {
                // Type of the input,
                // options: integer | radio | select | color | slider | file | composite | stack
                type: "integer",
                name: "The width", // Label for the property
                property: "width", // CSS property (if buildProps contains it will be extended)
                units: ["px", "%"], // Units, available only for 'integer' types
                defaults: "auto", // Default value
                min: 0, // Min value, available only for 'integer' types
              },
            ],
          },
          {
            name: "Extra",
            open: false,
            buildProps: ["background-color", "box-shadow", "custom-prop"],
            properties: [
              {
                id: "custom-prop",
                name: "Custom Label",
                property: "font-size",
                type: "select",
                defaults: "32px",
                // List of options, available only for 'select' and 'radio'  types
                options: [
                  { value: "12px", name: "Tiny" },
                  { value: "18px", name: "Medium" },
                  { value: "32px", name: "Big" },
                ],
              },
            ],
          },
        ],
      },
    });

    // Rest of your block manager and other configurations...

    editor.BlockManager.add("text-category", {
      label: "Text Block",
      category: "Basic Blocks",
      content: '<div data-gjs-type="text">Insert your text here</div>',
    });

    editor.BlockManager.add("image-category", {
      label: "Image Block",
      category: "Media Blocks",
      content: '<img src="your-image-source.jpg" alt="Image description">',
      activate: true,
      select: true,
    });

    editor.BlockManager.add("video-category", {
      label: "Video Block",
      category: "Media Blocks",
      content: '<video src="your-video-source.mp4" controls></video>',
      activate: true,
      select: true,
    });

    editor.BlockManager.add("button-category", {
      label: "Button Block",
      category: "UI Elements",
      content: "<button>Click me</button>",
    });

    editor.BlockManager.add("list-category", {
      label: "List Block",
      category: "Basic Blocks",
      content: "<ul><li>Item 1</li><li>Item 2</li></ul>",
    });

    editor.BlockManager.add("quote-category", {
      label: "Quote Block",
      category: "Text Blocks",
      content: "<blockquote>Your quote here</blockquote>",
    });

    editor.BlockManager.add("form-category", {
      label: "Form Block",
      category: "UI Elements",
      content:
        '<form action="/submit" method="post"><label for="input">Input:</label><input type="text" id="input" name="input"><input type="submit" value="Submit"></form>',
    });

    editor.BlockManager.add("heading-category", {
      label: "Heading Block",
      category: "Text Blocks",
      content: "<h1>Your Heading</h1>",
    });

    editor.BlockManager.add("paragraph-category", {
      label: "Paragraph Block",
      category: "Text Blocks",
      content: "<p>Your paragraph text goes here.</p>",
    });

    editor.BlockManager.add("link-category", {
      label: "Link Block",
      category: "UI Elements",
      content:
        '<a href="https://example.com" target="_blank">Visit Example</a>',
    });

    editor.BlockManager.add("image-gallery-category", {
      label: "Image Gallery Block",
      category: "Media Blocks",
      content:
        '<div class="image-gallery"><img src="image1.jpg" alt="Image 1"><img src="image2.jpg" alt="Image 2"></div>',
    });

    editor.Panels.addPanel({
      id: "panel-top",
      el: ".panel__top",
    });
    editor.Panels.addPanel({
      id: "basic-actions",
      el: ".panel__basic-actions",
      buttons: [
        {
          id: "visibility",
          active: true, // active by default
          className: "btn-toggle-borders",
          label: '<i class="bi bi-border-all"></i>',
          command: "sw-visibility", // Built-in command
        },
        {
          id: "export",
          className: "btn-open-export",
          label: '<i class="bi bi-file-code"></i>',
          command: "export-template",
          context: "export-template", // For grouping context of buttons from the same panel
        },
        {
          id: "show-json",
          className: "btn-show-json",
          label: '<i class="bi bi-filetype-json"></i>',
          context: "show-json",
          command(editor) {
            editor.Modal.setTitle("Components JSON")
              .setContent(
                `<textarea style="width:100%; height: 250px;">
              ${JSON.stringify(editor.getComponents())}
            </textarea>`
              )
              .open();
          },
        },
      ],
    });
    editor.Commands.add("show-layers", {
      getRowEl(editor) {
        return editor.getContainer().closest(".editor-row");
      },
      getLayersEl(row) {
        return row.querySelector(".layers-container");
      },

      run(editor, sender) {
        const lmEl = this.getLayersEl(this.getRowEl(editor));
        lmEl.style.display = "";
      },
      stop(editor, sender) {
        const lmEl = this.getLayersEl(this.getRowEl(editor));
        lmEl.style.display = "none";
      },
    });
    editor.Commands.add("show-styles", {
      getRowEl(editor) {
        return editor.getContainer().closest(".editor-row");
      },
      getStyleEl(row) {
        return row.querySelector(".styles-container");
      },

      run(editor, sender) {
        const smEl = this.getStyleEl(this.getRowEl(editor));
        smEl.style.display = "";
      },
      stop(editor, sender) {
        const smEl = this.getStyleEl(this.getRowEl(editor));
        smEl.style.display = "none";
      },
    });
    editor.Commands.add("show-traits", {
      getTraitsEl(editor) {
        const row = editor.getContainer().closest(".editor-row");
        return row.querySelector(".traits-container");
      },
      run(editor, sender) {
        this.getTraitsEl(editor).style.display = "";
      },
      stop(editor, sender) {
        this.getTraitsEl(editor).style.display = "none";
      },
    });
  }, []);

  return (
    <>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 panel__top">
            <div className="panel__basic-actions"></div>
            <div className="fw-bold text-warning">DragBoom</div>

            <i class="bi bi-box-arrow-right"></i>

            <div className="panel__switcher"></div>
          </div>
        </div>

        <div className="row no-gutters">
          <div className="bg-dark vh-100 col-md-2 d-none d-sm-block p-0">
            <div id="blocks"></div>
          </div>

          <div className="editor-row col-md-10 p-0">
            <div id="gjs" className="editor-canvas container-fluid">
              <h1>Boom Guys, Welcome to our Editor </h1>
            </div>
            <div className="panel__right vh-100 d-none d-sm-block">
              <div className="layers-container"></div>
              <div className="styles-container"></div>
              <div className="traits-container"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GrapesEditor;
