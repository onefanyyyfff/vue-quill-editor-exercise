<template>
  <md-card>
    <md-card-actions>
      <div class="md-subhead">
        <span>01 Example (theme snow)</span>
      </div>
      <md-button target="_blank" 
                 class="md-icon-button"
                 href="https://github.com/surmon-china/vue-quill-editor/tree/master/examples/01-example.vue">
        <md-icon>code</md-icon>
      </md-button>
    </md-card-actions>
    <md-card-media>
      <div class="quill-editor-example">
        <!-- quill-editor -->
        <quill-editor ref="myTextEditor"
                      v-model="content"
                      :options="editorOption"
                      @blur="onEditorBlur($event)"
                      @change="change($event)"
                      @focus="onEditorFocus($event)"
                      @ready="onEditorReady($event)">
        </quill-editor>
      </div>
    </md-card-media>
  </md-card>
</template>

<script>
  
  export default {
    data() {
      return {
        name: '01-example',
        content: `<h2 class="ql-align-center"><span class="ql-font-serif">Text content loading..</span></h2>`,
        htmlContent: '',
        cursorIndex: 0,
        editorOption: {
          modules: {
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'],
              ['blockquote', 'code-block'],
              [{ 'header': 1 }, { 'header': 2 }],
              [{ 'list': 'ordered' }, { 'list': 'bullet' }],
              [{ 'script': 'sub' }, { 'script': 'super' }],
              [{ 'indent': '-1' }, { 'indent': '+1' }],
              [{ 'direction': 'rtl' }],
              [{ 'size': ['small', false, 'large', 'huge'] }],
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
              [{ 'font': [] }],
              [{ 'color': [] }, { 'background': [] }],
              [{ 'align': [] }],
              ['clean'],
              ['link', 'image', 'video']
            ]
          }
        }
      }
    },
    methods: {
      onEditorBlur(editor) {
        console.log('editor blur!', editor)
      },
      onEditorFocus(editor) {
        console.log('editor focus!', editor)
      },
      onEditorReady(editor) {
        console.log('editor ready!', editor)
      },
      change({ editor, html, text }) {
        
        console.log('text', text)
        // html = html.replace('text', 'fff')
        // if( html == this.htmlContent || text.trim().length == 0) return

        // this.htmlContent = html
        // var length = this.editor.getLength()
        // this.editor.deleteText(0, length-1)
        // this.editor.clipboard.dangerouslyPasteHTML(0,html)
      },
      getHtml() {
          setInterval(() => {
            console.log('init html', this.editor.container.firstChild.innerHTML)
            if(this.editor.container.firstChild.innerHTML.trim() == this.htmlContent.trim()) return
            this.htmlContent = this.editor.container.firstChild.innerHTML.trim().replace('abc', 'fff')
            this.cursorIndex = this.editor.getSelection().index
            this.editor.deleteText(0, this.editor.getLength()+1)
            console.log('delete html', this.editor.container.firstChild.innerHTML)

            this.editor.clipboard.dangerouslyPasteHTML(0, this.htmlContent.trim())
            console.log('paste html', this.editor.container.firstChild.innerHTML)

            this.editor.setSelection(this.cursorIndex, 0)

          }, 5000)
      }
    },
    computed: {
      editor() {
        return this.$refs.myTextEditor.quill
      }
    },
    mounted() {
      console.log('this is my editor', this.editor)
    // setInterval(this.getHtml(), 1000)
    this.getHtml()
      
    }
  }
</script>

