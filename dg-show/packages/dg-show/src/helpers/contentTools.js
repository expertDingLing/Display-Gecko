export const initContentTools = () => {
  const ContentTools = window.ContentTools;
  const ContentEdit = window.ContentEdit;
  ContentTools.StylePalette.add([
    new ContentTools.Style("By-line", "article__by-line", ["p"]),
    new ContentTools.Style("Caption", "article__caption", ["p"]),
    new ContentTools.Style("Example", "example", ["pre"]),
    new ContentTools.Style("Example + Good", "example--good", ["pre"]),
    new ContentTools.Style("Example + Bad", "example--bad", ["pre"])
  ]);
  const editor = ContentTools.EditorApp.get();
  editor.init("*[data-editable], [data-fixture]", "data-name");

  /* specify the supported HTML editor functions */
  const FIXTURE_TOOLS = [["undo", "redo", "remove"]];
  ContentEdit.Root.get().bind("focus", function(element) {
    let tools;
    if (element.isFixed()) {
      tools = FIXTURE_TOOLS;
    } else {
      tools = ContentTools.DEFAULT_TOOLS;
    }
    if (editor.toolbox().tools() !== tools) {
      return editor.toolbox().tools(tools);
    }
  });

  return editor;
};
