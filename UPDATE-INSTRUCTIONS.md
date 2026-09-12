# Display update

Replace only index.html, app.js, and styles.css in your existing project with the files in this ZIP. Keep your current results.json: it may contain newer readings than the copy previously shared here.

Changes:
- Test selector and overview legend are alphabetical in the selected language (English or Arabic).
- Date labels use evenly spaced timeline ticks and no longer collide when readings cluster near one end. Exact dates remain in point details and history.
- Missing reference ranges say “Not provided in this record,” without an unrelated unit after a dash.
- A note explains missing limits and flags repeated test/date/value entries. Records are not automatically merged or deleted; repeated readings can be legitimate.

A record with null/missing min and max cannot be labelled within/high/low. The application does not copy a range from a different date, because lab reference limits may differ. To add a missing range, use the limits from that reading's lab report. The shaded chart band appears only for records supplying both limits.

After uploading the three files to GitHub Pages and waiting for publication, reload the page once. Automatic JSON checks continue every 30 seconds.

## العربية

استبدل index.html وapp.js وstyles.css فقط. احتفظ بملف results.json الحالي حتى لا تفقد نتائجك الجديدة.

أصبحت قائمة التحاليل مرتبة أبجدياً حسب اللغة، وتم منع تداخل تواريخ الرسم. تبقى التواريخ الدقيقة في تفاصيل النقاط والجدول. تظهر ملاحظة عند غياب الحدود المرجعية أو وجود نتائج متكررة بالاسم والتاريخ والقيمة نفسها. لا تُحذف النتائج ولا تُدمج تلقائياً، ولا تُنسخ الحدود المرجعية من تاريخ آخر.
