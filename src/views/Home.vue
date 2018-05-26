<template>
<div class="base">
    <div class="topper">
    </div>
    <div class="left">
        <div class="reload">
            <img class="reload-img" src="/static/img/reload.png" onclick="reloadPaper()" v-if="showPic">
            <img class="reload-img" src="/static/img/load.gif" onclick="reloadPaper()" v-if="showGif">
            <span class="reload-num">{{sumNum}}</span>
        </div>
        <div class="clear-float">
        </div>
        <div class="show-all" id="all" @mouseover="changeAll()" @mouseout="returnAll()" @click="toShowAll()">
            <div class="show-all-circle">
            </div>
            <span class="show-all-title">显示全部</span>
        </div>
        <div class="clear-float">
        </div>
        <div class="mistakes">
            <div class="mistakes-all" id="mistake" @mouseover="changeM()" @mouseout="returnM()" @click="toShowMistake()">
                <div class="mistakes-circle">
                </div>
                <span class="mistakes-title">错误</span>
            </div>
            <ul class="mistakes-list">
                <!-- <li id="mistakes-spelling" @mouseover="changeMS()" @mouseout="returnMS()" @click="toShowESpelling()"> -->
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
            <div class="suggestions-all" id="suggestion" @mouseover="changeS()" @mouseout="returnS()" @click="toShowSuggestion()">
                <div class="suggestions-circle">
                </div>
                <span class="suggestions-title">建议</span>
            </div>
            <ul class="suggestions-list">
                <li id="suggestions-spelling" @mouseover="changeSSP()" @mouseout="returnSSP()" @click="toShowSSpelling()">
                    <span class="list-title">拼写</span>
                    <div id="suggestion-spelling-circle" v-if="paperOn">
                        <span id="suggestion-spelling-num">{{suggestSpelling}}</span>
                    </div>
                    <div class="clear-float">
                    </div>
                </li>
                <li id="suggestions-grammar" @mouseover="changeSG()" @mouseout="returnSG()" @click="toShowSGrammar()">
                    <span class="list-title">语法</span>
                    <div id="suggestion-grammar-circle" v-if="paperOn">
                        <span id="suggestion-grammar-num">{{suggestGrammar}}</span>
                    </div>
                    <div class="clear-float">
                    </div>
                </li>
                <li id="suggestions-lexeme" @mouseover="changeSL()" @mouseout="returnSL()" @click="toShowSSemantic()">
                    <span class="list-title">语义</span>
                    <div id="suggestion-lexeme-circle" v-if="paperOn">
                        <span id="suggestion-lexeme-num">{{suggestSemantic}}</span>
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
    <div class="middle" @click="getEventTrigger()">
        <quill-editor class="title-paste"
                      ref="myTextEditor"
                      :content="titleContent"
                      :options="titleEditorOption">
        </quill-editor>
        <quill-editor class="body-paste"
                      id="body-paste"
                      ref="myTextEditor"
                      autocomplete="off" 
                      autocorrect="off" 
                      autocapitalize="off" 
                      spellcheck="false"
                      :content="bodyContent"
                      :options="bodyEditorOption">
        </quill-editor>
    </div>
    <div class="splender-right">
    </div>
    <div class="right">
        <el-collapse v-model="activeNames" @change="handleChange" >
            <el-collapse-item v-for="(el,index) in rightArr" :key="index" :index="index+''" :name="el.id" v-if="showAll">
                <template slot="title">
                    <li class="error-rep" v-if="el.type==1">
                        {{el.rep}}
                        <img src="/static/img/replace.png" class="replace-left" @click="replaceLeft(el.id,el.start,el.end,el.rep,index)">
                    </li>
                    <li class="sug-rep" v-if="el.type==2">
                        {{el.rep}}
                        <img src="/static/img/replace.png" class="replace-left" @click="replaceLeft(el.id,el.start,el.end,el.rep,index)">
                    </li>
                </template>
                <div class="es-second-floor">
                    <span v-html="el.exp"></span>
                </div>
            </el-collapse-item>
            <el-collapse-item v-for="(el,index) in errArr" :key="index" :index="index+''" :name="el.id" v-if="showAllErr">
                <template slot="title">
                    <li class="error-rep">
                        {{el.rep}}
                        <img src="/static/img/replace.png" class="replace-left" @click="replaceLeft(el.id,el.start,el.end,el.rep,index)">
                    </li>
                </template>
                <div class="es-second-floor">
                    <span v-html="el.exp"></span>
                </div>
            </el-collapse-item>
            <el-collapse-item v-for="(el,index) in sugArr" :key="index" :index="index+''" :name="el.id" v-if="showAllSug">
                <template slot="title">
                    <li class="sug-rep">
                        {{el.rep}}
                        <img src="/static/img/replace.png" class="replace-left" @click="replaceLeft(el.id,el.start,el.end,el.rep,index)">
                    </li>
                </template>
                <div class="es-second-floor">
                    <span v-html="el.exp"></span>
                </div>
            </el-collapse-item>
            <el-collapse-item v-for="(el,index) in errSpeArr" :key="index" :index="index+''" :name="el.id" v-if="showErrSpe">
                <template slot="title">
                    <li class="error-rep">
                        {{el.rep}}
                        <img src="/static/img/replace.png" class="replace-left" @click="replaceLeft(el.id,el.start,el.end,el.rep,index)">
                    </li>
                </template>
                <div class="es-second-floor">
                    <span v-html="el.exp"></span>
                </div>
            </el-collapse-item>
            <el-collapse-item v-for="(el,index) in errGraArr" :key="index" :index="index+''" :name="el.id" v-if="showErrGra">
                <template slot="title">
                    <li class="error-rep">
                        {{el.rep}}
                        <img src="/static/img/replace.png" class="replace-left" @click="replaceLeft(el.id,el.start,el.end,el.rep,index)">
                    </li>
                </template>
                <div class="es-second-floor">
                    <span v-html="el.exp"></span>
                </div>
            </el-collapse-item>
            <el-collapse-item v-for="(el,index) in errSemArr" :key="index" :index="index+''" :name="el.id" v-if="showErrSem">
                <template slot="title">
                    <li class="error-rep">
                        {{el.rep}}
                        <img src="/static/img/replace.png" class="replace-left" @click="replaceLeft(el.id,el.start,el.end,el.rep,index)">
                    </li>
                </template>
                <div class="es-second-floor">
                    <span v-html="el.exp"></span>
                </div>
            </el-collapse-item>
            <el-collapse-item v-for="(el,index) in sugSpeArr" :key="index" :index="index+''" :name="el.id" v-if="showSugSpe">
                <template slot="title">
                    <li class="sug-rep">
                        {{el.rep}}
                        <img src="/static/img/replace.png" class="replace-left" @click="replaceLeft(el.id,el.start,el.end,el.rep,index)">
                    </li>
                </template>
                <div class="es-second-floor">
                    <span v-html="el.exp"></span>
                </div>
            </el-collapse-item>
            <el-collapse-item v-for="(el,index) in sugGraArr" :key="index" :index="index+''" :name="el.id" v-if="showSugGra">
                <template slot="title">
                    <li class="sug-rep">
                        {{el.rep}}
                        <img src="/static/img/replace.png" class="replace-left" @click="replaceLeft(el.id,el.start,el.end,el.rep,index)">
                    </li>
                </template>
                <div class="es-second-floor">
                    <span v-html="el.exp"></span>
                </div>
            </el-collapse-item>
            <el-collapse-item v-for="(el,index) in sugSemArr" :key="index" :index="index+''" :name="el.id" v-if="showSugSem">
                <template slot="title">
                    <li class="sug-rep">
                        {{el.rep}}
                        <img src="/static/img/replace.png" class="replace-left" @click="replaceLeft(el.id,el.start,el.end,el.rep,index)">
                    </li>
                </template>
                <div class="es-second-floor">
                    <span v-html="el.exp"></span>
                </div>
            </el-collapse-item>
            <el-collapse-item v-for="(el,index) in sugStrArr" :key="index" :index="index+''" :name="el.id" v-if="showSugSre">
                <template slot="title">
                    <li class="sug-rep">
                        {{el.rep}}
                        <img src="/static/img/replace.png" class="replace-left" @click="replaceLeft(el.id,el.start,el.end,el.rep,index)">
                    </li>
                </template>
                <div class="es-second-floor">
                    <span v-html="el.exp"></span>
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


