'use strict';
const TEXT = {
 en: {brand:'Blood Notes',journal:'YOUR HEALTH JOURNAL',title:'Your results, over time.',intro:'Keep your blood tests together. See what changes.',import:'Import JSON',export:'Export JSON ↓',total:'Saved results',tests:'Tracked tests',outside:'Latest results outside range',add:'Add a result',editTitle:'Edit result',labHint:'Use the units and reference range printed on your lab report.',nameEn:'Test name in English',nameAr:'Test name in Arabic',date:'Test date',value:'Result',unit:'Unit',range:'Lab reference range',min:'Lower limit',max:'Upper limit',notes:'Notes (optional)',note:'Notes',save:'Save result',cancel:'Cancel editing',trend:'RESULT TREND',chartTitle:'The bigger picture',select:'Select a test',normal:'Within range',high:'High',low:'Low',chartHint:'Each point uses its own lab range. Direction shows a numerical change, not whether your health improved.',history:'Result history',selectedHistory:'For the selected test',status:'Status',actions:'Actions',privacy:'Stored in this browser. Export JSON regularly to back up your results or move them to another device.',medical:'Range labels are comparisons with your lab report, not diagnoses. Discuss results with your healthcare professional.',empty:'Add your first result to start your chart. Each new result adds another point to your story.',noTests:'No tests yet',noHistory:'No results yet.',edit:'Edit',remove:'Delete',confirmDelete:'Delete this result? This cannot be undone.',saved:'Result saved in this browser.',deleted:'Result deleted.',exported:'JSON backup downloaded. Keep it somewhere safe.',imported:'JSON imported. Matching record IDs were skipped; existing results were preserved.',invalid:'This file is not a valid Blood Notes JSON backup. Nothing was imported.',badRange:'The upper limit must be greater than or equal to the lower limit.',badInput:'Enter valid names, date, units, and non-negative numbers (up to 1 trillion).',storage:'Browser storage is unavailable or full. Your changes are only in memory; export JSON before closing this page.',corrupt:'Saved browser data could not be read. Import a valid backup to continue.',same:'No change from previous result',up:'Higher than previous result',down:'Lower than previous result',first:'First result — add another to compare',graph:'Results over time; exact values are in the history table.',fileLarge:'Choose a JSON file smaller than 5 MB.',limit:'A maximum of 10,000 results is supported.'},
 ar: {brand:'سجل التحاليل',journal:'سجلك الصحي',title:'نتائجك، مع مرور الوقت.',intro:'اجمع تحاليل الدم في مكان واحد وتابع التغيّرات.',import:'استيراد JSON',export:'تصدير JSON ↓',total:'النتائج المحفوظة',tests:'التحاليل المتابَعة',outside:'أحدث النتائج خارج النطاق',add:'إضافة نتيجة',editTitle:'تعديل النتيجة',labHint:'استخدم الوحدة والنطاق المرجعي المطبوعين في تقرير المختبر.',nameEn:'اسم التحليل بالإنجليزية',nameAr:'اسم التحليل بالعربية',date:'تاريخ التحليل',value:'النتيجة',unit:'الوحدة',range:'النطاق المرجعي للمختبر',min:'الحد الأدنى',max:'الحد الأعلى',notes:'ملاحظات (اختياري)',note:'ملاحظات',save:'حفظ النتيجة',cancel:'إلغاء التعديل',trend:'تغيّر النتائج',chartTitle:'الصورة الكاملة',select:'اختر تحليلاً',normal:'ضمن النطاق',high:'مرتفع',low:'منخفض',chartHint:'تُقارَن كل نقطة بنطاق المختبر الخاص بها. يشير الاتجاه إلى تغيّر رقمي، وليس إلى تحسّن الحالة الصحية.',history:'سجل النتائج',selectedHistory:'للتحليل المحدد',status:'الحالة',actions:'الإجراءات',privacy:'تُحفظ النتائج في هذا المتصفح. صدّر ملف JSON بانتظام لنسخ النتائج احتياطياً أو نقلها إلى جهاز آخر.',medical:'التصنيفات مقارنة بتقرير المختبر وليست تشخيصاً. ناقش النتائج مع مختص الرعاية الصحية.',empty:'أضف أول نتيجة لبدء الرسم البياني. ستظهر كل نتيجة جديدة كنقطة إضافية لمتابعة التغيّر.',noTests:'لا توجد تحاليل بعد',noHistory:'لا توجد نتائج بعد.',edit:'تعديل',remove:'حذف',confirmDelete:'هل تريد حذف هذه النتيجة؟ لا يمكن التراجع عن ذلك.',saved:'تم حفظ النتيجة في هذا المتصفح.',deleted:'تم حذف النتيجة.',exported:'تم تنزيل النسخة الاحتياطية بصيغة JSON. احتفظ بها في مكان آمن.',imported:'تم استيراد JSON. تم تخطي المعرّفات الموجودة والحفاظ على النتائج السابقة.',invalid:'هذا الملف ليس نسخة JSON صالحة لسجل التحاليل. لم يتم استيراد أي بيانات.',badRange:'يجب أن يكون الحد الأعلى أكبر من الحد الأدنى أو مساوياً له.',badInput:'أدخل أسماء وتاريخاً ووحدة صالحة وأرقاماً غير سالبة (حتى تريليون).',storage:'تخزين المتصفح غير متاح أو ممتلئ. التغييرات في الذاكرة فقط؛ صدّر JSON قبل إغلاق الصفحة.',corrupt:'تعذّرت قراءة البيانات المحفوظة في المتصفح. استورد نسخة احتياطية صالحة للمتابعة.',same:'لا تغيّر مقارنة بالنتيجة السابقة',up:'أعلى من النتيجة السابقة',down:'أقل من النتيجة السابقة',first:'النتيجة الأولى — أضف نتيجة أخرى للمقارنة',graph:'النتائج عبر الزمن؛ القيم الدقيقة متاحة في جدول السجل.',fileLarge:'اختر ملف JSON أصغر من 5 ميغابايت.',limit:'الحد الأقصى هو ١٠٬٠٠٠ نتيجة.'}
};
const $ = id => document.getElementById(id);
const form = $('result-form');
const KEY = 'blood-notes-v1';
const DRAFT_KEY = 'blood-notes-draft-v1';
// Relative to index.html: host results.json beside the application files.
const DATA_URL = new URL('./results.json', document.currentScript?.src || document.baseURI).href;
Object.assign(TEXT.en,{reload:'Reload JSON',restore:'Restore browser draft',loading:'Loading results.json…',remote:'Loaded from results.json. Reload to check for updates.',local:'Browser draft — export and upload as results.json to share changes across devices.',fallback:'Could not load results.json. Showing browser data; it may be out of date.',loadError:'Could not load results.json. Check that it exists, contains valid JSON, and is accessible on your website.',fileMode:'Automatic loading requires an HTTP(S) website. Open the hosted app, or use Import JSON when opening files directly.',replace:'Replace the displayed edits with results.json? A browser draft will remain available.',restoreConfirm:'Replace the displayed results with your saved browser draft?',privacy:'The hosted results.json is loaded on opening. Edits stay in this browser until you export and upload the updated results.json.',saved:'Saved as a browser draft. Export and upload results.json to update other devices.',deleted:'Deleted from the browser draft. Export and upload results.json to update other devices.',exported:'Downloaded results.json. Upload it beside index.html to update the shared data.'});
Object.assign(TEXT.ar,{reload:'إعادة تحميل JSON',restore:'استعادة مسودة المتصفح',loading:'جارٍ تحميل results.json…',remote:'تم التحميل من results.json. أعد التحميل للتحقق من التحديثات.',local:'مسودة المتصفح — صدّرها وارفعها باسم results.json لمشاركة التغييرات بين الأجهزة.',fallback:'تعذّر تحميل results.json. تُعرض بيانات المتصفح وقد تكون قديمة.',loadError:'تعذّر تحميل results.json. تأكد من وجود الملف وصحة بنيته وإمكانية الوصول إليه على موقعك.',fileMode:'يتطلب التحميل التلقائي موقع HTTP(S). افتح التطبيق المستضاف أو استخدم استيراد JSON عند فتح الملفات مباشرة.',replace:'هل تريد استبدال التعديلات المعروضة بملف results.json؟ ستبقى مسودة المتصفح متاحة.',restoreConfirm:'هل تريد استبدال النتائج المعروضة بمسودة المتصفح المحفوظة؟',privacy:'يُحمّل ملف results.json المستضاف عند الفتح. تبقى التعديلات في هذا المتصفح حتى تصدير الملف المحدّث ورفعه.',saved:'تم الحفظ كمسودة في المتصفح. صدّر results.json وارفعه لتحديث الأجهزة الأخرى.',deleted:'تم الحذف من مسودة المتصفح. صدّر results.json وارفعه لتحديث الأجهزة الأخرى.',exported:'تم تنزيل results.json. ارفعه بجانب index.html لتحديث البيانات المشتركة.'});

