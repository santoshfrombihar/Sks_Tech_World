import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-classes',
  imports: [CommonModule],
  templateUrl: './classes.component.html',
  styleUrl: './classes.component.css'
})
export class ClassesComponent {
  cards = new Array(10).fill({ // Repeat card data for 10 cards
    title: 'Card title',
    content: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
    link1: '#',
    link2: '#',
    listItems: ['Cras justo odio', 'Dapibus ac facilisis in', 'Vestibulum at eros'],
    imgSrc: 'https://via.placeholder.com/150' // Placeholder image URL
  });
}
