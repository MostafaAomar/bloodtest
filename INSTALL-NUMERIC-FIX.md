Replace index.html, app.js, and styles.css with these files. Keep your existing results.json.

The chart previously treated quoted numbers such as "3.3" as text. This version recognizes complete numeric strings, decimal commas ("3,3"), and Arabic digits in values and reference limits. A comma is treated as a decimal separator, not a thousands separator. Genuine text and qualified results such as "positiv", "<3", and "3 mg" remain text; their meaning is not guessed.

One reading appears as one point. Two or more numeric readings for the same test and unit are needed for a line. Numeric entries written without quotes in JSON also work normally. Missing reference limits remain missing.

Upload these three files and reload after publication. Alphabetical lists, spaced date labels, and automatic JSON refresh are retained.

استبدل الملفات الثلاثة واحتفظ بملف results.json الحالي. يتعرف الإصلاح على الأرقام المكتوبة كنص مثل "3.3" و"3,3" وكذلك الأرقام العربية، مع إبقاء النتائج النصية الحقيقية كما هي. تُعد الفاصلة فاصلة عشرية وليست فاصل آلاف. تظهر القراءة الواحدة كنقطة؛ يلزم وجود قراءتين رقميتين أو أكثر لرسم خط.