Object.assign(TEXT.en,{allTests:'All tests · multiple lines',testName:'Test',selectedHistory:'Results in the current chart',fileMode:'Open this project through a local web server or an HTTP(S) website so it can read results.json automatically.',invalidSource:'results.json could not be read: check the JSON structure and required fields in README.md.',chartHint:'Colors identify tests. Point details and the table show high/low status. Select one test for its reference band. Curves only connect recorded measurements.',relative:'Different units: values shown as % of each reading’s upper reference limit (100% = upper limit). Readings with a zero upper limit are omitted from this comparison; select their test to see them.',rawAxis:'Result',corrupt:'Saved browser data could not be read. Check results.json and reload.'});
Object.assign(TEXT.ar,{allTests:'جميع التحاليل · خطوط متعددة',testName:'التحليل',selectedHistory:'النتائج في الرسم الحالي',fileMode:'افتح المشروع عبر خادم محلي أو موقع HTTP(S) ليتمكن من قراءة results.json تلقائياً.',invalidSource:'تعذّرت قراءة results.json: تحقق من بنية JSON والحقول المطلوبة في README.md.',chartHint:'الألوان تميّز التحاليل. تظهر حالة الارتفاع والانخفاض في تفاصيل النقاط والجدول. اختر تحليلاً واحداً لعرض نطاقه المرجعي. المنحنيات تربط القياسات المسجّلة فقط.',relative:'الوحدات مختلفة: تُعرض القيم كنسبة من الحد المرجعي الأعلى لكل قراءة (١٠٠٪ = الحد الأعلى). تُستبعد القراءات ذات الحد الأعلى صفر من المقارنة؛ اختر تحليلها لعرضها.',rawAxis:'النتيجة',corrupt:'تعذّرت قراءة بيانات المتصفح. تحقق من results.json وأعد التحميل.'});

