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
        <div class="show-all">
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
                <li id="mistakes-spelling" @mouseover="changeMS()" @mouseout="returnMS()">
                    <span class="list-title">SPELLING</span>
                    <div id="mistakes-spelling-circle" v-if="paperOn">
                        <span id="mistakes-spelling-num">{{errorSpelling}}</span>
                    </div>
                    <div class="clear-float">
                    </div>
                </li>
                <li id="mistakes-grammar" @mouseover="changeMG()" @mouseout="returnMG()">
                    <span class="list-title">GRAMMAR</span>
                    <div id="mistakes-grammar-circle" v-if="paperOn">
                        <span id="mistakes-grammar-num">{{errorGrammar}}</span>
                    </div>
                    <div class="clear-float">
                    </div>
                </li>
                <li id="mistakes-lexeme" @mouseover="changeML()" @mouseout="returnML()">
                    <span class="list-title">LEXEME</span>
                    <div id="mistakes-lexeme-circle" v-if="paperOn">
                        <span id="mistakes-lexeme-num">{{errorLexeme}}</span>
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
                <li id="suggestions-lexeme" @mouseover="changeSL()" @mouseout="returnSL()">
                    <span class="list-title">LEXEME</span>
                    <div id="suggestions-lexeme-circle" v-if="paperOn">
                        <span id="suggestions-lexeme-num">{{suggestLexeme}}</span>
                    </div>
                    <div class="clear-float">
                    </div>
                </li>
                <li id="suggestions-structure" @mouseover="changeSS()" @mouseout="returnSS()">
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
        <!-- <input class="title-paste" placeholder="PASTE PAPER TITLE" v-model="paperTitle"> -->
         <quill-editor class="title-paste"
                      ref="myTextEditor"
                      :content="titleContent"
                      :options="titleEditorOption"
                      @change="onTitleEditorChange($event)">
        </quill-editor>
        <!-- <input class="body-paste" placeholder="PASTE PAPER" v-model="paperBody" @input="toCheck(paperBody)"> -->
         <quill-editor class="body-paste"
                      ref="myTextEditor"
                      :content="bodyContent"
                      :options="bodyEditorOption"
                      @change="onBodyEditorChange($event)">
        </quill-editor>
        <!-- <div id="editor"
             ref="myTextEditor"
             v-model="bodyContent"
             :options="bodyEditorOption"
             @change="onBodyEditorChange($event)">
        </div> -->
    </div>
    <div class="splender-right">
    </div>
    <div class="right">
    </div>
</div>
</template>
<script> 
import Vue from 'vue'
import Quill from 'quill'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor)
// var quill = new Quill('#editor', {
//   theme: 'bubble'   // Specify theme in configuration
// });

export default {
  data () {
    return {
        paperOn: false,
        paperTitle:'',
        paperBody: '',
        errorSpelling: '',
        errorGrammar: '',
        errorLexeme: '',
        suggestLexeme: '',
        suggestStructure: '',
        sumNum: '' ,
        judgeAdd:'',
        errorSpellingPosL:'',
        errorSpellingPosR:'',
        errorSpellingRight:'',
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
        // this.bodyContent = text
        this.$http.post('/api/num', {
            paperBody: text
        }).then(res => {
            if(res.body.success) {
                //console.log(this.editor) 
                this.paperOn = true,
                this.errorSpelling = res.body.data.errorSpelling,
                this.errorGrammar = res.body.data.errorGrammar,
                this.errorLexeme = res.body.data.errorLexeme,
                this.suggestLexeme = res.body.data.suggestLexeme,
                this.suggestStructure = res.body.data.suggestStructure,
                this.sumNum = res.body.data.sumNum,
                this.errorSpellingPosL = res.body.data.errorSpellingPosL,
                this.errorSpellingPosR = res.body.data.errorSpellingPosR,
                this.errorSpellingRight =res.body.data.errorSpellingRight
                if ((this.judgeAdd != text) && text.length != 1) {
                    this.addSpellingTag(this.errorSpellingPosL,this.errorSpellingPosR,text)//给带修改的部分加span
                    this.changeEditor(text,html)
                    // console.log("text:" + text)
                    // console.log("judgeAdd:" +this.judgeAdd)
                    // console.log("text's length:" + text.length)
                    // console.log("judgeAdd's length:"+this.judgeAdd.length)
                    this.judgeAdd = text
                }
            }
            else {
                alert(error)
            }
        })
    },
    addSpellingTag(L,R,content) {
        this.bodyContentArray=content.replace(/(.)(?=[^$])/g,"$1,").split(",")//将内容变成数组
        for (let i = L; i<=R ; i++) {
            this.spanArray.push(this.bodyContentArray[i])
        }
        // 加span
        var re = this.spanArray.join("")
        var str = this.bodyContentArray.join("") 
        this.spanString = str.replace(re, function(x) {
            return '<span style="color:red">' + x + '</span>';
        });
    },
    changeEditor(text,html) {
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
            console.log("htmlContent:"+this.htmlContent)
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
.errorSpelling {
    color:red;
}
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
    width:30%;
    height:100%;
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