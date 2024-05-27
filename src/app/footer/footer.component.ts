import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { QuoteModel } from './quote.model';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  
  quote = "Your Digital Identity, Simplified.";
  author = "CardX";
  
  constructor(private http: HttpClient){}

  ngOnInit(): void {
    this.getQuotes(); // Call quote api
  }

  
  getQuotes() {
    console.log("Method name :: getQuotes");
    
    this.http.get<QuoteModel>("http://localhost:8080/cardx/rest/v1/quotes").subscribe(data => {
      console.log("Response from quote api :: " + data);

      if(data != null && (data.author != null || data.text != null)){
        // Splitting author string by comma and taking the first part - second part is watermark ( type.fit)
        this.author = data.author.split(',')[0].trim();
        this.quote = data.text;
      }
    });
  }

}