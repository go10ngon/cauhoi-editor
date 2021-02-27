<template>
  <div
    class="c-richtext"
    :class="{ focus: isFocus }"
    @click="focus"
    ref="editor"
  >
    <!-- CONTENT for POST -->
    <div class="c-richtext-controls">
      <editor-menu-bar :editor="editor">
        <div slot-scope="{ commands, isActive, getMarkAttrs }">
          <div>
            <el-button
              :class="{ active: isActive.bold() }"
              @click="commands.bold"
              size="mini"
              v-if="tools.includes('bold')"
            >
              <awesome icon="bold" />
            </el-button>
            <el-button
              :class="{ active: isActive.italic() }"
              @click="commands.italic"
              size="mini"
              v-if="tools.includes('italic')"
            >
              <awesome icon="italic" />
            </el-button>
            <el-button
              :class="{ active: isActive.underline() }"
              @click="commands.underline"
              size="mini"
              v-if="tools.includes('underline')"
            >
              <awesome icon="underline" />
            </el-button>
            <el-button
              :class="{ active: isActive.strike() }"
              @click="commands.strike"
              size="mini"
              v-if="tools.includes('strike')"
            >
              <awesome icon="strikethrough" />
            </el-button>
            <el-dropdown
              @command="
                (control) => {
                  control();
                }
              "
              trigger="click"
              v-if="tools.includes('heading')"
            >
              <el-button size="mini">
                Heading
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  :class="{ active: isActive.heading({ level: 1 }) }"
                  :command="
                    () => {
                      commands.heading({ level: 1 });
                    }
                  "
                >
                  <h1>Heading 1</h1>
                </el-dropdown-item>
                <el-dropdown-item
                  :class="{ active: isActive.heading({ level: 2 }) }"
                  :command="
                    () => {
                      commands.heading({ level: 2 });
                    }
                  "
                >
                  <h2>Heading 2</h2>
                </el-dropdown-item>
                <el-dropdown-item
                  :class="{ active: isActive.heading({ level: 3 }) }"
                  :command="
                    () => {
                      commands.heading({ level: 3 });
                    }
                  "
                >
                  <h3>Heading 3</h3>
                </el-dropdown-item>
                <el-dropdown-item
                  :class="{ active: isActive.heading({ level: 4 }) }"
                  :command="
                    () => {
                      commands.heading({ level: 4 });
                    }
                  "
                >
                  <h4>Heading 4</h4>
                </el-dropdown-item>
                <el-dropdown-item
                  :class="{ active: isActive.heading({ level: 5 }) }"
                  :command="
                    () => {
                      commands.heading({ level: 5 });
                    }
                  "
                >
                  <h5>Heading 5</h5>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-button
              :class="{ active: isActive.bullet_list() }"
              @click="commands.bullet_list"
              size="mini"
              v-if="tools.includes('bullet_list')"
            >
              <awesome icon="list" />
            </el-button>
            <el-button
              :class="{ active: isActive.ordered_list() }"
              @click="commands.ordered_list"
              size="mini"
              v-if="tools.includes('ordered_list')"
            >
              <awesome icon="list-ol" />
            </el-button>
            <el-button
              :class="{ active: isActive.table() }"
              @click="
                commands.createTable({
                  rowsCount: 3,
                  colsCount: 3,
                  withHeaderRow: false,
                })
              "
              size="mini"
              v-if="tools.includes('table')"
            >
              <awesome icon="table" />
            </el-button>
            <!-- <el-button
            :class="{active: isActive.collaboration()}"
            @click="commands.collaboration"
            size="mini"
          >
						<awesome icon="square" />
					</el-button> -->
            <el-button
              :class="{ active: isActive.blockquote() }"
              @click="commands.blockquote"
              size="mini"
              v-if="tools.includes('blockquote')"
            >
              <awesome icon="quote-left" />
            </el-button>
            <el-button
              :class="{ active: isActive.code() }"
              @click="commands.code"
              size="mini"
              v-if="tools.includes('code')"
            >
              <awesome icon="code" />
            </el-button>
            <el-button
              :class="{ active: isActive.code_block() }"
              @click="commands.code_block"
              size="mini"
              v-if="tools.includes('code_block')"
            >
              <awesome icon="highlighter" />
            </el-button>
            <el-dropdown
              @command="
                (control) => {
                  control();
                }
              "
              trigger="click"
              v-if="tools.includes('video')"
            >
              <el-button size="mini">
                <awesome icon="video" />
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  :class="{ active: isActive.youtube() }"
                  :command="
                    () => {
                      openControl({
                        commands: commands.youtube,
                        name: 'youtube',
                      });
                    }
                  "
                  ><awesome :icon="['fab', 'youtube']" color="#ea0000" />
                  Youtube</el-dropdown-item
                >
                <el-dropdown-item
                  :class="{ active: isActive.cauhoi_video() }"
                  :command="
                    () => {
                      openControl({
                        commands: commands.cauhoi_video,
                        name: 'cauhoi_video',
                        upload: false,
                      });
                    }
                  "
                  ><awesome icon="link" color="#67c23a" /> Liên
                  kết/Upload</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
            <el-dropdown
              @command="
                (control) => {
                  control();
                }
              "
              trigger="click"
              v-if="tools.includes('audio')"
            >
              <el-button size="mini">
                <awesome icon="file-audio" />
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  :class="{ active: isActive.cauhoi_audio() }"
                  :command="
                    () => {
                      openControl({
                        commands: commands.cauhoi_audio,
                        name: 'cauhoi_audio',
                        upload: false,
                      });
                    }
                  "
                  ><awesome icon="link" color="#67c23a" /> Liên
                  kết/Upload</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
            <el-button
              :class="{ active: isActive.image() }"
              @click="
                openControl({
                  commands: commands.image,
                  name: 'image',
                  upload: true,
                })
              "
              size="mini"
              v-if="tools.includes('image')"
            >
              <awesome icon="image" />
            </el-button>
            <el-button
              :class="{ active: isActive.link() }"
              @click="
                openControl({
                  commands: commands.link,
                  name: 'link',
                  attrs: getMarkAttrs('link'),
                })
              "
              size="mini"
              v-if="tools.includes('link')"
            >
              <awesome icon="link" />
            </el-button>
            <el-button @click="commands.undo" size="mini" v-if="tools.includes('undo')">
              <awesome icon="undo" />
            </el-button>
            <el-button @click="commands.redo" size="mini" v-if="tools.includes('redo')">
              <awesome icon="redo" />
            </el-button>
          </div>

          <!-- For table -->
          <div v-if="isActive.table()">
            <el-button @click="commands.deleteTable" size="mini">
              Xóa bảng
            </el-button>
            <el-button @click="commands.addColumnBefore" size="mini">
              Thêm col trước
            </el-button>
            <el-button @click="commands.addColumnAfter" size="mini">
              Thêm col sau
            </el-button>
            <el-button @click="commands.deleteColumn" size="mini">
              Xóa column
            </el-button>
            <el-button @click="commands.addRowBefore" size="mini">
              Thêm row trước
            </el-button>
            <el-button @click="commands.addRowAfter" size="mini">
              Thêm row sau
            </el-button>
            <el-button @click="commands.deleteRow" size="mini">
              Xóa row
            </el-button>
            <el-button @click="commands.toggleCellMerge" size="mini">
              Merge cell
            </el-button>
          </div>
        </div>
      </editor-menu-bar>
    </div>
    <!-- Cover controls -->
    <div
      class="c-richtext-controls-drawer"
      v-if="
        controls.cover === 'youtube' ||
        controls.cover === 'image' ||
        controls.cover === 'cauhoi_video' ||
        controls.cover === 'cauhoi_audio'
      "
    >
      <div>
        <div class="drawer-url">
          <el-input
            v-model="controls.data"
            :placeholder="$t('components.editor.input_url')"
            size="mini"
          />
          <el-button
            size="mini"
            @click="openMedia"
            class="float-right"
            round
            icon="el-icon-upload"
            type="success"
            v-if="controls.upload"
            circle
          />
          <el-button
            size="mini"
            @click="addNode"
            class="float-right"
            round
            :icon="controls.data ? 'el-icon-plus' : 'el-icon-close'"
            :type="controls.data ? 'success' : 'danger'"
            circle
          />
        </div>
      </div>
    </div>

    <div class="c-richtext-controls-drawer" v-if="controls.cover === 'link'">
      <div>
        <div class="drawer-url">
          <el-input
            v-model="controls.data"
            :placeholder="$t('components.editor.input_url')"
            size="mini"
          />
          <el-button
            size="mini"
            @click="addNode"
            class="float-right"
            round
            icon="el-icon-plus"
            type="success"
            :disabled="!controls.data"
            circle
          />
          <el-button
            size="mini"
            @click="
              () => {
                controls.data = '';
                addNode();
              }
            "
            class="float-right"
            round
            icon="el-icon-delete"
            type="danger"
            circle
          />
          <el-button
            size="mini"
            @click="clearControls"
            class="float-right"
            round
            icon="el-icon-close"
            type="danger"
            circle
          />
        </div>
      </div>
    </div>

    <div class="c-richtext-richtext" ref="richtext">
      <editor-content
        :editor="editor"
        class="c-richtext-content tiptap-content card"
      />
    </div>
    <!-- 
      <div class="c-richtext-controls-drawer" v-if="controls.cover === 'image'">
        <el-input v-model="controls.data" placeholder="locale.input_url" />
        <el-button fab dark color="indigo" small @click="addNode" class="float-right">Add</el-button>
    </div>-->
  </div>
