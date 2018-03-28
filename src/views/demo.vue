<template>
<div class="quill-editor-example">
  <!-- quill-editor -->
  <quill-editor ref="myTextEditor"
                v-model="content"
                :options="editorOption">
  </quill-editor>
</div>
</template>

<script>
  
  export default {
    data() {
      return {
        name: '01-example',
        content: '',
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
            //console.log('init html', this.editor.container.firstChild.innerHTML)
            if(this.editor.container.firstChild.innerHTML.trim() == this.htmlContent.trim() || this.editor.container.firstChild.innerText.trim()=="") return
            console.log('1',this.htmlContent)
            console.log('2',this.editor.container.firstChild.innerHTML)
            this.htmlContent = this.editor.container.firstChild.innerHTML.trim().replace('abc', 'fff')
            this.cursorIndex = this.editor.getSelection().index
            this.editor.deleteText(0, this.editor.getLength()+1)
            //console.log('delete html', this.editor.container.firstChild.innerHTML)

            this.editor.clipboard.dangerouslyPasteHTML(0, this.htmlContent.trim())
            //console.log('paste html', this.editor.container.firstChild.innerHTML)

            this.editor.setSelection(this.cursorIndex, 0)
          }, 3000)
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

