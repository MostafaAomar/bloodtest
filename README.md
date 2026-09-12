# Blood Notes — corrected complete project

This package includes your original results.json unchanged. All 30 records are supported, including numeric IDs, text results, empty units, one-sided reference ranges, and null reference limits. The former json-sync.js patch is no longer needed: loading and automatic refresh are built into app.js.

## Open locally

With Node.js installed, double-click START-WINDOWS.cmd, keep its window open, and visit http://localhost:8080. Alternatively run `node server.cjs` from this folder. Do not double-click index.html: browsers block automatic JSON requests from file:// pages.

## GitHub Pages

Upload index.html, app.js, styles.css, results.json, and .nojekyll into the same publishing folder. Enable Settings → Pages → Deploy from a branch and choose that branch/folder. Open the published GitHub Pages address, not the github.com file viewer. GitHub Pages does not need server.cjs or Node.js.

Edit results.json, commit, and push. After GitHub finishes publishing, the open page fetches updates automatically every 30 seconds and when returning to the tab. GitHub deployment can take several minutes. Requests retain repository subfolder paths and bypass browser caching.

Refresh pauses while you enter a result, edit a result, or have unpublished browser changes. Use Reload JSON when ready to return to the hosted file. App changes are browser drafts: export and commit the downloaded JSON to publish them. A static GitHub Pages website cannot write changes to its repository by itself.

## Supported records

Keep the outer structure `{"version":1,"results":[...]}`. A plain results array is also accepted. Each reading has these fields:

- id: unique string or safe integer; numeric IDs are normalized internally to text.
- nameEn, nameAr: nonempty test names.
- date: YYYY-MM-DD.
- value: number, or text such as "positiv" or "negativ". Numeric values should be JSON numbers, not quoted numbers.
- unit: text; an empty string is allowed.
- min, max: numeric limits, or null when unspecified. Missing limits remain unknown; null is never interpreted as zero.
- notes: text, or omitted for empty notes.

Only numeric readings appear on the chart. Text readings remain visible in the table and are not classified as high or low. A numeric reading without either reference limit shows "No reference range". One-sided limits compare only the supplied side.

In the all-tests chart, different units are compared as a percentage of each reading's upper limit. Readings without a positive upper limit are excluded only from this overview; select the individual test to plot its original numeric values. This scaling does not convert units. A full reference band is shown only when both limits exist.

Your file contains two Ferritin readings, which form a line. Most other tests have one reading, so they show a point. Add another date for the same nameEn and exact unit to extend that test's line. No measurements are fabricated. Values, units, and reference limits are preserved exactly as supplied; verify they match your lab report before relying on range comparisons.

Invalid files keep the last displayed data and show the reason, including a row and field for invalid records. An HTTP error shows the requested path/status. Syntax errors are distinguished from missing files.

Your JSON contains health data. Publishing it on a public Pages site makes that file accessible to others.

## العربية

تتضمن الحزمة ملف نتائجك الأصلي دون تغيير. تم إصلاح قراءة النتائج الثلاثين، بما فيها المعرّفات الرقمية والنتائج النصية والوحدات الفارغة والحدود المرجعية null. لم تعد بحاجة إلى json-sync.js؛ التحديث التلقائي مدمج في app.js.

للتشغيل المحلي ثبّت Node.js وافتح START-WINDOWS.cmd، ثم زر http://localhost:8080 مع إبقاء النافذة مفتوحة. فتح index.html مباشرة لا يسمح بجلب JSON تلقائياً.

على GitHub Pages ارفع index.html وapp.js وstyles.css وresults.json و.nojekyll في مجلد النشر نفسه. فعّل Pages وافتح رابط الموقع المنشور. بعد تعديل JSON وحفظ التعديل ورفعه وانتظار النشر، يفحص التطبيق التحديثات كل ٣٠ ثانية وعند العودة إلى الصفحة.

يتوقف التحديث مؤقتاً أثناء إدخال نتيجة أو تعديلها أو وجود مسودة محلية غير منشورة. اضغط «إعادة تحميل JSON» عندما تكون مستعداً للعودة إلى الملف المنشور. لتعميم تعديلات التطبيق صدّر JSON ثم ارفعه إلى المستودع.

تظهر النتائج النصية في الجدول ولا تُرسم كأرقام ولا تُصنّف كارتفاع أو انخفاض. تعني null أن الحد غير محدد وليست صفراً. نتيجتا الفيريتين تشكلان خطاً؛ التحاليل ذات النتيجة الواحدة تظهر كنقطة. أضف تاريخاً آخر بالاسم والوحدة نفسيهما لتمديد الخط.

البيانات والوحدات والنطاقات محفوظة كما أرسلتها. تحقق من مطابقتها لتقرير المختبر. نشر الملف على موقع عام يتيح للآخرين الوصول إلى البيانات.
