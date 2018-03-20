<template>
<div class="base">
    <div class="topper">
    </div>
    <div class="left">
        <div class="reload">
            <img class="reload-img" src="/static/img/reload.png" onclick="reloadPaper()">
            <span class="reload-num">{{sumNum}}</span>
        </div>
        <div class="clear-float">
        </div>
        <div class="show-all" @click="toShowAll()">
            <div class="show-all-circle">
            </div>
            <span class="show-all-title">显示全部</span>
        </div>
        <div class="clear-float">
        </div>
        <div class="mistakes">
            <div class="mistakes-circle">
            </div>
            <span class="mistakes-title">错误</span>
            <ul class="mistakes-list">
                <li id="mistakes-spelling" @mouseover="changeMS()" @mouseout="returnMS()" @click="toShowESpelling()">
                    <span class="list-title">拼写</span>
                    <div id="mistakes-spelling-circle" v-if="paperOn">
                        <span id="mistakes-spelling-num">{{errorSpelling}}</span>
                    </div>
                    <div class="clear-float">
                    </div>
                </li>
                <li id="mistakes-grammar" @mouseover="changeMG()" @mouseout="returnMG()" @click="toShowEGrammar()">
                    <span class="list-title">语法</span>
                    <div id="mistakes-grammar-circle" v-if="paperOn">
                        <span id="mistakes-grammar-num">{{errorGrammar}}</span>
                    </div>
                    <div class="clear-float">
                    </div>
                </li>
                <li id="mistakes-lexeme" @mouseover="changeML()" @mouseout="returnML()" @click="toShowESemantic()">
                    <span class="list-title">语义</span>
                    <div id="mistakes-lexeme-circle" v-if="paperOn">
                        <span id="mistakes-lexeme-num">{{errorSemantic}}</span>
                    </div>
                    <div class="clear-float">
                    </div>
                </li>
            </ul>
        </div>
        <div class="clear-float">
        </div>
        <div class="suggestions">
            <div class="suggestions-circle">
            </div>
            <span class="suggestions-title">建议</span>
            <ul class="suggestions-list">
                <li id="suggestions-lexeme" @mouseover="changeSL()" @mouseout="returnSL()" @click="toShowSSemantic()">
                    <span class="list-title">语义</span>
                    <div id="suggestions-lexeme-circle" v-if="paperOn">
                        <span id="suggestions-lexeme-num">{{suggestSemantic}}</span>
                    </div>
                    <div class="clear-float">
                    </div>
                </li>
                <li id="suggestions-structure" @mouseover="changeSS()" @mouseout="returnSS()" @click="toShowSStructure()">
                    <span class="list-title">句子结构</span>
                    <div id="suggestion-structure-circle" v-if="paperOn">
                        <span id="suggestion-structure-num">{{suggestStructure}}</span>
                    </div>
                    <div class="clear-float">
                    </div>
                </li>
            </ul>
        </div>
        <div class="clear-float">
        </div>
        <div class="advanced-issues">
            <img class="advanced-issues-img" src="/static/img/more.png">
            <span class="advanced-issues-title">更多修改建议</span>
        </div>
    </div>
    <div class="splender-left">
    </div>
    <div class="middle">
        <quill-editor class="title-paste"
                      ref="myTextEditor"
                      :content="titleContent"
                      :options="titleEditorOption">
        </quill-editor>
        <quill-editor class="body-paste"
                      ref="myTextEditor"
                      :content="bodyContent"
                      :options="bodyEditorOption">
        </quill-editor>
    </div>
    <div class="splender-right">
    </div>
    <div class="right">
        <el-collapse accordion>
            <el-collapse-item v-for="(el,index) in errorSpellingArr" :key="index"  v-if="showESpelling">
                <template slot="title">
                    <li class="right-spelling">{{el.rep}}</li>
                </template>
                <div class="es-second-floor">
                    <span>{{el.exp}}</span>
                </div>
            </el-collapse-item>
            <el-collapse-item v-for="(el,index) in errorGrammarArr" :key="index"  v-if="showEGrammar">
                <template slot="title">
                    <li class="right-grammar">{{el.rep}}</li>
                </template>
                <div class="eg-second-floor">
                    <span>{{el.exp}}</span>
                </div>
            </el-collapse-item>
            <el-collapse-item v-for="(el,index) in errorSemanticArr" :key="index" v-if="showESemantic">
                <template slot="title">
                    <li class="right-semantic">{{el.rep}}</li>
                </template>
                <div class="ese-second-floor">
                    <span>{{el.exp}}</span>
                </div>
            </el-collapse-item>
            <el-collapse-item v-for="(el,index) in suggestSemanticArr" :key="index" v-if="showSSemantic">
                <template slot="title">
                    <li class="suggest-semantic">{{el.rep}}</li>
                </template>
                <div class="ss-second-floor">
                    <span>{{el.exp}}</span>
                </div>
            </el-collapse-item>
            <el-collapse-item v-for="(el,index) in suggestStructureArr" :key="index" v-if="showSStructure">
                <template slot="title">
                    <li class="suggest-structure">{{el.rep}}</li>
                </template>
                <div class="sst-second-floor">
                    <span>{{el.exp}}</span>
                </div>
            </el-collapse-item>
        </el-collapse>
    </div>
