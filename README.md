# Mobile layout and search update

This is the complete app based on your bloodtest.zip. Your results.json is unchanged.

- On phones, the chart appears before the result-entry form.
- Charts fit the available width instead of requiring sideways scrolling.
- Result history becomes stacked cards with labelled fields on phones.
- Search above the chart matches English/Arabic test names, dates, values, units, and notes. It filters the chart, selector, and history together. Clear restores the full view. Summary totals still describe all saved records.
- Alphabetical test lists, numeric-text recognition, reference-limit handling, and automatic JSON refresh are retained.

To update your current website, replace index.html, app.js, and styles.css. Keep your live results.json if you have added readings since sending the ZIP. Reload once after publishing the files to GitHub Pages.

To run the included full project locally, use `node server.cjs` and open http://localhost:8080. Opening index.html as a local file cannot fetch JSON automatically.

## العربية

يظهر الرسم أولاً على الهاتف، ثم نموذج إضافة النتيجة. يتكيف الرسم مع عرض الشاشة ويظهر سجل النتائج كبطاقات واضحة بدلاً من جدول عريض.

يمكن البحث باسم التحليل بالعربية أو الإنجليزية أو بالتاريخ أو القيمة أو الوحدة أو الملاحظات. يرشّح البحث الرسم والقائمة والسجل معاً، ويعيد زر المسح عرض جميع النتائج. تبقى الأرقام الإجمالية لجميع السجلات.

استبدل ملفات index.html وapp.js وstyles.css في مشروعك. احتفظ بملف results.json الحالي إذا أضفت نتائج بعد إرسال الحزمة. ملف النتائج المرفق هنا مطابق للملف الذي أرسلته.
