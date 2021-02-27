import { Node } from "tiptap";

export default class Youtube extends Node {
  get name() {
    return "youtube";
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
              tag: "iframe",
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
          class: 'media-container embed'
        },
        [
          "iframe",
          {
            src: this.detechUrl(node.attrs.src),
            frameborder: 0,
            allowfullscreen: "true",
            allow:
              "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            // You can set the width and height here also
          }
        ]
      ]
    };
  }

  detechUrl(data){
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    const match = data.match(regExp);
    const src = match && match[7].length === 11 ? match[7] : false;
    return `https://www.youtube.com/embed/${src}`;
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