</template>

<style lang="scss">
.c-richtext {
  position: relative;
  outline: 0;

  // Controls
  .c-richtext-controls {
    position: sticky;
    top: 0px;
    z-index: 2;
    > div {
      width: 100%;
      background-color: var(--bg-secondary);
      z-index: 2;
      word-spacing: 0;
      box-sizing: border-box;
      padding: 8px 0;
      > div {
        white-space: nowrap;
        overflow: auto;
        padding: 0 15px;
      }
    }

    .el-button {
      margin: 0 0 3px 0;
      padding: 4px 6px;
      background-color: var(--bg-secondary);
      border-color: var(--border-secondary);
      color: var(--text-secondary);

      &.active {
        color: var(--text-main) !important;
        border-color: var(--text-main);
        // background-color: #fff2ec !important;
      }
    }
  }

  // Drawer
  // Cover
  .c-richtext-controls-drawer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;

    > div {
      margin-left: -6px;
      margin-right: -6px;
      height: 100%;
      padding-top: 55px;
      background-color: var(--bg-overlay);

      .drawer-url {
        display: flex;
        max-width: 90%;
        width: 400px;
        margin: 0 auto;
        position: sticky;
        top: 170px;
        padding: 15px;
        background-color: var(--bg-secondary);
        border-radius: 5px;
        border: 1px solid var(--border-secondary);
        .el-button {
          margin-left: 10px;
        }
      }
    }
  }

  .c-richtext-content {
    font-size: 14px;

    // Placeholder of content
    p.is-empty:first-child::before {
      content: attr(data-empty-text);
      float: left;
      color: #aaa;
      pointer-events: none;
      height: 0;
    }

    div[contenteditable="true"] {
      min-height: 300px;
    }
  }
}
</style>

