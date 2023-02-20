import { RichTextEditor as MantineRichTextEditor, Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useCallback } from "react";

type Props = {
  content: string | null;
};

export const RichTextEditor = ({ content }: Props) => {
  const editor = useEditor({
    extensions: [StarterKit, Link],
    content,
    onCreate: () => focus(),
  });

  const focus = useCallback(() => {
    const textarea = document.getElementsByClassName("ProseMirror")[0] as
      | HTMLDivElement
      | undefined;
    if (textarea == undefined) return;
    if (textarea.className.includes("ProseMirror-focused")) return;

    textarea.focus();
  }, []);

  // 空白の部分をクリックしてもfocusされないため、無理やりfocus
  const handleClick = useCallback(
    (e: any) => {
      if (typeof e.target?.className !== "string") return;
      if (!e.target.className.includes("mantine-RichTextEditor-root")) return;

      focus();
    },
    [focus]
  );

  return (
    <MantineRichTextEditor editor={editor} mih={450} onClick={handleClick}>
      <MantineRichTextEditor.Toolbar sticky>
        <MantineRichTextEditor.ControlsGroup>
          <MantineRichTextEditor.Bold />
          <MantineRichTextEditor.Italic />
          <MantineRichTextEditor.Strikethrough />
          <MantineRichTextEditor.ClearFormatting />
          <MantineRichTextEditor.Code />
        </MantineRichTextEditor.ControlsGroup>

        <MantineRichTextEditor.ControlsGroup>
          <MantineRichTextEditor.H1 />
          <MantineRichTextEditor.H2 />
          <MantineRichTextEditor.H3 />
          <MantineRichTextEditor.H4 />
        </MantineRichTextEditor.ControlsGroup>

        <MantineRichTextEditor.ControlsGroup>
          <MantineRichTextEditor.Blockquote />
          <MantineRichTextEditor.Hr />
          <MantineRichTextEditor.BulletList />
          <MantineRichTextEditor.OrderedList />
        </MantineRichTextEditor.ControlsGroup>

        <MantineRichTextEditor.ControlsGroup>
          <MantineRichTextEditor.Link />
          <MantineRichTextEditor.Unlink />
        </MantineRichTextEditor.ControlsGroup>
      </MantineRichTextEditor.Toolbar>

      <MantineRichTextEditor.Content />
    </MantineRichTextEditor>
  );
};