</div>
</template>
<script> 
import Vue from 'vue'
import Quill from 'quill'
import VueQuillEditor from 'vue-quill-editor'
Vue.use(VueQuillEditor)

const Parchment = Quill.import('parchment')
var boxAttributor = new Parchment.Attributor.Class('box', 'line', {
    scope: Parchment.Scope.INLINE,
    whitelist: ['error','suggest']
});
Quill.register(boxAttributor);

export default {
  data () {
    return {
        paperOn: false,
        showESpelling: true,
        showEGrammar: true,
        showESemantic: true,
        showSSemantic: true,
        showSStructure: true,
        paperTitle:'',
        paperBody: '',
        errorSpelling: '',
        errorGrammar: '',
        errorSemantic: '',
        suggestSemantic: '',
        suggestStructure: '',
        sumNum: '' ,
        judgeAdd:'',
        errorSpellingArr: [],
        errorSpellingPosL:[],
        errorSpellingPosR:[],
        errorSpellingRight:[],
        errorSpellingExplain:[],
        errorGrammarArr: [],
        errorGrammarPosL:[],
        errorGrammarPosR:[],
        errorGrammarRight:[],
        errorGrammarExplain:[],
        errorSemanticArr:[],
        errorSemanticPosL:[],
        errorSemanticPosR:[],
        errorSemanticRight:[],
        errorSemanticExplain:[],
        suggestSemanticArr: [],
        suggestSemanticPosL:[],
        suggestSemanticPosR:[],
        suggestSemanticRight:[],
        suggestSemanticExplain:[],
        suggestStructureArr: [],
        suggestStructurePosL:[],
        suggestStructurePosR:[],
        suggestStructureRight:[],
        suggestStructureExplain:[],
        titleContent: '',
        bodyContent:'',
        bodyContentArray: [],
        spanArray:[],
        spanString:'',
        htmlContent:'',
        titleEditorOption: {
          theme: 'bubble',
          placeholder: "PASTE TITLE",
          modules: {
          }
        },
        bodyEditorOption: {
          theme: 'bubble',
          placeholder: "PASTE PAPER",
          modules: {
          }
        }  
    }
  },
  mounted () {
      this.changeHtml()
  },
  methods: {
    changeMS() {
        var MSli = document.getElementById("mistakes-spelling");
        MSli.style.backgroundColor = "#eaeaea";
        var MSC = document.getElementById("mistakes-spelling-circle");
        if (MSC) {
            MSC.style.backgroundColor = "#ef4632";
        };
        var MSN = document.getElementById("mistakes-spelling-num");
        if (MSN) {
            MSN.style.color = "white";
        }
    },
    returnMS() {
        var MSli = document.getElementById("mistakes-spelling");
        MSli.style.backgroundColor = "white";
        var MSC = document.getElementById("mistakes-spelling-circle");
        if (MSC) {
            MSC.style.backgroundColor = "#ededed";
        };
        var MSN = document.getElementById("mistakes-spelling-num");
        if (MSN) {
            MSN.style.color = "#898989";
        }
    },
    changeMG() {
        var MGli = document.getElementById("mistakes-grammar");
        MGli.style.backgroundColor = "#eaeaea";
        var MGC = document.getElementById("mistakes-grammar-circle");
        if (MGC) {
            MGC.style.backgroundColor = "#ef4632";
        };
        var MGN = document.getElementById("mistakes-grammar-num");
        if (MGN) {
            MGN.style.color = "white"; 
        }
    },
    returnMG() {
        var MGli = document.getElementById("mistakes-grammar");
        MGli.style.backgroundColor = "white";
        var MGC = document.getElementById("mistakes-grammar-circle");
        if (MGC) {
            MGC.style.backgroundColor = "#ededed";
        };
        var MGN = document.getElementById("mistakes-grammar-num");
        if (MGN) {
             MGN.style.color = "#898989"; 
        }
    },
    changeML() {
        var MLli = document.getElementById("mistakes-lexeme");
        MLli.style.backgroundColor = "#eaeaea";
        var MLC = document.getElementById("mistakes-lexeme-circle");
        if (MLC) {
            MLC.style.backgroundColor = "#ef4632";
        };
        var MLN = document.getElementById("mistakes-lexeme-num");
        if (MLN) {
            MLN.style.color = "white"; 
        }   
    },
    returnML() {
        var MLli = document.getElementById("mistakes-lexeme");
        MLli.style.backgroundColor = "white";
        var MLC = document.getElementById("mistakes-lexeme-circle");
        if (MLC) {
            MLC.style.backgroundColor = "#ededed";
        };
        var MLN = document.getElementById("mistakes-lexeme-num");
        if (MLN) {
            MLN.style.color = "#898989"; 
        }
    },
    changeSL() {
        var SLli = document.getElementById("suggestions-lexeme");
        SLli.style.backgroundColor = "#eaeaea";
        var SLC = document.getElementById("suggestions-lexeme-circle");
        if (SLC) {
            SLC.style.backgroundColor = "#ef4632";
        };
        var SLN = document.getElementById("suggestions-lexeme-num");
        if (SLN) {
            SLN.style.color = "white"; 
        }
    },
    returnSL() {
        var SLli = document.getElementById("suggestions-lexeme");
        SLli.style.backgroundColor = "white";
        var SLC = document.getElementById("suggestions-lexeme-circle");
        if (SLC) {
            SLC.style.backgroundColor = "#ededed";
        };
        var SLN = document.getElementById("suggestions-lexeme-num");
        if (SLN) {
            SLN.style.color = "#898989"; 
        }
    },
    changeSS() {
        var SSli = document.getElementById("suggestions-structure");
        SSli.style.backgroundColor = "#eaeaea";
        var SSC = document.getElementById("suggestion-structure-circle");
        if (SSC) {
            SSC.style.backgroundColor = "#ef4632";
        };
        var SSN = document.getElementById("suggestion-structure-num");
        if (SSN) {
            SSN.style.color = "white"; 
        }      
    },
    returnSS() {
        var SSli = document.getElementById("suggestions-structure");
        SSli.style.backgroundColor = "white";
        var SSC = document.getElementById("suggestion-structure-circle");
        if (SSC) {
            SSC.style.backgroundColor = "#ededed";
        };
        var SSN = document.getElementById("suggestion-structure-num");
        if (SSN) {
            SSN.style.color = "#898989";
        } 
    },
    changeHtml() {
        setInterval(() => {
            if(this.editor.container.firstChild.innerText.trim() == this.htmlContent.trim() || this.editor.container.firstChild.innerText.trim()=="") return     
            let originContent = this.editor.container.firstChild.innerText
            this.$http.post('/api/num', {
                paperBody: this.editor.getText()
            }).then(res => {
                if(res.body.success) {
                    let text = this.editor.getText()
                    console.log("1"+text)
                    //this.htmlContent = this.editor.container.firstChild.innerText.trim()
                    this.paperOn = true,
                    this.errorSpelling = res.body.count.errorSpelling,
                    this.errorGrammar = res.body.count.errorGrammar,
                    this.errorSemantic = res.body.count.errorSemantic,
                    this.suggestSemantic = res.body.count.suggestSemantic,
                    this.suggestStructure = res.body.count.suggestStructure,
                    this.sumNum = res.body.count.sumNum,
                    this.errorSpellingArr = res.body.spelling.err,
                    this.errorGrammarArr = res.body.grammar.err,
                    this.errorSemanticArr = res.body.semantic.err,
                    this.suggestSemanticArr = res.body.semantic.sug,
                    this.suggestStructureArr = res.body.structure.sug
                    let resArr = []
                    let catArr = [this.errorSpellingArr, this.errorGrammarArr, this.errorSemanticArr, 
                    this.suggestSemanticArr, this.suggestStructureArr]
                    catArr.forEach(cat => {                        
                        cat.forEach(item => {
                            if(item.end) {
                               for(let i = 0; i< item.end.length; i++) {
                                resArr.push({
                                    start: item.start[i],
                                    end: item.end[i],
                                    type: item.type
                                })
                            } 
                            }
                        })
                    });
                    resArr.sort((a,b) => a.end < b.end)
                    function insert_flg(str,idx,insert){
                        let a = str.substring(0, idx)
                        let b = str.substring(idx, str.length)
                        return a+insert+b
                    };
                    resArr.forEach(item => {
                        if (item.type == 1) {
                            text = insert_flg(text, item.end, '</span>')
                            text = insert_flg(text, item.start, '<span class="line-error">')
                            console.log("2"+text)
                        }
                        else {
                            text = insert_flg(text, item.end, '</span>')
                            text = insert_flg(text, item.start, '<span class="line-suggest">')
                            console.log("3"+text)
                        }
                    });
                    this.cursorIndex = this.editor.getSelection().index
                    //this.changeEditor(text)
                    this.editor.deleteText(0, this.editor.getLength()+1)
                    console.log("4"+text)
                    //插入html
                    this.editor.clipboard.dangerouslyPasteHTML(0,text)
                    console.log("5"+text)
                    this.editor.setSelection(this.cursorIndex, 0)
                    this.htmlContent = originContent
                    console.log('1',this.htmlContent)
                    console.log('2',this.editor.container.firstChild.innerText)
            
                }
            })
        },3000)
    },
    toShowAll() {
        this.showESpelling = true,
        this.showEGrammar = true,
        this.showESemantic = true,
        this.showSSemantic = true,
        this.showSStructure = true
    },
    toShowMistake() {
        this.showESpelling = true,
        this.showEGrammar = true,
        this.showESemantic = true,
        this.showSSemantic = false,
        this.showSStructure = false
    },
    toShowESpelling() {
        this.showESpelling = true,
        this.showEGrammar = false,
        this.showESemantic = false,
        this.showSSemantic = false,
        this.showSStructure = false
    },
    toShowEGrammar() {
        this.showESpelling = false,
        this.showEGrammar = true,
        this.showESemantic = false,
        this.showSSemantic = false,
        this.showSStructure = false
    },
    toShowESemantic() {
        this.showESpelling = false,
        this.showEGrammar = false,
        this.showESemantic = true,
        this.showSSemantic = false,
        this.showSStructure = false
    },
    toShowSSemantic() {
        this.showESpelling = false,
        this.showEGrammar = false,
        this.showESemantic = false,
        this.showSSemantic = true,
        this.showSStructure = false
    },
    toShowSStructure() {
        this.showESpelling = false,
        this.showEGrammar = false,
        this.showESemantic = false,
        this.showSSemantic = false,
        this.showSStructure = true
    }
  },
  created() {
  },
  computed: {
    editor() {
        return this.$refs.myTextEditor.quill
    }
  },
}
</script>

