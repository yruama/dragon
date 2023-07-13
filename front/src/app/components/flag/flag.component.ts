import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-flag',
  templateUrl: './flag.component.html',
  styleUrls: ['./flag.component.scss']
})
export class FlagComponent implements OnInit {

  language: string = 'fr';

  constructor(private _translate: TranslateService) {}

  ngOnInit(): void {
    this.language = this._translate.getDefaultLang();
  }

  useLanguage(language: string): void {
    this._translate.use(language);
    this.language = language;
  }

}
