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
            <span class="show-all-title">SHOW ALL</span>
        </div>
        <div class="clear-float">
        </div>
        <div class="mistakes">
            <div class="mistakes-circle">
            </div>
            <span class="mistakes-title">MISTAKES</span>
            <ul class="mistakes-list">
                <li id="mistakes-spelling" @mouseover="changeMS()" @mouseout="returnMS()" @click="toShowESpelling()">
                    <span class="list-title">SPELLING</span>
                    <div id="mistakes-spelling-circle" v-if="paperOn">
                        <span id="mistakes-spelling-num">{{errorSpelling}}</span>
                    </div>
                    <div class="clear-float">
                    </div>
                </li>
                <li id="mistakes-grammar" @mouseover="changeMG()" @mouseout="returnMG()" @click="toShowEGrammar()">
                    <span class="list-title">GRAMMAR</span>
                    <div id="mistakes-grammar-circle" v-if="paperOn">
                        <span id="mistakes-grammar-num">{{errorGrammar}}</span>
                    </div>
                    <div class="clear-float">
                    </div>
                </li>
                <li id="mistakes-lexeme" @mouseover="changeML()" @mouseout="returnML()" @click="toShowESemantic()">
                    <span class="list-title">SEMANTIC</span>
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
            <span class="suggestions-title">SUGGESTIONS</span>
            <ul class="suggestions-list">
                <li id="suggestions-lexeme" @mouseover="changeSL()" @mouseout="returnSL()" @click="toShowSSemantic()">
                    <span class="list-title">SEMANTIC</span>
                    <div id="suggestions-lexeme-circle" v-if="paperOn">
                        <span id="suggestions-lexeme-num">{{suggestSemantic}}</span>
                    </div>
                    <div class="clear-float">
                    </div>
                </li>
                <li id="suggestions-structure" @mouseover="changeSS()" @mouseout="returnSS()" @click="toShowSStructure()">
                    <span class="list-title">SENTENCE STRUCTURE</span>
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
            <span class="advanced-issues-title">ADVANCED ISSUES</span>
        </div>
    </div>
    <div class="splender-left">
    </div>
    <div class="middle">
        <quill-editor class="title-paste"
                      ref="myTextEditor"
                      :content="titleContent"
                      :options="titleEditorOption"
                      @change="onTitleEditorChange($event)">
        </quill-editor>
        <quill-editor class="body-paste"
                      ref="myTextEditor"
                      :content="bodyContent"
                      :options="bodyEditorOption"
                      @change="onBodyEditorChange($event)">
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
        <!-- <div v-for="(el,index) in errorSpellingArr" :key="index" class="right-spelling" v-if="showESpelling">
            <div class="rs-first-floor">
                <span>{{el.rep}}</span>
                <img src="/static/img/delete.png" class="delete-option">
                <img src="/static/img/close.png" class="close-option">
            </div>
        </div>
        <div v-for="(el,index) in errorGrammarArr" :key="index" class="right-grammar" v-if="showEGrammar">
            <div class="rg-first-floor">
                <span>{{el.rep}}</span>
                <img src="/static/img/delete.png" class="delete-option">
                <img src="/static/img/close.png" class="close-option">
            </div>
        </div>
        <div v-for="(el,index) in errorSemanticArr" :key="index" class="right-semantic" v-if="showESemantic">
            <div class="rse-first-floor">
                <span>{{el.rep}}</span>
                <img src="/static/img/delete.png" class="delete-option">
                <img src="/static/img/close.png" class="close-option">
            </div>
        </div>
        <div v-for="(el,index) in suggestSemanticArr" :key="index" class="suggest-semantic" v-if="showSSemantic">
            <div class="ss-first-floor">
                <span>{{el.rep}}</span>
                <img src="/static/img/delete.png" class="delete-option">
                <img src="/static/img/close.png" class="close-option">
            </div>
        </div>
        <div v-for="(el,index) in suggestStructureArr" :key="index" class="suggest-structure" v-if="showSStructure">
            <div class="sst-first-floor">
                <span>{{el.rep}}</span>
                <img src="/static/img/delete.png" class="delete-option">
                <img src="/static/img/close.png" class="close-option">
            </div>
        </div> -->
    </div>
