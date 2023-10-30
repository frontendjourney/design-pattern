#Dependency Inversion Principle 

فرض کنید شما یک سیستم مدیریت کارهای روزانه برنامه‌نویسی می‌نویسید. در این سیستم، شما دارید با یک کلاس به نام

TaskManager 

کار می‌کنید. این کلاس مسئول مدیریت و انجام کارها 

(Tasks) 

است.
 
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