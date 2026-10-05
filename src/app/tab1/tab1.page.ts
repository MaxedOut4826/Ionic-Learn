import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular';

import { Renderer } from './scripts/renderPipeline/renderEngine';
import { main } from './scripts/index';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar],
})
export class Tab1Page implements AfterViewInit {
  @ViewChild('frame', { static: true }) frame!: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit() {
    Renderer.init(this.frame.nativeElement);
    main();
  }
}
