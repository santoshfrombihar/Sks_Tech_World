import { Component, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit, AfterViewChecked } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';
import { CourseService } from '../../services/course/course.service';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-course-content',
  imports: [CommonModule, NgxPaginationModule],
  templateUrl: './course-content.component.html',
  styleUrl: './course-content.component.css'
})
export class CourseContentComponent implements OnInit, OnDestroy, AfterViewInit {
  selectedSection: number = 1;
  private scrollSubscription?: Subscription;

  @ViewChild('scrollContainer', { static: false }) scrollContainer?: ElementRef;

  constructor(private courseService: CourseService) {}

  ngOnInit() {
    this.courseService.selectedSection$.subscribe(id => {
      this.selectedSection = id;
      // Reset scroll subscription when section changes
      setTimeout(() => this.setupScrollListener(), 100);
    });
  }

  ngAfterViewInit() {
    this.setupScrollListener();
  }

  ngAfterViewChecked() {
    // Setup scroll listener for any section that has scrollable content
    if (this.scrollContainer && !this.scrollSubscription) {
      this.setupScrollListener();
    }
  }

  ngOnDestroy() {
    if (this.scrollSubscription) {
      this.scrollSubscription.unsubscribe();
    }
  }

  private setupScrollListener() {
    if (this.scrollSubscription) {
      this.scrollSubscription.unsubscribe();
    }

    if (this.scrollContainer) {
      // Use the scrollContainer directly since it has the ViewChild reference
      const scrollableElement = this.scrollContainer.nativeElement;
      
      this.scrollSubscription = fromEvent(scrollableElement, 'scroll')
        .pipe(debounceTime(10)) // Reduced debounce for smoother updates
        .subscribe(() => {
          this.updateScrollProgress(scrollableElement);
        });
    }
  }

  private updateScrollProgress(container: HTMLElement) {
    const scrollTop = container.scrollTop;
    const scrollHeight = container.scrollHeight;
    const clientHeight = container.clientHeight;
    
    // If no scrolling is possible, progress is 0
    if (scrollHeight <= clientHeight) {
      this.courseService.updateSectionProgress(this.selectedSection, 0);
      return;
    }
    
    const scrollPercent = (scrollTop / (scrollHeight - clientHeight)) * 100;
    const progress = Math.round(Math.min(Math.max(scrollPercent, 0), 100)); // Round to whole number
    
    this.courseService.updateSectionProgress(this.selectedSection, progress);
  }