<style>
#editor {
  height: 375px;
}
.base {
    width:100%;
    height:100%;
    letter-spacing: 1px;
}
.clear-float {
    clear:both;
}
.topper {
    height:20px;
    background-color:rgb(79,145,210);
}
/* 左边栏样式 */
.left {
    float: left;
    margin-left: 15px;
    width:20%;
    height: 100%;
    min-width: 245px;
}
.reload {
    border-bottom:1px solid rgb(218,218,218);
    width:50%;
    float:left;
    margin-left: 20px;
}
.reload-img {
    margin:25px auto 15px 20px;
    width:15px;
    height:60px;
    display: block;
    float: left;
}
.reload-num {
    display: block;
    float: left;
    font-size:75px;
    color:rgb(126,126,126);
    margin:10px 0px 0px 20px;
}
.show-all {
    width:50%;
    float:left;
    margin-left: 20px;
    padding-bottom:10px;
}
.show-all:hover {
    font-weight: bolder;
    cursor: pointer;
    background-color:rgb(234,234,234);
}
.show-all-circle {
    float: left;
    margin:18px 0 0 -20px;
    width:12px;
    height:12px;
    border-radius:50%;
    background-color:rgb(79,145,210);
}
.show-all-title {
    display: block;
    float: left;
    color: rgb(79,145,210);
    margin:13px 0 0 0;
    font-size: 18px;
}
.mistakes {
    border-bottom:1px solid rgb(218,218,218);
    width:50%;
    float:left;
    margin-left: 20px;
    padding-bottom:10px;
}
.mistakes-circle {
    float: left;
    margin:18px 0 0 -20px;
    width:12px;
    height:12px;
    border-radius:50%;
    background-color:rgb(232,78,61);
}
.mistakes-title {
    display: block;
    float: left;
    color: rgb(232,78,61);
    margin:13px 0 0 0;
    font-size:18px;
}
.mistakes-title:hover {
    font-weight: bolder;
    cursor: pointer;
}
#mistakes-spelling-circle {
    float: right;
    width:24px;
    height:24px;
    border-radius:50%;
    background-color:rgb(237,237,237);
    z-index: 1;
    margin: 8px 0 0 10px;
}
#mistakes-grammar-circle {
    float: right;
    width:24px;
    height:24px;
    border-radius:50%;
    background-color:rgb(237,237,237);
    z-index: 1;
    margin: 8px 0 0 10px;
}
#mistakes-lexeme-circle {
    float: right;
    width:24px;
    height:24px;
    border-radius:50%;
    background-color:rgb(237,237,237);
    z-index: 1;
    margin: 8px 0 0 10px;
}
.mistakes-list {
    width: 140%;
    float: left;
    list-style: none;
    margin: 5px 0 0 -40px;
    padding-top:10px;
}
.list-title {
    width:80%;
    font-size:16px;
    color:rgb(137,137,137);
    display: block;
    float:left;
    margin:0 0 10px 0;
    padding-top: 10px;
}
#mistakes-spelling-num {
    display: block; 
    float:right;
    color:rgb(137,137,137);
    position: relative;
    left:-6px;
    top:2px;
    z-index: 10;
}
#mistakes-grammar-num {
    display: block; 
    float:right;
    color:rgb(137,137,137);
    position: relative;
    left:-6px;
    top:2px;
    z-index: 10;
}
#mistakes-lexeme-num {
    display: block; 
    float:right;
    color:rgb(137,137,137);
    position: relative;
    left:-6px;
    top:2px;
    z-index: 10;
}
.suggestions-lexeme-circle {
    float: left;
    width:24px;
    height:24px;
    border-radius:50%;
    background-color:rgb(237,237,237);
    z-index: -1;
    position: relative;
    left:20px;
}
.suggestion-structure-circle {
    float: left;
    width:24px;
    height:24px;
    border-radius:50%;
    background-color:rgb(237,237,237);
    z-index: -1;
    position: relative;
    left:20px;
}
.suggestions {
    border-bottom:1px solid rgb(218,218,218);
    width:50%;
    float:left;
    margin-left: 20px;
    padding-bottom:30px;
}
.suggestions-circle {
    float: left;
    margin:18px 0 0 -20px;
    width:12px;
    height:12px;
    border-radius:50%;
    background-color:rgb(253,182,75);
}
.suggestions-title {
    display: block;
    float: left;
    color:rgb(253,182,75);
    margin:15px 0 0 0;
    font-size:18px;
}
.suggestions-title:hover {
    font-weight: bolder;
    cursor: pointer;
}
#suggestions-lexeme-circle {
    float: right;
    width:24px;
    height:24px;
    border-radius:50%;
    background-color:rgb(237,237,237);
    z-index: 1;
    margin: 8px 0 0 10px;
}
#suggestion-structure-circle {
    float: right;
    width:24px;
    height:24px;
    border-radius:50%;
    background-color:rgb(237,237,237);
    z-index: 1;
    margin: 8px 0 0 10px;
}
.suggestions-list {
    width:140%;
    float: left;
    list-style: none;
    margin: 5px 0 0 -40px;
    padding-top:10px;
}
#suggestions-lexeme-num {
    display: block; 
    float:right;
    color:rgb(137,137,137);
    position: relative;
    left:-6px;
    top:2px;
    z-index: 10;
}
#suggestion-structure-num {
    display: block; 
    float:right;
    color:rgb(137,137,137);
    position: relative;
    left:-6px;
    top:2px;
    z-index: 10;
}
.advanced-issues {
    width:100%;
    float:left;
}
.advanced-issues-img {
    width:24px;
    height:22px;
    float: left;
    margin: 15px 0 0 0;
}
.advanced-issues-title {
    display: block;
    float: left;
    color: rgb(92,92,92);
    margin:15px 0 0 0;
    font-size: 18px;
}
/* 中间栏样式 */
.middle {
    float: left;
    width:40%;
    height:100%;
}
.line-error {
    border-bottom: 2px solid red;
}
.line-suggest {
    border-bottom: 2px solid rgb(238,188,80);
}
.title-paste {
    width:80%;
    height:50px;
    margin: 50px 0 25px 0;
    outline:none;
}
.body-paste {
    width:95%;
    height:80%;
    border: 0px;
    outline:none;
    color:rgb(92,92,92);
}
.ql-editor {
    font-size:16px;
}
/* 右边栏样式 */
.right {
    float: left;
    width: 30%;
    height: 100%;
    margin-top: 125px;
    margin-left:10px;
}
.el-collapse {
    border: none;
    width:96%;
    margin: 0 auto 0 auto;
}
.el-collapse-item__header {
    font-size: 16px;
}
.right-spelling {
    color: red;
    height: 30px;
    margin: 0 40px 10px -3px;
}
.right-grammar {
    color: red;
    height: 30px;
    margin: 0 40px 10px -3px;
}
.right-semantic {
    color: red;
    height: 30px;
    margin: 0 40px 10px -3px;
}
.suggest-semantic {
    color: rgb(238,188,80);
    height: 30px;
    margin: 0 40px 10px -3px;
}
.suggest-structure {
    color: rgb(238,188,80);
    height: 30px;
    margin: 0 40px 10px -3px;
}
.es-second-floor {
    position: relative;
    top:10px;
    width: 98%;
    height: 95%;
    margin: auto auto;
    box-shadow: 0px 0px 10px 2px rgba(0,0,0,0.1);
}
.eg-second-floor {
    position: relative;
    top:10px;
    width: 98%;
    height: 95%;
    margin: auto auto;
    box-shadow: 0px 0px 10px 2px rgba(0,0,0,0.1);
}
.ese-second-floor {
    position: relative;
    top:10px;
    width: 98%;
    height: 95%;
    margin: auto auto;
    box-shadow: 0px 0px 10px 2px rgba(0,0,0,0.1);
}
.ss-second-floor {
    position: relative;
    top:10px;
    width: 98%;
    height: 95%;
    margin: auto auto;
    box-shadow: 0px 0px 10px 2px rgba(0,0,0,0.1);
}
.sst-second-floor {
    position: relative;
    top:10px;
    width: 98%;
    height: 95%;
    margin: auto auto;
    box-shadow: 0px 0px 10px 2px rgba(0,0,0,0.1);
}
.delete-option {
    width:10px;
    height:10px;
    float:right;
}
.close-option {
    width:15px;
    height:10px;
    float:right;
    margin-right:10px;
}
.splender-left {
    float: left;
    width: 3%;
    height: 100%;
    background: linear-gradient(to right,rgb(242,242,242) ,white);
}
.splender-right {
    float: left;
    width: 3%;
    height:100%;
    background: linear-gradient(to right,white ,rgb(242,242,242));
}
::-webkit-input-placeholder { /* WebKit browsers */  
    color:rgb(180,180,180); 
}  
:-moz-placeholder { /* Mozilla Firefox 4 to 18 */  
    color:rgb(180,180,180);  
    opacity:  1;  
}  
::-moz-placeholder { /* Mozilla Firefox 19+ */  
    color:rgb(180,180,180); 
    opacity:  1;  
}  
:-ms-input-placeholder { /* Internet Explorer 10+ */  
    color:rgb(180,180,180); 
}  
</style>
