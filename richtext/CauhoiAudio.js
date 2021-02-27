import { Node } from "tiptap";

export default class CauhoiAudio extends Node {
  get name() {
    return "cauhoi_audio";
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
              tag: "audio",
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
          class: 'media-container audio'
        },
        [
          "audio",
          {
            controls: true
          },
          [
            'source',
            {
              src: node.attrs.src
            }
          ]
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