</div>
</template>
<script> 
import Vue from 'vue'
import Quill from 'quill'
import VueQuillEditor from 'vue-quill-editor'
// import 'quill/dist/quill.core.css'
// import 'quill/dist/quill.snow.css'
// import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor)

const Parchment = Quill.import('parchment')
var boxAttributor = new Parchment.Attributor.Class('box', 'line', {
    scope: Parchment.Scope.INLINE,
    whitelist: ['error', 'suggest']
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
    onTitleEditorChange({ editor, html, text }) {
        this.titleContent = html
    },
    onBodyEditorChange({ editor, html, text }) {
        this.$http.post('/api/num', {
            paperBody: text
        }).then(res => {
            if(res.body.success) {
                this.paperOn = true,
                this.errorSpelling = res.body.count.errorSpelling,
                this.errorGrammar = res.body.count.errorGrammar,
                this.errorSemantic = res.body.count.errorSemantic,
                this.suggestSemantic = res.body.count.suggestSemantic,
                this.suggestStructure = res.body.count.suggestStructure,
                this.sumNum = res.body.count.sumNum,

                this.errorSpellingArr = res.body.spelling.err,
                // this.errorSpellingPosL = res.body.spelling.err.start,
                // this.errorSpellingPosR = res.body.spelling.err.end,
                // this.errorSpellingRight =res.body.spelling.err.rep,
                // this.errorSpellingExplain=res.body.spelling.err.exp,

                this.errorGrammarArr = res.body.grammar.err,
                // this.errorGrammarPosL=res.body.grammar.err.start,
                // this.errorGrammarPosR=res.body.grammar.err.end,
                // this.errorGrammarRight=res.body.grammar.err.rep,
                // this.errorGrammarExplain=res.body.grammar.err.exp,

                this.errorSemanticArr = res.body.semantic.err,
                // this.errorSemanticPosL=res.body.semantic.err.start,
                // this.errorSemanticPosR=res.body.semantic.err.end,
                // this.errorSemanticRight=res.body.semantic.err.rep,
                // this.errorSemanticExplain=res.body.semantic.err.exp,

                this.suggestSemanticArr = res.body.semantic.sug,
                // this.suggestSemanticPosL=res.body.semantic.sug.start,
                // this.suggestSemanticPosR=res.body.semantic.sug.end,
                // this.suggestSemanticRight=res.body.semantic.sug.rep,
                // this.suggestSemanticExplain=res.body.semantic.sug.exp,

                this.suggestStructureArr = res.body.structure.sug
                // this.suggestStructurePosL=res.body.structure.sug.start,
                // this.suggestStructurePosR=res.body.structure.sug.end,
                // this.suggestStructureRight=res.body.structure.sug.rep,
                // this.suggestStructureExplain=res.body.structure.sug.exp

                //当文本被处理完，且只处理一次的时候，调用changeEditor函数，替换处理好的html文本
                if ((this.judgeAdd != text) && text.length != 1) {
                    for (let i=0 ; i<this.errorSpellingArr.length ; i++) {
                        for(let j=0; j<this.errorSpellingArr[i].start.length; j++) {
                            this.addErrorSpellingTag(this.errorSpellingArr[i].start[j],this.errorSpellingArr[i].end[j],text)//给带修改的部分加span
                        }
                    }
                    for (let i=0 ; i<this.errorGrammarArr.length ; i++) {
                        for(let j=0 ; j<this.errorGrammarArr[i].start.length ; j++) {
                            this.addErrorGrammarTag(this.errorGrammarArr[i].start[j],this.errorGrammarArr[i].end[j],text)//给带修改的部分加span
                        }
                    }
                    for (let i=0; i<this.errorSemanticArr.length ; i++) {
                        for(let j=0 ; j<this.errorSemanticArr[i].start.length ; j++) {
                            this.addErrorLexemeTag(this.errorSemanticArr[i].start[j],this.errorSemanticArr[i].end[j],text)//给带修改的部分加span
                        }
                    }
                    for (let i=0; i<this.suggestSemanticArr.length ; i++) {
                        for(let j=0 ; j<this.suggestSemanticArr[i].start.length ; j++) {
                            this.addSuggestLexemeTag(this.suggestSemanticArr[i].start[j],this.suggestSemanticArr[i].end[j],text)//给带修改的部分加span
                        }
                    }
                    for (let i=0; i<this.suggestStructureArr.length ; i++) {
                        for(let j=0 ; j<this.suggestStructureArr[i].start.length ; j++) {
                            this.addSuggestStructureTag(this.suggestStructureArr[i].start[j],this.suggestStructureArr[i].end[j],text)//给带修改的部分加span
                        }
                    }
                    this.changeEditor()
                    this.judgeAdd = text
                }
            }
            else {
                alert(error)
            }
        })
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
    },
    //给拼写错误的部分加span显示
    addErrorSpellingTag(L,R,content) {
        this.bodyContentArray=content.replace(/(.)(?=[^$])/g,"$1,").split(",")//将内容变成数组
        for (let m = L; m<=R ; m++) {
            this.spanArray.push(this.bodyContentArray[m])
        }
        // 加span
        var re = this.spanArray.join("")
        var str = this.bodyContentArray.join("")
        if (this.spanString == "") {
            this.spanString = str.replace(re, function(x) {
                return '<span class="line-error">' + x + '</span>';
            });
        } 
        else {
            this.spanString = this.spanString.replace(re, function(x) {
                return '<span class="line-error">' + x + '</span>';
            });
        }
        this.spanArray.splice(0,this.spanArray.length)//数组清空，寻找下一个待指正数组
        console.log(this.spanString)
    },
    //给语法错误的部分加span显示
    addErrorGrammarTag(L,R,content) {
        this.bodyContentArray=content.replace(/(.)(?=[^$])/g,"$1,").split(",")//将内容变成数组
        for (let m = L; m<=R ; m++) {
            this.spanArray.push(this.bodyContentArray[m])
        }
        // 加span
        var re = this.spanArray.join("")
        var str = this.bodyContentArray.join("")
        if (this.spanString == "") {
            this.spanString = str.replace(re, function(x) {
                return '<span class="line-error">' + x + '</span>';
            });
        } 
        else {
            this.spanString = this.spanString.replace(re, function(x) {
                return '<span class="line-error">'  + x + '</span>';
            });
        }
        this.spanArray.splice(0,this.spanArray.length)//数组清空，寻找下一个待指正数组
        console.log(this.spanString)
    },
    //给语意错误的部分加span显示
    addErrorLexemeTag(L,R,content) {
        this.bodyContentArray=content.replace(/(.)(?=[^$])/g,"$1,").split(",")//将内容变成数组
        for (let m = L; m<=R ; m++) {
            this.spanArray.push(this.bodyContentArray[m])
        }
        // 加span
        var re = this.spanArray.join("")
        var str = this.bodyContentArray.join("")
        if (this.spanString == "") {
            this.spanString = str.replace(re, function(x) {
                return '<span class="line-error">' + x + '</span>';
            });
        } 
        else {
            this.spanString = this.spanString.replace(re, function(x) {
                return '<span class="line-error">' + x + '</span>';
            });
        }
        this.spanArray.splice(0,this.spanArray.length)//数组清空，寻找下一个待指正数组
        console.log(this.spanString)
    },
    //给需要提建议的语意部分加span显示
    addSuggestLexemeTag(L,R,content) {
        this.bodyContentArray=content.replace(/(.)(?=[^$])/g,"$1,").split(",")//将内容变成数组
        for (let m = L; m<=R ; m++) {
            this.spanArray.push(this.bodyContentArray[m])
        }
        // 加span
        var re = this.spanArray.join("")
        var str = this.bodyContentArray.join("")
        if (this.spanString == "") {
            this.spanString = str.replace(re, function(x) {
                return '<span class="line-suggest">' + x + '</span>';
            });
        } 
        else {
            this.spanString = this.spanString.replace(re, function(x) {
                return '<span class="line-suggest">' + x + '</span>';
            });
        }
        this.spanArray.splice(0,this.spanArray.length)//数组清空，寻找下一个待指正数组
        console.log(this.spanString)
    },
    //给需要提建议的结构部分加span显示
    addSuggestStructureTag(L,R,content) {
        this.bodyContentArray=content.replace(/(.)(?=[^$])/g,"$1,").split(",")//将内容变成数组
        for (let m = L; m<=R ; m++) {
            this.spanArray.push(this.bodyContentArray[m])
        }
        // 加span
        var re = this.spanArray.join("")
        var str = this.bodyContentArray.join("")
        if (this.spanString == "") {
            this.spanString = str.replace(re, function(x) {
                return '<span class="line-suggest">' + x + '</span>';
            });
        } 
        else {
            this.spanString = this.spanString.replace(re, function(x) {
                return '<span class="line-suggest">' + x + '</span>';
            });
        }
        this.spanArray.splice(0,this.spanArray.length)//数组清空，寻找下一个待指正数组
        console.log(this.spanString)
    },
    changeEditor() {
        //加p标签
        if (this.spanString.trim().length === 0) {
            this.htmlContent = this.spanString
        }
        else {
            this.htmlContent = this.spanString.replace(this.spanString, function(x) {
                return '<p>' + x + '</p>';
            });
        }
        if((this.htmlContent.trim().length ===0 )&& (this.bodyContent.trim().length === 0)){

        }
        else {
            //删除editor内容
            var length = this.editor.getLength()
            this.editor.deleteText(0, length-1)
            //插入html
            this.editor.clipboard.dangerouslyPasteHTML(0,this.htmlContent)
        }
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
    background-color:rgb(76,162,175);
}
/* 左边栏样式 */
.left {
    float: left;
    width:20%;
    height: 100%;
}
.reload {
    border-bottom:1px solid rgb(218,218,218);
    width:70%;
    float:left;
    margin-left: 20px;
}
.reload-img {
    margin:20px auto -10px auto;
    width:40%;
    height:100%;
    display: block;
    float: left;
}
.reload-num {
    display: block;
    float: left;
    font-size:65px;
    color:rgb(126,126,126);
    margin:38px 0px -10px 10px;
}
.show-all {
    width:70%;
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
    background-color:rgb(76,162,175);
}
.show-all-title {
    display: block;
    float: left;
    color: rgb(92,92,92);
    margin:15px 0 0 0;
    font-weight:lighter;
}
.mistakes {
    border-bottom:1px solid rgb(218,218,218);
    width:60%;
    float:left;
    margin-left: 20px;
    padding-bottom:30px;
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
    color: rgb(92,92,92);
    margin:15px 0 0 0;
    font-weight:lighter;
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
    width:140%;
    float: left;
    list-style: none;
    margin: 5px 0 0 -40px;
    padding-top:10px;
}
.list-title {
    width:80%;
    font-size:14px;
    color:rgb(169,169,169);
    display: block;
    float:left;
    margin:0 0 10px 0;
    padding-top: 10px;
    font-weight:lighter;
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
    width:60%;
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
    color: rgb(92,92,92);
    margin:15px 0 0 0;
    font-weight:lighter;
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
    margin-left: 20px;
    padding-bottom:30px;
}
.advanced-issues-img {
    width:14%;
    height:100%;
    float: left;
    position: relative;
    left:-30px;
}
.advanced-issues-title {
    display: block;
    float: left;
    color: rgb(92,92,92);
    margin:15px 0 0 0;
    position: relative;
    left:-35px;
    font-weight:lighter;
}
/* 中间栏样式 */
.middle {
    float: left;
    width:44%;
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
    font-size:30px;
    color:rgb(180,180,180);
    border: 0px;
    outline:none;
}
.body-paste {
    width:95%;
    height:80%;
    border: 0px;
    outline:none;
    color:rgb(92,92,92);
    font-size:20px;
    line-height: 200%;
    letter-spacing: 1px;
}
/* 右边栏样式 */
.right {
    float: left;
    width: 30%;
    height: 100%;
    margin-top: 125px;
}
.el-collapse {
    border: none;
    width:96%;
    margin: 0 auto 0 auto;
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