#Dependency Inversion Principle 

فرض کنید شما یک سیستم مدیریت کارهای روزانه برنامه‌نویسی می‌نویسید. در این سیستم، شما دارید با یک کلاس به نام TaskManager کار می‌کنید. این کلاس مسئول مدیریت و انجام کارها Tasks است.
خیلی خلاصه بخوام بگم آرایه ای از Task ها رو میگیره و اون ها رو انجام میده .
ممکنه انواع Task رو هم داشته باشیم که هر کدومش به شکل خاصی انجام میشه و پیاده سازی های مخصوص خودش رو داره .
 
```angular2html
interface Task {
    complete(): void;
}


class TaskManager {
    private tasks: Task[] = [];
    
    addTask(task: Task) {
        this.tasks.push(task);
    }
    
    completeTask(task: Task) {
       task.complete();
       const index = this.tasks.indexOf(task);
       if (index !== -1) {
         this.tasks.splice(index, 1);
       }
    }

    completeTasks() {
      this.tasks.forEach(task => task.complete())
    }
}

```

این کد یک قابلیت بسیار خوبی داره , شما میتوانید به راحتی هر نوع تسک رو ایجاد کنید . و در نهایت به کلاس

TaskManager

اون تسک ها رو تزریق کنید .

```angular2html



class CodingTask implements Task {
    complete() {
        console.log('Coding task is complete.');
    }
}
    
class DesignTask implements Task {
    complete() {
        console.log('Design task is complete.');
    }
}

```

در نهایت میتونیم به این شکل از کد استفاده کنیم :

```
 const taskManager = new TaskManager();
 taskManager.addTask(
   new CodingTask(),
 );
 taskManager.addTask(
   new DesignTask()
 );
 
 taskManager.completeTasks()
```

اما حواستون باشه , اون چیزی که الان اسمش رو گذاشتیم Dependency Inversion شیوه ای هستش که استفاده کردیم که بتونیم به کلاس TaskManager تزریق کنیم انواع Task رو .


## امیدوارم از این مطلب لذت برده باشین , اگر نیاز به تغییر داشت یا پیشنهادی برای این متن داشتین از طریق لینک زیر برامون Issue جدید تولید کنید .
https://github.com/frontendjourney/design-pattern/issues/new/choose
