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
            <div class="mistakes-all">
                <div class="mistakes-circle">
                </div>
                <span class="mistakes-title" @click="toShowMistake()">错误</span>
            </div>
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
            <div class="suggestions-all">
                <div class="suggestions-circle">
                </div>
                <span class="suggestions-title" @click="toShowSuggestion()">建议</span>
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
    <div class="middle">
        <quill-editor class="title-paste"
                      ref="myTextEditor"
                      :content="titleContent"
                      :options="titleEditorOption">
        </quill-editor>
        <!-- <quill-editor class="body-paste"
                      ref="myTextEditor"
                      @focus="onEditorFocus()"
                      :content="bodyContent"
                      :options="bodyEditorOption">
        </quill-editor> -->
        <quill-editor class="body-paste"
                      id="body-paste"
                      ref="myTextEditor"
                      :content="bodyContent"
                      :options="bodyEditorOption"
                      @focus="getEventTrigger($event)">
        </quill-editor>
    </div>
    <div class="splender-right">
    </div>
    <div class="right">
        <el-collapse v-model="activeNames" @change="handleChange" ref="accordion">
            <el-collapse-item v-for="(el,index) in errorSpellingArr" :key="index"  v-if="showESpelling" :name="el.id" >
                <template slot="title">
                    <li class="right-spelling">{{el.rep}}</li>
                </template>
                <div class="es-second-floor">
                    <span v-html="el.exp"></span>
                    
                    <!-- 以下是后端传回的html样式 -->
                    <!-- <div style="background:rgb(79,145,210);width:140px;margin:20px;position:relative;top:10px">
                        <li style="color:#fff;text-indent:5px;">单词拼写错误</li>
                    </div>
                    <div style="margin:0 10px 0 20px;font-size:18px">
                        <span style="text-decoration:line-through; color:#FF0000"><span style="color:#000">efficiant</span></span>
                        <img src="/static/img/array.png" style="width:40px;">
                        <span style="background:rgb(79,145,210);color:#fff;padding:4px;">efficient</span>
                    </div>
                    <div style="margin:10px 10px 10px 20px;">One cares about making the process repeatable and <span style="color:rgb(79,145,210);font-weight:bold">efficient</span></div>
                 -->
                </div>
            </el-collapse-item>
            <el-collapse-item v-for="(el,index) in errorGrammarArr" :key="`A-${index}`"  v-if="showEGrammar" :name="el.id" >
                <template slot="title">
                    <li class="right-grammar">{{el.rep}}</li>
                </template>
                <div class="eg-second-floor">
                    <span v-html="el.exp"></span>
                    
                    <!-- 以下是后端传回的html样式 -->
                    <!-- <div style="background:rgb(79,145,210);width:140px;margin:20px;position:relative;top:10px" >
                        <li style="color:#fff;text-indent:5px;">词组搭配错误</li>
                    </div>
                    <div style="margin-left:20px;font-size:18px">
                        <span style="text-decoration:line-through; color:#FF0000"><span style="color:#000">convenient for</span></span>
                        <img src="/static/img/array.png" style="width:40px;">
                        <span style="background:rgb(79,145,210);color:#fff;padding:4px;">convenient to</span>
                    </div>
                    <div style="font-weight:bold;color:rgb(113,113,113);margin:10px 10px 0 20px;">A <span style="background:rgb(79,145,210);color:#fff">convenient</span> time <span style="background:rgb(79,145,210);color:#fff">for</span> receive guests.</div>
                    <div style="color:rgb(117,117,117);margin:0 10px 0 20px;line-height:15px;">suitable for your purpose and needs and causing xxx</div>
                    <div style="color:rgb(79,145,210);font-weight:bold;font-size:17px;margin:0 10px 0 20px;">examples</div>
                    <div style="color:rgb(117,117,117);font-style:oblique;margin:0 10px 10px 20px;line-height:15px;">
                        <span>This place is close and <span>convenient to</span> the street car</span>
                    </div> -->
                
                </div>
            </el-collapse-item>
            <el-collapse-item v-for="(el,index) in errorSemanticArr" :key="`B-${index}`" v-if="showESemantic" :name="el.id" >
                <template slot="title">
                    <li class="right-semantic">{{el.rep}}</li>
                </template>
                <div class="ese-second-floor">
                    <span v-html="el.exp"></span>

                    <!-- 以下是后端传回的html样式 -->
                   <!-- <div style="background:rgb(79,145,210);width:140px;margin:20px;position:relative;top:10px" >
                        <li style="color:#fff;text-indent:5px;">知识性错误</li>
                    </div>
                    <div style="margin:0 10px 0 20px">整句话无语法性错误，但语义有知识性错误</div>
                    <div style="margin:0 10px 0 20px;color:rgb(117,117,117);">The <span style="color:#ff0000">Imperial Palace</span> has a long history originated in <span style="color:#ff0000;text-decoration:line-through;">Qing</span> Dynasty</div>
                    <div style="margin:0 10px 0 20px;color:rgb(79,145,210);">The Imperial Palace has a long history originated in Ming Dynasty</div>-->
                </div>
            </el-collapse-item>
            <el-collapse-item v-for="(el,index) in suggestSpellingArr" :key="`C-${index}`" v-if="showSSpelling" :name="el.id" >
                <template slot="title">
                    <li class="suggest-spelling">{{el.rep}}</li>
                </template>
                <div class="ese-second-floor">
                    <span v-html="el.exp"></span>

                    <!-- 以下是后端传回的html样式 -->
                    <!-- <div style="background:rgb(79,145,210);width:140px;margin:20px;position:relative;top:10px" >
                        <li style="color:#fff;text-indent:5px;">单词拼写错误</li>
                    </div>
                    <div style="margin:0 10px 0 20px;font-size:18px">
                        <span style="text-decoration:line-through; color:rgb(238,188,80)"><span style="color:#000">efficiant</span></span>
                        <img src="/static/img/array.png" style="width:40px;">
                        <span style="background:rgb(79,145,210);color:#fff;padding:4px;">efficient</span>
                    </div>
                    <div style="margin:10px 10px 10px 20px;">One cares about making the process repeatable and <span style="color:rgb(79,145,210);font-weight:bold">efficient</span></div>
                 -->
                </div>
            </el-collapse-item>
            <el-collapse-item v-for="(el,index) in suggestGrammarArr" :key="`D-${index}`" v-if="showSGrammar" :name="el.id" >
                <template slot="title">
                    <li class="suggest-grammar">{{el.rep}}</li>
                </template>
                <div class="ese-second-floor">
                    <span v-html="el.exp"></span>

                    <!-- 以下是后端传回的html样式 -->
                    <!-- <div style="background:rgb(79,145,210);width:140px;margin:20px;position:relative;top:10px" >
                        <li style="color:#fff;text-indent:5px;">词组搭配错误</li>
                    </div>
                    <div style="margin-left:20px;font-size:18px">
                        <span style="text-decoration:line-through; color: rgb(238,188,80);"><span style="color:#000">convenient for</span></span>
                        <img src="/static/img/array.png" style="width:40px;">
                        <span style="background:rgb(79,145,210);color:#fff;padding:4px;">convenient to</span>
                    </div>
                    <div style="font-weight:bold;color:rgb(113,113,113);margin:10px 10px 0 20px;">A <span style="background:rgb(79,145,210);color:#fff">convenient</span> time <span style="background:rgb(79,145,210);color:#fff">for</span> receive guests.</div>
                    <div style="color:rgb(117,117,117);margin:0 10px 0 20px;line-height:15px;">suitable for your purpose and needs and causing xxx</div>
                    <div style="color:rgb(79,145,210);font-weight:bold;font-size:17px;margin:0 10px 0 20px;">examples</div>
                    <div style="color:rgb(117,117,117);font-style:oblique;margin:0 10px 10px 20px;line-height:15px;">
                        <span>This place is close and <span>convenient to</span> the street car</span>
                    </div> -->
                
                </div>
            </el-collapse-item>
            <el-collapse-item v-for="(el,index) in suggestSemanticArr" :key="`E-${index}`" v-if="showSSemantic" :name="el.id" >
                <template slot="title">
                    <li class="suggest-semantic">{{el.rep}}</li>
                </template>
                <div class="ss-second-floor">
                    <span v-html="el.exp"></span>

                    <!-- 以下是后端传回的html样式 -->
                    <!-- <div style="background:rgb(79,145,210);width:140px;margin:20px;position:relative;top:10px" >
                        <li style="color:#fff;text-indent:5px;">知识性错误</li>
                    </div>
                    <div style="margin:0 10px 0 20px">整句话无语法性错误，但语义有知识性错误</div>
                    <div style="margin:0 10px 0 20px;color:rgb(117,117,117);">The <span style="color: rgb(238,188,80);">Imperial Palace</span> has a long history originated in <span style="color:rgb(238,188,80);text-decoration:line-through;">Qing</span> Dynasty</div>
                    <div style="margin:0 10px 0 20px;color:rgb(79,145,210);">The Imperial Palace has a long history originated in Ming Dynasty</div> -->

                </div>
            </el-collapse-item>
            <el-collapse-item v-for="(el,index) in suggestStructureArr" :key="`F-${index}`" v-if="showSStructure" :name="el.id" >
                <template slot="title">
                    <li class="suggest-structure">{{el.rep}}</li>
                </template>
                <div class="sst-second-floor">
                    <span v-html="el.exp"></span>

                    <!-- 以下是后端传回的html样式 -->
                    <!-- <div style="background:rgb(79,145,210);width:140px;margin:20px;position:relative;top:10px" >
                        <li style="color:#fff;text-indent:5px;">句式结构错误</li>
                    </div>
                    <div style="margin:0 10px 0 20px">从句式结构考虑，整句话有累赘错误</div>
                    <div style="margin:0 10px 0 20px;color:rgb(117,117,117);">The <span style="color:rgb(238,188,80);text-decoration:line-through;">Imperial Palace</span> has a long history originated in Dynasty</div>
                    <div style="margin:0 10px 0 20px;color:rgb(79,145,210);">The Imperial Palace has a long history originated in Ming Dynasty</div> -->

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
var IdAttribute = new Parchment.Attributor.Attribute('id', 'id', {
    scope: Parchment.Scope.INLINE,
});
Quill.register(boxAttributor);
Quill.register({
    'attributors/attribute/id': IdAttribute
}, true);

