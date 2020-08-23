(this["webpackJsonpbias-awareness-platform"]=this["webpackJsonpbias-awareness-platform"]||[]).push([[0],{28:function(e,t,a){e.exports=a.p+"static/media/graph.2a2e6249.png"},57:function(e,t,a){e.exports=a(87)},62:function(e,t,a){},64:function(e,t,a){},65:function(e,t,a){},66:function(e,t,a){},67:function(e,t,a){},72:function(e,t,a){},77:function(e,t,a){},78:function(e,t,a){},79:function(e,t,a){e.exports=a.p+"static/media/dataset_fill.94d25a65.svg"},80:function(e,t,a){e.exports=a.p+"static/media/dataset.e73d48bf.svg"},81:function(e,t,a){e.exports=a.p+"static/media/classifier_fill.6e22b02e.svg"},82:function(e,t,a){e.exports=a.p+"static/media/classifier.9cfac40f.svg"},83:function(e,t,a){e.exports=a.p+"static/media/prediction_fill.aea17280.svg"},84:function(e,t,a){e.exports=a.p+"static/media/prediction.ae83db9c.svg"},85:function(e,t,a){},87:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(17),l=a.n(i),c=a(15),s=a(8),o=(a(62),a(63),a(64),a(4)),u=a(5),m=a(7),d=a(6),h=(a(65),function(e){Object(m.a)(a,e);var t=Object(d.a)(a);function a(){var e;Object(o.a)(this,a);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(e=t.call.apply(t,[this].concat(r))).goToLink=function(){window.location.href=e.props.link},e}return Object(u.a)(a,[{key:"render",value:function(){return r.a.createElement("div",{className:this.props.className},r.a.createElement("button",{className:"button",onClick:this.goToLink},this.props.name))}}]),a}(n.Component)),p=a(93),f=a(94);var E=function(){return r.a.createElement("div",{className:"App"},r.a.createElement("h1",{className:"text-center"}," Activity 1. Bias in Hate Speech Detection "),r.a.createElement("p",null," In this activity, a member of high school board would like to have a feedback about their school facility and faculty. However, following the school policy, the board doesn't want to include feedbacks that include toxic or abusive words. On the other hand, the school board is concerned that some of the underrepresented group of student can be unnecessarily filtered out"),r.a.createElement(p.a,{className:"text-center"},r.a.createElement(f.a,{md:{span:3,offset:2}},r.a.createElement("div",{className:"comment-sample"}," The school lunch is delicious, but I wish the portion could be more fulfilling "),r.a.createElement("div",{className:"comment-label"}," Acceptable comment ")),r.a.createElement(f.a,{md:{span:3,offset:2}},r.a.createElement("div",{className:"comment-sample"}," The school lunch sucks! "),r.a.createElement("div",{className:"comment-label"}," Unacceptable "))),r.a.createElement("p",null," Your task is to create a model that can automatically detect and remove such feedback, while taking the school board concern into consideration"),r.a.createElement("div",{className:"text-center"},r.a.createElement(h,{name:"Start Activity",link:"/bias-awareness-platform/#/code"})))},b=(a(66),function(e){Object(m.a)(a,e);var t=Object(d.a)(a);function a(){return Object(o.a)(this,a),t.apply(this,arguments)}return Object(u.a)(a,[{key:"render",value:function(){return r.a.createElement("div",{className:"page-box code-notebook"},r.a.createElement("h1",{className:"text-center"}," Build the Model "),r.a.createElement("p",null," Build the classifier to detect the abusive and toxic feedbacks. For the purpose of the evaluation, use the variable ",r.a.createElement("span",null," dataset ")," as the initial data"),r.a.createElement("h2",null," Data Preprocessing "),r.a.createElement("textarea",{rows:"8"}),r.a.createElement("h2",null," Feature Generation "),r.a.createElement("textarea",{rows:"10"}),r.a.createElement("h2",null," Running the Model "),r.a.createElement("textarea",{rows:"5"}),r.a.createElement(h,{name:"Build",link:"/bias-awareness-platform/#/visualization",className:"text-center mt"}))}}]),a}(n.Component)),v=a(20),g=(a(67),function(e){Object(m.a)(a,e);var t=Object(d.a)(a);function a(e){var n;return Object(o.a)(this,a),(n=t.call(this,e)).progressRef=r.a.createRef(),n.state={current_step:n.props.current_step,first_step:"bar-icon-uncompleted",second_step:"bar-icon-uncompleted",third_step:"bar-icon-uncompleted",fourth_step:"bar-icon-uncompleted",fifth_step:"bar-icon-uncompleted",refresh:!1},n.createProgress=n.createProgress.bind(Object(v.a)(n)),n}return Object(u.a)(a,[{key:"componentWillReceiveProps",value:function(e){e.currentStep!==this.props.current_step&&this.setState({current_step:e.current_step,refresh:!0})}},{key:"componentDidUpdate",value:function(){console.log(this.state.current_step),this.state.refresh&&this.updateProgress()}},{key:"componentDidMount",value:function(){console.log(this.props),this.updateProgress()}},{key:"goToEvaluation",value:function(){window.location.href="/bias-awareness-platform/#/evaluation"}},{key:"updateProgress",value:function(){for(var e=["bar-icon-uncompleted","bar-icon-uncompleted","bar-icon-uncompleted","bar-icon-uncompleted","bar-icon-uncompleted"],t=0;t<5;t++)t+1<this.state.current_step?e[t]="bar-icon-completed":t+1===this.state.current_step&&(e[t]="bar-icon");console.log(e),this.setState({first_step:e[0],second_step:e[1],third_step:e[2],fourth_step:e[3],fifth_step:e[4],refresh:!1})}},{key:"createProgress",value:function(){var e=this.props.location.pathname,t=r.a.createElement("li",null,r.a.createElement(c.b,{to:"/code",style:{color:"black"}},r.a.createElement("div",{className:"last-cat "+this.state.first_step}),r.a.createElement("p",null," Create model "))),a=r.a.createElement("li",null,r.a.createElement(c.b,{to:"/visualization",style:{color:"black"}},r.a.createElement("div",{className:this.state.second_step}),r.a.createElement("p",null," Result visualization "))),n=r.a.createElement("li",null,r.a.createElement(c.b,{to:"/evaluation",style:{color:"black"}},r.a.createElement("div",{className:this.state.third_step}),r.a.createElement("p",null," Evaluation "))),i=r.a.createElement("li",null,r.a.createElement(c.b,{to:"/mitigation",style:{color:"black"}},r.a.createElement("div",{className:this.state.fourth_step}),r.a.createElement("p",null," Bias mitigation "))),l=r.a.createElement("li",null,r.a.createElement(c.b,{to:"/comparison",style:{color:"black"}},r.a.createElement("div",{className:this.state.fifth_step}),r.a.createElement("p",null," Comparison and Evaluation "))),s="";return e.includes("visualization")&&(s=r.a.createElement("div",{className:"question-btn",onClick:this.goToEvaluation},"Question")),r.a.createElement("div",{className:"step-progress"},r.a.createElement("ul",{className:"step-ul"},t,a,n,i,l),s)}},{key:"render",value:function(){return this.createProgress()}}]),a}(n.Component)),y=(a(72),function(e){Object(m.a)(a,e);var t=Object(d.a)(a);function a(e){var n;return Object(o.a)(this,a),(n=t.call(this,e)).state={cauc_thres:"active",aae_thres:"active"},n}return Object(u.a)(a,[{key:"changeThreshold",value:function(e){"cauc"===e?""===this.state.cauc_thres?this.setState({cauc_thres:"active"}):this.setState({cauc_thres:""}):""===this.state.aae_thres?this.setState({aae_thres:"active"}):this.setState({aae_thres:""})}},{key:"render",value:function(){var e=this;return r.a.createElement(p.a,null,r.a.createElement(f.a,{className:"constraint",md:{span:4}},r.a.createElement("h3",null," Constraint "),r.a.createElement("ul",null,r.a.createElement("li",null," ",r.a.createElement("input",{type:"radio",name:"constraint",value:"1",defaultChecked:!0})," Race blind "),r.a.createElement("li",null," ",r.a.createElement("input",{type:"radio",name:"constraint",value:"2"})," Demographic parity "),r.a.createElement("li",null," ",r.a.createElement("input",{type:"radio",name:"constraint",value:"3"})," Equal Opportunity "),r.a.createElement("li",null," ",r.a.createElement("input",{type:"radio",name:"constraint",value:"4"})," Equalized odds "))),r.a.createElement(f.a,{className:"toxic-thres",md:{span:4}},r.a.createElement("h3",null," Toxicity Threshold "),r.a.createElement("div",{className:"check-group"},r.a.createElement("div",{className:"check-box "+this.state.cauc_thres,id:"cauc",onClick:function(t){return e.changeThreshold(t.target.id)}}," ")," ",r.a.createElement("span",null," Caucasian ")),r.a.createElement("div",{className:"check-group"},r.a.createElement("div",{className:"check-box "+this.state.aae_thres,id:"aae",onClick:function(t){return e.changeThreshold(t.target.id)}}," ")," ",r.a.createElement("span",null," African American "))))}}]),a}(n.Component)),k=function(e){Object(m.a)(a,e);var t=Object(d.a)(a);function a(){return Object(o.a)(this,a),t.apply(this,arguments)}return Object(u.a)(a,[{key:"render",value:function(){return r.a.createElement("div",{className:"visual-dataset"},r.a.createElement("h3",null," Dataset "),r.a.createElement("ul",null,r.a.createElement("li",null," ",r.a.createElement("input",{type:"radio",name:"dataset",value:"data1",defaultChecked:!0})," Dataset 1"),r.a.createElement("li",null," ",r.a.createElement("input",{type:"radio",name:"dataset",value:"data2"})," Dataset 2 "),r.a.createElement("li",null," ",r.a.createElement("input",{type:"radio",name:"dataset",value:"data3"})," Dataset 3 ")))}}]),a}(n.Component),_=a(51),x=a(33),O=function(e){Object(m.a)(n,e);var t=Object(d.a)(n);function n(e){var a;return Object(o.a)(this,n),(a=t.call(this,e)).closeTour=function(){a.setState({isTourOpen:!1})},a.disableBody=function(e){return Object(x.a)(e)},a.enableBody=function(e){return Object(x.b)(e)},a.state={dataset_active:"active",model_active:"",isTourOpen:!1},a}return Object(u.a)(n,[{key:"changeActiveState",value:function(e){console.log(e),"dataset-tab"===e&&""===this.state.dataset_active?this.setState({dataset_active:"active",model_active:""}):"model-tab"===e&&""===this.state.model_active&&this.setState({dataset_active:"",model_active:"active"})}},{key:"changeContent",value:function(){return"active"===this.state.dataset_active?r.a.createElement(k,null):r.a.createElement(y,null)}},{key:"componentDidMount",value:function(){this.setState({isTourOpen:!0})}},{key:"render",value:function(){var e=this,t=[{selector:"",content:function(){return r.a.createElement("div",null,r.a.createElement("h3",{className:"text-center"}," Visualizing the Result "),r.a.createElement("p",null," In this step you can see the result of the model that you have made in the previous step, and also interact with the components of the process to see how it affect the fairness of a model"))}},{selector:".graph-box",content:function(){return r.a.createElement("div",null,r.a.createElement("h3",{style:{textAlign:"center"}}," Graph "),r.a.createElement("p",null," This graph plot each of the feedback\u2019s probability of being toxic against the probability of it using AAE dialect. The higher its toxic probability, the higher it chance to be classified as toxic "),r.a.createElement("p",null," The higher its toxic probability, the higher it chance to be classified as toxic. On the other hand, the higher its AAE dialect probability, the higher it is to come from African American students"))}},{selector:".result-box",content:function(){return r.a.createElement("div",null,r.a.createElement("h3",{className:"text-center"}," Result Box "),r.a.createElement("p",null," The result box display not only the accuracy result for the model, but also the racial bias of the model "),r.a.createElement("p",null," The fairness metrics is determined as how non-discriminatory is the classifier."))}},{selector:".toxic-thres",content:function(){return r.a.createElement("div",{onLoad:e.changeActiveState("model-tab")},r.a.createElement("h3",{className:"text-center"}," Toxicity Threshold "),r.a.createElement("p",null," Toxicity threshold is the decision threshold for toxic feedback. Any feedback that has toxic probability above toxic threshold is considered as toxic. "),r.a.createElement("p",null," The toxicity threshold may differ between groups, depending on the constraint"))}},{selector:".constraint",content:function(){return r.a.createElement("div",null,r.a.createElement("h3",{className:"text-center"}," Constraints "),r.a.createElement("p",null," Constraint affect the toxicity decision, since different constraints result in different toxicity threshold. This further lead to different level of accuracy and fairness. "))}},{selector:".question-btn",content:function(){return r.a.createElement("div",null,r.a.createElement("h3",{className:"text-center"}," Explore and Observe "),r.a.createElement("p",null," There will be a few questions in the next step, so explore and observe as much as you can. "),r.a.createElement("p",null," Once you\u2019re done, click the question box on the top right corner. Don\u2019t worry, you can go back again if you want to"))},position:"middle"}];return r.a.createElement("div",{className:"visualization page-box"},r.a.createElement("div",{className:"vis-header"},r.a.createElement("h1",null," Abusive Speech Detection Result ")),r.a.createElement(p.a,{className:"visual-container"},r.a.createElement(f.a,{md:{span:4,offset:2}}," ",r.a.createElement("img",{src:a(28),className:"graph-box",alt:"graph"})," "),r.a.createElement(f.a,{md:{span:3,offset:1}},r.a.createElement("ul",{className:"legend-box"},r.a.createElement("li",{id:"legend-toxic"}," Toxic text "),r.a.createElement("li",{id:"legend-nontoxic"}," Non-toxic text ")),r.a.createElement("div",{className:"result-box"},r.a.createElement("h2",null," Result "),r.a.createElement("ul",null,r.a.createElement("li",null," Precision: 0.76 "),r.a.createElement("li",null," Recall: 0.89 "),r.a.createElement("li",null," Fairness metrics: ___ "))))),r.a.createElement("ul",{className:"choices"},r.a.createElement("li",{className:this.state.dataset_active,id:"dataset-tab",onClick:function(t){return e.changeActiveState(t.currentTarget.id)}}," Dataset "),r.a.createElement("li",{className:this.state.model_active,id:"model-tab",onClick:function(t){return e.changeActiveState(t.currentTarget.id)}}," Model ")),r.a.createElement("div",{className:"interact-container"},this.changeContent()),r.a.createElement(_.a,{steps:t,isOpen:this.state.isTourOpen,onRequestClose:this.closeTour,onAfterOpen:this.disableBody,onBeforeClose:this.enableBody}))}}]),n}(n.Component),w=(a(77),function(e){Object(m.a)(a,e);var t=Object(d.a)(a);function a(){return Object(o.a)(this,a),t.apply(this,arguments)}return Object(u.a)(a,[{key:"render",value:function(){return r.a.createElement("div",{className:"evaluation page-box"},r.a.createElement("h1",null," Evaluation and Questions "),r.a.createElement("p",null," After building the model and see the visualization of the result, here are some questions that you need to answer"),r.a.createElement("p",null," In case you need to see the visualization again, you can click the result button on the right corner "),r.a.createElement("form",null,r.a.createElement("label",null," 1. Based on the visualization and the result, do you find any noteworthy finding? What do you think cause this? "),r.a.createElement("textarea",null),r.a.createElement("label",null," 2. Once you try several other datasets, did you notice any different between datasets? What do you think cause this? "),r.a.createElement("textarea",null),r.a.createElement("label",null," 3. Which dataset do you think is better out of the ones that you try? Why do you think so? "),r.a.createElement("textarea",null),r.a.createElement("label",null,' 4. From the definitions of the metrics that are shown in the "model" tab, which one do you think is the fairest for both groups? Why?  '),r.a.createElement("textarea",null),r.a.createElement("label",null," 5. Try and change the metrics several times. Did you notice any changes? (e.g in term of distribution and accuracy) "),r.a.createElement("textarea",null),r.a.createElement("label",null," 6. Now that you've tried several metrics, which one do you think is the fairest for both groups? Why? "),r.a.createElement("textarea",null)),r.a.createElement("div",{className:"text-center"},r.a.createElement(h,{name:"Submit",link:"/bias-awareness-platform/#/mitigation"})))}}]),a}(n.Component)),C=(a(78),function(e){Object(m.a)(a,e);var t=Object(d.a)(a);function a(){return Object(o.a)(this,a),t.apply(this,arguments)}return Object(u.a)(a,[{key:"chooseAlgo",value:function(){var e=this,t=r.a.createElement("tr",null,r.a.createElement("td",{onClick:function(t){return e.handleClick(t.currentTarget.id)},id:"reject-option"},r.a.createElement("h3",null," Reject Option Classification "),r.a.createElement("p",null," Changes prediction result from a classifier to make it fairer ")),r.a.createElement("td",{onClick:function(t){return e.handleClick(t.currentTarget.id)},id:"equal-odd"},r.a.createElement("h3",null," Equalized odds "),r.a.createElement("p",null," Modify the predicted labels using an optimized scheme ")),r.a.createElement("td",{onClick:function(t){return e.handleClick(t.currentTarget.id)},id:"calibrated-odd"},r.a.createElement("h3",null," Calibrated Equalized odds "),r.a.createElement("p",null," Optimize over calibrated score to make the prediction fairer "))),a=r.a.createElement("tr",null,r.a.createElement("td",{onClick:function(t){return e.handleClick(t.currentTarget.id)},id:"advers-debias"},r.a.createElement("h3",null," Adversarial Debiasing "),r.a.createElement("p",null," Use adversarial technique to maximize accuracy and reduce evidence of protected attributes ")),r.a.createElement("td",{onClick:function(t){return e.handleClick(t.currentTarget.id)},id:"prejudice-remove"},r.a.createElement("h3",null," Prejudice Remover "),r.a.createElement("p",null," Adds a discrimination-aware regularization term to learning objective ")),r.a.createElement("td",{onClick:function(t){return e.handleClick(t.currentTarget.id)},id:"meta-fair"},r.a.createElement("h3",null," Meta Fair Classifier "),r.a.createElement("p",null," Take fairness metrics as a part of input and optimize based on the metrics "))),n=r.a.createElement("tr",null,r.a.createElement("td",{onClick:function(t){return e.handleClick(t.currentTarget.id)},id:"optimize-pre"},r.a.createElement("h3",null," Optimized Pre-Processing "),r.a.createElement("p",null," Modifies the training data features and label ")),r.a.createElement("td",{onClick:function(t){return e.handleClick(t.currentTarget.id)},id:"reweighing"},r.a.createElement("h3",null," Reweighing "),r.a.createElement("p",null," Modifies the weight of different training examples ")),r.a.createElement("td",{onClick:function(t){return e.handleClick(t.currentTarget.id)},id:"disparate"},r.a.createElement("h3",null," Disparate Impact Remover "),r.a.createElement("p",null," Edit features value to improve group fairness ")),r.a.createElement("td",{onClick:function(t){return e.handleClick(t.currentTarget.id)},id:"fair-learning"},r.a.createElement("h3",null," Fair Learning Representation "),r.a.createElement("p",null," Obfuscating information about the protected attributes ")));return"dataset"===this.props.selected?n:"classifier"===this.props.selected?a:"predict"===this.props.selected?t:void 0}},{key:"handleClick",value:function(e){window.location.href="/bias-awareness-platform/#/comparison?algo="+e}},{key:"render",value:function(){return r.a.createElement("div",{className:"dataset-algo text-center"},r.a.createElement("table",{className:"algo-title text-center"},r.a.createElement("tbody",null,this.chooseAlgo())))}}]),a}(n.Component)),N=a(79),j=a(80),T=a(81),S=a(82),A=a(83),D=a(84),z=function(e){Object(m.a)(a,e);var t=Object(d.a)(a);function a(e){var n;return Object(o.a)(this,a),(n=t.call(this,e)).state={dataset_src:N,classifier_src:T,predict_src:A,selected:"none"},n}return Object(u.a)(a,[{key:"choosePhase",value:function(e){console.log(e),"dataset"===e?this.setState({dataset_src:N,classifier_src:S,predict_src:D,selected:"dataset"}):"classifier"===e?this.setState({dataset_src:j,classifier_src:T,predict_src:D,selected:"classifier"}):this.setState({dataset_src:j,classifier_src:S,predict_src:A,selected:"predict"})}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"page-box mitigation"},r.a.createElement("h1",null," Bias Mitigation "),r.a.createElement("p",null," Changing the dataset into a fairer dataset may help reducing the racial bias, but a fair dataset doesn't always happen in real settings. In this case, we could resort to mitigate the bias instead "),r.a.createElement("p",null," There are few concrete ways to mitigate the racial bias that may occur"),r.a.createElement("h2",{className:"text-center"}," Select a phase to add mitigation "),r.a.createElement(p.a,{className:"text-center phase-choice"},r.a.createElement(f.a,{md:{span:2,offset:3}}," ",r.a.createElement("img",{src:this.state.dataset_src,alt:"",id:"dataset",onClick:function(t){return e.choosePhase(t.currentTarget.id)}})," "),r.a.createElement(f.a,{md:2}," ",r.a.createElement("img",{src:this.state.classifier_src,alt:"",id:"classifier",onClick:function(t){return e.choosePhase(t.currentTarget.id)}})," "),r.a.createElement(f.a,{md:2},"  ",r.a.createElement("img",{src:this.state.predict_src,alt:"",id:"predict",onClick:function(t){return e.choosePhase(t.currentTarget.id)}})," ")),r.a.createElement(C,{selected:this.state.selected}))}}]),a}(n.Component),R=(a(85),a(19)),P=function(e){Object(m.a)(n,e);var t=Object(d.a)(n);function n(e){var a;return Object(o.a)(this,n),(a=t.call(this,e)).state={bias_dropdown:"hide",algo:"Select your algo"},a.showDropdown=a.showDropdown.bind(Object(v.a)(a)),a}return Object(u.a)(n,[{key:"showDropdown",value:function(){"hide"===this.state.bias_dropdown?this.setState({bias_dropdown:"show"}):"show"===this.state.bias_dropdown&&this.setState({bias_dropdown:"hide"})}},{key:"componentDidMount",value:function(){var e=window.location.href.split("=");void 0===e[1]?this.setState({algo:"Choose the mitigation algorithm..."}):this.setState({algo:e[1]})}},{key:"render",value:function(){return r.a.createElement("div",{id:"comparison"},r.a.createElement("h2",{className:"text-center"}," Comparison "),r.a.createElement("div",{className:"compare"},r.a.createElement("div",{className:"before-mitigate"},r.a.createElement("h3",null," Without bias mitigation ")),r.a.createElement("div",{className:"after-mitigate"},r.a.createElement("h3",null," Bias Mitigation: "),r.a.createElement(R.a,{className:"algo-dropdown"},r.a.createElement(R.a.Toggle,null," ",this.state.algo," "),r.a.createElement(R.a.Menu,null,r.a.createElement(R.a.Item,null," Tes1 "),r.a.createElement(R.a.Item,null," Tes1 "),r.a.createElement(R.a.Item,null," Tes1 ")))),r.a.createElement("div",{className:"before-mitigate"},r.a.createElement("img",{src:a(28),className:"graph-box",alt:"graph"})),r.a.createElement("div",{className:"after-mitigate"},r.a.createElement("img",{src:a(28),className:"graph-box",alt:"graph"})),r.a.createElement("ul",{className:"legend-box"},r.a.createElement("li",{id:"legend-toxic"}," Toxic text "),r.a.createElement("li",{id:"legend-nontoxic"}," Non-toxic text ")),r.a.createElement("div",{className:"before-mitigate"},r.a.createElement("div",{className:"result-box"},r.a.createElement("h2",null," Result "),r.a.createElement("ul",null,r.a.createElement("li",null," Precision: 0.76 "),r.a.createElement("li",null," Recall: 0.89 "),r.a.createElement("li",null," Fairness metrics: ___ ")))),r.a.createElement("div",{className:"after-mitigate"},r.a.createElement("div",{className:"result-box"},r.a.createElement("h2",null," Result "),r.a.createElement("ul",null,r.a.createElement("li",null," Precision: 0.76 "),r.a.createElement("li",null," Recall: 0.89 "),r.a.createElement("li",null," Fairness metrics: ___ "))))))}}]),n}(n.Component),B=function(e){Object(m.a)(a,e);var t=Object(d.a)(a);function a(){return Object(o.a)(this,a),t.apply(this,arguments)}return Object(u.a)(a,[{key:"render",value:function(){return r.a.createElement("div",{className:"evaluate"},r.a.createElement("h5",null," Try changing the bias mitigation method several times. You can change the bias mitigation method directly on the comparison, or going back to the previous page using the mitigation button the top right corner. For each form, use exactly one bias mitigation. You can submit the form multiple times"),r.a.createElement("form",null,r.a.createElement("label",null," 1. Which bias mitigation do you use "),r.a.createElement("textarea",null),r.a.createElement("label",null," 2. Is there any increase or decrease in fairness after the bias mitigation is applied? "),r.a.createElement("textarea",null),r.a.createElement("label",null," 3. Is there any increase or decrease in accuracy after the bias mitigation is applied "),r.a.createElement("textarea",null),r.a.createElement("label",null," 4. Based on the accuracy-fairness tradeoff, would you use this bias mitigation algorithm for this scenario in particular?  "),r.a.createElement("textarea",null)),r.a.createElement(h,{name:"Submit",link:"/bias-awareness-platform/#/fin",className:"text-center"}))}}]),a}(n.Component),M=function(e){Object(m.a)(a,e);var t=Object(d.a)(a);function a(e){var n;return Object(o.a)(this,a),(n=t.call(this,e)).state={compare_active:"active",evaluate_active:""},n}return Object(u.a)(a,[{key:"changeContent",value:function(e){console.log(e),"comparison-tab"===e?this.setState({compare_active:"active",evaluate_active:""}):this.setState({compare_active:"",evaluate_active:"active"})}},{key:"returnContent",value:function(){return"active"===this.state.compare_active?r.a.createElement(P,null):"active"===this.state.evaluate_active?r.a.createElement(B,null):void 0}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"comparison page-box"},r.a.createElement("h1",null," Comparison and Evaluation "),r.a.createElement("p",null," After bias mitigation, here are the comparison between the classifier result before bias mitigation is applied and after the bias mitigation is applied."),r.a.createElement("ul",{className:"choices"},r.a.createElement("li",{className:this.state.compare_active,id:"comparison-tab",onClick:function(t){return e.changeContent(t.currentTarget.id)}}," Comparison "),r.a.createElement("li",{className:this.state.evaluate_active,id:"evaluation-tab",onClick:function(t){return e.changeContent(t.currentTarget.id)}}," Evaluation ")),r.a.createElement("div",{className:"interact-container"},this.returnContent()))}}]),a}(n.Component),q=function(e){Object(m.a)(a,e);var t=Object(d.a)(a);function a(e){var n;return Object(o.a)(this,a),(n=t.call(this,e)).state={current_step:1},n}return Object(u.a)(a,[{key:"componentDidUpdate",value:function(){console.log("updated in parent"),this.updateCurrentStep()}},{key:"componentDidMount",value:function(){console.log(this.props.location),this.updateCurrentStep()}},{key:"updateCurrentStep",value:function(){var e=this.props.location.pathname;e.includes("visualization")&&2!==this.state.current_step?this.setState({current_step:2}):e.includes("evaluation")&&3!==this.state.current_step?this.setState({current_step:3}):e.includes("mitigation")&&4!==this.state.current_step?this.setState({current_step:4}):e.includes("comparison")&&5!==this.state.current_step?this.setState({current_step:5}):e.includes("fin")&&6!==this.state.current_step&&this.setState({current_step:6})}},{key:"render",value:function(){var e=this;return r.a.createElement("div",null,r.a.createElement(s.a,{path:"/",render:function(t){return r.a.createElement(g,Object.assign({},t,{current_step:e.state.current_step}))}}),r.a.createElement(s.c,null,r.a.createElement(s.a,{path:"/code",component:b}),r.a.createElement(s.a,{path:"/visualization",component:O}),r.a.createElement(s.a,{path:"/evaluation",component:w}),r.a.createElement(s.a,{path:"/mitigation",component:z}),r.a.createElement(s.a,{path:"/comparison",component:M})))}}]),a}(n.Component);var I=function(){return r.a.createElement("div",null,r.a.createElement(s.c,null,r.a.createElement(s.a,{exact:!0,path:"/",component:E}),r.a.createElement(s.a,{path:"/",component:q})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var W=function(e){Object(m.a)(a,e);var t=Object(d.a)(a);function a(){return Object(o.a)(this,a),t.apply(this,arguments)}return Object(u.a)(a,[{key:"componentDidUpdate",value:function(e){this.props.location.pathname!==e.location.pathname&&window.scrollTo(0,0)}},{key:"render",value:function(){return null}}]),a}(r.a.Component),F=Object(s.f)(W);l.a.render(r.a.createElement(c.a,null,r.a.createElement(F,null),r.a.createElement(s.a,{path:"/",component:I})),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[57,1,2]]]);
//# sourceMappingURL=main.eb5fa124.chunk.js.map