Object.assign(TEXT.en,{qualitative:'Text result',unknown:'No reference range',textOnly:'Text results are shown in the history table. Only numeric results can be plotted.',jsonSyntax:'Invalid JSON syntax. Check commas and closing brackets.',jsonArray:'Expected a results array.',row:'Result row',duplicateId:'Duplicate id',remote:'Loaded from results.json · checks for updates every 30 seconds',relative:'Different units: numeric values shown as % of their upper reference limit. Text results and readings without a positive upper limit remain in the history; select a numeric test for its original values.',badInput:'Check the names, date, value and reference limits.',fileMode:'Open START-WINDOWS.cmd in this folder, then visit http://localhost:8080, or use your GitHub Pages website. Direct file opening cannot fetch JSON.'});
Object.assign(TEXT.ar,{qualitative:'نتيجة نصية',unknown:'لا يوجد نطاق مرجعي',textOnly:'تظهر النتائج النصية في جدول السجل. يمكن رسم النتائج الرقمية فقط.',jsonSyntax:'صياغة JSON غير صحيحة. تحقق من الفواصل والأقواس.',jsonArray:'يجب أن يحتوي الملف على قائمة results.',row:'صف النتيجة',duplicateId:'معرّف مكرر',remote:'تم التحميل من results.json · فحص التحديثات كل ٣٠ ثانية',relative:'الوحدات مختلفة: تُعرض القيم الرقمية كنسبة من الحد المرجعي الأعلى. تبقى النتائج النصية والقراءات دون حد أعلى موجب في السجل؛ اختر تحليلاً رقمياً لعرض قيمه الأصلية.',badInput:'تحقق من الأسماء والتاريخ والقيمة والحدود المرجعية.',fileMode:'افتح START-WINDOWS.cmd ثم زر http://localhost:8080، أو استخدم موقع GitHub Pages. فتح HTML مباشرة لا يسمح بجلب JSON.'});
let formChanged=false,lastRemote='',refreshing=false;
let sourceStatus='loading',busy=false,dirty=false,hasDraft=false;
let lang='en', records=[], selected='all', editing=null, storageFailed=false;
const t = key => TEXT[lang][key];
const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const groupKey = r => JSON.stringify([r.nameEn.trim().toLowerCase(),r.unit.trim()]);
const isNumeric = r => typeof r.value==='number' && Number.isFinite(r.value);
const state = r => !isNumeric(r)?'qualitative':r.min===null&&r.max===null?'unknown':r.min!==null&&r.value<r.min?'low':r.max!==null&&r.value>r.max?'high':'normal';
const displayValue = r => isNumeric(r)?number(r.value):r.value;
const displayRange = r => r.min===null&&r.max===null?'—':r.min===null?'≤ '+number(r.max):r.max===null?'≥ '+number(r.min):number(r.min)+' – '+number(r.max);
const number = n => new Intl.NumberFormat(lang==='ar'?'ar':'en',{maximumFractionDigits:6}).format(n);
const dateText = d => new Date(d+'T12:00:00Z').toLocaleDateString(lang==='ar'?'ar':'en-GB',{year:'numeric',month:'short',day:'numeric',timeZone:'UTC'});
function notice(key,error=false){$('notice').textContent=t(key);$('notice').className='notice'+(error?' error':'');$('notice').hidden=false;}
function validDate(d){if(typeof d!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(d))return false;const v=new Date(d+'T00:00:00Z');return Number.isFinite(+v)&&v.toISOString().slice(0,10)===d&&d>='1900-01-01'&&d<='2100-12-31';}
function recordError(r){
 if(!r||typeof r!=='object')return 'record';
 for(const k of ['id','nameEn','nameAr'])if(typeof r[k]!=='string'||!r[k].trim()||r[k].length>100)return k;
 if(typeof r.unit!=='string'||r.unit.length>40)return 'unit';
 if(!validDate(r.date))return 'date';
 if(!(isNumeric(r)&&r.value>=0&&r.value<=1e12)&&!(typeof r.value==='string'&&r.value.trim()&&r.value.length<=100))return 'value';
 for(const k of ['min','max'])if(r[k]!==null&&!(typeof r[k]==='number'&&Number.isFinite(r[k])&&r[k]>=0&&r[k]<=1e12))return k;
 if(r.min!==null&&r.max!==null&&r.min>r.max)return 'min > max';
 if(typeof r.notes!=='string'||r.notes.length>1000)return 'notes';
 return '';
}
function validate(r){return !recordError(r);}
function parseBackup(raw){
 let data;try{data=JSON.parse(raw.replace(/^\uFEFF/,''));}catch{throw Error(t('jsonSyntax'));}
 const rows=Array.isArray(data)?data:data&&data.results;
 if(!Array.isArray(rows))throw Error(t('jsonArray'));
 if(rows.length>10000)throw Error(t('limit'));
 if(!Array.isArray(data)&&data.version!==undefined&&data.version!==1)throw Error('version: 1');
 const ids=new Set();
 return rows.map((r,i)=>{
  if(!r||typeof r!=='object')throw Error(t('row')+' '+(i+1)+': record');
  if(typeof r.id==='number'&&!Number.isSafeInteger(r.id))throw Error(t('row')+' '+(i+1)+': id');
  const n={id:r.id===undefined?'json-row-'+(i+1):typeof r.id==='number'?String(r.id):r.id,nameEn:r.nameEn,nameAr:r.nameAr,date:r.date,value:r.value,unit:r.unit??'',min:r.min??null,max:r.max??null,notes:r.notes??''};
  const error=recordError(n);if(error)throw Error(t('row')+' '+(i+1)+': '+error);
  if(ids.has(n.id))throw Error(t('row')+' '+(i+1)+': '+t('duplicateId'));
  ids.add(n.id);n.nameEn=n.nameEn.trim();n.nameAr=n.nameAr.trim();n.unit=n.unit.trim();return n;
 });
}