Quill.register({
    'formats/id': IdAttribute,
}, true);
export default {
  data () {
    return {
        paperOn: false,
        showESpelling: true,
        showEGrammar: true,
        showESemantic: true,
        showSSpelling:true,
        showSGrammar:true,
        showSSemantic: true,
        showSStructure: true,
        paperTitle:'',
        paperBody: '',
        errorSpelling: '',
        errorGrammar: '',
        errorSemantic: '',
        suggestSpelling:'',
        suggestGrammar:'',
        suggestSemantic: '',
        suggestStructure: '',
        sumNum: '' ,
        judgeAdd:'',
        errorSpellingArr: [],
        errorGrammarArr: [],
        errorSemanticArr:[],
        suggestSpellingArr: [],
        suggestGrammarArr: [],
        suggestSemanticArr: [],
        judgeFlag: 0,
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
    getEventTrigger($event) {
        var id = event.target.id
        this.openBoard(id)
    }, 
    openBoard(id) {
        this.activeNames = [parseInt(id)]
    },
    handleChange(va) {
        // console.log(va)
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
            MGC.style.cursor = "pointer";
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
            MLC.style.cursor = "pointer";
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
    changeSSP() {
        var SLli = document.getElementById("suggestions-spelling");
        SLli.style.backgroundColor = "#eaeaea";
        var SSP = document.getElementById("suggestion-spelling-circle");
        if (SSP) {
            SSP.style.backgroundColor = "#ef4632";
            SSP.style.cursor = "pointer";
        };
        var SSP = document.getElementById("suggestion-spelling-num");
        if (SSP) {
            SSP.style.color = "white"; 
        }
    },
    returnSSP() {
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
    },
    changeSG() {
        var SLli = document.getElementById("suggestions-grammar");
        SLli.style.backgroundColor = "#eaeaea";
        var SLC = document.getElementById("suggestion-grammar-circle");
        if (SLC) {
            SLC.style.backgroundColor = "#ef4632";
            SLC.style.cursor = "pointer";
        };
        var SLN = document.getElementById("suggestion-grammar-num");
        if (SLN) {
            SLN.style.color = "white"; 
        }
    },
    returnSG() {
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
    },
    changeSL() {
        var SLli = document.getElementById("suggestions-lexeme");
        SLli.style.backgroundColor = "#eaeaea";
        var SLC = document.getElementById("suggestion-lexeme-circle");
        if (SLC) {
            SLC.style.backgroundColor = "#ef4632";
            SLC.style.cursor = "pointer";
        };
        var SLN = document.getElementById("suggestion-lexeme-num");
        if (SLN) {
            SLN.style.color = "white"; 
        }
    },
    returnSL() {
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
    },
    changeSS() {
        var SSli = document.getElementById("suggestions-structure");
        SSli.style.backgroundColor = "#eaeaea";
        var SSC = document.getElementById("suggestion-structure-circle");
        if (SSC) {
            SSC.style.backgroundColor = "#ef4632";
            SSC.style.cursor = "pointer";
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
    onEditorFocus() {
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
    changeHtml() {
        setInterval(() => {
            if(this.editor.container.firstChild.innerText.trim() == this.htmlContent.trim() || this.editor.container.firstChild.innerText.trim()=="") return     
            let originContent = this.editor.container.firstChild.innerText
            this.$http.post('/api/num', {
                paperBody: this.editor.getText()
            }).then(res => {
                if(res.body.success) {
                    let text = this.editor.getText()
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
                    let resArr = []
                    let catArr = [this.errorSpellingArr, this.errorGrammarArr, this.errorSemanticArr, 
                    this.suggestSpellingArr,this.suggestGrammarArr,this.suggestSemanticArr, this.suggestStructureArr]
                    catArr.forEach(cat => {                        
                        cat.forEach(item => {
                            if(item.end) {
                               for(let i = 0; i< item.end.length; i++) {
                                resArr.push({
                                    start: item.start[i],
                                    end: item.end[i],
                                    type: item.type,
                                    id: item.id
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
                            if(item.end > text.length) return
                            text = insert_flg(text, item.end, '</span>')
                            text = insert_flg(text, item.start, '<span class="line-error" id="'+item.id+'" >')
                        }
                        else {
                            if(item.end > text.length) return
                            text = insert_flg(text, item.end, '</span>')
                            text = insert_flg(text, item.start, '<span class="line-suggest" id="'+item.id+'" >')
                        }
                    });
                    this.cursorIndex = this.editor.getSelection().index
                    this.editor.deleteText(0, this.editor.getLength()+1)
                    //插入html
                    this.editor.clipboard.dangerouslyPasteHTML(0,text)
                    this.editor.setSelection(this.cursorIndex, 0)
                    this.htmlContent = originContent
                }
            })
        },3000)
    },
    toShowAll() {
        this.showESpelling = true,
        this.showEGrammar = true,
        this.showESemantic = true,
        this.showSSpelling = true,
        this.showSGrammar = true,
        this.showSSemantic = true,
        this.showSStructure = true
    },
    toShowMistake() {
        this.showESpelling = true,
        this.showEGrammar = true,
        this.showESemantic = true,
        this.showSSpelling = false,
        this.showSGrammar = false,
        this.showSSemantic = false,
        this.showSStructure = false
    },
    toShowSuggestion() {
        this.showESpelling = false,
        this.showEGrammar = false,
        this.showESemantic = false,
        this.showSSpelling = true,
        this.showSGrammar = true,
        this.showSSemantic = true,
        this.showSStructure = true
    },
    toShowESpelling() {
        this.showESpelling = true,
        this.showEGrammar = false,
        this.showESemantic = false,
        this.showSSpelling = false,
        this.showSGrammar = false,
        this.showSSemantic = false,
        this.showSStructure = false
    },
    toShowEGrammar() {
        this.showESpelling = false,
        this.showEGrammar = true,
        this.showESemantic = false,
        this.showSSpelling = false,
        this.showSGrammar = false,
        this.showSSemantic = false,
        this.showSStructure = false
    },
    toShowESemantic() {
        this.showESpelling = false,
        this.showEGrammar = false,
        this.showESemantic = true,
        this.showSSpelling = false,
        this.showSGrammar = false,
        this.showSSemantic = false,
        this.showSStructure = false
    },
    toShowSSpelling() {
        this.showESpelling = false,
        this.showEGrammar = false,
        this.showESemantic = false,
        this.showSSpelling = true,
        this.showSGrammar = false,
        this.showSSemantic = false,
        this.showSStructure = false
    },
    toShowSGrammar() {
        this.showESpelling = false,
        this.showEGrammar = false,
        this.showESemantic = false,
        this.showSSpelling = false,
        this.showSGrammar = true,
        this.showSSemantic = false,
        this.showSStructure = false
    },
    toShowSSemantic() {
        this.showESpelling = false,
        this.showEGrammar = false,
        this.showESemantic = false,
        this.showSSpelling = false,
        this.showSGrammar = false,
        this.showSSemantic = true,
        this.showSStructure = false
    },
    toShowSStructure() {
        this.showESpelling = false,
        this.showEGrammar = false,
        this.showESemantic = false,
        this.showSSpelling = false,
        this.showSGrammar = false,
        this.showSSemantic = false,
        this.showSStructure = true
    }
  },
  created() {
  },
  computed: {
    editor() {
        console.log(this.$refs.accordion)
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
    width:100%;
    float:left;
    padding-bottom:10px;
}
.show-all:hover {
    font-weight: bolder;
    cursor: pointer;
    background-color:rgb(234,234,234);
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
.mistakes-all:hover {
    font-weight: bolder;
    cursor: pointer;
    background-color:rgb(234,234,234);
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
.suggestions-all:hover {
    font-weight: bolder;
    cursor: pointer;
    background-color:rgb(234,234,234);
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
    left:-6px;
    top:2px;
    z-index: 10;
}
#suggestion-grammar-num {
    display: block; 
    float:right;
    color:rgb(137,137,137);
    position: relative;
    left:-6px;
    top:2px;
    z-index: 10;
}
#suggestion-lexeme-num {
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
    margin-top: 125px;
    margin-left:1px;
}
.el-collapse {
    border: none;
    width:96%;
    margin: 0 auto 0  0;
}
.right-spelling {
    color: red;
    height: 30px;
    margin: 0 40px 10px 2px;
    font-size: 16px;
}
.right-grammar {
    color: red;
    height: 30px;
    margin: 0 40px 10px 2px;
    font-size: 16px;
}
.right-semantic {
    color: red;
    height: 30px;
    margin: 0 40px 10px 2px;
    font-size: 16px;
}
.suggest-spelling {
    color: rgb(238,188,80);
    height: 30px;
    margin: 0 40px 10px 2px;
    font-size: 16px;
}
.suggest-grammar {
    color: rgb(238,188,80);
    height: 30px;
    margin: 0 40px 10px 2px;
    font-size: 16px;
}
.suggest-semantic {
    color: rgb(238,188,80);
    height: 30px;
    margin: 0 40px 10px 2px;
    font-size: 16px;
}
.suggest-structure {
    color: rgb(238,188,80);
    height: 30px;
    margin: 0 40px 10px 2px;
    font-size: 16px;
}
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