// var IdAttribute = new Parchment.Attributor.Attribute('id', 'id', {
//     scope: Parchment.Scope.INLINE,
// });
// Quill.register({
//     'attributors/attribute/id': IdAttribute
// }, true);

// Quill.register({
//     'formats/id': IdAttribute,
// }, true);

let Inline = Quill.import('blots/inline');

class IssueBlot extends Inline {
    static create(value) {
        let node = super.create();
        node.setAttribute('class', value.class);
        node.setAttribute('id', value.id);
        return node;
    }

    static value(node) {
        return {
            class: node.getAttribute('class'),
            id: node.getAttribute('id')
        };
    }
}

IssueBlot.blotName = 'issue';
IssueBlot.tagName = 'SPAN';

const Parchment = Quill.import('parchment')
var boxAttributor = new Parchment.Attributor.Class('box', 'line', {
    scope: Parchment.Scope.INLINE,
    whitelist: ['error','suggest']
});

Quill.register({
    'formats/issue': IssueBlot
});
// also, register in bodyEditorOption/formats

Quill.register(boxAttributor);

export default {
  data () {
    return {
        paperOn: false,
        showAll: true,
        showAllErr: false,
        showAllSug: false,
        showErrSpe: false,
        showErrGra: false,
        showErrSem: false,
        showSugSpe: false,
        showSugGra: false,
        showSugSem: false,
        showSugSre: false,
        paperTitle:'',
        paperBody: '',
        errorSpelling: '',
        errorGrammar: '',
        errorSemantic: '',
        suggestSpelling:'',
        suggestGrammar:'',
        suggestSemantic: '',
        suggestStructure: '',
        sumNum: 0 ,
        judgeAdd:'',
        errorSpellingArr: [],
        errorGrammarArr: [],
        errorSemanticArr:[],
        suggestSpellingArr: [],
        suggestGrammarArr: [],
        suggestSemanticArr: [],
        rightArr: [],
        errArr: [],
        sugArr: [],
        errSpeArr: [],
        errGraArr: [],
        errSemArr: [],
        sugSpeArr: [],
        sugGraArr: [],
        sugSemArr: [],
        sugStrArr: [],
        judgeFlag: 0,
        replace: 'block',
        lastEditTimerId: -1,
        all: 0,
        m: 0,
        s: 0,
        es: 0,
        eg: 0,
        ese: 0,
        ss: 0,
        sg: 0,
        sse: 0,
        sst: 0,
        showPic: true,
        showGif: false,
        suggestStructureArr: [],
        titleContent: '',
        bodyContent:'',
        bodyContentArray: [],
        spanArray:[],
        spanString:'',
        htmlContent:'',
        activeNames: [],//this.activeNames,
        titleEditorOption: {
          theme: 'bubble',
          placeholder: "PASTE TITLE",
          modules: {
          }
        },
        bodyEditorOption: {
          theme: 'bubble',
          formats: [
            'bold',
            'header',
            'italic',
            'link',
            'list',
            'indent',
            'issue'
          ],
          placeholder: "PASTE PAPER",
          modules: {
          }
        }  
    }
  },
  mounted () {
    var that = this; 
    this.editor.on('text-change', function(delta, oldDelta, source) {
        if (source == 'api') {
            // do nothing at the moment
            that.updateEditor();
        } else if (source == 'user') {
            that.updateEditor();
        }
    });
    // var Delta = Quill.import('delta');
    // this.editor.clipboard.addMatcher (Node.ELEMENT_NODE, function (node, delta) {
    //     return new Delta().insert(node.textContent);
    // });
    this.editor.clipboard.dangerouslyPasteHTML(source == 'user');
   
    // Interpret a <b> tag as bold
    // this.editor.clipboard.addMatcher('B', function(node, delta) {
    //     return delta.compose(new Delta().retain(delta.length(), { bold: true }));
    // });
  },
  methods: {
    getEventTrigger() {
        var id = event.target.id
        this.openBoard(id)
    }, 
    openBoard(id) {
        this.activeNames = [parseInt(id)]
    },
    handleChange(va) {
        // console.log(va)
    },
    changeAll() {
        var M = document.getElementById("all");
        M.style.backgroundColor = "#eaeaea";
        M.style.fontWeight = "bolder";
    },
    returnAll() {
        if (this.all == 0) {
            var M = document.getElementById("all");
            M.style.backgroundColor = "#ffffff";
            M.style.fontWeight = "normal";
        }
    },
    changeM() {
        var M = document.getElementById("mistake");
        M.style.backgroundColor = "#eaeaea";
        M.style.fontWeight = "bolder";
    },
    returnM() {
        if (this.m == 0) {
            var M = document.getElementById("mistake");
            M.style.backgroundColor = "#ffffff";
            M.style.fontWeight = "normal";
        }
    },
    changeS() {
        var M = document.getElementById("suggestion");
        M.style.backgroundColor = "#eaeaea";
        M.style.fontWeight = "bolder";
    },
    returnS() {
        if (this.s == 0) {
            var M = document.getElementById("suggestion");
            M.style.backgroundColor = "#ffffff";
            M.style.fontWeight = "normal";
        }
    },
    changeMS() {
        var MSli = document.getElementById("mistakes-spelling");
        MSli.style.backgroundColor = "#eaeaea";
        var MSC = document.getElementById("mistakes-spelling-circle");
        if (MSC) {
            MSC.style.backgroundColor = "#ef4632";
            MSC.style.cursor = "pointer";
        };
        var MSN = document.getElementById("mistakes-spelling-num");
        if (MSN) {
            MSN.style.color = "white";
        }
    },
    returnMS() {
        if (this.es == 0) {
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
        }
    },
    changeMG() {
        var MGli = document.getElementById("mistakes-grammar");
        MGli.style.backgroundColor = "#eaeaea";
        var MGC = document.getElementById("mistakes-grammar-circle");
        if (MGC) {
            MGC.style.backgroundColor = "#ef4632";
            MGC.style.cursor = "pointer";
        };
        var MGN = document.getElementById("mistakes-grammar-num");
        if (MGN) {
            MGN.style.color = "white"; 
        }
    },
    returnMG() {
        if (this.eg == 0) {
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
        }
    },
    changeML() {
        var MLli = document.getElementById("mistakes-lexeme");
        MLli.style.backgroundColor = "#eaeaea";
        var MLC = document.getElementById("mistakes-lexeme-circle");
        if (MLC) {
            MLC.style.backgroundColor = "#ef4632";
            MLC.style.cursor = "pointer";
        };
        var MLN = document.getElementById("mistakes-lexeme-num");
        if (MLN) {
            MLN.style.color = "white"; 
        }   
    },
    returnML() {
        if (this.ese == 0) {
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
        }
    },
    changeSSP() {
        var SLli = document.getElementById("suggestions-spelling");
        SLli.style.backgroundColor = "#eaeaea";
        var SSP = document.getElementById("suggestion-spelling-circle");
        if (SSP) {
            SSP.style.backgroundColor = "#FDB64B";
            SSP.style.cursor = "pointer";
        };
        var SSP = document.getElementById("suggestion-spelling-num");
        if (SSP) {
            SSP.style.color = "white"; 
        }
    },
    returnSSP() {
        if (this.ss == 0) {
            var SLli = document.getElementById("suggestions-spelling");
            SLli.style.backgroundColor = "white";
            var SSP = document.getElementById("suggestion-spelling-circle");
            if (SSP) {
                SSP.style.backgroundColor = "#ededed";
            };
            var SSP = document.getElementById("suggestion-spelling-num");
            if (SSP) {
                SSP.style.color = "#898989"; 
            }
        }
    },
    changeSG() {
        var SLli = document.getElementById("suggestions-grammar");
        SLli.style.backgroundColor = "#eaeaea";
        var SLC = document.getElementById("suggestion-grammar-circle");
        if (SLC) {
            SLC.style.backgroundColor = "#FDB64B";
            SLC.style.cursor = "pointer";
        };
        var SLN = document.getElementById("suggestion-grammar-num");
        if (SLN) {
            SLN.style.color = "white"; 
        }
    },
    returnSG() {
        if (this.sg == 0) {
            var SLli = document.getElementById("suggestions-grammar");
            SLli.style.backgroundColor = "white";
            var SLC = document.getElementById("suggestion-grammar-circle");
            if (SLC) {
                SLC.style.backgroundColor = "#ededed";
            };
            var SLN = document.getElementById("suggestion-grammar-num");
            if (SLN) {
                SLN.style.color = "#898989"; 
            }
        }
    },
    changeSL() {
        var SLli = document.getElementById("suggestions-lexeme");
        SLli.style.backgroundColor = "#eaeaea";
        var SLC = document.getElementById("suggestion-lexeme-circle");
        if (SLC) {
            SLC.style.backgroundColor = "#FDB64B";
            SLC.style.cursor = "pointer";
        };
        var SLN = document.getElementById("suggestion-lexeme-num");
        if (SLN) {
            SLN.style.color = "white"; 
        }
    },
    returnSL() {
        if (this.sse == 0) {
            var SLli = document.getElementById("suggestions-lexeme");
            SLli.style.backgroundColor = "white";
            var SLC = document.getElementById("suggestion-lexeme-circle");
            if (SLC) {
                SLC.style.backgroundColor = "#ededed";
            };
            var SLN = document.getElementById("suggestion-lexeme-num");
            if (SLN) {
                SLN.style.color = "#898989"; 
            }
        }
    },
    changeSS() {
        var SSli = document.getElementById("suggestions-structure");
        SSli.style.backgroundColor = "#eaeaea";
        var SSC = document.getElementById("suggestion-structure-circle");
        if (SSC) {
            SSC.style.backgroundColor = "#FDB64B";
            SSC.style.cursor = "pointer";
        };
        var SSN = document.getElementById("suggestion-structure-num");
        if (SSN) {
            SSN.style.color = "white"; 
        }      
    },
    returnSS() {
        if (this.sst == 0) {
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
        }
    },
    onEditorFocus({ editor, html, text }) {
        if (this.judgeFlag == 0) {
            this.$alert('暂时不能输入空格和回车', '不好意思～', {
                confirmButtonText: '确定',
                callback: action => {
                    this.$message({
                    type: 'info',
                    message: '谢谢您的理解！'
                    });
                }
            })
        }
        this.judgeFlag = 1
    },
    updateEditor() {
        if (this.lastEditTimerId != -1) {
            clearTimeout(this.lastEditTimerId);
        }
        this.lastEditTimerId = setTimeout(() => {
            this.changeHtml();
        }, 1200);
    },
    changeHtml() {
        if(this.editor.container.firstChild.innerText.trim() == this.htmlContent.trim() || this.editor.container.firstChild.innerText.trim()=="") return
        // this.htmlContent = this.editor.container.firstChild.innerText.trim();
        this.showGif = true,
        this.showPic = false,
        this.$http.post('/api/num', {
            paperBody: this.editor.getText(),
        }).then(res => {
            if(res.body.success) {
                this.replace = 'block'
                this.showGif = false,
                this.showPic = true,
                this.paperOn = true,
                this.errorSpelling = res.body.count.errorSpelling,
                this.errorGrammar = res.body.count.errorGrammar,
                this.errorSemantic = res.body.count.errorSemantic,
                this.suggestSpelling = res.body.count.suggestSpelling,
                this.suggestGrammar = res.body.count.suggestGrammar,
                this.suggestSemantic = res.body.count.suggestSemantic,
                this.suggestStructure = res.body.count.suggestStructure,
                this.sumNum = res.body.count.sumNum,
                this.errorSpellingArr = res.body.spelling.err,
                this.errorGrammarArr = res.body.grammar.err,
                this.errorSemanticArr = res.body.semantic.err,
                this.suggestSpellingArr = res.body.spelling.sug,
                this.suggestGrammarArr = res.body.grammar.sug,
                this.suggestSemanticArr = res.body.semantic.sug,
                this.suggestStructureArr = res.body.structure.sug
                this.rightArr = []
                let resArr = []
                let catArr = [this.errorSpellingArr, this.errorGrammarArr, this.errorSemanticArr, 
                this.suggestSpellingArr, this.suggestGrammarArr, this.suggestSemanticArr, this.suggestStructureArr]

                // Remove existing formatting
                let errors = document.getElementsByClassName("line-error");
                let suggests = document.getElementsByClassName("line-suggest");
                let allIssues = Array.from(errors).concat(Array.from(suggests));
                allIssues.forEach(errorNode => {
                    errorNode.removeAttribute('class');
                    errorNode.removeAttribute('id');
                    // let blot = Parchment.find(errorNode);
                    // console.log(blot);
                });
            
                // Combine all issues
                catArr.forEach(cat => {
                    cat.forEach(item => {
                        if(item.end) {
                            for(let i = 0; i< item.end.length; i++) {
                                resArr.push({
                                    start: item.start[i],
                                    end: item.end[i],
                                    type: item.type,
                                    id: item.id
                                });
                            }
                            if (item.end.length > 0) {
                                this.rightArr.push({
                                    start: item.start[0],
                                    end: item.end[0],
                                    cat: item.cat,
                                    type: item.type,
                                    id: item.id,
                                    exp: item.exp,
                                    rep: item.rep
                                });
                            }
                        }
                    })
                });
                this.rightArr.forEach(item => {
                    if(item.type == 1) {
                        this.errArr.push({
                            start: item.start[0],
                            end: item.end[0],
                            cat: item.cat,
                            type: item.type,
                            id: item.id,
                            exp: item.exp,
                            rep: item.rep
                        })
                    } 
                });
                this.rightArr.forEach(item => {
                    if(item.type == 2) {
                        this.sugArr.push({
                            start: item.start[0],
                            end: item.end[0],
                            cat: item.cat,
                            type: item.type,
                            id: item.id,
                            exp: item.exp,
                            rep: item.rep
                        })
                    }
                });
                this.rightArr.forEach(item => {
                    if(item.type == 1 && item.cat == 1) {
                        this.errSpeArr.push({
                            start: item.start[0],
                            end: item.end[0],
                            cat: item.cat,
                            type: item.type,
                            id: item.id,
                            exp: item.exp,
                            rep: item.rep
                        })
                    }
                });
                this.rightArr.forEach(item => {
                    if(item.type == 1 && item.cat == 2) {
                        this.errGraArr.push({
                            start: item.start[0],
                            end: item.end[0],
                            cat: item.cat,
                            type: item.type,
                            id: item.id,
                            exp: item.exp,
                            rep: item.rep
                        })
                    }
                });
                this.rightArr.forEach(item => {
                    if(item.type == 1 && item.cat == 3) {
                        this.errSemArr.push({
                            start: item.start[0],
                            end: item.end[0],
                            cat: item.cat,
                            type: item.type,
                            id: item.id,
                            exp: item.exp,
                            rep: item.rep
                        })
                    }
                });
                this.rightArr.forEach(item => {
                    if(item.type == 2 && item.cat == 1) {
                        this.sugSpeArr.push({
                            start: item.start[0],
                            end: item.end[0],
                            cat: item.cat,
                            type: item.type,
                            id: item.id,
                            exp: item.exp,
                            rep: item.rep
                        })
                    }
                });
                this.rightArr.forEach(item => {
                    if(item.type == 2 && item.cat == 2) {
                        this.sugGraArr.push({
                            start: item.start[0],
                            end: item.end[0],
                            cat: item.cat,
                            type: item.type,
                            id: item.id,
                            exp: item.exp,
                            rep: item.rep
                        })
                    }
                });
                this.rightArr.forEach(item => {
                    if(item.type == 2 && item.cat == 3) {
                        this.sugSemArr.push({
                            start: item.start[0],
                            end: item.end[0],
                            cat: item.cat,
                            type: item.type,
                            id: item.id,
                            exp: item.exp,
                            rep: item.rep
                        })
                    }
                });
                this.rightArr.forEach(item => {
                    if(item.type == 2 && item.cat == 4) {
                        this.sugStrArr.push({
                            start: item.start[0],
                            end: item.end[0],
                            cat: item.cat,
                            type: item.type,
                            id: item.id,
                            exp: item.exp,
                            rep: item.rep
                        })
                    }
                });
                this.rightArr.sort((a,b) => a.start > b.start)
                // resArr.sort((a,b) => a.end < b.end)
                // function insert_flg(str,idx,insert){
                //     let a = str.substring(0, idx)
                //     let b = str.substring(idx, str.length)
                //     return a+insert+b
                // };
                resArr.forEach(item => {
                    if(item.end > this.editor.getLength()-1) return
                    if (item.type == 1) {
                        this.editor.formatText(item.start, item.end-item.start, 'issue', {class: 'line-error', id: item.id+''})
                    } else if (item.type == 2) {
                        this.editor.formatText(item.start, item.end-item.start, 'issue', {class: 'line-suggest', id: item.id+''})
                    }
                });
                // this.cursorIndex = this.editor.getSelection().index
                // this.editor.setSelection(this.cursorIndex, 0)
            }
        })
    },
    replaceLeft(id,start,end,rep,index) {
        let replace = document.getElementById(id)
        this.editor.deleteText(start, end-start);
        this.editor.insertText(start,rep, true)
        this.replace = 'none'
    },
    toShowAll() {
        this.showAll = true,
        this.showAllErr = false,
        this.showAllSug = false,
        this.showErrSpe = false,
        this.showErrGra = false,
        this.showErrSem = false,
        this.showSugSpe = false,
        this.showSugGra = false,
        this.showSugSem = false,
        this.showSugSre = false,
        this.all = 1,
        this.m = 0,
        this.returnM(),
        this.s = 0,
        this.returnS(),
        this.es = 0,
        this.returnMS(),
        this.eg = 0,
        this.returnMG(),
        this.ese = 0,
        this.returnML(),
        this.ss = 0,
        this.returnSSP(),
        this.sg = 0,
        this.returnSG(),
        this.sse = 0,
        this.returnSL(),
        this.sst = 0,
        this.returnSS()
    },
    toShowMistake() {
        this.showAll = false,
        this.showAllErr = true,
        this.showAllSug = false,
        this.showErrSpe = false,
        this.showErrGra = false,
        this.showErrSem = false,
        this.showSugSpe = false,
        this.showSugGra = false,
        this.showSugSem = false,
        this.showSugSre = false,
        this.all = 0,
        this.returnAll(),
        this.m = 1,
        this.s = 0,
        this.returnS(),
        this.es = 0,
        this.returnMS(),
        this.eg = 0,
        this.returnMG(),
        this.ese = 0,
        this.returnML(),
        this.ss = 0,
        this.returnSSP(),
        this.sg = 0,
        this.returnSG(),
        this.sse = 0,
        this.returnSL(),
        this.sst = 0,
        this.returnSS()
    },
    toShowSuggestion() {
        this.showAll = false,
        this.showAllErr = false,
        this.showAllSug = true,
        this.showErrSpe = false,
        this.showErrGra = false,
        this.showErrSem = false,
        this.showSugSpe = false,
        this.showSugGra = false,
        this.showSugSem = false,
        this.showSugSre = false,
        this.all = 0,
        this.returnAll(),
        this.m = 0,
        this.returnM(),
        this.s = 1,
        this.es = 0,
        this.returnMS(),
        this.eg = 0,
        this.returnMG(),
        this.ese = 0,
        this.returnML(),
        this.ss = 0,
        this.returnSSP(),
        this.sg = 0,
        this.returnSG(),
        this.sse = 0,
        this.returnSL(),
        this.sst = 0,
        this.returnSS()
    },
    toShowESpelling() {
        this.showAll = false,
        this.showAllErr = false,
        this.showAllSug = false,
        this.showErrSpe = true,
        this.showErrGra = false,
        this.showErrSem = false,
        this.showSugSpe = false,
        this.showSugGra = false,
        this.showSugSem = false,
        this.showSugSre = false,
        this.all = 0,
        this.returnAll(),
        this.m = 0,
        this.returnM(),
        this.s = 0,
        this.returnS(),
        this.es = 1,
        this.eg = 0,
        this.returnMG(),
        this.ese = 0,
        this.returnML(),
        this.ss = 0,
        this.returnSSP(),
        this.sg = 0,
        this.returnSG(),
        this.sse = 0,
        this.returnSL(),
        this.sst = 0,
        this.returnSS()
    },
    toShowEGrammar() {
        this.showAll = false,
        this.showAllErr = false,
        this.showAllSug = false,
        this.showErrSpe = false,
        this.showErrGra = true,
        this.showErrSem = false,
        this.showSugSpe = false,
        this.showSugGra = false,
        this.showSugSem = false,
        this.showSugSre = false,
        this.all = 0,
        this.returnAll(),
        this.m = 0,
        this.returnM(),
        this.s = 0,
        this.returnS(),
        this.es = 0,
        this.returnMS(),
        this.eg = 1,
        this.ese = 0,
        this.returnML(),
        this.ss = 0,
        this.returnSSP(),
        this.sg = 0,
        this.returnSG(),
        this.sse = 0,
        this.returnSL(),
        this.sst = 0,
        this.returnSS()
    },
    toShowESemantic() {
        this.showAll = false,
        this.showAllErr = false,
        this.showAllSug = false,
        this.showErrSpe = false,
        this.showErrGra = false,
        this.showErrSem = true,
        this.showSugSpe = false,
        this.showSugGra = false,
        this.showSugSem = false,
        this.showSugSre = false,
        this.all = 0,
        this.returnAll(),
        this.m = 0,
        this.returnM(),
        this.s = 0,
        this.returnS(),
        this.es = 0,
        this.returnMS(),
        this.eg = 0,
        this.returnMG(),
        this.ese = 1,
        this.ss = 0,
        this.returnSSP(),
        this.sg = 0,
        this.returnSG(),
        this.sse = 0,
        this.returnSL(),
        this.sst = 0,
        this.returnSS()
    },
    toShowSSpelling() {
        this.showAll = false,
        this.showAllErr = false,
        this.showAllSug = false,
        this.showErrSpe = false,
        this.showErrGra = false,
        this.showErrSem = false,
        this.showSugSpe = true,
        this.showSugGra = false,
        this.showSugSem = false,
        this.showSugSre = false,
        this.all = 0,
        this.returnAll(),
        this.m = 0,
        this.returnM(),
        this.s = 0,
        this.returnS(),
        this.es = 0,
        this.returnMS(),
        this.eg = 0,
        this.returnMG(),
        this.ese = 0,
        this.returnML(),
        this.ss = 1,
        this.sg = 0,
        this.returnSG(),
        this.sse = 0,
        this.returnSL(),
        this.sst = 0,
        this.returnSS()
    },
    toShowSGrammar() {
        this.showAll = false,
        this.showAllErr = false,
        this.showAllSug = false,
        this.showErrSpe = false,
        this.showErrGra = false,
        this.showErrSem = false,
        this.showSugSpe = false,
        this.showSugGra = true,
        this.showSugSem = false,
        this.showSugSre = false,
        this.all = 0,
        this.returnAll(),
        this.m = 0,
        this.returnM(),
        this.s = 0,
        this.returnS(),
        this.es = 0,
        this.returnMS(),
        this.eg = 0,
        this.returnMG(),
        this.ese = 0,
        this.returnML(),
        this.ss = 0,
        this.returnSSP(),
        this.sg = 1,
        this.sse = 0,
        this.returnSL(),
        this.sst = 0,
        this.returnSS()
    },
    toShowSSemantic() {
        this.showAll = false,
        this.showAllErr = false,
        this.showAllSug = false,
        this.showErrSpe = false,
        this.showErrGra = false,
        this.showErrSem = false,
        this.showSugSpe = false,
        this.showSugGra = false,
        this.showSugSem = true,
        this.showSugSre = false,
        this.all = 0,
        this.returnAll(),
        this.m = 0,
        this.returnM(),
        this.s = 0,
        this.returnS(),
        this.es = 0,
        this.returnMS(),
        this.eg = 0,
        this.returnMG(),
        this.ese = 0,
        this.returnML(),
        this.ss = 0,
        this.returnSSP(),
        this.sg = 0,
        this.returnSG(),
        this.sse = 1,
        this.sst = 0,
        this.returnSS()
    },
    toShowSStructure() {
        this.showAll = false,
        this.showAllErr = false,
        this.showAllSug = false,
        this.showErrSpe = false,
        this.showErrGra = false,
        this.showErrSem = false,
        this.showSugSpe = false,
        this.showSugGra = false,
        this.showSugSem = false,
        this.showSugSre = true,
        this.all = 0,
        this.returnAll(),
        this.m = 0,
        this.returnM(),
        this.s = 0,
        this.returnS(),
        this.es = 0,
        this.returnMS(),
        this.eg = 0,
        this.returnMG(),
        this.ese = 0,
        this.returnML(),
        this.ss = 0,
        this.returnSSP(),
        this.sg = 0,
        this.returnSG(),
        this.sse = 0,
        this.returnSL(),
        this.sst = 1
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
    width:100%;
    position: absolute;
    top:0;
    z-index: 100;
}
/* 左边栏样式 */
.left {
    float: left;
    width:21%;
    height: 100%;
    min-width: 245px;
}
.reload {
    border-bottom:1px solid rgb(218,218,218);
    width:100%;
    float:left;
    /* margin-left: 20px; */
}
.reload-img {
    margin: 30px 0 15px 20px;
    width: 73px;
    height: 65px;
    display: inline-block;
    position: relative;
    top: 20px;
}
.reload-num {
    display: inline-block;
    font-size:75px;
    color:rgb(126,126,126);
    margin-left: -10px;
}
.show-all {
    width:100%;
    float:left;
    padding-bottom:10px;
}
.show-all-circle {
    display: inline-block;
    margin:18px 0 0 20px;
    width:12px;
    height:12px;
    border-radius:50%;
    background-color:rgb(79,145,210);
}
.show-all-title {
    display: inline-block;
    color: rgb(79,145,210);
    margin:13px 0 0 0;
    font-size: 18px;
}
.mistakes {
    border-bottom:1px solid rgb(218,218,218);
    width:100%;
    float:left;
    padding-bottom:10px;
}
.mistakes-all {
    width:100%;
    float:left;
    padding-bottom: 10px;
}
.mistakes-circle {
    display:inline-block;
    margin:18px 0 0 20px;
    width:12px;
    height:12px;
    border-radius:50%;
    background-color:rgb(232,78,61);
}
.mistakes-title {
    display: inline-block;
    color: rgb(232,78,61);
    margin:13px 0 0 0;
    font-size:18px;
}
#mistakes-spelling-circle {
    float: right;
    width:24px;
    height:24px;
    border-radius:50%;
    background-color:rgb(237,237,237);
    z-index: 1;
    margin: 8px 20px 0 0;
}
#mistakes-grammar-circle {
    float: right;
    width:24px;
    height:24px;
    border-radius:50%;
    background-color:rgb(237,237,237);
    z-index: 1;
    margin: 8px 20px 0 0;
}
#mistakes-lexeme-circle {
    float: right;
    width:24px;
    height:24px;
    border-radius:50%;
    background-color:rgb(237,237,237);
    z-index: 1;
    margin: 8px 20px 0 0;
}
.mistakes-list {
    width: 100%;
    float: left;
    list-style: none;
    margin: 5px 0 0 0px;
    padding:10px 0 0 0;
}
.list-title {
    font-size:16px;
    color:rgb(137,137,137);
    display: block;
    float:left;
    margin:0 0 10px 0;
    padding: 10px 0 0 35px;
}
#mistakes-spelling-num {
    display: block; 
    float:right;
    color:rgb(137,137,137);
    position: relative;
    left:-7px;
    top:2px;
    z-index: 10;
}
#mistakes-grammar-num {
    display: block; 
    float:right;
    color:rgb(137,137,137);
    position: relative;
    left:-7px;
    top:2px;
    z-index: 10;
}
#mistakes-lexeme-num {
    display: block; 
    float:right;
    color:rgb(137,137,137);
    position: relative;
    left:-7px;
    top:2px;
    z-index: 10;
}
.suggestions {
    border-bottom:1px solid rgb(218,218,218);
    width:100%;
    float:left;
    padding-bottom:30px;
}
.suggestions-all {
    width:100%;
    float:left;
    padding-bottom: 10px;
}
.suggestions-circle {
    display: inline-block;
    margin:18px 0 0 20px;
    width:12px;
    height:12px;
    border-radius:50%;
    background-color:rgb(253,182,75);
}
.suggestions-title {
    display: inline-block;
    color:rgb(253,182,75);
    margin:15px 0 0 0;
    font-size:18px;
}
.suggestions-title:hover {
    font-weight: bolder;
    cursor: pointer;
}
#suggestion-spelling-circle {
    float: right;
    width:24px;
    height:24px;
    border-radius:50%;
    background-color:rgb(237,237,237);
    z-index: 1;
    margin: 8px 20px 0 0;
}
#suggestion-grammar-circle {
    float: right;
    width:24px;
    height:24px;
    border-radius:50%;
    background-color:rgb(237,237,237);
    z-index: 1;
    margin: 8px 20px 0 0;
}
#suggestion-lexeme-circle {
    float: right;
    width:24px;
    height:24px;
    border-radius:50%;
    background-color:rgb(237,237,237);
    z-index: 1;
    margin: 8px 20px 0 0;
}
#suggestion-structure-circle {
    float: right;
    width:24px;
    height:24px;
    border-radius:50%;
    background-color:rgb(237,237,237);
    z-index: 1;
    margin: 8px 20px 0 0;
}
.suggestions-list {
    width:100%;
    float: left;
    list-style: none;
    margin: 5px 0 0 0px;
    padding:10px 0 0 0;
}
#suggestion-spelling-num {
    display: block; 
    float:right;
    color:rgb(137,137,137);
    position: relative;
    left:-7px;
    top:2px;
    z-index: 10;
}
#suggestion-grammar-num {
    display: block; 
    float:right;
    color:rgb(137,137,137);
    position: relative;
    left:-7px;
    top:2px;
    z-index: 10;
}
#suggestion-lexeme-num {
    display: block; 
    float:right;
    color:rgb(137,137,137);
    position: relative;
    left:-7px;
    top:2px;
    z-index: 10;
}
#suggestion-structure-num {
    display: block; 
    float:right;
    color:rgb(137,137,137);
    position: relative;
    left:-7px;
    top:2px;
    z-index: 10;
}
.advanced-issues {
    width:100%;
    float:left;
}
.advanced-issues-img {
    width:22px;
    height:20px;
    float: left;
    margin: 17px 0 0 10px;
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
.line-error:hover {
    cursor: pointer;
    background:rgba(230,157,169,0.7);
}
.line-suggest:hover {
    cursor: pointer;
    background: rgba(220,170,70,0.4);
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
    width: 31%;
    height:100%;
    overflow: scroll;
    margin-left:1px;
}
.el-collapse {
    padding-top:125px;
    border: none;
    width:96%;
    margin: 0 auto 0  0;
}
.error-rep {
    color: red;
    height: 30px;
    margin: 0 40px 10px 2px;
    font-size: 16px;
    width: 75%;
}
.sug-rep {
    color: rgb(238,188,80);
    height: 30px;
    margin: 0 40px 10px 2px;
    font-size: 16px;
    width: 75%;
}
.replace-left {
    width: 16px;
    height: 16px;
    float: right;
    margin: 15px 0 0 40px;
}
/* .right-spelling {
    color: red;
    height: 30px;
    margin: 0 40px 10px 2px;
    font-size: 16px;
    width: 75%;
}
.right-grammar {
    color: red;
    height: 30px;
    margin: 0 40px 10px 2px;
    font-size: 16px;
    width: 75%;
}
.right-semantic {
    color: red;
    height: 30px;
    margin: 0 40px 10px 2px;
    font-size: 16px;
    width: 75%;
}  */
/* .suggest-spelling {
    color: rgb(238,188,80);
    height: 30px;
    margin: 0 40px 10px 2px;
    font-size: 16px;
    width: 75%;
}
.suggest-grammar {
    color: rgb(238,188,80);
    height: 30px;
    margin: 0 40px 10px 2px;
    font-size: 16px;
    width: 75%;
} */
/* .suggest-semantic {
    color: rgb(238,188,80);
    height: 30px;
    margin: 0 40px 10px 2px;
    font-size: 16px;
    width: 75%;
}
.suggest-structure {
    color: rgb(238,188,80);
    height: 30px;
    margin: 0 40px 10px 2px;
    font-size: 16px;
    width: 75%;
}  */
.es-second-floor {
    position: relative;
    top:-5px;
    width: 98%;
    height: 95%;
    margin: auto auto;
    font-size: 15px;
    box-shadow: 0px 0px 10px 2px rgba(0,0,0,0.1);
}
.eg-second-floor {
    position: relative;
    top:-5px;
    width: 98%;
    height: 95%;
    margin: auto auto;
    font-size: 15px;
    box-shadow: 0px 0px 10px 2px rgba(0,0,0,0.1);
}
.ese-second-floor {
    position: relative;
    top:-5px;
    width: 98%;
    height: 95%;
    margin: auto auto;
    font-size: 15px;
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
/* 右边栏方框样式 */
/* 拼写错误 */
.es-tag {
    background:rgb(79,145,210);
    width:140px;
    margin:20px;
    position:relative;
    top:10px;
}
.es-tag-li {
    color:#fff;
    text-indent:5px;
}
.es-word {
    margin:0 10px 0 20px;
    font-size:18px;
}
.es-origin-line {
    text-decoration:line-through; 
    color:#FF0000;
}
.es-origin-word {
    color:#000;
}
.es-now-word {
    background:rgb(79,145,210);
    color:#fff;padding:4px;
}
.es-example {
    margin:10px 10px 10px 20px;
}
.es-example-word {
    color:rgb(79,145,210);
    font-weight:bold
}
/* 语法错误 */
.eg-tag {
    background:rgb(79,145,210);
    width:140px;
    margin:20px;
    position:relative;
    top:10px;
}
.eg-tag-li {
    color:#fff;
    text-indent:5px;
}
.eg-grammar {
    margin-left:20px;
    font-size:18px;
}
.eg-origin-line {
    text-decoration:line-through; 
    color:#FF0000;
}
.eg-origin-grammar {
    color:#000;
}
.eg-now-grammar {
    background:rgb(79,145,210);
    color:#fff;
    padding:4px;
}
.eg-origin-example {
    font-weight:bold;
    color:rgb(113,113,113);
    margin:10px 10px 0 20px;
}
.eg-origin-example-grammar {
    background:rgb(79,145,210);
    color:#fff;
}
.eg-origin-exp {
    color:rgb(117,117,117);
    margin:0 10px 0 20px;
    line-height:15px;
}
.eg-example-tag {
    color:rgb(79,145,210);
    font-weight:bold;
    font-size:17px;
    margin:0 10px 0 20px;
}
.eg-example {
    color:rgb(117,117,117);
    font-style:oblique;
    margin:0 10px 10px 20px;
    line-height:15px;
}
.eg-example-grammar {
    color:rgb(79,145,210);
}
/* 语义错误 */
.ese-tag {
    background:rgb(79,145,210);
    width:140px;
    margin:20px;
    position:relative;
    top:10px;
}
.ese-tag-li {
    color:#fff;
    text-indent:5px;
}
.ese-exp {
    margin:0 10px 0 20px
}
.ese-origin {
    margin:0 10px 0 20px;
    color:rgb(117,117,117);
}
.ese-origin-semantic {
    color:#ff0000;
}
.ese-origin-line {
   color:#ff0000;
   text-decoration:line-through;
}
.ese-now-semantic {
    margin:0 10px 0 20px;
    color:rgb(79,145,210);
}
/* 拼写建议 */
.ss-tag {
    background:rgb(79,145,210);
    width:140px;
    margin:20px;
    position:relative;
    top:10px;
}
.ss-tag-li {
    color:#fff;
    text-indent:5px;
}
.ss-word {
    margin:0 10px 0 20px;
    font-size:18px;
}
.ss-origin-line {
    text-decoration:line-through; 
    color:rgb(238,188,80);
}
.ss-origin-word {
    color:#000;
}
.ss-now-word {
    background:rgb(79,145,210);
    color:#fff;padding:4px;
}
.ss-example {
    margin:10px 10px 10px 20px;
}
.ss-example-word {
    color:rgb(79,145,210);
    font-weight:bold
}
/* 语法建议 */
.sg-tag {
    background:rgb(79,145,210);
    width:140px;
    margin:20px;
    position:relative;
    top:10px;
}
.sg-tag-li {
    color:#fff;
    text-indent:5px;
}
.sg-grammar {
    margin-left:20px;
    font-size:18px;
}
.sg-origin-line {
    text-decoration:line-through; 
    color:rgb(238,188,80);
}
.sg-origin-grammar {
    color:#000;
}
.sg-now-grammar {
    background:rgb(79,145,210);
    color:#fff;
    padding:4px;
}
.sg-origin-example {
    font-weight:bold;
    color:rgb(113,113,113);
    margin:10px 10px 0 20px;
}
.sg-origin-example-grammar {
    background:rgb(79,145,210);
    color:#fff;
}
.sg-origin-exp {
    color:rgb(117,117,117);
    margin:0 10px 0 20px;
    line-height:15px;
}
.sg-example-tag {
    color:rgb(79,145,210);
    font-weight:bold;
    font-size:17px;
    margin:0 10px 0 20px;
}
.sg-example {
    color:rgb(117,117,117);
    font-style:oblique;
    margin:0 10px 10px 20px;
    line-height:15px;
}
.sg-example-grammar {
    color:rgb(79,145,210);
}
/* 语义建议 */
.sse-tag {
    background:rgb(79,145,210);
    width:140px;
    margin:20px;
    position:relative;
    top:10px;
}
.sse-tag-li {
    color:#fff;
    text-indent:5px;
}
.sse-exp {
    margin:0 10px 0 20px
}
.sse-origin {
    margin:0 10px 0 20px;
    color:rgb(117,117,117);
}
.sse-origin-semantic {
    color:rgb(238,188,80)
}
.sse-origin-line {
   color:rgb(238,188,80);
   text-decoration:line-through;
}
.sse-now-semantic {
    margin:0 10px 0 20px;
    color:rgb(79,145,210);
}
/* 句式结构建议 */ 
.sst-tag {
    background:rgb(79,145,210);
    width:140px;
    margin:20px;
    position:relative;
    top:10px;
}
.sst-tag-li {
    color:#fff;
    text-indent:5px;
}
.sst-exp {
    margin:0 10px 0 20px;
}
.sst-origin {
    margin:0 10px 0 20px;
    color:rgb(117,117,117);
}
.sst-origin-word {
    color:rgb(238,188,80);
    text-decoration:line-through;
}
.sst-now {
    margin:0 10px 0 20px;
    color:rgb(79,145,210);
}
</style>
