<h1>SingleTon : </h1>
<div dir="rtl">
<h6>سینگلتون یکی از الگو های creational است. </h6>
<p> کاربرد این الگو در مواقعی است که از یک کلاس خاص بتوان <strong>فقط یک نمونه یا شی در سراسر برنامه ساخت</strong>.</p>
<p> فرض کنید قرار است با دوستان خود با یک ماشین، به مسافرت بروید و هر کدام از شما می توانید در طول جاده رانندگی کنید. پس هر وقت راننده احساس خستگی کرد، فرد دیگری به عنوان راننده پشت فرمان می نشیند. نکته مهم این است که ماشین در هر لحظه، فقط یک راننده دارد ! پس اگر بخواهیم کدی برای این مثال بنویسیم ابتدا یک کلاس راننده می سازیم که وضعیت خسته بودن و نبودن آنرا بررسی کنیم و باید حواسمان باشد که از این کلاس فقط می توان یک نمونه در سرار برنامه ساخت . زیرا هر ماشین یک راننده بیشتر ندارد  .
</p>
<p>محدود کردن نمونه های ساخته شده از یک کلاس ،فقط وفقط به یک نمونه، همان مفهوم سینگلتون است واین محدودیت در کل برنامه ایجاد می شود تا به راحتی بتوان نمونه ساخته شده را رهگیری کرد.</p>
<p>حالا که با مفهموم این الگو آشنا شدیم ، اصول فنی آنرا بررسی می کنیم.</p>
</div>
<div dir="rtl">
<h2>اصول فنی</h2>
تمام پیاده سازی های Singleton دارای این دو مرحله مشترک هستند:

 1. constructor کلاس باید با سطح دسترسی private باشد تا  از ساختن object  جدید ، با استفاده از new  جلوگیری شود.
 2. یک متد static می سازیم که نقش constructor را بازی کند و داخل آن نمونه جدید ساخته شده را کنترل می کنیم

اگر کد شما به کلاس Singleton دسترسی داشته باشد، می‌تواند متد static موجود در کلاس را فراخوانی کند. بنابراین هر زمان که آن متد فراخوانی شود، همیشه یک شی مشخص برگردانده می شود.
</div>
<div>
<h2 dir="rtl"> پیاده سازی در قالب کد با استفاده از typescript:</h2>

<p dir="rtl">
طبق توضیحات گفته شده 
<br/>
1. یک متغیر static  و متد static می سازیم
<br/>
2. constructor را private می کنیم
<br/>
3. داخل متد چک می کنیم که اگر نمونه ای از این کلاس وجود دارد ، از همان نمونه موجود استفاده شود ولی اگر نمونه ای وجود ندارد ، یک نمونه جدید بسازد
</p>

<details dir="rtl">
  <summary >نکته</summary>
<strong>
 متغیر باید static باشد تا داخل متد static  به آن دسترسی داشته باشیم 
</strong>
</details>


```typescript
type UserInfo = {
  name: string;
  isTired: boolean;
};

class DriverSingleton {
  private static driverInstance: DriverSingleton;
  public userInfo: UserInfo={name:"",isTired:false};

  private constructor() {}

  public static getInstance(): DriverSingleton {
    let instance = DriverSingleton.driverInstance;
    if (!instance) {
      instance = new DriverSingleton();
    }

    return instance;
  }

  public toggleDriverStatus(status:UserInfo["isTired"]){
    this.userInfo.isTired=status;
  }

  public changeDriver(newDriverName: UserInfo["name"]) {
    if(DriverSingleton.driverInstance.userInfo.isTired){
    this.userInfo = {name:newDriverName,isTired:false};
    }
  }
}


//change current driver status
DriverSingleton.getInstance().toggleDriverStatus(false)
//change driver 
DriverSingleton.getInstance().changeDriver("narges")

```
</div>
<details>
  <summary dir="rtl">چرا constructor را  private  کردیم ؟</summary>
<p dir="rtl">
اگر constructor بدون سطح دسترسی private باشد ، در هر جایی از کد ، می توانیم نمونه جدیدی به وسیله کلمه کلیدی new  بسازیم اما اگر آنرا private  کنیم امکان رخ دادن این اشتباه غیر ممکن خواهد شد
</p>

### get error :
  ```typescript
type UserInfo = {
    name: string;
    isTired: boolean;
};

class DriverSingleton {
    private constructor() {}
    .
    .
    .
}

//error : Constructor of class 'DriverSingleton' is private and only accessible within the class declaration.
const createNewDriver=new DriverSingleton()
  ```
</details>

