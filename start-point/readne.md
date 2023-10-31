## .Tell, don't ask:

<p dir="auto">
بگو به جای اینکه بپرسی، که البته ترجمه‌ی ناکاملی از این عبارت هست.<br>
این مسئله در واقع یه تکنیک تو برنامه‌‌نویسی شی‌گرا(OOP) یا در واقع دیزاین پترن‌هاست(design patterns).<br>
هدف اینه وابستگی‌های اضافی و غیر لازم بین ماژول ها، آبجکت‌ها و کامپوننت‌ها(در وب) رو تا جای ممکن حذف کنیم.
<br>
<br>
به این معنا که یه object یا module برای انجام کار، ارتباط اضافی‌ای با سایرین نداشته باشه. از همون ابتدا یه کار مشخصی داشته باشه و یه چیزی مشخصی بگیره و یه چیز مشخصی تحویل بده. یعنی بر اساس دیتا و توسط صاحب اون دیتا به شکل مشخصی بهش گفته بشه که چیکار کنه.
با استفاده از این متود ما هزینه‌ی وابستگی رو از روی دوش اون object یا module بر می‌داریم.
<br>
<br>
نکته: این رو هم باید در نظر بگیریم، که گاهی ارتباطی که وجود داره لازم و ضروری هست، و هزینه‌ی حذف این وابستگی بیشتر از وجود اون هست.</p>

مثال:
```js 

import react from 'react'
export function DataContainer(){
    const data= "()=> fetch the data"
    return(
        <div>
            {data.error ? <ShowError someProps={"someProps"}/> : data.response.modeOne ? <RenderWtihModeOne someProps={"modeOneProps"}/> :
                <RenderWtihModeTwo someProps={"modeTwoProps"}/>}
        </div>
    )
}
```
<p dir="auto">به جای استفاده به این شکل می تونیم به خود کامپوننت واگذار کنیم:</p>

```js
// ParentComponent.tsx:
import react from 'react'
export function DataContainer(){
    const data:data = "()=> fetch the data"
    return(
        <div>
            <RenderData data={data} />
        </div>
    )
}

// ChildComponent.tsx:
import react from 'react'
export function RenderData(data:data){
    if (!data) return null;
    
    return(
        <div>
          //do something here
        </div>
    )
}

```

## .YAGNI(You Aren't Gonna Need It):

 <p dir="auto" ><strong>بهش نیازی نخواهی داشت(حداقل نه به این زودی‌ها :))</strong><br>
این اصل به این مسئله اشاره داره که در حین توسعه از افزودن قابلیت‌ها یا کدهای غیرضرروی بپرهیزیم؛<br>
 نیاز های پروژه رو درست بررسی و تعیین کنیم، 
توسعه رو در مینیمال‌ترین و ساده‌ترین حالت انجام بدیم و
آینده‌نگری رو در حد تناسب و نیاز پروژه انجام بدیم.<br>
این اصل نقطه‌ی مقابل <strong>over-engineering</strong> هست وسبب کاهش پیچیدگی(complexity)، جلوگیری از هدر رفت زمان(development time) و کاهش هزینه‌ی نگهداری(maintenance costs) میشه.<br>
در واقع رویکرد "just in time" رو معرفی و پیشنهاد می‌کنه، که اشاره می‌کنه که یه قابلیت فقط زمانی باید اضافه/ توسعه داده بشه که به شکل واضح در همون لحظه بهش نیاز هست.<br>
<br>
خالی از لطف نیست که اشاره کنم این اصل به افزایش چابکی(agile) فرآیند توسعه هم کمک می‌کند.
</p>
