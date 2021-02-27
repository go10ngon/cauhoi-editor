import { Node } from "tiptap";

export default class Image extends Node {
  get name() {
    return "image";
  }

  get schema() {
    return {
      attrs: {
        src: {
          default: null
        }
      },
      group: "block",
      selectable: false,
      parseDOM: [
        {
          tag: "div",
          child:[
            {
              tag: "img",
              getAttrs: dom => ({
                src: dom.getAttribute("src")
              })
            }
          ]
        }
      ],
      toDOM: node => [
        'div',
        {
          class: 'media-container image'
        },
        [
          "img",
          {
            src: node.attrs.src
          }
        ]
      ]
    };
  }

  commands({ type }) {
    return attrs => (state, dispatch) => {
      const { selection } = state;
      const position = selection.$cursor
        ? selection.$cursor.pos
        : selection.$to.pos;
      const node = type.create(attrs);
      const transaction = state.tr.insert(position, node);
      dispatch(transaction);
    };
  }
}