<script>
import javascript from "highlight.js/lib/languages/javascript";
import csharp from "highlight.js/lib/languages/csharp";
import java from "highlight.js/lib/languages/java";
import python from "highlight.js/lib/languages/python";
import php from "highlight.js/lib/languages/php";
import scss from "highlight.js/lib/languages/scss";
import json from "highlight.js/lib/languages/json";
import { Editor, EditorMenuBar, EditorContent } from "tiptap";
import {
  Placeholder,
  Bold,
  Italic,
  Underline,
  History,
  CodeBlock,
  Code,
  Blockquote,
  Heading,
  TrailingNode,
  Strike,
  CodeBlockHighlight,
  OrderedList,
  BulletList,
  ListItem,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  // Collaboration
} from "tiptap-extensions";
import Youtube from "./Youtube.js";
import Image from "./Image.js";
import CauhoiVideo from "./CauhoiVideo.js";
import CauhoiAudio from "./CauhoiAudio.js";
import OpenLink from "./OpenLink.js";

export default {
  props: ["value", "commands"],
  components: {
    EditorMenuBar,
    EditorContent,
  },

  data() {
    return {
      isFocus: false,
      isUpdating: false,
      editor: new Editor({
        extensions: [
          new Bold(),
          new Italic(),
          new Underline(),
          new History(),
          new CodeBlock(),
          new Code(),
          new Blockquote(),
          new Heading({ levels: [1, 2, 3, 4, 5] }),
          new Strike(),
          new Placeholder({
            emptyNodeClass: "is-empty",
            emptyNodeText: this.$t(
              "components.editor.page_content_placeholder"
            ),
            showOnlyWhenEditable: true,
          }),
          new OpenLink(),

          // Custom more
          new Youtube(),
          new Image(),
          new CauhoiVideo(),
          new CauhoiAudio(),
          new TrailingNode({
            node: "paragraph",
            notAfter: ["paragraph"],
          }),

          // highlight
          new CodeBlockHighlight({
            languages: {
              javascript,
              csharp,
              java,
              python,
              scss,
              php,
              json,
            },
          }),
          new BulletList(),
          new OrderedList(),
          new ListItem(),
          new Table({
            resizable: true,
          }),
          new TableHeader(),
          new TableCell(),
          new TableRow(),
          // new Collaboration({
          //   // the initial version we start with
          //   // version is an integer which is incremented with every change
          //   version,
          //   // debounce changes so we can save some requests
          //   debounce: 250,
          //   // onSendable is called whenever there are changed we have to send to our server
          //   onSendable: ({ sendable }) => {
          //     this.socket.emit('update', sendable)
          //   },
          // }),
        ],
        content: this.value,
        onUpdate: ({ getJSON }) => {
          const state = getJSON();

          if (
            state.content.length > 1 &&
            state.content[0].type === "paragraph" &&
            !state.content[0].content
          ) {
            state.content.splice(0, 1);
          }

          this.$emit("input", state);
          this.$emit("change");
          this.isUpdating = true;
        },
      }),
      controls: {
        cover: "",
        data: "",
        upload: true,
        cmd: null,
      },
    };
  },

  watch: {
    value(val) {
      if (!this.isUpdating) {
        this.editor.setContent(val);
      }

      this.isUpdating = false;
    },
  },

  computed: {
    tools(){
      return this.commands || [];
    }
  },

  methods: {
    /**
     * Add control
     */
    openControl({ commands, name, attrs, upload }) {
      if (this.controls.cover === name) {
        this.controls.cover = "";
        this.controls.cmd = null;
        this.controls.upload = true;
      } else {
        this.controls.cover = name;
        this.controls.cmd = commands;
        this.controls.upload = upload;

        if (attrs) {
          switch (this.controls.cover) {
            case "link":
              this.controls.data = attrs.href;
              break;
            default:
              this.controls.data = attrs.src;
          }
        } else {
          this.controls.data = "";
        }
      }
    },

    /**
     * Event when click on button upload
     */
    openMedia(name) {
      // Open media file - custom here
    },

    /**
     * Add node
     */
    addNode() {
      let { cmd, data } = this.controls;

      if (data) {
        let dt = {};
        switch (this.controls.cover) {
          case "link":
            dt = { href: data, target: "_blank", ref: "" };
            break;
          default:
            dt = { src: data };
        }

        cmd(dt);
      } else {
        switch (this.controls.cover) {
          case "link":
            cmd({ href: null });
        }
      }

      this.clearControls();
    },

    /**
     * Clear controls
     */
    clearControls() {
      this.controls.data = "";
      this.controls.cover = "";
    },

    /**
     * Check if is focus
     */
    focus() {
      this.isFocus = true;
      this.$emit("focus");
    },

    /**
     * Blur event
     */
    blur(event) {
      let isClickInside = this.$refs.editor.contains(event.target);

      if (!isClickInside) {
        this.isFocus = false;
      }
    },
  },

  /**
   * Mounted
   */
  mounted() {
    document.addEventListener("click", this.blur);
  },

  /**
   * Destroy all component before
   */
  beforeDestroy() {
    document.removeEventListener("click", this.blur);
    this.editor.destroy();
  },
};
</script>