function persist(){dirty=true;sourceStatus='local';try{localStorage.setItem(DRAFT_KEY,JSON.stringify({version:1,results:records}));hasDraft=true;storageFailed=false;return true;}catch{storageFailed=true;notice('storage',true);return false;}}
function today(){const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;}
function resetForm(){editing=null;form.reset();form.elements.date.value=today();$('cancel').hidden=true;$('form-title').textContent=t('add');}
function badge(r){const s=state(r);return `<span class="badge ${s}">${t(s)}</span>`;}
function render(){
 $('range-legend').hidden=selected==='all';
 $('data-status').textContent=t(sourceStatus);$('reload-json').textContent=t('reload');$('reload-json').disabled=busy;$('restore-draft').textContent=t('restore');$('restore-draft').hidden=!hasDraft;$('restore-draft').disabled=busy;
 form.querySelectorAll('input,textarea,button').forEach(el=>el.disabled=busy);$('export').disabled=busy;
 document.documentElement.lang=lang;document.documentElement.dir=lang==='ar'?'rtl':'ltr';
 document.querySelectorAll('[data-i18n]').forEach(el=>el.textContent=t(el.dataset.i18n));
 $('language').textContent=lang==='en'?'العربية':'English';$('language').lang=lang==='en'?'ar':'en';$('form-title').textContent=t(editing?'editTitle':'add');
 const groups=new Map();records.forEach(r=>{const k=groupKey(r);if(!groups.has(k))groups.set(k,[]);groups.get(k).push(r);});
 groups.forEach(list=>list.sort((a,b)=>a.date.localeCompare(b.date)));
 if(selected!=='all'&&!groups.has(selected))selected='all';
 $('test-select').replaceChildren();
 $('test-select').add(new Option(t('allTests'),'all'));
 if(!groups.size)$('test-select').add(new Option(t('noTests'),''));
 groups.forEach((list,key)=>{const r=list[list.length-1];$('test-select').add(new Option(`${lang==='ar'?r.nameAr:r.nameEn} · ${r.unit}`,key));});
 $('test-select').value=selected;$('test-select').disabled=!groups.size;
 $('total').textContent=number(records.length);$('tests').textContent=number(groups.size);$('outside').textContent=number([...groups.values()].filter(a=>['high','low'].includes(state(a[a.length-1]))).length);
 const list=selected==='all'?[...records].sort((a,b)=>a.date.localeCompare(b.date)):groups.get(selected)||[];
 if(selected==='all')renderMultiple(groups);else{ $('series-legend').innerHTML='';renderChart(list);}
 $('history').innerHTML=list.length?[...list].reverse().map(r=>`<tr><td>${esc(lang==='ar'?r.nameAr:r.nameEn)}</td><td>${esc(dateText(r.date))}</td><td><bdi>${esc(displayValue(r))} ${esc(r.unit)}</bdi></td><td><bdi>${esc(displayRange(r))} ${esc(r.unit)}</bdi></td><td>${badge(r)}</td><td>${esc(r.notes)||'—'}</td><td><button data-action="edit" data-id="${esc(r.id)}">${t('edit')}</button><button data-action="delete" data-id="${esc(r.id)}">${t('remove')}</button></td></tr>`).join(''):`<tr><td colspan="7">${t('noHistory')}</td></tr>`;
}
function renderMultiple(groups){
 groups=new Map([...groups].map(([k,list])=>[k,list.filter(isNumeric)]).filter(([,list])=>list.length));
 if(!groups.size){$('series-legend').innerHTML='';$('chart-summary').textContent=t('textOnly');$('chart').innerHTML='<div class="empty">'+t('textOnly')+'</div>';return;}
 if(!records.length){$('series-legend').innerHTML='';renderChart([]);return;}
 const colors=['#1554ed','#d52935','#16852b','#a34ac7','#b76400','#087e91'];
 const mixed=new Set(records.filter(isNumeric).map(r=>r.unit)).size>1;
 const W=760,H=350,L=75,R=28,T=30,B=60;
 const ordered=records.filter(isNumeric).sort((a,b)=>a.date.localeCompare(b.date));
 const first=Date.parse(ordered[0].date),last=Date.parse(ordered.at(-1).date);
 const value=r=>mixed?(r.max>0?r.value/r.max*100:null):r.value;
 const values=records.filter(isNumeric).map(value).filter(v=>v!==null&&Number.isFinite(v));
 let top=1;values.forEach(v=>top=Math.max(top,v));top*=1.12;
 const x=r=>last===first?(L+W-R)/2:L+(Date.parse(r.date)-first)/(last-first)*(W-L-R);
 const y=v=>H-B-v/top*(H-T-B);
 $('chart-summary').innerHTML='<small>'+esc(mixed?t('relative'):t('rawAxis')+' · '+ordered[0].unit)+'</small>';
 let svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="multi-title"><title id="multi-title">${esc(t('allTests'))}. ${esc(t('graph'))}</title>`;
 for(let i=0;i<=5;i++){
  const yy=y(top*i/5),xx=L+(W-L-R)*i/5;
  svg+=`<line x1="${L}" y1="${yy}" x2="${W-R}" y2="${yy}" stroke="#d9dfe3"/><line x1="${xx}" y1="${T}" x2="${xx}" y2="${H-B}" stroke="#d9dfe3"/><text x="${L-9}" y="${yy+4}" text-anchor="end" font-size="13" fill="#627679">${esc(number(top*i/5))}${mixed?'%':''}</text>`;
 }
 const dates=[...new Set(ordered.map(r=>r.date))];const ticks=[...new Set([dates[0],dates[Math.floor((dates.length-1)/2)],dates.at(-1)])];
 ticks.forEach((date,i)=>{svg+=`<text x="${x({date})}" y="${H-25}" text-anchor="${ticks.length===1?'middle':i===0?'start':i===ticks.length-1?'end':'middle'}" font-size="13" fill="#627679">${esc(dateText(date))}</text>`;});
 let legend='',index=0;
 groups.forEach(list=>{
  const color=colors[index%colors.length],dash=index>=colors.length?' stroke-dasharray="7 4"':'';index++;
  const label=lang==='ar'?list[0].nameAr:list[0].nameEn;
  legend+=`<span><i style="background:${color}"></i>${esc(label)} · <bdi>${esc(list[0].unit)}</bdi></span>`;
  let path='',previous=null;
  list.forEach(r=>{
   const v=value(r);if(v===null||!Number.isFinite(v)){previous=null;return;}
   const xx=x(r),yy=y(v);
   if(!previous)path+=`M ${xx} ${yy} `;
   else{const mid=(previous.x+xx)/2;path+=`C ${mid} ${previous.y}, ${mid} ${yy}, ${xx} ${yy} `;}
   previous={x:xx,y:yy};
  });
  svg+=`<path data-series="${index}" d="${path}" fill="none" stroke="${color}" stroke-width="2.5"${dash}/>`;
  list.forEach(r=>{const v=value(r);if(v===null||!Number.isFinite(v))return;svg+=`<circle cx="${x(r)}" cy="${y(v)}" r="4" fill="white" stroke="${color}" stroke-width="2"><title>${esc(label)} · ${esc(dateText(r.date))}: ${esc(number(r.value))} ${esc(r.unit)} — ${t(state(r))}</title></circle>`;});
 });
 $('chart').innerHTML=svg+'</svg>';$('series-legend').innerHTML=legend;
}
function renderChart(list){
 const hadResults=list.length>0;list=list.filter(isNumeric);
 if(hadResults&&!list.length){$('chart-summary').textContent=t('textOnly');$('chart').innerHTML='<div class="empty">'+t('textOnly')+'</div>';return;}
 if(!list.length){$('chart-summary').replaceChildren();$('chart').innerHTML=`<div class="empty"><span class="empty-symbol" aria-hidden="true">∿</span>${t('empty')}</div>`;return;}
 const last=list[list.length-1],prev=list[list.length-2],diff=prev?last.value-prev.value:0;
 $('chart-summary').innerHTML=`<strong>${esc(number(last.value))}</strong><small>${esc(last.unit)}</small>${badge(last)}<small>${prev?`${diff>0?'↑':diff<0?'↓':'='} ${esc(number(Math.abs(diff)))} · ${t(diff>0?'up':diff<0?'down':'same')}`:t('first')}</small>`;
 const W=720,H=305,L=68,R=24,T=24,B=54;
 const values=list.flatMap(r=>[r.value,r.min,r.max]).filter(v=>v!==null);let lo=Infinity,hi=-Infinity;values.forEach(v=>{lo=Math.min(lo,v);hi=Math.max(hi,v);});const pad=(hi-lo||Math.max(hi,1))*.16;lo=Math.max(0,lo-pad);hi+=pad;
 const firstTime=Date.parse(list[0].date),lastTime=Date.parse(last.date),span=lastTime-firstTime;
 const x=r=>span?L+(Date.parse(r.date)-firstTime)/span*(W-L-R):(L+W-R)/2;
 const y=v=>H-B-(v-lo)/(hi-lo)*(H-T-B);
 let svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="chart-title"><title id="chart-title">${esc(t('graph'))}</title>`;
 for(let i=0;i<5;i++){const v=lo+(hi-lo)*i/4,yy=y(v);svg+=`<line x1="${L}" y1="${yy}" x2="${W-R}" y2="${yy}" stroke="#e7eeee"/><text x="${L-9}" y="${yy+4}" text-anchor="end" fill="#627679" font-size="12">${esc(number(v))}</text>`;}
 // Each interval shows that specific result's reference range, never a universal range.
 list.forEach((r,i)=>{if(r.min===null||r.max===null)return;const xx=x(r),left=i?(x(list[i-1])+xx)/2:L,right=i<list.length-1?(xx+x(list[i+1]))/2:W-R;svg+=`<rect x="${left}" y="${y(r.max)}" width="${Math.max(1,right-left)}" height="${Math.max(1,y(r.min)-y(r.max))}" fill="#e2f4ed" fill-opacity="0.7"/><line x1="${left}" x2="${right}" y1="${y(r.min)}" y2="${y(r.min)}" stroke="#a5d4c1" stroke-dasharray="4 4"/><line x1="${left}" x2="${right}" y1="${y(r.max)}" y2="${y(r.max)}" stroke="#a5d4c1" stroke-dasharray="4 4"/>`;});
 svg+=`<polyline points="${list.map(r=>`${x(r)},${y(r.value)}`).join(' ')}" fill="none" stroke="#0b6c65" stroke-width="2.5" stroke-linejoin="round"/>`;
 list.forEach((r,i)=>{svg+=`<circle cx="${x(r)}" cy="${y(r.value)}" r="5" stroke="white" stroke-width="2" fill="${{normal:'#17846b',high:'#ca7039',low:'#577dd3',unknown:'#64748b'}[state(r)]}"><title>${esc(dateText(r.date))}: ${esc(number(r.value))} ${esc(r.unit)} — ${t(state(r))}</title></circle>`;
 if((i===0||i===list.length-1||i%Math.max(1,Math.ceil(list.length/4))===0)&&(!i||r.date!==list[i-1].date))svg+=`<text x="${x(r)}" y="${H-22}" text-anchor="${i===0?'start':i===list.length-1?'end':'middle'}" font-size="12" fill="#627679">${esc(dateText(r.date))}</text>`;});
 $('chart').innerHTML=svg+'</svg>';
}
form.addEventListener('submit',e=>{
 e.preventDefault();if(busy)return;if(!editing&&records.length>=10000){notice('limit',true);return;}
 const f=new FormData(form),r={id:editing||globalThis.crypto?.randomUUID?.()||`r-${Date.now()}-${Math.random().toString(36).slice(2)}`,nameEn:f.get('nameEn').trim(),nameAr:f.get('nameAr').trim(),date:f.get('date'),value:f.get('value').trim()!==''&&Number.isFinite(Number(f.get('value')))?Number(f.get('value')):f.get('value').trim(),unit:f.get('unit').trim(),min:f.get('min').trim()===''?null:Number(f.get('min')),max:f.get('max').trim()===''?null:Number(f.get('max')),notes:f.get('notes').trim()};
 if(r.min!==null&&r.max!==null&&r.min>r.max){notice('badRange',true);return;}if(!validate(r)){notice('badInput',true);return;}
 if(editing)records=records.map(old=>old.id===editing?r:old);else records.push(r);
 const ok=persist();resetForm();render();if(ok)notice('saved');
});
$('cancel').addEventListener('click',resetForm);
$('language').addEventListener('click',()=>{lang=lang==='en'?'ar':'en';try{localStorage.setItem('blood-notes-language',lang);}catch{}$('notice').hidden=true;render();if(storageFailed)notice('storage',true);});
$('test-select').addEventListener('change',e=>{selected=e.target.value;render();});
$('history').addEventListener('click',e=>{if(busy)return;const button=e.target.closest('button[data-action]');if(!button)return;const r=records.find(r=>r.id===button.dataset.id);if(!r)return;
 if(button.dataset.action==='edit'){editing=r.id;for(const key of ['nameEn','nameAr','date','value','unit','min','max','notes'])form.elements[key].value=r[key]??'';$('cancel').hidden=false;$('form-title').textContent=t('editTitle');form.elements.nameEn.focus();}
 else if(confirm(t('confirmDelete'))){records=records.filter(item=>item.id!==r.id);if(editing===r.id)resetForm();const ok=persist();render();if(ok)notice('deleted');}
});
$('export').addEventListener('click',()=>{const data={version:1,exportedAt:new Date().toISOString(),results:records};const url=URL.createObjectURL(new Blob([JSON.stringify(data,null,2)],{type:'application/json;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='results.json';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);notice('exported');});
async function loadJSON(initial=false,automatic=false){
 if(busy||refreshing)return;
 if(automatic&&(dirty||editing||formChanged||document.hidden))return;
 if(!initial&&(dirty||editing||formChanged)&&!confirm(t('replace')))return;
 refreshing=true;if(!automatic){busy=true;sourceStatus='loading';render();}
 const controller=new AbortController();const timeout=setTimeout(()=>controller.abort(),15000);
 try{
  if(location.protocol==='file:')throw Error(t('fileMode'));
  const url=new URL(DATA_URL);url.searchParams.set('_updated',String(Date.now()));
  const response=await fetch(url,{cache:'no-store',signal:controller.signal});
  if(!response.ok)throw Error('HTTP '+response.status+' · '+url.pathname);
  const raw=await response.text();if(new Blob([raw]).size>5*1024*1024)throw Error(t('fileLarge'));
  const incoming=parseBackup(raw),signature=JSON.stringify(incoming);
  // Recheck after the request: the user may have started editing while it was in flight.
  if(automatic&&(dirty||editing||formChanged))return;
  if(!automatic||signature!==lastRemote){records=incoming;dirty=false;if(!automatic)resetForm();}
  lastRemote=signature;sourceStatus='remote';
  try{localStorage.setItem(KEY,JSON.stringify({version:1,results:incoming}));}catch{}
  $('notice').hidden=true;
 }catch(error){
  sourceStatus='fallback';notice('loadError',true);$('notice').textContent+=' '+error.message;
 }finally{clearTimeout(timeout);busy=false;refreshing=false;render();}
}
form.addEventListener('input',()=>{formChanged=true;});
form.addEventListener('reset',()=>{formChanged=false;});
setInterval(()=>loadJSON(true,true),30000);
document.addEventListener('visibilitychange',()=>{if(!document.hidden)loadJSON(true,true);});
window.addEventListener('focus',()=>loadJSON(true,true));
$('reload-json').addEventListener('click',()=>loadJSON());
$('restore-draft').addEventListener('click',()=>{
 if(busy||!confirm(t('restoreConfirm')))return;
 try{const draft=parseBackup(localStorage.getItem(DRAFT_KEY));records=draft;dirty=true;sourceStatus='local';resetForm();render();}catch{notice('corrupt',true);}
});
try{
 lang=localStorage.getItem('blood-notes-language')==='ar'?'ar':'en';
 const draft=localStorage.getItem(DRAFT_KEY),cached=localStorage.getItem(KEY);
 if(draft){records=parseBackup(draft);hasDraft=true;dirty=true;}
 else if(cached)records=parseBackup(cached);
}catch{storageFailed=true;notice('corrupt',true);}
resetForm();render();
loadJSON(true);
