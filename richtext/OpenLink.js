import { Link } from 'tiptap-extensions'
export default class OpenLink extends Link {
  get name() {
    return "link";
  }

  get schema() {
    return {
      attrs: {
        href: {
          default: null,
        },
        target: {
          default: null,
        }
      },
      inclusive: false,
      parseDOM: [
        {
          tag: 'a[href]',
          getAttrs: dom => ({
            href: dom.getAttribute('href'),
            target: dom.getAttribute('target')
          }),
        },
      ],
      toDOM: node => ['a', {
        ...node.attrs,
        target: '__blank',
        href: '/link?continue=' + node.attrs.href,
        rel: 'noopener noreferrer nofollow',
      }, 0],
    }
  }
}