  getContentBlocks(sectionId: number) {
    // Sample content for different sections
    const contentMap: { [key: number]: any[] } = {
      2: [
        {
          title: 'Introduction to Variables',
          description: 'Understanding the foundation of data storage in C#',
          paragraphs: [
            'Variables are containers for storing data values. In C#, you must declare the type of a variable before using it.',
            'C# is a strongly-typed language, which means every variable must have a specific data type.',
            'The basic syntax for declaring a variable is: data_type variable_name = value;',
            'Variables can be declared and initialized in the same statement or separately.',
            'Once declared, you can assign new values to variables of compatible types.',
            'Variable names must start with a letter or underscore and can contain letters, digits, and underscores.',
            'C# is case-sensitive, so "myVar" and "myvar" are different variables.',
            'You cannot use reserved keywords as variable names.',
            'Variables have scope, which determines where they can be accessed in the code.',
            'Local variables are declared inside methods and are only accessible within that method.'
          ],
          codeExample: `int age = 25;\nstring name = "John Doe";\ndouble salary = 50000.50;\nbool isEmployed = true;\n\n// Declaration and initialization separately\nint number;\nnumber = 42;\n\n// Multiple declarations\nint x = 1, y = 2, z = 3;`
        },
        {
          title: 'Data Types in C#',
          description: 'Exploring the different types of data you can store',
          paragraphs: [
            'C# provides various data types to store different kinds of values.',
            'Value types store data directly, while reference types store references to the data.',
            'Common value types include int, double, char, bool, and structs.',
            'Common reference types include string, arrays, and objects.',
            'Value types are stored on the stack and include numeric types, boolean, and char.',
            'Reference types are stored on the heap and include strings, arrays, and custom objects.',
            'The int type is a 32-bit signed integer that can store values from -2,147,483,648 to 2,147,483,647.',
            'The double type is a 64-bit floating-point number with higher precision than float.',
            'The string type represents a sequence of Unicode characters.',
            'Arrays are fixed-size collections of elements of the same type.',
            'The var keyword allows implicit typing, where the compiler infers the type.',
            'Constants are immutable values that cannot be changed after declaration.',
            'Enumerations define a set of named constants.',
            'Nullable types can represent null values for value types.',
            'Type conversion can be implicit or explicit (casting).'
          ],
          codeExample: `// Value types\nint number = 42;\ndouble pi = 3.14159;\nchar letter = 'A';\nbool flag = true;\n\n// Reference types\nstring text = "Hello World";\nint[] numbers = {1, 2, 3, 4, 5};\n\n// Implicit typing\nvar message = "Hello";\nvar count = 10;\n\n// Constants\nconst double PI = 3.14159;\nconst string GREETING = "Welcome";\n\n// Nullable types\nint? nullableInt = null;\nbool? nullableBool = true;`
        },
        {
          title: 'Variable Scope and Lifetime',
          description: 'Understanding where and how long variables exist',
          paragraphs: [
            'Variable scope determines where a variable can be accessed in the code.',
            'Local variables are declared inside methods and are only accessible within that method.',
            'Class-level variables (fields) are accessible throughout the class.',
            'Static variables belong to the class rather than instances of the class.',
            'Variable lifetime refers to how long a variable exists in memory.',
            'Local variables exist only during method execution.',
            'Instance variables exist as long as the object exists.',
            'Static variables exist for the entire duration of the program.',
            'Scope can be nested, with inner scopes accessing outer scope variables.',
            'Variables in outer scopes can be hidden by variables with the same name in inner scopes.',
            'The using statement ensures proper disposal of resources.',
            'Garbage collection automatically manages memory for reference types.',
            'Value types are automatically cleaned up when they go out of scope.',
            'Understanding scope helps prevent naming conflicts and improves code organization.',
            'Proper scoping practices lead to more maintainable and less error-prone code.'
          ],
          codeExample: `public class Example\n{\n    // Class-level field\n    private int instanceField;\n    \n    // Static field\n    private static int staticField;\n    \n    public void Method()\n    {\n        // Local variable\n        int localVar = 10;\n        \n        if (true)\n        {\n            // Nested scope\n            int nestedVar = 20;\n            // Can access localVar here\n            Console.WriteLine(localVar);\n        }\n        \n        // Cannot access nestedVar here\n        // Console.WriteLine(nestedVar); // Error!\n    }\n}`
        }
      ],
      3: [
        {
          title: 'Control Flow Statements',
          description: 'Making decisions and controlling program execution',
          paragraphs: [
            'Control flow statements allow you to control the execution flow of your program.',
            'Conditional statements like if-else help make decisions based on conditions.',
            'Looping statements like for, while, and foreach allow repetitive execution.',
            'Switch statements provide an efficient way to handle multiple conditions.'
          ],
          codeExample: `if (age >= 18) {\n    Console.WriteLine("Adult");\n} else {\n    Console.WriteLine("Minor");\n}\n\nfor (int i = 0; i < 5; i++) {\n    Console.WriteLine(i);\n}`
        }
      ],
      // Add more sections as needed
    };
    
    return contentMap[sectionId] || [
      {
        title: 'Section Content',
        description: 'This section is under development',
        paragraphs: [
          'Content for this section will be added soon.',
          'Please check back later for detailed explanations and examples.',
          'In the meantime, you can explore other sections of the course.'
        ]
      }
    ];
  }
}
