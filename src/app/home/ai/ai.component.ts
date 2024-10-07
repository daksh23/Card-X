import { Component } from '@angular/core';
import { CommonutilService } from '../../Services/commonutil.service';

@Component({
  selector: 'app-ai',
  templateUrl: './ai.component.html',
  styleUrls: ['./ai.component.scss']
})
export class AiComponent {

  toAiPage(){
    console.log("toAiPage method from AiComponent :: working :: Comming Soon!");
  }

}
