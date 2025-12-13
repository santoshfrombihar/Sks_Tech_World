import { Component } from '@angular/core';
import { AdmincontrolService } from '../services/admin/admincontrol.service';
import { environment } from '../../enviroment';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProgressSpinnerModule
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  constructor(private adminControlService: AdmincontrolService) { }

  adminKey = '';
  isVerified = false;
  loderStart = false;
  setErrorText = false;
  addNewClicked = false;

  adminForm = new FormGroup({
    selectedField: new FormControl('', Validators.required),
    selectedCourse: new FormControl('', Validators.required),
    codedesc: new FormControl('', Validators.required)
  });

  count = this.adminForm.get('codedesc')?.value?.length;
  fields: string[] = [
    'Software Development',
    'Web Development',
    'Mobile Development',
    'Cloud Computing',
    'DevOps',
    'Database Systems',
    'Data Science',
    'AI & Machine Learning',
    'Cybersecurity',
    'Networking',
    'Operating Systems',
    'UI/UX Design',
    'Game Development',
    'Blockchain',
    'Big Data'
  ];

  fieldCourseMap: Record<string, string[]> = {
    'Software Development': ['C', 'C++', 'Java', 'C#', '.NET', 'Python', 'Go', 'Rust'],
    'Web Development': ['HTML', 'CSS', 'JavaScript', 'Angular', 'React', 'Vue', 'Node.js'],
    'Mobile Development': ['Android', 'Kotlin', 'Swift', 'Flutter', 'React Native'],
    'Cloud Computing': ['AWS', 'Azure', 'GCP', 'Cloud Architecture', 'Serverless'],
    'DevOps': ['CI/CD', 'Docker', 'Kubernetes', 'Terraform', 'Ansible'],
    'Database Systems': ['SQL', 'MySQL', 'PostgreSQL', 'MongoDB', 'Oracle'],
    'Data Science': ['Python for Data Science', 'R', 'Statistics', 'Power BI'],
    'AI & Machine Learning': ['Machine Learning', 'Deep Learning', 'NLP', 'Computer Vision'],
    'Cybersecurity': ['Ethical Hacking', 'Network Security', 'Web Security'],
    'Networking': ['TCP/IP', 'DNS', 'Routing', 'Switching', 'Firewalls'],
    'Operating Systems': ['Linux', 'Windows Internals', 'Unix', 'Shell Scripting'],
    'UI/UX Design': ['Figma', 'Adobe XD', 'Wireframing', 'UX Research'],
    'Game Development': ['Unity', 'Unreal Engine', 'Game AI', 'AR/VR'],
    'Blockchain': ['Blockchain Basics', 'Ethereum', 'Solidity', 'Smart Contracts'],
    'Big Data': ['Hadoop', 'Spark', 'Kafka', 'Data Lakes']
  };

  courses: string[] = [];

  onFieldChange() {
    const field = this.adminForm.get('selectedField')?.value as string;
    this.courses = this.fieldCourseMap[field] || [];
    this.adminForm.get('selectedCourse')?.reset();
  }

  verifyAdminKey() {
    this.loderStart = true;
    this.adminControlService.verifyAdmin(this.adminKey)
      .subscribe({
        next: () => {
          this.isVerified = true;
          this.loderStart = false;
        },
        error: () => {
          this.loderStart = false;
          this.setErrorText = true;
        }
      });
  }

  onDescInput(event: Event) {
    const value = (event.target as HTMLTextAreaElement).value;
    this.count = 250 - value.length;
  }

  addNewData(){
    this.addNewClicked = true;
  }
}
